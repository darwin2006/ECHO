# SIH 26043 — Societal Innovation Platform

## Complete Project Documentation

**Version:** V0.1  
**Status:** Documentation Specification  
**Implementation Status:** Not Started  
**Problem Statement:** SIH 26043  
**Project Type:** AI-powered societal innovation and collaborative problem-solving platform

---

# 1. DOCUMENT PURPOSE

This document serves as the central documentation guide for the SIH 26043 platform.

It provides a structured reference for:

- Project vision
- Stakeholders
- Features
- Architecture
- Technology planning
- Development workflow
- Environment setup
- Frontend
- Backend
- Database
- AI
- Security
- Testing
- Deployment
- Maintenance
- Troubleshooting
- Future development

This document must evolve alongside the actual implementation.

---

# 2. IMPORTANT STATUS CONVENTION

Every technical feature must clearly identify its status.

Possible statuses:

- DESIGN — defined but not implemented
- PLANNED — implementation planned
- IN DEVELOPMENT — currently being implemented
- TESTING — implemented and being tested
- IMPLEMENTED — completed
- DEPRECATED — no longer recommended

No feature should be described as implemented unless it actually exists and has been verified.

---

# 3. PROJECT OVERVIEW

The SIH 26043 platform is designed to crowdsource societal challenges and connect them with organizations capable of solving them.

The platform connects:

- Citizens
- Communities
- Universities
- Colleges
- Students
- Faculty
- Industry
- Startups
- Government
- Administrators

The platform covers the complete lifecycle:

Problem identification
↓
Problem submission
↓
AI understanding
↓
Validation
↓
Duplicate detection
↓
Prioritization
↓
Institution matching
↓
Student/faculty matching
↓
Team formation
↓
Industry collaboration
↓
Project execution
↓
Testing
↓
Deployment
↓
Impact measurement

---

# 4. PROJECT VISION

The long-term vision is to create a scalable digital ecosystem where societal problems can be transformed into collaborative projects.

The platform should answer:

Citizen:
"Who can help solve this problem?"

Student:
"Which real-world problem can I contribute to?"

Faculty:
"Which team or project can I mentor?"

Institution:
"Which societal problems are we capable of solving?"

Industry:
"Where can our expertise or resources create impact?"

Government:
"Which problems require attention and what progress is being made?"

Administrator:
"Is the platform operating correctly?"

---

# 5. STAKEHOLDER ROLES

## 5.1 Citizen / Community

Capabilities:

- Register
- Submit problems
- Track submissions
- View problem status
- Support relevant problems where permitted
- Participate in discussions
- View project progress
- View final impact

---

## 5.2 Student

Capabilities:

- Create profile
- Add skills
- Discover problems
- Receive AI recommendations
- Apply to projects
- Join teams
- Work on tasks
- Track milestones
- Build project portfolio
- View impact

---

## 5.3 Faculty

Capabilities:

- Create expertise profile
- Discover relevant problems
- Mentor teams
- Review projects
- Monitor milestones
- Provide feedback
- Collaborate with industry
- Support research/innovation

---

## 5.4 University / College

Capabilities:

- Register institution
- Verification
- Manage departments
- Manage faculty/student participation
- Maintain capability profile
- View matched problems
- Participate in projects
- Collaborate with industry
- View institutional impact

---

## 5.5 Industry / Startup

Capabilities:

- Register organization
- Verification
- Create capability profile
- Discover collaboration opportunities
- Support projects
- Provide expertise
- Provide resources
- Mentor teams
- Collaborate with institutions

---

## 5.6 Government

Capabilities:

- Define priority areas
- Review societal challenges
- Monitor projects
- Analyze regional problems
- Analyze domain trends
- View impact
- Support strategic initiatives

---

## 5.7 Administrator

Capabilities:

- Manage users
- Verify institutions
- Verify organizations
- Moderate problems
- Review AI recommendations
- Manage projects
- Monitor system
- View analytics
- Audit important actions

---

# 6. CORE PLATFORM MODULES

The platform consists conceptually of:

