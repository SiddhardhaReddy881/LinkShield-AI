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
        (scan_id,),
    )

    conn.commit()
    conn.close()


def clear_history():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM scan_history")

    conn.commit()
    conn.close()


def get_admin_stats():
    conn = get_connection()
    cursor = conn.cursor()

    # Total scans
    cursor.execute("SELECT COUNT(*) FROM scan_history")
    total_scans = cursor.fetchone()[0]

    # Today's scans
    cursor.execute("""
        SELECT COUNT(*)
        FROM scan_history
        WHERE DATE(scan_date) = DATE('now')
    """)
    scans_today = cursor.fetchone()[0]

    # Safe URLs
    cursor.execute("""
        SELECT COUNT(*)
        FROM scan_history
        WHERE classification = 'SAFE'
    """)
    safe = cursor.fetchone()[0]

    # Suspicious URLs
    cursor.execute("""
        SELECT COUNT(*)
        FROM scan_history
        WHERE classification = 'SUSPICIOUS'
    """)
    suspicious = cursor.fetchone()[0]

    # Malicious URLs (includes legacy DANGEROUS label)
    cursor.execute("""
        SELECT COUNT(*)
        FROM scan_history
        WHERE classification IN ('MALICIOUS', 'DANGEROUS')
    """)
    malicious = cursor.fetchone()[0]

    # Today's Visitors
    cursor.execute("""
        SELECT COUNT(*)
        FROM visitors
        WHERE DATE(visit_date) = DATE('now')
    """)
    today_visitors = cursor.fetchone()[0]

    conn.close()

    return {
        "total_scans": total_scans,
        "scans_today": scans_today,
        "safe": safe,
        "suspicious": suspicious,
        "malicious": malicious,
        "today_visitors": today_visitors,
    }


def get_total_users():
    conn = get_connection()
    cursor = conn.cursor()

    # Total Users
    cursor.execute("SELECT COUNT(*) FROM users")
    total_users = cursor.fetchone()[0]

    # Online Users
    cursor.execute("""
        SELECT COUNT(*)
        FROM users
        WHERE is_online = 1
    """)
    online_users = cursor.fetchone()[0]

    conn.close()

    return {
        "total_users": total_users,
        "online_users": online_users,
    }


def save_visitor(visitor_ip):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO visitors (visitor_ip)
        VALUES (?)
        """,
        (visitor_ip,),
    )

    conn.commit()
    conn.close()


def get_recent_scans():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT id, url, threat_score, classification, country, ip, scan_date
        FROM scan_history
        ORDER BY scan_date DESC
        LIMIT 10
        """
    )
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]


def get_top_countries():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT country, COUNT(*) as count
        FROM scan_history
        WHERE country IS NOT NULL AND country != ''
        GROUP BY country
        ORDER BY count DESC
        LIMIT 10
        """
    )
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]


def get_scan_trends():
    conn = get_connection()
    cursor = conn.cursor()

    # Daily (last 7 days)
    cursor.execute(
        """
        SELECT DATE(scan_date) as date, COUNT(*) as count
        FROM scan_history
        WHERE scan_date >= DATE('now', '-6 days')
        GROUP BY DATE(scan_date)
        ORDER BY date ASC
        """
    )
    daily = [dict(row) for row in cursor.fetchall()]

    # Weekly (last 4 weeks)
    cursor.execute(
        """
        SELECT strftime('%Y-%W', scan_date) as week, COUNT(*) as count
        FROM scan_history
        WHERE scan_date >= DATE('now', '-28 days')
        GROUP BY week
        ORDER BY week ASC
        """
    )
    weekly = [dict(row) for row in cursor.fetchall()]

    # Monthly (last 6 months)
    cursor.execute(
        """
        SELECT strftime('%Y-%m', scan_date) as month, COUNT(*) as count
        FROM scan_history
        WHERE scan_date >= DATE('now', '-180 days')
        GROUP BY month
        ORDER BY month ASC
        """
    )
    monthly = [dict(row) for row in cursor.fetchall()]

    conn.close()
    return {
        "daily": daily,
        "weekly": weekly,
        "monthly": monthly,
    }