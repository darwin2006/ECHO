import React from 'react';
import { Microscope, Award, Users, CheckSquare, Clock } from 'lucide-react';

export default function FacultyDashboard({ projects }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Banner */}
      <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(17, 24, 39, 0.8) 100%)', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: '#c084fc', fontWeight: 700, textTransform: 'uppercase' }}>Faculty Mentorship Portal</span>
          <h2 style={{ fontSize: '1.6rem', margin: '4px 0' }}>Academic Research & Project Supervision</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Guide multidisciplinary student teams, approve technical milestones, and validate societal impact solutions.</p>
        </div>
      </div>

      {/* Assigned Mentorship Projects */}
      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Assigned Mentorship Projects</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
          {projects.map((p) => (
            <div key={p.project_id} className="glass-panel" style={{ padding: '20px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="badge badge-medium">Mentoring</span>
                <span style={{ fontSize: '0.8rem', color: '#a78bfa' }}>Dr. S. Arumugam</span>
              </div>

              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{p.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                University: {p.university_name}
              </p>

              <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>Phase 1: Architecture & Hardware</span>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>APPROVED</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Phase 2: Prototype Field Testing</span>
                  <span style={{ color: '#f59e0b', fontWeight: 700 }}>IN_PROGRESS</span>
                </div>
              </div>

              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                Manage Milestones & Team
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
