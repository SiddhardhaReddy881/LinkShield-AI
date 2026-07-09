import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

API_KEY = os.getenv("VIRUSTOTAL_API_KEY")


def scan_url_virustotal(url: str):
    """
    Scan a URL using VirusTotal API.
    """

    try:
        headers = {
            "x-apikey": API_KEY
        }

        # Submit URL
        submit = requests.post(
            "https://www.virustotal.com/api/v3/urls",
            headers=headers,
            data={"url": url}
        )

        if submit.status_code != 200:
            return {
                "error": "Failed to submit URL to VirusTotal",
                "details": submit.text
            }

        analysis_id = submit.json()["data"]["id"]

        # Get Analysis Result
        result = requests.get(
            f"https://www.virustotal.com/api/v3/analyses/{analysis_id}",
            headers=headers
        )

        if result.status_code != 200:
            return {
                "error": "Failed to retrieve VirusTotal results",
                "details": result.text
            }

        stats = result.json()["data"]["attributes"]["stats"]

        return {
            "malicious": stats.get("malicious", 0),
            "suspicious": stats.get("suspicious", 0),
            "harmless": stats.get("harmless", 0),
            "undetected": stats.get("undetected", 0),
        }

    except Exception as e:
        return {
            "error": str(e)
        }