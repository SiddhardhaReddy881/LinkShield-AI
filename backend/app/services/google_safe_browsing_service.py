import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GOOGLE_SAFE_BROWSING_API_KEY")


def check_safe_browsing(url: str):
    """
    Check URL using Google Safe Browsing API.
    """

    endpoint = (
        f"https://safebrowsing.googleapis.com/v4/threatMatches:find?key={API_KEY}"
    )

    payload = {
        "client": {
            "clientId": "linkshield-ai",
            "clientVersion": "1.0"
        },
        "threatInfo": {
            "threatTypes": [
                "MALWARE",
                "SOCIAL_ENGINEERING",
                "UNWANTED_SOFTWARE",
                "POTENTIALLY_HARMFUL_APPLICATION"
            ],
            "platformTypes": [
                "ANY_PLATFORM"
            ],
            "threatEntryTypes": [
                "URL"
            ],
            "threatEntries": [
                {
                    "url": url
                }
            ]
        }
    }

    try:
        response = requests.post(endpoint, json=payload)

        if response.status_code != 200:
            return {
                "error": response.text
            }

        data = response.json()

        if "matches" in data:
            return {
                "safe": False,
                "matches": data["matches"]
            }

        return {
            "safe": True,
            "matches": []
        }

    except Exception as e:
        return {
            "error": str(e)
        }