# SIH_26 — SYSTEM ARCHITECTURE

**Version:** V0.2
**Status:** Architecture Planning
**Project:** SIH_26
**Problem Statement:** SIH 26043
**Architecture Type:** AI-powered collaborative societal innovation platform

---

# 1. PURPOSE OF THIS DOCUMENT

This document converts the functional requirements defined in:

`docs/MASTER_BLUEPRINT.md`

into a professional technical system architecture.

This document defines:

* System layers
* Major components
* User-facing applications
* Backend services
* AI services
* Data architecture
* Authentication
* Authorization
* APIs
* File handling
* Notifications
* Search
* Analytics
* Collaboration
* Project management
* AI matching
* Security
* Deployment
* Scalability
* Observability
* Future expansion

This document is an architecture specification.

It does **not** represent implementation code.

---

# 2. ARCHITECTURAL GOAL

The architecture must support the complete SIH_26 lifecycle:

```text
Citizen / Community
        ↓
Problem Submission
        ↓
Validation & Moderation
        ↓
AI Analysis
        ↓
Classification
        ↓
Duplicate Detection
        ↓
Priority Analysis
        ↓
Skill Extraction
        ↓
University Matching
        ↓
Faculty / Student Matching
        ↓
Project Formation
        ↓
Industry / Startup Collaboration
        ↓
Project Development
        ↓
Tasks + Milestones
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
        ↓
Knowledge Reuse
```

The architecture must preserve this complete lifecycle.

---

# 3. ARCHITECTURAL PRINCIPLES

The system follows these principles:

1. Modular architecture
2. API-first design
3. Security by design
4. Privacy by design
5. AI-assisted decision making
6. Human-in-the-loop for important decisions
7. Role-based access control
8. Separation of concerns
9. Reusable services
10. Scalable data architecture
11. Observable services
12. Fault tolerance
13. Mobile-first citizen experience
14. Responsive institutional dashboards
15. Multilingual-ready design
16. Accessibility-aware design
17. Evidence-based impact measurement
18. Extensible architecture

---

# 4. HIGH-LEVEL ARCHITECTURE

```text
                         ┌─────────────────────────────┐
                         │          USERS              │
                         ├─────────────────────────────┤
                         │ Citizens / Communities      │
                         │ Students                    │
                         │ Faculty                     │
                         │ Universities                │
                         │ Industry / Startups         │
                         │ Government                  │
                         │ Platform Administrators     │
                         └──────────────┬──────────────┘
                                        │
                                        ↓
                         ┌─────────────────────────────┐
                         │       CLIENT LAYER          │
                         ├─────────────────────────────┤
                         │ Web Application             │
                         │ Responsive Dashboards       │
                         │ Mobile-first Interfaces     │
                         └──────────────┬──────────────┘
                                        │
                                        ↓
                         ┌─────────────────────────────┐
                         │       API / GATEWAY         │
                         ├─────────────────────────────┤
                         │ Authentication              │
                         │ Authorization               │
                         │ Request Validation          │
                         │ Rate Limiting               │
                         │ Routing                     │
                         └──────────────┬──────────────┘
                                        │
                ┌───────────────────────┼───────────────────────┐
                ↓                       ↓                       ↓
      ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
      │ CORE APPLICATION  │    │ AI INTELLIGENCE  │    │ COLLABORATION    │
      │ SERVICES          │    │ SERVICES         │    │ SERVICES         │
      └────────┬─────────┘    └────────┬─────────┘    └────────┬─────────┘
               │                       │                       │
               └───────────────────────┼───────────────────────┘
                                       ↓
                         ┌─────────────────────────────┐
                         │       DATA LAYER            │
                         ├─────────────────────────────┤
                         │ Relational Database         │
                         │ Vector / Similarity Store   │
                         │ File/Object Storage         │
                         │ Cache                       │
                         │ Search Index                │
                         └──────────────┬──────────────┘
                                        │
                                        ↓
                         ┌─────────────────────────────┐
                         │ EXTERNAL / INFRASTRUCTURE   │
                         ├─────────────────────────────┤
                         │ Email / Messaging            │
                         │ Maps / Location Services     │
                         │ AI Model Providers           │
                         │ Monitoring                   │
                         │ Cloud Infrastructure        │
                         └─────────────────────────────┘
```

---

# 5. ARCHITECTURAL LAYERS

SIH_26 is divided into the following conceptual layers:

```text
Layer 1 → Presentation
Layer 2 → API / Gateway
Layer 3 → Application Services
Layer 4 → AI Intelligence
Layer 5 → Data
Layer 6 → Infrastructure
```

---

# 6. PRESENTATION LAYER

The presentation layer provides interfaces for all stakeholder groups.

## 6.1 Citizen Interface

Primary capabilities:

* Registration
* Login
* Problem submission
* Problem tracking
* Problem discovery
* Community support
* Comments
* Evidence upload
* Notifications
* Feedback
* Solution discovery

The citizen experience should be mobile-first.

---

## 6.2 Student Interface

Capabilities:

* Student profile
* Skills
* Project recommendations
* Project applications
* Team management
* Tasks
* Milestones
* Collaboration
* Documents
* Portfolio
* Notifications

---

## 6.3 Faculty Interface

Capabilities:

* Faculty profile
* Expertise
* Problem recommendations
* Project management
* Student management
* Team management
* Milestone reviews
* Industry collaboration
* Feedback
* Analytics

---

## 6.4 University Interface

Capabilities:

* Institution profile
* Departments
* Faculty
* Students
* Problems
* Projects
* Partnerships
* Analytics
* Innovation pipeline

---

## 6.5 Industry Interface

Capabilities:

* Company profile
* Technology expertise
* Project discovery
* Collaboration requests
* Mentorship
* Resource sharing
* Prototype review
* Partnership tracking

---

## 6.6 Government Interface

Capabilities:

* Regional problems
* Priority problems
* Project monitoring
* Institution monitoring
* Industry participation
* Impact analytics
* Reports
* Deployment monitoring

---

## 6.7 Administration Interface

Capabilities:

* User management
* Institution verification
* Industry verification
* Problem moderation
* Project moderation
* Categories
* AI monitoring
* Audit logs
* Platform analytics
* System configuration

---

# 7. FRONTEND ARCHITECTURE

