# SIH_26 — DATABASE DESIGN

**Version:** V0.3  
**Status:** Database Planning / Specification  
**Project:** SIH_26  
**Problem Statement:** SIH 26043  
**Architecture Reference:** `docs/SYSTEM_ARCHITECTURE.md`  
**Master Requirement Reference:** `docs/MASTER_BLUEPRINT.md`

---

# 1. PURPOSE

This document defines the logical database architecture for SIH_26.

The database must support the complete platform lifecycle:

Citizen Problem Submission
→ AI Analysis
→ Moderation
→ Prioritization
→ Duplicate Detection
→ Stakeholder Matching
→ University Participation
→ Student / Faculty Team Formation
→ Industry Collaboration
→ Project Development
→ Tasks
→ Milestones
→ Prototype
→ Testing
→ Community Validation
→ Government Review
→ Deployment
→ Impact Measurement
→ Solution Repository
→ Knowledge Reuse

The database design must preserve traceability throughout this lifecycle.

---

# 2. DATABASE DESIGN PRINCIPLES

The database should follow:

1. Data integrity
2. Referential integrity
3. Normalization
4. Secure access
5. Role-based visibility
6. Auditability
7. Extensibility
8. Scalability
9. Searchability
10. AI traceability
11. Historical traceability
12. Privacy by design
13. Minimal duplication
14. Clear ownership
15. Future migration flexibility

---

# 3. DATA STORAGE MODEL

SIH_26 will conceptually use multiple storage mechanisms.

```text
                    SIH_26 DATA LAYER
                           |
        +------------------+------------------+
        |                  |                  |
        v                  v                  v
 Relational DB       Object Storage       Vector Store
        |                  |                  |
 Structured data       Files/evidence      Embeddings
 Relationships         Images/videos       Semantic search
 Transactions          Documents           Similarity
 Audit data            Reports             Matching
```

The relational database is the system of record for structured application data.

Large files should use object/file storage.

Embeddings and semantic representations may use a vector-capable store.

---

# 4. CORE ENTITY GROUPS

The database is divided into:

```text
1. Identity & Access
2. User Profiles
3. Institutions
4. Industry
5. Problems
6. Community
7. AI Intelligence
8. Skills & Technologies
9. Matching
10. Projects
11. Teams
12. Tasks & Milestones
13. Collaboration
14. Files & Evidence
15. Testing
16. Validation
17. Feedback
18. Impact
19. Solutions
20. Notifications
21. Moderation
22. Verification
23. Analytics
24. Audit
25. System Configuration
```

---

# 5. ENTITY NAMING CONVENTION

Logical table names should use:

```text
lowercase_snake_case
```

Examples:

```text
users
user_roles
problems
projects
project_members
ai_analyses
notifications
```

Primary keys should use a consistent unique identifier strategy.

The exact database-specific type will be decided during implementation.

---

# 6. ID STRATEGY

Every major entity requires a unique identifier.

Conceptually:

```text
user_id
problem_id
project_id
university_id
department_id
industry_id
task_id
milestone_id
solution_id
```

Identifiers should not expose sensitive information.

---

# 7. IDEMPOTENCY

Operations that may be retried should support idempotency where necessary.

Examples:

```text
Problem submission
Payment-like future operations
Notification creation
AI job creation
File processing
Webhook handling
```

The exact implementation mechanism will be decided later.

---

# 8. IDENTITY MODEL

## 8.1 USERS

Logical table:

```text
users
```

Purpose:

Stores the core identity of every platform account.

Conceptual attributes:

| Field          | Purpose                        |
| -------------- | ------------------------------ |
| user_id        | Unique user identifier         |
| email          | Login/contact email            |
| phone          | Optional contact               |
| password_hash  | Secure password representation |
| account_status | Account state                  |
| email_verified | Verification status            |
| phone_verified | Verification status            |
| created_at     | Creation timestamp             |
| updated_at     | Last update                    |
| last_login_at  | Last successful login          |

Sensitive authentication information must be protected.

---

# 9. ACCOUNT STATUS

Possible states:

```text
PENDING
ACTIVE
SUSPENDED
DEACTIVATED
DELETED
```

---

# 10. ROLES

Logical table:

```text
roles
```

Canonical System Authorization Roles (Authoritative Source of Truth for system permissions):

```text
COMMUNITY_MEMBER
STUDENT
FACULTY
UNIVERSITY_ADMIN
INDUSTRY_PARTNER
GOVERNMENT_OFFICIAL
MODERATOR
SUPER_ADMIN
```

Note: These canonical role names serve system authorization and access control. Stakeholder categories (Citizen / Community, Student, Faculty, University / College, Industry / Startup, Government, Admin / Moderator) map directly to these underlying system authorization roles.

---

# 11. USER ROLES

Logical table:

```text
user_roles
```

Purpose:

Allows a user to have one or more authorized roles.

Conceptual fields:

| Field        | Purpose                 |
| ------------ | ----------------------- |
| user_role_id | Unique record           |
| user_id      | User                    |
| role_id      | Role                    |
| status       | Role status             |
| assigned_at  | Assignment time         |
| assigned_by  | Assigning administrator |
| expires_at   | Optional expiration     |

Relationship:

```text
users
  1
  |
  N
user_roles
  N
  |
  1
roles
```

---

# 12. USER PROFILE

Logical table:

```text
user_profiles
```

Fields may include:

```text
profile_id
user_id
first_name
last_name
display_name
profile_photo_file_id
bio
location_id
preferred_language
website
created_at
updated_at
```

---

# 13. USER PREFERENCES

Logical table:

```text
user_preferences
```

May store:

* Language
* Notification preferences
* Privacy preferences
* Email preferences
* Dashboard preferences
* Recommendation preferences

---

# 14. CITIZEN PROFILE

Logical table:

```text
citizen_profiles
```

Possible information:

```text
citizen_profile_id
user_id
community_identifier
occupation
general_location
privacy_settings
```

Only necessary information should be collected.

---

# 15. STUDENT PROFILE

Logical table:

```text
student_profiles
```

