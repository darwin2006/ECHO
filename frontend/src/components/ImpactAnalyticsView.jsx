import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Award, ShieldCheck, Building2, CheckCircle2, MapPin } from 'lucide-react';
import { api } from '../services/api';

export default function ImpactAnalyticsView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const resp = await api.getImpactAnalytics();
        setData(resp.data);
      } catch (err) {
        console.error('Failed to load impact analytics', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
        <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>State-Wide Societal Impact</span>
        <h2 style={{ fontSize: '1.8rem', margin: '4px 0' }}>Impact Analytics & Outcome Measurement</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Real-time analytics aggregated directly from active backend database records and AI pipeline operations.
        </p>
      </div>

      {loading ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Loading real impact metrics from database...
        </div>
      ) : data ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Top Key Performance Indicators */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated People Impacted</div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#10b981', margin: '4px 0' }}>
                {data.estimated_people_impacted.toLocaleString()}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#6ee7b7' }}>Population Coverage</span>
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Crowdsourced Problems</div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#6366f1', margin: '4px 0' }}>
                {data.total_problems_crowdsourced}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#a5b4fc' }}>100% AI Analyzed</span>
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Solution Projects</div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#06b6d4', margin: '4px 0' }}>
                {data.projects_created}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#67e8f9' }}>Campuses Engaged</span>
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Milestones Execution</div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#a855f7', margin: '4px 0' }}>
                {data.milestones_execution.completion_rate_pct}%
              </div>
              <span style={{ fontSize: '0.75rem', color: '#c084fc' }}>
                {data.milestones_execution.completed} / {data.milestones_execution.total} Milestones Done
              </span>
            </div>
          </div>

          {/* Breakdown Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            {/* Real AI Priority Distribution */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#818cf8' }}>AI Priority Distribution</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Critical Priority Problems</span>
                  <span className="badge badge-critical">{data.priority_distribution.critical}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>High Priority Problems</span>
                  <span className="badge badge-high">{data.priority_distribution.high}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Medium Priority Problems</span>
                  <span className="badge badge-medium">{data.priority_distribution.medium}</span>
                </div>
              </div>
            </div>

            {/* Regional District Coverage */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#06b6d4' }}>Regional District Coverage</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {Object.entries(data.district_coverage || {}).map(([dist, count]) => (
                  <div key={dist} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} style={{ color: '#06b6d4' }} /> {dist} District
                    </span>
                    <strong style={{ color: '#f8fafc' }}>{count} Problem(s)</strong>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      ) : null}

    </div>
  );
}
