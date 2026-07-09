from urllib.parse import urlparse
import re


def extract_features(url: str):
    parsed = urlparse(url)

    domain = parsed.netloc
    path = parsed.path

    features = {
        # Matching PhiUSIIL feature names
        "URLLength": len(url),
        "DomainLength": len(domain),
        "IsHTTPS": 1 if parsed.scheme == "https" else 0,

        # Approximate mappings
        "NoOfDegitsInURL": sum(c.isdigit() for c in url),
        "NoOfOtherSpecialCharsInURL": len(
            re.findall(r"[!@#$%^&*(),?\":{}|<>]", url)
        ),

        # Features we can calculate directly
        "URLSimilarityIndex": 0,
        "CharContinuationRate": 0,
        "TLDLegitimateProb": 0,
        "URLCharProb": 0,
        "TLDLength": len(domain.split(".")[-1]) if "." in domain else 0,
        "NoOfSubDomain": max(0, len(domain.split(".")) - 2),
        "HasObfuscation": 1 if "%" in url else 0,
        "NoOfObfuscatedChar": url.count("%"),
        "ObfuscationRatio": (
            url.count("%") / len(url) if len(url) > 0 else 0
        ),
        "NoOfLettersInURL": sum(c.isalpha() for c in url),
        "LetterRatioInURL": (
            sum(c.isalpha() for c in url) / len(url)
            if len(url) > 0 else 0
        ),
        "DegitRatioInURL": (
            sum(c.isdigit() for c in url) / len(url)
            if len(url) > 0 else 0
        ),
        "NoOfEqualsInURL": url.count("="),
        "NoOfQMarkInURL": url.count("?"),
        "NoOfAmpersandInURL": url.count("&"),
        "SpacialCharRatioInURL": (
            len(re.findall(r"[!@#$%^&*(),?\":{}|<>]", url)) / len(url)
            if len(url) > 0 else 0
        ),

        # Default values for HTML-based features
        "LineOfCode": 0,
        "LargestLineLength": 0,
        "HasTitle": 0,
        "DomainTitleMatchScore": 0,
        "URLTitleMatchScore": 0,
        "HasFavicon": 0,
        "Robots": 0,
        "IsResponsive": 0,
        "NoOfURLRedirect": 0,
        "NoOfSelfRedirect": 0,
        "HasDescription": 0,
        "NoOfPopup": 0,
        "NoOfiFrame": 0,
        "HasExternalFormSubmit": 0,
        "HasSocialNet": 0,
        "HasSubmitButton": 0,
        "HasHiddenFields": 0,
        "HasPasswordField": 0,
        "Bank": 0,
        "Pay": 0,
        "Crypto": 0,
        "HasCopyrightInfo": 0,
        "NoOfImage": 0,
        "NoOfCSS": 0,
        "NoOfJS": 0,
        "NoOfSelfRef": 0,
        "NoOfEmptyRef": 0,
        "NoOfExternalRef": 0,
    }

    return features