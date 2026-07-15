from app.database import get_connection


def create_user_table():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            is_online INTEGER DEFAULT 0,
            last_login TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    try:
        cursor.execute(
            "ALTER TABLE users ADD COLUMN is_online INTEGER DEFAULT 0"
        )
    except:
        pass

    try:
        cursor.execute(
            "ALTER TABLE users ADD COLUMN last_login TIMESTAMP"
        )
    except:
        pass

    conn.commit()
    conn.close()
    