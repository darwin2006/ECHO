def test_team_candidates_api(client):
    # Fetch team candidates for University ID 1
    resp = client.get("/api/v1/team-candidates/1")
    assert resp.status_code == 200
    data = resp.json()
    assert data["success"] is True
    assert "faculty_mentors" in data["data"]
    assert "students" in data["data"]
    assert len(data["data"]["faculty_mentors"]) >= 1


def test_create_and_update_project_flow(client):
    # First get problem ID 1
    prob_resp = client.get("/api/v1/problems")
    problems = prob_resp.json()["data"]
    p_id = problems[0]["problem_id"]

    # 1. Create Project
    payload = {
        "problem_id": p_id,
        "university_id": 1,
        "title": "Smart Urban Flood Solution",
        "description": "IoT flood telemetry system",
        "faculty_mentor_user_id": 1,
        "student_user_ids": [2]
    }
    create_resp = client.post("/api/v1/projects", json=payload)
    assert create_resp.status_code == 201
    c_data = create_resp.json()
    assert c_data["success"] is True
    proj_id = c_data["data"]["project_id"]

    # 2. Get Project Detail
    detail_resp = client.get(f"/api/v1/projects/{proj_id}")
    assert detail_resp.status_code == 200
    d_data = detail_resp.json()["data"]
    assert d_data["project_id"] == proj_id
    assert len(d_data["milestones"]) == 6

    # 3. Update Milestone Status
    ms_id = d_data["milestones"][1]["milestone_id"]
    ms_resp = client.put(f"/api/v1/projects/{proj_id}/milestones/{ms_id}", json={"status": "COMPLETED"})
    assert ms_resp.status_code == 200
    m_data = ms_resp.json()
    assert m_data["success"] is True
    assert m_data["data"]["status"] == "COMPLETED"

    # 4. Add Industry Collaboration
    collab_resp = client.post(f"/api/v1/projects/{proj_id}/collaborations", json={
        "industry_profile_id": 1,
        "resource_type": "IoT Hardware Sensors",
        "notes": "Testing hardware donation"
    })
    assert collab_resp.status_code == 200
    assert collab_resp.json()["success"] is True
