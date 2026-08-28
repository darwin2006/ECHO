import enum
from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.app.db.base import Base


class ProblemStatusEnum(str, enum.Enum):
    DRAFT = "DRAFT"
    SUBMITTED = "SUBMITTED"
    UNDER_REVIEW = "UNDER_REVIEW"
    AI_ANALYSIS = "AI_ANALYSIS"
    VALIDATION = "VALIDATION"
    DUPLICATE_REVIEW = "DUPLICATE_REVIEW"
    PRIORITIZED = "PRIORITIZED"
    MATCHED = "MATCHED"
    SHORTLISTED = "SHORTLISTED"
    ACCEPTED = "ACCEPTED"
    PROJECT_CREATED = "PROJECT_CREATED"
    IN_PROGRESS = "IN_PROGRESS"
    TESTING = "TESTING"
    DEPLOYMENT = "DEPLOYMENT"
    RESOLVED = "RESOLVED"
    IMPACT_MEASUREMENT = "IMPACT_MEASUREMENT"
    ARCHIVED = "ARCHIVED"


class Problem(Base):
    __tablename__ = "problems"

    problem_id = Column(Integer, primary_key=True, index=True)
    submitted_by_user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    title = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=False)
    language = Column(String, default="en", index=True)  # en, ta, etc.
    category = Column(String, default="General", index=True)
    subcategory = Column(String, nullable=True)
    locality = Column(String, nullable=True)
    district = Column(String, nullable=True, index=True)
    state = Column(String, default="Tamil Nadu")
    
    severity = Column(Float, default=3.0)
    population_impact = Column(Float, default=3.0)
    urgency = Column(Float, default=3.0)
    community_support_count = Column(Integer, default=1)
    is_government_priority = Column(Integer, default=0)
    feasibility = Column(Float, default=4.0)

    status = Column(SQLEnum(ProblemStatusEnum), default=ProblemStatusEnum.SUBMITTED, nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    submitted_by = relationship("User")
    ai_analysis = relationship("AIAnalysis", back_populates="problem", uselist=False, cascade="all, delete-orphan")
    embedding = relationship("ProblemEmbedding", back_populates="problem", uselist=False, cascade="all, delete-orphan")
    matching_results = relationship("MatchingResult", back_populates="problem", cascade="all, delete-orphan")
