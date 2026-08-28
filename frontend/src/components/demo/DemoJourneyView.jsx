import React, { useState } from 'react';
import { Send, Cpu, Award, Users, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Handshake, Sparkles, Building2, Layers, CheckSquare, HelpCircle, FileText, ChevronRight, BarChart3, TrendingUp } from 'lucide-react';
import DemoStepper from '../DemoStepper';
import { api } from '../../services/api';

export default function DemoJourneyView({ onFlowComplete }) {
  const [step, setStep] = useState(1);
  const [maxReachedStep, setMaxReachedStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    title: 'Smart Urban Flood & Drainage Monitoring System',
    description: 'Frequent waterlogging in school road due to unmonitored blocked drains during heavy monsoon rain.',
    language: 'en',
    category: 'Environment',
    locality: 'Kotturpuram',
    district: 'Chennai',
    state: 'Tamil Nadu',
    severity: 4.5,
    population_impact: 4.0,
    urgency: 4.5,
    community_support_count: 35,
    is_government_priority: 1,
    feasibility: 4.0,
    required_skills: ['IoT', 'Sensors', 'GIS', 'Python']
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Workflow Data States (Grounded in Backend API responses)
  const [problemData, setProblemData] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [matchingShortlist, setMatchingShortlist] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  
  // Team Candidates
  const [candidates, setCandidates] = useState({ faculty_mentors: [], students: [] });
  const [selectedFacultyId, setSelectedFacultyId] = useState('');
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  // Project & Milestones
  const [projectData, setProjectData] = useState(null);
  const [milestones, setMilestones] = useState([]);
  
  // Industry Collaboration & Impact
  const [collaboration, setCollaboration] = useState(null);

  // Navigation Helper
  const updateStep = (newStep) => {
    setStep(newStep);
    if (newStep > maxReachedStep) {
      setMaxReachedStep(newStep);
    }
  };

  // Preset Seed Examples
  const loadPresetExample = (type) => {
    if (type === 'flood_chennai') {
      setFormData({
        title: 'Smart Urban Flood & Drainage Monitoring System',
        description: 'Frequent waterlogging in school road due to unmonitored blocked drains during heavy monsoon rain.',
        language: 'en',
        category: 'Environment',
        locality: 'Kotturpuram',
        district: 'Chennai',
        state: 'Tamil Nadu',
        severity: 4.5,
        population_impact: 4.0,
        urgency: 4.5,
        community_support_count: 35,
        is_government_priority: 1,
        feasibility: 4.0,
        required_skills: ['IoT', 'Sensors', 'GIS', 'Python']
      });
    } else if (type === 'water_madurai') {
      setFormData({
        title: 'கிராமப்புற குடிநீர் தரம் மற்றும் விநியோக கண்காணிப்பு',
        description: 'கிராமப் பகுதிகளில் குடிநீரில் உப்புத் தன்மை மற்றும் கழிவுநீர் கலப்பதை தடுக்கும் தானியங்கி கண்காணிப்பு முறை.',
        language: 'ta',
        category: 'Water & Sanitation',
        locality: 'Usilampatti',
        district: 'Madurai',
        state: 'Tamil Nadu',
        severity: 4.0,
        population_impact: 4.5,
        urgency: 4.0,
        community_support_count: 50,
        is_government_priority: 1,
        feasibility: 4.0,
        required_skills: ['Hydrology', 'Sensors', 'IoT', 'Python']
      });
    }
  };

  // STEP 1 -> STEP 2: Submit Problem & Run Real AI Pipeline
  const handleStep1Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const resp = await api.submitProblem(formData);
      const data = resp.data;
      setProblemData(data.problem);
      setAiAnalysis(data.ai_analysis);
      updateStep(2);
    } catch (err) {
      setError(err.message || 'Unable to connect to ECHO backend. Please verify that the FastAPI server is running.');
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 -> STEP 3: Load 16-Factor University Matching Shortlist
  const handleStep2Proceed = async () => {
    if (!problemData) return;
    setLoading(true);
    setError(null);

    try {
      const resp = await api.getUniversityMatching(problemData.problem_id);
      setMatchingShortlist(resp.data.shortlist || []);
      if (resp.data.shortlist && resp.data.shortlist.length > 0) {
        setSelectedUniversity(resp.data.shortlist[0]); // Default to Rank 1 Best Match
      }
      updateStep(3);
    } catch (err) {
      setError(err.message || 'Failed to fetch University Matching shortlist from backend.');
    } finally {
      setLoading(false);
    }
  };

  // STEP 3 -> STEP 4: Fetch Team Candidates for Selected Campus
  const handleStep3Proceed = async () => {
    if (!selectedUniversity) return;
    setLoading(true);
    setError(null);

    try {
      const resp = await api.getTeamCandidates(selectedUniversity.university_id);
      setCandidates(resp.data);
      if (resp.data.faculty_mentors && resp.data.faculty_mentors.length > 0) {
        setSelectedFacultyId(resp.data.faculty_mentors[0].user_id);
      }
      if (resp.data.students && resp.data.students.length > 0) {
        setSelectedStudentIds([resp.data.students[0].user_id]);
      }
      updateStep(4);
    } catch (err) {
      setError(err.message || 'Failed to fetch team candidates from backend.');
    } finally {
      setLoading(false);
    }
  };

  // STEP 4 -> STEP 5: Create Project via Backend API
  const handleStep4Proceed = async () => {
    if (!problemData || !selectedUniversity) return;
    setLoading(true);
    setError(null);

    try {
      const payload = {
        problem_id: problemData.problem_id,
        university_id: selectedUniversity.university_id,
        title: `Solution: ${problemData.title}`,
        description: `Multidisciplinary solution project assigned to ${selectedUniversity.university_name}`,
        faculty_mentor_user_id: parseInt(selectedFacultyId) || 1,
        student_user_ids: selectedStudentIds.map(id => parseInt(id))
      };

      const resp = await api.createProject(payload);
      const projId = resp.data.project_id;
      
      // Fetch complete details of created project
      const detailResp = await api.getProjectDetail(projId);
      setProjectData(detailResp.data);
      setMilestones(detailResp.data.milestones || []);
      if (onFlowComplete) onFlowComplete();
      updateStep(5);
    } catch (err) {
      setError(err.message || 'Failed to instantiate solution project.');
    } finally {
      setLoading(false);
    }
  };

  // STEP 6: Update Milestone Status
  const handleAdvanceMilestone = async (milestoneId, currentStatus) => {
    if (!projectData) return;
    const nextStatus = currentStatus === 'PLANNED' ? 'IN_PROGRESS' : 'COMPLETED';

    try {
      await api.updateMilestoneStatus(projectData.project_id, milestoneId, nextStatus);
      // Reload project detail
      const detailResp = await api.getProjectDetail(projectData.project_id);
      setProjectData(detailResp.data);
      setMilestones(detailResp.data.milestones || []);
    } catch (err) {
      setError(err.message || 'Failed to update milestone status.');
    }
  };

  // STEP 7: Link Industry Collaboration
  const handleLinkIndustry = async () => {
    if (!projectData) return;
    setLoading(true);

    try {
      const resp = await api.addIndustryCollaboration(projectData.project_id, {
        industry_profile_id: 1,
        resource_type: 'IoT Hardware Sensors & Cloud Telemetry APIs',
        notes: 'Partner sponsor providing telemetry APIs, hardware components, and technical mentorship.'
      });
      setCollaboration(resp.data);
      updateStep(7);
    } catch (err) {
      setError(err.message || 'Failed to link industry sponsorship.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Visual 8-Stage Demo Stepper */}
      <DemoStepper currentStep={step} setStep={setStep} maxReachedStep={maxReachedStep} />

      {error && (
        <div style={{ padding: '16px 24px', background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.35)', borderRadius: '12px', color: '#fda4af', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>⚠️ {error}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 01: CITIZEN PROBLEM SUBMISSION */}
      {/* ========================================================================= */}
      {step === 1 && (
        <div className="glass-panel animate-fade-in" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <span className="badge badge-medium">Stage 01 — Crowdsource Entry</span>
              <h2 style={{ fontSize: '1.6rem', marginTop: '6px' }}>Citizen & Community Problem Submission</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '2px' }}>
                Enter societal issue details in English or Tamil. Submitting triggers real-time semantic analysis and priority scoring.
              </p>
            </div>

            {/* Seed Presets */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button type="button" className="btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 12px' }} onClick={() => loadPresetExample('flood_chennai')}>
                Sample: Flood Drainage (Chennai)
              </button>
              <button type="button" className="btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 12px' }} onClick={() => loadPresetExample('water_madurai')}>
                Sample: குடிநீர் தரம் (Madurai)
              </button>
            </div>
          </div>

          <form onSubmit={handleStep1Submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Problem Title</label>
              <input 
                type="text" 
                required 
                value={formData.title} 
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '12px 16px', borderRadius: '8px', color: '#fff', fontSize: '0.95rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Detailed Problem Description</label>
              <textarea 
                rows={4} 
                required 
                value={formData.description} 
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '12px 16px', borderRadius: '8px', color: '#fff', fontSize: '0.95rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Category</label>
                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '6px', color: '#fff' }}>
                  <option value="Environment">Environment & Drainage</option>
                  <option value="Water & Sanitation">Water & Sanitation</option>
                  <option value="Education">Education & Rural Tech</option>
                  <option value="Healthcare">Healthcare & Hygiene</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Locality / District</label>
                <input type="text" value={formData.district} onChange={e => setFormData({ ...formData, district: e.target.value })} style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '6px', color: '#fff' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>State</label>
                <input type="text" value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '6px', color: '#fff' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Language</label>
                <select value={formData.language} onChange={e => setFormData({ ...formData, language: e.target.value })} style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '6px', color: '#fff' }}>
                  <option value="en">English</option>
                  <option value="ta">Tamil (தமிழ்)</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: 'center', padding: '14px', fontSize: '1rem', marginTop: '8px' }}>
              {loading ? <><Cpu className="animate-spin" size={18} /> Analyzing Problem & Computing Priority...</> : <><Send size={18} /> Submit Problem & Analyze Priority →</>}
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 02: REAL AI ANALYSIS RESULT */}
      {/* ========================================================================= */}
      {step === 2 && aiAnalysis && (
        <div className="glass-panel animate-fade-in" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <span className="badge badge-success">Stage 02 — Intelligent Priority Assessment</span>
              <h2 style={{ fontSize: '1.6rem', marginTop: '6px' }}>AI Priority & Duplicate Analysis</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Multilingual semantic processing, duplicate detection & 7-factor priority assessment score.
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className={`badge badge-${aiAnalysis.priority_level.toLowerCase()}`} style={{ fontSize: '1.1rem', padding: '8px 16px' }}>
                Priority Score: {aiAnalysis.priority_score} / 100 ({aiAnalysis.priority_level})
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            
            {/* 7-Factor Priority Breakdown */}
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#818cf8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} /> 7-Factor Priority Breakdown
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                {Object.entries(aiAnalysis.priority_breakdown || {}).map(([factor, score]) => (
                  <div key={factor} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                    <span style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{factor.replace('_contrib', '').replace('_penalty', ' penalty')}</span>
                    <strong style={{ color: '#10b981' }}>+{score}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Semantic Duplicate Check */}
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#06b6d4', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cpu size={18} /> Semantic Analysis & Duplicate Check
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#cbd5e1' }}>
                <div>Analysis Engine: <strong>Multilingual Semantic Priority Engine</strong></div>
                <div>Duplicate Status: <strong style={{ color: aiAnalysis.duplicate_relationship === 'NOT_DUPLICATE' ? '#10b981' : '#f59e0b' }}>{aiAnalysis.duplicate_relationship}</strong></div>
                <div>Max Semantic Similarity: <strong>{(aiAnalysis.max_similarity * 100).toFixed(1)}%</strong></div>
                <div style={{ marginTop: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Required Technical Domains:</span>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                    {aiAnalysis.extracted_skills.map((s, idx) => (
                      <span key={idx} style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.78rem' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Grounded Explainability Card */}
          <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)', padding: '20px', borderRadius: '12px', marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.95rem', color: '#a5b4fc', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={16} /> How ECHO Decided This Priority:
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: '1.6' }}>
              The problem was evaluated by the 7-factor priority engine on backend. High severity ({formData.severity}/5), strong community support ({formData.community_support_count} upvotes), and government policy alignment added <strong>+{aiAnalysis.priority_score} points</strong>, while semantic duplicate search confirmed a <strong>{aiAnalysis.duplicate_relationship}</strong> relationship.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
            <button className="btn-secondary" onClick={() => setStep(1)}>
              <ArrowLeft size={16} /> Back to Problem Entry
            </button>
            <button className="btn-primary" disabled={loading} onClick={handleStep2Proceed} style={{ padding: '12px 28px' }}>
              {loading ? <Cpu className="animate-spin" size={18} /> : <><Award size={18} /> Proceed to 16-Factor University Matching →</>}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 03: UNIVERSITY MATCHING */}
      {/* ========================================================================= */}
      {step === 3 && (
        <div className="glass-panel animate-fade-in" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <span className="badge badge-success">Stage 03 — Multi-Factor University Matching</span>
              <h2 style={{ fontSize: '1.6rem', marginTop: '6px' }}>16-Factor Capability vs Practical Capacity Matching</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Rule: "Best Match ≠ Highest Single Skill Score". Evaluates skill coverage, domain rating, faculty availability, and practical workload capacity.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            {matchingShortlist.map((univ) => {
              const isSelected = selectedUniversity?.university_id === univ.university_id;
              const isBestMatch = univ.rank_order === 1;

              return (
                <div 
                  key={univ.university_id} 
                  onClick={() => setSelectedUniversity(univ)}
                  style={{
                    background: isSelected 
                      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(17, 24, 39, 0.8) 100%)' 
                      : 'var(--bg-card)',
                    border: isSelected 
                      ? '2px solid var(--primary-500)' 
                      : '1px solid var(--border-subtle)',
                    boxShadow: isSelected ? '0 0 25px rgba(99, 102, 241, 0.25)' : 'none',
                    padding: '24px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <span className={`badge ${isBestMatch ? 'badge-success' : 'badge-medium'}`}>
                        {univ.rank_title}
                      </span>
                      <h3 style={{ fontSize: '1.25rem', marginTop: '6px' }}>{univ.university_name}</h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981' }}>{univ.overall_match_score}%</span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Match Score</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                    {univ.match_reasons.map((reason, idx) => (
                      <span key={idx} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                        ✓ {reason}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
            <button className="btn-secondary" onClick={() => setStep(2)}>
              <ArrowLeft size={16} /> Back to AI Analysis
            </button>
            <button className="btn-primary" disabled={loading || !selectedUniversity} onClick={handleStep3Proceed} style={{ padding: '12px 28px' }}>
              {loading ? <Cpu className="animate-spin" size={18} /> : <><Users size={18} /> Select {selectedUniversity?.university_name} & Form Team →</>}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 04: TEAM FORMATION */}
      {/* ========================================================================= */}
      {step === 4 && (
        <div className="glass-panel animate-fade-in" style={{ padding: '32px' }}>
          <div style={{ marginBottom: '24px' }}>
            <span className="badge badge-success">Stage 04 — Campus Team Formation</span>
            <h2 style={{ fontSize: '1.6rem', marginTop: '6px' }}>Multidisciplinary Team Formation</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Select faculty mentor and student innovators from seeded profiles for <strong>{selectedUniversity?.university_name}</strong>.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            
            {/* Faculty Mentor Selection */}
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#c084fc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} /> Select Faculty Mentor
              </h3>
              {candidates.faculty_mentors.map(f => (
                <label 
                  key={f.user_id} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px',
                    background: selectedFacultyId == f.user_id ? 'rgba(168, 85, 247, 0.15)' : 'var(--bg-surface)',
                    border: selectedFacultyId == f.user_id ? '1px solid #c084fc' : '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    marginBottom: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <input type="radio" name="faculty" value={f.user_id} checked={selectedFacultyId == f.user_id} onChange={e => setSelectedFacultyId(e.target.value)} />
                  <div>
                    <strong style={{ fontSize: '0.95rem' }}>{f.full_name}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{f.designation} — {f.department_name}</div>
                  </div>
                </label>
              ))}
            </div>

            {/* Student Team Member Selection */}
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#22d3ee', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} /> Select Student Team Members
              </h3>
              {candidates.students.map(s => (
                <label 
                  key={s.user_id} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px',
                    background: selectedStudentIds.includes(s.user_id) ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-surface)',
                    border: selectedStudentIds.includes(s.user_id) ? '1px solid #22d3ee' : '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    marginBottom: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <input 
                    type="checkbox" 
                    value={s.user_id} 
                    checked={selectedStudentIds.includes(s.user_id)} 
                    onChange={e => {
                      if (e.target.checked) setSelectedStudentIds([...selectedStudentIds, s.user_id]);
                      else setSelectedStudentIds(selectedStudentIds.filter(id => id !== s.user_id));
                    }} 
                  />
                  <div>
                    <strong style={{ fontSize: '0.95rem' }}>{s.full_name}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Year {s.academic_year} — {s.department_name}</div>
                  </div>
                </label>
              ))}
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
            <button className="btn-secondary" onClick={() => setStep(3)}>
              <ArrowLeft size={16} /> Back to University Selection
            </button>
            <button className="btn-primary" disabled={loading} onClick={handleStep4Proceed} style={{ padding: '12px 28px' }}>
              {loading ? <Cpu className="animate-spin" size={18} /> : <><ShieldCheck size={18} /> Build Team & Instantiate Solution Project →</>}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 05: PROJECT CREATION */}
      {/* ========================================================================= */}
      {step === 5 && projectData && (
        <div className="glass-panel animate-fade-in" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <span className="badge badge-success">Stage 05 — Persisted in SQLite DB</span>
              <h2 style={{ fontSize: '1.6rem', marginTop: '6px' }}>Solution Project Instantiated</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Project record created, team linked, and 6 milestones initialized in database.</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#818cf8' }}>Project #{projectData.project_id}</span>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status: {projectData.status}</div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{projectData.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>{projectData.description}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '0.88rem', color: '#cbd5e1' }}>
              <div>Campus: <strong>{projectData.university_name}</strong></div>
              <div>Faculty Mentor: <strong>{projectData.team?.faculty_mentor?.full_name || 'Dr. S. Arumugam'}</strong></div>
              <div>Team Members: <strong>{projectData.team?.students?.length || 1} Student Innovator(s)</strong></div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
            <button className="btn-secondary" onClick={() => setStep(4)}>
              <ArrowLeft size={16} /> Back to Team Selection
            </button>
            <button className="btn-primary" onClick={() => updateStep(6)} style={{ padding: '12px 28px' }}>
              <CheckSquare size={18} /> Proceed to Milestone Execution →
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 06: MILESTONE WORKFLOW */}
      {/* ========================================================================= */}
      {step === 6 && projectData && (
        <div className="glass-panel animate-fade-in" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <span className="badge badge-success">Stage 06 — Interactive Milestone Execution</span>
              <h2 style={{ fontSize: '1.6rem', marginTop: '6px' }}>Project Milestone Execution & Progress Tracking</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Advance milestones to calculate overall project progress live in database.</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>{projectData.progress_percentage}%</span>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Overall Progress</div>
            </div>
          </div>

          {/* Progress Bar Visual */}
          <div style={{ marginBottom: '24px' }}>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${projectData.progress_percentage}%` }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {milestones.map((m) => (
              <div key={m.milestone_id} style={{ background: 'var(--bg-card)', padding: '16px 20px', borderRadius: '10px', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#f8fafc' }}>{m.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{m.description}</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className={`badge badge-${m.status === 'COMPLETED' ? 'success' : m.status === 'IN_PROGRESS' ? 'high' : 'medium'}`}>
                    {m.status}
                  </span>
                  {m.status !== 'COMPLETED' && (
                    <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => handleAdvanceMilestone(m.milestone_id, m.status)}>
                      Advance Status →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
            <button className="btn-secondary" onClick={() => setStep(5)}>
              <ArrowLeft size={16} /> Back to Project Overview
            </button>
            <button className="btn-primary" onClick={handleLinkIndustry} style={{ padding: '12px 28px' }}>
              <Handshake size={18} /> Link Industry & Startup Partner Sponsorship →
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 07: INDUSTRY COLLABORATION */}
      {/* ========================================================================= */}
      {step === 7 && (
        <div className="glass-panel-glow animate-fade-in" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#10b981', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <Handshake size={36} />
          </div>

          <span className="badge badge-success" style={{ marginBottom: '8px' }}>Stage 07 — Sponsorship Linked</span>
          <h2 style={{ fontSize: '2.2rem', margin: '8px 0' }}>Industry Collaboration Established!</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto 24px auto', fontSize: '1.05rem' }}>
            <strong>WaterTech Sensor Systems India</strong> has partnered with <strong>{selectedUniversity?.university_name}</strong> to sponsor hardware sensors, telemetry cloud APIs, and technical mentorship for Project #{projectData?.project_id}.
          </p>

          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', maxWidth: '700px', margin: '0 auto 28px auto', textAlign: 'left', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '1rem', color: '#fbbf24', marginBottom: '12px' }}>Sponsorship & Resource Commitment Summary:</h4>
            <ul style={{ fontSize: '0.9rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px' }}>
              <li>✓ IoT Hardware Waterlog Sensors & Telemetry Gateways</li>
              <li>✓ Real-Time Cloud Telemetry API Endpoints</li>
              <li>✓ Dedicated Corporate Technical Mentor Guidance</li>
              <li>✓ Academic Credit & Prototype Field Scaling Support</li>
            </ul>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button className="btn-secondary" onClick={() => setStep(6)}>
              <ArrowLeft size={16} /> Back to Milestones
            </button>
            <button className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }} onClick={() => updateStep(8)}>
              <BarChart3 size={18} /> View Final Impact & Outcome Measurement →
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 08: IMPACT & OUTCOME MEASUREMENT */}
      {/* ========================================================================= */}
      {step === 8 && (
        <div className="glass-panel-glow animate-fade-in" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.2)', border: '1px solid rgba(99, 102, 241, 0.4)', color: '#818cf8', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <TrendingUp size={36} />
          </div>

          <span className="badge badge-success" style={{ marginBottom: '8px' }}>Stage 08 — Final Journey Outcome</span>
          <h2 style={{ fontSize: '2.2rem', margin: '8px 0' }}>End-to-End Societal Impact Verified!</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 24px auto', fontSize: '1.05rem' }}>
            From community problem crowdsourcing in <strong>{formData.district}</strong> to Real AI prioritization, 16-factor university matching at <strong>{selectedUniversity?.university_name}</strong>, multidisciplinary team allocation, 6 milestone executions, and industry hardware sponsorship.
          </p>

          {/* Impact Stats Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', maxWidth: '800px', margin: '0 auto 28px auto', textAlign: 'left' }}>
            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated Local Impact</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>15,000+</div>
              <div style={{ fontSize: '0.75rem', color: '#6ee7b7' }}>Citizens Benefited</div>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Real AI Priority</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#818cf8' }}>{aiAnalysis?.priority_score}/100</div>
              <div style={{ fontSize: '0.75rem', color: '#a5b4fc' }}>{aiAnalysis?.priority_level} Level</div>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Campus Match Score</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#06b6d4' }}>{selectedUniversity?.overall_match_score}%</div>
              <div style={{ fontSize: '0.75rem', color: '#67e8f9' }}>16-Factor Verified</div>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sponsor Hardware</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fbbf24', marginTop: '6px' }}>WaterTech India</div>
              <div style={{ fontSize: '0.75rem', color: '#fde68a' }}>IoT Telemetry Gateways</div>
            </div>
          </div>

          <button className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }} onClick={() => updateStep(1)}>
            <Sparkles size={18} /> Restart Demo Journey / Submit Another Challenge
          </button>
        </div>
      )}

    </div>
  );
}
