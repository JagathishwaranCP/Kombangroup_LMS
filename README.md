# KOMBAN Learning Management System

Full-stack LMS for KOMBAN Consulting Group — courses, payments, assignments, and secure authentication.

## Architecture
- **Backend:** FastAPI, SQLAlchemy, JWT auth (PostgreSQL or TiDB/MySQL)
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion

## Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL or TiDB Cloud (MySQL-compatible)

---

## Environment variables

Copy the example files and fill in **your** KOMBAN credentials (never commit real secrets):

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### Backend (`backend/.env`)

```ini
SECRET_KEY="change_me_in_production"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=60
DATABASE_URL="your_database_url"
RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
EMAIL_SENDER="support@kombangroup.com"
BREVO_API_KEY="your_brevo_api_key"
```

### Frontend (`frontend/.env`)

```ini
VITE_API_URL=http://localhost:8000/api/v1
VITE_RAZORPAY_KEY_ID="your_razorpay_key_id"
VITE_RAZORPAY_PAYLINK_URL="https://razorpay.me/your_komban_paylink"
```

---

## Run locally

### Backend
```bash
cd backend
python -m venv venv
# Windows: .\venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn main:app --reload
```
API: `http://localhost:8000` · Docs: `http://localhost:8000/docs`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App: `http://localhost:5173`

### Optional seed users
```bash
python seed_admin.py
python seed_student.py
```
