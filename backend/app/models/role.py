import enum
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from backend.app.db.base import Base


class SystemRoleEnum(str, enum.Enum):
    COMMUNITY_MEMBER = "COMMUNITY_MEMBER"
    STUDENT = "STUDENT"
    FACULTY = "FACULTY"
    UNIVERSITY_ADMIN = "UNIVERSITY_ADMIN"
    INDUSTRY_PARTNER = "INDUSTRY_PARTNER"
    GOVERNMENT_OFFICIAL = "GOVERNMENT_OFFICIAL"
    MODERATOR = "MODERATOR"
    SUPER_ADMIN = "SUPER_ADMIN"


class Role(Base):
    __tablename__ = "roles"

    role_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False, index=True)
    description = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
