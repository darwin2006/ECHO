import React from 'react';
import { 
  Layers, 
  PlusCircle, 
  UserCheck, 
  Sparkles, 
  LayoutDashboard, 
  Compass, 
  FolderKanban, 
  PlayCircle, 
  BarChart3,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';

const ROLES = [
  { id: 'COMMUNITY_MEMBER', label: 'Citizen / Community', icon: '🏙️' },
  { id: 'STUDENT', label: 'Student Innovator', icon: '🎓' },
  { id: 'FACULTY', label: 'Faculty Mentor', icon: '🔬' },
  { id: 'UNIVERSITY_ADMIN', label: 'University Admin', icon: '🏛️' },
  { id: 'INDUSTRY_PARTNER', label: 'Industry & Startup', icon: '🚀' },
  { id: 'GOVERNMENT_OFFICIAL', label: 'Government Official', icon: '🏛️' },
];

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  currentRole, 
  setCurrentRole, 
  onOpenSubmitModal,
  isCollapsed,
  onToggleCollapse
}) {
  const sidebarWidth = isCollapsed ? '72px' : '260px';

  return (
    <aside 
      className="echo-sidebar"
      style={{ width: sidebarWidth }}
    >
      {/* Top Header: ECHO Logo & Collapse Toggle */}
      <div style={{ padding: isCollapsed ? '16px 12px' : '16px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'space-between' }}>
          
          {/* Brand Logo & Name */}
          <div 
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            onClick={onToggleCollapse}
            title={isCollapsed ? "Click to expand sidebar" : "Click to collapse sidebar"}
          >
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '8px', 
              background: '#111111', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Layers size={20} color="#ffffff" />
            </div>

            {!isCollapsed && (
              <div>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#111111' }}>
                  ECHO
                </span>
                <p style={{ fontSize: '0.68rem', color: '#888888', lineHeight: 1 }}>Societal Innovation</p>
              </div>
            )}
          </div>

          {/* Toggle Button */}
          {!isCollapsed && (
            <button 
              onClick={onToggleCollapse} 
              style={{ background: 'none', border: 'none', color: '#888888', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
              title="Collapse sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          )}

        </div>
      </div>

      {/* Navigation Modules (Middle Section) */}
      <div style={{ flex: 1, padding: isCollapsed ? '16px 8px' : '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
        {[
          { id: 'demo', label: 'Live Demo Journey', icon: PlayCircle },
          { id: 'overview', label: 'Overview', icon: Compass },
          { id: 'problems', label: 'Explore Problems', icon: Sparkles },
          { id: 'projects', label: 'Projects', icon: FolderKanban },
          { id: 'impact', label: 'Impact & Analytics', icon: BarChart3 },
          { id: 'dashboard', label: 'Workspace', icon: LayoutDashboard },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              title={isCollapsed ? item.label : undefined}
              style={{
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                padding: isCollapsed ? '12px 0' : '10px 14px',
                borderLeft: isActive && !isCollapsed ? '3px solid var(--brand-blue)' : '3px solid transparent'
              }}
            >
              <Icon size={18} style={{ color: isActive ? 'var(--brand-blue)' : '#555555', flexShrink: 0 }} />
              {!isCollapsed && (
                <span style={{ fontSize: '0.88rem' }}>{item.label}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Footer: Role Switcher & Submit Action */}
      <div style={{ padding: isCollapsed ? '16px 8px' : '16px 16px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        
        {/* Role Switcher */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          background: 'var(--surface-secondary)', 
          border: '1px solid var(--border)', 
          padding: isCollapsed ? '8px' : '6px 10px', 
          borderRadius: '8px',
          justifyContent: isCollapsed ? 'center' : 'flex-start'
        }}>
          <UserCheck size={16} style={{ color: '#111111', flexShrink: 0 }} />
          {!isCollapsed && (
            <select 
              value={currentRole} 
              onChange={(e) => setCurrentRole(e.target.value)}
              style={{ background: 'transparent', color: '#111111', border: 'none', fontSize: '0.8rem', fontWeight: '600', outline: 'none', cursor: 'pointer', width: '100%' }}
            >
              {ROLES.map(r => (
                <option key={r.id} value={r.id} style={{ background: '#FFFFFF', color: '#111111' }}>
                  {r.icon} {r.label}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Submit Problem Action Button */}
        <button 
          className="btn-primary" 
          onClick={onOpenSubmitModal} 
          style={{ 
            width: '100%', 
            justifyContent: 'center', 
            padding: isCollapsed ? '10px 0' : '10px 16px',
            fontSize: '0.85rem'
          }}
          title={isCollapsed ? "Submit Problem" : undefined}
        >
          <PlusCircle size={16} />
          {!isCollapsed && <span>Submit Problem</span>}
        </button>

      </div>
    </aside>
  );
}
