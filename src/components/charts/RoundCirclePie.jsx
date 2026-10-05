import React from 'react';

/**
 * Round Circle Pie / Radial Gauge Component
 * Visualizes overall progress towards Target Band 8.0 with smooth SVG circular arcs.
 */
export default function RoundCirclePie({
  value = 7.5,
  maxVal = 9.0,
  target = 8.0,
  size = 170,
  strokeWidth = 10,
  primaryColor = '#C81E2E',
  trackColor = '#F1F5F9'
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.min(1, Math.max(0, value / maxVal));
  const strokeDashoffset = circumference * (1 - progressRatio);

  const targetRatio = Math.min(1, Math.max(0, target / maxVal));
  const targetAngle = targetRatio * 360 - 90; // Starting from top
  const targetRad = (targetAngle * Math.PI) / 180;
  const targetX = size / 2 + (radius + 1) * Math.cos(targetRad);
  const targetY = size / 2 + (radius + 1) * Math.sin(targetRad);

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background Track Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />

        {/* Value Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={primaryColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>

      {/* Target Marker Pin */}
      <div 
        style={{
          position: 'absolute',
          left: `${targetX}px`,
          top: `${targetY}px`,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#0F172A',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 0 2px #FFFFFF'
        }}
        title={`Target: ${target}`}
      />

      {/* Center Label (Clean Bold Number + Minimal Subtext) */}
      <div style={{ position: 'absolute', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: '32px', fontWeight: '800', color: '#0F172A', lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748B', marginTop: '3px' }}>
          Target {target}
        </div>
      </div>
    </div>
  );
}