1. Authentication
2. User Management
3. Organization Management
4. Problem Management
5. AI Intelligence
6. Problem Prioritization
7. Institution Matching
8. Student Matching
9. Faculty Matching
10. Team Management
11. Industry Collaboration
12. Government Oversight
13. Project Management
14. Milestone Management
15. Notifications
16. Search
17. Analytics
18. Impact Measurement
19. Administration
20. Audit and Security

---

# 7. DOCUMENTATION STRUCTURE

Related technical specifications are maintained in separate documents.

## MASTER_BLUEPRINT.md

Contains:

- Complete project vision
- Requirements
- Stakeholders
- Features
- Workflows

## SYSTEM_ARCHITECTURE.md

Contains:

- System architecture
- Components
- Services
- Communication
- Deployment architecture

## DATABASE_DESIGN.md

Contains:

- Entities
- Relationships
- Data model
- Database strategy

## API_DESIGN.md

Contains:

- API structure
- Request/response concepts
- Authentication
- Service communication

## AI_DESIGN.md

Contains:

- AI pipeline
- Classification
- Duplicate detection
- Matching
- Ranking
- Explainability

## SECURITY_DESIGN.md

Contains:

- Authentication
- Authorization
- Privacy
- Threat protection
- Audit

## SCALABILITY_AND_INTELLIGENCE_DESIGN.md

Contains:

- 200+ college scalability
- Large-scale problem processing
- Capability matching
- Ranking
- Search
- AI scalability
- Performance

## UI_UX_DESIGN.md

Contains:

- Visual system
- User journeys
- Dashboards
- Responsive design
- Accessibility
- Performance-first UX

---

# 8. REPOSITORY STRUCTURE

The intended project structure is:

SIH_26/
│
├── docs/
│   ├── MASTER_BLUEPRINT.md
│   ├── SYSTEM_ARCHITECTURE.md
│   ├── DATABASE_DESIGN.md
│   ├── API_DESIGN.md
│   ├── AI_DESIGN.md
│   ├── SECURITY_DESIGN.md
│   ├── SCALABILITY_AND_INTELLIGENCE_DESIGN.md
│   ├── UI_UX_DESIGN.md
│   └── DOCUMENTATION.md
│
├── frontend/
│
├── backend/
│
├── ai/
│
├── database/
│
├── tests/
│
├── deployment/
│
└── README.md

The exact implementation structure will be finalized before coding.

---

# 9. DEVELOPMENT PHASES

The project should be developed incrementally.

## Phase 0 — Planning

Status:

IMPLEMENTED

Completed:

- Problem analysis
- Platform vision
- Stakeholder definition
- Core workflows
- Design specifications

---

## Phase 1 — Architecture Finalization

Status:

PLANNED

Tasks:

- Finalize technology stack
- Finalize service boundaries
- Finalize database implementation
- Finalize API contracts
- Finalize AI architecture
- Finalize security architecture
- Finalize deployment architecture

---

## Phase 2 — Project Foundation

Status:

PLANNED

Tasks:

- Initialize frontend
- Initialize backend
- Configure database
- Configure development environment
- Configure source control
- Configure testing

---

## Phase 3 — Authentication

Status:

PLANNED

Tasks:

- Registration
- Login
- Logout
- Password recovery
- Role management
- Authorization

---

## Phase 4 — Problem Management

Status:

PLANNED

Tasks:

- Problem submission
- Problem editing
- Problem tracking
- Problem discovery
- Problem moderation

---

## Phase 5 — AI Intelligence

Status:

PLANNED

Tasks:

- Classification
- Skill extraction
- Duplicate detection
- Priority scoring
- Similarity
- Explainability

---

## Phase 6 — Matching

Status:

PLANNED

Tasks:

- Problem → College
- Problem → Department
- Problem → Student
- Problem → Faculty
- Problem → Industry
- Cross-college matching

---

## Phase 7 — Team & Project Management

Status:

PLANNED

Tasks:

- Team formation
- Task management
- Milestones
- Collaboration
- File sharing
- Project tracking

---

## Phase 8 — Analytics

Status:

PLANNED

Tasks:

- Government dashboard
- Institution analytics
- Project analytics
- Impact analytics

---

## Phase 9 — Testing

Status:

PLANNED

Tasks:

- Unit tests
- Integration tests
- API tests
- UI tests
- AI evaluation
- Security testing
- Performance testing

