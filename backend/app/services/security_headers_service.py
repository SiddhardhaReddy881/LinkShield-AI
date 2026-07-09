import requests


def check_security_headers(url: str):
    """
    Check common HTTP security headers.
    """

    try:
        response = requests.get(url, timeout=10)

        headers = response.headers

        checks = {
            "Strict-Transport-Security": "Strict-Transport-Security" in headers,
            "Content-Security-Policy": "Content-Security-Policy" in headers,
            "X-Frame-Options": "X-Frame-Options" in headers,
            "X-Content-Type-Options": "X-Content-Type-Options" in headers,
            "Referrer-Policy": "Referrer-Policy" in headers,
            "Permissions-Policy": "Permissions-Policy" in headers,
        }

        score = sum(checks.values())
        security_score = round((score / len(checks)) * 100)

        return {
            **checks,
            "security_score": security_score
        }

    except Exception as e:
        return {
            "error": str(e)
        }