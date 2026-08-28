from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.models.problem import Problem, ProblemStatusEnum
from backend.app.models.institution import University, Department
from backend.app.models.user import User
from backend.app.models.profile import FacultyProfile, StudentProfile, IndustryProfile
from backend.app.models.project import Project, Team, TeamMember, Milestone, IndustryCollaboration
from backend.app.schemas.project import ProjectCreate
from backend.app.schemas.common import ResponseEnvelope

router = APIRouter()


class MilestoneUpdate(BaseModel):
    status: str  # PLANNED, IN_PROGRESS, COMPLETED


class CollaborationCreate(BaseModel):
    industry_profile_id: int
    resource_type: str = "TECHNICAL_MENTORSHIP_AND_HARDWARE"
    notes: Optional[str] = None


@router.get("/team-candidates/{university_id}", response_model=ResponseEnvelope[dict])
def get_team_candidates(university_id: int, db: Session = Depends(get_db)):
    """
    Returns available faculty mentors and student candidates for a university campus.
    """
    univ = db.query(University).filter(University.university_id == university_id).first()
    if not univ:
        raise HTTPException(status_code=404, detail="University not found")

    faculty_list = []
    student_list = []

    for dept in univ.departments:
        for f in dept.faculty_members:
            faculty_list.append({
                "faculty_profile_id": f.faculty_profile_id,
                "user_id": f.user_id,
                "full_name": f.user.full_name,
                "email": f.user.email,
                "designation": f.designation,
                "department_name": dept.name,
                "is_available": f.is_available
            })

        for s in dept.students:
            student_list.append({
                "student_profile_id": s.student_profile_id,
                "user_id": s.user_id,
                "full_name": s.user.full_name,
                "email": s.user.email,
                "academic_year": s.academic_year,
                "department_name": dept.name,
                "is_available": s.is_available
            })

    return ResponseEnvelope(
        success=True,
        message=f"Retrieved team candidates for {univ.name}",
        data={
            "university_id": university_id,
            "university_name": univ.name,
            "faculty_mentors": faculty_list,
            "students": student_list
        }
    )


@router.post("/projects", response_model=ResponseEnvelope[dict], status_code=status.HTTP_201_CREATED)
def create_project(project_in: ProjectCreate, db: Session = Depends(get_db)):
    """
    Instantiates a Solution Project for an accepted problem, assigns university, student/faculty team, and initializes 6 milestones.
    """
    prob = db.query(Problem).filter(Problem.problem_id == project_in.problem_id).first()
    if not prob:
        raise HTTPException(status_code=404, detail="Problem not found")

    univ = db.query(University).filter(University.university_id == project_in.university_id).first()
    if not univ:
        raise HTTPException(status_code=404, detail="University not found")

    # Check if project already exists for this problem
    existing_project = db.query(Project).filter(Project.problem_id == project_in.problem_id).first()
    if existing_project:
        return ResponseEnvelope(
            success=True,
            message="Solution Project already instantiated for this problem",
            data={
                "project_id": existing_project.project_id,
                "problem_id": existing_project.problem_id,
                "university_name": univ.name,
                "title": existing_project.title,
                "status": existing_project.status,
                "progress_percentage": existing_project.progress_percentage
            }
        )

    # Create Project
    db_project = Project(
        problem_id=project_in.problem_id,
        university_id=project_in.university_id,
        title=project_in.title,
        description=project_in.description or f"Solution project for {prob.title}",
        status="IN_PROGRESS",
        progress_percentage=20.0
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)

    # Create Team
    db_team = Team(
        project_id=db_project.project_id,
        name=f"Team {univ.code} - {db_project.title[:20]}",
        faculty_mentor_user_id=project_in.faculty_mentor_user_id
    )
    db.add(db_team)
    db.commit()
    db.refresh(db_team)

    # Assign student members
    for uid in (project_in.student_user_ids or []):
        db.add(TeamMember(team_id=db_team.team_id, user_id=uid, role_title="Student Innovator"))

    # Initialize 6 Canonical Milestones
    m_list = [
        Milestone(project_id=db_project.project_id, title="01. Problem Validation & Field Survey", description="Community requirements survey and baseline validation", status="COMPLETED"),
        Milestone(project_id=db_project.project_id, title="02. Solution Architecture & Hardware Design", description="Technical design specification and component selection", status="IN_PROGRESS"),
        Milestone(project_id=db_project.project_id, title="03. Prototype Fabrication & Software Integration", description="Hardware assembly and backend sensor telemetry API connection", status="PLANNED"),
        Milestone(project_id=db_project.project_id, title="04. Field Testing & Community Pilot Validation", description="On-site pilot deployment in target locality", status="PLANNED"),
        Milestone(project_id=db_project.project_id, title="05. Deployment & State Governance Handoff", description="Final deployment review with municipal authorities", status="PLANNED"),
        Milestone(project_id=db_project.project_id, title="06. Impact Measurement & Regional Scaling", description="Post-deployment population impact scoring and expansion plan", status="PLANNED"),
    ]
    db.add_all(m_list)

    # Auto-link Industry Partner Collaboration if available
    ind = db.query(IndustryProfile).first()
    if ind:
        collab = IndustryCollaboration(
            project_id=db_project.project_id,
            industry_profile_id=ind.industry_profile_id,
            resource_type="IoT Hardware Sensors & Cloud Telemetry APIs",
            notes="Partner sponsor providing telemetry APIs, hardware components, and technical mentorship."
        )
        db.add(collab)

    # Update problem status
    prob.status = ProblemStatusEnum.PROJECT_CREATED
    db.commit()

    return ResponseEnvelope(
        success=True,
        message="Solution Project instantiated, team allocated, 6 milestones initialized, and industry sponsorship linked",
        data={
            "project_id": db_project.project_id,
            "problem_id": db_project.problem_id,
            "university_name": univ.name,
            "title": db_project.title,
            "status": db_project.status,
            "team_name": db_team.name,
            "milestones_count": 6,
            "industry_collaboration": ind.organization_name if ind else None
        }
    )


