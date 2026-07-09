import requests
from bs4 import BeautifulSoup


def analyze_webpage(url: str):
    """
    Analyze the webpage and extract HTML-based features.
    """

    try:
        response = requests.get(url, timeout=10)

        soup = BeautifulSoup(response.text, "html.parser")

        title = soup.title.string.strip() if soup.title and soup.title.string else ""

        features = {
            "HasTitle": 1 if title else 0,
            "Title": title,
            "HasFavicon": 1 if soup.find("link", rel=lambda x: x and "icon" in x.lower()) else 0,
            "HasPasswordField": 1 if soup.find("input", {"type": "password"}) else 0,
            "HasSubmitButton": 1 if soup.find("input", {"type": "submit"}) or soup.find("button", {"type": "submit"}) else 0,
            "NoOfImage": len(soup.find_all("img")),
            "NoOfCSS": len(soup.find_all("link", rel="stylesheet")),
            "NoOfJS": len(soup.find_all("script")),
            "NoOfiFrame": len(soup.find_all("iframe")),
        }

        return features

    except Exception as e:
        return {
            "error": str(e)
        }