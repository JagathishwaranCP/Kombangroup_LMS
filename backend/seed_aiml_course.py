"""
Seed a full demo AIML course with modules, videos, notes, quiz,
assignment, live class, live test, price, and publish flag.

Safe to re-run: deletes/recreates the course titled COURSE_TITLE.
"""
import asyncio
import json
import sys
from datetime import datetime, timedelta

from dotenv import load_dotenv
from sqlalchemy import delete, select
from sqlalchemy.orm import selectinload

load_dotenv()

from database import AsyncSessionLocal, engine
import models

COURSE_TITLE = "AI & Machine Learning Mastery (Demo)"
INSTRUCTOR_EMAIL = "admin@cloudconnekt.com"
STUDENT_EMAIL = "user@cloudconnekt.com"

COURSE_IMAGE = (
    "https://images.unsplash.com/photo-1677442136019-21780ecad995"
    "?auto=format&fit=crop&w=1200&q=80"
)

# Public educational YouTube videos (IDs / watch URLs work with Plyr)
VIDEOS = {
    "intro_ai": "https://www.youtube.com/watch?v=air5KKzau9k",
    "ml_crash": "https://www.youtube.com/watch?v=ukzFI9rgwfU",
    "python_ml": "https://www.youtube.com/watch?v=7eh4d6sabA0",
    "supervised": "https://www.youtube.com/watch?v=4b4MUYyg3-s",
    "neural": "https://www.youtube.com/watch?v=air5KKzau9k",
    "live": "https://www.youtube.com/watch?v=IHZwWFHWa-w",
}


def resources(*pairs):
    return json.dumps([{"title": t, "link": u} for t, u in pairs])


