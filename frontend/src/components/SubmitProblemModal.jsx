import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle, Cpu } from 'lucide-react';
import { api } from '../services/api';

export default function SubmitProblemModal({ isOpen, onClose, onProblemSubmitted }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    language: 'en',
    category: 'Environment',
    locality: 'Kotturpuram',
    district: 'Chennai',
    state: 'Tamil Nadu',
    severity: 4.0,
    population_impact: 4.0,
    urgency: 4.0,
    is_government_priority: 1,
  });

  const [submitting, setSubmitting] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setAiResult(null);

    try {
      const resp = await api.submitProblem(formData);
      setAiResult(resp.data);
      if (onProblemSubmitted) onProblemSubmitted();
    } catch (err) {
      setError(err.message || 'Failed to submit problem to Real AI Engine');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', position: 'relative', background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '12px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1px solid #E5E5E5', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', borderRadius: '8px', background: '#F3F3F3', color: '#111111' }}>
              <Sparkles size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem' }}>Submit Societal Challenge</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Real AI Pipeline will generate vector embeddings & 7-factor priority score</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* AI Analysis Result Screen */}
        {aiResult ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ padding: '16px', borderRadius: '8px', background: '#F3F3F3', border: '1px solid #E5E5E5', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckCircle size={24} color="#111111" />
              <div>
                <strong style={{ color: '#111111' }}>Problem Submitted & Analyzed by Real SentenceTransformers AI!</strong>
                <p style={{ fontSize: '0.85rem', color: '#555555' }}>Problem ID #{aiResult.problem.problem_id} — Status: {aiResult.problem.status}</p>
              </div>
            </div>

            {/* AI Priority Breakdown */}
            <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '8px', border: '1px solid #E5E5E5' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Calculated Priority Score</span>
                <span className="badge badge-high" style={{ fontSize: '1rem', padding: '6px 14px' }}>
                  {aiResult.ai_analysis.priority_score} / 100 ({aiResult.ai_analysis.priority_level})
                </span>
              </div>

              <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-secondary)' }}>Extracted Technical Skills</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {aiResult.ai_analysis.extracted_skills.map((skill, idx) => (
                  <span key={idx} style={{ background: '#F3F3F3', color: '#111111', border: '1px solid #E5E5E5', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem' }}>
                    {skill}
                  </span>
                ))}
              </div>

              {/* Duplicate Search */}
              <div style={{ borderTop: '1px solid #E5E5E5', paddingTop: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Semantic Cosine Duplicate Check:</span>
                <strong style={{ color: '#111111', marginLeft: '8px' }}>
                  {aiResult.ai_analysis.duplicate_relationship} (Max Similarity: {(aiResult.ai_analysis.max_similarity * 100).toFixed(1)}%)
                </strong>
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>
              Close & View Problem Explorer
            </button>
          </div>
        ) : (
          /* Submission Form */
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {error && (
              <div style={{ padding: '12px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', color: '#991B1B', fontSize: '0.85rem' }}>
                {error}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: 'var(--text-secondary)' }}>Problem Title</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Smart Urban Flood & Drainage Monitoring System"
                value={formData.title} 
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                style={{ width: '100%', background: '#FFFFFF', border: '1px solid #E5E5E5', padding: '10px 14px', borderRadius: '8px', color: '#111111', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: 'var(--text-secondary)' }}>Detailed Problem Description</label>
              <textarea 
                rows={4} 
                required 
                placeholder="Describe the issue, location details, affected population, and urgency..."
                value={formData.description} 
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                style={{ width: '100%', background: '#FFFFFF', border: '1px solid #E5E5E5', padding: '10px 14px', borderRadius: '8px', color: '#111111', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Category</label>
                <select 
                  value={formData.category} 
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  style={{ width: '100%', background: '#FFFFFF', border: '1px solid #E5E5E5', padding: '8px', borderRadius: '6px', color: '#111111' }}
                >
                  <option value="Environment">Environment & Urban</option>
                  <option value="Water & Sanitation">Water & Sanitation</option>
                  <option value="Education">Education & Rural Tech</option>
                  <option value="Healthcare">Healthcare & Hygiene</option>
                  <option value="Agriculture">Agriculture & Smart Farming</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>District</label>
                <input 
                  type="text" 
                  value={formData.district} 
                  onChange={e => setFormData({ ...formData, district: e.target.value })}
                  style={{ width: '100%', background: '#FFFFFF', border: '1px solid #E5E5E5', padding: '8px', borderRadius: '6px', color: '#111111' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Language</label>
                <select 
                  value={formData.language} 
                  onChange={e => setFormData({ ...formData, language: e.target.value })}
                  style={{ width: '100%', background: '#FFFFFF', border: '1px solid #E5E5E5', padding: '8px', borderRadius: '6px', color: '#111111' }}
                >
                  <option value="en">English</option>
                  <option value="ta">Tamil (தமிழ்)</option>
                </select>
              </div>
            </div>

            {/* Severity & Urgency Controls */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', background: '#F7F7F7', padding: '12px', borderRadius: '8px', border: '1px solid #E5E5E5' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Severity (1-5): {formData.severity}</label>
                <input type="range" min="1" max="5" step="0.5" value={formData.severity} onChange={e => setFormData({ ...formData, severity: parseFloat(e.target.value) })} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Urgency (1-5): {formData.urgency}</label>
                <input type="range" min="1" max="5" step="0.5" value={formData.urgency} onChange={e => setFormData({ ...formData, urgency: parseFloat(e.target.value) })} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Population (1-5): {formData.population_impact}</label>
                <input type="range" min="1" max="5" step="0.5" value={formData.population_impact} onChange={e => setFormData({ ...formData, population_impact: parseFloat(e.target.value) })} style={{ width: '100%' }} />
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={submitting} style={{ marginTop: '12px', justifyContent: 'center', padding: '12px' }}>
              {submitting ? (
                <>
                  <Cpu className="animate-spin" size={18} /> Running SentenceTransformers Embedding Pipeline...
                </>
              ) : (
                <>
                  <Send size={18} /> Run Real AI Analysis & Submit Problem
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
