# SIH_26 — API DESIGN

**Version:** V0.1  
**Status:** Professional API Specification  
**Project:** SIH_26  
**Problem Statement:** SIH 26043

---

# 1. PURPOSE

This document defines the API contract for the SIH_26 platform.

The API layer connects:

```text
Web / Mobile Frontend
        |
        v
     API Layer
        |
   +----+----+
   |         |
   v         v
Backend     AI Services
   |
   v
Database / Storage / Search
```

The API must support the complete platform lifecycle:

```text
Citizen Problem Submission
        ↓
AI Analysis
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
Student / Faculty Participation
        ↓
Team Formation
        ↓
Industry / Startup Collaboration
        ↓
Project Development
        ↓
Tasks / Milestones
        ↓
Prototype
        ↓
Testing
        ↓
Community Validation
        ↓
Government Review
        ↓
Deployment
        ↓
Impact Measurement
        ↓
Solution Repository
```

---

# 2. API DESIGN PRINCIPLES

The API must follow:

1. RESTful design
2. Clear resource naming
3. Consistent HTTP methods
4. Versioning
5. Authentication
6. Authorization
7. Role-based access control
8. Input validation
9. Output validation
10. Pagination
11. Filtering
12. Sorting
13. Search
14. Rate limiting
15. Error consistency
16. Auditability
17. Idempotency where required
18. Secure file handling
19. Privacy protection
20. AI traceability
21. Backward compatibility
22. Scalability
23. Observability
24. Reliable asynchronous processing

---

# 3. API BASE URL

Production:

```text
https://api.<platform-domain>/api/v1
```

Development:

```text
http://localhost:<port>/api/v1
```

The actual production domain will be configured later.

---

# 4. API VERSIONING

Initial API version:

```text
/v1
```

Example:

```text
/api/v1/problems
```

Breaking changes must use a new major API version.

Example:

```text
/api/v2/problems
```

---

# 5. HTTP METHODS

| Method | Purpose                             |
| ------ | ----------------------------------- |
| GET    | Retrieve resource                   |
| POST   | Create resource / trigger operation |
| PUT    | Replace resource                    |
| PATCH  | Partially update resource           |
| DELETE | Remove/deactivate resource          |

---

# 6. STANDARD RESPONSE FORMAT

Successful response:

```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully",
  "meta": {}
}
```

Failed response:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  },
  "request_id": "request-id"
}
```

---

# 7. PAGINATION

List APIs should support:

```text
?page=1&page_size=20
```

Example:

```text
GET /api/v1/problems?page=1&page_size=20
```

Response metadata:

```json
{
  "page": 1,
  "page_size": 20,
  "total_items": 100,
  "total_pages": 5
}
```

---

# 8. FILTERING

Example:

```text
GET /api/v1/problems?category=healthcare&status=approved
```

Possible filters:

```text
category
subcategory
location
priority
status
created_date
updated_date
organization
skill
technology
```

---

# 9. SORTING

Example:

```text
GET /api/v1/problems?sort=-priority_score
```

Possible sorting:

```text
priority
created_at
updated_at
support_count
impact
```

---

# 10. SEARCH

General search:

```text
GET /api/v1/search?q=water+wastage
```

Search may cover:

```text
Problems
Projects
Solutions
Universities
Students
Faculty
Industry
Startups
Skills
Technologies
```

---

# 11. AUTHENTICATION

Authentication endpoints:

```text
POST /auth/register
POST /auth/login
POST /auth/logout
POST /auth/refresh
POST /auth/forgot-password
POST /auth/reset-password
POST /auth/verify-email
POST /auth/verify-phone
```

---

# 12. REGISTER

```text
POST /api/v1/auth/register
```

Request:

```json
{
  "email": "user@example.com",
  "password": "secure-password",
  "role": "student"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "user_id": "USER_ID",
    "verification_required": true
  }
}
```

---

# 13. LOGIN

```text
POST /api/v1/auth/login
```

Request:

```json
{
  "email": "user@example.com",
  "password": "secure-password"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "access_token": "ACCESS_TOKEN",
    "refresh_token": "REFRESH_TOKEN",
    "expires_in": 3600
  }
}
```

Tokens must never be exposed in logs.

---

# 14. CURRENT USER

```text
GET /api/v1/auth/me
```

Returns:

* User identity
* Roles
* Profile
* Permissions
* Verification status

---

# 15. PROFILE APIs

```text
GET /api/v1/users/me
PATCH /api/v1/users/me
GET /api/v1/users/{user_id}
```

Profile-specific APIs:

```text
GET /api/v1/users/me/skills
POST /api/v1/users/me/skills
DELETE /api/v1/users/me/skills/{skill_id}

