import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import LandingHero from './components/LandingHero';
import ProblemsExplorer from './components/ProblemsExplorer';
import SubmitProblemModal from './components/SubmitProblemModal';
import ProblemDetailModal from './components/ProblemDetailModal';
import DemoJourneyView from './components/demo/DemoJourneyView';
import ImpactAnalyticsView from './components/ImpactAnalyticsView';

// Role Dashboards
import CitizenDashboard from './components/dashboards/CitizenDashboard';
import StudentDashboard from './components/dashboards/StudentDashboard';
import FacultyDashboard from './components/dashboards/FacultyDashboard';
import UniversityAdminDashboard from './components/dashboards/UniversityAdminDashboard';
import IndustryPartnerDashboard from './components/dashboards/IndustryPartnerDashboard';
import GovernmentOfficialDashboard from './components/dashboards/GovernmentOfficialDashboard';

import { api } from './services/api';
import { Layers, PanelLeft, PlusCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('demo');
  const [currentRole, setCurrentRole] = useState('COMMUNITY_MEMBER');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const [problems, setProblems] = useState([]);
  const [problemsLoading, setProblemsLoading] = useState(true);

  const [projects, setProjects] = useState([]);

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  // Initial Data Fetching from FastAPI Backend
  useEffect(() => {
    loadProblems();
    loadProjects();
  }, []);

  async function loadProblems() {
    setProblemsLoading(true);
    try {
      const resp = await api.getProblems();
      setProblems(resp.data || []);
    } catch (err) {
      console.error('Failed to load problems', err);
    } finally {
      setProblemsLoading(false);
    }
  }

  async function loadProjects() {
    try {
      const resp = await api.getProjects();
      setProjects(resp.data || []);
    } catch (err) {
      console.error('Failed to load projects', err);
    }
  }

  // Render Workspace Dashboard based on selected Role
  const renderRoleDashboard = () => {
    switch (currentRole) {
      case 'COMMUNITY_MEMBER':
        return <CitizenDashboard problems={problems} onOpenSubmit={() => setIsSubmitModalOpen(true)} onSelectProblem={setSelectedProblemId} />;
      case 'STUDENT':
        return <StudentDashboard projects={projects} onSelectProblem={setSelectedProblemId} />;
      case 'FACULTY':
        return <FacultyDashboard projects={projects} />;
      case 'UNIVERSITY_ADMIN':
        return <UniversityAdminDashboard problems={problems} onSelectProblem={setSelectedProblemId} />;
      case 'INDUSTRY_PARTNER':
        return <IndustryPartnerDashboard projects={projects} onSelectProblem={setSelectedProblemId} />;
      case 'GOVERNMENT_OFFICIAL':
        return <GovernmentOfficialDashboard problems={problems} onSelectProblem={setSelectedProblemId} />;
      default:
        return <CitizenDashboard problems={problems} onOpenSubmit={() => setIsSubmitModalOpen(true)} onSelectProblem={setSelectedProblemId} />;
    }
  };

  const mainMarginLeft = isSidebarCollapsed ? '72px' : '260px';

  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: 'var(--background)' }}>
      
      {/* Subtle Application Background Watermark */}
      <div className="app-watermark-bg">ECHO</div>

      {/* Left Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentRole={currentRole} 
        setCurrentRole={setCurrentRole} 
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Area Wrapper */}
      <div style={{ 
        marginLeft: mainMarginLeft, 
        transition: 'margin-left 0.22s cubic-bezier(0.4, 0, 0.2, 1)', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative', 
        zIndex: 1 
      }}>

        {/* Main View Container */}
        <main style={{ flex: 1, maxWidth: '1360px', width: '100%', margin: '0 auto', padding: '32px 28px' }}>
          
          {activeTab === 'demo' && (
            <DemoJourneyView onFlowComplete={() => loadProjects()} />
          )}

          {activeTab === 'overview' && (
            <LandingHero 
              onLaunchDemo={() => setActiveTab('demo')} 
              onOpenSubmit={() => setIsSubmitModalOpen(true)} 
            />
          )}

          {activeTab === 'problems' && (
            <ProblemsExplorer 
              problems={problems} 
              loading={problemsLoading} 
              onSelectProblem={setSelectedProblemId} 
              onRefresh={loadProblems} 
            />
          )}

          {activeTab === 'projects' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#111111' }}>Active Solution Projects</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
                {projects.map(p => (
                  <div key={p.project_id} className="glass-panel" style={{ padding: '20px', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
                    <span className="badge badge-success" style={{ marginBottom: '8px' }}>{p.status}</span>
                    <h3 style={{ fontSize: '1.1rem', color: '#111111', margin: '4px 0' }}>{p.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>University: {p.university_name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'impact' && (
            <ImpactAnalyticsView />
          )}

          {activeTab === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5E5E5', paddingBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--brand-blue)', fontWeight: 700 }}>WORKSPACE</span>
                  <h2 style={{ fontSize: '1.6rem' }}>Role-Based Command Center</h2>
                </div>
                <div style={{ padding: '6px 16px', background: '#FFFFFF', borderRadius: '8px', fontSize: '0.85rem', border: '1px solid #E5E5E5' }}>
                  Active Role: <strong style={{ color: '#111111' }}>{currentRole}</strong>
                </div>
              </div>
              {renderRoleDashboard()}
            </div>
          )}

        </main>

        {/* Global Modals */}
        <SubmitProblemModal 
          isOpen={isSubmitModalOpen} 
          onClose={() => setIsSubmitModalOpen(false)} 
          onProblemSubmitted={() => { loadProblems(); setActiveTab('problems'); }} 
        />

        <ProblemDetailModal 
          problemId={selectedProblemId} 
          onClose={() => setSelectedProblemId(null)} 
        />

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
}
