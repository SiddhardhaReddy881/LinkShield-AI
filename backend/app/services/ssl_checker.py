import ssl
import socket
from urllib.parse import urlparse


def check_ssl(url: str):
    """
    Check whether a website has a valid SSL certificate.
    """

    try:
        hostname = urlparse(url).netloc

        context = ssl.create_default_context()

        with socket.create_connection((hostname, 443), timeout=5) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as secure_sock:
                cert = secure_sock.getpeercert()

        return {
            "ssl_valid": True,
            "issuer": dict(x[0] for x in cert["issuer"]),
            "expires": cert["notAfter"]
        }

    except Exception as e:
        return {
            "ssl_valid": False,
            "error": str(e)
        }