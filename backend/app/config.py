import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from backend directory
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)


class Settings:
    def __init__(self):
        # Database
        self.MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/campusflow")

        # Google OAuth
        self.GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
        self.GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
        self.GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:8000/api/auth/callback")

        # Frontend URL
        self.FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

        # OpenAI
        self.OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

        # JWT
        self.JWT_SECRET = os.getenv("JWT_SECRET", "change-me-in-production")

        # Gemini AI
        self.GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

        # OAuth Token Storage
        self.TOKEN_FILE = os.getenv("TOKEN_FILE", "token.json")

        # Gmail Permissions
        self.GMAIL_SCOPES = [
            "https://www.googleapis.com/auth/gmail.readonly"
        ]


# Create settings instance
settings = Settings()

# Validate required environment variables
if not settings.GOOGLE_CLIENT_ID:
    raise ValueError("GOOGLE_CLIENT_ID is missing in .env")

if not settings.GOOGLE_CLIENT_SECRET:
    raise ValueError("GOOGLE_CLIENT_SECRET is missing in .env")