The frontend should follow modular feature-based organization.

Conceptually:

```text
Frontend
│
├── Authentication
├── User Profiles
├── Citizen
│   ├── Problem Submission
│   ├── Problem Discovery
│   ├── Support
│   └── Feedback
│
├── Student
│   ├── Projects
│   ├── Tasks
│   ├── Teams
│   └── Portfolio
│
├── Faculty
│   ├── Projects
│   ├── Students
│   ├── Reviews
│   └── Mentorship
│
├── University
│   ├── Departments
│   ├── Projects
│   └── Analytics
│
├── Industry
│   ├── Opportunities
│   ├── Collaboration
│   └── Mentorship
│
├── Government
│   ├── Regional Analytics
│   ├── Projects
│   └── Impact
│
└── Administration
    ├── Users
    ├── Moderation
    ├── Verification
    └── Analytics
```

---

# 8. API / GATEWAY LAYER

All client applications communicate with backend services through controlled APIs.

Responsibilities:

* Request routing
* Authentication verification
* Authorization checks
* Request validation
* Rate limiting
* API versioning
* Error handling
* Logging
* Security controls

Conceptual flow:

```text
Client
  ↓
API Gateway
  ↓
Authentication
  ↓
Authorization
  ↓
Service
  ↓
Database / AI / Storage
```

---

# 9. BACKEND APPLICATION LAYER

The backend contains modular domain services.

Major services:

```text
Authentication Service
User Service
Role Service
Problem Service
Moderation Service
Community Service
University Service
Department Service
Student Service
Faculty Service
Industry Service
Project Service
Team Service
Task Service
Milestone Service
Collaboration Service
Notification Service
Feedback Service
Testing Service
Validation Service
Impact Service
Solution Repository Service
Search Service
Analytics Service
File Service
Audit Service
```

These are logical service boundaries.

They do not necessarily need to become independent microservices in the initial MVP.

---

# 10. MODULAR MONOLITH STRATEGY FOR MVP

For the initial implementation, a modular monolith is preferred unless requirements prove that separate services are necessary.

Conceptually:

```text
                 Backend Application
                         │
       ┌─────────────────┼─────────────────┐
       ↓                 ↓                 ↓
   Problem Module    Project Module    User Module
       ↓                 ↓                 ↓
   AI Module       Collaboration       Analytics
                         │
                         ↓
                    Data Layer
```

Advantages:

* Faster development
* Easier debugging
* Lower infrastructure complexity
* Easier deployment
* Suitable for hackathon MVP
* Clear module boundaries
* Easier future migration to services

---

# 11. AUTHENTICATION ARCHITECTURE

Authentication verifies user identity.

Possible authentication methods:

* Email/password
* Institution-based accounts
* Government-authorized accounts
* Future social/OAuth login
* Future phone-based authentication

The final authentication technology will be selected during implementation planning.

---

# 12. AUTHENTICATION FLOW

```text
User
 ↓
Login
 ↓
Credential Validation
 ↓
Authentication Provider
 ↓
Session / Token
 ↓
Client
 ↓
Authenticated API Requests
```

---

# 13. AUTHORIZATION

Authentication and authorization are separate.

Authentication:

> Who are you?

Authorization:

> What are you allowed to do?

Role-based access control must be enforced on the backend.

---

# 14. ROLE MODEL

Canonical System Authorization Roles (Authoritative Source of Truth for RBAC permissions across API and DB boundaries):

```text
USER
 │
 ├── COMMUNITY_MEMBER
 ├── STUDENT
 ├── FACULTY
 ├── UNIVERSITY_ADMIN
 ├── INDUSTRY_PARTNER
 ├── GOVERNMENT_OFFICIAL
 ├── MODERATOR
 └── SUPER_ADMIN
```

Note: Stakeholder categories (Citizen / Community, Student, Faculty, University / College, Industry / Startup, Government, Admin / Moderator) map directly to these canonical system authorization roles.

---

# 15. AUTHORIZATION EXAMPLE

```text
COMMUNITY_MEMBER
 ├── Create own problem
 ├── Edit own problem
 ├── Support public problems
 └── View public solutions

STUDENT
 ├── Join approved projects
 ├── Manage assigned tasks
 └── Upload project work

FACULTY
 ├── Approve student teams
 ├── Review milestones
 └── Mentor projects

INDUSTRY_PARTNER
 ├── Request collaboration
 ├── Mentor approved projects
 └── Review prototypes

GOVERNMENT_OFFICIAL
 ├── View authorized regional data
 └── Monitor approved projects

MODERATOR / SUPER_ADMIN
 └── Platform-level management & system administration
```

---

# 16. PROBLEM SERVICE

The Problem Service manages the complete problem lifecycle.

Responsibilities:

* Problem creation
* Editing
* Submission
* Status management
* Evidence
* Location
* Categories
* Support
* Comments
* Moderation state
* AI analysis state
* Project conversion

---

# 17. PROBLEM STATE MACHINE

Canonical `ProblemStatus` Lifecycle (Authoritative Source of Truth across all system design documents):

```text
DRAFT
  ↓
SUBMITTED
  ↓
UNDER_REVIEW
  ↓
AI_ANALYSIS
  ↓
VALIDATION
  ↓
DUPLICATE_REVIEW
  ↓
PRIORITIZED
  ↓
MATCHED
  ↓
SHORTLISTED
  ↓
ACCEPTED
  ↓
PROJECT_CREATED
  ↓
IN_PROGRESS
  ↓
TESTING
  ↓
DEPLOYMENT
  ↓
RESOLVED
  ↓
IMPACT_MEASUREMENT
  ↓
ARCHIVED
```

---

# 18. PROBLEM SUBMISSION PIPELINE

```text
Citizen
 ↓
Problem Form
 ↓
Validation
 ↓
Evidence Upload
 ↓
Create Problem Record
 ↓
AI Processing
 ├── Classification
 ├── Similarity
 ├── Skills
 ├── Priority
 └── Recommendations
 ↓
Human Review
 ↓
Publish / Modify / Reject
```

---

# 19. AI ARCHITECTURE

AI is separated into logical services.

```text
                  AI ENGINE
                     │
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
Classification   Similarity     Extraction
       │             │             │
       ↓             ↓             ↓
 Priority        Duplicate      Skills
       │             │             │
       └─────────────┼─────────────┘
                     ↓
                 Matching
                     ↓
             Recommendations
```

