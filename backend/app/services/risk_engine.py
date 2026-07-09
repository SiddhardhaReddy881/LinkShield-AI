from datetime import datetime


def calculate_risk_score(features, whois_info, ssl_info):
    """
    Calculate a simple rule-based phishing risk score.
    Score Range: 0 (Very Risky) → 100 (Very Safe)
    """

    score = 100
    reasons = []

    # HTTPS Check
    if features["IsHTTPS"] == 0:
        score -= 20
        reasons.append("Website is not using HTTPS.")

    # SSL Certificate Check
    if not ssl_info.get("ssl_valid", False):
        score -= 25
        reasons.append("SSL certificate is invalid or missing.")

    # URL Length Check
    if features["URLLength"] > 75:
        score -= 10
        reasons.append("URL is unusually long.")

    # Hyphen Check
    # Count hyphens from the URL because it is no longer stored as a feature
    hyphen_count = whois_info.get("domain", "").count("-")
    if hyphen_count > 3:
        score -= 10
        reasons.append("Too many hyphens in the URL.")

    # Digit Check
    if features["NoOfDegitsInURL"] > 5:
        score -= 5
        reasons.append("Too many digits in the URL.")

    # WHOIS Check
    if not whois_info.get("registrar"):
        score -= 15
        reasons.append("Domain registrar information is unavailable.")

    # Keep score between 0 and 100
    score = max(0, min(score, 100))

    # Risk Level
    if score >= 80:
        level = "Low Risk"
    elif score >= 50:
        level = "Medium Risk"
    else:
        level = "High Risk"

    return {
        "score": score,
        "risk_level": level,
        "reasons": reasons
    }