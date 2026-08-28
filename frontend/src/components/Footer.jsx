import React from 'react';
import { Layers } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-panel" style={{ borderRadius: 0, borderBottom: 'none', borderLeft: 'none', borderRight: 'none', marginTop: '64px', padding: '32px 24px', background: '#FFFFFF', borderTop: '1px solid #E5E5E5' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '4px', background: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Layers size={14} color="#ffffff" />
          </div>
          <span style={{ color: '#111111' }}><strong>ECHO</strong> — Societal Innovation Platform</span>
        </div>
        <div style={{ display: 'flex', gap: '20px', color: '#555555' }}>
          <span>Citizens</span>
          <span>Universities</span>
          <span>Students</span>
          <span>Faculty</span>
          <span>Industry</span>
          <span>Government</span>
        </div>
      </div>
    </footer>
  );
}
