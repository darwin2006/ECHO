import json
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from backend.app.models.problem import Problem, ProblemStatusEnum
from backend.app.models.ai import AIAnalysis, ProblemEmbedding
from backend.app.models.user import User
from backend.app.models.role import Role, SystemRoleEnum
from backend.app.schemas.problem import ProblemCreate
from backend.app.core.config import settings
from ai.service import ai_service


class ProblemService:
    @staticmethod
    def create_problem_and_run_ai(db: Session, problem_in: ProblemCreate, user_id: Optional[int] = None) -> Dict[str, Any]:
        """
        Executes end-to-end Problem Creation + Real AI Analysis Pipeline:
        1. Persists problem immediately to DB.
        2. Generates real dense vector embedding using SentenceTransformers.
        3. Computes cosine similarity against existing stored problem embeddings.
        4. Calculates 7-factor priority score.
        5. Persists AI analysis & embedding.
        6. Updates problem status to PRIORITIZED or DUPLICATE_REVIEW.
        """
        # Ensure fallback user if no user_id passed
        if not user_id:
            citizen_role = db.query(Role).filter(Role.name == SystemRoleEnum.COMMUNITY_MEMBER.value).first()
            user = db.query(User).filter(User.role_id == citizen_role.role_id).first() if citizen_role else None
            user_id = user.user_id if user else 1

        # 1. Persist problem immediately to database
        db_problem = Problem(
            submitted_by_user_id=user_id,
            title=problem_in.title,
            description=problem_in.description,
            language=problem_in.language or "en",
            category=problem_in.category or "General",
            subcategory=problem_in.subcategory,
            locality=problem_in.locality,
            district=problem_in.district,
            state=problem_in.state or "Tamil Nadu",
            severity=problem_in.severity or 3.0,
            population_impact=problem_in.population_impact or 3.0,
            urgency=problem_in.urgency or 3.0,
            community_support_count=problem_in.community_support_count or 1,
            is_government_priority=problem_in.is_government_priority or 0,
            feasibility=problem_in.feasibility or 4.0,
            status=ProblemStatusEnum.AI_ANALYSIS
        )
        db.add(db_problem)
        db.commit()
        db.refresh(db_problem)

        # 2. Fetch existing problem embeddings for real cosine similarity comparison
        stored_embeddings = db.query(ProblemEmbedding).all()
        stored_problems_payload = []
        for emb_rec in stored_embeddings:
            if emb_rec.problem_id != db_problem.problem_id:
                prob = db.query(Problem).filter(Problem.problem_id == emb_rec.problem_id).first()
                if prob:
                    stored_problems_payload.append({
                        "id": prob.problem_id,
                        "title": prob.title,
                        "description": prob.description,
                        "embedding": json.loads(emb_rec.vector_json)
                    })

        # 3. Real AI Duplicate Detection (SentenceTransformers embedding generation + cosine similarity)
        dup_result = ai_service.detect_duplicate(
            new_title=db_problem.title,
            new_description=db_problem.description,
            stored_problems=stored_problems_payload,
            threshold=settings.DUPLICATE_THRESHOLD
        )

        new_vector = dup_result["embedding"]

        # 4. Save Problem Embedding
        db_embedding = ProblemEmbedding(
            problem_id=db_problem.problem_id,
            vector_json=json.dumps(new_vector),
            vector_dim=len(new_vector),
            model_name=ai_service.model_name
        )
        db.add(db_embedding)

        # 5. Deterministic 7-Factor Priority Calculation
        priority_res = ai_service.calculate_priority_score(
            severity=db_problem.severity,
            population_impact=db_problem.population_impact,
            urgency=db_problem.urgency,
            community_support=db_problem.community_support_count,
            government_alignment=db_problem.is_government_priority,
            feasibility=db_problem.feasibility,
            duplicate_count=len(dup_result["similar_candidates"]) if dup_result["is_duplicate"] else 0
        )

        # Extracted skills (from input or fallback domain list)
        extracted_skills = problem_in.required_skills or ["IoT", "Sensors", "Python", "GIS"]

        # 6. Save AI Analysis
        db_analysis = AIAnalysis(
            problem_id=db_problem.problem_id,
            detected_language=db_problem.language,
            extracted_category=db_problem.category,
            extracted_skills_json=json.dumps(extracted_skills),
            extracted_entities_json=json.dumps({"district": db_problem.district, "locality": db_problem.locality}),
            priority_score=priority_res["priority_score"],
            priority_level=priority_res["priority_level"],
            priority_breakdown_json=json.dumps(priority_res["factor_breakdown"]),
            duplicate_relationship=dup_result["relationship"],
            max_similarity=dup_result["max_similarity"],
            model_id="MOD-EMB-001",
            model_version="v1.0.0"
        )
        db.add(db_analysis)

        # 7. Update Problem Status
        if dup_result["is_duplicate"]:
            db_problem.status = ProblemStatusEnum.DUPLICATE_REVIEW
        else:
            db_problem.status = ProblemStatusEnum.PRIORITIZED

        db.commit()
        db.refresh(db_problem)
        db.refresh(db_analysis)

        return {
            "problem": db_problem,
            "analysis": db_analysis,
            "similar_candidates": dup_result["similar_candidates"],
            "extracted_skills": extracted_skills
        }