---

# 20. ASYNCHRONOUS HYBRID AI PROCESSING PIPELINE

```text
User Multilingual Submission (English, Tamil, Indic)
         ↓
Immediate Validation & Database Persistence
         ↓
HTTP 202 Accepted Response (Non-blocking)
         ↓
Background Worker Queue (Redis / RabbitMQ)
         ↓
Language Identification & PII Protection
         ↓
Text Normalization & Tokenization
         ↓
Lightweight ML Category Classification
         ↓
Structured Skill & Entity Extraction (Taxonomy Mapped)
         ↓
768-D Multilingual Embedding Generation (Granite R2 311M Benchmark Candidate)
         ↓
Contextual Duplicate & Similarity Search (HNSW ANN Vector Search)
         ↓
Deterministic 7-Factor Priority Calculation
         ↓
Intelligent Multi-Factor Matching Engine (16 Criteria + Capacity Check)
         ↓
Selective LLM Reasoning (Dhee-NxtGen-Qwen3-Indic 4B Benchmark Candidate)
         ↓
Grounded Data-Verified Explanation Generation
         ↓
Human-in-the-Loop Review Trigger & Model Registry Audit Logging
```

> **Fault Isolation:** AI service failure does NOT cause data loss. The problem is stored in the relational database immediately before triggering asynchronous queue tasks.

---

# 21. AI CLASSIFICATION SERVICE

Input:

* Problem title
* Description
* Optional evidence
* Location
* Existing category information

Output:

```text
Category
Subcategory
Domain
Problem Type
Severity Estimate
Confidence
Extracted Entities
```

AI output must be stored for traceability.

---

# 22. DUPLICATE DETECTION ARCHITECTURE

Duplicate detection should combine:

1. Text similarity
2. Semantic similarity
3. Location similarity
4. Category similarity
5. Existing problem relationships

Conceptual flow:

```text
New Problem
    ↓
Generate Embedding
    ↓
Vector Search
    ↓
Top Similar Problems
    ↓
Similarity Threshold
    ↓
Possible Duplicate / Related / New
```

---

# 23. SIMILARITY RESULT TYPES

```text
EXACT_DUPLICATE
LIKELY_DUPLICATE
RELATED_PROBLEM
LOW_SIMILARITY
NEW_PROBLEM
```

Human moderation may override AI results.

---

# 24. SKILL EXTRACTION

The AI extracts:

* Technical skills
* Domain knowledge
* Hardware requirements
* Software requirements
* Research areas
* Potential technologies

Example:

```text
Problem
 ↓
AI
 ↓
IoT
Embedded Systems
Computer Vision
Cloud
Data Analytics
Civil Engineering
```

---

# 25. PRIORITY ENGINE

Priority should combine multiple signals.

Possible signals:

```text
Severity
Affected Population
Urgency
Community Support
Geographic Spread
Environmental Impact
Social Impact
Feasibility
Government Importance
```

Output:

```text
Priority Score
Priority Level
Reasoning
Confidence
```

Possible levels:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

---

# 26. INTELLIGENT MATCHING ENGINE

The Matching Engine correlates problems with institutions, student/faculty teams, and industry partners using multi-factor contextual suitability rather than isolated skill scores.

### Core Architectural Principle:
> **"Best Match ≠ Highest Single Skill Score."**
> **"The platform must never select a college or university solely because it has the highest individual skill or domain match. When multiple institutions possess similar or overlapping capabilities, the intelligent matching engine must perform multi-factor contextual ranking to identify the most suitable institution for the specific problem."**

```text
Problem Requirements (Skills, Domain, Urgency, Location)
                       ↓
Institution Capability Profiles (Depts, Faculty, Labs, History)
                       ↓
Current Practical Capacity Check (Unassigned Students, Mentor Hours, Workload)
                       ↓
Multi-Factor Contextual Ranking Engine (16 Criteria Evaluated)
                       ↓
Tie / Near-Tie Resolution Protocol
                       ↓
Ranked Shortlist Generation (#1 Best Match, #2 Alternative, #3 ...)
```

---

# 27. UNIVERSITY MATCHING SERVICE

Inputs:
* Department expertise & skill coverage completeness
* Faculty expertise & uncommitted mentoring bandwidth
* Unassigned student skill availability
* Research areas & laboratory/facility availability
* Previous relevant project experience & historical success
* Institutional specialization & industry partnerships
* Geographic relevance & government priority alignment
* Current workload & capacity constraints
* Cross-college collaboration potential

Capability vs. Practical Capacity Rule:
The architecture explicitly separates **Capability** (what an institution *can* do) from **Current Practical Capacity** (what an institution *can realistically take on now*). Overcommitted institutions receive capacity penalties to prioritize available, highly capable alternative campuses.

Outputs:
```text
Ranked Shortlist (#1 Best Match, #2 Strong Alternative, #3 ...)
Match Scores & Confidence Levels
Grounded Matching Reasons (Data-Verified)
Workload & Capacity Constraints
Identified Capability Gaps
Human-in-the-Loop Review Triggers (For near-ties / low confidence)
```

---

# 28. STUDENT MATCHING

Inputs:

* Skills
* Projects
* Interests
* Department
* Experience
* Availability

Output:

```text
Student
Skill Match
Experience Match
Interest Match
Overall Match
```

---

# 29. FACULTY MATCHING

Inputs:

* Research domain
* Publications
* Previous projects
* Expertise
* Department

Output:

```text
Faculty
Domain Match
Experience Match
Overall Match
```

---

# 30. INDUSTRY MATCHING

Inputs:

* Technology expertise
* Industry sector
* Products
* Resources
* Mentorship capability
* Previous collaboration
* Geographic relevance

Output:

```text
Industry
Technology Match
Domain Match
Resource Match
Collaboration Score
```

---

# 31. RECOMMENDATION ENGINE

Recommendations can appear in:

* Citizen dashboard
* Student dashboard
* Faculty dashboard
* University dashboard
* Industry dashboard
* Government dashboard

Examples:

```text
Recommended Problem
Recommended Project
Recommended Student
Recommended Faculty
Recommended University
Recommended Industry Partner
Recommended Solution
```

---

