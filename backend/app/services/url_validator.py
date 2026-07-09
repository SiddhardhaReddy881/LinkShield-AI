from urllib.parse import urlparse


def validate_url(url: str):
    """
    Validate the URL before scanning.
    """

    if not url:
        return False, "URL cannot be empty."

    parsed = urlparse(url)

    if parsed.scheme not in ("http", "https"):
        return False, "URL must start with http:// or https://"

    if not parsed.netloc:
        return False, "Invalid domain."

    return True, "Valid URL"