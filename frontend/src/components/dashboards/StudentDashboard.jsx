import React from 'react';
import { GraduationCap, Code2, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export default function StudentDashboard({ projects, onSelectProblem }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Banner */}
      <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(17, 24, 39, 0.8) 100%)', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#22d3ee', fontWeight: 700, textTransform: 'uppercase' }}>Student Innovator Workspace</span>
            <h2 style={{ fontSize: '1.6rem', margin: '4px 0' }}>Build Real-World Societal Impact Projects</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Match your technical skills (IoT, GIS, Machine Learning, Python) with university matched projects.</p>
          </div>
          <div style={{ padding: '12px 20px', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.2)', color: '#22d3ee', fontWeight: 700, fontSize: '0.9rem' }}>
            Academic Credit Verified
          </div>
        </div>
      </div>

      {/* Available Projects */}
      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Matched University Innovation Projects</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
          {projects.map((p) => (
            <div key={p.project_id} className="glass-panel" style={{ padding: '20px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-success">{p.status}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Progress: {p.progress_percentage}%</span>
              </div>

              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{p.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Campus: <strong>{p.university_name}</strong>
              </p>

              <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.8rem' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Required Technical Skills:</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', padding: '2px 8px', borderRadius: '4px' }}>IoT</span>
                  <span style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', padding: '2px 8px', borderRadius: '4px' }}>Sensors</span>
                  <span style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', padding: '2px 8px', borderRadius: '4px' }}>GIS</span>
                  <span style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', padding: '2px 8px', borderRadius: '4px' }}>Python</span>
                </div>
              </div>

              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => onSelectProblem(p.problem_id)}>
                Join Project Team <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
