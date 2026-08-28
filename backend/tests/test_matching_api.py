def test_university_matching_api(client):
    # First get existing problem ID
    probs_resp = client.get("/api/v1/problems")
    problems = probs_resp.json()["data"]
    p_id = problems[0]["problem_id"]

    response = client.get(f"/api/v1/matching/{p_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    
    match_data = data["data"]
    assert "shortlist" in match_data
    shortlist = match_data["shortlist"]
    assert len(shortlist) >= 1
    
    top_match = shortlist[0]
    assert top_match["rank_order"] == 1
    assert "Rank 1" in top_match["rank_title"]
    assert top_match["capability_score"] > 0
    assert len(top_match["match_reasons"]) > 0