# 32. HUMAN-IN-THE-LOOP AI

Important AI decisions should support human review.

```text
AI
 ↓
Recommendation
 ↓
Human Review
 ↓
Accept
OR
Modify
OR
Reject
 ↓
Final Decision
```

This applies especially to:

* Priority
* Moderation
* Institution matching
* Project approval
* Impact claims

---

# 33. AI EXPLAINABILITY

Every major recommendation should attempt to provide reasons.

Example:

```text
University Match: 93%

Reasons:
✓ Relevant department
✓ Relevant faculty expertise
✓ Required student skills available
✓ Required laboratory available
✓ Similar previous project
```

---

# 34. PROJECT SERVICE

The Project Service manages:

* Project creation
* Project metadata
* Team
* Mentors
* Objectives
* Timeline
* Tasks
* Milestones
* Documents
* Progress
* Risks
* Testing
* Validation
* Impact

---

# 35. PROJECT STRUCTURE

```text
Project
│
├── Problem
├── Objectives
├── Team
│   ├── Students
│   ├── Faculty
│   └── Industry Mentor
│
├── Tasks
├── Milestones
├── Documents
├── Prototype
├── Tests
├── Feedback
├── Risks
├── Impact
└── Final Solution
```

---

# 36. TEAM SERVICE

Team management supports:

* Team creation
* Member invitation
* Member approval
* Roles
* Team leader
* Faculty mentor
* Industry mentor
* Student members

---

# 37. TASK SERVICE

Tasks contain:

```text
Task ID
Title
Description
Assignee
Priority
Deadline
Status
Attachments
Comments
```

Statuses:

```text
TODO
IN_PROGRESS
BLOCKED
UNDER_REVIEW
COMPLETED
```

---

# 38. MILESTONE SERVICE

Each milestone contains:

* Name
* Description
* Deadline
* Responsible members
* Tasks
* Deliverables
* Evidence
* Status
* Review
* Feedback

---

# 39. PROJECT PROGRESS

Progress can be calculated from:

* Completed tasks
* Completed milestones
* Verified deliverables

The exact formula will be finalized during implementation.

Example:

```text
Project Progress

████████████████░░░░ 80%
```

---

# 40. COLLABORATION SERVICE

The Collaboration Service manages relationships between:

```text
University ↔ Industry
Faculty ↔ Industry
Students ↔ Faculty
Community ↔ Project
Government ↔ Project
```

It manages:

* Collaboration requests
* Approvals
* Partnership status
* Mentorship
* Resource sharing

---

# 41. COLLABORATION STATE

```text
REQUESTED
 ↓
PENDING_REVIEW
 ↓
APPROVED
 ↓
ACTIVE
 ↓
COMPLETED
```

Possible alternative:

```text
REJECTED
CANCELLED
```

---

# 42. NOTIFICATION ARCHITECTURE

Notifications should be event-driven conceptually.

```text
System Event
    ↓
Notification Service
    ↓
Determine Recipients
    ↓
Determine Notification Type
    ↓
Delivery
```

Possible channels:

* In-app
* Email
* Future SMS
* Future push notifications

---

# 43. NOTIFICATION EVENTS

Examples:

```text
Problem Submitted
Problem Approved
Duplicate Detected
Project Created
Team Invitation
Task Assigned
Milestone Due
Milestone Reviewed
Industry Collaboration Requested
Industry Collaboration Approved
Feedback Requested
Solution Implemented
Impact Update
```

---

# 44. SEARCH ARCHITECTURE

Search must support:

* Problems
* Projects
* Universities
* Departments
* Students
* Faculty
* Industries
* Technologies
* Skills
* Solutions

Search may use:

```text
Keyword Search
+
Filters
+
Semantic Search
```

---

# 45. SEARCH FILTERS

Possible filters:

```text
Category
Subcategory
Location
Severity
Priority
Status
Technology
Skill
Institution
Department
Industry
Date
```

---

# 46. SEMANTIC SEARCH

Semantic search can use embeddings to find conceptually related content.

Example:

```text
Search:
"water accumulating on roads"

Possible results:
"Urban flooding"
"Drainage overflow"
"Rainwater stagnation"
"Road waterlogging"
```

This should complement keyword search.

---

# 47. SOLUTION REPOSITORY ARCHITECTURE

Completed projects become searchable solutions.

```text
Problem
 ↓
Project
 ↓
Prototype
 ↓
Testing
 ↓
Validation
 ↓
Implementation
 ↓
Solution Repository
```

Repository entries should contain:

* Problem
* Solution
* Team
* Institution
* Industry
* Technology
* Results
* Impact
* Deployment information

---

# 48. KNOWLEDGE REUSE

When a new problem is submitted:

```text
New Problem
 ↓
AI Embedding
 ↓
Search Existing Solutions
 ↓
Similar Solution Found
 ↓
Recommend:
Reuse
OR
Adapt
OR
Develop New Solution
```

---

# 49. COMMUNITY SERVICE

Community functionality includes:

* Problem support
* Comments
* Validation
* Feedback
* Pilot participation
* Issue updates

Community activity should be connected to problems/projects without exposing unnecessary personal information.

---

# 50. MODERATION SERVICE

Moderation handles:

* Spam
* Abuse
* Misleading content
* Duplicate problems
* Inappropriate content
* Invalid submissions

Workflow:

```text
Content
 ↓
Automated Checks
 ↓
AI Assistance
 ↓
Human Review
 ↓
Decision
```

---

# 51. VERIFICATION SERVICE

Verification supports:

```text
Institution Verification
Faculty Verification
Industry Verification
Government Verification
```

Verification status may include:

```text
PENDING
VERIFIED
REJECTED
SUSPENDED
```

---

# 52. FILE / OBJECT STORAGE

Files may include:

* Images
* Videos
* Documents
* Research files
* Test reports
* Project reports
* Prototype evidence

Files should not be stored directly inside relational database records as large binary objects unless specifically justified.

Conceptual architecture:

```text
User
 ↓
File API
 ↓
Validation
 ↓
Object Storage
 ↓
Metadata stored in Database
```

---

# 53. FILE SECURITY

Uploaded files should be checked for:

* File type
* File size
* Allowed extensions
* Malware where supported
* Access permissions

Private project files must not be publicly accessible by default.

---

