import React from 'react';
import { Rocket, Cpu, Layers, DollarSign, Handshake } from 'lucide-react';

export default function IndustryPartnerDashboard({ projects, onSelectProblem }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Banner */}
      <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(17, 24, 39, 0.8) 100%)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 700, textTransform: 'uppercase' }}>Industry & Startup Collaboration</span>
          <h2 style={{ fontSize: '1.6rem', margin: '4px 0' }}>Sponsor Hardware, APIs & Technical Mentorship</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>WaterTech Sensor Systems India — Partnering with university teams to commercialize prototypes.</p>
        </div>
      </div>

      {/* Available Projects for Sponsorship */}
      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Active University Projects Open for Industry Sponsorship</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
          {projects.map((p) => (
            <div key={p.project_id} className="glass-panel" style={{ padding: '20px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="badge badge-high">Hardware Sponsorship</span>
                <span style={{ fontSize: '0.8rem', color: '#f59e0b' }}>Open Sponsorship</span>
              </div>

              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{p.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                University: {p.university_name}
              </p>

              <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '8px', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '16px' }}>
                <div>Sponsorship Resources:</div>
                <div style={{ color: '#fbbf24', fontWeight: 600 }}>• IoT Hardware Sensors & Cloud Telemetry APIs</div>
              </div>

              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Handshake size={18} /> Partner & Sponsor Resources
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
