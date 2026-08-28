/**
 * ECHO Platform — API Client Service
 * Connects directly to the FastAPI backend REST API.
 */

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || data.error || `HTTP ${response.status} Error`);
    }
    return data;
  } catch (err) {
    console.error(`[ECHO API Error] ${endpoint}:`, err.message);
    throw err;
  }
}

export const api = {
  // Health Check
  getHealth: () => request("/health"),

  // Problems API
  getProblems: () => request("/problems"),
  getProblemDetail: (id) => request(`/problems/${id}`),
  submitProblem: (payload) =>
    request("/problems", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  // University Matching API
  getUniversityMatching: (problemId) => request(`/matching/${problemId}`),

  // Team Candidates API
  getTeamCandidates: (universityId) => request(`/team-candidates/${universityId}`),

  // Projects API
  getProjects: () => request("/projects"),
  getProjectDetail: (projectId) => request(`/projects/${projectId}`),
  createProject: (payload) =>
    request("/projects", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  // Milestone Progress API
  updateMilestoneStatus: (projectId, milestoneId, status) =>
    request(`/projects/${projectId}/milestones/${milestoneId}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),

  // Industry Collaboration API
  addIndustryCollaboration: (projectId, payload) =>
    request(`/projects/${projectId}/collaborations`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  // Impact Analytics API
  getImpactAnalytics: () => request("/analytics/impact"),

  // AI Models Registry API
  getAIModels: () => request("/ai/models"),
};