# 54. DATA ARCHITECTURE

SIH_26 will likely use multiple forms of storage.

```text
                    DATA LAYER
                        │
       ┌────────────────┼────────────────┐
       ↓                ↓                ↓
Relational DB      Object Storage    Search/Vector
       │                │                │
Structured Data      Files          Similarity
```

---

# 55. RELATIONAL DATABASE

The relational database should contain structured entities such as:

```text
Users
Roles
Profiles
Universities
Departments
Industries
Problems
Projects
Teams
Tasks
Milestones
Collaborations
Notifications
Feedback
Testing
Impact
Solutions
Audit Logs
```

---

# 56. VECTOR / SEMANTIC STORAGE

A vector-capable system may store embeddings for:

* Problems
* Solutions
* Projects
* Skills
* Research areas
* Technologies

Purpose:

* Duplicate detection
* Similarity search
* Semantic search
* AI matching
* Knowledge reuse

The exact vector technology will be selected later.

---

# 57. CACHE LAYER

Caching may be used for:

* Frequently accessed public data
* Dashboard statistics
* Search results
* AI recommendation results
* Session-related data where appropriate

Caching must not bypass authorization.

---

# 58. ANALYTICS ARCHITECTURE

Analytics can consume data from operational services.

```text
Operational Data
       ↓
Analytics Processing
       ↓
Aggregated Metrics
       ↓
Dashboards
```

Metrics include:

* Problems
* Projects
* Participation
* Collaboration
* Resolution
* Impact

---

# 59. GOVERNMENT ANALYTICS

Government users may view:

```text
Problem Density
Problem Categories
Priority Distribution
Regional Trends
Project Progress
Institution Participation
Industry Participation
Implementation Rate
Impact Metrics
```

Access must be controlled according to authorization policies.

---

# 60. IMPACT ARCHITECTURE

Impact records should be linked to projects and solutions.

Possible metrics:

```text
People Benefited
Cost Saved
Time Saved
Environmental Benefit
Accessibility Improvement
Education Benefit
Healthcare Benefit
Resource Savings
```

Impact claims should support evidence and verification.

---

# 61. TESTING ARCHITECTURE

Testing records may include:

```text
Test ID
Project
Prototype
Test Type
Test Date
Test Environment
Expected Result
Actual Result
Status
Evidence
Reviewer
Comments
```

---

# 62. COMMUNITY VALIDATION ARCHITECTURE

```text
Prototype
 ↓
Pilot Deployment
 ↓
Community Feedback
 ↓
Validation Analysis
 ↓
Improvement
 ↓
Final Validation
```

---

# 63. AUDIT ARCHITECTURE

Important operations should generate audit events.

Examples:

```text
USER_CREATED
PROBLEM_SUBMITTED
PROBLEM_APPROVED
PROBLEM_REJECTED
PROBLEM_MARKED_DUPLICATE
PROJECT_CREATED
MILESTONE_APPROVED
COLLABORATION_APPROVED
SOLUTION_IMPLEMENTED
USER_ROLE_CHANGED
```

Audit records should contain:

* Actor
* Action
* Resource
* Timestamp
* Relevant metadata

---

# 64. DATA FLOW — PROBLEM TO PROJECT

```text
Citizen
 ↓
Frontend
 ↓
API
 ↓
Problem Service
 ↓
Database
 ↓
AI Processing
 ├── Classification
 ├── Similarity
 ├── Priority
 └── Skill Extraction
 ↓
Matching Engine
 ↓
University Recommendations
 ↓
Human Review
 ↓
Project Creation
```

---

# 65. DATA FLOW — UNIVERSITY TO INDUSTRY

```text
Project
 ↓
AI Industry Matching
 ↓
Recommended Companies
 ↓
Industry Views Project
 ↓
Collaboration Request
 ↓
University / Faculty Review
 ↓
Approval
 ↓
Collaboration Workspace
 ↓
Mentorship / Resources
```

---

# 66. DATA FLOW — PROJECT TO IMPACT

```text
Project
 ↓
Tasks
 ↓
Milestones
 ↓
Prototype
 ↓
Testing
 ↓
Community Validation
 ↓
Government / Stakeholder Review
 ↓
Deployment
 ↓
Impact Measurement
 ↓
Solution Repository
```

---

# 67. API ARCHITECTURE

The API should be organized by domain.

Conceptual endpoints:

```text
/auth
/users
/roles
/problems
/problem-categories
/problem-support
/problem-comments
/communities
/universities
/departments
/students
/faculty
/industries
/projects
/teams
/tasks
/milestones
/collaborations
/notifications
/feedback
/testing
/validation
/impact
/solutions
/search
/analytics
/files
/admin
```

---

# 68. API VERSIONING

APIs should support future evolution.

Conceptually:

```text
/api/v1/...
```

Future breaking changes can use:

```text
/api/v2/...
```

---

# 69. API VALIDATION

All APIs should validate:

* Required fields
* Data types
* Length
* Allowed values
* Ownership
* Permissions

Invalid requests should return consistent error responses.

---

# 70. ERROR HANDLING

Errors should be handled consistently.

Conceptual response:

```text
{
  success: false,
  error: {
    code: "...",
    message: "...",
    details: "..."
  }
}
```

Exact response format will be finalized during API design.

---

# 71. SECURITY ARCHITECTURE

Security layers:

```text
Client Security
      ↓
API Security
      ↓
Authentication
      ↓
Authorization
      ↓
Input Validation
      ↓
Database Security
      ↓
Storage Security
      ↓
Audit Logging
```

---

# 72. SECURITY REQUIREMENTS

The platform should protect against:

* Unauthorized access
* Credential theft
* SQL injection
* XSS
* CSRF where applicable
* Malicious uploads
* Brute-force attacks
* Rate abuse
* Privilege escalation
* Data leakage

---

# 73. PASSWORD SECURITY

Passwords must never be stored as plaintext.

Use a modern password hashing mechanism.

Additional protections:

* Rate limiting
* Account lockout / throttling where appropriate
* Secure password reset
* Session/token expiration

---

# 74. DATA PRIVACY

The system should apply data minimization.

Principles:

* Collect only required data
* Limit access
* Protect personal data
* Preserve user consent
* Support deletion policies where applicable
* Avoid unnecessary exposure

---