Possible fields:

```text
student_profile_id
user_id
university_id
department_id
student_identifier
year_of_study
academic_status
bio
portfolio_url
availability_status
```

Sensitive academic information should have restricted visibility.

---

# 16. FACULTY PROFILE

Logical table:

```text
faculty_profiles
```

Possible fields:

```text
faculty_profile_id
user_id
university_id
department_id
designation
faculty_identifier
bio
research_summary
experience_years
profile_visibility
```

---

# 17. INDUSTRY PROFILE

Logical table:

```text
industry_profiles
```

API Mapping Note: Industry / Startup organizations are represented internally through the `industry_profiles` data model and exposed publicly via the `/api/v1/organizations` API resource.

Possible fields:

```text
industry_id
user_id
organization_name
organization_type
industry_sector
description
website
location_id
verification_status
```

---

# 18. GOVERNMENT PROFILE

Logical table:

```text
government_profiles
```

Possible fields:

```text
government_profile_id
user_id
department_name
designation
jurisdiction
government_identifier
verification_status
```

Access must be controlled carefully.

---

# 19. UNIVERSITY ENTITY

Logical table:

```text
universities
```

Fields:

```text
university_id
name
short_name
description
website
location_id
verification_status
created_at
updated_at
```

---

# 20. UNIVERSITY DEPARTMENTS

Logical table:

```text
departments
```

Fields:

```text
department_id
university_id
name
code
description
created_at
updated_at
```

Relationship:

```text
University
   1
   |
   N
Departments
```

---

# 21. UNIVERSITY FACULTY RELATIONSHIP

A faculty member belongs to an institution and generally a department.

```text
University
   |
Department
   |
Faculty
```

Historical affiliation may need separate records if users change institutions.

---

# 22. STUDENT UNIVERSITY RELATIONSHIP

Students may have institutional affiliations.

```text
University
   |
Department
   |
Student
```

A separate affiliation table may be used to preserve historical records.

---

# 23. UNIVERSITY FACILITIES

Logical table:

```text
university_facilities
```

Examples:

```text
Laboratory
Research Center
Fabrication Facility
Testing Facility
Innovation Center
Equipment Facility
```

Fields:

```text
facility_id
university_id
name
facility_type
description
availability_status
```

---

# 24. UNIVERSITY EXPERTISE

Logical table:

```text
university_expertise
```

Links universities with:

* Skills
* Technologies
* Domains
* Research areas

---

# 25. INDUSTRY EXPERTISE

Logical table:

```text
industry_expertise
```

Fields:

```text
industry_expertise_id
industry_id
skill_id
technology_id
experience_level
```

---

# 26. INDUSTRY RESOURCES

Logical table:

```text
industry_resources
```

Possible resources:

```text
Mentorship
Equipment
Funding
Technology
Testing
Infrastructure
Data
Professional Expertise
```

---

# 27. PROBLEM ENTITY

Logical table:

```text
problems
```

This is one of the most important entities.

Conceptual fields:

| Field             | Purpose           |
| ----------------- | ----------------- |
| problem_id        | Unique problem    |
| submitted_by      | User              |
| title             | Problem title     |
| description       | Detailed problem  |
| status            | Lifecycle status  |
| moderation_status | Moderation        |
| category_id       | Category          |
| priority_level    | Priority          |
| priority_score    | Numeric score     |
| language          | Original language |
| visibility        | Public/private    |
| created_at        | Creation          |
| updated_at        | Update            |
| published_at      | Publication       |

---

# 28. PROBLEM STATUS

Canonical `ProblemStatus` Enum (Authoritative Source of Truth across all system design documents):

```text
DRAFT
SUBMITTED
UNDER_REVIEW
AI_ANALYSIS
VALIDATION
DUPLICATE_REVIEW
PRIORITIZED
MATCHED
SHORTLISTED
ACCEPTED
PROJECT_CREATED
IN_PROGRESS
TESTING
DEPLOYMENT
RESOLVED
IMPACT_MEASUREMENT
ARCHIVED
```

This canonical `ProblemStatus` lifecycle governs all database records, API schemas, AI state transitions, and workflow engines.

---

# 29. PROBLEM CATEGORIES

Logical table:

```text
problem_categories
```

Examples:

```text
Healthcare
Education
Water
Waste
Transportation
Environment
Agriculture
Public Safety
Accessibility
Energy
Infrastructure
Governance
```

Categories must remain extensible.

---

# 30. PROBLEM SUBCATEGORIES

Logical table:

```text
problem_subcategories
```

Relationship:

```text
Category
   1
   |
   N
Subcategory
```

---

# 31. PROBLEM LOCATION

Logical table:

```text
problem_locations
```

Possible fields:

```text
problem_location_id
problem_id
country
state
district
city
locality
latitude
longitude
location_precision
```

Precise coordinates must have appropriate privacy controls.

---

# 32. PROBLEM EVIDENCE

Logical table:

```text
problem_evidence
```

Evidence can include:

* Photos
* Videos
* Documents
* Reports
* Links
* Survey results

Fields:

```text
evidence_id
problem_id
file_id
evidence_type
description
uploaded_by
created_at
```

---

# 33. PROBLEM SUPPORT

Logical table:

```text
problem_support
```

Purpose:

Allows community members to indicate support.

Fields:

```text
support_id
problem_id
user_id
support_type
created_at
```

A user should not be able to create duplicate support records for the same problem unless explicitly allowed.

---

# 34. PROBLEM COMMENTS

Logical table:

```text
problem_comments
```

Fields:

```text
comment_id
problem_id
user_id
parent_comment_id
content
status
created_at
updated_at
```

Supports threaded discussions.

---

# 35. PROBLEM HISTORY

Logical table:

```text
problem_status_history
```

Purpose:

Preserves lifecycle history.

Fields:

```text
history_id
problem_id
old_status
new_status
changed_by
reason
created_at
```

This is important for traceability.

---

# 36. AI ANALYSIS

Logical table:

```text
ai_analyses
```

Stores AI-generated analysis.

Fields may include:

