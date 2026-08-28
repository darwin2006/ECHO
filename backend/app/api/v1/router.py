from fastapi import APIRouter
from backend.app.api.v1 import health, problems, matching, projects, ai_models, analytics

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(problems.router, tags=["Problems & Real AI"])
api_router.include_router(matching.router, tags=["University Matching"])
api_router.include_router(projects.router, tags=["Projects & Milestones"])
api_router.include_router(ai_models.router, tags=["AI Model Registry"])
api_router.include_router(analytics.router, tags=["Impact Analytics"])
