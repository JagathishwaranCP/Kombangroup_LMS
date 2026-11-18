import requests

API_URL = "http://127.0.0.1:8000/api/v1/users"

def seed_users():
    instructor = {
        "email": "admin@cloudconnekt.com",
        "password": "Admin@123",
        "name": "CloudconneKt Admin",
        "role": "instructor",
        "phone_number": "9000000011",
    }

    student = {
        "email": "user@cloudconnekt.com",
        "password": "User@123",
        "name": "CloudconneKt User",
        "role": "student",
        "phone_number": "9000000012",
    }

    print("Seeding CloudconneKt accounts...")

    for account, label in ((instructor, "Admin"), (student, "User")):
        try:
            res = requests.post(API_URL, json=account)
            if res.status_code == 201:
                print(f"Created {label}: {account['email']}")
            elif res.status_code == 400:
                print(f"{label} already exists: {account['email']}")
            else:
                print(f"Failed to create {label}: {res.status_code} - {res.text}")
        except Exception as e:
            print(f"Connection Error: {e}")

if __name__ == "__main__":
    seed_users()