@router.get("/projects/{project_id}", response_model=ResponseEnvelope[dict])
def get_project_detail(project_id: int, db: Session = Depends(get_db)):
    """
    Returns full details of a solution project including problem, team members, milestones, and collaborations.
    """
    p = db.query(Project).filter(Project.project_id == project_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Project not found")

    team = db.query(Team).filter(Team.project_id == project_id).first()
    faculty_user = db.query(User).filter(User.user_id == team.faculty_mentor_user_id).first() if (team and team.faculty_mentor_user_id) else None

    students = []
    if team:
        for m in team.members:
            if m.user:
                students.append({"user_id": m.user_id, "full_name": m.user.full_name, "email": m.user.email, "role": m.role_title})

    milestones = db.query(Milestone).filter(Milestone.project_id == project_id).order_by(Milestone.milestone_id.asc()).all()
    ms_payload = [{"milestone_id": m.milestone_id, "title": m.title, "description": m.description, "status": m.status} for m in milestones]

    collaborations = db.query(IndustryCollaboration).filter(IndustryCollaboration.project_id == project_id).all()
    collab_payload = [{"collaboration_id": c.collaboration_id, "organization_name": c.industry_profile.organization_name, "resource_type": c.resource_type, "notes": c.notes, "status": c.status} for c in collaborations]

    return ResponseEnvelope(
        success=True,
        message="Project details retrieved",
        data={
            "project_id": p.project_id,
            "problem_id": p.problem_id,
            "problem_title": p.problem.title,
            "university_id": p.university_id,
            "university_name": p.university.name,
            "title": p.title,
            "description": p.description,
            "status": p.status,
            "progress_percentage": p.progress_percentage,
            "created_at": p.created_at,
            "team": {
                "team_id": team.team_id if team else None,
                "team_name": team.name if team else None,
                "faculty_mentor": {"user_id": faculty_user.user_id, "full_name": faculty_user.full_name, "email": faculty_user.email} if faculty_user else None,
                "students": students
            },
            "milestones": ms_payload,
            "collaborations": collab_payload
        }
    )


@router.put("/projects/{project_id}/milestones/{milestone_id}", response_model=ResponseEnvelope[dict])
def update_milestone_status(project_id: int, milestone_id: int, milestone_in: MilestoneUpdate, db: Session = Depends(get_db)):
    """
    Updates status of a milestone and recalculates overall project progress percentage.
    """
    ms = db.query(Milestone).filter(Milestone.milestone_id == milestone_id, Milestone.project_id == project_id).first()
    if not ms:
        raise HTTPException(status_code=404, detail="Milestone not found")

    ms.status = milestone_in.status
    db.commit()

    # Recalculate project progress
    all_ms = db.query(Milestone).filter(Milestone.project_id == project_id).all()
    completed_count = sum(1 for m in all_ms if m.status == "COMPLETED")
    in_progress_count = sum(1 for m in all_ms if m.status == "IN_PROGRESS")

    total = len(all_ms) or 1
    new_progress = round(((completed_count + (0.5 * in_progress_count)) / total) * 100, 1)

    proj = db.query(Project).filter(Project.project_id == project_id).first()
    if proj:
        proj.progress_percentage = min(100.0, new_progress)
        db.commit()

    return ResponseEnvelope(
        success=True,
        message=f"Milestone status updated to {milestone_in.status}",
        data={
            "milestone_id": milestone_id,
            "status": milestone_in.status,
            "project_progress_percentage": proj.progress_percentage if proj else new_progress
        }
    )


@router.post("/projects/{project_id}/collaborations", response_model=ResponseEnvelope[dict])
def add_industry_collaboration(project_id: int, collab_in: CollaborationCreate, db: Session = Depends(get_db)):
    """
    Links an Industry Partner resource sponsorship to the project.
    """
    proj = db.query(Project).filter(Project.project_id == project_id).first()
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")

    ind = db.query(IndustryProfile).filter(IndustryProfile.industry_profile_id == collab_in.industry_profile_id).first()
    if not ind:
        raise HTTPException(status_code=404, detail="Industry profile not found")

    collab = IndustryCollaboration(
        project_id=project_id,
        industry_profile_id=collab_in.industry_profile_id,
        resource_type=collab_in.resource_type,
        notes=collab_in.notes or "Resource sponsorship initiated during live demo.",
        status="ACTIVE"
    )
    db.add(collab)
    db.commit()
    db.refresh(collab)

    return ResponseEnvelope(
        success=True,
        message=f"Industry collaboration with {ind.organization_name} established",
        data={
            "collaboration_id": collab.collaboration_id,
            "organization_name": ind.organization_name,
            "resource_type": collab.resource_type,
            "status": collab.status
        }
    )


@router.get("/projects", response_model=ResponseEnvelope[List[dict]])
def list_projects(db: Session = Depends(get_db)):
    """
    Lists active solution projects.
    """
    projects = db.query(Project).order_by(Project.created_at.desc()).all()
    payload = []
    for p in projects:
        payload.append({
            "project_id": p.project_id,
            "problem_id": p.problem_id,
            "university_id": p.university_id,
            "university_name": p.university.name,
            "title": p.title,
            "status": p.status,
            "progress_percentage": p.progress_percentage,
            "created_at": p.created_at
        })
    return ResponseEnvelope(success=True, message=f"Retrieved {len(payload)} projects", data=payload)
