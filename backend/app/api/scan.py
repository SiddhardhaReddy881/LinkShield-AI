from fastapi import APIRouter

router = APIRouter()

@router.post("/scan")
def scan_url(data: dict):
    url = data.get("url", "")

    return {
        "success": True,
        "url": url,
        "prediction": "Safe",
        "confidence": 98.7
    }