"""
Upsert the single CloudConnekt admin + learner pair.
Also deactivates legacy KOMBAN demo accounts so only one access set remains.

Safe to re-run.
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

LEGACY_EMAILS = [
    "kombanadmin@gmail.com",
    "kombanuser@gmail.com",
    "admin@komban.com",
    "instructor@komban.com",
    "student@komban.com",
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

        # Deactivate legacy dual KOMBAN accounts
        legacy = await db.execute(
            select(models.User).where(models.User.email.in_(LEGACY_EMAILS))
        )
        for user in legacy.scalars().all():
            user.is_active = False
            print(f"deactivated legacy: {user.email}")

        await db.commit()

    print()
    print("CloudConnekt access ready (single admin + user).")
    print("----------------------------------------")
    print("ADMIN  : admin@cloudconnekt.com / Admin@123  → /admin-login")
    print("USER   : user@cloudconnekt.com  / User@123   → /login")
    print("----------------------------------------")


if __name__ == "__main__":
    if sys.platform.startswith("win"):
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(seed())