```text
analysis_id
problem_id
model_identifier
model_version
analysis_type
input_reference
output_reference
confidence_score
processing_status
created_at
completed_at
```

---

# 37. AI ANALYSIS TYPES

```text
CLASSIFICATION
PRIORITY
SKILL_EXTRACTION
ENTITY_EXTRACTION
DUPLICATE_DETECTION
SIMILARITY
MATCHING
RECOMMENDATION
SUMMARIZATION
TRANSLATION
```

---

# 38. AI ANALYSIS STATUS

```text
QUEUED
PROCESSING
COMPLETED
FAILED
RETRYING
REVIEW_REQUIRED
```

---

# 39. AI CONFIDENCE

AI results should store confidence where applicable.

Conceptual fields:

```text
confidence_score
confidence_level
```

Possible levels:

```text
LOW
MEDIUM
HIGH
```

---

# 40. AI HUMAN REVIEW

Logical table:

```text
ai_reviews
```

Fields:

```text
ai_review_id
analysis_id
reviewer_id
decision
review_notes
created_at
```

Possible decisions:

```text
ACCEPT
MODIFY
REJECT
```

---

# 41. DUPLICATE / SIMILARITY RESULTS

Logical table:

```text
similarity_results
```

Fields:

```text
similarity_result_id
source_problem_id
target_problem_id
similarity_score
similarity_type
model_version
review_status
created_at
```

---

# 42. SIMILARITY TYPES

```text
EXACT_DUPLICATE
LIKELY_DUPLICATE
RELATED_PROBLEM
LOW_SIMILARITY
```

---

# 43. PROBLEM RELATIONSHIPS

Logical table:

```text
problem_relationships
```

Possible relationships:

```text
DUPLICATE_OF
RELATED_TO
DERIVED_FROM
SPLIT_FROM
MERGED_WITH
```

---

# 44. SKILLS

Logical table:

```text
skills
```

Examples:

```text
Python
Embedded Systems
IoT
Computer Vision
Machine Learning
Civil Engineering
GIS
Data Analytics
```

---

# 45. SKILL CATEGORIES

Logical table:

```text
skill_categories
```

Examples:

```text
Technical
Domain
Research
Hardware
Software
Management
Design
```

---

# 46. USER SKILLS

Logical table:

```text
user_skills
```

Fields:

```text
user_skill_id
user_id
skill_id
proficiency_level
years_experience
verification_status
source
```

---

# 47. PROBLEM SKILLS

Logical table:

```text
problem_skills
```

Links problems to required skills.

Fields:

```text
problem_skill_id
problem_id
skill_id
importance
source
confidence
```

---

# 48. TECHNOLOGIES

Logical table:

```text
technologies
```

Examples:

```text
IoT
AI
Machine Learning
Blockchain
GIS
Robotics
Embedded Systems
Cloud
Computer Vision
```

---

# 49. PROBLEM TECHNOLOGIES

Logical table:

```text
problem_technologies
```

Links required technologies to problems.

---

# 50. USER TECHNOLOGIES

Logical table:

```text
user_technologies
```

Links users with technologies.

---

# 51. MATCHING ENGINE & RANKED SHORTLIST

Logical table:

```text
matching_results
```

Purpose:

Stores multi-factor AI/system-generated stakeholder matches, contextual ranked shortlists, capability vs. capacity scores, and explainable justifications.

Fields:

```text
matching_result_id
problem_id
candidate_type
candidate_id
rank_order           -- Shortlist position (#1 Best Match, #2 Alternative, etc.)
capability_score     -- Pure technical capability score
capacity_factor      -- Workload/capacity multiplier/penalty
overall_match_score  -- Final weighted contextual match score
confidence_level     -- AI confidence rating
match_reason         -- Data-grounded explainable justification
missing_capabilities -- Identified skill or resource gaps
human_review_status  -- PENDING_REVIEW, APPROVED, MODIFIED, REJECTED
matching_version     -- Algorithm version tracking
status               -- ACTIVE, SUPERSEDED, ARCHIVED
created_at
updated_at
```

---

# 52. CANDIDATE TYPES

```text
UNIVERSITY
DEPARTMENT
FACULTY
STUDENT
INDUSTRY
PROJECT
SOLUTION
```

---

# 53. MULTI-FACTOR MATCHING CRITERIA

Logical table:

```text
matching_factors
```

Stores individual factor evaluations for a matching result across the 16 multi-factor criteria:

```text
Skill Match
Skill Coverage Completeness
Department Expertise
Faculty Expertise & Availability
Student Skill Availability
Laboratory/Facility Availability
Current Team Capacity
Previous Relevant Experience
Institutional Specialization
Industry/Startup Partnerships
Geographic Relevance
Government Priority Alignment
Project Complexity Compatibility
Historical Performance/Success
Workload/Capacity Constraints
Cross-College Collaboration Potential
```

Each matching result contains multiple granular factor scores ensuring full transparency and explainability.

---

# 54. RECOMMENDATIONS

Logical table:

```text
recommendations
```

Fields:

```text
recommendation_id
user_id
recommendation_type
target_type
target_id
score
reason
status
created_at
```

---

# 55. AI MODEL REGISTRY

Logical table:

```text
ai_model_registry
```

Purpose:

Tracks and audits all AI models, embeddings, classifiers, and LLM providers deployed or benchmarked across the platform.

Fields:

```text
model_registry_id    -- Primary Key
model_id             -- Unique model identifier (e.g. MOD-EMB-001)
model_name           -- Formal model name (e.g. Granite Embedding Multilingual R2 311M)
model_version        -- Version string (e.g. v1.0.0-q4_k_m)
model_purpose        -- EMBEDDING, CLASSIFICATION, EXTRACTION, LLM_REASONING
supported_languages  -- ISO language list (e.g. en, ta, hi, te, ka, ml)
embedding_dim        -- Vector dimension (768 for embedding models)
license              -- License type (e.g. Apache-2.0, MIT)
deployment_type      -- LOCAL_QUANTIZED, SELF_HOSTED_CONTAINER, CLOUD_API_OPTIONAL
resource_requirements-- Hardware profile (RAM/VRAM requirements)
benchmark_metrics    -- JSON metadata storing F1, latency, accuracy scores
status               -- EXPERIMENTAL, BENCHMARKING, PRODUCTION, DEPRECATED
created_at
updated_at
```

