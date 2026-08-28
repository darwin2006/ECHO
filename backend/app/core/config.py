import os
from pydantic import BaseModel


class Settings(BaseModel):
    PROJECT_NAME: str = "SIH_26 Societal Innovation Platform"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    # Database Settings
    # SQLite default for local MVP, designed for zero-refactor migration to PostgreSQL + pgvector
    BASE_DIR: str = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    DATABASE_PATH: str = os.path.join(BASE_DIR, "sih_26_dev.db")
    DATABASE_URL: str = os.getenv("DATABASE_URL", f"sqlite:///{DATABASE_PATH}")
    
    # AI Model Settings
    AI_MODEL_NAME: str = os.getenv("AI_MODEL_NAME", "all-MiniLM-L6-v2")
    DUPLICATE_THRESHOLD: float = 0.82

    # CORS Origins
    CORS_ORIGINS: list = ["*"]


settings = Settings()
