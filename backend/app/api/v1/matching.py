from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.schemas.common import ResponseEnvelope
from backend.app.services.matching_service import MatchingService

router = APIRouter()


@router.get("/matching/{problem_id}", response_model=ResponseEnvelope[dict])
def get_university_matching_shortlist(problem_id: int, db: Session = Depends(get_db)):
    """
    Executes & returns 16-Factor University Capability vs. Practical Capacity Matching for a problem.
    Returns Ranked Shortlist (#1 Best Match, #2 Alternative, #3 ...).
    Rule: "Best Match != Highest Single Skill Score"
    """
    try:
        result = MatchingService.match_universities_for_problem(db=db, problem_id=problem_id)
        return ResponseEnvelope(
            success=True,
            message="Intelligent Multi-Factor University Matching Shortlist generated",
            data=result
        )
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error executing university matching: {str(e)}")
