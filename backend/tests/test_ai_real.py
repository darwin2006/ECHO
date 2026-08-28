from ai.service import ai_service


def test_real_embedding_generation():
    text = "Automated sensor-based waterlogging detector for urban drains"
    vector = ai_service.generate_embedding(text)
    assert isinstance(vector, list)
    assert len(vector) == 384, f"Expected 384 dimensions, got {len(vector)}"
    assert isinstance(vector[0], float)


def test_real_cosine_similarity_duplicate_detection():
    # Related problems
    p1 = "Urban Flood & Drainage Monitoring System"
    p2 = "City Drainage Overflow Alert System with IoT Sensors"
    # Unrelated problem
    p3 = "Rural Primary School Digital Tablet Distribution"

    v1 = ai_service.generate_embedding(p1)
    v2 = ai_service.generate_embedding(p2)
    v3 = ai_service.generate_embedding(p3)

    sim_related = ai_service.compute_cosine_similarity(v1, v2)
    sim_unrelated = ai_service.compute_cosine_similarity(v1, v3)

    assert sim_related > sim_unrelated, "Related problems must have higher cosine similarity than unrelated ones"
    assert sim_related > 0.65, f"Expected high similarity for related problems, got {sim_related}"


def test_priority_calculation():
    res = ai_service.calculate_priority_score(
        severity=5.0,
        population_impact=5.0,
        urgency=5.0,
        community_support=100.0,
        government_alignment=1.0,
        feasibility=5.0
    )
    assert res["priority_score"] == 100.0
    assert res["priority_level"] == "CRITICAL"
