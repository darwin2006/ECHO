from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from backend.app.db.session import get_db
from backend.app.schemas.common import ResponseEnvelope
from backend.app.core.config import settings
from ai.service import ai_service

router = APIRouter()


@router.get("/health", response_model=ResponseEnvelope[dict])
def health_check(db: Session = Depends(get_db)):
    """
    Backend Health Check Endpoint.
    Verifies API server status, Database connection, and Real AI Service status.
    """
    db_status = "connected"
    try:
        db.scalar(text("SELECT 1"))
    except Exception as e:
        db_status = f"error: {str(e)}"

    ai_status = "loaded" if ai_service.model_name else "uninitialized"

    health_data = {
        "status": "healthy",
        "project": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "database": db_status,
        "ai_service": {
            "status": ai_status,
            "model_name": ai_service.model_name,
            "engine": "SentenceTransformers (CPU Local Real Inference)"
        }
    }

    return ResponseEnvelope(
        success=True,
        message="SIH_26 Platform Foundation API is fully operational",
        data=health_data
    )
