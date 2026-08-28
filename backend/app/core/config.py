import os
from pydantic import BaseModel


def parse_cors_origins() -> list:
    origins_env = os.getenv("CORS_ORIGINS")
    if not origins_env:
        return ["*"]
    if origins_env.strip() == "*":
        return ["*"]
    return [origin.strip() for origin in origins_env.split(",") if origin.strip()]


class Settings(BaseModel):
    PROJECT_NAME: str = "ECHO Societal Innovation Platform"
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

    # CORS Origins (configurable via environment variable with ["*"] default)
    CORS_ORIGINS: list = parse_cors_origins()


settings = Settings()