GET /api/v1/users/me/technologies
POST /api/v1/users/me/technologies
```

---

# 16. ROLE AND PERMISSION APIs

```text
GET /api/v1/roles
GET /api/v1/permissions
GET /api/v1/users/me/permissions
```

Only authorized administrators may modify role assignments.

---

# 17. CITIZEN / COMMUNITY APIs

Citizen/community users can:

* Submit problems
* View approved problems
* Support problems
* Comment
* Provide evidence
* Participate in validation
* Provide feedback
* Track submitted problems

Endpoints:

```text
POST /api/v1/problems
GET /api/v1/problems
GET /api/v1/problems/{problem_id}
PATCH /api/v1/problems/{problem_id}
POST /api/v1/problems/{problem_id}/support
DELETE /api/v1/problems/{problem_id}/support
POST /api/v1/problems/{problem_id}/comments
GET /api/v1/problems/{problem_id}/comments
POST /api/v1/problems/{problem_id}/evidence
```

---

# 18. PROBLEM CREATION

```text
POST /api/v1/problems
```

Request:

```json
{
  "title": "Example societal problem",
  "description": "Detailed description",
  "category_id": "CATEGORY_ID",
  "location": {
    "state": "Tamil Nadu",
    "district": "Example",
    "city": "Example"
  },
  "language": "en"
}
```

The system must validate:

* Title
* Description
* Category
* Location
* User authorization
* Malicious input
* Required fields

---

# 19. PROBLEM RETRIEVAL

```text
GET /api/v1/problems/{problem_id}
```

Depending on permissions, response may include:

* Problem details
* Category
* Location
* Priority
* AI classification
* Required skills
* Required technologies
* Similar problems
* Support count
* Project status
* Validation status

Sensitive information must be excluded from unauthorized users.

---

# 20. PROBLEM UPDATE

```text
PATCH /api/v1/problems/{problem_id}
```

Only permitted users may modify a problem.

Every important modification must be auditable.

---

# 21. PROBLEM MODERATION

```text
POST /api/v1/problems/{problem_id}/moderate
GET /api/v1/moderation/problems
```

Moderation decisions:

```text
APPROVE
REJECT
REQUEST_CHANGES
MARK_DUPLICATE
ESCALATE
```

---

# 22. PROBLEM STATUS

```text
GET /api/v1/problems/{problem_id}/status
GET /api/v1/problems/{problem_id}/status-history
```

---

# 23. PROBLEM SUPPORT

```text
POST /api/v1/problems/{problem_id}/support
DELETE /api/v1/problems/{problem_id}/support
GET /api/v1/problems/{problem_id}/support
```

---

# 24. PROBLEM COMMENTS

```text
GET /api/v1/problems/{problem_id}/comments
POST /api/v1/problems/{problem_id}/comments
PATCH /api/v1/comments/{comment_id}
DELETE /api/v1/comments/{comment_id}
```

Threaded comments may use:

```text
parent_comment_id
```

---

# 25. EVIDENCE / FILE APIs

```text
POST /api/v1/files/upload
GET /api/v1/files/{file_id}
DELETE /api/v1/files/{file_id}
```

Supported conceptual file types:

```text
IMAGE
VIDEO
PDF
DOCUMENT
SPREADSHEET
DATASET
OTHER
```

File validation must include:

* File size
* MIME type
* Extension
* Malware scanning
* Authorization
* Storage permissions

---

# 26. AI ANALYSIS APIs

AI operations may be asynchronous.

```text
POST /api/v1/ai/analyze/problem/{problem_id}
GET /api/v1/ai/analyses/{analysis_id}
GET /api/v1/problems/{problem_id}/ai-analysis
```

---

# 27. AI CLASSIFICATION

```text
POST /api/v1/ai/classify/problem/{problem_id}
```

Output may include:

```json
{
  "category": "ENVIRONMENT",
  "subcategory": "WASTE_MANAGEMENT",
  "confidence": 0.94
}
```

AI classification must be traceable to:

```text
model_identifier
model_version
analysis_id
timestamp
confidence
```

---

# 28. AI PRIORITIZATION

```text
POST /api/v1/ai/prioritize/problem/{problem_id}
```

Possible factors:

```text
social_impact
urgency
population_affected
severity
feasibility
geographic_scope
community_support
```

The system must store both:

```text
priority_score
priority_reason
```

---

# 29. AI DUPLICATE DETECTION

```text
POST /api/v1/ai/duplicates/problem/{problem_id}
GET /api/v1/problems/{problem_id}/duplicates
```

Response may contain:

```json
{
  "matches": [
    {
      "problem_id": "P123",
      "similarity_score": 0.91,
      "type": "LIKELY_DUPLICATE"
    }
  ]
}
```

---

# 30. AI SKILL EXTRACTION

```text
POST /api/v1/ai/skills/problem/{problem_id}
GET /api/v1/problems/{problem_id}/required-skills
```

Output:

```json
{
  "skills": [
    {
      "skill_id": "SKILL_001",
      "importance": 0.92,
      "confidence": 0.95
    }
  ]
}
```

---

# 31. AI SUMMARIZATION

```text
POST /api/v1/ai/summarize/problem/{problem_id}
```

Generated summaries must not replace the original user-submitted problem.

---

# 32. AI TRANSLATION

```text
POST /api/v1/ai/translate/problem/{problem_id}
```

Supported languages will be configurable.

The original content must always remain preserved.

---

# 33. AI JOB STATUS

```text
GET /api/v1/ai/jobs/{job_id}
```

Possible states:

```text
QUEUED
PROCESSING
COMPLETED
FAILED
RETRYING
REVIEW_REQUIRED
```

---

# 34. AI HUMAN REVIEW

```text
POST /api/v1/ai/analyses/{analysis_id}/review
```

Possible decisions:

```text
ACCEPT
MODIFY
REJECT
```

---

# 35. UNIVERSITY APIs

```text
GET /api/v1/universities
GET /api/v1/universities/{university_id}
GET /api/v1/universities/{university_id}/departments
GET /api/v1/universities/{university_id}/expertise
GET /api/v1/universities/{university_id}/facilities
```

---

# 36. UNIVERSITY MATCHING

```text
POST /api/v1/matching/problems/{problem_id}/universities
GET /api/v1/problems/{problem_id}/matched-universities
```

Matching factors may include:

```text
skills
technologies
domain
research
facilities
location
faculty expertise
student capabilities
previous projects
```

---

# 37. STUDENT APIs

```text
GET /api/v1/students/me
PATCH /api/v1/students/me
GET /api/v1/students/me/projects
GET /api/v1/students/me/tasks
GET /api/v1/students/me/recommendations
```

Students may:

* Maintain profiles
* Add skills
* Discover problems
* Apply to projects
* Join teams
* Complete tasks
* Update progress
* Upload work
* Participate in testing
* Participate in validation

---

# 38. FACULTY APIs

```text
GET /api/v1/faculty/me
PATCH /api/v1/faculty/me
GET /api/v1/faculty/me/projects
GET /api/v1/faculty/me/students
GET /api/v1/faculty/me/recommendations
```

Faculty may:

* Mentor projects
* Review progress
* Guide students
* Verify milestones
* Provide expertise
* Review prototypes

---

# 39. INDUSTRY / STARTUP APIs

```text
GET /api/v1/organizations
GET /api/v1/organizations/{organization_id}
GET /api/v1/organizations/{organization_id}/expertise
GET /api/v1/organizations/{organization_id}/resources
```

---

# 40. INDUSTRY COLLABORATION

```text
POST /api/v1/projects/{project_id}/industry-invitations
GET /api/v1/projects/{project_id}/industry-collaborators
POST /api/v1/projects/{project_id}/collaborators
DELETE /api/v1/projects/{project_id}/collaborators/{user_id}
```

Industry/startup participation may include:

```text
Mentorship
Funding
Technology
Equipment
Testing
Data
Infrastructure
Professional expertise
```

---

# 41. GOVERNMENT APIs

Government users require controlled access.

```text
GET /api/v1/government/dashboard
GET /api/v1/government/problems
GET /api/v1/government/projects
GET /api/v1/government/solutions
GET /api/v1/government/impact
```

Government users may:

* Review societal problems
* Monitor projects
* Validate outcomes
* Review solutions
* Monitor impact
* Support deployment
* Access authorized analytics

---

# 42. PROJECT APIs

```text
POST /api/v1/projects
GET /api/v1/projects
GET /api/v1/projects/{project_id}
PATCH /api/v1/projects/{project_id}
DELETE /api/v1/projects/{project_id}
```

---

# 43. CREATE PROJECT

```text
POST /api/v1/projects
```

Request:

```json
{
  "problem_id": "PROBLEM_ID",
  "title": "Project title",
  "description": "Project description",
  "objectives": []
}
```

The system must verify that the user has permission to create the project.

---

# 44. PROJECT MEMBERS

```text
GET /api/v1/projects/{project_id}/members
POST /api/v1/projects/{project_id}/members
DELETE /api/v1/projects/{project_id}/members/{user_id}
```

---

# 45. TEAM APIs

```text
POST /api/v1/projects/{project_id}/teams
GET /api/v1/projects/{project_id}/teams
GET /api/v1/teams/{team_id}
PATCH /api/v1/teams/{team_id}
```

---

# 46. TEAM INVITATIONS

```text
POST /api/v1/teams/{team_id}/invitations
GET /api/v1/users/me/team-invitations
POST /api/v1/team-invitations/{invitation_id}/accept
POST /api/v1/team-invitations/{invitation_id}/reject
```

---

# 47. PROJECT APPLICATIONS

Users may apply to participate in suitable projects.

```text
POST /api/v1/projects/{project_id}/applications
GET /api/v1/projects/{project_id}/applications
GET /api/v1/users/me/project-applications
POST /api/v1/applications/{application_id}/accept
POST /api/v1/applications/{application_id}/reject
```

---

# 48. TASK APIs

```text
POST /api/v1/projects/{project_id}/tasks
GET /api/v1/projects/{project_id}/tasks
GET /api/v1/tasks/{task_id}
PATCH /api/v1/tasks/{task_id}
DELETE /api/v1/tasks/{task_id}
```

---

# 49. TASK ASSIGNMENT

```text
POST /api/v1/tasks/{task_id}/assign
```

Only authorized project members may assign tasks.

---

# 50. TASK PROGRESS

```text
PATCH /api/v1/tasks/{task_id}/status
POST /api/v1/tasks/{task_id}/comments
POST /api/v1/tasks/{task_id}/attachments
```

---

# 51. MILESTONE APIs

```text
POST /api/v1/projects/{project_id}/milestones
GET /api/v1/projects/{project_id}/milestones
GET /api/v1/milestones/{milestone_id}
PATCH /api/v1/milestones/{milestone_id}
```

---

# 52. MILESTONE VERIFICATION

```text
POST /api/v1/milestones/{milestone_id}/submit
POST /api/v1/milestones/{milestone_id}/review
POST /api/v1/milestones/{milestone_id}/approve
POST /api/v1/milestones/{milestone_id}/reject
```

---

# 53. PROGRESS TRACKING

```text
GET /api/v1/projects/{project_id}/progress
POST /api/v1/projects/{project_id}/progress-updates
GET /api/v1/projects/{project_id}/timeline
```

Progress may include:

```text
percentage
completed_tasks
completed_milestones
blocked_tasks
risk_level
latest_update
```

---

# 54. PROTOTYPE APIs

```text
POST /api/v1/projects/{project_id}/prototypes
GET /api/v1/projects/{project_id}/prototypes
GET /api/v1/prototypes/{prototype_id}
PATCH /api/v1/prototypes/{prototype_id}
```

Prototype records may include:

```text
description
version
status
repository_reference
documentation
files
demo_reference
```

---

# 55. TESTING APIs

```text
POST /api/v1/projects/{project_id}/tests
GET /api/v1/projects/{project_id}/tests
GET /api/v1/tests/{test_id}
PATCH /api/v1/tests/{test_id}
```

Testing may include:

```text
functional
performance
safety
usability
field
environmental
hardware
software
```

---

# 56. TEST RESULTS

```text
POST /api/v1/tests/{test_id}/results
GET /api/v1/tests/{test_id}/results
```

Results may include:

```text
test_case
expected_result
actual_result
pass_fail
measurements
evidence
reviewer
```

---

# 57. COMMUNITY VALIDATION

```text
POST /api/v1/projects/{project_id}/validation
GET /api/v1/projects/{project_id}/validation
POST /api/v1/validation/{validation_id}/feedback
```

Community validation may evaluate:

```text
usefulness
usability
impact
accessibility
practicality
acceptance
```

---

# 58. FEEDBACK APIs

```text
POST /api/v1/feedback
GET /api/v1/feedback/{feedback_id}
PATCH /api/v1/feedback/{feedback_id}
```

Feedback can be linked to:

```text
Problem
Project
Prototype
Solution
Validation
```

---

# 59. SOLUTION APIs

```text
POST /api/v1/projects/{project_id}/solution
GET /api/v1/projects/{project_id}/solution
GET /api/v1/solutions
GET /api/v1/solutions/{solution_id}
PATCH /api/v1/solutions/{solution_id}
```

---

# 60. SOLUTION REPOSITORY

The solution repository allows successful solutions to become reusable knowledge.

Search:

```text
GET /api/v1/solutions/search?q=
```

Filter by:

```text
domain
technology
location
impact
status
organization
```

---

# 61. IMPACT APIs

```text
POST /api/v1/projects/{project_id}/impact
GET /api/v1/projects/{project_id}/impact
PATCH /api/v1/impact/{impact_id}
```

Possible metrics:

```text
people_affected
cost_saved
time_saved
resources_saved
environmental_benefit
adoption_rate
satisfaction
geographic_reach
```

---

# 62. DASHBOARD APIs

## Citizen Dashboard

```text
GET /api/v1/dashboard/citizen
```

May return:

* Submitted problems
* Supported problems
* Problem status
* Validation participation
* Notifications

---

## Student Dashboard

```text
GET /api/v1/dashboard/student
```

May return:

* Recommended problems
* Projects
* Tasks
* Milestones
* Team
* Skills
* Progress
* Notifications

---

## Faculty Dashboard

```text
GET /api/v1/dashboard/faculty
```

May return:

* Guided projects
* Student teams
* Milestones
* Reviews
* Recommendations
* Project health

---

## University Dashboard

```text
GET /api/v1/dashboard/university
```

May return:

* Problems matched
* Active projects
* Students involved
* Faculty involved
* Industry collaborations
* Research areas
* Impact

---

## Industry Dashboard

```text
GET /api/v1/dashboard/industry
```

May return:

* Recommended projects
* Collaborations
* Mentorship requests
* Resource contributions
* Active engagements

---

## Government Dashboard

```text
GET /api/v1/dashboard/government
```

May return:

* Societal problem statistics
* Priority problems
* Active projects
* Solutions
* Deployment status
* Impact analytics

---

## Admin Dashboard

```text
GET /api/v1/dashboard/admin
```

May return:

* Users
* Problems
* Projects
* Moderation queue
* AI jobs
* System health
* Reports
* Audit events

---

# 63. NOTIFICATION APIs

```text
GET /api/v1/notifications
GET /api/v1/notifications/unread-count
PATCH /api/v1/notifications/{notification_id}/read
POST /api/v1/notifications/mark-all-read
```

Notification types may include:

```text
PROBLEM_UPDATE
MATCH_FOUND
PROJECT_INVITATION
TEAM_INVITATION
TASK_ASSIGNED
TASK_DUE
MILESTONE_UPDATE
REVIEW_REQUIRED
FEEDBACK
SYSTEM
```

---

# 64. REAL-TIME EVENTS

Where required, real-time communication may use:

```text
WebSocket
Server-Sent Events
Push Notifications
```

Examples:

```text
new notification
task update
project update
team invitation
AI processing completion
```

---

# 65. SEARCH API

```text
GET /api/v1/search
```

Parameters:

```text
q
type
category
location
skill
technology
status
page
page_size
```

---

# 66. RECOMMENDATION APIs

```text
GET /api/v1/recommendations
GET /api/v1/users/me/recommendations
POST /api/v1/recommendations/{recommendation_id}/feedback
```

Recommendations may include:

```text
Problems
Projects
Teams
Universities
Industry partners
Skills
Solutions
```

---

# 67. MATCHING APIs

```text
POST /api/v1/matching/problems/{problem_id}
GET /api/v1/matching/problems/{problem_id}
POST /api/v1/matching/projects/{project_id}
GET /api/v1/matching/projects/{project_id}
```

---

# 68. ADMIN APIs

Admin APIs must be heavily protected.

Examples:

```text
GET /api/v1/admin/users
PATCH /api/v1/admin/users/{user_id}/status
GET /api/v1/admin/problems
GET /api/v1/admin/projects
GET /api/v1/admin/moderation
GET /api/v1/admin/audit-logs
GET /api/v1/admin/system-health
```

---

# 69. AUDIT LOG APIs

```text
GET /api/v1/admin/audit-logs
GET /api/v1/admin/audit-logs/{audit_id}
```

Important actions must be recorded.

Examples:

```text
login
logout
role_change
problem_create
problem_update
problem_delete
moderation
AI_review
project_create
member_add
member_remove
milestone_approve
solution_publish
admin_action
```

---

# 70. HEALTH CHECK APIs

```text
GET /health
GET /health/live
GET /health/ready
```

Health checks may verify:

```text
API
Database
Cache
AI services
Storage
Search
Message queue
```

---

# 71. ERROR CODES

Standard errors:

```text
AUTH_REQUIRED
INVALID_TOKEN
TOKEN_EXPIRED
FORBIDDEN
NOT_FOUND
VALIDATION_ERROR
DUPLICATE_RESOURCE
CONFLICT
RATE_LIMITED
FILE_TOO_LARGE
UNSUPPORTED_FILE
AI_SERVICE_ERROR
DATABASE_ERROR
INTERNAL_ERROR
SERVICE_UNAVAILABLE
```

---

# 72. HTTP STATUS CODES

| Status | Meaning                     |
| ------ | --------------------------- |
| 200    | Success                     |
| 201    | Created                     |
| 202    | Accepted / async processing |
| 204    | No content                  |
| 400    | Bad request                 |
| 401    | Unauthorized                |
| 403    | Forbidden                   |
| 404    | Not found                   |
| 409    | Conflict                    |
| 422    | Validation error            |
| 429    | Rate limited                |
| 500    | Internal server error       |
| 503    | Service unavailable         |

---

# 73. VALIDATION

All API inputs must be validated.

Validation must cover:

* Required fields
* Data type
* String length
* Enum values
* File type
* File size
* IDs
* Authorization
* Malicious input
* Business rules

Validation errors must return structured responses.

---

# 74. AUTHORIZATION

Authorization must be enforced at multiple levels:

```text
Authentication
     ↓
