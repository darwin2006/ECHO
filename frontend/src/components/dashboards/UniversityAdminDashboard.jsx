import React from 'react';
import { Landmark, Activity, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function UniversityAdminDashboard({ problems, onSelectProblem }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Banner */}
      <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(17, 24, 39, 0.8) 100%)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: '#818cf8', fontWeight: 700, textTransform: 'uppercase' }}>University Administration Control</span>
          <h2 style={{ fontSize: '1.6rem', margin: '4px 0' }}>Institutional Capacity & Capability Management</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Real AI 16-Factor Matching Engine balances departmental expertise with practical workload capacity.</p>
        </div>
      </div>

      {/* Campus Capacity Overview Widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Chennai Institute of Technology</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', margin: '4px 0' }}>94.5 / 100</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Active Projects: 1 / 5 (Available Capacity)</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>REC Madurai</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#06b6d4', margin: '4px 0' }}>88.2 / 100</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Active Projects: 0 / 5 (Full Capacity)</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>STU Coimbatore</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b', margin: '4px 0' }}>81.0 / 100</div>
          <div style={{ fontSize: '0.85rem', color: '#fcd34d' }}>Active Projects: 4 / 4 (Capacity Penalty Applied)</div>
        </div>
      </div>

      {/* AI Matched Problems Pending Campus Approval */}
      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Matched Societal Shortlists Pending Campus Acceptance</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {problems.map((p) => (
            <div key={p.problem_id} className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="badge badge-high">{p.category}</span>
                  <span style={{ fontSize: '0.8rem', color: '#818cf8' }}>Rank 1 — Best Match Candidate</span>
                </div>
                <h4 style={{ fontSize: '1.1rem' }}>{p.title}</h4>
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
