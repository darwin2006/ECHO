# SIH_26 — MASTER BLUEPRINT

**Version:** V0.1
**Status:** Planning / Functional Blueprint
**Problem Statement:** SIH 26043
**Theme:** A digital platform to crowdsource societal challenges and facilitate collaborative problem solving through universities and industry partnerships.

---

# 1. PROJECT OVERVIEW

## 1.1 Project Vision

SIH_26 is an AI-powered societal innovation platform that connects:

* Citizens and communities who identify real-world problems
* Universities and colleges that provide academic expertise
* Students and faculty who collaboratively develop solutions
* Industries and startups that provide technology, mentorship, resources, and deployment support
* Government departments and administrators who monitor societal challenges, coordinate stakeholders, and evaluate impact

The platform is designed to transform a societal problem from a simple complaint into a structured, trackable innovation project.

### Core lifecycle

```text
REAL-WORLD PROBLEM
       ↓
Citizen / Community Submission
       ↓
AI Analysis
       ↓
Classification + Prioritization
       ↓
Duplicate / Similar Problem Detection
       ↓
Skill & Technology Extraction
       ↓
University / Department Matching
       ↓
Project Formation
       ↓
Student + Faculty Team Formation
       ↓
Industry / Startup Collaboration
       ↓
Solution Development
       ↓
Milestones + Progress Tracking
       ↓
Prototype / Testing
       ↓
Validation
       ↓
Government / Stakeholder Review
       ↓
Deployment / Implementation
       ↓
Impact Measurement
       ↓
Knowledge / Solution Repository
```

---

# 2. PROBLEM STATEMENT

Societal problems are often identified by citizens, communities, institutions, or government bodies, but there is no unified mechanism that efficiently converts these problems into collaborative innovation projects.

Existing situations may suffer from:

* Problems being reported without reaching suitable experts
* Similar problems being submitted repeatedly
* Universities not knowing which real-world problems need solutions
* Students working on projects disconnected from actual societal needs
* Faculty having difficulty finding suitable industry collaboration
* Industries lacking structured access to university innovation projects
* Government departments having limited visibility into solution progress
* Lack of transparent project tracking
* Fragmented communication between stakeholders
* Difficulty measuring actual social impact
* Valuable completed solutions becoming difficult to discover or reuse

SIH_26 addresses this gap by creating one connected ecosystem.

---

# 3. CORE OBJECTIVE

The platform should:

1. Collect genuine societal problems.
2. Structure unstructured problem descriptions using AI.
3. Identify problem categories and urgency.
4. Detect duplicate and similar submissions.
5. Extract required skills, technologies, domains, and resources.
6. Match problems with suitable universities and departments.
7. Enable students and faculty to form solution teams.
8. Connect projects with relevant industries and startups.
9. Provide structured project management.
10. Track milestones and progress.
11. Enable prototype development and testing.
12. Facilitate validation and stakeholder feedback.
13. Enable government/admin monitoring.
14. Measure social and project impact.
15. Preserve successful solutions in a reusable knowledge repository.

---

# 4. STAKEHOLDER ECOSYSTEM

The platform has six major stakeholder groups.

```text
                         ┌─────────────────────┐
                         │ GOVERNMENT / ADMIN   │
                         └──────────┬──────────┘
                                    │
                                    │ Monitoring
                                    ↓
┌───────────────┐          ┌─────────────────────┐          ┌──────────────────┐
│ CITIZENS /    │ ───────→ │     SIH_26          │ ←─────── │ INDUSTRY /       │
│ COMMUNITIES   │          │ AI INNOVATION HUB   │          │ STARTUPS         │
└───────────────┘          └──────────┬──────────┘          └──────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ↓                               ↓
          ┌──────────────────┐             ┌──────────────────┐
          │ UNIVERSITIES /   │             │ STUDENTS +       │
          │ COLLEGES         │             │ FACULTY          │
          └──────────────────┘             └──────────────────┘
```

---

# 5. USER ROLES

The platform distinguishes between **Stakeholder Categories** (functional user groups) and **Canonical System Authorization Roles** (technical RBAC permissions).

### System Authorization Role Mapping:
- **Citizen / Community** → `COMMUNITY_MEMBER`
- **Student** → `STUDENT`
- **Faculty** → `FACULTY`
- **University / College** → `UNIVERSITY_ADMIN`
- **Industry / Startup** → `INDUSTRY_PARTNER`
- **Government** → `GOVERNMENT_OFFICIAL`
- **Admin / Moderator** → `MODERATOR` / `SUPER_ADMIN`

Canonical System Roles (`COMMUNITY_MEMBER`, `STUDENT`, `FACULTY`, `UNIVERSITY_ADMIN`, `INDUSTRY_PARTNER`, `GOVERNMENT_OFFICIAL`, `MODERATOR`, `SUPER_ADMIN`) serve as the authoritative source of truth for authorization logic across API, Database, and Security boundaries.

## 5.1 Citizen / Community

Citizens are the primary source of real-world societal problems.

### Capabilities

* Register/login
* Create profile
* Submit problems
* Add problem title
* Describe problem
* Select or suggest location
* Upload photographs
* Upload videos/documents when supported
* Select category
* Indicate severity
* Indicate affected population
* Report approximate number of affected people
* Submit anonymously where permitted
* Track submitted problems
* View status
* Follow problems
* Upvote/support problems
* Comment
* Provide additional information
* Respond to clarification requests
* View publicly available solutions
* Give feedback after solution implementation
* Report incorrect information

### Canonical ProblemStatus Lifecycle (Authoritative Source of Truth)

The platform enforces one unified canonical lifecycle across database schemas, API contracts, AI state transitions, and workflow engines:

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

# 6. COMMUNITY FEATURES

The platform should not be limited to individual citizens.

Community organizations may:

* Submit collective problems
* Represent multiple citizens
* Provide supporting evidence
* Endorse existing problems
* Participate in discussions
* Provide local validation
* Participate in pilot testing
* Report implementation feedback

### Community support mechanism

Multiple users can support the same issue.

Example:

```text
Problem:
"Flooding near XYZ locality"

Support:
1,284 citizens

Affected population:
~8,000

Severity:
High

Location:
XYZ locality

Status:
University team developing drainage prediction solution
```

This helps prioritize problems based on actual community demand.

---

# 7. UNIVERSITY / COLLEGE ROLE

Universities and colleges are major solution-development hubs.

## Institution capabilities

* Institution registration
* Institution verification
* Institution profile
* Departments
* Faculty
* Students
* Research areas
* Available laboratories
* Equipment/resources
* Expertise
* Existing projects
* Innovation centers
* Incubators

## University dashboard

The dashboard should display:

* Recommended problems
* Active projects
* Available students
* Faculty expertise
* Department projects
* Industry opportunities
* Pending collaboration requests
* Project progress
* Upcoming milestones
* Completed projects
* Impact statistics

---

# 8. DEPARTMENT ROLE

Each university can contain multiple departments.

Example:

```text
University
│
├── CSE
├── ECE
├── EEE
├── Mechanical
├── Civil
├── Biotechnology
├── AI & Data Science
└── Other Departments
```

Departments can:

* View relevant problems
* Assign faculty
* Invite students
* Create teams
* Review proposals
* Track projects
* Request industry support
* Maintain expertise profiles
* Recommend projects
* Evaluate technical progress

---

# 9. STUDENT ROLE

Students are solution builders.

## Student profile

A student can maintain:

* Name
* Education
* Department
* Year
* Skills
* Programming languages
* Hardware skills
* Research interests
* Projects
* Certifications
* Achievements
* Portfolio
* Availability
* Preferred domains

### Student capabilities

* Browse problems
* Receive AI recommendations
* Express interest
* Join projects
* Create teams
* Invite teammates
* Apply to projects
* Track assigned tasks
* Update task status
* Upload work
* Submit prototypes
* Participate in discussions
* Communicate with faculty
* Communicate with industry mentors
* Maintain project portfolio
* Receive project recognition

---

# 10. FACULTY ROLE

Faculty members act as mentors, reviewers, and domain experts.

### Faculty profile

* Department
* Expertise
* Research interests
* Publications
* Projects
* Skills
* Technologies
* Experience

### Faculty capabilities

* View matched problems
* Recommend projects
* Approve student teams
* Create project teams
* Assign tasks
* Mentor students
* Review milestones
* Approve submissions
* Request industry mentorship
* Evaluate prototypes
* Provide technical feedback
* Communicate with stakeholders
* Approve project completion

---

# 11. INDUSTRY / STARTUP ROLE

Industries and startups provide practical expertise and implementation support.

## Industry profile

* Company information
* Industry sector
* Technologies
* Expertise
* Products
* Services
* Available mentors
* Available resources
* Areas of interest
* Collaboration preferences

## Industry capabilities

* Discover relevant projects
* Search problems
* Offer mentorship
* Join projects
* Sponsor projects
* Provide technology
* Provide APIs
* Provide datasets
* Provide hardware
* Provide cloud resources
* Offer internships
* Offer deployment support
* Evaluate prototypes
* Become implementation partner

---

# 12. INDUSTRY COLLABORATION WORKFLOW

```text
Project
   ↓
AI identifies industry relevance
   ↓
Recommended companies / startups
   ↓
Industry views project
   ↓
Industry expresses interest
   ↓
University approves collaboration
   ↓
Collaboration workspace created
   ↓
Mentor assigned
   ↓
Resources exchanged
   ↓
Prototype development
   ↓
Industry evaluation
   ↓
Deployment / commercialization opportunity
```

---

# 13. GOVERNMENT / ADMIN ROLE

Government/admin users provide platform-level governance and monitoring.

## Admin capabilities

* Verify institutions
* Verify organizations
* Moderate problems
* Manage categories
* Monitor projects
* Monitor regions
* View analytics
* Manage users
* Review flagged content
* Monitor societal impact
* Approve official initiatives
* View high-priority problems
* Coordinate departments
* Generate reports
* Track implementation
* Identify regional problem trends

---

# 14. GOVERNMENT DASHBOARD

The government dashboard should provide:

### National / Regional overview

* Total problems
* Active problems
* Resolved problems
* High-priority problems
* Projects in development
* Projects in testing
* Implemented solutions
* Participating institutions
* Participating companies
* Student participation
* Community participation

### Geographic analytics

```text
India
 ├── State
 │    ├── District
 │    │    ├── City
 │    │    └── Locality
```

Government can identify problem hotspots.

Example:

```text
Tamil Nadu

Water:
████████████

Waste:
████████

Traffic:
███████

Healthcare:
██████

Education:
█████
```

---

# 15. HYBRID AI ENGINE & MULTILINGUAL ARCHITECTURE

AI is a core intelligence layer of SIH_26 designed to assist—never replace—human decision-making.

### Architectural Core Principles:
1. **Hybrid AI Architecture:** Explicitly separates deterministic algorithms (7-Factor Priority Engine, 16-Factor College Matching Engine), lightweight ML/NLP (multilingual classification, skill/entity extraction, 768-D embeddings), selective LLM reasoning (complex extraction, ambiguous requirement clarification, grounded explanations), and Human-in-the-Loop review.
2. **Multilingual-First Architecture:** Shared semantic architecture supporting English, Tamil (initial priority), and extensible to all Indian languages (Hindi, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, Punjabi, Odia, Assamese, etc.).
3. **Asynchronous & Fault-Tolerant:** AI processing executes via background queues (HTTP 202 Accepted). AI service downtime NEVER causes citizen problem data loss.
4. **Pluggable & Provider-Agnostic:** 768-D embedding interface (Granite Embedding Multilingual R2 311M primary benchmark candidate) and LLM layer (`Dhee-NxtGen-Qwen3-Indic 4B` local benchmark candidate) remain pluggable for optional cloud upgrades.
5. **₹0-Cost Open-Source Strategy:** Designed for local 4B-class 4-bit quantized model inference on ~16GB RAM hardware.
6. **Grounded Explainability & Model Registry:** All explanations are generated strictly from verified database facts (zero LLM hallucination). AI outputs are traceable to model ID and version in an AI Model Registry.

