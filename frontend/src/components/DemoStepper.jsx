import React from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';

const STAGES = [
  { id: 1, title: '01 Problem', subtitle: 'Submission' },
  { id: 2, title: '02 AI Analysis', subtitle: '7-Factor Priority' },
  { id: 3, title: '03 University', subtitle: '16-Factor Match' },
  { id: 4, title: '04 Team', subtitle: 'Faculty & Student' },
  { id: 5, title: '05 Project', subtitle: 'Instantiation' },
  { id: 6, title: '06 Milestones', subtitle: 'Execution' },
  { id: 7, title: '07 Industry', subtitle: 'Sponsorship' },
  { id: 8, title: '08 Impact', subtitle: 'Outcome Scaling' },
];

export default function DemoStepper({ currentStep, setStep, maxReachedStep }) {
  return (
    <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '24px', border: '1px solid var(--border-glow)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflowX: 'auto', gap: '8px', paddingBottom: '4px' }}>
        {STAGES.map((s, idx) => {
          const isActive = currentStep === s.id;
          const isCompleted = currentStep > s.id;
          const isAccessible = s.id <= maxReachedStep;

          return (
            <React.Fragment key={s.id}>
              <div 
                onClick={() => isAccessible && setStep(s.id)}
                title={isAccessible ? `Jump to ${s.title}` : 'Complete preceding steps first'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  cursor: isAccessible ? 'pointer' : 'not-allowed',
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(67, 56, 202, 0.2) 100%)' 
                    : isCompleted 
                    ? 'rgba(16, 185, 129, 0.12)' 
                    : 'rgba(255, 255, 255, 0.02)',
                  border: isActive 
                    ? '1px solid var(--primary-500)' 
                    : isCompleted 
                    ? '1px solid rgba(16, 185, 129, 0.35)' 
                    : '1px solid var(--border-subtle)',
                  boxShadow: isActive ? '0 0 20px rgba(99, 102, 241, 0.3)' : 'none',
                  opacity: isAccessible ? 1 : 0.4,
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  whiteSpace: 'nowrap'
                }}
              >
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  background: isCompleted ? '#10b981' : isActive ? 'var(--primary-500)' : 'var(--bg-surface)', 
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '0.75rem', 
                  fontWeight: 800,
                  boxShadow: isCompleted ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'none'
                }}>
                  {isCompleted ? <CheckCircle2 size={14} /> : s.id}
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isActive ? '#f8fafc' : isCompleted ? '#6ee7b7' : 'var(--text-secondary)' }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    {s.subtitle}
                  </div>
                </div>
              </div>

              {idx < STAGES.length - 1 && (
                <ChevronRight size={14} style={{ color: idx < currentStep ? '#10b981' : 'var(--text-muted)', flexShrink: 0 }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
