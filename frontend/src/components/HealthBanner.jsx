import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function HealthBanner({ error }) {
  if (!error) return null;

  return (
    <div style={{ background: '#FEF2F2', borderBottom: '1px solid #FCA5A5', padding: '8px 24px', fontSize: '0.85rem', color: '#991B1B', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
      <AlertCircle size={16} /> Connection Unavailable. Please check your network connection or server status.
    </div>
  );
}
