import React from 'react';
import { Layers, PlusCircle, UserCheck, Sparkles, LayoutDashboard, Compass, FolderKanban, PlayCircle, BarChart3 } from 'lucide-react';

const ROLES = [
  { id: 'COMMUNITY_MEMBER', label: 'Citizen / Community', icon: '🏙️' },
  { id: 'STUDENT', label: 'Student Innovator', icon: '🎓' },
  { id: 'FACULTY', label: 'Faculty Mentor', icon: '🔬' },
  { id: 'UNIVERSITY_ADMIN', label: 'University Admin', icon: '🏛️' },
  { id: 'INDUSTRY_PARTNER', label: 'Industry & Startup', icon: '🚀' },
  { id: 'GOVERNMENT_OFFICIAL', label: 'Government Official', icon: '🏛️' },
];

export default function Navbar({ activeTab, setActiveTab, currentRole, setCurrentRole, onOpenSubmitModal }) {
  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', sticky: 'top', top: 0, zIndex: 100, padding: '14px 32px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* ECHO Brand Logo - Clean Public Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('demo')}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' }}>
            <Layers size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.45rem', fontWeight: '800', letterSpacing: '-0.03em', background: 'linear-gradient(90deg, #ffffff 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ECHO</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1' }}>Societal Innovation Platform</p>
          </div>
        </div>

        {/* Navigation Tabs - Focused on Core Product Features */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button 
            className={activeTab === 'demo' ? 'btn-primary' : 'btn-secondary'} 
            style={{ padding: '8px 14px', fontSize: '0.82rem', borderColor: activeTab === 'demo' ? 'var(--primary-500)' : 'rgba(16, 185, 129, 0.4)', color: activeTab === 'demo' ? '#fff' : '#34d399' }}
            onClick={() => setActiveTab('demo')}
          >
            <PlayCircle size={15} /> Live Demo Journey
          </button>
          <button 
            className={activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'} 
            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            onClick={() => setActiveTab('overview')}
          >
            <Compass size={15} /> Overview
          </button>
          <button 
            className={activeTab === 'problems' ? 'btn-primary' : 'btn-secondary'} 
            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            onClick={() => setActiveTab('problems')}
          >
            <Sparkles size={15} /> Explore Problems
          </button>
          <button 
            className={activeTab === 'projects' ? 'btn-primary' : 'btn-secondary'} 
            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            onClick={() => setActiveTab('projects')}
          >
            <FolderKanban size={15} /> Projects
          </button>
          <button 
            className={activeTab === 'impact' ? 'btn-primary' : 'btn-secondary'} 
            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            onClick={() => setActiveTab('impact')}
          >
            <BarChart3 size={15} /> Impact & Analytics
          </button>
          <button 
            className={activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'} 
            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={15} /> Workspace
          </button>
        </nav>

        {/* Role Switcher & Submit Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '4px 10px', borderRadius: 'var(--radius-md)' }}>
            <UserCheck size={15} style={{ color: 'var(--primary-500)' }} />
            <select 
              value={currentRole} 
              onChange={(e) => setCurrentRole(e.target.value)}
              style={{ background: 'transparent', color: 'var(--text-primary)', border: 'none', fontSize: '0.82rem', fontWeight: '600', outline: 'none', cursor: 'pointer' }}
            >
              {ROLES.map(r => (
                <option key={r.id} value={r.id} style={{ background: '#1e293b', color: '#f8fafc' }}>
                  {r.icon} {r.label}
                </option>
              ))}
            </select>
          </div>

          <button className="btn-primary" onClick={onOpenSubmitModal} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <PlusCircle size={16} /> Submit Problem
          </button>
        </div>

      </div>
    </header>
  );
}
