import React from 'react';
import { PlusCircle } from 'lucide-react';

export default function CitizenDashboard({ problems, onOpenSubmit, onSelectProblem }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#111111', fontWeight: 700, textTransform: 'uppercase' }}>Citizen & Community Portal</span>
            <h2 style={{ fontSize: '1.6rem', margin: '4px 0' }}>Crowdsource Societal Challenges</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Submit problems in your community. Real AI analyzes urgency, priority, and matches technical universities.</p>
          </div>
          <button className="btn-primary" onClick={onOpenSubmit}>
            <PlusCircle size={18} /> Submit New Challenge
          </button>
        </div>
      </div>

      {/* Submitted Problems Feed */}
      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>My Community Submissions</h3>
        {problems.length === 0 ? (
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
            No societal problems submitted yet. Click "Submit New Challenge" to start!
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {problems.map((p) => (
              <div 
                key={p.problem_id} 
                className="glass-panel" 
                style={{ padding: '20px', cursor: 'pointer', transition: 'transform 0.15s ease', background: '#FFFFFF', border: '1px solid #E5E5E5' }}
                onClick={() => onSelectProblem(p.problem_id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span className="badge">{p.category}</span>
                  <span style={{ fontSize: '0.75rem', color: '#111111', fontWeight: 600 }}>{p.status}</span>
                </div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '8px', color: '#111111' }}>{p.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {p.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', paddingTop: '12px', borderTop: '1px solid #EEEEEE' }}>
                  <span>📍 {p.locality || p.district}, {p.state}</span>
                  <span style={{ color: '#111111', fontWeight: 600 }}>Inspect AI Analysis →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
