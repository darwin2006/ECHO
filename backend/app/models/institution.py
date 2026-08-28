from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.app.db.base import Base


class University(Base):
    __tablename__ = "universities"

    university_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    code = Column(String, unique=True, index=True, nullable=False)
    address = Column(String, nullable=True)
    district = Column(String, index=True, nullable=True)
    state = Column(String, default="Tamil Nadu", index=True)
    dept_rating = Column(Float, default=85.0)
    max_project_capacity = Column(Integer, default=5)
    active_projects_count = Column(Integer, default=0)
    is_verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    departments = relationship("Department", back_populates="university", cascade="all, delete-orphan")


class Department(Base):
    __tablename__ = "departments"

    department_id = Column(Integer, primary_key=True, index=True)
    university_id = Column(Integer, ForeignKey("universities.university_id"), nullable=False)
    name = Column(String, nullable=False)
    code = Column(String, nullable=False)
    domain = Column(String, nullable=False)
    skills_json = Column(Text, nullable=True)  # JSON list of skills
    facilities_json = Column(Text, nullable=True)  # JSON list of lab facilities
    created_at = Column(DateTime, default=datetime.utcnow)

    university = relationship("University", back_populates="departments")
    faculty_members = relationship("FacultyProfile", back_populates="department")
    students = relationship("StudentProfile", back_populates="department")
