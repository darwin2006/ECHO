import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function UniversityAdminDashboard({ problems, onSelectProblem }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Banner */}
      <div className="glass-panel" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: '#111111', fontWeight: 700, textTransform: 'uppercase' }}>University Administration Control</span>
          <h2 style={{ fontSize: '1.6rem', margin: '4px 0' }}>Institutional Capacity & Capability Management</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Real AI 16-Factor Matching Engine balances departmental expertise with practical workload capacity.</p>
        </div>
      </div>

      {/* Campus Capacity Overview Widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '20px', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Chennai Institute of Technology</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111111', margin: '4px 0' }}>94.5 / 100</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Active Projects: 1 / 5 (Available Capacity)</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>REC Madurai</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111111', margin: '4px 0' }}>88.2 / 100</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Active Projects: 0 / 5 (Full Capacity)</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>STU Coimbatore</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111111', margin: '4px 0' }}>81.0 / 100</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Active Projects: 4 / 4 (Capacity Penalty Applied)</div>
        </div>
      </div>

      {/* AI Matched Problems Pending Campus Approval */}
      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Matched Societal Shortlists Pending Campus Acceptance</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {problems.map((p) => (
            <div key={p.problem_id} className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="badge badge-high">{p.category}</span>
                  <span style={{ fontSize: '0.8rem', color: '#111111' }}>Rank 1 — Best Match Candidate</span>
                </div>
                <h4 style={{ fontSize: '1.1rem', color: '#111111' }}>{p.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Location: {p.locality || p.district}, {p.state}</p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn-secondary" onClick={() => onSelectProblem(p.problem_id)}>
                  Inspect 16-Factor Details
                </button>
                <button className="btn-primary">
                  <ShieldCheck size={16} /> Accept & Allocate Team
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