---

# 16. AI FEATURE 1 — PROBLEM CLASSIFICATION

When a citizen submits:

> "Our area has frequent flooding whenever heavy rain occurs because the drainage system gets blocked."

AI can extract:

```text
Category:
Environment / Infrastructure

Subcategory:
Urban Flooding

Problem Type:
Drainage

Severity:
High

Location:
Extracted from submission if available

Potential Domains:
Civil Engineering
IoT
AI/ML
Environmental Engineering
```

---

# 17. AI FEATURE 2 — PROBLEM PRIORITIZATION

AI calculates a priority score based on the authoritative 7-factor model specified in `SCALABILITY_AND_INTELLIGENCE_DESIGN.md`:

1. **Societal Impact:** Population reach, severity, and depth of social benefit.
2. **Urgency:** Time sensitivity and immediate hazard level.
3. **Feasibility:** Technical capability and practical execution likelihood.
4. **Community Demand / Support:** Upvotes, endorsements, and verified community reports.
5. **Geographic Relevance:** Locality, regional priority, and location sensitivity.
6. **Government Alignment:** Alignment with official government priority directives.
7. **Duplicate Penalty:** Penalty applied if similar active projects already exist.

Formula (Authoritative Source of Truth):

$$\text{Priority Score} = w_1 \cdot \text{Severity} + w_2 \cdot \text{Population Impact} + w_3 \cdot \text{Urgency} + w_4 \cdot \text{Community Support} + w_5 \cdot \text{Government Alignment} + w_6 \cdot \text{Feasibility} - w_7 \cdot \text{Duplicate Penalty}$$

AI recommends scores; human administrators can review and override them.

The exact formula can be refined during architecture.

---

# 18. AI FEATURE 3 — DUPLICATE DETECTION

The system should identify whether a new submission is:

* Exact duplicate
* Near duplicate
* Related problem
* Completely new problem

Example:

```text
Problem A:
"Road near school floods during rain."

Problem B:
"Water accumulates near XYZ school whenever it rains."

AI:
High similarity → Possible duplicate
```

Instead of creating another isolated problem, the system can recommend:

> "A similar problem already exists. Would you like to support it or add additional information?"

---

# 19. AI FEATURE 4 — SKILL EXTRACTION

AI should extract skills required to solve a problem.

Example:

```text
Problem:
Smart waste management for a city.

Required skills:
- IoT
- Embedded Systems
- Sensors
- Cloud
- Data Analytics
- Machine Learning
- Mobile Development
```

---

# 20. AI FEATURE 5 — UNIVERSITY MATCHING

AI compares:

```text
Problem Requirements
        +
University Expertise
        +
Department Expertise
        +
Faculty Skills
        +
Student Skills
        +
Available Resources
```

Then generates recommendations.

Example:

```text
Recommended Institution #1
95% match

Recommended Department:
ECE

Required expertise:
IoT + Embedded Systems

Faculty match:
92%

Available student skills:
88%
```

---

# 21. AI FEATURE 6 — STUDENT MATCHING

AI can recommend students based on:

* Skills
* Projects
* Interests
* Availability
* Academic department
* Experience
* Required technologies

Example:

```text
Project:
Smart Traffic Monitoring

Recommended Students:

Student A → Computer Vision — 94%
Student B → Embedded Systems — 91%
Student C → IoT — 87%
Student D → Mobile Development — 84%
```

---

# 22. AI FEATURE 7 — FACULTY MATCHING

AI matches faculty based on:

* Research area
* Domain expertise
* Previous projects
* Publications
* Skills
* Department

---

# 23. AI FEATURE 8 — INDUSTRY MATCHING

AI recommends companies based on:

* Industry domain
* Technologies
* Products
* Expertise
* Previous collaborations
* Geographic availability
* Mentorship capability
* Resources

---

# 24. AI FEATURE 9 — SOLUTION RECOMMENDATION

AI may assist teams by suggesting:

* Existing technologies
* Possible approaches
* Related research
* Similar completed projects
* Required components
* Possible datasets
* Development methodologies

The AI should clearly distinguish between:

```text
AI-generated suggestion
        vs
Verified information
        vs
Human-approved solution
```

---

# 25. AI FEATURE 10 — PROJECT RISK DETECTION

AI can analyze project progress and identify risks.

Example:

```text
Milestone 1 → Completed
Milestone 2 → Delayed
Milestone 3 → Not Started

AI Risk:
HIGH

Reason:
Milestone 2 delayed by 12 days.

Recommendation:
Review resource allocation.
```

---

# 26. AI FEATURE 11 — PROGRESS SUMMARIZATION

AI can convert project updates into summaries.

Example:

```text
Weekly Update:

The team completed sensor integration and collected
initial field data. The ML model is currently being
trained. Hardware testing is expected next week.
```

---

# 27. AI FEATURE 12 — IMPACT ESTIMATION

AI can help estimate potential impact using:

* Population affected
* Cost savings
* Time savings
* Environmental benefit
* Accessibility improvement
* Healthcare/education benefit
* Resource efficiency

Final impact should remain subject to human verification.

---

# 28. AI HUMAN-IN-THE-LOOP PRINCIPLE

