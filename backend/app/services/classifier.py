"""Keyword-based email classification service."""

CATEGORIES = {
    "Placements": ["placement", "internship", "online test", "interview", "recruitment", "offer"],
    "Assignments": ["assignment", "submission", "homework", "lab", "project"],
    "Exams": ["exam", "quiz", "midterm", "fat", "cat", "test"],
    "Events": ["hackathon", "workshop", "webinar", "seminar", "event"],
}


def classify_email(subject: str, snippet: str) -> str:
    """Classify an email into a category based on keyword matching."""
    text = f"{subject} {snippet}".lower()

    for category, keywords in CATEGORIES.items():
        for keyword in keywords:
            if keyword in text:
                return category

    return "General"
