# SIH_26 — Backend Foundation & Real AI Service

Professional, production-aligned FastAPI backend foundation powered by a **Real Local AI Inference Engine** (SentenceTransformers CPU) for problem submission, vector similarity duplicate detection, 7-factor priority scoring, and 16-factor university capability vs. practical capacity matching.

---

## 🚀 Windows Local Setup & Startup Commands

### Prerequisite
Ensure Python 3.10+ is installed and the virtual environment in `ai/benchmark/.venv/` has dependencies installed.

### 1. Initialize & Seed Database
From project root (`c:\Users\DARWIN\OneDrive\Documents\SIH_26`):

```cmd
ai\benchmark\.venv\Scripts\python.exe -m backend.app.db.seed
```

### 2. Run Automated Pytest Test Suite
```cmd
ai\benchmark\.venv\Scripts\python.exe -m pytest backend/tests/ -v
```

### 3. Start Backend FastAPI Server
```cmd
ai\benchmark\.venv\Scripts\python.exe -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```

---

## 📌 Interactive API Documentation
- **Swagger UI:** http://127.0.0.1:8000/docs
- **ReDoc:** http://127.0.0.1:8000/redoc
- **Health Check:** http://127.0.0.1:8000/api/v1/health

---

## 🛠️ Main Endpoints Implemented

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/health` | Health Check (DB & Real AI status) |
| `POST` | `/api/v1/problems` | Submit Problem & Execute Real AI Pipeline |
| `GET` | `/api/v1/problems` | List Problems with Pagination |
| `GET` | `/api/v1/problems/{id}` | Get Problem Details & Real AI Analysis |
| `GET` | `/api/v1/matching/{id}` | Execute 16-Factor University Capability vs Capacity Matching |
| `POST` | `/api/v1/projects` | Instantiate Solution Project, Team & Milestones |
| `GET` | `/api/v1/projects` | List Active Solution Projects |
| `GET` | `/api/v1/ai/models` | List AI Model Registry Entries |
