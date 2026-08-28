"""
Standalone Verification Test for Real AI Service Module.
Verifies real embedding generation, cosine similarity, duplicate detection, priority scoring, and university matching.
"""

import os
import sys

# Add project root to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from ai.service import RealAIService


def test_real_ai_service():
    print("Initializing RealAIService...")
    ai = RealAIService(model_name="all-MiniLM-L6-v2")

    # 1. Test Embedding Generation
    text = "Smart urban flood drainage monitoring system with IoT sensors"
    emb = ai.generate_embedding(text)
    print(f"[OK] Real Embedding generated! Dimensionality: {len(emb)}")
    assert len(emb) > 0, "Embedding generation failed"
    assert isinstance(emb[0], float), "Embedding values must be floats"

    # 2. Test Cosine Similarity & Duplicate Detection
    p1 = {"id": 1, "title": "Urban Flood Management System", "description": "Monitoring water logging with IoT sensors in city drainage"}
    p2 = {"id": 2, "title": "Rural Primary School Digital Education", "description": "Providing tablets and smart boards for primary students"}
    
    p1_emb = ai.generate_embedding(f"{p1['title']}. {p1['description']}")
    p1["embedding"] = p1_emb

    dup_result = ai.detect_duplicate(
        new_title="Monsoon Water Drain Sensor Alert System",
        new_description="Sensors to track flood waterlogging in urban drainage lines",
        stored_problems=[p1, p2]
    )

    print(f"[OK] Duplicate Detection Max Similarity: {dup_result['max_similarity']} ({dup_result['relationship']})")
    assert dup_result['max_similarity'] > 0.60, "Expected high semantic similarity for related flood problem"

    # 3. Test 7-Factor Priority Score
    p_score = ai.calculate_priority_score(
        severity=5.0,
        population_impact=4.0,
        urgency=5.0,
        community_support=45.0,
        government_alignment=1.0,
        feasibility=4.0,
        duplicate_count=0
    )
    print(f"[OK] Priority Score Calculated: {p_score['priority_score']}/100 ({p_score['priority_level']})")
    assert p_score['priority_score'] > 70.0, "High severity/urgency problem should score High/Critical priority"

    # 4. Test 16-Factor University Capability vs. Practical Capacity Matching
    sample_universities = [
        {
            "id": 101,
            "name": "Chennai Institute of Technology",
            "domain": "Civil Engineering & IoT",
            "dept_rating": 95,
            "skills": ["IoT", "Sensors", "GIS", "Python", "Civil Engineering"],
            "faculty": [{"name": "Dr. Arumugam", "available": True}, {"name": "Dr. Priya", "available": True}],
            "active_projects_count": 1,
            "max_project_capacity": 5
        },
        {
            "id": 102,
            "name": "State Technological University B",
            "domain": "Computer Science & AI",
            "dept_rating": 88,
            "skills": ["Python", "Machine Learning", "Cloud"],
            "faculty": [{"name": "Dr. Kumar", "available": False}],
            "active_projects_count": 5,  # Overcommitted campus
            "max_project_capacity": 5
        }
    ]

    shortlist = ai.match_universities(
        problem_domain="Civil Engineering",
        required_skills=["IoT", "Sensors", "GIS", "Python"],
        universities=sample_universities
    )

    print(f"[OK] University Matching Shortlist Generated ({len(shortlist)} candidates)")
    print(f"   Top Match: {shortlist[0]['university_name']} (Overall Score: {shortlist[0]['overall_match_score']}%)")
    assert shortlist[0]['university_id'] == 101, "Campus with higher skill coverage and available capacity should rank first"

    print("\n[SUCCESS] ALL REAL AI TESTS PASSED SUCCESSFULLY!")


if __name__ == "__main__":
    test_real_ai_service()
