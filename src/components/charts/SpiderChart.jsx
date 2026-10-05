import React, { useState } from 'react';

/**
 * Spider / Radar Chart Component (4-Skill IELTS Benchmark)
 * Visualizes Listening, Reading, Writing, and Speaking against Target Band 8.0.
 */
export default function SpiderChart({
  skills = [
    { label: 'Listening', current: 8.5, target: 8.0 },
    { label: 'Reading', current: 8.0, target: 8.0 },
    { label: 'Writing', current: 7.0, target: 8.0 },
    { label: 'Speaking', current: 7.5, target: 8.0 }
  ],
  size = 230,
  maxBand = 9.0
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const center = size / 2;
  const radius = size * 0.38;

  // 4 axes angles: Top (Listening: -90deg), Right (Reading: 0deg), Bottom (Writing: 90deg), Left (Speaking: 180deg)
  const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];

  // Helper to convert band to (x, y) coordinates
  const getCoords = (val, angle) => {
    const r = (val / maxBand) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Concentric radar web levels (Band 3, 6, 9)
  const gridLevels = [3.0, 6.0, 9.0];

  // Polygon points string for target
  const targetPoints = skills.map((s, i) => {
    const pt = getCoords(s.target, angles[i]);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  // Polygon points string for candidate current
  const currentPoints = skills.map((s, i) => {
    const pt = getCoords(s.current, angles[i]);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
        {/* Background Concentric Radar Polygons */}
        {gridLevels.map((lvl) => {
          const pts = angles.map(a => {
            const p = getCoords(lvl, a);
            return `${p.x},${p.y}`;
          }).join(' ');
          return (
            <g key={lvl}>
              <polygon
                points={pts}
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="1"
                strokeDasharray={lvl === 9.0 ? 'none' : '3 3'}
              />
              <text
                x={center + 3}
                y={center - (lvl / maxBand) * radius + 10}
                fontSize="9"
                fontWeight="500"
                fill="#94A3B8"
              >
                {lvl}
              </text>
            </g>
          );
        })}

        {/* Radiating Axis Lines */}
        {angles.map((a, i) => {
          const end = getCoords(maxBand, a);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke="#E2E8F0"
              strokeWidth="1"
            />
          );
        })}

        {/* Target Benchmark Polygon (Dashed Slate) */}
        <polygon
          points={targetPoints}
          fill="none"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Candidate Current Score Polygon (Filled Red Tint with Crisp Red Stroke) */}
        <polygon
          points={currentPoints}
          fill="rgba(200, 30, 46, 0.12)"
          stroke="#C81E2E"
          strokeWidth="2"
        />

        {/* Data Point Nodes with Hover Interaction */}
        {skills.map((s, i) => {
          const pt = getCoords(s.current, angles[i]);
          const isHovered = hoveredIdx === i;
          return (
            <g 
              key={i} 
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? 6 : 4}
                fill="#C81E2E"
                stroke="#FFFFFF"
                strokeWidth="2"
                style={{ transition: 'r 0.15s ease' }}
              />
            </g>
          );
        })}

        {/* Axis Labels (Positioned outside the outer ring) */}
        {skills.map((s, i) => {
          const angle = angles[i];
          const labelDist = radius + 22;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);
          const isHovered = hoveredIdx === i;

          return (
            <text
              key={i}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="11.5"
              fontWeight={isHovered ? '700' : '600'}
              fill={isHovered ? '#C81E2E' : '#334155'}
            >
              {s.label} ({s.current})
            </text>
          );
        })}
      </svg>

      {/* Floating Tooltip Pill */}
      {hoveredIdx !== null && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#0F172A',
          color: '#FFFFFF',
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '11px',
          fontWeight: '600',
          pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          whiteSpace: 'nowrap'
        }}>
          {skills[hoveredIdx].label}: Band {skills[hoveredIdx].current} (Target {skills[hoveredIdx].target})
        </div>
      )}

      {/* Minimal Legend */}
      <div style={{ display: 'flex', gap: '16px', marginTop: '14px', fontSize: '11.5px', color: '#64748B' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#C81E2E' }} />
          <span style={{ fontWeight: '600', color: '#0F172A' }}>Current Band</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '12px', height: '0px', borderTop: '2px dashed #94A3B8' }} />
          <span>Target 8.0</span>
        </div>
      </div>
    </div>
  );
}
