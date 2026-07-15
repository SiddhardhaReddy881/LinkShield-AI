from app.auth.auth_database import get_connection
from app.auth.security import hash_password, verify_password


def register_user(username, email, password):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE email=?",
        (email,)
    )

    if cursor.fetchone():
        conn.close()
        return {
            "success": False,
            "message": "Email already exists."
        }

    hashed_password = hash_password(password)

    cursor.execute(
        """
        INSERT INTO users
        (username, email, password)
        VALUES (?, ?, ?)
        """,
        (
            username,
            email,
            hashed_password,
        ),
    )

    conn.commit()
    conn.close()

    return {
        "success": True,
        "message": "Registration Successful"
    }


def login_user(email, password):
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
            "message": "User not found."
        }

    if not verify_password(password, user["password"]):
        conn.close()
        return {
            "success": False,
            "message": "Incorrect password."
        }

    cursor.execute(
        """
        UPDATE users
        SET
            is_online = 1,
            last_login = CURRENT_TIMESTAMP
        WHERE id = ?
        """,
        (user["id"],)
    )

    conn.commit()

    cursor.execute(
        "SELECT id, username, email, is_online, last_login FROM users WHERE id = ?",
        (user["id"],)
    )

    updated_user = cursor.fetchone()
    conn.close()

    return {
        "success": True,
        "message": "Login Successful",
        "user": {
            "id": updated_user["id"],
            "username": updated_user["username"],
            "email": updated_user["email"],
        },
    }


def logout_user(user_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE users SET is_online = 0 WHERE id = ?",
        (user_id,),
    )
    conn.commit()
    conn.close()
    return True


def get_all_users():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT id, username, email, is_online, last_login, created_at
        FROM users
        ORDER BY created_at DESC
        """
    )
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]


def delete_user_by_id(user_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "DELETE FROM users WHERE id = ?",
        (user_id,),
    )
    conn.commit()
    conn.close()
    return True


def get_recent_logins():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT id, username, email, last_login, is_online
        FROM users
        WHERE last_login IS NOT NULL
        ORDER BY last_login DESC
        LIMIT 10
        """
    )
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]