AI recommendations must not automatically make sensitive final decisions.

```text
AI Recommendation
       ↓
Human Review
       ↓
Approval / Modification
       ↓
Final Decision
```

This is especially important for:

* Priority
* Government decisions
* Project approval
* Institution matching
* User moderation
* Impact claims

---

# 29. PROBLEM LIFECYCLE

```text
1. Citizen submits problem
          ↓
2. Validation
          ↓
3. AI classification
          ↓
4. Duplicate detection
          ↓
5. Priority calculation
          ↓
6. Community support
          ↓
7. University matching
          ↓
8. Project creation
          ↓
9. Team formation
          ↓
10. Faculty approval
          ↓
11. Industry matching
          ↓
12. Development
          ↓
13. Milestones
          ↓
14. Prototype
          ↓
15. Testing
          ↓
16. Community validation
          ↓
17. Government / stakeholder review
          ↓
18. Deployment
          ↓
19. Impact measurement
          ↓
20. Resolution / knowledge repository
```

---

# 30. PROJECT CREATION

A problem can become a project when:

* It receives sufficient validation
* A suitable institution accepts it
* A faculty mentor is assigned
* A student team is formed

Project contains:

* Problem statement
* Objectives
* Expected outcome
* Team
* Faculty mentor
* Industry mentor
* Technologies
* Resources
* Milestones
* Budget if applicable
* Timeline
* Testing criteria
* Impact metrics

---

# 31. TEAM FORMATION

Teams may contain:

```text
Project
│
├── Faculty Mentor
│
├── Team Leader
│
├── Student — AI/ML
├── Student — Hardware
├── Student — Software
├── Student — UI/UX
└── Student — Domain
```

AI can recommend balanced teams.

---

# 32. PROJECT MANAGEMENT

Each project should have:

* Project overview
* Team
* Tasks
* Milestones
* Timeline
* Documents
* Discussions
* Prototype
* Testing
* Feedback
* Risks
* Progress
* Impact

---

# 33. MILESTONE SYSTEM

Example:

```text
Milestone 1
Problem Analysis
       ↓
Milestone 2
Requirement Definition
       ↓
Milestone 3
System Design
       ↓
Milestone 4
Prototype
       ↓
Milestone 5
Testing
       ↓
Milestone 6
Community Validation
       ↓
Milestone 7
Deployment
```

Each milestone contains:

* Start date
* Deadline
* Responsible members
* Tasks
* Status
* Evidence
* Review
* Comments

---

# 34. PROJECT STATUS

Possible states:

```text
Proposed
Approved
Team Formation
Planning
Development
Delayed
Testing
Validation
Ready for Deployment
Deployed
Monitoring
Completed
Archived
Cancelled
```

---

# 35. TASK MANAGEMENT

Students can create and manage tasks.

Task fields:

* Task name
* Description
* Assigned member
* Priority
* Deadline
* Status
* Attachments
* Comments

Statuses:

```text
To Do
In Progress
Blocked
Under Review
Completed
```

---

# 36. COMMUNICATION

The platform should provide project-based communication.

### Features

* Project discussion
* Comments
* Mentions
* Notifications
* Faculty feedback
* Industry mentor feedback
* Community feedback
* Administrative messages

Future implementation may support:

* Real-time chat
* Video meetings
* Meeting scheduling

---

# 37. NOTIFICATION SYSTEM

Notifications should be generated for:

### Citizens

* Problem received
* Problem approved
* Similar problem detected
* Project created
* Progress update
* Solution implemented
* Feedback request

### Students

* Project recommendation
* Team invitation
* Task assignment
* Deadline reminder
* Faculty feedback
* Industry message
* Milestone update

### Faculty

* Student request
* Project proposal
* Milestone submitted
* Industry request
* Review required

### Industry

* Project recommendation
* Collaboration request
* Student/faculty response
* Milestone requiring review

### Government/Admin

* High-priority problem
* Reported issue
* Project delay
* Implementation request
* Regional trend alert

---

# 38. DASHBOARDS

## Citizen Dashboard

```text
My Problems
Supported Problems
Problem Status
Notifications
Recommended Solutions
Impact
```

## Student Dashboard

```text
Recommended Projects
My Projects
My Tasks
Team
Milestones
Skills
Portfolio
Notifications
```

## Faculty Dashboard

```text
Recommended Problems
Projects
Students
Milestones
Reviews
Industry Collaboration
Analytics
```

## University Dashboard

```text
Problem Opportunities
Departments
Faculty
Students
Projects
Industry Partnerships
Innovation Analytics
```

## Industry Dashboard

```text
Recommended Projects
Collaboration Requests
Active Partnerships
Mentorship
Resources
Prototype Reviews
```

## Government Dashboard

```text
Regional Problems
Priority Problems
Projects
Institutions
Industry
Impact
Analytics
Reports
```

## Admin Dashboard

```text
Users
Institutions
Problems
Projects
Reports
Moderation
Categories
System Analytics
AI Monitoring
```

---

# 39. SEARCH SYSTEM

Users should be able to search:

* Problems
* Projects
* Universities
* Departments
* Students
* Faculty
* Companies
* Startups
* Technologies
* Skills
* Solutions

Filters may include:

* Location
* Category
* Severity
* Status
* Technology
* Institution
* Department
* Industry
* Date

---

# 40. DISCOVERY SYSTEM

The platform should provide personalized discovery.

Example:

```text
Because you know:
Python + OpenCV + AI

Recommended:
1. Traffic Monitoring Project
2. Waste Detection Project
3. Road Damage Detection Project
```

Recommendations should improve based on user activity.

---

# 41. LOCATION / GEO FEATURES

Problems can be associated with geographic regions.

Possible hierarchy:

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

Possible future features:

