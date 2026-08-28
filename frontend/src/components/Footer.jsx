import React from 'react';
import { Layers } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-panel" style={{ borderRadius: 0, borderBottom: 'none', borderLeft: 'none', borderRight: 'none', marginTop: '64px', padding: '32px 24px', background: 'var(--bg-dark)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Layers size={18} style={{ color: 'var(--primary-500)' }} />
          <span><strong>ECHO</strong> — Societal Innovation Platform</span>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
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