# 75. CITIZEN ANONYMITY

If anonymous submission is supported:

```text
Public View
    ↓
Anonymous Citizen

Authorized Backend
    ↓
Identity retained according to policy
```

Identity should not be exposed to unauthorized users.

---

# 76. AUTHORIZED DATA VISIBILITY

Different roles should see different information.

```text
Public
 ↓
Public Problems
Public Solutions

Citizen
 ↓
Own Personal Information

Student
 ↓
Authorized Projects

Faculty
 ↓
Authorized Department / Project Data

Industry
 ↓
Approved Collaboration Data

Government
 ↓
Authorized Regional / Program Data

Admin
 ↓
Administrative Data
```

---

# 77. RATE LIMITING

Rate limits should be applied to sensitive endpoints.

Examples:

* Login
* Password reset
* Problem submission
* Comments
* Support/upvote actions
* AI requests
* File uploads

This reduces abuse and AI cost.

---

# 78. AI SECURITY

AI systems must consider:

* Prompt injection
* Malicious input
* Sensitive data leakage
* Untrusted documents
* Excessive API usage
* Hallucinated recommendations

AI output should not automatically execute privileged actions.

---

# 79. AI DATA GOVERNANCE

AI processing should distinguish:

```text
User-provided data
AI-generated data
Human-verified data
System-derived data
```

This distinction should remain available for auditing.

---

# 80. AI CONFIDENCE MANAGEMENT

AI outputs may include:

```text
Prediction
Confidence
Reasoning / Signals
Model Version
Timestamp
Human Review Status
```

This supports future evaluation and improvement.

---

# 81. OBSERVABILITY

The system should provide:

* Application logs
* Error logs
* Performance metrics
* API monitoring
* AI monitoring
* Database monitoring
* Security events

---

# 82. MONITORING

Monitor:

```text
CPU
Memory
Database
API latency
Error rate
Request volume
AI latency
AI failures
Storage usage
Notification failures
```

---

# 83. BACKUP AND RECOVERY

Important data should have backup strategies.

Backups should cover:

* Database
* Files
* Configuration
* Critical system metadata

Recovery procedures should be documented before production deployment.

---

# 84. SCALABILITY

The initial system should be designed so that high-load components can later be separated.

Potential future scaling:

```text
API
 ↓
Load Balancer
 ↓
Multiple Backend Instances
 ↓
Database
 ↓
Cache
 ↓
Search / Vector Store
```

AI services may scale independently later.

---

# 85. INITIAL DEPLOYMENT STRATEGY

For the hackathon:

```text
Frontend
   ↓
Backend
   ↓
Database
   ↓
AI Services
   ↓
Storage
```

Keep infrastructure simple.

Do not introduce unnecessary distributed systems before they are needed.

---

# 86. FUTURE DISTRIBUTED ARCHITECTURE

If scale requires it:

```text
API Gateway
     │
 ┌───┼────┬────┬────┐
 ↓   ↓    ↓    ↓    ↓
User Problem AI Project Notification
Service Service Service Service Service
     │        │
     └────┬───┘
          ↓
       Data Layer
```

---

# 87. EVENT-DRIVEN FUTURE

Future high-scale architecture may use events such as:

```text
ProblemSubmitted
ProblemAnalyzed
ProjectCreated
MilestoneCompleted
CollaborationApproved
SolutionImplemented
```

Consumers could include:

* Notification service
* Analytics
* AI engine
* Audit service
* Recommendation engine

---

# 88. MULTILINGUAL ARCHITECTURE

The architecture must be ready for:

* English
* Tamil
* Additional Indian languages

Original user content should be preserved.

Possible flow:

```text
Tamil Submission
       ↓
Language Detection
       ↓
AI Understanding
       ↓
Structured Representation
       ↓
English / Internal Representation
       ↓
AI Processing
       ↓
Localized User Response
```

Translation must not destroy the original content.

---

# 89. ACCESSIBILITY ARCHITECTURE

Frontend should support:

* Semantic HTML
* Keyboard navigation
* Screen readers
* Accessible forms
* Sufficient contrast
* Clear error messages
* Responsive design
* Scalable text

---

# 90. LOCATION ARCHITECTURE

Problem locations may be represented at appropriate granularity.

```text
Country
 ↓
State
 ↓
District
 ↓
City
 ↓
Locality
```

Precise coordinates should only be collected when justified.

Possible future features:

* Maps
* Heatmaps
* Nearby institutions
* Regional problem analysis

---

# 91. GEO ANALYTICS

Geographic data can support:

```text
Problem Hotspots
Regional Categories
Affected Population
Institution Distribution
Project Distribution
Implementation Areas
```

Privacy requirements must be considered before exposing precise locations.

---

# 92. RECOMMENDATION ARCHITECTURE

The recommendation system can combine:

```text
Rule-based Signals
+
Similarity
+
Skills
+
Historical Data
+
User Preferences
+
Availability
```

This allows the system to evolve from simple matching to more advanced recommendations.

---

# 93. RECOMMENDATION FEEDBACK LOOP

```text
Recommendation
 ↓
User Interaction
 ↓
Accepted / Rejected
 ↓
Feedback
 ↓
Recommendation Evaluation
 ↓
Future Improvement
```

The system should not assume that every recommendation is correct.

---

# 94. DATA RELATIONSHIP OVERVIEW

```text
User
 │
 ├───────────────┐
 ↓               ↓
Profile         Role
 │
 ├── Student
 ├── Faculty
 ├── Citizen
 ├── Industry
 └── Government

University
 │
 └── Department
       ├── Faculty
       └── Students

Problem
 │
 ├── Evidence
 ├── Support
 ├── Comments
 ├── AI Analysis
 └── Project
       │
       ├── Team
       ├── Tasks
       ├── Milestones
       ├── Collaboration
       ├── Prototype
       ├── Testing
       ├── Validation
       ├── Impact
       └── Solution
```

---

# 95. CONCEPTUAL DATABASE GROUPS

The database design will later be divided into logical groups.

## Identity

```text
users
roles
user_roles
profiles
```

## Institutions

```text
universities
departments
faculty
students
```

## Industry

```text
industries
industry_expertise
industry_resources
```

## Problems

```text
problems
problem_categories
problem_locations
problem_evidence
problem_support
problem_comments
```