* Map-based problem visualization
* Problem hotspots
* Regional analytics
* Nearby problems
* Nearby institutions
* Nearby implementation partners

Precise location should only be collected when necessary and with appropriate privacy controls.

---

# 42. COMMUNITY VALIDATION

Before and during solution development, affected communities can provide feedback.

Example:

```text
Prototype deployed in pilot area

Community feedback:
👍 Useful — 82%
😐 Partially useful — 12%
👎 Not useful — 6%
```

Feedback can help determine whether the solution actually solves the problem.

---

# 43. TESTING WORKFLOW

```text
Prototype
   ↓
Internal Testing
   ↓
Faculty Review
   ↓
Industry Review
   ↓
Community Pilot
   ↓
Feedback
   ↓
Improvement
   ↓
Final Validation
```

---

# 44. SOLUTION REPOSITORY

Completed projects should not disappear.

The platform should maintain a searchable repository containing:

* Problem
* Solution
* Team
* Institution
* Industry partners
* Technologies
* Documents
* Results
* Deployment information
* Impact
* Lessons learned

This prevents repeated work.

---

# 45. KNOWLEDGE REUSE

When a new problem is submitted, AI can compare it against the solution repository.

Example:

```text
New Problem
     ↓
AI Search
     ↓
Existing Similar Solution
     ↓
Recommend Reuse / Adaptation
```

This can accelerate innovation.

---

# 46. IMPACT TRACKING

Impact metrics may include:

### Social

* People benefited
* Communities reached
* Accessibility improvement

### Economic

* Cost saved
* Revenue generated
* Employment created

### Environmental

* Waste reduced
* Energy saved
* Emissions reduced
* Water saved

### Educational

* Students involved
* Projects completed
* Research produced
* Skills developed

---

# 47. ANALYTICS

Analytics should be available at different levels.

### Citizen-level

* Submitted problems
* Supported problems
* Resolved issues

### Institution-level

* Projects
* Students
* Faculty
* Success rate
* Industry partnerships

### Government-level

* Regional trends
* Problem categories
* Resolution rate
* Social impact

### Platform-level

* Total users
* Active users
* Problems
* Projects
* Solutions
* Partnerships

---

# 48. ROLE-BASED ACCESS CONTROL

Every user must have permissions according to role.

Example:

```text
Citizen
  → Own problems
  → Public problems
  → Public solutions

Student
  → Own projects/tasks
  → Approved project information

Faculty
  → Department/project management

University Admin
  → Institution-level management

Industry
  → Approved collaboration/project data

Government
  → Government-authorized analytics

Platform Admin
  → Full platform administration
```

---

# 49. DATA PRIVACY

The platform should follow privacy-by-design principles.

Requirements:

* Minimal data collection
* Consent where necessary
* Secure authentication
* Password hashing
* Access control
* Protected personal information
* Controlled file access
* Audit logging
* Data deletion mechanisms where applicable

Citizen identity should not automatically be exposed publicly when anonymity is selected.

---

# 50. SECURITY

Security requirements include:

* Secure authentication
* Authorization
* Password hashing
* JWT/session security
* Input validation
* SQL injection protection
* XSS protection
* CSRF protection where applicable
* Rate limiting
* File upload validation
* Malware scanning where applicable
* Secure API design
* Audit logs
* Error handling
* Secrets management

---

# 51. MODERATION

Problems and community content should be moderated.

Possible categories:

```text
Valid
Needs Clarification
Duplicate
Spam
Abusive
Inappropriate
Misleading
Under Review
Rejected
```

AI may assist moderation, but important decisions should support human review.

---

# 52. VERIFICATION SYSTEM

Possible verification levels:

### Citizen

Basic account verification.

### Institution

Official institutional verification.

### Faculty

Institution-based verification.

### Industry

Company verification.

### Government

Official authorized account.

Verification badges can communicate trust level.

---

# 53. PROJECT TRANSPARENCY

Publicly visible project information can include:

* Problem
* Institution
* Project status
* General team information
* Progress percentage
* Milestones
* Expected outcome
* Final result
* Impact

Sensitive information should remain private.

---

# 54. DOCUMENT MANAGEMENT

Projects may contain:

* Requirement documents
* Research papers
* Reports
* Images
* Videos
* CAD files
* Code references
* Test results
* Presentations
* Final reports

File access must follow project permissions.

---

# 55. FEEDBACK SYSTEM

Feedback can come from:

```text
Citizen
Community
Student
Faculty
Industry
Government
```

Feedback should be associated with:

* Problem
* Project
* Milestone
* Prototype
* Final solution

---

# 56. RATING SYSTEM

Where appropriate, users may rate:

* Solution usefulness
* Collaboration quality
* Project outcome
* Mentorship
* Community satisfaction

Ratings should not become the only basis for project prioritization.

---

# 57. GAMIFICATION / RECOGNITION

Optional recognition mechanisms:

### Citizens

* Community Contributor
* Problem Reporter
* Community Validator

### Students

* Innovation Contributor
* Project Champion
* Social Impact Builder

### Faculty

* Innovation Mentor
* Problem Solver Mentor

### Industry

* Innovation Partner
* Community Impact Partner

Recognition should reward meaningful contribution rather than spam activity.

---

# 58. PROJECT PORTFOLIO

Students and faculty can showcase completed projects.

Portfolio information:

* Project title
* Problem
* Solution
* Role
* Technologies
* Results
* Impact
* Institution
* Industry collaboration

This can help students demonstrate real-world experience.

---

# 59. INDUSTRY OPPORTUNITY PIPELINE

Successful collaboration may lead to:

```text
Problem
 ↓
Student Project
 ↓
Prototype
 ↓
Industry Mentorship
 ↓
Pilot
 ↓
Deployment
 ↓
Internship
 ↓
Employment
 ↓
Startup / Commercialization
```

