from app.database import get_connection


def create_table():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS scan_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL,
            threat_score INTEGER,
            classification TEXT,
            country TEXT,
            ip TEXT,
            scan_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS visitors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        visitor_ip TEXT,
        visit_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

    conn.commit()
    conn.close()