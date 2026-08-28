from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.app.db.base import Base


class CommunityProfile(Base):
    __tablename__ = "community_profiles"

    profile_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), unique=True, nullable=False)
    locality = Column(String, nullable=True)
    district = Column(String, nullable=True)
    state = Column(String, default="Tamil Nadu")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")


class StudentProfile(Base):
    __tablename__ = "student_profiles"

    student_profile_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), unique=True, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.department_id"), nullable=False)
    academic_year = Column(Integer, default=3)
    skills_json = Column(Text, nullable=True)  # JSON list of skills
    is_available = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")
    department = relationship("Department", back_populates="students")


class FacultyProfile(Base):
    __tablename__ = "faculty_profiles"

    faculty_profile_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), unique=True, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.department_id"), nullable=False)
    designation = Column(String, default="Assistant Professor")
    expertise_json = Column(Text, nullable=True)  # JSON list of research expertise
    is_available = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")
    department = relationship("Department", back_populates="faculty_members")


class IndustryProfile(Base):
    __tablename__ = "industry_profiles"

    industry_profile_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), unique=True, nullable=False)
    organization_name = Column(String, nullable=False, index=True)
    sector = Column(String, nullable=False)
    offered_resources_json = Column(Text, nullable=True)
    contact_email = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")
