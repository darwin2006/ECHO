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
    <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '24px', background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
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
                  borderRadius: '8px',
                  cursor: isAccessible ? 'pointer' : 'not-allowed',
                  background: isActive 
                    ? '#111111' 
                    : isCompleted 
                    ? '#F3F3F3' 
                    : '#FFFFFF',
                  border: isActive 
                    ? '1px solid #111111' 
                    : isCompleted 
                    ? '1px solid #E5E5E5' 
                    : '1px solid #E5E5E5',
                  opacity: isAccessible ? 1 : 0.45,
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  background: isActive ? '#FFFFFF' : isCompleted ? '#111111' : '#F3F3F3', 
                  color: isActive ? '#111111' : isCompleted ? '#FFFFFF' : '#555555', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '0.75rem', 
                  fontWeight: 800
                }}>
                  {isCompleted ? <CheckCircle2 size={14} color="#ffffff" /> : s.id}
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isActive ? '#FFFFFF' : '#111111' }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: isActive ? '#CCCCCC' : '#888888' }}>
                    {s.subtitle}
                  </div>
                </div>
              </div>

              {idx < STAGES.length - 1 && (
                <ChevronRight size={14} style={{ color: '#888888', flexShrink: 0 }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
