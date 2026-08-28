def test_impact_analytics_api(client):
    response = client.get("/api/v1/analytics/impact")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "total_problems_crowdsourced" in data["data"]
    assert "estimated_people_impacted" in data["data"]
    assert "district_coverage" in data["data"]
