import whois
from urllib.parse import urlparse


def get_whois_info(url: str):
    """
    Retrieve WHOIS information for a given URL.
    """

    try:
        domain = urlparse(url).netloc

        info = whois.whois(domain)

        return {
            "domain": domain,
            "registrar": info.registrar,
            "creation_date": str(info.creation_date),
            "expiration_date": str(info.expiration_date),
            "name_servers": info.name_servers,
        }

    except Exception as e:
        return {
            "error": str(e)
        }