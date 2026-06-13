import base64

from fastapi import APIRouter, HTTPException

from app.services.gmail_service import get_gmail_service
from app.services.summarizer import summarize_email
from app.services.classifier import classify_email

router = APIRouter(
    prefix="/emails",
    tags=["Emails"]
)


@router.get("/fetch")
async def fetch_emails():

    try:

        service = get_gmail_service()

        results = service.users().messages().list(
            userId="me",
            maxResults=10
        ).execute()

        messages = results.get("messages", [])

        emails = []

        for msg in messages:

            message = service.users().messages().get(
                userId="me",
                id=msg["id"]
            ).execute()

            headers = message["payload"]["headers"]

            subject = ""
            sender = ""
            date = ""

            for header in headers:

                if header["name"] == "Subject":
                    subject = header["value"]

                elif header["name"] == "From":
                    sender = header["value"]

                elif header["name"] == "Date":
                    date = header["value"]

            snippet = message.get("snippet", "")

            emails.append({
                "id": msg["id"],
                "sender": sender,
                "subject": subject,
                "snippet": snippet,
                "date": date,
                "category": classify_email(subject, snippet)
            })

        return emails

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get("/{email_id}/summary")
async def get_email_summary(email_id: str):
    """Fetch a specific email and return Gemini-powered summary."""

    try:
        service = get_gmail_service()

        # Fetch full email by ID
        message = service.users().messages().get(
            userId="me",
            id=email_id,
            format="full"
        ).execute()

        # Extract subject from headers
        headers = message["payload"]["headers"]
        subject = ""
        for header in headers:
            if header["name"] == "Subject":
                subject = header["value"]
                break

        # Extract body from payload
        body = _extract_body(message["payload"])

        # If body extraction failed, fall back to snippet
        if not body:
            body = message.get("snippet", "")

        # Summarize using Gemini
        result = summarize_email(subject, body)

        return {
            "email_id": email_id,
            "subject": subject,
            **result
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Summarization failed: {str(e)}"
        )


def _extract_body(payload: dict) -> str:
    """Extract plain text body from Gmail message payload."""

    # Simple single-part message
    if "body" in payload and payload["body"].get("data"):
        return base64.urlsafe_b64decode(payload["body"]["data"]).decode("utf-8", errors="ignore")

    # Multipart message — look for text/plain
    parts = payload.get("parts", [])
    for part in parts:
        if part.get("mimeType") == "text/plain" and part.get("body", {}).get("data"):
            return base64.urlsafe_b64decode(part["body"]["data"]).decode("utf-8", errors="ignore")

    # Fallback: try text/html
    for part in parts:
        if part.get("mimeType") == "text/html" and part.get("body", {}).get("data"):
            return base64.urlsafe_b64decode(part["body"]["data"]).decode("utf-8", errors="ignore")

    # Nested multipart
    for part in parts:
        if "parts" in part:
            result = _extract_body(part)
            if result:
                return result

    return ""