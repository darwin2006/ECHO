import json
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.models.ai import AIModelRegistry
from backend.app.schemas.common import ResponseEnvelope

router = APIRouter()


@router.get("/ai/models", response_model=ResponseEnvelope[List[dict]])
def list_ai_models(db: Session = Depends(get_db)):
    """
    Returns registered AI models, embeddings, classifiers, and benchmark metadata.
    """
    models = db.query(AIModelRegistry).all()
    payload = []
    for m in models:
        payload.append({
            "model_registry_id": m.model_registry_id,
            "model_id": m.model_id,
            "model_name": m.model_name,
            "model_version": m.model_version,
            "model_purpose": m.model_purpose,
            "supported_languages": m.supported_languages,
            "embedding_dim": m.embedding_dim,
            "license": m.license,
            "deployment_type": m.deployment_type,
            "resource_requirements": m.resource_requirements,
            "status": m.status,
            "benchmark_metrics": json.loads(m.benchmark_metrics_json) if m.benchmark_metrics_json else {}
        })
    return ResponseEnvelope(success=True, message=f"Retrieved {len(payload)} AI model registry entries", data=payload)
