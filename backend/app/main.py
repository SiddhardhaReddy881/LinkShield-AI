from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.services.url_validator import validate_url
from app.services.feature_extractor import extract_features
from app.services.whois_service import get_whois_info
from app.services.ssl_checker import check_ssl
from app.services.risk_engine import calculate_risk_score
from app.services.ml_service import predict_url
from app.services.webpage_analyzer import analyze_webpage
from app.services.virustotal_service import scan_url_virustotal
from app.services.google_safe_browsing_service import check_safe_browsing
from app.services.ip_info_service import get_ip_info
from app.services.domain_age_service import calculate_domain_age
from app.services.dns_service import get_dns_info
from app.services.security_headers_service import check_security_headers
from app.services.threat_score_service import calculate_threat_score

from app.auth.auth_database import create_user_table
from app.auth.auth_service import register_user, login_user
from app.auth.forgot_password import reset_password

from app.history.database import create_table
from app.history.history_service import (
    save_scan,
    get_history,
    delete_scan,
    clear_history,
)

app = FastAPI(
    title="LinkShield AI API",
    version="1.0.0",
    description="Backend API for LinkShield AI"
)

# Create Database Tables
create_table()
create_user_table()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",

        # Production frontend
        "https://link-shield-ai.vercel.app",
        "https://www.link-shield-ai.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Request Models
# --------------------------------------------------

class URLRequest(BaseModel):
    url: str


class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


class ForgotPasswordRequest(BaseModel):
    email: str
    new_password: str


# --------------------------------------------------
# Home
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "LinkShield AI Backend Running"
    }


# --------------------------------------------------
# Authentication APIs
# --------------------------------------------------

@app.post("/register")
def register(request: RegisterRequest):
    return register_user(
        request.username,
        request.email,
        request.password,
    )


@app.post("/login")
def login(request: LoginRequest):
    return login_user(
        request.email,
        request.password,
    )


@app.post("/forgot-password")
def forgot_password(request: ForgotPasswordRequest):
    return reset_password(
        request.email,
        request.new_password,
    )


# --------------------------------------------------
# URL Scan API
# --------------------------------------------------

@app.post("/scan")
def scan(request: URLRequest):

    valid, message = validate_url(request.url)

    if not valid:
        return {
            "status": "error",
            "message": message
        }

    features = extract_features(request.url)

    whois_info = get_whois_info(request.url)

    ssl_info = check_ssl(request.url)

    webpage_info = analyze_webpage(request.url)

    virustotal_info = scan_url_virustotal(request.url)

    google_safe_info = check_safe_browsing(request.url)

    ip_info = get_ip_info(request.url)

    domain_age = calculate_domain_age(whois_info)

    dns_info = get_dns_info(request.url)

    security_headers = check_security_headers(request.url)

    risk = calculate_risk_score(
        features,
        whois_info,
        ssl_info,
    )

    threat_score = calculate_threat_score(
        risk,
        virustotal_info,
        google_safe_info,
        domain_age,
        security_headers,
    )

    save_scan(
        url=request.url,
        threat_score=threat_score["overall_score"],
        classification=threat_score["classification"],
        country=ip_info.get("country"),
        ip=ip_info.get("ip"),
    )

    # prediction = predict_url(features)

    return {
        "status": "success",
        "message": "URL validation successful.",
        "url": request.url,
        "features": features,
        "whois": whois_info,
        "ssl": ssl_info,
        "webpage": webpage_info,
        "virustotal": virustotal_info,
        "google_safe_browsing": google_safe_info,
        "ip_info": ip_info,
        "domain_age": domain_age,
        "dns": dns_info,
        "http_security": security_headers,
        "risk": risk,
        "threat_analysis": threat_score,
    }


# --------------------------------------------------
# History APIs
# --------------------------------------------------

@app.get("/history")
def history():
    return get_history()


@app.delete("/history/{scan_id}")
def delete_history(scan_id: int):
    delete_scan(scan_id)

    return {
        "status": "success",
        "message": "History deleted successfully."
    }


@app.delete("/history")
def delete_all_history():
    clear_history()

    return {
        "status": "success",
        "message": "All history cleared."
    }