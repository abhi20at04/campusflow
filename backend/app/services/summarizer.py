"""Gemini-powered email summarization service."""

import json
from google import genai
from app.config import settings

# Initialize Gemini client
client = genai.Client(api_key=settings.GEMINI_API_KEY)

SUMMARIZE_PROMPT = """
You are an AI assistant for a college student.

Analyze the following email and return a JSON object with exactly these fields:

{{
  "summary": "A concise 2-3 sentence summary of the email",
  "important_dates": ["list of any dates/deadlines mentioned, as strings"],
  "action_items": ["list of things the student needs to do"],
  "priority": "high | medium | low"
}}

Priority rules:
- "high": contains deadlines within 3 days, urgent language, or exam/assignment submissions
- "medium": meetings, events, or tasks with flexible timelines
- "low": informational, newsletters, mess menus, general announcements

Return ONLY valid JSON.
Do NOT wrap the response in markdown.
Do NOT use ```json.

Subject:
{subject}

Body:
{body}
"""


def summarize_email(subject: str, body: str) -> dict:
    """
    Summarize an email using Gemini and return structured data.

    Returns:
        dict with keys:
        - summary
        - important_dates
        - action_items
        - priority
    """

    prompt = SUMMARIZE_PROMPT.format(
        subject=subject,
        body=body[:5000]  # Prevent extremely long emails
    )

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    raw_text = response.text.strip()

    print("\n====== GEMINI RAW RESPONSE ======")
    print(raw_text)
    print("=================================\n")

    # Remove markdown code fences if present
    if raw_text.startswith("```"):
        lines = raw_text.splitlines()

        if lines and lines[0].startswith("```"):
            lines = lines[1:]

        if lines and lines[-1].startswith("```"):
            lines = lines[:-1]

        raw_text = "\n".join(lines).strip()

    try:
        result = json.loads(raw_text)

        return {
            "summary": result.get("summary", ""),
            "important_dates": result.get("important_dates", []),
            "action_items": result.get("action_items", []),
            "priority": result.get("priority", "medium").lower()
        }

    except json.JSONDecodeError as e:

        print(f"JSON Parse Error: {e}")

        return {
            "summary": raw_text,
            "important_dates": [],
            "action_items": [],
            "priority": "medium"
        }

    except Exception as e:

        print(f"Unexpected Error: {e}")

        return {
            "summary": "Unable to generate summary.",
            "important_dates": [],
            "action_items": [],
            "priority": "medium"
        }