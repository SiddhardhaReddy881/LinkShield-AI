import os
import sqlite3
from pathlib import Path

BACKEND_ROOT = Path(__file__).resolve().parents[1]


def get_database_path() -> str:
    if os.environ.get("DATABASE_PATH"):
        return os.environ["DATABASE_PATH"]
    if os.environ.get("VERCEL"):
        return "/tmp/history.db"
    return str(BACKEND_ROOT / "history.db")


DATABASE_NAME = get_database_path()


def get_connection():
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    return conn
