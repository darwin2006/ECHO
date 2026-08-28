import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function HealthBanner({ error }) {
  if (!error) return null;

  return (
    <div style={{ background: 'rgba(244, 63, 94, 0.15)', borderBottom: '1px solid rgba(244, 63, 94, 0.3)', padding: '8px 24px', fontSize: '0.85rem', color: '#fda4af', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
      <AlertCircle size={16} /> Connection Unavailable. Please check your network connection or server status.
    </div>
  );
}