---

# 55. RECOMMENDATION FEEDBACK

Logical table:

```text
recommendation_feedback
```

Possible actions:

```text
ACCEPTED
REJECTED
IGNORED
SAVED
```

Purpose:

Improves future recommendation evaluation.

---

# 56. PROJECT ENTITY

Logical table:

```text
projects
```

Fields:

```text
project_id
problem_id
title
description
objectives
status
start_date
target_end_date
actual_end_date
progress_percentage
created_by
created_at
updated_at
```

---

# 57. PROJECT STATUS

Possible states:

```text
PLANNING
TEAM_FORMING
ACTIVE
ON_HOLD
TESTING
VALIDATION
IMPLEMENTATION
COMPLETED
CANCELLED
ARCHIVED
```

---

# 58. PROJECT MEMBERS

Logical table:

```text
project_members
```

Fields:

```text
project_member_id
project_id
user_id
member_role
status
joined_at
left_at
```

Possible member roles:

```text
STUDENT
TEAM_LEAD
FACULTY_MENTOR
INDUSTRY_MENTOR
PROJECT_COORDINATOR
GOVERNMENT_REVIEWER
```

---

# 59. TEAMS

Logical table:

```text
teams
```

Fields:

```text
team_id
project_id
name
description
team_lead_user_id
status
created_at
```

---

# 60. TEAM MEMBERS

Logical table:

```text
team_members
```

Fields:

```text
team_member_id
team_id
user_id
role
joined_at
status
```

---

# 61. TEAM INVITATIONS

Logical table:

```text
team_invitations
```

Fields:

```text
invitation_id
team_id
invited_user_id
invited_by
status
expires_at
created_at
```

---

# 62. PROJECT OBJECTIVES

Logical table:

```text
project_objectives
```

Allows projects to contain multiple objectives.

Fields:

```text
objective_id
project_id
title
description
priority
status
created_at
```

---

# 63. TASKS

Logical table:

```text
tasks
```

Fields:

```text
task_id
project_id
milestone_id
title
description
assigned_to
priority
status
start_date
due_date
completed_at
created_at
updated_at
```

---

# 64. TASK STATUS

```text
TODO
IN_PROGRESS
BLOCKED
UNDER_REVIEW
COMPLETED
CANCELLED
```

---

# 65. TASK COMMENTS

Logical table:

```text
task_comments
```

Fields:

```text
comment_id
task_id
user_id
content
created_at
updated_at
```

---

# 66. TASK DEPENDENCIES

Logical table:

```text
task_dependencies
```

Purpose:

Allows one task to depend on another.

Example:

```text
Hardware Design
      ↓
Prototype Assembly
      ↓
Testing
```

---

# 67. MILESTONES

Logical table:

```text
milestones
```

Fields:

```text
milestone_id
project_id
title
description
due_date
status
completion_percentage
created_at
updated_at
```

---

# 68. MILESTONE DELIVERABLES

Logical table:

```text
milestone_deliverables
```

Fields:

```text
deliverable_id
milestone_id
title
description
file_id
status
submitted_by
reviewed_by
created_at
```

---

# 69. MILESTONE REVIEWS

Logical table:

```text
milestone_reviews
```

Fields:

```text
review_id
milestone_id
reviewer_id
decision
score
comments
created_at
```

---

# 70. PROJECT RISKS

Logical table:

```text
project_risks
```

Fields:

```text
risk_id
project_id
title
description
severity
probability
status
mitigation
owner_id
created_at
updated_at
```

---

# 71. PROJECT UPDATES

Logical table:

```text
project_updates
```

Used for progress communication.

Fields:

```text
update_id
project_id
author_id
title
content
progress_change
created_at
```

---

# 72. INDUSTRY COLLABORATION

Logical table:

```text
collaborations
```

Fields:

```text
collaboration_id
project_id
industry_id
requested_by
collaboration_type
description
status
requested_at
approved_at
completed_at
```

---

# 73. COLLABORATION TYPES

```text
MENTORSHIP
TECHNOLOGY
EQUIPMENT
FUNDING
TESTING
CONSULTING
RESOURCE_SHARING
EMPLOYMENT_PIPELINE
PARTNERSHIP
```

---

# 74. COLLABORATION STATUS

```text
REQUESTED
PENDING_REVIEW
APPROVED
REJECTED
ACTIVE
COMPLETED
CANCELLED
```

---

# 75. MENTORSHIP

Logical table:

```text
mentorships
```

Fields:

```text
mentorship_id
project_id
mentor_user_id
mentee_team_id
focus_area
status
start_date
end_date
```

---

# 76. SHARED RESOURCES

Logical table:

```text
shared_resources
```

Fields:

```text
resource_id
collaboration_id
resource_type
title
description
file_id
shared_by
access_level
created_at
```

---

# 77. FILE METADATA

Logical table:

```text
files
```

Fields:

```text
file_id
uploaded_by
storage_key
original_name
mime_type
size
checksum
visibility
created_at
```

The database stores metadata.

Actual large files are stored in object storage.

---

# 78. FILE ACCESS

Logical table:

```text
file_access
```

Fields:

```text
file_access_id
file_id
user_id
access_type
granted_by
expires_at
created_at
```

Possible access types:

```text
VIEW
DOWNLOAD
EDIT
```

---

# 79. PROTOTYPES

Logical table:

```text
prototypes
```

Fields:

```text
prototype_id
project_id
name
version
description
status
created_at
updated_at
```

---

# 80. PROTOTYPE VERSIONS

Logical table:

```text
prototype_versions
```

Fields:

```text
prototype_version_id
prototype_id
version_number
description
file_id
created_by
created_at
```

---

# 81. TESTING

Logical table:

```text
tests
```

Fields:

