import React, { useState } from 'react';

/**
 * Modulix-Inspired Track Bar Chart
 * Features full-height background track capsules, smooth rounded bars,
 * hatched active bar indicator, and floating dark tooltip capsule.
 */
export default function TrackBarChart({
  items = [
    { label: 'Apr', value: 6.0, detail: 'Diagnostic Mock' },
    { label: 'May', value: 6.5, detail: 'Sectional Mock 1' },
    { label: 'Jun', value: 6.5, detail: 'Sectional Mock 2' },
    { label: 'Jul', value: 7.0, detail: 'Mid-Term Full Exam' },
    { label: 'Aug', value: 7.0, detail: 'Intensive Mock' },
    { label: 'Sep', value: 7.5, detail: 'Cohort Official Sim' },
    { label: 'Oct', value: 7.5, detail: 'Latest Mock (Top 8%)', isSelected: true },
    { label: 'Nov', value: 8.0, detail: 'Projected Target' }
  ],
  maxVal = 9.0,
  height = 190,
  accentColor = '#0F172A',
  brandColor = '#C81E2E'
}) {
  const initialIdx = items.findIndex(i => i.isSelected);
  const [activeIdx, setActiveIdx] = useState(initialIdx >= 0 ? initialIdx : Math.max(0, items.length - 1));
  const safeIdx = (activeIdx >= 0 && activeIdx < items.length) ? activeIdx : Math.max(0, items.length - 1);
  const activeItem = items[safeIdx] || { label: '', detail: '', value: 0 };

  return (
    <div style={{ width: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      
      {/* Chart Canvas with Horizontal Grid Guides */}
      <div 
        style={{ 
          height: `${height}px`, 
          display: 'flex', 
          alignItems: 'flex-end', 
          justifyContent: 'space-between',
          position: 'relative',
          paddingBottom: '6px',
          borderBottom: '1px solid #E2E8F0'
        }}
      >
        {/* Subtle Horizontal Benchmark Guide */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: 0,
          right: 0,
          borderTop: '1px dashed #E2E8F0',
          pointerEvents: 'none'
        }}>
          <span style={{ position: 'absolute', right: 0, top: '-14px', fontSize: '9.5px', color: '#94A3B8' }}>
            Band 8.0 Target
          </span>
        </div>

        {/* Bar Columns */}
        {items.map((item, idx) => {
          const heightPercent = Math.min(100, Math.max(12, (item.value / maxVal) * 100));
          const isActive = activeIdx === idx;

          return (
            <div
              key={idx}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'flex-end',
                position: 'relative',
                cursor: 'pointer',
                padding: '0 4px'
              }}
              onMouseEnter={() => setActiveIdx(idx)}
              onClick={() => setActiveIdx(idx)}
            >
              {/* Floating Tooltip Capsule on Active Bar (Modulix Style) */}
              {isActive && (
                <div 
                  style={{
                    position: 'absolute',
                    bottom: `calc(${heightPercent}% + 14px)`,
                    background: accentColor,
                    color: '#FFFFFF',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    zIndex: 20,
                    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.16)',
                    animation: 'fadeIn 0.15s ease'
                  }}
                >
                  <div style={{ fontSize: '10px', color: '#94A3B8' }}>{item.label} 2025</div>
                  <div style={{ fontWeight: '700', fontSize: '12.5px', color: '#FFFFFF' }}>Band {item.value}</div>
                  {/* Tooltip Down Arrow */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    borderTop: `4px solid ${accentColor}`
                  }} />
                </div>
              )}

              {/* Background Pillar Track (Full Height Rounded Capsule) */}
              <div 
                style={{
                  width: 'clamp(20px, 3.2vw, 36px)',
                  height: '92%',
                  background: '#F1F5F9',
                  borderRadius: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '3px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'background 0.2s ease'
                }}
              >
                {/* Active Bar Indicator Ring at top of track */}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    top: '6px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#0F172A'
                  }} />
                )}

                {/* Filled Value Bar */}
                <div 
                  style={{
                    width: '100%',
                    height: `${heightPercent}%`,
                    background: isActive 
                      ? 'repeating-linear-gradient(45deg, #1E293B, #1E293B 4px, #0F172A 4px, #0F172A 8px)' 
                      : (item.value >= 7.5 ? brandColor : '#CBD5E1'),
                    borderRadius: '14px',
                    transition: 'height 0.4s ease, background 0.2s ease'
                  }}
                />
              </div>

              {/* X-Axis Month Label */}
              <span 
                style={{
                  fontSize: '11px',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#0F172A' : '#64748B',
                  marginTop: '8px'
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Subtext info for selected month */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '11.5px', color: '#64748B' }}>
        <div>
          Selected: <strong style={{ color: '#0F172A' }}>{activeItem.label}</strong> {activeItem.detail ? `— ${activeItem.detail}` : ''}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: brandColor }} />
          <span>Band 7.5+ Achieved</span>
        </div>
      </div>
    </div>
  );
}
