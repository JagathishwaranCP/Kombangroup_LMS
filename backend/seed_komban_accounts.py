"""
Upsert admin + learner accounts directly in the local DB.
Safe to re-run — updates password/role if the email already exists.
"""
import asyncio
import sys

import bcrypt
from dotenv import load_dotenv
from sqlalchemy import select

load_dotenv()

from database import AsyncSessionLocal, engine
import models

ACCOUNTS = [
    {
        "email": "kombanadmin@gmail.com",
        "password": "kombanadmin@123",
        "full_name": "KOMBAN Admin",
        "role": "instructor",
        "phone_number": "9000000001",
    },
    {
        "email": "kombanuser@gmail.com",
        "password": "kombanuser@123",
        "full_name": "KOMBAN User",
        "role": "student",
        "phone_number": "9000000002",
    },
    {
        "email": "admin@cloudconnekt.com",
        "password": "Admin@123",
        "full_name": "CloudConnekt Admin",
        "role": "instructor",
        "phone_number": "9000000011",
    },
    {
        "email": "user@cloudconnekt.com",
        "password": "User@123",
        "full_name": "CloudConnekt User",
        "role": "student",
        "phone_number": "9000000012",
    },
]


def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


async def seed() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        for account in ACCOUNTS:
            result = await db.execute(
                select(models.User).where(models.User.email == account["email"])
            )
            user = result.scalars().first()
            if user:
                user.hashed_password = get_password_hash(account["password"])
                user.full_name = account["full_name"]
                user.role = account["role"]
                user.phone_number = account["phone_number"]
                user.is_active = True
                action = "updated"
            else:
                db.add(
                    models.User(
                        email=account["email"],
                        hashed_password=get_password_hash(account["password"]),
                        full_name=account["full_name"],
                        role=account["role"],
                        phone_number=account["phone_number"],
                        is_active=True,
                    )
                )
                action = "created"
            print(f"{action}: {account['email']} ({account['role']})")
        await db.commit()
    print("Accounts ready.")


if __name__ == "__main__":
    if sys.platform.startswith("win"):
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(seed())