```text
test_id
project_id
prototype_id
test_type
title
description
expected_result
actual_result
status
test_date
conducted_by
created_at
```

---

# 82. TEST STATUS

```text
PLANNED
IN_PROGRESS
PASSED
FAILED
BLOCKED
RETEST_REQUIRED
```

---

# 83. TEST EVIDENCE

Logical table:

```text
test_evidence
```

Links tests to:

* Photos
* Videos
* Reports
* Measurements
* Documents

---

# 84. COMMUNITY VALIDATION

Logical table:

```text
validation_records
```

Fields:

```text
validation_id
project_id
validator_type
validator_id
validation_stage
result
comments
created_at
```

---

# 85. VALIDATOR TYPES

```text
COMMUNITY
FACULTY
INDUSTRY
GOVERNMENT
ADMIN
```

---

# 86. FEEDBACK

Logical table:

```text
feedback
```

Fields:

```text
feedback_id
project_id
user_id
feedback_type
rating
content
created_at
```

Feedback may also reference:

```text
problem
prototype
milestone
solution
```

A polymorphic design should be used carefully or replaced with explicit relationship tables depending on the final implementation.

---

# 87. FEEDBACK TYPES

```text
PROBLEM
PROJECT
PROTOTYPE
TEST
SOLUTION
COMMUNITY
COLLABORATION
GENERAL
```

---

# 88. IMPACT

Logical table:

```text
impact_records
```

Fields:

```text
impact_id
project_id
impact_category
description
value
unit
measurement_period
evidence_status
verified_by
created_at
```

---

# 89. IMPACT CATEGORIES

Examples:

```text
PEOPLE_BENEFITED
COST_SAVED
TIME_SAVED
ENVIRONMENTAL
EDUCATIONAL
HEALTHCARE
ACCESSIBILITY
RESOURCE_SAVINGS
ECONOMIC
SOCIAL
```

---

# 90. IMPACT EVIDENCE

Logical table:

```text
impact_evidence
```

Links measurable claims with supporting evidence.

Fields:

```text
impact_evidence_id
impact_id
file_id
description
uploaded_by
created_at
```

---

# 91. IMPACT VERIFICATION

Logical table:

```text
impact_verifications
```

Fields:

```text
verification_id
impact_id
verifier_id
decision
comments
verified_at
```

---

# 92. SOLUTION REPOSITORY

Logical table:

```text
solutions
```

A solution is the final reusable outcome of a project.

Fields:

```text
solution_id
project_id
problem_id
title
summary
description
solution_type
status
published_at
created_at
updated_at
```

---

# 93. SOLUTION TECHNOLOGIES

Logical table:

```text
solution_technologies
```

Links solutions to technologies.

---

# 94. SOLUTION SKILLS

Logical table:

```text
solution_skills
```

Links solutions to skills.

This supports future knowledge reuse.

---

# 95. SOLUTION RESOURCES

Logical table:

```text
solution_resources
```

May contain:

```text
Documentation
Source reference
Research paper
Prototype
Deployment guide
Testing report
Video
Images
```

---

# 96. SOLUTION DEPLOYMENT

Logical table:

```text
solution_deployments
```

Fields:

```text
deployment_id
solution_id
location_id
deployment_date
deployment_status
deployed_by
population_reached
notes
```

---

# 97. DEPLOYMENT STATUS

```text
PLANNED
PILOT
ACTIVE
SCALED
PAUSED
RETIRED
```

---

# 98. KNOWLEDGE REUSE

Logical table:

```text
solution_relationships
```

Possible relationships:

```text
SIMILAR_TO
ADAPTED_FROM
INSPIRED_BY
REUSED_FOR
```

This allows a previous solution to be connected to a new problem.

---

# 99. NOTIFICATIONS

Logical table:

```text
notifications
```

Fields:

```text
notification_id
recipient_user_id
notification_type
title
message
entity_type
entity_id
is_read
created_at
read_at
```

---

# 100. NOTIFICATION TYPES

Examples:

```text
PROBLEM_SUBMITTED
PROBLEM_APPROVED
PROBLEM_REJECTED
DUPLICATE_DETECTED
PROJECT_CREATED
TEAM_INVITATION
TASK_ASSIGNED
TASK_DUE
MILESTONE_DUE
MILESTONE_REVIEWED
COLLABORATION_REQUEST
COLLABORATION_APPROVED
FEEDBACK_REQUESTED
TEST_COMPLETED
SOLUTION_PUBLISHED
IMPACT_UPDATED
```

---

# 101. NOTIFICATION PREFERENCES

Logical table:

```text
notification_preferences
```

Allows users to configure:

```text
Email
In-app
Future Push
Future SMS
```

---

# 102. MODERATION

Logical table:

```text
moderation_records
```

Fields:

```text
moderation_id
entity_type
entity_id
reported_by
moderator_id
reason
decision
status
created_at
resolved_at
```

---

# 103. MODERATION STATUS

```text
REPORTED
UNDER_REVIEW
APPROVED
REJECTED
REMOVED
RESTORED
```

---

# 104. MODERATION REPORTS

Logical table:

```text
reports
```

Users can report:

* Problems
* Comments
* Projects
* Profiles
* Solutions

---

# 105. VERIFICATION

Logical table:

```text
verification_records
```

Supports verification of:

```text
University
Faculty
Student
Industry
Government
```

Fields:

```text
verification_id
entity_type
entity_id
submitted_by
document_file_id
status
reviewer_id
review_notes
submitted_at
reviewed_at
```

---

# 106. VERIFICATION STATUS

```text
PENDING
UNDER_REVIEW
VERIFIED
REJECTED
EXPIRED
SUSPENDED
```

---

# 107. AUDIT LOG

Logical table:

```text
audit_logs
```

Fields:

```text
audit_id
actor_user_id
action
entity_type
entity_id
old_value_reference
new_value_reference
ip_reference
user_agent_reference
created_at
```

Sensitive data should not be unnecessarily duplicated inside audit logs.

---

# 108. AUDIT ACTIONS

Examples:

