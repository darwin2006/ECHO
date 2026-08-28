import React, { useState, useEffect } from 'react';
import { PlayCircle, PlusCircle } from 'lucide-react';
import { api } from '../services/api';

export default function LandingHero({ onLaunchDemo, onOpenSubmit }) {
  const [stats, setStats] = useState({
    problemsCount: 2,
    projectsCount: 1,
    universitiesCount: 3,
    aiModel: 'SentenceTransformers Local CPU'
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const p = await api.getProblems();
        const pr = await api.getProjects();
        const h = await api.getHealth();
        setStats({
          problemsCount: p.data?.length || 2,
          projectsCount: pr.data?.length || 1,
          universitiesCount: 3,
          aiModel: h.data?.ai_service?.engine || 'SentenceTransformers Local CPU'
        });
      } catch (err) {
        console.error('Failed to load stats', err);
      }
    }
    loadStats();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '16px 0' }}>
      
      {/* Main Hero Banner */}
      <div style={{ textAlign: 'center', maxWidth: '920px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <h1 className="hero-heading" style={{ fontSize: '3.4rem', lineHeight: 1.15, fontWeight: 800, color: '#111111' }}>
          Turn Societal Challenges Into Collaborative Solutions
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.6 }}>
          <strong>ECHO</strong> bridges citizens, universities, student innovators, faculty mentors, industry sponsors, and government officials to crowdsource, analyze, match, and resolve critical community issues.
        </p>

        <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }} onClick={onLaunchDemo}>
            <PlayCircle size={20} /> Launch Live Demo Journey
          </button>
          <button className="btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem' }} onClick={onOpenSubmit}>
            <PlusCircle size={20} /> Submit Problem
          </button>
        </div>
      </div>

      {/* Primary Value Flow Stepper */}
      <div className="glass-panel" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
        <h3 style={{ textAlign: 'center', fontSize: '1.1rem', marginBottom: '20px', color: 'var(--text-secondary)' }}>The ECHO End-to-End Value Flow</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', textAlign: 'center' }}>
          {[
            { step: '01', title: 'Citizens', desc: 'Crowdsource Problems' },
            { step: '02', title: 'Real AI', desc: '7-Factor Priority' },
            { step: '03', title: 'Universities', desc: '16-Factor Match' },
            { step: '04', title: 'Students & Faculty', desc: 'Team Allocation' },
            { step: '05', title: 'Projects', desc: 'Solution Build' },
            { step: '06', title: 'Industry', desc: 'Sponsorship' },
            { step: '07', title: 'Impact', desc: 'State Scaling' },
          ].map((item, idx) => (
            <div key={idx} style={{ background: '#F7F7F7', padding: '16px 10px', borderRadius: '8px', border: '1px solid #E5E5E5' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#111111' }}>{item.step}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, margin: '2px 0', color: '#111111' }}>{item.title}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Problems Crowdsourced</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111111', margin: '4px 0' }}>{stats.problemsCount}</div>
          <span style={{ fontSize: '0.75rem', color: '#555555' }}>Active Community Submissions</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Universities Connected</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111111', margin: '4px 0' }}>{stats.universitiesCount}</div>
          <span style={{ fontSize: '0.75rem', color: '#555555' }}>Partner Campuses</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Solution Projects</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111111', margin: '4px 0' }}>{stats.projectsCount}</div>
          <span style={{ fontSize: '0.75rem', color: '#555555' }}>6 Milestones Initialized</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AI Priority Analysis</span>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111111', margin: '8px 0' }}>Multi-Factor AI</div>
          <span style={{ fontSize: '0.75rem', color: '#555555' }}>Prioritization Engine</span>
        </div>
      </div>

    </div>
  );
}