## AI

```text
ai_analyses
similarity_results
skills
technologies
matching_results
```

## Projects

```text
projects
project_members
teams
tasks
milestones
```

## Collaboration

```text
collaborations
mentorships
resources
```

## Validation

```text
prototypes
tests
validation_records
feedback
```

## Impact

```text
impact_metrics
impact_records
```

## Solutions

```text
solutions
solution_resources
```

## Platform

```text
notifications
reports
moderation_actions
audit_logs
```

This is conceptual and will become the detailed database schema in a later phase.

---

# 96. FRONTEND → BACKEND → AI → DATABASE FLOW

```text
                  USER
                    ↓
                FRONTEND
                    ↓
                API LAYER
                    ↓
             BACKEND MODULE
                    ↓
        ┌───────────┴───────────┐
        ↓                       ↓
     DATABASE                  AI
                                ↓
                       AI Result / Recommendation
                                ↓
                            DATABASE
                                ↓
                            BACKEND
                                ↓
                            FRONTEND
                                ↓
                              USER
```

---

# 97. END-TO-END TECHNICAL FLOW

```text
1. User creates account
        ↓
2. Authentication
        ↓
3. User profile
        ↓
4. Citizen submits problem
        ↓
5. API validates request
        ↓
6. Problem stored
        ↓
7. AI processing triggered
        ↓
8. Classification
        ↓
9. Duplicate detection
        ↓
10. Skill extraction
        ↓
11. Priority analysis
        ↓
12. Matching
        ↓
13. Human review
        ↓
14. University accepts
        ↓
15. Project created
        ↓
16. Team formed
        ↓
17. Faculty assigned
        ↓
18. Industry collaboration
        ↓
19. Tasks created
        ↓
20. Milestones tracked
        ↓
21. Prototype created
        ↓
22. Testing
        ↓
23. Community validation
        ↓
24. Government review
        ↓
25. Deployment
        ↓
26. Impact measurement
        ↓
27. Solution repository
```

---

# 98. FAILURE HANDLING

The system should handle failures gracefully.

Examples:

### AI unavailable

```text
Problem Submission
 ↓
Problem Stored
 ↓
AI Pending
 ↓
Retry
```

The entire application must not fail because AI is temporarily unavailable.

### Notification failure

The core operation should still succeed.

### File upload failure

The project record should remain consistent.

### Database temporary failure

Appropriate error handling and retry strategies should be considered.

---

# 99. ASYNCHRONOUS PROCESSING

AI-heavy operations may be processed asynchronously.

Example:

```text
Problem Submitted
       ↓
Immediate Response
       ↓
AI Job
       ↓
Classification
       ↓
Similarity
       ↓
Matching
       ↓
Results Stored
       ↓
Notification
```

This prevents slow AI operations from blocking normal user interactions.

---

# 100. AI JOB ARCHITECTURE

Conceptually:

```text
Application
    ↓
Job Queue
    ↓
AI Worker
    ↓
Model / AI Provider
    ↓
Result
    ↓
Database
    ↓
Notification / Recommendation
```

The exact queue technology is a later decision.

---

# 101. SECURITY BOUNDARIES

Important security boundaries:

```text
Public Internet
      ↓
Frontend
      ↓
API Boundary
      ↓
Authenticated Backend
      ↓
Protected Data
      ↓
AI / Storage / Database
```

No client should directly access protected database resources.

---

# 102. FILE ACCESS FLOW

```text
User
 ↓
Authentication
 ↓
Authorization
 ↓
File Service
 ↓
Access Check
 ↓
Object Storage
 ↓
Secure File Response
```

---

# 103. AUDIT FLOW

```text
Important Action
      ↓
Application Service
      ↓
Audit Event
      ↓
Audit Storage
      ↓
Admin / Authorized Review
```

---

# 104. ROLE-SPECIFIC ARCHITECTURAL VIEW

```text
                    SIH_26 PLATFORM
                           │
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                  ↓
     CITIZENS           INSTITUTIONS         INDUSTRY
        │                  │                  │
    Problems         Students/Faculty      Mentorship
    Community        Projects              Resources
    Feedback         Research              Collaboration
        │                  │                  │
        └──────────────────┼──────────────────┘
                           ↓
                      PROJECT ENGINE
                           │
                           ↓
                      AI ENGINE
                           │
                           ↓
                     IMPACT ENGINE
                           │
                           ↓
                    GOVERNMENT / ADMIN
```

---

# 105. MVP ARCHITECTURE

The MVP should keep the architecture manageable.

Core components:

```text
Frontend
Backend
Relational Database
AI Service
File Storage
Authentication
Notification System
```

Optional depending on implementation needs:

```text
Vector Search
Cache
Background Job Queue
Search Engine
```

---

# 106. MVP CORE FUNCTIONAL FLOW

```text
Citizen
 ↓
Problem
 ↓
AI Analysis
 ↓
Duplicate Detection
 ↓
Priority
 ↓
University Matching
 ↓
Project
 ↓
Student + Faculty
 ↓
Industry
 ↓
Milestones
 ↓
Feedback
 ↓
Impact
```

This is the minimum complete innovation lifecycle.

---

# 107. MVP VS FUTURE ARCHITECTURE

| Component            | MVP                | Future                   |
| -------------------- | ------------------ | ------------------------ |
| Frontend             | Yes                | Advanced                 |
| Backend              | Yes                | Scalable services        |
| Database             | Yes                | Distributed/optimized    |
| Authentication       | Yes                | Advanced identity        |
| AI Classification    | Yes                | Advanced models          |
| Duplicate Detection  | Yes                | Advanced semantic search |
| Matching             | Yes                | Learning recommendations |
| Project Management   | Yes                | Advanced collaboration   |
| Notifications        | Yes                | Multi-channel            |
| Search               | Basic              | Semantic + advanced      |
| Vector Store         | If required        | Yes                      |
| Analytics            | Basic              | Advanced                 |
| Maps                 | Optional           | Advanced                 |
| Multilingual         | Architecture-ready | Full                     |
| Voice                | No                 | Future                   |
| Predictive Analytics | No                 | Future                   |

---

# 108. TECHNOLOGY SELECTION PRINCIPLE

Technology choices must be based on:

