# SIH_26 — AI DESIGN

**Version:** V0.1  
**Status:** Professional AI Architecture & Design Specification  
**Project:** SIH_26  
**Problem Statement:** SIH 26043

---

# 1. PURPOSE

This document defines the Artificial Intelligence architecture, responsibilities, workflows, data requirements, safety mechanisms, evaluation strategy, and integration requirements for the SIH_26 platform.

The platform uses a **HYBRID AI ARCHITECTURE** that clearly separates:
- **Deterministic algorithms:** Priority Engine calculation, College Capability vs. Capacity Matching Engine, Student/Faculty Team Matching Engine.
- **Lightweight ML/NLP:** Multilingual language identification, Taxonomy Classification, Entity & Skill extraction, 768-D Embedding generation.
- **Multilingual Embeddings:** Cross-language semantic similarity and vector search.
- **Selective LLM Reasoning:** Complex technical extraction, ambiguous requirement interpretation, clarification questions, difficult multilingual reasoning, and grounded explanation generation.
- **Human Review:** Decision-support evaluation for near-ties, low confidence, moderation edge cases, and high-impact decisions.

The AI system is designed to assist the platform throughout the societal problem-solving lifecycle without replacing citizens, students, faculty, industry experts, universities, government authorities, moderators, or administrators.

---

# 2. AI VISION

The AI layer transforms raw, unstructured, multilingual societal problem reports into structured, actionable intelligence.

```text
RAW MULTILINGUAL SOCIETAL PROBLEM (English, Tamil, Indian Languages)
        ↓
Language Detection & PII Protection
        ↓
Lightweight ML Classification & Taxonomy Mapping
        ↓
768-D Embedding Generation
        ↓
Contextual Duplicate & Similarity Detection
        ↓
Deterministic Priority Analysis (7-Factor Model)
        ↓
Structured Skill & Entity Extraction
        ↓
Intelligent Multi-Factor College Matching (16 Criteria & Capacity Check)
        ↓
Student / Faculty / Industry Team Matching
        ↓
Explainable Recommendation Output (Ranked Shortlist)
        ↓
Human-in-the-Loop Review (where required)
        ↓
Project Intelligence, Validation & Impact Analysis
```

---

# 3. CORE AI OBJECTIVES

The AI system should:

1. Understand societal problems submitted in multiple Indian languages.
2. Convert unstructured descriptions into structured information.
3. Classify problems accurately using controlled taxonomies.
4. Detect duplicate and related problems using 768-D embeddings and contextual metadata.
5. Estimate severity, urgency, and deterministic 7-factor priority scores.
6. Extract required skills and map them to canonical skill taxonomies.
7. Recommend suitable universities using multi-factor contextual ranking (Capability vs. Practical Capacity).
8. Recommend suitable students, faculty, and industry partners.
9. Support ₹0-cost local model development while remaining cloud-provider pluggable.
10. Generate grounded, non-hallucinated natural language explanations.
11. Support multilingual interaction (English, Tamil, and extensible Indian languages).
12. Maintain full model versioning, registry tracking, and auditability.
13. Learn safely from human feedback loops without unverified auto-retraining.
14. Ensure AI component failures never cause data loss for submitted problems.

---

# 4. AI DESIGN PRINCIPLES

The AI architecture follows these core principles:

* **Hybrid Architecture:** Deterministic logic for scoring/matching; ML/NLP for classification/embeddings; LLMs selectively for complex reasoning.
* **Multilingual-First:** Shared semantic architecture with initial English & Tamil priority, extensible to all Indian languages.
* **Human-Centered & Decision-Support:** AI recommends and explains; human stakeholders retain decision authority.
* **Grounded & Anti-Hallucination:** LLM explanations are generated strictly from verified database facts.
* **Best Match ≠ Highest Single Skill Score:** Multi-factor contextual ranking evaluating capability, capacity, experience, and facilities.
* **Pluggable & Provider-Agnostic:** 768-D embedding and LLM provider layers remain pluggable.
* **Cost-Aware & Open-Source Friendly:** Designed for ₹0-cost development using local 4B-class quantized models on ~16GB RAM hardware.
* **Asynchronous & Fault-Tolerant:** AI runs via background worker queues; AI downtime never loses citizen submission data.
* **Auditable & Versioned:** Every AI output is traceable to its model ID, version, and execution parameters in a Model Registry.

---

# 5. AI SYSTEM ARCHITECTURE

High-level architecture:

```text
                       PLATFORM USERS
                             |
                             v
                    WEB / MOBILE CLIENT
                             |
                             v
                        API LAYER
                             |
                             v
                     AI ORCHESTRATOR
                             |
          +------------------+------------------+
          |                  |                  |
          v                  v                  v
   NLP / LLM SERVICES   ML SERVICES      EMBEDDING SERVICES
          |                  |                  |
          +------------------+------------------+
                             |
                    AI RESULT VALIDATION
                             |
              +--------------+--------------+
              |              |              |
              v              v              v
          DATABASE       VECTOR STORE    SEARCH INDEX
                             |
                             v
                      RECOMMENDATION
                         ENGINE
                             |
                             v
                       USER / ADMIN
```

---

# 5. MULTILINGUAL-FIRST ARCHITECTURE

Multilingual support is a **CORE architectural requirement** for the SIH_26 platform.

### Priority Languages & Extensibility:
- **Initial Priority Languages:** English, Tamil.
- **Extensible Indian Languages:** Hindi, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, Punjabi, Odia, Assamese, and additional supported Indian languages.

The platform uses a **shared multilingual semantic architecture** rather than separate AI pipelines for every language.

```text
MULTILINGUAL SUBMISSIONS (EN, TA, HI, TE, KA, ML, etc.)
                          │
                          v
         Lightweight Multilingual Language ID
                          │
                          v
   Multilingual PII Protection & Preprocessing
                          │
                          v
      Pluggable 768-D Multilingual Embeddings
                          │
     ┌────────────────────┼────────────────────┐
     v                    v                    v
Cross-Language      Multilingual         Multilingual
Similarity Search   Classification       Skill Extraction
```

Multilingual capabilities span:
- Multilingual problem submission & title/description processing
- Automatic language identification (lightweight ML; no LLM for routine detection)
- Multilingual classification & taxonomy mapping
- Skill and entity extraction from non-English text
- Cross-language semantic similarity (e.g. matching a Tamil problem with an English project report)
- Multilingual search, recommendations, and grounded explanations

*Note: Model quality across languages is validated empirically through benchmarking (see Section 35).*

---

# 6. PLUGGABLE 768-D EMBEDDING ARCHITECTURE

The embedding layer produces dense vector representations for semantic search, deduplication, and matching.

### Technical Specification:
- **Vector Dimension:** 768 dimensions (Authoritative Interface Requirement)
- **Vector Storage:** PostgreSQL + `pgvector` extension (or approved pluggable vector store)
- **Indexing Strategy:** HNSW (Hierarchical Navigable Small World) index for fast $O(\log N)$ ANN search