```text
USER_CREATED
ROLE_ASSIGNED
ROLE_REMOVED
PROBLEM_CREATED
PROBLEM_UPDATED
PROBLEM_APPROVED
PROBLEM_REJECTED
PROJECT_CREATED
PROJECT_UPDATED
MILESTONE_APPROVED
COLLABORATION_APPROVED
SOLUTION_PUBLISHED
IMPACT_VERIFIED
```

---

# 109. LOCATION MODEL

Logical table:

```text
locations
```

May represent:

```text
Country
State
District
City
Locality
```

Location hierarchy should avoid unnecessary duplication.

---

# 110. LANGUAGE MODEL

Logical table:

```text
languages
```

Possible initial values:

```text
English
Tamil
```

Architecture should support additional Indian languages later.

---

# 111. CONTENT LANGUAGE

User-generated content should retain:

```text
original_language
translated_language
translation_status
```

Original content must not be overwritten by translation.

---

# 112. SEARCH INDEX REFERENCES

If an external search engine is used, database entities should remain the source of truth.

Conceptual:

```text
Database
   ↓
Search Index
```

Search indexes can be rebuilt from primary data.

---

# 113. EMBEDDING REFERENCES

Logical table:

```text
entity_embeddings
```

Fields:

```text
embedding_id
entity_type
entity_id
model_name
model_version
vector_reference
created_at
updated_at
```

Actual vector storage may exist outside the relational database.

---

# 114. AI JOBS

Logical table:

```text
ai_jobs
```

Fields:

```text
ai_job_id
job_type
entity_type
entity_id
status
attempt_count
requested_at
started_at
completed_at
error_reference
```

---

# 115. AI JOB RETRIES

AI processing must support safe retry behavior.

Example:

```text
QUEUED
 ↓
PROCESSING
 ↓
FAILED
 ↓
RETRYING
 ↓
PROCESSING
 ↓
COMPLETED
```

---

# 116. ANALYTICS EVENTS

Logical table:

```text
analytics_events
```

Possible events:

```text
USER_REGISTERED
PROBLEM_SUBMITTED
PROBLEM_VIEWED
PROBLEM_SUPPORTED
PROJECT_JOINED
TASK_COMPLETED
MILESTONE_COMPLETED
COLLABORATION_STARTED
SOLUTION_VIEWED
SOLUTION_DEPLOYED
```

Privacy requirements apply.

---

# 117. DASHBOARD METRICS

Dashboard statistics should generally be derived from authoritative operational data.

Examples:

```text
Total Problems
Active Problems
High Priority Problems
Projects
Active Projects
Completed Projects
Institutions
Industry Partners
Students
Faculty
People Impacted
Solutions Deployed
```

---

# 118. DENORMALIZED ANALYTICS

For performance, selected analytics may be stored in aggregated tables or caches.

However:

```text
Operational Database = Source of Truth
Analytics Store = Derived Data
```

---

# 119. GOVERNMENT ANALYTICS DATA

Government dashboards may use aggregated records such as:

```text
Regional Problem Counts
Category Distribution
Priority Trends
Project Progress
Institution Participation
Industry Participation
Implementation Rate
Impact Metrics
```

Access must respect authorization.

---

# 120. ADMIN ANALYTICS DATA

Administrators may view:

```text
User Growth
Problem Growth
AI Processing
Moderation
Project Activity
System Errors
Collaboration
Impact
```

---

# 121. RELATIONSHIP OVERVIEW

```text
USER
 |
 +---- ROLES
 |
 +---- PROFILE
 |
 +---- SKILLS
 |
 +---- TECHNOLOGIES
 |
 +---- PROBLEMS
 |
 +---- PROJECT MEMBERSHIP
 |
 +---- COMMENTS
 |
 +---- SUPPORT
 |
 +---- FEEDBACK
 |
 +---- NOTIFICATIONS
 |
 +---- AUDIT


UNIVERSITY
 |
 +---- DEPARTMENTS
 |       |
 |       +---- FACULTY
 |       |
 |       +---- STUDENTS
 |
 +---- FACILITIES
 |
 +---- EXPERTISE


PROBLEM
 |
 +---- CATEGORY
 +---- LOCATION
 +---- EVIDENCE
 +---- SUPPORT
 +---- COMMENTS
 +---- AI ANALYSIS
 +---- SKILLS
 +---- TECHNOLOGIES
 +---- MATCHING
 +---- PROJECT


PROJECT
 |
 +---- TEAM
 |      |
 |      +---- MEMBERS
 |
 +---- OBJECTIVES
 +---- TASKS
 +---- MILESTONES
 +---- RISKS
 +---- UPDATES
 +---- COLLABORATIONS
 +---- PROTOTYPES
 +---- TESTS
 +---- VALIDATION
 +---- FEEDBACK
 +---- IMPACT
 +---- SOLUTION
```

---

# 122. CORE RELATIONSHIP MODEL

```text
USER
 |
 +--------------------+
 |                    |
 v                    v
PROBLEM             PROFILE
 |
 +---- AI ANALYSIS
 |
 +---- MATCHING
 |
 v
PROJECT
 |
 +---- TEAM
 |      |
 |      +---- STUDENTS
 |      +---- FACULTY
 |      +---- INDUSTRY
 |
 +---- TASKS
 +---- MILESTONES
 +---- COLLABORATION
 +---- PROTOTYPE
 +---- TESTS
 +---- VALIDATION
 +---- IMPACT
 |
 v
SOLUTION
```

---

# 123. CARDINALITY SUMMARY

| Relationship             | Cardinality             |
| ------------------------ | ----------------------- |
| User → Roles             | Many-to-many            |
| University → Departments | One-to-many             |
| Department → Students    | One-to-many             |
| Department → Faculty     | One-to-many             |
| Problem → Evidence       | One-to-many             |
| Problem → Comments       | One-to-many             |
| Problem → Support        | One-to-many             |
| Problem → AI Analyses    | One-to-many             |
| Problem → Skills         | Many-to-many            |
| Problem → Technologies   | Many-to-many            |
| Problem → Projects       | Usually one-to-zero/one |
| Project → Members        | One-to-many             |
| Project → Tasks          | One-to-many             |
| Project → Milestones     | One-to-many             |
| Project → Collaborations | One-to-many             |
| Project → Tests          | One-to-many             |
| Project → Feedback       | One-to-many             |
| Project → Impact         | One-to-many             |
| Project → Solution       | One-to-zero/one         |
| Solution → Technologies  | Many-to-many            |
| User → Notifications     | One-to-many             |
| User → Skills            | Many-to-many            |

