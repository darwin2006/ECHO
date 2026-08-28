from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.app.db.base import Base


class Project(Base):
    __tablename__ = "projects"

    project_id = Column(Integer, primary_key=True, index=True)
    problem_id = Column(Integer, ForeignKey("problems.problem_id"), unique=True, nullable=False)
    university_id = Column(Integer, ForeignKey("universities.university_id"), nullable=False)
    title = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=True)
    status = Column(String, default="PLANNING", index=True)  # PLANNING, IN_PROGRESS, TESTING, DEPLOYMENT, COMPLETED
    progress_percentage = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    problem = relationship("Problem")
    university = relationship("University")
    teams = relationship("Team", back_populates="project", cascade="all, delete-orphan")
    milestones = relationship("Milestone", back_populates="project", cascade="all, delete-orphan")
    collaborations = relationship("IndustryCollaboration", back_populates="project", cascade="all, delete-orphan")


class Team(Base):
    __tablename__ = "teams"

    team_id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.project_id"), nullable=False)
    name = Column(String, nullable=False)
    faculty_mentor_user_id = Column(Integer, ForeignKey("users.user_id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="teams")
    faculty_mentor = relationship("User")
    members = relationship("TeamMember", back_populates="team", cascade="all, delete-orphan")


class TeamMember(Base):
    __tablename__ = "team_members"

    team_member_id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.team_id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    role_title = Column(String, default="Developer")
    joined_at = Column(DateTime, default=datetime.utcnow)

    team = relationship("Team", back_populates="members")
    user = relationship("User")


class Milestone(Base):
    __tablename__ = "milestones"

    milestone_id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.project_id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String, default="PLANNED")  # PLANNED, IN_PROGRESS, COMPLETED
    target_date = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="milestones")


class IndustryCollaboration(Base):
    __tablename__ = "industry_collaborations"

    collaboration_id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.project_id"), nullable=False)
    industry_profile_id = Column(Integer, ForeignKey("industry_profiles.industry_profile_id"), nullable=False)
    resource_type = Column(String, default="TECHNICAL_MENTORSHIP")  # TECHNICAL_MENTORSHIP, HARDWARE_SPONSORSHIP, CLOUD_CREDITS
    status = Column(String, default="ACTIVE")
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="collaborations")
    industry_profile = relationship("IndustryProfile")
