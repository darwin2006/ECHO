import React from 'react';

export default function GovernmentOfficialDashboard({ problems, onSelectProblem }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Banner */}
      <div className="glass-panel" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: '#111111', fontWeight: 700, textTransform: 'uppercase' }}>Government & State Analytics</span>
          <h2 style={{ fontSize: '1.6rem', margin: '4px 0' }}>Tamil Nadu District Priority Heatmap & Allocation</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Track 7-factor priority scores, government policy alignment, and regional societal challenges.</p>
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '20px', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Submitted Problems</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111111', margin: '4px 0' }}>{problems.length}</div>
          <span style={{ fontSize: '0.75rem', color: '#555555' }}>State-Wide Coverage</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Critical Priority</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111111', margin: '4px 0' }}>2</div>
          <span style={{ fontSize: '0.75rem', color: '#555555' }}>Chennai & Madurai</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>University Matching Rate</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111111', margin: '4px 0' }}>100%</div>
          <span style={{ fontSize: '0.75rem', color: '#555555' }}>Shortlists Generated</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Gov Alignment Flag</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111111', margin: '4px 0' }}>100%</div>
          <span style={{ fontSize: '0.75rem', color: '#555555' }}>Policy Aligned</span>
        </div>
      </div>

      {/* High Priority District Feed */}
      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>District Priority Heatmap Feed</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {problems.map((p) => (
            <div key={p.problem_id} className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="badge badge-critical">Gov Priority</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>District: <strong>{p.district || 'Chennai'}</strong></span>
                </div>
                <h4 style={{ fontSize: '1.1rem', color: '#111111' }}>{p.title}</h4>
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