This creates value beyond the academic project.

---

# 60. UNIVERSITY INNOVATION PIPELINE

```text
Societal Problem
       ↓
Student Project
       ↓
Faculty Research
       ↓
Prototype
       ↓
Publication / Patent
       ↓
Industry Collaboration
       ↓
Startup / Deployment
```

---

# 61. GOVERNMENT IMPACT PIPELINE

```text
Citizen Problem
       ↓
AI Prioritization
       ↓
University Solution
       ↓
Industry Support
       ↓
Pilot
       ↓
Government Validation
       ↓
Large-scale Implementation
```

---

# 62. END-TO-END EXAMPLE

## Example: Urban Flooding

### Step 1 — Citizen

Citizen reports:

> "Our road floods after heavy rain and water remains for several hours."

Uploads:

* Photo
* Location
* Description

### Step 2 — AI

AI identifies:

```text
Category:
Urban Infrastructure

Problem:
Flooding / Drainage

Severity:
High

Potential skills:
Civil Engineering
IoT
GIS
AI/ML
Data Analytics
```

### Step 3 — Duplicate detection

AI finds similar submissions nearby.

The system combines or links them.

### Step 4 — Community support

Hundreds of residents support the problem.

Priority increases.

### Step 5 — University matching

AI recommends:

```text
Civil Engineering Department
ECE Department
CSE / AI Department
```

### Step 6 — Team

Faculty mentor creates a multidisciplinary team.

### Step 7 — Industry

An IoT company joins as technical mentor.

### Step 8 — Development

Students develop:

```text
Rain Sensors
+
Water-Level Sensors
+
IoT Gateway
+
Cloud Platform
+
Prediction Model
```

### Step 9 — Testing

Prototype is tested in the affected locality.

### Step 10 — Community validation

Residents provide feedback.

### Step 11 — Government

Relevant authorities review the results.

### Step 12 — Deployment

Solution is expanded to additional locations.

### Step 13 — Impact

Platform records:

```text
People benefited: 12,000
Flooding duration reduced: XX%
Response time improved: XX%
```

The final solution becomes part of the solution repository.

---

# 63. SECOND EXAMPLE — WASTE MANAGEMENT

Citizen submits:

> "Garbage bins overflow frequently in our locality."

AI identifies:

```text
Domain:
Waste Management

Skills:
IoT
Embedded Systems
Cloud
Mobile App
Data Analytics
Route Optimization
```

University team builds smart monitoring.

Industry provides sensors.

Government monitors collection efficiency.

Community validates results.

---

# 64. THIRD EXAMPLE — EDUCATION

Problem:

> "Students in rural areas lack access to quality digital learning resources."

Potential solution:

```text
Offline Learning System
+
Regional Language Support
+
AI Tutoring
+
Low-bandwidth Architecture
```

Possible stakeholders:

```text
Citizen
University
Students
Faculty
EdTech Startup
Government Education Department
```

---

# 65. PLATFORM MODULES

The initial platform should conceptually contain these modules:

```text
1. Authentication
2. User Management
3. Role Management
4. Citizen Module
5. Problem Submission
6. Problem Discovery
7. AI Processing
8. Duplicate Detection
9. Matching Engine
10. University Module
11. Student Module
12. Faculty Module
13. Industry Module
14. Government Module
15. Project Management
16. Team Management
17. Task Management
18. Milestones
19. Collaboration
20. Notifications
21. Feedback
22. Testing / Validation
23. Impact Tracking
24. Analytics
25. Solution Repository
26. Search
27. Moderation
28. File Management
29. Audit / Security
30. Administration
```

---

# 66. HIGH-LEVEL SYSTEM ARCHITECTURE

The final architecture is not being implemented yet, but the conceptual structure is:

```text
                    ┌──────────────────────┐
                    │      FRONTEND        │
                    │ Web / Responsive UI  │
                    └──────────┬───────────┘
                               │
                               ↓
                    ┌──────────────────────┐
                    │      API LAYER       │
                    └──────────┬───────────┘
                               │
          ┌────────────────────┼────────────────────┐
          ↓                    ↓                    ↓
 ┌────────────────┐   ┌────────────────┐   ┌────────────────┐
 │ AUTH / USERS   │   │ PROJECT ENGINE │   │ NOTIFICATIONS  │
 └────────────────┘   └────────────────┘   └────────────────┘
          │                    │
          └────────────┬───────┘
                       ↓
              ┌──────────────────┐
              │   AI SERVICES    │
              ├──────────────────┤
              │ Classification   │
              │ Similarity        │
              │ Matching          │
              │ Recommendations   │
              │ Summarization     │
              └────────┬─────────┘
                       ↓
              ┌──────────────────┐
              │    DATABASE      │
              └──────────────────┘
```

The exact technology stack will be selected during the architecture phase.

---

# 67. FUTURE AI / ADVANCED FEATURES

Possible future features:

* Multilingual problem understanding
* Tamil language support
* Voice-based problem submission
* Image-based problem classification
* Computer vision for uploaded images
* Geographic trend prediction
* Predictive societal issue detection
* AI project proposal generation
* AI milestone planning
* AI code assistance
* AI research assistant
* AI feasibility estimation
* AI resource recommendation
* AI project risk prediction

These should be considered future enhancements unless required for the initial prototype.

---

# 68. MULTILINGUAL SUPPORT

The platform should eventually support:

* English
* Tamil
* Additional Indian languages

Users should be able to submit problems in regional languages.

AI should convert them into structured representations while preserving the original submission.

Example:

```text
Citizen language:
Tamil

Original problem:
Preserved

AI structured representation:
English / standardized internal format
```

---

# 69. ACCESSIBILITY

The platform should aim to support:

