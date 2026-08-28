from backend.app.models.institution import University
from backend.app.models.problem import Problem
from backend.app.models.role import Role


def test_database_seed_and_relationships(test_db):
    # Verify Roles
    roles = test_db.query(Role).all()
    assert len(roles) >= 8, "Expected at least 8 canonical system authorization roles"

    # Verify Universities & Departments
    universities = test_db.query(University).all()
    assert len(universities) >= 3, "Expected at least 3 seeded universities"

    cit = test_db.query(University).filter(University.code == "CIT-CHE").first()
    assert cit is not None
    assert len(cit.departments) >= 2, "CIT should have at least 2 seeded departments"

    # Verify Problems
    problems = test_db.query(Problem).all()
    assert len(problems) >= 2, "Expected at least 2 seeded problems"
    
    p1 = problems[0]
    assert p1.ai_analysis is not None, "Problem should have associated AI analysis"
    assert p1.embedding is not None, "Problem should have associated embedding record"
