from datetime import datetime


def calculate_domain_age(whois_info):
    """
    Calculate domain age from WHOIS creation date.
    Supports datetime, list of datetime objects and strings.
    """

    try:

        creation = whois_info.get("creation_date")

        if not creation:
            return {
                "age_days": None,
                "age_years": None,
                "risk": "Unknown"
            }

        # If WHOIS returns a list, take the first valid date
        if isinstance(creation, list):
            creation = creation[0]

        # If already datetime
        if isinstance(creation, datetime):
            creation_date = creation

        # If string
        else:
            creation_date = datetime.fromisoformat(
                str(creation).replace("Z", "")
            )

        today = datetime.now()

        age_days = (today - creation_date.replace(tzinfo=None)).days
        age_years = round(age_days / 365.25, 1)

        if age_years >= 5:
            risk = "Old Trusted Domain"
        elif age_years >= 1:
            risk = "Moderately Trusted"
        else:
            risk = "Recently Registered"

        return {
            "age_days": age_days,
            "age_years": age_years,
            "risk": risk
        }

    except Exception as e:
        print(e)

        return {
            "age_days": None,
            "age_years": None,
            "risk": "Unknown"
        }