---

# 124. REFERENTIAL INTEGRITY

Foreign keys must prevent invalid relationships.

Example:

```text
project.problem_id
```

must reference an existing problem.

Deleting a parent record must not accidentally destroy important historical data.

Soft deletion should be considered for major entities.

---

# 125. SOFT DELETE

For important entities, consider:

```text
deleted_at
deleted_by
deletion_reason
```

Instead of immediately physically deleting records.

Examples:

```text
Users
Problems
Projects
Solutions
Comments
```

Exact policy will depend on privacy and legal requirements.

---

# 126. STATUS HISTORY

Important lifecycle entities should maintain status history.

Recommended:

```text
problems
projects
collaborations
milestones
tasks
solutions
verifications
```

---

# 127. CREATED / UPDATED METADATA

Major tables should generally include:

```text
created_at
updated_at
```

Where appropriate:

```text
created_by
updated_by
```

---

# 128. INDEXING STRATEGY

Indexes should be created for frequent lookups.

Likely candidates:

```text
users.email
users.account_status
problems.status
problems.category_id
problems.created_at
problems.priority_level
projects.status
projects.created_at
project_members.user_id
tasks.assigned_to
tasks.status
milestones.project_id
notifications.recipient_user_id
notifications.is_read
```

Exact indexes will be finalized after query design.

---

# 129. UNIQUE CONSTRAINTS

Potential unique constraints:

```text
users.email
university short identifiers where applicable
department code within university
role names
category names where applicable
```

Many-to-many relationship tables may use composite uniqueness.

Example:

```text
user_id + skill_id
```

---

# 130. DATA VALIDATION

Database constraints should protect against:

* Null required values
* Invalid status
* Invalid foreign keys
* Duplicate relationships
* Invalid numeric ranges
* Invalid dates

Application-level validation should complement database constraints.

---

# 131. DATE AND TIME

All timestamps should use a consistent timezone strategy.

Prefer storing timestamps in a standardized format and converting for display.

---

# 132. PRIVACY CLASSIFICATION

Data can be classified as:

```text
PUBLIC
INTERNAL
RESTRICTED
SENSITIVE
```

Examples:

### Public

Published problems and solutions.

### Internal

Institutional project information.

### Restricted

Government or industry collaboration information.

### Sensitive

Authentication and personal information.

---

# 133. DATA VISIBILITY MODEL

Data visibility must be determined by:

```text
User
+
Role
+
Resource ownership
+
Institution
+
Project membership
+
Collaboration membership
+
Explicit permissions
```

---

# 134. TENANCY / INSTITUTIONAL ISOLATION

Institutional data should support controlled boundaries.

For example:

```text
University A
   |
   +---- Department
   +---- Faculty
   +---- Students
   +---- Projects

University B
   |
   +---- Department
   +---- Faculty
   +---- Students
```

Cross-institution access occurs only where platform rules allow it.

---

# 135. GOVERNMENT JURISDICTION

Government access may be scoped by:

```text
Country
State
District
Department
Program
```

Exact policy will be finalized later.

---

# 136. COMMUNITY PRIVACY

Community activity should avoid exposing unnecessary personal information.

Public views should generally use:

```text
Display Name
Profile Role
General Location
```

rather than sensitive identity information.

---

# 137. DATA RETENTION

Retention periods must eventually be defined for:

* User accounts
* Problems
* Audit records
* AI logs
* Files
* Notifications
* Analytics events

Retention policy must comply with applicable requirements.

---

# 138. BACKUP REQUIREMENTS

Backup should cover:

```text
Relational Database
File Metadata
Object Storage
Important Configuration
```

Vector/search indexes should be recoverable from authoritative data where possible.

---

# 139. DISASTER RECOVERY

Recovery planning should define:

```text
Backup Frequency
Recovery Point Objective
Recovery Time Objective
Restore Procedure
Data Integrity Verification
```

Exact production values will be determined later.

---

# 140. TRANSACTION BOUNDARIES

Operations that must remain consistent should be transactional.

Example:

```text
Create Project
+
Create Initial Team
+
Add Creator
```

Either all required records succeed or the operation is safely rolled back.

---

# 141. CONCURRENCY

The system should protect against race conditions.

Examples:

```text
Two users joining final team slot
Two moderators changing status
Duplicate support submission
Multiple AI jobs for same problem
```

---

# 142. DATA CONSISTENCY

Authoritative relationships should be stored in the relational database.

AI, search, analytics and caches are derived systems.

```text
RELATIONAL DATABASE
       ↓
Source of Truth
       ↓
AI / Search / Analytics / Cache
```

---

# 143. AI TRACEABILITY

Every AI-generated result should ideally be traceable to:

```text
Input Entity
Model
Model Version
Timestamp
Analysis Type
Result
Confidence
Human Review
```

---

# 144. AI MODEL VERSIONING

AI records should preserve model version.

Example:

```text
model_name
model_version
prompt_version where applicable
embedding_model
```

This allows future comparison between models.

---

# 145. EMBEDDING VERSIONING

If embeddings change:

```text
Old Embedding
New Embedding
```

should not cause silent corruption.

Store model/version metadata.

---

# 146. MATCHING TRACEABILITY

A recommendation should be explainable through stored factors.

Example:

```text
Match Score: 92%

Skill Match: 95
Technology Match: 90
Domain Match: 94
Location Match: 85
Availability: 92
```

Exact scoring formula is not fixed in V0.3.

---

# 147. PROJECT PROGRESS DATA

Project progress may be derived from:

```text
Tasks
Milestones
Deliverables
```

