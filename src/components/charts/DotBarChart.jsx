import React, { useState } from 'react';

/**
 * Dot Bar / Step Matrix Component
 * Displays discrete visual dots for question accuracy or milestone calibration.
 */
export default function DotBarChart({
  items = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    status: [7, 18, 29].includes(i + 1) ? 'incorrect' : 'correct',
    type: (i + 1) <= 14 ? 'True/False/NG' : (i + 1) <= 26 ? 'Multiple Choice' : 'Matching'
  })),
  dotsPerRow = 20
}) {
  const [hoveredDot, setHoveredDot] = useState(null);

  const correctCount = items.filter(d => d.status === 'correct').length;
  const totalCount = items.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
      {/* Top Summary */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
        <span style={{ color: '#64748B', fontWeight: '500' }}>Item-by-Item Calibration</span>
        <span style={{ fontWeight: '700', color: '#0F172A' }}>{correctCount} / {totalCount} Correct ({Math.round((correctCount / totalCount) * 100)}%)</span>
      </div>

      {/* Grid of Dots */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${dotsPerRow}, 1fr)`, 
          gap: '6px',
          padding: '12px 14px',
          background: '#F8FAFC',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          position: 'relative'
        }}
      >
        {items.map((dot) => {
          const isCorrect = dot.status === 'correct';
          const isHovered = hoveredDot?.id === dot.id;

          return (
            <div
              key={dot.id}
              style={{
                aspectRatio: '1/1',
                borderRadius: '50%',
                background: isCorrect ? '#10B981' : '#C81E2E',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                transform: isHovered ? 'scale(1.4)' : 'scale(1)',
                boxShadow: isHovered ? '0 0 0 2px #FFFFFF, 0 0 0 4px #0F172A' : 'none'
              }}
              onMouseEnter={() => setHoveredDot(dot)}
              onMouseLeave={() => setHoveredDot(null)}
            />
          );
        })}
      </div>

      {/* Floating Hover Details */}
      <div style={{ minHeight: '18px', fontSize: '11px', color: '#64748B', textAlign: 'center' }}>
        {hoveredDot ? (
          <span>
            Question <strong>#{hoveredDot.id}</strong> ({hoveredDot.type}) —{' '}
            <strong style={{ color: hoveredDot.status === 'correct' ? '#10B981' : '#C81E2E' }}>
              {hoveredDot.status === 'correct' ? 'Correct (+1.0)' : 'Missed (Distractor Trap)'}
            </strong>
          </span>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
              Correct (37)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C81E2E' }} />
              Incorrect (3)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