Role Authorization
     ↓
Resource Authorization
     ↓
Action Authorization
```

Example:

A student may update their own task progress but must not approve their own milestone if approval requires faculty authorization.

---

# 75. ROLE VISIBILITY

The API must enforce stakeholder-specific visibility.

```text
CITIZEN
   ↓
Public / permitted information

STUDENT
   ↓
Own profile + permitted project information

FACULTY
   ↓
Assigned academic/project information

UNIVERSITY
   ↓
Institution-level information

INDUSTRY
   ↓
Permitted collaboration information

GOVERNMENT
   ↓
Authorized oversight information

ADMIN
   ↓
System-level authorized information
```

---

# 76. PRIVACY

The API must avoid exposing:

* Password hashes
* Authentication tokens
* Private contact information
* Sensitive academic information
* Internal AI prompts
* Private documents
* Administrative secrets
* Unnecessary personal information

---

# 77. RATE LIMITING

Rate limits must protect:

```text
Login
Registration
Password reset
Problem submission
Comments
AI requests
Search
File upload
Public APIs
```

Different roles and endpoints may have different limits.

---

# 78. IDEMPOTENCY

Operations that may be retried must support idempotency where appropriate.

Example:

```text
POST /payments
```

if payments are added later.

For SIH_26, asynchronous AI jobs and important state-changing operations should avoid duplicate processing.

---

# 79. ASYNCHRONOUS OPERATIONS

Long-running operations should return:

```text
HTTP 202
```

Example:

```text
POST /api/v1/ai/analyze/problem/P123
```

Response:

```json
{
  "success": true,
  "data": {
    "job_id": "JOB123",
    "status": "QUEUED"
  }
}
```

Client then checks:

```text
GET /api/v1/ai/jobs/JOB123
```

---

# 80. API → AI SERVICE COMMUNICATION

Conceptual architecture:

```text
Frontend
   ↓