A cached progress percentage may be stored for performance, but authoritative completion data must remain available.

---

# 148. IMPACT DATA INTEGRITY

Impact values should support:

```text
Value
Unit
Measurement Period
Evidence
Verifier
Verification Status
```

This reduces unsupported impact claims.

---

# 149. SOLUTION REUSE FLOW

```text
New Problem
    ↓
Similarity Search
    ↓
Existing Solutions
    ↓
Related Solution
    ↓
Recommendation
    ↓
Reuse / Adapt / New Project
```

Database relationships must support this.

---

# 150. END-TO-END DATABASE FLOW

```text
USER
 ↓
PROBLEM
 ↓
PROBLEM EVIDENCE
 ↓
AI ANALYSIS
 ↓
SIMILARITY
 ↓
SKILLS
 ↓
PRIORITY
 ↓
MATCHING
 ↓
UNIVERSITY
 ↓
FACULTY / STUDENT
 ↓
PROJECT
 ↓
TEAM
 ↓
TASKS
 ↓
MILESTONES
 ↓
INDUSTRY COLLABORATION
 ↓
PROTOTYPE
 ↓
TESTING
 ↓
COMMUNITY VALIDATION
 ↓
GOVERNMENT REVIEW
 ↓
DEPLOYMENT
 ↓
IMPACT
 ↓
SOLUTION
 ↓
KNOWLEDGE REUSE
```

---

# 151. ER-LEVEL OVERVIEW

```text
                           USERS
                             |
          +------------------+------------------+
          |                  |                  |
          v                  v                  v
       ROLES             PROFILES           USER SKILLS
          |                  |                  |
          |                  +------------------+
          |
          v
       ACCESS

UNIVERSITY
    |
    +---- DEPARTMENT
            |
            +---- STUDENT
            |
            +---- FACULTY

INDUSTRY
    |
    +---- EXPERTISE
    +---- RESOURCES

PROBLEM
    |
    +---- CATEGORY
    +---- LOCATION
    +---- EVIDENCE
    +---- COMMENTS
    +---- SUPPORT
    +---- AI ANALYSIS
    +---- SIMILARITY
    +---- SKILLS
    +---- TECHNOLOGIES
    +---- MATCHING
    |
    v
PROJECT
    |
    +---- TEAM
    +---- MEMBERS
    +---- OBJECTIVES
    +---- TASKS
    +---- MILESTONES
    +---- RISKS
    +---- UPDATES
    +---- COLLABORATIONS
    +---- PROTOTYPES
    +---- TESTS
    +---- VALIDATION
    +---- FEEDBACK
    +---- IMPACT
    |
    v
SOLUTION
    |
    +---- TECHNOLOGIES
    +---- SKILLS
    +---- RESOURCES
    +---- DEPLOYMENTS
    +---- RELATIONSHIPS
```

---

# 152. DATABASE SECURITY REQUIREMENTS

The database must enforce:

* Least privilege
* Restricted administrative access
* Secure credentials
* Encryption in transit
* Encryption at rest where supported
* Backups
* Audit logging
* Controlled access
* Parameterized queries through application layer

---

# 153. DATABASE PERFORMANCE REQUIREMENTS

The database should support:

* Indexed lookups
* Pagination
* Efficient joins
* Aggregation strategies
* Query optimization
* Connection pooling
* Caching where appropriate

Large datasets must not be loaded unnecessarily.

---

# 154. PAGINATION

List APIs should use pagination.

Examples:

```text
Problems
Projects
Comments
Notifications
Tasks
Solutions
```

This prevents large result sets from slowing the application.

---

# 155. SEARCH PERFORMANCE

Search-heavy operations should not depend exclusively on expensive relational queries.

Possible architecture:

```text
Relational DB
      ↓
Search Index
      ↓
Keyword / Semantic Search
```

---

# 156. VECTOR SEARCH PERFORMANCE

Vector search should be optimized for:

```text
Problem similarity
Solution similarity
Skill matching
Technology matching
```

Only relevant candidates should be returned to the matching layer.

---

# 157. DATA MIGRATION

Future schema changes must use controlled migrations.

Do not manually modify production database structures without migration tracking.

---

# 158. SEED DATA

Development environments may require seed data for:

```text
Roles
Categories
Languages
Statuses
Sample institutions
Sample skills
Sample technologies
```

Seed data must remain separate from production user data.

---

# 159. TEST DATA

Test environments must use synthetic or approved test data.

Real sensitive user data should not be copied into development environments unnecessarily.

---

# 160. DATABASE ENVIRONMENTS

Conceptually:

```text
Development DB
      ↓
Testing DB
      ↓
Staging DB
      ↓
Production DB
```

Each environment should have appropriate access controls.

---

# 161. FUTURE EXTENSIONS

The schema should remain extensible for:

```text
Mobile applications
Voice submissions
Advanced multilingual AI
Government integrations
Institution APIs
Industry APIs
External datasets
Open data
Advanced recommendation systems
Predictive analytics
Blockchain-based verification if ever justified
```

Future features must not compromise the core relational model.

---

# 162. DATABASE DESIGN STATUS

**Version:** V0.3

**Status:** Logical database specification

**Actual database:** Not created

**SQL schema:** Not created

**Backend implementation:** Not started

**Migration files:** Not created

**Indexes:** Conceptually defined; implementation pending

---

# 163. NEXT DOCUMENT

The next architecture artifact should be:

## API_SPECIFICATION.md — V0.4

It will define:

* API conventions
* Authentication APIs
* User APIs
* Problem APIs
* AI APIs
* Matching APIs
* University APIs
* Student APIs
* Faculty APIs
* Industry APIs
* Project APIs
* Team APIs
* Task APIs
* Milestone APIs
* Collaboration APIs
* Notification APIs
* Testing APIs
* Validation APIs
* Impact APIs
* Solution APIs
* Search APIs
* Analytics APIs
* Admin APIs
* File APIs
* Error responses
* Pagination
* Filtering
* Authorization
* Rate limiting

---

# END OF DATABASE DESIGN V0.3