---

## Phase 10 — Deployment

Status:

PLANNED

Tasks:

- Production infrastructure
- Database deployment
- Backend deployment
- Frontend deployment
- AI service deployment
- Monitoring
- Backup

---

# 10. TECHNOLOGY STACK

The exact production stack has NOT been finalized at this stage.

The following categories must eventually be documented:

Frontend:
- Framework
- Language
- UI library
- State management
- Routing

Backend:
- Framework
- Language
- API architecture
- Authentication

Database:
- Primary database
- Search/indexing
- Cache

AI:
- Model/provider
- Embedding system
- Vector search
- AI processing workers

Infrastructure:
- Hosting
- Storage
- CDN
- Monitoring
- CI/CD

Do not add specific technologies until the stack is officially selected.

---

# 11. LOCAL DEVELOPMENT REQUIREMENTS

The final implementation documentation must specify:

- Operating system requirements
- Runtime versions
- Package manager
- Database requirements
- AI service requirements
- Environment variables
- Required accounts
- Required API keys

These values must be documented only after the actual stack is finalized.

---

# 12. ENVIRONMENT CONFIGURATION

The project will use environment-specific configuration.

Conceptual environments:

Development
Testing
Staging
Production

Sensitive values must never be committed to source control.

Examples of sensitive values:

- Database passwords
- API keys
- Authentication secrets
- AI provider keys
- Storage credentials

The exact environment variable names will be documented after implementation.

---

# 13. FRONTEND DOCUMENTATION

Frontend documentation should eventually contain:

- Installation
- Development server
- Folder structure
- Routing
- Components
- State management
- API integration
- Authentication handling
- UI design system
- Accessibility
- Testing
- Production build

Exact commands must be added only after framework selection.

---

# 14. BACKEND DOCUMENTATION

Backend documentation should eventually contain:

- Installation
- Configuration
- Project structure
- API architecture
- Authentication
- Authorization
- Database access
- Validation
- Error handling
- Logging
- Background jobs
- Testing
- Deployment

---

# 15. DATABASE DOCUMENTATION

Database documentation should eventually include:

- Database engine
- Schema
- Tables/entities
- Relationships
- Indexes
- Constraints
- Migrations
- Seed data
- Backup strategy
- Recovery strategy

Refer to DATABASE_DESIGN.md for conceptual design.

---

# 16. AI SERVICE DOCUMENTATION

AI documentation defines the Phase 1.5–1.13 Hybrid AI Architecture & Model Specifications:

