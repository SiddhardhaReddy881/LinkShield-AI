def calculate_threat_score(
    risk,
    virustotal,
    google_safe,
    domain_age,
    security_headers,
):
    """
    Calculate an overall threat score using all security modules.
    """

    score = 100
    summary = []

    # -----------------------------
    # Risk Engine
    # -----------------------------
    score = min(score, risk.get("score", 100))

    # -----------------------------
    # VirusTotal
    # -----------------------------
    if virustotal.get("malicious", 0) > 0:
        score -= 40
        summary.append("VirusTotal detected malicious activity.")
    elif virustotal.get("suspicious", 0) > 0:
        score -= 20
        summary.append("VirusTotal detected suspicious activity.")
    else:
        summary.append("VirusTotal reports the URL as clean.")

    # -----------------------------
    # Google Safe Browsing
    # -----------------------------
    if not google_safe.get("safe", True):
        score -= 30
        summary.append("Google Safe Browsing flagged this URL.")
    else:
        summary.append("Google Safe Browsing reports the URL as safe.")

    # -----------------------------
    # Domain Age
    # -----------------------------
    if domain_age.get("risk") == "Recently Registered":
        score -= 20
        summary.append("Recently registered domain.")
    elif domain_age.get("risk") == "Moderately Trusted":
        score -= 10
        summary.append("Moderately aged domain.")
    else:
        summary.append("Old trusted domain.")

    # -----------------------------
    # HTTP Security Headers
    # -----------------------------
    header_score = security_headers.get("security_score", 0)

    if header_score < 40:
        score -= 10
        summary.append("Weak HTTP security headers.")
    else:
        summary.append("Good HTTP security headers.")

    # -----------------------------
    # Final Classification
    # -----------------------------
    score = max(0, min(score, 100))

    if score >= 85:
        classification = "SAFE"
    elif score >= 60:
        classification = "SUSPICIOUS"
    else:
        classification = "MALICIOUS"

    confidence = f"{score}%"

    return {
        "overall_score": score,
        "classification": classification,
        "confidence": confidence,
        "summary": summary,
    }