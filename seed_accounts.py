"""Create the KOMBAN admin (instructor) and learner (student) accounts."""
import os
import requests

BASE_URL = os.getenv("API_URL", "http://127.0.0.1:8000/api/v1")

ACCOUNTS = [
    {
        "email": "kombanadmin@gmail.com",
        "password": "kombanadmin@123",
        "name": "KOMBAN Admin",
        "role": "instructor",
        "phone_number": "9000000001",
        "label": "Admin / Instructor",
        "login_path": "/admin-login",
    },
    {
        "email": "kombanuser@gmail.com",
        "password": "kombanuser@123",
        "name": "KOMBAN User",
        "role": "student",
        "phone_number": "9000000002",
        "label": "Learner / Student",
        "login_path": "/login",
    },
]


def upsert_account(account: dict) -> None:
    label = account["label"]
    payload = {
        "email": account["email"],
        "password": account["password"],
        "name": account["name"],
        "role": account["role"],
        "phone_number": account["phone_number"],
    }

    print(f"\nCreating {label}...")
    try:
        response = requests.post(f"{BASE_URL}/users", json=payload, timeout=15)
    except requests.exceptions.ConnectionError:
        print("Backend not reachable at", BASE_URL)
        print("Start it with: cd backend && python run_server.py")
        raise SystemExit(1)

    if response.status_code == 201:
        print(f"Created {label}")
    elif response.status_code == 400:
        print(f"{label} already exists — verifying login...")
    else:
        print(f"Failed ({response.status_code}): {response.text}")
        return

    # Verify login works with the requested password
    login = requests.post(
        f"{BASE_URL}/login",
        data={"username": account["email"], "password": account["password"]},
        timeout=15,
    )
    if login.status_code == 200 and login.json().get("role") == account["role"]:
        print(f"Login OK → {account['email']} / {account['password']}")
        print(f"Portal: http://localhost:5173{account['login_path']}")
        print(f"Role: {account['role']}")
    else:
        print(f"Login failed for {account['email']}: {login.status_code} {login.text}")
        print("If the account already existed with a different password, delete it from the DB and re-run.")


if __name__ == "__main__":
    print("Seeding KOMBAN admin + user accounts...")
    for account in ACCOUNTS:
        upsert_account(account)
    print("\nDone.")