* Team skill
* Development speed
* Cost
* Maintainability
* Community support
* Security
* Scalability
* AI integration
* Hackathon feasibility

Technology must not be selected merely because it is popular.

---

# 109. TECHNOLOGY STACK DECISION STATUS

At V0.2, the architecture defines responsibilities and boundaries.

The exact final stack should be documented separately after evaluating:

```text
Frontend Framework
Backend Framework
Database
AI Framework / Provider
Vector Database
Object Storage
Authentication
Hosting
Monitoring
```

No technology should be treated as final unless explicitly approved.

---

# 110. DEVELOPMENT ENVIRONMENT

The future development environment should separate:

```text
Local Development
      ↓
Testing
      ↓
Staging
      ↓
Production
```

Configuration must differ by environment.

Secrets must never be committed to source control.

---

# 111. CONFIGURATION MANAGEMENT

Configuration should include:

* Database connection
* AI provider settings
* Storage settings
* Authentication settings
* Email settings
* Environment mode

Sensitive values must use secure environment configuration.

---

# 112. SOURCE CONTROL ARCHITECTURE

The project should eventually follow:

```text
SIH_26/
│
├── docs/
├── frontend/
├── backend/
├── ai/
├── tests/
├── scripts/
└── README.md
```

This structure is architectural guidance only.

Actual folders should be created during the implementation phase.

---

# 113. DOCUMENTATION STRATEGY

The project documentation should eventually include:

```text
docs/
├── MASTER_BLUEPRINT.md
├── SYSTEM_ARCHITECTURE.md
├── DATABASE_DESIGN.md
├── API_SPECIFICATION.md
├── AI_ARCHITECTURE.md
├── UI_UX_SPECIFICATION.md
├── SECURITY.md
├── TESTING_STRATEGY.md
└── DEPLOYMENT.md
```

**Important:** These documents should be created progressively, not all at once.

---

# 114. ARCHITECTURAL TRACEABILITY

Every major implementation feature should map back to the master blueprint.

Example:

```text
Master Blueprint
       ↓
Requirement
       ↓
Architecture Component
       ↓
API
       ↓
Database
       ↓
UI
       ↓
Implementation
       ↓
Test
```

This prevents features from being accidentally omitted.

---

# 115. FEATURE TRACEABILITY EXAMPLE

### Requirement

Duplicate problem detection.

### Architecture

AI Similarity Service.

### Data

Problem embeddings + similarity results.

### API

Problem analysis endpoint.

### UI

Possible duplicate warning.

### Human workflow

Moderator review.

### Test

Submit semantically similar problems and verify correct detection.

---

# 116. ARCHITECTURAL RISKS

Potential risks:

1. AI API cost
2. AI hallucination
3. Incorrect matching
4. Duplicate false positives
5. Data privacy
6. File storage cost
7. Large-scale search
8. Notification reliability
9. Role/permission errors
10. Infrastructure complexity
11. Poor community participation
12. Insufficient real-world validation

---

# 117. RISK MITIGATION

### AI cost

Use asynchronous processing and caching.

### AI hallucination

Human verification for important outputs.

### Matching errors

Show reasons and allow manual override.

### Privacy

Apply role-based access and data minimization.

### Infrastructure complexity

Use modular monolith for MVP.

### Scale

Design clear service boundaries for future separation.

---

# 118. ARCHITECTURAL QUALITY GOALS

The system should be:

```text
Secure
Reliable
Maintainable
Scalable
Observable
Accessible
Modular
Explainable
Cost-conscious
Hackathon-feasible
```

---

# 119. COMPLETE ARCHITECTURAL PICTURE

```text
                              SIH_26
                                │
       ┌────────────────────────┼────────────────────────┐
       ↓                        ↓                        ↓
   CITIZENS                 INSTITUTIONS             INDUSTRY
       │                        │                        │
       ↓                        ↓                        ↓
  PROBLEMS                  STUDENTS                  MENTORS
  COMMUNITY                 FACULTY                  RESOURCES
  FEEDBACK                  PROJECTS                 COLLABORATION
       │                        │                        │
       └────────────────────────┼────────────────────────┘
                                ↓
                         PRESENTATION LAYER
                                ↓
                           API / GATEWAY
                                ↓
                      APPLICATION SERVICES
                                │
          ┌─────────────────────┼─────────────────────┐
          ↓                     ↓                     ↓
      PROBLEM                PROJECT              COLLABORATION
       ENGINE                 ENGINE                  ENGINE
          │                     │                     │
          └─────────────────────┼─────────────────────┘
                                ↓
                           AI ENGINE
                                │
       ┌────────────────────────┼────────────────────────┐
       ↓                        ↓                        ↓
 CLASSIFICATION            SIMILARITY                MATCHING
       ↓                        ↓                        ↓
 PRIORITY                 DUPLICATE                RECOMMENDATION
       │                        │                        │
       └────────────────────────┼────────────────────────┘
                                ↓
                            DATA LAYER
              ┌─────────────────┼─────────────────┐
              ↓                 ↓                 ↓
         SQL DATABASE       FILE STORAGE      VECTOR SEARCH
              │                 │                 │
              └─────────────────┼─────────────────┘
                                ↓
                         ANALYTICS / IMPACT
                                ↓
                         GOVERNMENT / ADMIN
                                ↓
                         DEPLOYMENT / SCALE
```

---

# 120. ARCHITECTURE STATUS

**Version:** V0.2

**Status:** Architecture specification

**Implementation:** Not started

**Database implementation:** Not started

**API implementation:** Not started

**Frontend implementation:** Not started

**AI implementation:** Not started

**Deployment:** Not started

---

# 121. NEXT ARCHITECTURAL DOCUMENT

The next planning artifact should be:

## DATABASE DESIGN V0.3

It will define:

* Complete ER diagram
* Every major entity
* Attributes
* Primary keys
* Foreign keys
* Relationships
* Cardinality
* Constraints
* Indexes
* User-role model
* Problem model
* AI analysis model
* Matching model
* Project model
* Collaboration model
* Notification model
* Feedback model
* Testing model
* Impact model
* Solution repository model
* Audit model

Only after the database design is sufficiently complete should we move toward implementation.

---

# END OF SYSTEM ARCHITECTURE V0.2

**SIH_26 — From Societal Problem to Collaborative Solution to Real-World Impact.**