async def seed() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        instructor_res = await db.execute(
            select(models.User).where(models.User.email == INSTRUCTOR_EMAIL)
        )
        instructor = instructor_res.scalars().first()
        if not instructor:
            raise RuntimeError(
                f"Instructor {INSTRUCTOR_EMAIL} not found. Run seed_komban_accounts.py first."
            )

        student_res = await db.execute(
            select(models.User).where(models.User.email == STUDENT_EMAIL)
        )
        student = student_res.scalars().first()

        existing_res = await db.execute(
            select(models.Course)
            .options(selectinload(models.Course.modules).selectinload(models.Module.items))
            .where(models.Course.title == COURSE_TITLE)
        )
        existing = existing_res.scalars().first()
        if existing:
            module_ids = [m.id for m in existing.modules]
            item_ids = [i.id for m in existing.modules for i in m.items]
            if item_ids:
                await db.execute(
                    delete(models.LessonProgress).where(
                        models.LessonProgress.content_item_id.in_(item_ids)
                    )
                )
                await db.execute(
                    delete(models.Submission).where(
                        models.Submission.content_item_id.in_(item_ids)
                    )
                )
                await db.execute(
                    delete(models.ContentItem).where(models.ContentItem.id.in_(item_ids))
                )
            if module_ids:
                await db.execute(
                    delete(models.Module).where(models.Module.id.in_(module_ids))
                )
            await db.execute(
                delete(models.Enrollment).where(models.Enrollment.course_id == existing.id)
            )
            await db.execute(
                delete(models.UserCertificate).where(
                    models.UserCertificate.course_id == existing.id
                )
            )
            await db.execute(
                delete(models.CourseChallenge).where(
                    models.CourseChallenge.course_id == existing.id
                )
            )
            await db.delete(existing)
            await db.commit()
            print(f"Removed previous demo course: {COURSE_TITLE}")

        course = models.Course(
            title=COURSE_TITLE,
            description=(
                "End-to-end AI & Machine Learning demo course for KOMBAN LMS. "
                "Includes video lessons, notes, quizzes, assignments, live class, "
                "and a timed live test. Perfect for showcasing every platform feature."
            ),
            price=4999,
            image_url=COURSE_IMAGE,
            is_published=True,
            instructor_id=instructor.id,
            course_type="standard",
            language="python",
        )
        db.add(course)
        await db.flush()

        now = datetime.utcnow()
        live_start = now - timedelta(hours=1)
        live_end = now + timedelta(days=30)

        curriculum = [
            {
                "title": "1. Getting Started with AI",
                "items": [
                    {
                        "title": "Welcome to AI & ML Mastery",
                        "type": "video",
                        "content": VIDEOS["intro_ai"],
                        "duration": 18,
                        "order": 0,
                        "resource_links": resources(
                            ("Course Syllabus PDF", "https://drive.google.com/file/d/demo-aiml-syllabus/view"),
                            ("Setup Checklist", "https://drive.google.com/file/d/demo-aiml-setup/view"),
                        ),
                        "instructions": "Watch the intro and download the syllabus from Resources.",
                    },
                    {
                        "title": "Course Handbook (Notes)",
                        "type": "note",
                        "content": "https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view",
                        "duration": 10,
                        "order": 1,
                        "instructions": "Read the handbook before Module 2.",
                    },
                    {
                        "title": "Orientation Quiz",
                        "type": "quiz",
                        "content": "https://docs.google.com/forms/d/e/1FAIpQLSdEXAMPLE_AIML_ORIENTATION/viewform?embedded=true",
                        "duration": 15,
                        "order": 2,
                        "instructions": "Complete this short quiz to unlock the next module mindset.",
                    },
                ],
            },
            {
                "title": "2. Python for Machine Learning",
                "items": [
                    {
                        "title": "Python Crash Course for ML",
                        "type": "video",
                        "content": VIDEOS["python_ml"],
                        "duration": 45,
                        "order": 0,
                        "resource_links": resources(
                            ("NumPy Cheatsheet", "https://numpy.org/doc/stable/user/quickstart.html"),
                            ("Pandas Docs", "https://pandas.pydata.org/docs/"),
                        ),
                    },
                    {
                        "title": "ML Libraries Overview",
                        "type": "video",
                        "content": VIDEOS["ml_crash"],
                        "duration": 30,
                        "order": 1,
                    },
                    {
                        "title": "Python Warm-up Assignment",
                        "type": "assignment",
                        "content": "https://drive.google.com/file/d/demo-aiml-python-assignment/view",
                        "duration": 60,
                        "order": 2,
                        "is_mandatory": True,
                        "instructions": (
                            "1) Load a CSV with pandas.\n"
                            "2) Clean missing values.\n"
                            "3) Plot a simple distribution.\n"
                            "Upload your notebook (.ipynb) or Drive link."
                        ),
                    },
                ],
            },
            {
                "title": "3. Supervised Learning",
                "items": [
                    {
                        "title": "Regression & Classification Explained",
                        "type": "video",
                        "content": VIDEOS["supervised"],
                        "duration": 40,
                        "order": 0,
                        "resource_links": resources(
                            ("Scikit-learn Tutorial", "https://scikit-learn.org/stable/tutorial/basic/tutorial.html"),
                        ),
                    },
                    {
                        "title": "Supervised Learning Notes",
                        "type": "note",
                        "content": "https://drive.google.com/file/d/demo-aiml-supervised-notes/view",
                        "duration": 20,
                        "order": 1,
                    },
                    {
                        "title": "Model Selection Quiz",
                        "type": "quiz",
                        "content": "https://docs.google.com/forms/d/e/1FAIpQLSdEXAMPLE_AIML_SUPERVISED/viewform?embedded=true",
                        "duration": 20,
                        "order": 2,
                    },
                ],
            },
            {
                "title": "4. Neural Networks & Deep Learning",
                "items": [
                    {
                        "title": "Neural Networks Intuition",
                        "type": "video",
                        "content": VIDEOS["neural"],
                        "duration": 25,
                        "order": 0,
                        "resource_links": resources(
                            ("3Blue1Brown Series", "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi"),
                        ),
                    },
                    {
                        "title": "🔴 Live Class: Build Your First Neural Net",
                        "type": "live_class",
                        "content": VIDEOS["live"],
                        "duration": 60,
                        "order": 1,
                        "instructions": "Join the live session. Replay stays available after class.",
                    },
                    {
                        "title": "Live Test: AI Fundamentals",
                        "type": "live_test",
                        "content": "https://docs.google.com/forms/d/e/1FAIpQLSdEXAMPLE_AIML_LIVE_TEST/viewform?embedded=true",
                        "duration": 30,
                        "order": 2,
                        "is_mandatory": True,
                        "start_time": live_start,
                        "end_time": live_end,
                        "test_config": json.dumps(
                            {
                                "pass_score": 70,
                                "questions": 20,
                                "proctoring": True,
                            }
                        ),
                        "instructions": "Timed assessment. Do not switch tabs. Camera/proctoring rules apply.",
                    },
                ],
            },
            {
                "title": "5. Capstone Project",
                "items": [
                    {
                        "title": "Capstone Briefing Video",
                        "type": "video",
                        "content": VIDEOS["ml_crash"],
                        "duration": 15,
                        "order": 0,
                    },
                    {
                        "title": "Capstone Project Submission",
                        "type": "assignment",
                        "content": "https://drive.google.com/file/d/demo-aiml-capstone-brief/view",
                        "duration": 180,
                        "order": 1,
                        "is_mandatory": True,
                        "instructions": (
                            "Build an end-to-end ML pipeline:\n"
                            "- Problem statement & dataset\n"
                            "- EDA + feature engineering\n"
                            "- Train/evaluate at least 2 models\n"
                            "- Short report + GitHub or Drive link\n"
                            "Mark as complete after instructor review."
                        ),
                    },
                    {
                        "title": "Capstone Reference Notes",
                        "type": "note",
                        "content": "https://drive.google.com/file/d/demo-aiml-capstone-notes/view",
                        "duration": 15,
                        "order": 2,
                    },
                ],
            },
        ]

        for m_idx, mod in enumerate(curriculum):
            module = models.Module(
                title=mod["title"],
                order=m_idx,
                course_id=course.id,
            )
            db.add(module)
            await db.flush()
            for item in mod["items"]:
                db.add(
                    models.ContentItem(
                        title=item["title"],
                        type=item["type"],
                        content=item.get("content"),
                        duration=item.get("duration"),
                        is_mandatory=item.get("is_mandatory", False),
                        order=item["order"],
                        module_id=module.id,
                        instructions=item.get("instructions"),
                        test_config=item.get("test_config"),
                        resource_links=item.get("resource_links"),
                        start_time=item.get("start_time"),
                        end_time=item.get("end_time"),
                    )
                )

        # Coding challenge attached to the course (Code Arena feature)
        db.add(
            models.CourseChallenge(
                course_id=course.id,
                title="Predict House Prices (Starter)",
                description=(
                    "Write a function that returns the mean of a list of house prices. "
                    "This is a warm-up before the full regression capstone."
                ),
                difficulty="Easy",
                function_name="mean_price",
                test_cases=json.dumps(
                    [
                        {"input": "[100, 200, 300]", "output": "200", "hidden": False},
                        {"input": "[50, 50]", "output": "50", "hidden": False},
                        {"input": "[10, 20, 30, 40]", "output": "25", "hidden": True},
                    ]
                ),
            )
        )

        # Optional: enroll demo student as paid so they can open the player immediately
        if student:
            db.add(
                models.Enrollment(
                    user_id=student.id,
                    course_id=course.id,
                    enrollment_type="paid",
                    expiry_date=None,
                )
            )

        # Notify students that a new course is available
        students_res = await db.execute(
            select(models.User).where(models.User.role == "student", models.User.is_active == True)
        )
        for s in students_res.scalars().all():
            db.add(
                models.Notification(
                    user_id=s.id,
                    title="New Course Alert!",
                    message=f"New course '{COURSE_TITLE}' is now available.",
                    created_at=datetime.utcnow(),
                )
            )

        await db.commit()
        print(f"✅ Created: {COURSE_TITLE}")
        print(f"   Course ID : {course.id}")
        print(f"   Price     : ₹{course.price}")
        print(f"   Published : {course.is_published}")
        print(f"   Instructor: {instructor.email}")
        if student:
            print(f"   Enrolled  : {student.email} (paid)")
        print("   Features  : video, note, quiz, assignment, live_class, live_test, challenge")


if __name__ == "__main__":
    if sys.platform.startswith("win"):
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(seed())
