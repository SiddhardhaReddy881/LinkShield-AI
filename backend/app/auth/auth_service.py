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
        (username,email,password)
        VALUES (?,?,?)
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

    conn.close()

    if not user:
        return {
            "success": False,
            "message": "User not found."
        }

    if not verify_password(password, user["password"]):
        return {
            "success": False,
            "message": "Incorrect password."
        }

    return {
        "success": True,
        "message": "Login Successful",
        "user": {
            "id": user["id"],
            "username": user["username"],
            "email": user["email"],
        },
    }