from typing import Optional, List
from pydantic import BaseModel, ConfigDict
from datetime import datetime


class ProjectCreate(BaseModel):
    problem_id: int
    university_id: int
    title: str
    description: Optional[str] = None
    faculty_mentor_user_id: Optional[int] = None
    student_user_ids: Optional[List[int]] = []


class ProjectResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    project_id: int
    problem_id: int
    university_id: int
    title: str
    description: Optional[str]
    status: str
    progress_percentage: float
    created_at: datetime