* Mobile users
* Low-bandwidth environments
* Responsive layouts
* Clear typography
* Keyboard accessibility
* Screen-reader compatibility
* Simple language
* Regional language support

---

# 70. MOBILE-FIRST CONSIDERATION

Citizens are likely to access the platform primarily through smartphones.

Therefore:

```text
Citizen Experience
→ Mobile-first

Institution / Admin
→ Responsive web dashboard

Industry
→ Responsive web dashboard
```

The exact frontend strategy will be finalized later.

---

# 71. NON-FUNCTIONAL REQUIREMENTS

The system should aim for:

### Performance

* Fast page loading
* Efficient API responses
* Pagination
* Search optimization

### Scalability

* Modular backend
* Horizontally scalable services where needed
* Efficient database design

### Reliability

* Error handling
* Logging
* Monitoring
* Backup strategy

### Security

* Authentication
* Authorization
* Encryption
* Secure APIs

### Maintainability

* Modular architecture
* Clear coding standards
* Documentation
* Testing

---

# 72. AUDIT LOG

Important actions should be logged.

Examples:

```text
User created project
Faculty approved milestone
Industry joined project
Admin changed project status
Citizen edited problem
Problem marked duplicate
Government reviewed solution
```

Audit logs help with accountability.

---

# 73. AI EXPLAINABILITY

AI recommendations should provide understandable reasons.

Instead of:

> Match Score: 94%

Show:

```text
Why recommended?

✓ Department expertise matches problem
✓ Faculty has relevant research experience
✓ Students have required skills
✓ Institution has required laboratory
✓ Similar project previously completed
```

This improves trust.

---

# 74. AI CONFIDENCE

AI outputs should have confidence levels where meaningful.

Example:

```text
Category:
Flood Management

Confidence:
91%
```

Low-confidence results should be sent for human review.

---

# 75. DATA MODEL — CONCEPTUAL ENTITIES

The system will likely require entities such as:

```text
User
Role
CitizenProfile
Community
University
Department
StudentProfile
FacultyProfile
Industry
GovernmentOrganization

Problem
ProblemCategory
ProblemLocation
ProblemEvidence
ProblemSupport
ProblemComment

AIAnalysis
SimilarityResult
PriorityScore
Skill
Technology

Project
ProjectMember
Team
Task
Milestone
ProjectDocument

Collaboration
Mentorship
IndustryResource

Prototype
Test
Validation
Feedback

Notification
Message
Report
ModerationAction

ImpactMetric
ImpactRecord

Solution
SolutionRepositoryEntry

AuditLog
```

This is conceptual only. Detailed database schema will be designed later.

---

# 76. API CONCEPT

The final backend may expose APIs conceptually like:

```text
/auth
/users
/problems
/problem-categories
/problem-support
/problem-comments
/ai
/matching
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
/admin
```

Exact API design will be created during architecture and implementation planning.

---

# 77. DEVELOPMENT PHASES

## Phase 0 — Blueprint

Current phase.

Deliverable:

```text
docs/MASTER_BLUEPRINT.md
```

---

## Phase 1 — System Architecture

Define:

* Frontend architecture
* Backend architecture
* AI architecture
* Database architecture
* Authentication
* API architecture
* Deployment architecture
* Data flow
* Security architecture

Deliverables will be documented before coding.

---

## Phase 2 — UX / UI Design

Design:

* Landing page
* Authentication
* Citizen dashboard
* University dashboard
* Student dashboard
* Faculty dashboard
* Industry dashboard
* Government dashboard
* Admin dashboard
* Problem submission
* Problem details
* Project workspace
* AI recommendation interfaces

---

## Phase 3 — Database Design

Define:

* ER diagram
* Tables
* Relationships
* Primary keys
* Foreign keys
* Indexes
* Constraints

---

## Phase 4 — Backend Foundation

Implement:

* Authentication
* User roles
* Profiles
* Core APIs
* Database connection
* Validation
* Security

---

## Phase 5 — Problem Engine

Implement:

* Problem submission
* Categorization
* Moderation
* Search
* Support/upvotes
* Status tracking

---

## Phase 6 — AI Engine

Implement initial AI capabilities:

1. Classification
2. Duplicate detection
3. Skill extraction
4. Priority recommendation
5. University matching

Additional AI features can follow.

---

## Phase 7 — Collaboration Engine

Implement:

* Teams
* Faculty mentors
* Industry collaboration
* Project workspace
* Tasks
* Milestones
* Notifications

---

## Phase 8 — Testing / Validation

Implement:

* Prototype tracking
* Testing records
* Community feedback
* Faculty review
* Industry review

---

## Phase 9 — Analytics / Impact

Implement:

* Dashboards
* Regional analytics
* Project analytics
* Impact tracking
* Reports

---

## Phase 10 — Deployment

Prepare:

* Production deployment
* Database deployment
* AI deployment
* Monitoring
* Security
* Backup
* Documentation

---

# 78. MVP SCOPE

The first working prototype should NOT attempt to implement every advanced feature.

### MVP should demonstrate:

```text
Citizen
 ↓
Submit Problem
 ↓
AI Classification
 ↓
Duplicate Detection
 ↓
Priority
 ↓
University Matching
 ↓
Student/Faculty Team
 ↓
Industry Collaboration
 ↓
Project
 ↓
Milestones
 ↓
Progress
 ↓
Feedback
 ↓
Impact
```

This demonstrates the complete value proposition.

---

# 79. MVP AI PRIORITY

For the hackathon prototype, the most important AI capabilities should be:

### Priority 1

Problem classification

### Priority 2

Duplicate/similar problem detection

### Priority 3

Skill extraction

### Priority 4

University/student/faculty matching

### Priority 5

Problem prioritization

### Priority 6

AI project recommendations

Advanced AI can be added after the core workflow works.

---

# 80. DEMO SCENARIO