- **Hybrid AI Architecture:** Explicit separation of deterministic scoring/matching algorithms, lightweight ML/NLP, 768-D embeddings, selective LLM reasoning, and Human-in-the-Loop review.
- **Multilingual-First Architecture:** English and Tamil initial priority; extensible to Hindi, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, Punjabi, Odia, Assamese, etc. Shared multilingual semantic architecture.
- **Asynchronous Processing & Fault Isolation:** HTTP 202 async responses, background queue processing (Redis/RabbitMQ). Worker downtime never causes citizen problem data loss.
- **Pluggable 768-D Embedding Interface:** PostgreSQL + `pgvector` (HNSW ANN index). Primary benchmark candidate: `Granite Embedding Multilingual R2 311M` (with `EmbeddingGemma` and `Tamil-Embed-Base` evaluated).
- **Selective LLM Strategy:** Local benchmark candidate `Dhee-NxtGen-Qwen3-Indic 4B` / `Qwen3-4B` (4-bit quantized for ~16GB RAM hardware). Pluggable cloud LLM abstraction.
- **Deterministic 7-Factor Priority Scoring:** Severity + Population Impact + Urgency + Community Support + Government Alignment + Feasibility - Duplicate Penalty (not LLM generated).
- **Intelligent Multi-Factor College Matching:** 16 criteria, Capability vs. Practical Capacity distinction, "Best Match ≠ Highest Single Skill Score", Ranked Shortlists (#1 Best Match, #2 Alternative, #3 ...).
- **Grounded Explainability Engine:** Data-verified natural language explanations generated strictly from verified database records (zero LLM hallucination).
- **Human-in-the-Loop & Feedback Loop:** Triggers for low confidence (< 0.70), near-ties (< 3% delta), and moderation edge cases. Human corrections saved to `validated_feedback_data`.
- **Model Registry & Versioning:** Full traceability (`model_id`, `model_version`, `deployment_type`, `benchmark_metrics`) in `ai_model_registry`.
- **AI Observability & Cost Model:** Latency, RAM/CPU, queue depth, fallback rate monitoring. ₹0-cost local development model execution.
- **Empirical AI Benchmark Plan:** Evaluation suite testing multilingual similarity, classification F1, skill precision/recall, LLM JSON validity, hallucination rate, and hardware performance (documented as tests to be run).

Refer to `AI_DESIGN.md`, `SCALABILITY_AND_INTELLIGENCE_DESIGN.md`, `MASTER_BLUEPRINT.md`, `SYSTEM_ARCHITECTURE.md`, `DATABASE_DESIGN.md`, `API_DESIGN.md`, and `UI_UX_DESIGN.md`.

---

# 17. AUTHENTICATION DOCUMENTATION

Authentication documentation should explain:

- Registration
- Login
- Logout
- Password recovery
- Session management
- Token handling
- Role assignment
- Authorization

Never document secrets or credentials.

---

# 18. ROLE AND PERMISSION DOCUMENTATION

A role-permission matrix is maintained based on the canonical System Authorization Roles (`COMMUNITY_MEMBER`, `STUDENT`, `FACULTY`, `UNIVERSITY_ADMIN`, `INDUSTRY_PARTNER`, `GOVERNMENT_OFFICIAL`, `MODERATOR`, `SUPER_ADMIN`).

Example:

| Feature | COMMUNITY_MEMBER | STUDENT | FACULTY | UNIVERSITY_ADMIN | INDUSTRY_PARTNER | GOVERNMENT_OFFICIAL | MODERATOR / SUPER_ADMIN |
|---|---|---|---|---|---|---|---|
| Submit Problem | Yes | Yes where allowed | Yes where allowed | Yes | Yes where allowed | Yes | Yes |
| View Public Problems | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Manage Teams | No | Limited | Yes | Yes | Limited | No | Yes |
| Manage Projects | No | Limited | Yes | Yes | Limited | Oversight | Yes |
| AI Review | No | No | No | No | No | Limited | Yes |
| System Administration | No | No | No | No | No | No | Yes |

Final permissions follow `SECURITY_DESIGN.md` and actual backend RBAC enforcement.

---

# 19. PROBLEM LIFECYCLE

Canonical `ProblemStatus` Lifecycle (Authoritative Source of Truth):

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

---

# 20. PROJECT LIFECYCLE

Conceptual lifecycle:

Proposed
↓
Approved
↓
Team Formation
↓
Planning
↓
Development
↓
Prototype
↓
Testing
↓
Review
↓
Deployment
↓
Monitoring
↓
Completed
↓
Impact Measurement

---

# 21. AI PROCESSING LIFECYCLE

Problem submission:

Problem Created
↓
AI Job Queued
↓
Classification
↓
Skill Extraction
↓
Similarity Analysis
↓
Priority Analysis
↓
Matching
↓
Recommendation
↓
Human Review where required

AI processing should run asynchronously where possible.

---

# 22. PERFORMANCE DOCUMENTATION

Performance documentation must eventually record:

- API latency
- Database latency
- Search latency
- AI processing latency
- Background job processing
- Concurrent users
- Error rates
- Resource usage

The platform should prioritize a fast user experience.

Avoid unnecessary loading/buffering.

Use:

- Caching
- Pagination
- Lazy loading
- Optimistic UI
- Background jobs
- Efficient queries
- Asynchronous AI

---

# 23. SCALABILITY DOCUMENTATION

The architecture must support:

Initial:
200+ colleges

Future:
500+ colleges

Future:
1,000+ colleges

Long-term:
National-scale deployment

The platform must also support large numbers of:

- Users
- Problems
- Projects
- Teams
- Documents
- AI jobs
- Notifications

Refer to SCALABILITY_AND_INTELLIGENCE_DESIGN.md.

---

# 24. SEARCH DOCUMENTATION

Search should eventually support:

- Keyword search
- Semantic search
- Filters
- Sorting
- Domains
- Locations
- Skills
- Colleges
- Projects
- Industry

Search infrastructure should be scalable.

---

# 25. NOTIFICATION DOCUMENTATION

Notification system should eventually support:

- In-app notifications
- Email
- Push notifications where appropriate

Events include:

- Problem updates
- Team invitations
- Project updates
- Milestones
- Mentions
- Collaboration requests
- Review decisions

---

# 26. FILE AND MEDIA MANAGEMENT

The system may support:

- Problem attachments
- Project documents
- Images
- Evidence
- Reports
- Technical files

The implementation must define:

- File size limits
- Allowed types
- Storage
- Access control
- Virus/malware scanning where appropriate
- Retention
- Deletion

---

# 27. TESTING DOCUMENTATION

Testing must eventually cover:

## Unit Testing

Individual functions/components.

## Integration Testing

Interaction between modules/services.

## API Testing

Request/response behavior.

## UI Testing

User workflows.

## AI Testing

- Classification accuracy
- Duplicate detection quality
- Matching quality
- Recommendation quality
- Bias/fairness
- Confidence

## Security Testing

- Authentication
- Authorization
- Input validation
- Access control
- Injection protection
- Rate limiting

## Performance Testing

- Load testing
- Stress testing
- Search testing
- AI queue testing

---

# 28. TEST DATA

Development/testing environments must use safe test data.

Do not use real sensitive user information for testing unless explicitly authorized and properly protected.

---

# 29. LOGGING

Production systems should maintain structured logs for:

- Errors
- Warnings
- Important events
- Authentication events
- Background jobs
- AI processing
- Administrative actions

Sensitive information must not be unnecessarily logged.

---

# 30. MONITORING

Monitor:

- Application health
- API health
- Database health
- AI service health
- Queue health
- Search health
- Error rates
- Latency
- Resource usage

---

# 31. BACKUP AND RECOVERY

The final production documentation must define:

- Database backup frequency
- Backup retention
- File backup strategy
- Recovery procedure
- Disaster recovery
- Recovery testing

Exact values will be finalized during deployment planning.

---

# 32. SECURITY DOCUMENTATION

Security requirements include:

- Strong authentication
- Role-based authorization
- Organization-level access control
- Input validation
- Secure file handling
- Rate limiting
- Audit logging
- Secure secrets management
- Encryption where appropriate
- Privacy controls

Refer to SECURITY_DESIGN.md.

---

# 33. PRIVACY DOCUMENTATION

Document:

- Public data
- Private data
- Organization data
- Student information
- Faculty information
- Project information
- Government-sensitive information
- Data retention
- User privacy controls

---

# 34. DEPLOYMENT DOCUMENTATION

The final deployment guide must contain:

- Infrastructure requirements
- Build process
- Environment configuration
- Database deployment
- Backend deployment
- Frontend deployment
- AI service deployment
- Storage
- Domain configuration
- HTTPS
- Monitoring
- Backup
- Rollback

Exact provider-specific instructions will be added after deployment architecture is finalized.

---

# 35. CI/CD

Future CI/CD should automate:

- Code validation
- Tests
- Build
- Security checks
- Deployment

Production deployment should require appropriate approvals.

---

# 36. VERSION CONTROL

Use Git-based version control.

Development should follow a controlled workflow.

Conceptual branches:

main
development
feature branches

Exact branching strategy will be finalized during implementation.

---

# 37. CODE QUALITY

Implementation should follow:

- Clear naming
- Modular design
- Reusable components
- Small functions
- Validation
- Error handling
- Documentation
- Testing
- Security best practices

Avoid unnecessary duplication.

---

# 38. ISSUE MANAGEMENT

Development issues should be categorized:

- Bug
- Feature
- Improvement
- Security
- Performance
- Documentation

Critical issues should receive higher priority.

---

# 39. TROUBLESHOOTING

The final documentation should eventually contain solutions for common issues such as:

- Frontend startup failure
- Backend startup failure
- Database connection failure
- Authentication problems
- AI service failure
- Search failure
- File upload failure
- Environment configuration errors
- Build errors
- Deployment errors

Solutions must be based on actual implementation rather than guesses.

---

# 40. AI FAILURE RECOVERY

If AI becomes unavailable:

The platform should continue operating where possible.

Fallback:

AI unavailable
↓
Problem remains stored
↓
Manual review / basic processing
↓
AI processing can resume later

AI failure must not make the entire platform unusable.

---

# 41. DATA CONSISTENCY

Important workflows must preserve data integrity.

Examples:

- Problem submission
- Team formation
- Project creation
- Milestone updates
- Collaboration approvals

Use appropriate transactional mechanisms.

---

# 42. AUDITABILITY

Important actions should be auditable.

Record where appropriate:

- Actor
- Action
- Timestamp
- Object
- Previous state
- New state

Audit information must be protected from unauthorized modification.

---

# 43. DOCUMENTATION MAINTENANCE

Whenever implementation changes:

Relevant documentation must also be updated.

Examples:

API changes
→ Update API documentation

Database changes
→ Update database documentation

AI changes
→ Update AI documentation

UI changes
→ Update UI/UX documentation

Deployment changes
→ Update deployment documentation

---

# 44. DOCUMENTATION VERSIONING

Each major documentation update should include:

- Version
- Date
- Summary of changes
- Status

---

# 45. CHANGE LOG

Initial:

V0.1
- Documentation structure created
- Core platform scope documented
- Development phases documented
- Documentation dependencies defined

Future changes must be added here.

---

# 46. IMPLEMENTATION READINESS CHECKLIST

Before coding begins:

[ ] Master blueprint reviewed
[ ] Architecture reviewed
[ ] Database design reviewed
[ ] API design reviewed
[ ] AI design reviewed
[ ] Security design reviewed
[ ] Scalability design reviewed
[ ] UI/UX design reviewed
[ ] Technology stack finalized
[ ] Development environment defined
[ ] MVP scope finalized

---

# 47. PRE-PRODUCTION CHECKLIST

Before production:

[ ] Authentication tested
[ ] Authorization tested
[ ] Database migrations tested
[ ] APIs tested
[ ] AI processing tested
[ ] Duplicate detection evaluated
[ ] Matching evaluated
[ ] Security tested
[ ] Performance tested
[ ] Responsive UI tested
[ ] Accessibility tested
[ ] Backup tested
[ ] Monitoring configured
[ ] Error handling verified
[ ] Recovery procedure tested

---

# 48. PRODUCTION READINESS

The platform should not be considered production-ready until:

- Core functionality works
- Security is validated
- Performance is acceptable
- AI behavior is evaluated
- Data backup exists
- Monitoring exists
- Error recovery exists
- Documentation is updated
- Deployment is reproducible

---

# 49. FUTURE ENHANCEMENTS

Potential future capabilities:

- Advanced multilingual support
- Tamil-first workflows
- More Indian languages
- Advanced AI agents
- Advanced recommendation models
- Real-time collaboration
- Mobile application
- Advanced analytics
- Government integrations
- Industry APIs
- External academic integrations
- Advanced geographic intelligence
- National-scale deployment

These remain future possibilities until officially added to project scope.

---

# 50. IMPORTANT DESIGN RULE

Do not implement every future feature immediately.

The platform should be developed incrementally.

Priority:

Core platform
↓
AI intelligence
↓
Matching
↓
Collaboration
↓
Analytics
↓
Advanced capabilities

---

# 51. PROJECT QUALITY PRINCIPLE

The project should prioritize:

Correctness
+
Security
+
Performance
+
Usability
+
Explainability
+
Scalability
+
Maintainability

rather than simply maximizing the number of features.

---

# 52. FINAL SYSTEM CONCEPT

The platform transforms:

Societal Problems

into:

AI-understood challenges

then:

Prioritized opportunities

then:

Institution matches

then:

Student/faculty teams

then:

Industry collaboration

then:

Real projects

then:

Real-world solutions

then:

Measured societal impact

---

# 53. FINAL DOCUMENTATION STATUS

Document:

DOCUMENTATION.md

Version:

V0.1

Status:

DOCUMENTATION SPECIFICATION

Implementation:

NOT STARTED

This document intentionally does not contain invented framework-specific commands, credentials, API endpoints or environment variables.

Those details must be added after the actual technology stack and implementation are finalized.

# END OF DOCUMENTATION.md