Backend API
   ↓
AI Orchestrator
   ↓
AI Service
   ↓
Result Validation
   ↓
Database
   ↓
Frontend
```

AI services must not directly expose internal credentials to the frontend.

---

# 81. API → DATABASE

Only the backend/service layer should directly access the database.

```text
Frontend
   ↓
API
   ↓
Service Layer
   ↓
Repository/Data Layer
   ↓
Database
```

The frontend must never connect directly to the production database.

---

# 82. API → FILE STORAGE

```text
Frontend
   ↓
Upload API
   ↓
Validation
   ↓
Malware Scan
   ↓
Object Storage
   ↓
File Metadata → Database
```

---

# 83. API → SEARCH

```text
Frontend
   ↓
Search API
   ↓
Search Service
   ↓
Search Index
   ↓
Results
```

The relational database remains the source of truth.

---

# 84. API → NOTIFICATION SERVICE

```text
Business Event
      ↓
Event / Queue
      ↓
Notification Service
      ↓
Email / Push / In-App
```

Notifications should not block critical API operations unnecessarily.

---

# 85. API SECURITY

The API must implement:

* HTTPS
* Secure authentication
* Token expiration
* Refresh-token protection
* RBAC
* Input validation
* Output filtering
* Rate limiting
* CORS policy
* CSRF protection where applicable
* Secure headers
* File scanning
* Logging
* Monitoring
* Secret management

---

# 86. CORS

Only approved frontend origins should be permitted in production.

Development origins may be configured separately.

Wildcard origins should not be used for authenticated production APIs unless explicitly justified.

---

# 87. API LOGGING

Logs should include:

```text
request_id
timestamp
endpoint
method
status
latency
authenticated_user_id
service
error_code
```

Logs must not contain:

```text
password
access_token
refresh_token
private secrets
sensitive personal information
```

---

# 88. REQUEST TRACEABILITY

Each request should have a unique:

```text
request_id
```

This ID should be propagated across services where possible.

---

# 89. API OBSERVABILITY

Monitor:

```text
request count
error rate
latency
database latency
AI latency
queue latency
file upload failures
authentication failures
rate-limit events
```

---

# 90. API DOCUMENTATION

The API should eventually expose machine-readable documentation using a standard specification such as:

```text
OpenAPI
```

Documentation should include:

* Endpoints
* Parameters
* Request schemas
* Response schemas
* Authentication
* Error codes
* Examples
* Authorization requirements

---

# 91. API TESTING

Before production, APIs must be tested for:

```text
Unit correctness
Integration
Authentication
Authorization
Validation
Error handling
Security
Performance
Load
Concurrency
File upload
AI integration
Database integration
```

---

# 92. API PERFORMANCE

The API should aim for:

* Low response latency
* Efficient database queries
* Pagination
* Caching where appropriate
* Asynchronous processing for expensive operations
* Connection pooling
* Efficient serialization

AI processing should not block normal requests unnecessarily.

---

# 93. CACHING

Potential cache targets:

```text
Categories
Skills
Technologies
Public problem lists
University metadata
Recommendation results
Dashboard summaries
```

Sensitive data must be handled carefully.

---

# 94. BACKGROUND JOBS

Background processing may handle:

```text
AI analysis
Duplicate detection
Embeddings
Notifications
Email
Search indexing
Analytics aggregation
File processing
Virus scanning
Recommendation generation
```

---

# 95. EVENT-DRIVEN OPERATIONS

Important events may include:

```text
PROBLEM_CREATED
PROBLEM_APPROVED
AI_ANALYSIS_COMPLETED
DUPLICATE_DETECTED
MATCH_CREATED
PROJECT_CREATED
TEAM_CREATED
TASK_ASSIGNED
MILESTONE_COMPLETED
PROTOTYPE_SUBMITTED
TEST_COMPLETED
VALIDATION_COMPLETED
SOLUTION_PUBLISHED
IMPACT_UPDATED
```

---

# 96. API WORKFLOW — PROBLEM SUBMISSION

```text
POST /problems
      ↓