### Benchmark Candidates:
1. **Granite Embedding Multilingual R2 311M:** Primary current benchmark candidate for cross-language semantic similarity.
2. **EmbeddingGemma:** Alternative candidate for multilingual embedding quality.
3. **Tamil-Embed-Base:** Tamil-specialized benchmark candidate evaluated for Tamil domain tasks (*not automatically locked as the national production model*).

> **Pluggability Rule:** The embedding layer is abstracted behind an interface. The embedding model may be upgraded or replaced without altering downstream matching, database schema, or API contracts, provided the 768-dimensional interface is maintained or an approved migration is executed.

---

# 7. SELECTIVE LLM STRATEGY & LOCAL BENCHMARK CANDIDATES

Large Language Models (LLMs) are used **selectively** for tasks requiring complex reasoning or natural language generation. They do NOT execute deterministic scoring or simple classification.

```text
                              INPUT TASK
                                  │
      ┌───────────────────────────┴───────────────────────────┐
      │                                                       │
      v                                                       v
DETERMINISTIC / LIGHTWEIGHT ML                          SELECTIVE LLM USE
(No LLM Used)                                           (LLM Invoked)
- Priority Score calculation                            - Complex technical extraction
- College Capability vs Capacity matching               - Ambiguous requirement clarification
- Simple category classification                        - Difficult multilingual reasoning
- Language detection                                    - Grounded explanation generation
- Exact database queries & vector search                - Uncertain extraction edge cases
```

### Local Benchmark Candidates (₹0-Cost Development Strategy):
- **Primary Local Benchmark Candidate:** `Dhee-NxtGen-Qwen3-Indic 4B`
- **Backup Local Benchmark Candidate:** `Qwen3-4B` (4-bit quantized inference for local testing on ~16GB RAM developer hardware)

> **Empirical Benchmarking Rule:** 16GB RAM hardware feasibility and inference latency must be validated empirically during benchmarking. The LLM layer remains provider/model pluggable so cloud LLM APIs (e.g. Gemini / Vertex AI) can be introduced as optional production upgrades without refactoring application logic.

---

# 8. AI COMPONENTS & ORCHESTRATOR

The platform AI layer consists conceptually of:
1. Multilingual Language Identification & NLP Preprocessing
2. PII Protection & Input Sanitization
3. Pluggable 768-D Embedding Service
4. Lightweight ML Classification Service
5. Duplicate & Similarity Detection Engine
6. Deterministic 7-Factor Priority Engine
7. Skill & Entity Extraction Service (Taxonomy-Mapped)
8. Intelligent Multi-Factor College Matching Engine (16 Criteria & Capacity Check)
9. Student, Faculty & Industry Matching Engine
10. Grounded Explanation Generator (Data-Verified)
11. Model Registry & Versioning Service
12. AI Safety, Moderation & Human-in-the-Loop Review Engine
13. AI Evaluation, Observability & Feedback Loop Engine

### Asynchronous AI Processing Architecture:
```text
User Submits Problem
         │
         v
Validate API Request & Persist Problem Immediately to DB
         │
         v
Return Immediate HTTP 202 Accepted Response to Client (Non-Blocking)
         │
         v
Push Job to Background Worker Queue (Redis / RabbitMQ)
         │
         v
Background Worker Executes AI Pipeline (NLP → Classification → Embeddings → Priority → Matching)
         │
         v
Update Problem Status & Emit Dashboard Notification
```

> **Fault Isolation Rule:** AI service or background worker failures MUST NEVER cause data loss for submitted citizen problems. The problem remains persisted in the database, and the job is retried or flagged for manual review.

---

# 9. NATURAL LANGUAGE PROCESSING & PII PROTECTION

NLP processing handles problem titles, descriptions, comments, evidence, and project updates.

### Pipeline:
```text
Raw Text Input
      ↓
Language Detection (Lightweight ML)
      ↓
PII & Privacy Protection (Redact Phone, Aadhaar, Personal Email where confidential)
      ↓
Text Normalization & Tokenization
      ↓
768-D Embedding Generation
```

---

# 10. PROBLEM CLASSIFICATION

The AI system classifies submitted problems into predefined categories.

Example categories:

```text
HEALTHCARE
EDUCATION
ENVIRONMENT
AGRICULTURE
TRANSPORTATION
PUBLIC_SAFETY
WATER
SANITATION
ENERGY
WASTE_MANAGEMENT
RURAL_DEVELOPMENT
URBAN_DEVELOPMENT
ACCESSIBILITY
EMPLOYMENT
DIGITAL_SERVICES
SOCIAL_WELFARE
OTHER
```

The final category list will be configurable by administrators.

---

# 11. HIERARCHICAL CLASSIFICATION

Classification may operate at multiple levels.

```text
Category
   ↓
Subcategory
   ↓
Problem Type
   ↓
Specific Tags
```

Example:

```text
Environment
   ↓
Waste Management
   ↓
Plastic Waste
   ↓
Collection / Recycling
```

---

# 12. CLASSIFICATION OUTPUT

Example:

```json
{
  "category": "ENVIRONMENT",
  "subcategory": "WASTE_MANAGEMENT",
  "confidence": 0.94
}
```

The system should preserve:

```text
model_id
model_version
confidence
timestamp
analysis_id
```

---

# 13. LOW-CONFIDENCE CLASSIFICATION

If confidence falls below a configured threshold:

```text
AI Prediction
      ↓
Low Confidence
      ↓
Human Review
      ↓
Final Classification
```

The threshold must be configurable.

---

# 14. DUPLICATE DETECTION

Duplicate detection prevents repeated societal problems from fragmenting the platform.

The system should compare:

* Title
* Description
* Category
* Location
* Semantic meaning
* Keywords
* Extracted entities

---

# 15. DUPLICATE DETECTION ARCHITECTURE

```text
New Problem
     ↓
Text Processing
     ↓
Embedding Generation
     ↓
Vector Search
     ↓
Candidate Problems
     ↓
Similarity Model
     ↓
Duplicate Classification
```

---

# 16. DUPLICATE TYPES

Possible relationships:

```text
EXACT_DUPLICATE
LIKELY_DUPLICATE
RELATED_PROBLEM
SAME_DOMAIN
LOCATION_VARIANT
UNRELATED
```

---

# 17. SIMILARITY SCORE

Similarity may be represented as:

```text
0.00 → Completely unrelated
0.25 → Weak relationship
0.50 → Moderate similarity
0.75 → Strong similarity
0.90+ → Very strong similarity
```

Thresholds must be configurable and validated using real evaluation data.

---

# 18. DUPLICATE HANDLING

AI should NOT automatically delete a submitted problem solely because it appears similar.

Instead:

```text
AI Detects Similarity
       ↓
Show Similar Problems
       ↓
Human / User Review
       ↓
Merge / Link / Continue
```

---

# 19. PRIORITY ANALYSIS

AI should assist in identifying high-priority problems.

Potential factors:

```text
Severity
Urgency
Population affected
Geographic reach
Duration
Economic impact
Environmental impact
Community support
Feasibility
Availability of existing solutions
```

---

# 20. PRIORITY SCORE

AI calculates a priority score based on the authoritative 7-factor specification defined in `SCALABILITY_AND_INTELLIGENCE_DESIGN.md` (Source of Truth):

