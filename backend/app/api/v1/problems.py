import json
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.models.problem import Problem
from backend.app.models.ai import AIAnalysis
from backend.app.schemas.problem import ProblemCreate, ProblemResponse, AIAnalysisResponse
from backend.app.schemas.common import ResponseEnvelope
from backend.app.services.problem_service import ProblemService

router = APIRouter()


@router.post("/problems", response_model=ResponseEnvelope[dict], status_code=status.HTTP_201_CREATED)
def create_problem(problem_in: ProblemCreate, db: Session = Depends(get_db)):
    """
    Submits a societal problem and triggers the Real AI Analysis Pipeline:
    - Generates Real 384-D vector embeddings via SentenceTransformers
    - Evaluates Cosine Similarity Duplicate Detection against stored problems
    - Calculates Deterministic 7-Factor Priority Score
    - Returns structured analysis & similarity matches
    """
    try:
        result = ProblemService.create_problem_and_run_ai(db=db, problem_in=problem_in)
        prob = result["problem"]
        ana = result["analysis"]

        payload = {
            "problem": {
                "problem_id": prob.problem_id,
                "title": prob.title,
                "description": prob.description,
                "language": prob.language,
                "category": prob.category,
                "district": prob.district,
                "state": prob.state,
                "status": prob.status.value
            },
            "ai_analysis": {
                "analysis_id": ana.analysis_id,
                "detected_language": ana.detected_language,
                "extracted_category": ana.extracted_category,
                "extracted_skills": json.loads(ana.extracted_skills_json),
                "priority_score": ana.priority_score,
                "priority_level": ana.priority_level,
                "priority_breakdown": json.loads(ana.priority_breakdown_json),
                "duplicate_relationship": ana.duplicate_relationship,
                "max_similarity": ana.max_similarity,
                "similar_candidates": result["similar_candidates"]
            }
        }

        msg = "Problem created and duplicate review flagged." if ana.duplicate_relationship in ["EXACT_DUPLICATE", "LIKELY_DUPLICATE"] else "Problem submitted and Real AI Analysis completed successfully."

        return ResponseEnvelope(
            success=True,
            message=msg,
            data=payload
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error executing Problem Submission AI Pipeline: {str(e)}"
        )


@router.get("/problems", response_model=ResponseEnvelope[List[ProblemResponse]])
def list_problems(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    """
    Lists submitted societal problems with pagination.
    """
    problems = db.query(Problem).order_by(Problem.created_at.desc()).offset(skip).limit(limit).all()
    
    # Serialize status enum
    serialized = []
    for p in problems:
        p_dict = {
            "problem_id": p.problem_id,
            "submitted_by_user_id": p.submitted_by_user_id,
            "title": p.title,
            "description": p.description,
            "language": p.language,
            "category": p.category,
            "subcategory": p.subcategory,
            "locality": p.locality,
            "district": p.district,
            "state": p.state,
            "severity": p.severity,
            "population_impact": p.population_impact,
            "urgency": p.urgency,
            "community_support_count": p.community_support_count,
            "is_government_priority": p.is_government_priority,
            "feasibility": p.feasibility,
            "status": p.status.value,
            "created_at": p.created_at
        }
        serialized.append(p_dict)

    return ResponseEnvelope(
        success=True,
        message=f"Retrieved {len(serialized)} problems",
        data=serialized
    )


@router.get("/problems/{problem_id}", response_model=ResponseEnvelope[dict])
def get_problem_detail(problem_id: int, db: Session = Depends(get_db)):
    """
    Fetches detailed problem information along with its Real AI Analysis.
    """
    prob = db.query(Problem).filter(Problem.problem_id == problem_id).first()
    if not prob:
        raise HTTPException(status_code=404, detail="Problem not found")

    ana = db.query(AIAnalysis).filter(AIAnalysis.problem_id == problem_id).first()

    analysis_data = None
    if ana:
        analysis_data = {
            "analysis_id": ana.analysis_id,
            "detected_language": ana.detected_language,
            "extracted_category": ana.extracted_category,
            "extracted_skills": json.loads(ana.extracted_skills_json) if ana.extracted_skills_json else [],
            "priority_score": ana.priority_score,
            "priority_level": ana.priority_level,
            "priority_breakdown": json.loads(ana.priority_breakdown_json) if ana.priority_breakdown_json else {},
            "duplicate_relationship": ana.duplicate_relationship,
            "max_similarity": ana.max_similarity,
            "model_id": ana.model_id
        }

    data = {
        "problem": {
            "problem_id": prob.problem_id,
            "title": prob.title,
            "description": prob.description,
            "language": prob.language,
            "category": prob.category,
            "district": prob.district,
            "state": prob.state,
            "status": prob.status.value,
            "created_at": prob.created_at
        },
        "ai_analysis": analysis_data
    }

    return ResponseEnvelope(success=True, message="Problem details fetched", data=data)
