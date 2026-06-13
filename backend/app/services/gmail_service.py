import json

from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

from app.config import settings


def get_gmail_service():
    """
    Create authenticated Gmail service.
    """

    try:
        with open(settings.TOKEN_FILE, "r") as token:
            token_data = json.load(token)

        credentials = Credentials.from_authorized_user_info(
            token_data,
            settings.GMAIL_SCOPES
        )

        service = build(
            "gmail",
            "v1",
            credentials=credentials
        )

        return service

    except FileNotFoundError:
        raise Exception(
            "token.json not found. Please authenticate first."
        )