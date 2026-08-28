from typing import List, Optional, Dict, Any
from pydantic import BaseModel


class MatchingShortlistItem(BaseModel):
    matching_result_id: Optional[int] = None
    university_id: int
    university_name: str
    rank_order: int
    rank_title: str
    capability_score: float
    capacity_factor: float
    overall_match_score: float
    confidence_level: float
    matched_skills: List[str]
    missing_skills: List[str]
    available_faculty_count: int
    active_projects_count: int
    match_reasons: List[str]


class MatchingResponse(BaseModel):
    problem_id: int
    problem_title: str
    required_skills: List[str]
    shortlist: List[MatchingShortlistItem]
