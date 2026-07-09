import dns.resolver
from urllib.parse import urlparse


def get_dns_info(url: str):
    """
    Retrieve DNS records (A, MX, NS) for a domain.
    """

    try:
        domain = urlparse(url).netloc

        dns_info = {
            "A": [],
            "MX": [],
            "NS": []
        }

        # A Records
        try:
            answers = dns.resolver.resolve(domain, "A")
            dns_info["A"] = [str(rdata) for rdata in answers]
        except Exception:
            pass

        # MX Records
        try:
            answers = dns.resolver.resolve(domain, "MX")
            dns_info["MX"] = [str(rdata.exchange) for rdata in answers]
        except Exception:
            pass

        # NS Records
        try:
            answers = dns.resolver.resolve(domain, "NS")
            dns_info["NS"] = [str(rdata.target) for rdata in answers]
        except Exception:
            pass

        return dns_info

    except Exception as e:
        return {
            "error": str(e)
        }