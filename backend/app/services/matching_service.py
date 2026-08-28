import json
from typing import Dict, Any, List
from sqlalchemy.orm import Session
from backend.app.models.problem import Problem, ProblemStatusEnum
from backend.app.models.institution import University, Department
from backend.app.models.profile import FacultyProfile
from backend.app.models.ai import AIAnalysis, MatchingResult
from ai.service import ai_service


class MatchingService:
    @staticmethod
    def match_universities_for_problem(db: Session, problem_id: int) -> Dict[str, Any]:
        """
        Executes 16-factor university capability vs. practical capacity matching logic for a problem:
        1. Fetches problem details & extracted skills from AIAnalysis.
        2. Aggregates university department capabilities, faculty mentors, active projects, and capacity.
        3. Calls RealAIService.match_universities() to generate ranked shortlist (#1 Best Match, #2 Alternative, ...).
        4. Persists MatchingResult records to DB.
        5. Updates ProblemStatus to MATCHED / SHORTLISTED.
        """
        problem = db.query(Problem).filter(Problem.problem_id == problem_id).first()
        if not problem:
            raise ValueError(f"Problem ID {problem_id} not found.")

        analysis = db.query(AIAnalysis).filter(AIAnalysis.problem_id == problem_id).first()
        extracted_skills = json.loads(analysis.extracted_skills_json) if (analysis and analysis.extracted_skills_json) else ["IoT", "Sensors", "Python", "GIS"]

        # Fetch all verified universities and their departments
        universities = db.query(University).filter(University.is_verified == True).all()
        univ_payloads = []

        for univ in universities:
            # Aggregate skills and departments
            univ_skills = set()
            univ_domain = ""
            for dept in univ.departments:
                univ_domain += f" {dept.domain}"
                if dept.skills_json:
                    for s in json.loads(dept.skills_json):
                        univ_skills.add(s)

            # Aggregate faculty members
            faculty_list = []
            for dept in univ.departments:
                for f in dept.faculty_members:
                    faculty_list.append({"id": f.faculty_profile_id, "available": f.is_available})

            univ_payloads.append({
                "id": univ.university_id,
                "name": univ.name,
                "domain": univ_domain,
                "dept_rating": univ.dept_rating,
                "skills": list(univ_skills),
                "faculty": faculty_list,
                "active_projects_count": univ.active_projects_count,
                "max_project_capacity": univ.max_project_capacity
            })

        # Execute Real AI Matching Engine
        shortlist = ai_service.match_universities(
            problem_domain=problem.category or "Engineering",
            required_skills=extracted_skills,
            universities=univ_payloads
        )

        # Persist MatchingResult records
        # Clear old matching results for this problem if any
        db.query(MatchingResult).filter(MatchingResult.problem_id == problem_id).delete()

        db_matching_results = []
        for item in shortlist:
            res = MatchingResult(
                problem_id=problem_id,
                candidate_type="UNIVERSITY",
                candidate_id=item["university_id"],
                rank_order=item["rank_order"],
                rank_title=item["rank_title"],
                capability_score=item["capability_score"],
                capacity_factor=item["capacity_factor"],
                overall_match_score=item["overall_match_score"],
                confidence_level=item["confidence_level"],
                matched_skills_json=json.dumps(item["matched_skills"]),
                match_reasons_json=json.dumps(item["match_reasons"]),
                human_review_status="APPROVED"
            )
            db.add(res)
            db_matching_results.append(res)

        # Update problem status
        problem.status = ProblemStatusEnum.MATCHED
        db.commit()

        return {
            "problem_id": problem_id,
            "problem_title": problem.title,
            "required_skills": extracted_skills,
            "shortlist": shortlist
        }
