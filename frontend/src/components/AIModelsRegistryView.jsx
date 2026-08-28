import React, { useState, useEffect } from 'react';
import { Cpu, ShieldCheck, Zap, Layers } from 'lucide-react';
import { api } from '../services/api';

export default function AIModelsRegistryView() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const resp = await api.getAIModels();
        setModels(resp.data || []);
      } catch (err) {
        console.error('Failed to load AI models', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div>
        <h2 style={{ fontSize: '1.6rem' }}>AI Model Registry & Governance</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Authoritative registry of deployed local AI inference models, vector dimensions, and benchmark metrics.</p>
      </div>

      {loading ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>Loading AI Registry...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {models.map((m) => (
            <div key={m.model_id} className="glass-panel-glow" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <span className="badge badge-success">{m.status}</span>
                  <h3 style={{ fontSize: '1.3rem', margin: '4px 0' }}>{m.model_name}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ID: {m.model_id} — Purpose: {m.model_purpose}</p>
                </div>
                <div style={{ padding: '8px 16px', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '8px', color: '#818cf8', fontWeight: 700 }}>
                  {m.embedding_dim}-D Vectors
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <div>Supported Languages: <strong>{m.supported_languages}</strong></div>
                <div>Deployment Type: <strong>{m.deployment_type}</strong></div>
                <div>RAM Requirements: <strong>{m.resource_requirements}</strong></div>
                <div>License: <strong>{m.license}</strong></div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
