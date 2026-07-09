import socket
import requests
from urllib.parse import urlparse


def get_ip_info(url: str):
    """
    Resolve a domain to its IP address and fetch geolocation details.
    """

    try:
        domain = urlparse(url).netloc

        # Resolve domain to IP
        ip = socket.gethostbyname(domain)

        # Fetch IP details
        response = requests.get(
            f"http://ip-api.com/json/{ip}"
        )

        if response.status_code != 200:
            return {
                "error": "Unable to retrieve IP information."
            }

        data = response.json()

        return {
    "ip": ip,
    "country": data.get("country"),
    "region": data.get("regionName"),
    "city": data.get("city"),
    "isp": data.get("isp"),
    "organization": data.get("org"),
    "asn": data.get("as"),
    "timezone": data.get("timezone"),
    "latitude": data.get("lat"),
    "longitude": data.get("lon"),
}

    except Exception as e:
        return {
            "error": str(e)
        }