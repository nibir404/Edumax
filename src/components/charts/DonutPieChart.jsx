import React, { useState } from 'react';

/**
 * Donut / Multi-Segment Pie Chart Component
 * Visualizes question categories, question accuracy, or batch distributions.
 */
export default function DonutPieChart({
  segments = [
    { label: 'True / False / NG', value: 14, color: '#C81E2E' },
    { label: 'Multiple Choice', value: 11, color: '#0F172A' },
    { label: 'Matching Headings', value: 8, color: '#10B981' },
    { label: 'Sentence Fill-ins', value: 7, color: '#94A3B8' }
  ],
  size = 170,
  strokeWidth = 14,
  centerTitle = '40',
  centerSubtitle = 'Questions'
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const total = segments.reduce((acc, s) => acc + s.value, 0) || 1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const segmentsWithOffset = segments.map((seg, i) => {
    const percent = seg.value / total;
    const currentOffset = segments.slice(0, i).reduce((sum, s) => sum + (s.value / total), 0);
    return {
      ...seg,
      percent,
      strokeDasharray: `${circumference * percent} ${circumference * (1 - percent)}`,
      strokeDashoffset: -circumference * currentOffset
    };
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
      
      {/* Donut Graphic */}
      <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
          {segmentsWithOffset.map((seg, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <circle
                key={idx}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
                strokeDasharray={seg.strokeDasharray}
                strokeDashoffset={seg.strokeDashoffset}
                style={{ 
                  transition: 'all 0.2s ease', 
                  cursor: 'pointer',
                  opacity: hoveredIdx !== null && !isHovered ? 0.45 : 1
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            );
          })}
        </svg>

        {/* Center Text */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', lineHeight: 1 }}>
            {hoveredIdx !== null ? segments[hoveredIdx].value : centerTitle}
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', fontWeight: '500' }}>
            {hoveredIdx !== null ? segments[hoveredIdx].label.split(' ')[0] : centerSubtitle}
          </div>
        </div>
      </div>

      {/* Clean Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '140px' }}>
        {segments.map((seg, idx) => {
          const pct = Math.round((seg.value / total) * 100);
          const isHovered = hoveredIdx === idx;
          return (
            <div 
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                fontSize: '12px',
                cursor: 'pointer',
                opacity: hoveredIdx !== null && !isHovered ? 0.5 : 1,
                transition: 'opacity 0.15s ease'
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: seg.color }} />
                <span style={{ color: isHovered ? '#0F172A' : '#334155', fontWeight: isHovered ? '700' : '500' }}>
                  {seg.label}
                </span>
              </div>
              <span style={{ fontWeight: '700', color: '#0F172A' }}>
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