1. **Societal Impact:** Magnitude of social benefit and population reach.
2. **Urgency:** Time sensitivity and immediate threat/hazard level.
3. **Feasibility:** Technical capability and practical execution probability.
4. **Community Demand / Support:** Upvotes, endorsements, and verified community evidence reports.
5. **Geographic Relevance:** Location sensitivity, regional priority, and community impact area.
6. **Government Alignment:** Strategic alignment with declared government priority directives.
7. **Duplicate Penalty:** Penalty deduction applied if similar active projects already exist.

Formula (Authoritative Source of Truth):

$$\text{Priority Score} = w_1 \cdot \text{Severity} + w_2 \cdot \text{Population Impact} + w_3 \cdot \text{Urgency} + w_4 \cdot \text{Community Support} + w_5 \cdot \text{Government Alignment} + w_6 \cdot \text{Feasibility} - w_7 \cdot \text{Duplicate Penalty}$$

Configurable weights ($w_1 \dots w_7$) must be validated before production use. AI recommends priority scores, and human administrators review or override them.

---

# 21. PRIORITY EXPLANATION

AI must provide reasons.

Example:

```text
Priority Score: 87/100

Reasons:
- Large affected population
- High urgency
- Significant environmental impact
- Strong community support
- Technically feasible intervention
```

Users should not receive an unexplained score.

---

# 22. SKILL EXTRACTION

AI identifies skills required to solve a problem.

Example:

```text
Problem:
Smart waste collection system

Extracted skills:
- IoT
- Embedded Systems
- Sensors
- Machine Learning
- Backend Development
- Data Analytics
- Mobile Development
```

---

# 23. SKILL CATEGORIZATION

Skills may be classified as:

```text
CORE
SUPPORTING
OPTIONAL
```

Example:

```text
CORE:
IoT
Embedded Systems

SUPPORTING:
Backend
Database

OPTIONAL:
Data Visualization
```

---

# 24. TECHNOLOGY EXTRACTION

AI may identify technologies potentially relevant to a problem.

Examples:

```text
Arduino
ESP32
Raspberry Pi
Python
React
Node.js
PostgreSQL
Computer Vision
IoT
Machine Learning
GIS
Cloud Services
```

AI recommendations must be treated as suggestions, not mandatory technology choices.

---

# 25. INTELLIGENT MULTI-COLLEGE MATCHING

### Architectural Principles:
> **"The platform must never select a college or university solely because it has the highest individual skill or domain match. When multiple institutions possess similar or overlapping capabilities, the intelligent matching engine must perform multi-factor contextual ranking to identify the most suitable institution for the specific problem."**

> **"Best Match ≠ Highest Single Skill Score."**

AI matches societal problems with universities using multi-factor contextual ranking across 16 relevant criteria:
1. Required skill/domain match
2. Skill coverage completeness
3. Department expertise
4. Faculty expertise and availability
5. Student skill availability
6. Relevant laboratory/facility availability
7. Current project/team capacity
8. Previous relevant project experience
9. Institutional specialization
10. Industry/startup partnerships
11. Geographic relevance
12. Government priority/alignment
13. Project complexity compatibility
14. Historical project performance/success
15. Current workload/capacity constraints
16. Cross-college collaboration potential

---

# 26. UNIVERSITY MATCHING PIPELINE

```text
Problem Requirements
   ↓
Required Skills & Technologies
   ↓
Domain & Complexity Analysis
   ↓
Institution Capability & Capacity Profiles
   ↓
Multi-Factor Contextual Ranking Engine
   ↓
Tie / Near-Tie Resolution & Shortlist Generation
   ↓
Explainable Recommendation Output (#1 Best Match, #2 Alternative, #3 ...)
   ↓
Human-in-the-Loop Review (where required)
```

---

# 27. UNIVERSITY MATCH SCORE & CAPACITY DISTINCTION

### 27.1 Capability vs. Current Practical Capacity
The matching engine explicitly separates:
- **Capability:** Institutional domain strength, research history, departments, and laboratory facilities (what the institution *can* do).
- **Current Practical Capacity:** Real-time unassigned student skills, available faculty mentoring bandwidth, open facility slots, and project workload (what the institution *can realistically take on now*).

$$\text{University Match Score} = \text{ContextualCapabilityMatch} \times \text{CapacityFactor}$$

Where $\text{CapacityFactor}$ dynamically penalizes overcommitted institutions and promotes available ones.