Validate
      ↓
Store Problem
      ↓
Create AI Job
      ↓
Return 202 / success
      ↓
AI Classification
      ↓
AI Prioritization
      ↓
Duplicate Detection
      ↓
Skill Extraction
      ↓
Matching
      ↓
Notify Relevant Stakeholders
```

---

# 97. API WORKFLOW — INTELLIGENT UNIVERSITY MATCHING

```text
Problem Requirements (Skills, Domain, Urgency, Location)
   ↓
Capability Profiles (Depts, Research, Equipment, Experience)
   ↓
Practical Capacity Check (Unassigned Students, Mentor Hours, Workload)
   ↓
Multi-Factor Contextual Ranking Engine (16 Criteria Evaluated)
   ↓
Tie / Near-Tie Resolution & Capacity Penalties Applied
   ↓
Ranked Shortlist Generation (#1 Best Match, #2 Strong Alternative, #3 ...)
   ↓
Grounded Data-Verified Explanation Generation
   ↓
Human-in-the-Loop Review Trigger (If confidence < threshold or near-tie)
   ↓
Dynamic Re-Ranking Event (Triggered on capacity/workload updates)
```

Core Rule: **"Best Match ≠ Highest Single Skill Score."** The API returns a ranked shortlist containing overall match scores, relevant strengths, identified constraints, capacity factors, confidence levels, and data-grounded justifications.

---

# 98. API WORKFLOW — PROJECT CREATION

```text
Approved Problem
       ↓
University / Team Interest
       ↓
Project Creation
       ↓
Team Formation
       ↓
Faculty Mentor
       ↓
Industry Collaboration
       ↓
Milestones
       ↓
Tasks
```

---

# 99. API WORKFLOW — PROJECT COMPLETION

```text
Tasks Completed
      ↓
Milestones Completed
      ↓
Prototype
      ↓
Testing
      ↓
Community Validation
      ↓
Government / Authorized Review
      ↓
Solution
      ↓
Deployment
      ↓
Impact Measurement
      ↓
Solution Repository
```

---

# 100. API WORKFLOW — FAILURE HANDLING

If a downstream service fails:

```text
API Request
    ↓
Service Failure
    ↓
Retry if safe
    ↓
Queue if asynchronous
    ↓
Fallback if available
    ↓
Structured Error
    ↓
Monitoring / Alert
```

The API must never expose internal stack traces to clients.

---

# 101. API COMPATIBILITY

Changes should follow:

```text
Backward-compatible
        ↓
Deprecation period
        ↓
Migration notice
        ↓
New version
```

Breaking changes must not silently modify existing contracts.

---

# 102. DEPRECATION

Deprecated endpoints must provide:

```text
Deprecation notice
Replacement endpoint
Migration guidance
Sunset date
```

---

# 103. BULK OPERATIONS

Where necessary, administrators may require bulk APIs.

Examples:

```text
POST /api/v1/admin/problems/bulk-moderate
POST /api/v1/admin/users/bulk-update
```

Bulk operations must:

* Validate each record
* Respect authorization
* Provide partial-failure reporting
* Create audit logs

---

# 104. EXPORT APIs

Authorized users may export permitted data.

```text
POST /api/v1/exports
GET /api/v1/exports/{export_id}
```

Exports may be:

```text
CSV
JSON
PDF
```

Sensitive exports require additional authorization.

---

# 105. ANALYTICS APIs

```text
GET /api/v1/analytics/problems
GET /api/v1/analytics/projects
GET /api/v1/analytics/solutions
GET /api/v1/analytics/impact
```

Analytics responses should aggregate data without unnecessarily exposing individual private records.

---

# 106. CONFIGURATION APIs

Administrative configuration may include:

```text
Categories
Subcategories
Skills
Technologies
Notification settings
AI thresholds
Moderation rules
System settings
```

These endpoints must be admin-protected.

---

# 107. AI TRACEABILITY REQUIREMENT

Every AI-generated decision must be traceable to:

```text
Entity
Analysis ID
Model
Model Version
Timestamp
Input Reference
Output
Confidence
Review Status
Human Reviewer if applicable
```

AI-generated data must never silently overwrite the original human-provided information.

---

# 108. HUMAN-IN-THE-LOOP REQUIREMENT

AI recommendations are assistive.

Where required:

```text
AI Recommendation
       ↓
Human Review
       ↓
Accept / Modify / Reject
       ↓
Final Platform Decision
```

The API must preserve this distinction.

---

# 109. SECURITY INCIDENT HANDLING

Potential security events include:

```text
Repeated failed login
Suspicious API activity
Rate-limit abuse
Unauthorized access
Malicious file upload
Token misuse
Privilege escalation attempt
```

Such events should be logged and monitored.

---

# 110. DATA OWNERSHIP

The API must enforce ownership.

Examples:

A citizen may modify their own draft problem.

A student may modify their own profile.

A project member may update permitted project information.

A faculty mentor may review assigned projects.

An industry user may manage their permitted collaboration resources.

An administrator may perform system-level operations according to policy.

---

# 111. FINAL API ARCHITECTURE

```text
                        CLIENT APPLICATIONS
                 +-----------------------------+
                 |                             |
                 v                             v
             Web App                       Mobile App
                 |                             |
                 +-------------+---------------+
                               |
                               v
                         API GATEWAY
                               |
                         Authentication
                               |
                         Authorization
                               |
                         Rate Limiting
                               |
                               v
                       BACKEND SERVICES
                               |
        +----------+-----------+-----------+----------+
        |          |           |           |          |
        v          v           v           v          v
     Problems   Projects     Users       Matching    AI
        |          |           |           |          |
        +----------+-----------+-----------+----------+
                               |
                +--------------+--------------+
                |              |              |
                v              v              v
             Database      File Storage     Search
                |
                v
           Audit / Analytics
```

---

# 112. FINAL API RESOURCE MAP

```text
/auth
/users
/roles
/permissions

/problems
/comments
/files
/moderation

/ai
/ai/jobs
/ai/analyses
/ai/models (AI Model Registry & Version Tracking resource)

/skills
/technologies

/universities
/departments
/faculty
/students

/organizations (Primary public resource for Industry/Startup organizations, backed internally by industry_profiles)
/industry (Optional future compatibility alias)
/startups

/matching
/recommendations

/projects
/teams
/applications
/tasks
/milestones

/prototypes
/tests
/validation
/feedback

/solutions
/impact

/search
/notifications

/dashboard
/analytics
/exports

/admin
/audit-logs

/health
```

---

# 113. IMPLEMENTATION RULE

This document defines the API contract.

It does NOT authorize implementation yet.

Before API implementation begins, the team must verify consistency between:

```text
MASTER_BLUEPRINT.md
SYSTEM_ARCHITECTURE.md
DATABASE_DESIGN.md
API_DESIGN.md
```

Any contradiction must be resolved in the documentation before production implementation.

---

# 114. FUTURE EXTENSIBILITY

The API architecture should remain extensible for future capabilities such as:

```text
Mobile applications
Advanced AI agents
Multilingual expansion
Government integrations
University ERP integrations
Industry APIs
Open-data integrations
GIS services
IoT data
Advanced analytics
Funding systems
Digital certificates
Research publication integration
External authentication
Advanced recommendation systems
```

Future features must preserve backward compatibility wherever practical.

---

# 115. API DESIGN COMPLETION CHECKLIST

The API specification must support:

* [x] Authentication
* [x] Authorization
* [x] User profiles
* [x] Citizen/community
* [x] Problem submission
* [x] Problem moderation
* [x] Problem support
* [x] Comments
* [x] Evidence/files
* [x] AI classification
* [x] AI prioritization
* [x] Duplicate detection
* [x] Skill extraction
* [x] AI summarization
* [x] Translation
* [x] Human AI review
* [x] University matching
* [x] Student workflows
* [x] Faculty workflows
* [x] Industry workflows
* [x] Startup workflows
* [x] Government workflows
* [x] Project management
* [x] Team formation
* [x] Applications
* [x] Tasks
* [x] Milestones
* [x] Progress tracking
* [x] Prototype management
* [x] Testing
* [x] Community validation
* [x] Feedback
* [x] Solutions
* [x] Impact measurement
* [x] Notifications
* [x] Search
* [x] Recommendations
* [x] Dashboards
* [x] Analytics
* [x] Audit logging
* [x] Administration
* [x] File management
* [x] Security
* [x] Rate limiting
* [x] Error handling
* [x] API versioning
* [x] Background jobs
* [x] Event-driven processing
* [x] AI traceability
* [x] Human-in-the-loop
* [x] Future extensibility

---

# 117. OFFLINE DRAFT SYNCHRONIZATION

The API supports client-side offline draft management for problem submissions:

```text
User starts entering problem
         ↓
Network becomes unavailable
         ↓
Draft stored locally on client
         ↓
User continues editing offline
         ↓
Network connectivity restored
         ↓
Client retries API synchronization
         ↓
Server validates request + enforces idempotency key
         ↓
Draft/submission synchronized cleanly
         ↓
User receives updated ProblemStatus
```

Idempotency protection ensures that retrying the same submission after network recovery does not create duplicate database records. Exact HTTP header names and client storage mechanisms remain TBD until technology stack finalization.

---

# 118. CONFIGURABLE RATE LIMITING SPECIFICATION

Rate limiting rules across all endpoints are CONFIGURABLE and will be finalized during implementation based on:
- Endpoint sensitivity (Auth, Uploads, AI Inference, Admin)
- Authentication state and user role (`COMMUNITY_MEMBER`, `STUDENT`, `FACULTY`, `UNIVERSITY_ADMIN`, `INDUSTRY_PARTNER`, `GOVERNMENT_OFFICIAL`, `MODERATOR`, `SUPER_ADMIN`)
- Traffic patterns and infrastructure capacity
- Abuse risk

Exact numeric rate-limit thresholds remain TBD until backend framework and production infrastructure selection.

---

# 119. DOCUMENT STATUS

```text
API_DESIGN.md
Version: V0.1
Status: DESIGN SPECIFICATION
Implementation: NOT STARTED
```

The API specification must remain synchronized with the master blueprint, system architecture, database design, and security design throughout development.

# END OF API DESIGN
