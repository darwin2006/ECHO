import React, { useState, useEffect } from 'react';
import { X, Cpu, Award, Building2, CheckCircle2, AlertTriangle, Layers, ChevronRight } from 'lucide-react';
import { api } from '../services/api';

export default function ProblemDetailModal({ problemId, onClose }) {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [matching, setMatching] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!problemId) return;
    async function loadData() {
      setLoading(true);
      try {
        const d = await api.getProblemDetail(problemId);
        setDetail(d.data);
        const m = await api.getUniversityMatching(problemId);
        setMatching(m.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch problem AI details');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [problemId]);

  if (!problemId) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="glass-panel-glow" style={{ width: '100%', maxWidth: '850px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', position: 'relative' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary-500)', fontWeight: 700, textTransform: 'uppercase' }}>Real AI Grounded Analysis</span>
            <h2 style={{ fontSize: '1.4rem' }}>{detail?.problem?.title || 'Problem Details'}</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <Cpu className="animate-spin" size={32} style={{ marginBottom: '12px', color: 'var(--primary-500)' }} />
            <p>Fetching Real SentenceTransformers embeddings & University Matching shortlist...</p>
          </div>
        ) : error ? (
          <div style={{ padding: '20px', background: 'rgba(244,63,94,0.1)', color: '#fda4af', borderRadius: '8px' }}>{error}</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Description & Metadata */}
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <p style={{ fontSize: '0.95rem', color: '#e2e8f0', marginBottom: '16px' }}>{detail.problem.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>📍 Location: <strong>{detail.problem.locality || detail.problem.district}, {detail.problem.state}</strong></span>
                <span>🌐 Category: <strong>{detail.problem.category}</strong></span>
                <span>🗣️ Language: <strong>{detail.problem.language === 'ta' ? 'Tamil (தமிழ்)' : 'English'}</strong></span>
                <span>🏷️ Status: <strong style={{ color: '#818cf8' }}>{detail.problem.status}</strong></span>
              </div>
            </div>

            {/* AI Priority & Embedding Metrics */}
            {detail.ai_analysis && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                
                {/* 7-Factor Priority Breakdown */}
                <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>7-Factor Priority Score</h4>
                    <span className={`badge badge-${detail.ai_analysis.priority_level.toLowerCase()}`}>
                      {detail.ai_analysis.priority_score} / 100
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
                    {Object.entries(detail.ai_analysis.priority_breakdown || {}).map(([factor, score]) => (
                      <div key={factor} style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                        <span>{factor.replace('_contrib', '').replace('_penalty', ' penalty')}</span>
                        <strong style={{ color: '#818cf8' }}>+{score}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real Embedding & Cosine Duplicate Detection */}
                <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>Real Vector Embedding Metrics</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                    <div>Model: <strong>SentenceTransformers (paraphrase-multilingual-MiniLM-L12-v2)</strong></div>
                    <div>Vector Dimensionality: <strong>384-D Float Array</strong></div>
                    <div>Duplicate Status: <strong style={{ color: detail.ai_analysis.duplicate_relationship === 'NOT_DUPLICATE' ? '#10b981' : '#f59e0b' }}>{detail.ai_analysis.duplicate_relationship}</strong></div>
                    <div>Max Cosine Similarity: <strong>{(detail.ai_analysis.max_similarity * 100).toFixed(1)}%</strong></div>
                  </div>
                </div>

              </div>
            )}

            {/* 16-Factor University Capability vs Capacity Matching Shortlist */}
            {matching && matching.shortlist && (
              <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Award size={20} color="#f59e0b" />
                  <h3 style={{ fontSize: '1.1rem' }}>16-Factor University Matching Shortlist</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {matching.shortlist.map((univ) => (
                    <div key={univ.university_id} style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: '10px', border: univ.rank_order === 1 ? '1px solid var(--primary-500)' : '1px solid var(--border-subtle)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: univ.rank_order === 1 ? '#818cf8' : '#94a3b8' }}>{univ.rank_title}</span>
                          <h4 style={{ fontSize: '1rem' }}>{univ.university_name}</h4>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>{univ.overall_match_score}%</span>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Match Score</div>
                        </div>
                      </div>

                      {/* Grounded Match Reasons */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                        {univ.match_reasons.map((reason, idx) => (
                          <span key={idx} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', color: '#cbd5e1' }}>
                            ✓ {reason}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
