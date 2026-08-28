def test_create_problem_and_run_real_ai_pipeline(client):
    payload = {
        "title": "Monsoon Street Water Drain Overflow Sensor",
        "description": "Sensors needed to monitor rainwater drainage clogging on public roads.",
        "language": "en",
        "category": "Environment",
        "locality": "Kotturpuram",
        "district": "Chennai",
        "state": "Tamil Nadu",
        "severity": 4.5,
        "population_impact": 4.0,
        "urgency": 4.5,
        "community_support_count": 25,
        "is_government_priority": 1,
        "feasibility": 4.0,
        "required_skills": ["IoT", "Sensors", "GIS", "Python"]
    }

    response = client.post("/api/v1/problems", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    
    res_data = data["data"]
    assert "problem" in res_data
    assert "ai_analysis" in res_data
    
    analysis = res_data["ai_analysis"]
    assert analysis["priority_score"] > 60.0
    assert analysis["duplicate_relationship"] in ["EXACT_DUPLICATE", "LIKELY_DUPLICATE", "RELATED_PROBLEM", "NOT_DUPLICATE"]
    assert "IoT" in analysis["extracted_skills"]


def test_list_problems_api(client):
    response = client.get("/api/v1/problems")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert len(data["data"]) >= 1
