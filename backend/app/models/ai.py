from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.app.db.base import Base


class AIAnalysis(Base):
    __tablename__ = "ai_analyses"

    analysis_id = Column(Integer, primary_key=True, index=True)
    problem_id = Column(Integer, ForeignKey("problems.problem_id"), unique=True, nullable=False)
    detected_language = Column(String, default="en")
    extracted_category = Column(String, nullable=True)
    extracted_skills_json = Column(Text, nullable=True)  # JSON list
    extracted_entities_json = Column(Text, nullable=True)  # JSON dict
    priority_score = Column(Float, nullable=False, default=50.0)
    priority_level = Column(String, default="MEDIUM")
    priority_breakdown_json = Column(Text, nullable=True)
    duplicate_relationship = Column(String, default="NOT_DUPLICATE")
    max_similarity = Column(Float, default=0.0)
    model_id = Column(String, default="MOD-EMB-001")
    model_version = Column(String, default="v1.0.0")
    created_at = Column(DateTime, default=datetime.utcnow)

    problem = relationship("Problem", back_populates="ai_analysis")


class ProblemEmbedding(Base):
    __tablename__ = "problem_embeddings"

    embedding_id = Column(Integer, primary_key=True, index=True)
    problem_id = Column(Integer, ForeignKey("problems.problem_id"), unique=True, nullable=False)
    vector_json = Column(Text, nullable=True)  # JSON array of floats (pluggable with pgvector vector column)
    vector_dim = Column(Integer, default=384)
    model_name = Column(String, default="all-MiniLM-L6-v2")
    created_at = Column(DateTime, default=datetime.utcnow)

    problem = relationship("Problem", back_populates="embedding")


class MatchingResult(Base):
    __tablename__ = "matching_results"

    matching_result_id = Column(Integer, primary_key=True, index=True)
    problem_id = Column(Integer, ForeignKey("problems.problem_id"), nullable=False)
    candidate_type = Column(String, default="UNIVERSITY")  # UNIVERSITY, FACULTY, STUDENT, INDUSTRY
    candidate_id = Column(Integer, nullable=False)
    rank_order = Column(Integer, default=1)
    rank_title = Column(String, nullable=True)
    capability_score = Column(Float, default=80.0)
    capacity_factor = Column(Float, default=1.0)
    overall_match_score = Column(Float, nullable=False)
    confidence_level = Column(Float, default=0.90)
    matched_skills_json = Column(Text, nullable=True)
    match_reasons_json = Column(Text, nullable=True)
    human_review_status = Column(String, default="APPROVED")
    created_at = Column(DateTime, default=datetime.utcnow)

    problem = relationship("Problem", back_populates="matching_results")


class AIModelRegistry(Base):
    __tablename__ = "ai_model_registry"

    model_registry_id = Column(Integer, primary_key=True, index=True)
    model_id = Column(String, unique=True, index=True, nullable=False)
    model_name = Column(String, nullable=False)
    model_version = Column(String, nullable=False)
    model_purpose = Column(String, nullable=False)
    supported_languages = Column(String, default="en, ta")
    embedding_dim = Column(Integer, default=384)
    license = Column(String, default="Apache-2.0")
    deployment_type = Column(String, default="LOCAL_QUANTIZED")
    resource_requirements = Column(String, default="~4.5 GB RAM")
    benchmark_metrics_json = Column(Text, nullable=True)
    status = Column(String, default="PRODUCTION")
    created_at = Column(DateTime, default=datetime.utcnow)