The hackathon demonstration should preferably show one problem from beginning to end.

Example:

```text
Citizen:
"Flooding near our school"

        ↓

AI:
Classifies as Urban Flooding

        ↓

AI:
Detects similar reports

        ↓

AI:
Calculates priority

        ↓

AI:
Extracts required skills

        ↓

AI:
Recommends Civil + ECE + CSE

        ↓

University:
Accepts problem

        ↓

Faculty:
Creates team

        ↓

Students:
Develop solution

        ↓

Industry:
Provides IoT mentorship

        ↓

Project:
Milestones tracked

        ↓

Prototype:
Tested

        ↓

Community:
Provides feedback

        ↓

Government:
Views impact dashboard

        ↓

Solution:
Marked implemented
```

This single demonstration communicates the entire platform.

---

# 81. SUCCESS METRICS

The platform can measure:

### Problem engagement

* Number of problems
* Number of supporters
* Number of validated problems

### Collaboration

* University participation
* Student participation
* Faculty participation
* Industry participation

### Innovation

* Projects created
* Prototypes developed
* Solutions completed

### Implementation

* Solutions deployed
* Communities reached
* People benefited

### Impact

* Social benefit
* Economic benefit
* Environmental benefit

---

# 82. IMPORTANT DESIGN PRINCIPLE

SIH_26 is NOT simply:

```text
Complaint Management System
```

It is:

```text
Problem Discovery
        +
AI Intelligence
        +
University Innovation
        +
Student Collaboration
        +
Faculty Mentorship
        +
Industry Partnership
        +
Government Coordination
        +
Community Validation
        +
Impact Tracking
```

This distinction should remain central to the project.

---

# 83. PLATFORM VALUE PROPOSITION

## For Citizens

"My problem can reach people who can actually solve it."

## For Students

"I can work on real societal problems instead of disconnected academic projects."

## For Faculty

"I can mentor projects aligned with real-world needs."

## For Universities

"I can connect institutional expertise with societal challenges."

## For Industry

"I can discover talent, ideas, and projects relevant to my technology."

## For Government

"I can see societal problems, solution progress, and measurable impact in one place."

---

# 84. CORE PRINCIPLES

The project should follow these principles:

1. Citizen-centric
2. AI-assisted
3. Human-supervised
4. Collaboration-driven
5. Transparent
6. Secure
7. Scalable
8. Impact-oriented
9. Evidence-based
10. Reusable
11. Inclusive
12. Accessible

---

# 85. WHAT WE ARE NOT DOING YET

At V0.1:

* No production coding
* No final technology selection
* No final database schema
* No final API implementation
* No deployment
* No unnecessary microservices
* No premature optimization

The blueprint must be finalized first.

---

# 86. FUTURE EXPANSION

Potential future versions may introduce:

### V1

Complete MVP

### V2

Advanced AI matching

### V3

Multilingual and voice-based interaction

### V4

National-scale analytics

### V5

Predictive societal challenge detection

### V6

Large-scale government deployment

---

# 87. LONG-TERM VISION

The long-term vision is to create a digital ecosystem where:

```text
A problem discovered by a citizen
can become
a university project,
which becomes
a student innovation,
supported by faculty,
accelerated by industry,
validated by the community,
and scaled through government,
creating measurable societal impact.
```

---

# 88. MASTER END-TO-END FLOW

```text
┌───────────────────────────┐
│      CITIZEN / COMMUNITY  │
│       Identifies Problem  │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│      PROBLEM PLATFORM     │
│ Submit + Evidence + Area  │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│         AI ENGINE         │
│ Classification            │
│ Duplicate Detection       │
│ Priority                  │
│ Skill Extraction          │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│       MATCHING ENGINE     │
│ University                │
│ Department                │
│ Faculty                   │
│ Students                  │
│ Industry                  │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│      PROJECT CREATION     │
│ Team + Mentor + Goals     │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│     COLLABORATION HUB     │
│ University + Industry     │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│     DEVELOPMENT           │
│ Tasks + Milestones        │
│ Prototype + Testing       │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│      COMMUNITY PILOT      │
│ Feedback + Validation     │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│    GOVERNMENT REVIEW      │
│ Monitoring + Analytics    │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│       DEPLOYMENT          │
│ Real-world Implementation │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│      IMPACT TRACKING      │
│ Social + Economic +       │
│ Environmental Impact      │
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│    SOLUTION REPOSITORY    │
│ Reuse + Scale + Learn     │
└───────────────────────────┘
```

---

# 89. BLUEPRINT STATUS

**Current version:** V0.1

**Current stage:** Functional concept definition

**Implementation status:** Not started

**Coding status:** Not started

**Architecture status:** Pending

**Database design:** Pending

**UI design:** Pending

**AI implementation:** Pending

---

# 90. NEXT BLUEPRINT STAGE

After V0.1 is reviewed and accepted, the next document/planning stage is:

## MASTER BLUEPRINT V0.2 — SYSTEM ARCHITECTURE

It will define:

* Complete frontend architecture
* Complete backend architecture
* AI architecture
* Database architecture
* Authentication architecture
* API architecture
* Service boundaries
* Data flow
* AI data flow
* File storage
* Notification architecture
* Search architecture
* Security architecture
* Deployment architecture
* Development environment
* Technology choices
* Local development workflow

**No implementation should begin until the architecture has been sufficiently defined.**

---

# 91. SINGLE SOURCE OF TRUTH

This document is the current master reference for SIH_26.

Any future feature, architecture decision, database design, API design, UI design, or implementation should be checked against this blueprint.

When new features are introduced, this blueprint should be updated instead of allowing undocumented functionality to appear in the implementation.

---

# END OF MASTER BLUEPRINT V0.1

**SIH_26 — From Societal Problem to Collaborative Solution to Real-World Impact.**
