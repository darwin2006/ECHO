import React from 'react';
import { Sparkles, MapPin, Eye, RefreshCw } from 'lucide-react';

export default function ProblemsExplorer({ problems, loading, onSelectProblem, onRefresh }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem' }}>Explore Societal Problems</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Live challenges submitted by communities across Tamil Nadu, prioritized by Real AI</p>
        </div>
        <button className="btn-secondary" onClick={onRefresh}>
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh Feed
        </button>
      </div>

      {loading ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Loading problems from FastAPI backend...
        </div>
      ) : problems.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          No societal problems found in database.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {problems.map((p) => (
            <div key={p.problem_id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span className="badge badge-medium">{p.category}</span>
                  <span style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 700 }}>{p.status}</span>
                </div>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{p.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {p.description}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} /> {p.locality || p.district}, {p.state}
                </span>

                <button className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }} onClick={() => onSelectProblem(p.problem_id)}>
                  <Eye size={14} /> Inspect Real AI
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
