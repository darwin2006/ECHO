from typing import Optional, List
from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime


class ProblemCreate(BaseModel):
    title: str = Field(..., json_schema_extra={"example": "Smart Urban Flood & Drainage Monitoring System"})
    description: str = Field(..., json_schema_extra={"example": "Frequent waterlogging in school road due to unmonitored blocked drains during heavy monsoon rain."})
    language: Optional[str] = "en"
    category: Optional[str] = "Environment"
    subcategory: Optional[str] = "Urban Drainage"
    locality: Optional[str] = "Kotturpuram"
    district: Optional[str] = "Chennai"
    state: Optional[str] = "Tamil Nadu"
    severity: Optional[float] = 4.0
    population_impact: Optional[float] = 4.0
    urgency: Optional[float] = 4.0
    community_support_count: Optional[int] = 10
    is_government_priority: Optional[int] = 1
    feasibility: Optional[float] = 4.0
    required_skills: Optional[List[str]] = ["IoT", "Sensors", "GIS", "Python"]


class ProblemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    problem_id: int
    submitted_by_user_id: int
    title: str
    description: str
    language: str
    category: str
    subcategory: Optional[str]
    locality: Optional[str]
    district: Optional[str]
    state: str
    severity: float
    population_impact: float
    urgency: float
    community_support_count: int
    is_government_priority: int
    feasibility: float
    status: str
    created_at: datetime


class AIAnalysisResponse(BaseModel):
    analysis_id: int
    problem_id: int
    detected_language: str
    extracted_category: Optional[str]
    extracted_skills: List[str]
    priority_score: float
    priority_level: str
    duplicate_relationship: str
    max_similarity: float
    model_id: str
    created_at: datetime
