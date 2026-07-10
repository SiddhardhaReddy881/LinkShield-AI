from app.auth.auth_database import get_connection
from app.auth.security import hash_password


def reset_password(email, new_password):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE email=?",
        (email,)
    )

    user = cursor.fetchone()

    if not user:
        conn.close()

        return {
            "success": False,
            "message": "Email not found."
        }

    new_hash = hash_password(new_password)

    cursor.execute(
        """
        UPDATE users
        SET password=?
        WHERE email=?
        """,
        (
            new_hash,
            email,
        )
    )

    conn.commit()
    conn.close()

    return {
        "success": True,
        "message": "Password updated successfully."
    }