import React from 'react';
import { MapPin, TrendingUp, AlertOctagon, BarChart3, Shield } from 'lucide-react';

export default function GovernmentOfficialDashboard({ problems, onSelectProblem }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Banner */}
      <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15) 0%, rgba(17, 24, 39, 0.8) 100%)', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: '#fda4af', fontWeight: 700, textTransform: 'uppercase' }}>Government & State Analytics</span>
          <h2 style={{ fontSize: '1.6rem', margin: '4px 0' }}>Tamil Nadu District Priority Heatmap & Allocation</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Track 7-factor priority scores, government policy alignment, and regional societal challenges.</p>
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Submitted Problems</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', margin: '4px 0' }}>{problems.length}</div>
          <span style={{ fontSize: '0.75rem', color: '#10b981' }}>State-Wide Coverage</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Critical Priority</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f43f5e', margin: '4px 0' }}>2</div>
          <span style={{ fontSize: '0.75rem', color: '#fda4af' }}>Chennai & Madurai</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>University Matching Rate</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#6366f1', margin: '4px 0' }}>100%</div>
          <span style={{ fontSize: '0.75rem', color: '#a5b4fc' }}>Shortlists Generated</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Gov Alignment Flag</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', margin: '4px 0' }}>100%</div>
          <span style={{ fontSize: '0.75rem', color: '#6ee7b7' }}>Policy Aligned</span>
        </div>
      </div>

      {/* High Priority District Feed */}
      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>District Priority Heatmap Feed</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {problems.map((p) => (
            <div key={p.problem_id} className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="badge badge-critical">Gov Priority</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>District: <strong>{p.district || 'Chennai'}</strong></span>
                </div>
                <h4 style={{ fontSize: '1.1rem' }}>{p.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{p.description}</p>
              </div>

              <button className="btn-secondary" onClick={() => onSelectProblem(p.problem_id)}>
                View AI Priority Breakdown
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
