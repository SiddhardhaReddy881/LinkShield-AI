from app.history.database import get_connection


def save_scan(
    url,
    threat_score,
    classification,
    country,
    ip,
):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO scan_history
        (
            url,
            threat_score,
            classification,
            country,
            ip
        )
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            url,
            threat_score,
            classification,
            country,
            ip,
        ),
    )

    conn.commit()
    conn.close()


def get_history():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT *
        FROM scan_history
        ORDER BY scan_date DESC
        """
    )

    rows = cursor.fetchall()

    conn.close()

    return [dict(row) for row in rows]
def delete_scan(scan_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM scan_history WHERE id = ?",
        (scan_id,)
    )

    conn.commit()
    conn.close()


def clear_history():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM scan_history")

    conn.commit()
    conn.close()