### 27.2 Tie / Near-Tie Handling
When matching scores between institutions are nearly identical, the system **never selects randomly**. It evaluates secondary contextual factors (workload capacity, real-time mentor bandwidth, facility availability, proximity) to produce a **Ranked Shortlist** (#1 Best Match, #2 Strong Alternative, #3 Strong Alternative). If candidate institutions remain effectively equivalent, multiple top candidates are presented with their respective strengths and constraints.

### 27.3 Ranked Shortlist & Grounded Explainability
Every recommendation provides structured explanations generated strictly from verified stored data:
- Match score & confidence level
- Key institutional strengths & available resources
- Capacity & workload status
- Important constraints or missing skill gaps
- Main justification (e.g. *"College B was ranked first because it provides strong coverage of required skills, has suitable faculty availability, possesses required laboratory facilities, has sufficient current project capacity, and has relevant previous project experience."*)

### 27.4 Human-in-the-Loop & Dynamic Re-Ranking
Recommendations serve as decision support. Low-confidence, near-tie, high-impact, or complex multi-domain recommendations trigger review by authorized human stakeholders (`UNIVERSITY_ADMIN`, `GOVERNMENT_OFFICIAL`, `MODERATOR`, `SUPER_ADMIN`). Rankings update dynamically when underlying institutional data (capacity, faculty load, new facilities, project history) changes.

---

# 28. STUDENT MATCHING

AI may recommend students based on:

```text
Skills
Projects
Academic interests
Technologies
Experience
Availability
Preferred domain
Team requirements
```

Student recommendations must respect privacy and authorization rules.

---

# 29. FACULTY MATCHING

Faculty matching may consider:

```text
Research area
Domain expertise
Projects
Publications
Technology
Department
Experience
Current mentorship load
```

The system must not expose private faculty information.

---

# 30. INDUSTRY / STARTUP MATCHING

AI may recommend organizations based on:

```text
Domain
Technology
Products
Expertise
Resources
Past collaborations
Industry sector
Geographic presence
Project requirements
```

---

# 31. TEAM FORMATION

AI may assist team formation.

Example:

```text
Project Requirements
       ↓
Required Skills
       ↓
Candidate Students
       ↓
Skill Complementarity
       ↓
Availability
       ↓
Team Balance
       ↓
Recommended Team
```

AI recommendations must remain optional.

---

# 32. TEAM DIVERSITY

Where appropriate, team recommendations should consider complementary skills rather than selecting users solely on a single metric.

Potential dimensions:

```text
Technical Skills
Domain Knowledge
Design
Management
Communication
Hardware
Software
Research
Testing
```

Sensitive personal attributes must not be used for unfair ranking.

---

# 33. RECOMMENDATION ENGINE

The recommendation engine may recommend:

```text
Problems
Projects
Universities
Students
Faculty
Industry partners
Startups
Skills
Technologies
Solutions
```

---

# 34. RECOMMENDATION SIGNALS

Possible signals:

```text
Skill similarity
Semantic similarity
Domain similarity
Previous activity
Project history
Explicit interests
Availability
Location
Organization expertise
User feedback
```

Recommendations must respect privacy and authorization.

---

# 35. COLD START

For new users with little activity, recommendations should use:

```text
Profile skills
Declared interests
Academic department
Organization expertise
Problem categories
Popular relevant content
```

The system should not require extensive historical activity.

---

# 36. SEMANTIC SEARCH

Semantic search allows users to search using meaning rather than exact keywords.

Example:

User searches:

```text
"problem related to reducing water wastage"
```

The system may find:

```text
Water leakage
Smart water monitoring
Agricultural water efficiency
Municipal water management
```

---

# 37. EMBEDDINGS

Embeddings may represent:

```text
Problems
Projects
Solutions
Skills
University expertise
Organization expertise
Documents
Feedback
```

Embeddings enable:

* Similarity search
* Duplicate detection
* Semantic search
* Recommendation
* Matching

---

# 38. VECTOR SEARCH

Conceptual flow:

```text
Text
 ↓
Embedding Model
 ↓
Vector
 ↓
Vector Database / Index
 ↓
Nearest Neighbor Search
 ↓
Candidate Results
```

The vector database must not replace the primary relational database as the source of truth.

---

# 39. SUMMARIZATION

AI may generate summaries for:

```text
Problems
Projects
Long discussions
Research information
Testing reports
Validation feedback
Solutions
```

Summaries should:

* Preserve meaning
* Avoid fabricated information
* Remain traceable to source material
* Clearly indicate they are AI-generated where appropriate

---

# 40. MULTILINGUAL AI

The platform should support multilingual interaction.

Initial priority:

```text
English
Tamil
```

Future languages can be added.

---

# 41. TRANSLATION

Conceptual workflow:

```text
Original Content
      ↓
Language Detection
      ↓
Translation
      ↓
Quality Validation
      ↓
Translated Version
```

The original content must never be overwritten.

---

# 42. TAMIL LANGUAGE SUPPORT

Tamil support should include:

* Problem submission
* Problem viewing
* Search
* Summaries
* AI analysis
* Recommendations
* Notifications where applicable

The system should preserve Tamil text correctly throughout storage, APIs, search, and AI processing.

---

# 43. HALLUCINATION CONTROL

AI-generated information must be treated as potentially fallible.

Controls:

```text
Confidence scores
Source references
Structured outputs
Validation
Human review
Rule checks
Restricted generation
```

AI must not fabricate:

* Statistics
* Organizations
* Research
* People
* Projects
* Government policies
* Technical specifications

---

# 44. RAG — RETRIEVAL AUGMENTED GENERATION

RAG may be used when AI needs trusted contextual information.

Possible sources:

```text
Platform database
Approved solution repository
University information
Project documentation
Government-provided information
Verified knowledge sources
```

Conceptual flow:

```text
User Query
    ↓
Retriever
    ↓
Relevant Documents
    ↓
Context
    ↓
LLM
    ↓
Grounded Response
```

---

# 45. RAG SOURCE CONTROL

Only authorized and trusted sources should enter production RAG indexes.

Documents should have metadata:

```text
source_id
owner
created_at
updated_at
verification_status
access_level
```

---

# 46. AI EXPLAINABILITY

For important AI decisions, the platform should provide understandable reasons.

Examples:

```text
Why was this problem classified as healthcare?

Why was this university recommended?

Why is this problem high priority?

Why was this problem considered similar?
```

---

# 47. AI CONFIDENCE

AI outputs should include confidence where technically meaningful.

Example:

```json
{
  "prediction": "ENVIRONMENT",
  "confidence": 0.93
}
```

Confidence should not be presented as absolute certainty.

---

# 48. HUMAN-IN-THE-LOOP

Critical AI decisions may require human review.

```text
AI
 ↓
Recommendation
 ↓
Human Review
 ↓
Accept / Modify / Reject
 ↓
Final Decision
```

Human review may be performed by:

```text
Moderator
Faculty
Domain Expert
Government Reviewer
Administrator
Authorized Stakeholder
```

depending on context.

---

# 49. AI DECISION AUDIT

For important decisions store:

```text
analysis_id
entity_id
model_id
model_version
input_reference
output
confidence
reason
timestamp
review_status
reviewer
review_timestamp
```

---

# 50. AI MODEL VERSIONING

Every production AI result must identify:

```text
Model Name
Model Version
Prompt Version where applicable
Embedding Model Version
Configuration Version
```

This ensures reproducibility.

---

# 51. MODEL REGISTRY

The future implementation may maintain a model registry containing:

```text
model_id
model_name
version
purpose
status
training_data_reference
evaluation_metrics
deployment_date
owner
```

---

# 52. MODEL LIFECYCLE

```text
Research
 ↓
Prototype
 ↓
Evaluation
 ↓
Validation
 ↓
Staging
 ↓
Production
 ↓
Monitoring
 ↓
Retraining / Improvement
 ↓
Deprecation
```

---

# 53. AI TRAINING DATA

Potential training data:

```text
Approved platform problems
Categorized problems
Human-reviewed classifications
Validated duplicate relationships
Skill annotations
Matching outcomes
User feedback
Project outcomes
```

Training data must be collected and processed according to privacy and governance requirements.

---

# 54. DATA QUALITY

AI quality depends heavily on data quality.

The system should monitor:

```text
Missing data
Duplicate records
Incorrect labels
Outliers
Language quality
Class imbalance
Stale information
Incorrect metadata
```

---

# 55. CLASS IMBALANCE

If some problem categories have significantly fewer examples, evaluation must account for class imbalance.

Possible methods:

```text
Weighted training
Resampling
Augmentation
Macro-F1 evaluation
Per-class metrics
```

The exact method should be selected during implementation based on actual data.

---

# 56. AI EVALUATION

Each AI capability must have measurable evaluation criteria.

---

# 57. CLASSIFICATION METRICS

Possible metrics:

```text
Accuracy
Precision
Recall
F1 Score
Macro F1
Confusion Matrix
```

For imbalanced classes, Macro F1 should receive particular attention.

---

# 58. DUPLICATE DETECTION METRICS

Possible metrics:

```text
Precision
Recall
F1
False Positive Rate
False Negative Rate
Top-K Retrieval Accuracy
```

False positives must be carefully controlled because unrelated problems should not be incorrectly merged.

---

# 59. MATCHING METRICS

Possible metrics:

```text
Precision@K
Recall@K
NDCG
Acceptance Rate
User Feedback
Successful Collaboration Rate
```

---

# 60. RECOMMENDATION METRICS

Possible metrics:

```text
Click-through rate
Save rate
Application rate
Acceptance rate
Completion rate
User satisfaction
Long-term project success
```

---

# 61. SUMMARIZATION EVALUATION

Evaluation may combine:

```text
Factual consistency
Coverage
Readability
Human evaluation
Hallucination rate
```

---

# 62. TRANSLATION EVALUATION

Evaluation may include:

```text
Semantic preservation
Human evaluation
Terminology accuracy
Language correctness
Domain-specific quality
```

---

# 63. AI FAIRNESS

AI must not unfairly disadvantage:

* Individuals
* Universities
* Departments
* Regions
* Communities
* Organizations

The system should regularly inspect ranking and recommendation outcomes.

---

# 64. LOCATION BIAS

AI must not automatically assume that problems from one location are more valuable than problems from another solely because of geographic popularity.

Location can be a valid contextual factor, but must not create unjustified discrimination.

---

# 65. INSTITUTIONAL BIAS

University recommendations must not rely solely on institutional reputation.

Relevant measurable factors should include:

```text
Expertise
Skills
Facilities
Research
Past relevant projects
Availability
```

---

# 66. AI SAFETY

AI must not:

* Generate harmful instructions
* Reveal confidential data
* Expose private user information
* Invent official decisions
* Pretend to be a government authority
* Falsely claim a solution is validated
* Automatically approve unsafe solutions

---

# 67. SECURITY

AI systems must protect:

```text
API keys
Model credentials
Prompts
Private documents
Embeddings
User information
Training data
System instructions
```

Secrets must never be stored in source code.

---

# 68. PROMPT SECURITY

Where LLMs are used:

```text
User Input
   ↓
Input Filtering
   ↓
Prompt Construction
   ↓
Model
   ↓
Output Validation
```

The system must defend against prompt injection and malicious instructions contained in uploaded documents or user-generated content.

---

# 69. OUTPUT VALIDATION

AI-generated structured results must be validated before storage.

For example:

```text
Category must exist.
Skill IDs must exist.
Confidence must be within valid range.
Scores must be within configured limits.
Required fields must exist.
```

---

# 70. AI COST OPTIMIZATION

AI costs should be controlled using:

```text
Caching
Batch processing
Smaller models for simple tasks
Larger models only when necessary
Asynchronous processing
Embedding reuse
Prompt optimization
Result reuse
Rate limiting
```

---

# 71. MODEL SELECTION STRATEGY

The platform should not depend on one AI model permanently.

The AI layer should use an abstraction:

```text
AI Interface
     |
 +---+---+---+
 |   |   |   |
LLM ML  NLP Embedding
```

This allows models to be replaced without redesigning the entire application.

---

# 72. SMALL MODEL VS LARGE MODEL

Use smaller / specialized models when:

```text
Classification
Language detection
Simple extraction
Basic similarity
```

Use stronger LLMs when:

```text
Complex reasoning
Long-form analysis
Summarization
Complex recommendations
Grounded conversational assistance
```

The final selection depends on evaluation and deployment constraints.

---

# 73. AI FALLBACK STRATEGY

If the primary AI service fails:

```text
Primary Model
     ↓
Failure
     ↓
Retry
     ↓
Fallback Model
     ↓
Rule-Based Fallback
     ↓
Human Review
```

Not every operation requires a fallback model.

---

# 74. AI RETRY POLICY

Retries should be used for transient failures.

Examples:

```text
Timeout
Temporary service unavailable
Rate limit
Network failure
```

Retries should use controlled backoff.

Permanent validation errors should not be repeatedly retried.

---

# 75. AI TIMEOUTS

AI operations must have configurable timeouts.

Long-running tasks should be asynchronous rather than keeping an HTTP connection open indefinitely.

---

# 76. AI MONITORING

Monitor:

```text
Latency
Error rate
Token usage
Cost
Model availability
Confidence distribution
Output quality
Drift
User feedback
Human corrections
```

---

# 77. MODEL DRIFT

Monitor changes in real-world data.

Potential drift:

```text
New terminology
New technologies
New societal issues
Language changes
Category distribution changes
User behavior changes
```

Models may require periodic evaluation and retraining.

---

# 78. HUMAN FEEDBACK LOOP

Human corrections can improve the AI system.

```text
AI Prediction
      ↓
Human Review
      ↓
Correction
      ↓
Feedback Dataset
      ↓
Evaluation
      ↓
Model Improvement
```

Feedback must be governed and validated before becoming training data.

---

# 79. USER FEEDBACK LOOP

Users may provide:

```text
Helpful
Not Helpful
Incorrect
Irrelevant
Report
```

AI recommendation quality can be measured using this feedback.

---

# 80. AI GOVERNANCE

AI governance should define:

```text
Model ownership
Approval process
Evaluation requirements
Deployment requirements
Monitoring
Incident response
Data governance
Privacy
Security
Retirement
```

---

# 81. AI INCIDENT HANDLING

Potential incidents:

```text
Hallucination
Incorrect classification
Biased recommendation
Privacy leakage
Prompt injection
Model failure
Unsafe recommendation
Data corruption
```

Incident workflow:

```text
Detect
 ↓
Record
 ↓
Assess
 ↓
Mitigate
 ↓
Human Review
 ↓
Correct
 ↓
Monitor
```

---

# 82. AI DATA RETENTION

AI inputs and outputs must follow platform data-retention policies.

Sensitive data should not be retained longer than necessary.

---

# 83. AI PRIVACY

AI services should receive only the minimum information necessary.

Example:

A classification service may not need a user's private contact details.

---

# 84. AI ACCESS CONTROL

AI analysis results may have different visibility levels.

```text
PUBLIC
COMMUNITY
PROJECT
ORGANIZATION
GOVERNMENT
ADMIN
PRIVATE
```

The API layer must enforce authorization.

---

# 85. AI EMBEDDING PRIVACY

Embeddings can potentially encode information about source content.

Therefore:

* Access must be controlled.
* Sensitive embeddings must not be public.
* Deletion workflows must include vector indexes where required.
* Retention must be governed.

---

# 86. AI SEARCH SECURITY

Semantic search must respect access permissions.

A user must not receive search results for documents they are not authorized to access.

---

# 87. AI RECOMMENDATION EXPLANATIONS

Recommendation responses should optionally include:

```text
match_score
matching_factors
explanation
confidence
```

Example:

```text
Recommended University

Match Score: 91%

Reasons:
- Strong IoT expertise
- Relevant faculty
- Required laboratory facilities
- Previous related project
```

---

# 88. AI PROJECT INTELLIGENCE

AI may analyze project information to identify:

```text
Progress trends
Delayed milestones
Blocked tasks
Resource requirements
Potential risks
Skill gaps
```

---

# 89. PROJECT RISK DETECTION

AI may flag:

```text
Repeated missed deadlines
Long inactivity
Unresolved blockers
Insufficient team skills
Testing failures
Resource shortages
```

AI should flag risks, not automatically punish teams.

---

# 90. PROJECT SUMMARY

AI may generate:

```text
Project Overview
Current Progress
Completed Work
Pending Work
Risks
Next Recommended Actions
```

The original project records remain authoritative.

---

# 91. IMPACT ANALYSIS

AI may help analyze:

```text
People affected
Cost savings
Time savings
Resource savings
Environmental benefits
Adoption
User satisfaction
Geographic reach
```

AI-generated impact estimates must be clearly distinguished from verified measurements.

---

# 92. COMMUNITY FEEDBACK ANALYSIS

AI may analyze large amounts of feedback for:

```text
Common complaints
Positive themes
Usability problems
Feature requests
Acceptance
Concerns
```

Sensitive information must be handled according to privacy rules.

---

# 93. SENTIMENT ANALYSIS

Sentiment analysis may be used as a supporting signal.

Possible outputs:

```text
Positive
Neutral
Negative
Mixed
```

Sentiment must not be treated as a definitive measure of truth or project quality.

---

# 94. TOPIC EXTRACTION

AI may identify recurring themes from:

```text
Problems
Comments
Feedback
Validation
Projects
Solutions
```

This can support government and administrative analytics.

---

# 95. TREND DETECTION

The platform may identify trends such as:

```text
Increasing water-related problems
Growing demand for accessibility solutions
Emerging technology requirements
Regional problem clusters
Recurring infrastructure issues
```

Trend analysis must distinguish correlation from causation.

---

# 96. AI DASHBOARD INSIGHTS

Dashboards may display AI-generated insights such as:

```text
Top problem categories
Emerging problem areas
High-priority problems
Skill shortages
Technology trends
University expertise gaps
Industry collaboration opportunities
Impact trends
```

Insights must include appropriate context and timestamps.

---

# 97. AI API INTEGRATION

AI services are exposed through the backend API.

Conceptual endpoints:

```text
POST /api/v1/ai/analyze/problem/{problem_id}

POST /api/v1/ai/classify/problem/{problem_id}

POST /api/v1/ai/prioritize/problem/{problem_id}

POST /api/v1/ai/duplicates/problem/{problem_id}

POST /api/v1/ai/skills/problem/{problem_id}

POST /api/v1/ai/summarize/problem/{problem_id}

POST /api/v1/ai/translate/problem/{problem_id}

GET /api/v1/ai/jobs/{job_id}
```

---

# 98. AI REQUEST FLOW

```text
Frontend
   ↓
API
   ↓
Authentication
   ↓
Authorization
   ↓
Validation
   ↓
AI Orchestrator
   ↓
AI Service
   ↓
Output Validation
   ↓
Database
   ↓
Response
```

---

# 99. AI RESPONSE STRUCTURE

Example:

```json
{
  "success": true,
  "data": {
    "analysis_id": "ANALYSIS_123",
    "operation": "classification",
    "result": {
      "category": "ENVIRONMENT",
      "confidence": 0.94
    },
    "model": {
      "name": "MODEL_NAME",
      "version": "1.0"
    }
  }
}
```

---

# 100. AI FAILURE RESPONSE

Example:

```json
{
  "success": false,
  "error": {
    "code": "AI_SERVICE_ERROR",
    "message": "AI processing is temporarily unavailable."
  },
  "request_id": "REQ123"
}
```

Internal model errors must not be exposed to users.

---

# 101. AI PIPELINE ORCHESTRATION

Problem processing pipeline:

```text
                    PROBLEM
                       |
                       v
              Language Detection
                       |
                       v
                Classification
                       |
                       v
              Duplicate Detection
                       |
                       v
               Priority Analysis
                       |
                       v
                Skill Extraction
                       |
                       v
             Technology Extraction
                       |
                       v
                Embedding
                       |
                       v
                  Matching
                       |
                       v
               Recommendations
```

Some stages may run independently or asynchronously.

---

# 102. PARALLEL AI PROCESSING

Independent AI tasks may execute in parallel.

Example:

```text
                  Problem
                     |
          +----------+----------+
          |          |          |
          v          v          v
    Classification Priority   Embedding
          |        Analysis       |
          |          |            |
          +----------+------------+
                     |
                     v
             Skill Extraction
                     |
                     v
                  Matching
```

This can reduce processing latency.

---

# 103. AI CACHE

Cache reusable AI outputs where appropriate.

Examples:

```text
Embeddings
Repeated translations
Category predictions
Static summaries
Common recommendations
```

Cache invalidation must occur when source data changes significantly.

---

# 104. AI RATE LIMITING

Expensive AI endpoints should have separate rate limits.

Examples:

```text
AI Analysis
Translation
Summarization
Recommendation generation
Semantic search
```

---

# 105. AI RESOURCE QUOTAS

Future implementation may support quotas based on:

```text
User
Organization
Role
API key
Service
Time period
```

---

# 106. AI MODEL ABSTRACTION

Application code should not tightly couple business logic to one AI vendor/model.

Conceptual interface:

```text
AIProvider
 ├── classify()
 ├── summarize()
 ├── translate()
 ├── generate_embedding()
 └── analyze()
```

The actual implementation can change later.

---

# 107. AI PROVIDER FAILOVER

Where practical:

```text
Provider A
    ↓
Failure
    ↓
Provider B
    ↓
Fallback
```

Provider-specific details should remain inside the AI service layer.

---

# 108. AI TESTING

AI functionality must be tested separately from normal software logic.

Testing categories:

```text
Unit Tests
Integration Tests
Model Tests
Prompt Tests
Regression Tests
Security Tests
Bias Tests
Performance Tests
Load Tests
Human Evaluation
```

---

# 109. AI REGRESSION TESTING

When a model or prompt changes:

```text
New Model
   ↓
Evaluation Dataset
   ↓
Compare Previous Version
   ↓
Quality Check
   ↓
Approval
   ↓
Deployment
```

A new model must not automatically replace a previous production model without evaluation.

---

# 110. GOLDEN DATASET

Maintain a curated evaluation dataset containing examples of:

```text
Problems
Categories
Duplicates
Required skills
Relevant universities
Relevant projects
Translation examples
```

Human experts should validate the dataset.

---

# 111. AI ACCEPTANCE CRITERIA

Before production, each AI component must meet agreed quality thresholds.

Example:

```text
Classification → target F1
Duplicate Detection → target precision/recall
Matching → target Precision@K
Translation → human quality threshold
Summarization → factual consistency threshold
```

Exact thresholds will be determined after baseline testing.

---

# 112. AI OBSERVABILITY DASHBOARD

The admin system should eventually monitor:

```text
AI requests
Successful jobs
Failed jobs
Average latency
Model usage
Token usage
Cost
Confidence
Human corrections
Model drift
```

---

# 113. AI COST DASHBOARD

Authorized administrators may monitor:

```text
Daily AI cost
Monthly AI cost
Cost per operation
Token usage
Embedding usage
Model distribution
```

---

# 114. AI MODEL ROLLBACK

If a deployed model causes serious degradation:

```text
Detect problem
      ↓
Stop rollout
      ↓
Rollback
      ↓
Restore previous model
      ↓
Investigate
      ↓
Fix
      ↓
Re-evaluate
```

---

# 115. AI DEPLOYMENT STRATEGY

Future production deployment may use:

```text
Development
   ↓
Testing
   ↓
Staging
   ↓
Canary
   ↓
Production
```

AI models should be gradually introduced where practical.

---

# 116. AI VERSION COMPATIBILITY

Model changes must not unexpectedly break API contracts.

The API should continue returning standardized structures even if the underlying model changes.

---

# 117. AI DATA LINEAGE

AI results should be traceable to their source data.

```text
Source Entity
      ↓
AI Job
      ↓
Model
      ↓
Output
      ↓
Human Review
      ↓
Final Record
```

---

# 118. AI RESULT IMMUTABILITY

Important historical AI analyses should not be silently overwritten.

Instead:

```text
Analysis V1
Analysis V2
Analysis V3
```

may be stored as separate versions where required.

---

# 119. AI DELETE WORKFLOW

When a user requests deletion of eligible source content:

```text
Source Record
    ↓
Database
    ↓
Search Index
    ↓
Vector Index
    ↓
AI Cache
```

Applicable derived records must be considered according to retention and legal requirements.

---

# 120. AI ARCHITECTURE SUMMARY

```text
                         SIH_26 PLATFORM
                                |
                                v
                           API LAYER
                                |
                                v
                        AI ORCHESTRATOR
                                |
        +-----------+-----------+-----------+-----------+
        |           |           |           |           |
        v           v           v           v           v
       NLP       CLASSIFIER  EMBEDDING   MATCHING   LLM/RAG
        |           |           |           |           |
        +-----------+-----------+-----------+-----------+
                                |
                       OUTPUT VALIDATION
                                |
                    +-----------+-----------+
                    |                       |
                    v                       v
                DATABASE              VECTOR STORE
                    |                       |
                    +-----------+-----------+
                                |
                                v
                         RECOMMENDATIONS
                                |
                                v
                         HUMAN REVIEW
                                |
                                v
                         FINAL PLATFORM
```

---

# 121. AI END-TO-END EXAMPLE

Example problem:

```text
"People in my village are wasting large amounts
of water because leaks are not detected quickly."
```

AI processing:

```text
1. Detect language
        ↓
2. Understand problem
        ↓
3. Classify:
   Water / Infrastructure
        ↓
4. Detect related problems
        ↓
5. Estimate priority
        ↓
6. Extract skills:
   IoT
   Embedded Systems
   Sensors
   Data Analytics
        ↓
7. Extract technologies:
   ESP32
   Flow Sensors
   Cloud Dashboard
        ↓
8. Find suitable universities
        ↓
9. Find faculty expertise
        ↓
10. Recommend student skills
        ↓
11. Recommend industry partners
        ↓
12. Recommend existing solutions
```

The AI outputs are recommendations and analysis, not automatic final decisions.

---

# 122. AI ROLE IN THE COMPLETE PLATFORM

```text
CITIZEN
   ↓
Problem Submission
   ↓
AI Understanding
   ↓
Classification
   ↓
Prioritization
   ↓
Duplicate Detection
   ↓
Skill Extraction
   ↓
University Matching
   ↓
STUDENT + FACULTY
   ↓
Team Formation
   ↓
INDUSTRY / STARTUP
   ↓
Collaboration
   ↓
PROJECT
   ↓
AI Project Intelligence
   ↓
Testing
   ↓
Community Validation
   ↓
Government Review
   ↓
Solution
   ↓
Impact
   ↓
AI Impact Analysis
```

---

# 123. AI DESIGN CHECKLIST

The AI architecture must support:

* [x] NLP
* [x] Classification
* [x] Hierarchical classification
* [x] Duplicate detection
* [x] Similarity analysis
* [x] Priority analysis
* [x] Skill extraction
* [x] Technology extraction
* [x] University matching
* [x] Student matching
* [x] Faculty matching
* [x] Industry matching
* [x] Startup matching
* [x] Team recommendations
* [x] Recommendation engine
* [x] Semantic search
* [x] Embeddings
* [x] Vector search
* [x] Summarization
* [x] Translation
* [x] Tamil support
* [x] RAG capability
* [x] Explainability
* [x] Confidence scoring
* [x] Human-in-the-loop
* [x] AI auditability
* [x] Model versioning
* [x] AI monitoring
* [x] Bias monitoring
* [x] Security
* [x] Privacy
* [x] Prompt injection protection
* [x] Hallucination controls
* [x] Output validation
* [x] AI fallback
* [x] Async processing
* [x] Cost optimization
* [x] Feedback loop
* [x] Model evaluation
* [x] Model rollback
* [x] Data lineage
* [x] Future extensibility

---

# 127. MODEL REGISTRY AND VERSIONING

All AI models, embeddings, classifiers, and LLM prompts are registered, versioned, and tracked in an **AI Model Registry**.

### Tracked Metadata:
- `model_id`: Unique identifier (e.g. `MOD-EMB-001`, `MOD-LLM-002`)
- `model_name`: Formal name (e.g. `Granite Embedding Multilingual R2 311M`, `Dhee-NxtGen-Qwen3-Indic 4B`)
- `model_version`: Version string (e.g. `v1.0.0-q4_k_m`)
- `model_purpose`: Task assignment (EMBEDDING, CLASSIFICATION, EXTRACTION, LLM_REASONING)
- `supported_languages`: ISO language codes (e.g. `en, ta, hi, te, ka, ml`)
- `embedding_dim`: Vector dimension (768 for embedding models)
- `license`: Open-source / commercial license type
- `deployment_type`: LOCAL_QUANTIZED, SELF_HOSTED_CONTAINER, CLOUD_API_OPTIONAL
- `resource_requirements`: Minimum VRAM/RAM (e.g. `~4.5 GB RAM for 4-bit 4B LLM`)
- `benchmark_metrics`: Latest evaluated F1 score, latency, and accuracy metrics
- `status`: EXPERIMENTAL, BENCHMARKING, PRODUCTION, DEPRECATED

> **Traceability Rule:** Every AI output persisted in `ai_analyses` or `matching_results` MUST record the exact `model_id` and `model_version` that generated it.

---

# 128. AI OBSERVABILITY AND MONITORING

The platform monitors AI operational health without exposing internal system details to end users.

### Monitored Metrics:
- **Latency:** Inference latency per component (Language ID, Embedding, Classification, Vector Search, LLM).
- **Resource Usage:** CPU, RAM, VRAM utilization across worker nodes.
- **LLM Fallback Rate:** Percentage of classification/extraction requests triggering LLM fallback.
- **Human Review Rate:** Percentage of outputs requiring human moderation or review.
- **Confidence Distribution:** Statistical distribution of AI confidence scores.
- **Error Rates & Retries:** Failed AI jobs, retry counts, and dead-letter queue depth.
- **Queue Depth:** Pending asynchronous AI tasks in Redis/RabbitMQ.

---

# 129. SAFETY, MODERATION AND PII PROTECTION

Input and output validation enforce platform safety and privacy:

```text
User Input
    ↓
PII Detection & Redaction (Phone, Aadhaar, Personal Emails)
    ↓
Lightweight Rule-Based Content Moderation (Hate Speech, Profanity, Spam)
    ↓
AI Processing Execution
    ↓
Output Validation (Taxonomy Bounds Check, Groundedness Check)
    ↓
Authorization Enforcement → Database Persistence
```

High-risk or uncertain moderation flags route immediately to human moderators (`MODERATOR` / `SUPER_ADMIN`).

---

# 130. GROUNDED EXPLAINABILITY ENGINE

AI recommendations are explainable and anti-hallucinatory through a dual-layer strategy:

1. **Machine-Readable Layer:** Factor scores, 16-factor weights, matched capabilities, confidence levels, and source database record IDs.
2. **Human-Readable Layer:** Natural-language justifications generated **strictly from verified database facts**.

> **Anti-Hallucination Mandate:** The LLM generator MUST NOT invent unverified institutional capabilities, laboratory facilities, faculty publications, or statistics. All facts presented in explanations must exist in the retrieved database records.

---

# 131. HUMAN-IN-THE-LOOP & FEEDBACK LOOP

AI outputs serve as decision-support tools. Human review is triggered for:
- Low-confidence classifications (< 0.70 confidence)
- Near-tie institutional matching scores ($\Delta \text{Score} < 3\%$)
- High-impact priority assignments (CRITICAL priority flags)
- Content moderation edge cases

### Human Review Actions:
- `APPROVE`: Validate AI recommendation as correct.
- `CORRECT`: Override AI output with corrected taxonomy/values.
- `REJECT`: Invalidate AI prediction.

> **Feedback Loop Rule:** Human corrections are stored in a `validated_feedback_data` store to build clean benchmark evaluation datasets. Unverified raw user submissions are **NEVER** automatically fed into model retraining loops.

---

# 132. COST STRATEGY AND LOCAL MODEL DEPLOYMENT

The platform architecture guarantees **₹0-cost AI development and execution** using open-source, locally hosted models:

- **Local Inference:** 4-bit quantized 4B-class Indic LLM (`Dhee-NxtGen-Qwen3-Indic 4B`) running on standard developer hardware (~16GB RAM).
- **Pluggable Cloud Abstraction:** Cloud AI services (e.g. Gemini API / Vertex AI) are supported as **OPTIONAL production upgrades** via provider interfaces without refactoring core platform architecture.
- **No Mandatory Subscriptions:** Core platform functionality never depends on paid external APIs.

---

# 133. CONNECTIVITY AND ASYNCHRONOUS DEGRADATION MODEL

The platform explicitly distinguishes local AI execution capabilities:
- **Local AI Components:** Local models run without external API dependencies.
- **Asynchronous Buffering:** If local AI workers or external services are temporarily offline, citizen problem submissions are safely stored in the database immediately (HTTP 202 Accepted).
- **Graceful Resumption:** AI job queues process accumulated submissions automatically once AI services recover.

---

# 134. OCR AND SPEECH EXTENSIONS (FUTURE / OPTIONAL)

OCR and Speech processing are defined as **OPTIONAL FUTURE EXTENSIONS** for post-Phase 1 expansion:
- **OCR Pipeline:** Image/Document $\rightarrow$ Tesseract / Multilingual OCR $\rightarrow$ Text $\rightarrow$ Multilingual AI Pipeline.
- **Speech Pipeline:** Audio Stream $\rightarrow$ Whisper / Indic ASR $\rightarrow$ Text $\rightarrow$ Multilingual AI Pipeline.

*Neither OCR nor Speech-to-Text is a mandatory dependency for the initial Phase 1 core release.*

---

# 135. AI BENCHMARKING PLAN

Model selection for production is governed by empirical benchmark testing across the following suite:

### Test Dimensions & Benchmark Tasks:
1. **Multilingual Test Set:** Evaluation across English, Tamil, Hindi, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, Punjabi, and Odia.
2. **Embedding Performance:**
   - Same-Language Semantic Similarity (EN-EN, TA-TA)
   - Cross-Language Semantic Similarity (TA-EN, HI-EN)
   - Duplicate Detection Accuracy & Retrieval Precision @ K
   - Unrelated Problem Separation
3. **Classification & Extraction Quality:**
   - Taxonomy Classification Accuracy & Macro-F1
   - Skill Extraction Precision, Recall, and F1 Score
4. **Selective LLM Evaluation:**
   - JSON Output Schema Validation Rate (%)
   - Multilingual Reasoning & Grounded Explanation Quality
   - Hallucination Rate on Verified Database Facts (%)
5. **System & Resource Benchmarks:**
   - Inference Latency (ms per request)
   - CPU & RAM Consumption on ~16GB RAM Hardware
   - Queue Throughput & Retry Reliability

> **Empirical Rule:** Benchmark metrics are recorded as *tests to be executed during Phase 1.5–1.13 validation*. Production model locks occur only after benchmark execution.

---

# 136. FINAL AI ARCHITECTURE DIAGRAM

```text
                                  PLATFORM USER
                                        │
                                        v
                                API / BACKEND LAYER
                                        │
                       ┌────────────────┴────────────────┐
                       v                                 v
         SAVE PROBLEM IMMEDIATELY TO DB        HTTP 202 ASYNC RESPONSE
                       │
                       v
                 AI JOB QUEUE (Redis / RabbitMQ)
                       │
                       v
                AI ORCHESTRATOR
                       │
     ┌─────────────────┼─────────────────┬─────────────────┐
     v                 v                 v                 v
Language/PII     Classification     Skill/Entity      768-D Embedding
  Service           Service          Extraction           Service
 (Lightweight)    (Lightweight)     (Taxonomy)      (Granite R2 311M)
     │                 │                 │                 │
     └─────────────────┼─────────────────┴─────────────────┘
                       │
                       v
             SELECTIVE LLM SERVICE (Dhee-NxtGen-Qwen3-Indic 4B)
                       │
                       v
               AI DECISION LAYER
     ┌─────────────────┼─────────────────┐
     v                 v                 v
 Duplicate         Priority           Matching Engine
  Engine            Engine       ┌───────┼───────┐
 (HNSW 768D)       (7-Factor)    v       v       v
                              College Student Faculty
                                (16-Factor)
                       │
                       v
          RANKED SHORTLIST & RECOMMENDATIONS
                       │
                       v
         GROUNDED EXPLANATION GENERATOR (Data-Verified)
                       │
                       v
          HUMAN-IN-THE-LOOP REVIEW NODE (If needed)
                       │
                       v
         AI MODEL REGISTRY & AUDIT LOGGING
```

---

# 137. IMPLEMENTATION STATUS

```text
AI_DESIGN.md
Version: V0.2 (Phase 1.5–1.13 Updated)
Status: PROFESSIONAL AI DESIGN SPECIFICATION
Hybrid Architecture: DEFINED
Multilingual Architecture: DEFINED (English, Tamil, Indic)
Embedding Interface: DEFINED (768-D, Granite R2 311M Benchmark Candidate)
Local LLM Benchmark Candidate: DEFINED (Dhee-NxtGen-Qwen3-Indic 4B)
AI Implementation: PLANNED (Awaiting Benchmark Execution)
```

---

# 138. IMPLEMENTATION RULE

No AI implementation should begin until this document is reviewed against:

```text
MASTER_BLUEPRINT.md
SYSTEM_ARCHITECTURE.md
DATABASE_DESIGN.md
API_DESIGN.md
SECURITY_DESIGN.md
SCALABILITY_AND_INTELLIGENCE_DESIGN.md
```

Any contradiction must be resolved at the documentation level first.

# END OF AI DESIGN

