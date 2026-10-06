import React from 'react';
import edumaxLogo from '../assets/logoBase64.js';

export default function Logo({ size = 'medium', showSubtitle = true, inverted = false }) {
  const isSmall = size === 'small';
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
      <img 
        src={edumaxLogo} 
        alt="Edumax Consultancy" 
        style={{
          height: isSmall ? '32px' : '42px',
          objectFit: 'contain',
          filter: inverted ? 'brightness(0) invert(1)' : 'none'
        }}
        onError={(e) => {
          // Fallback to custom vector emblem if image path fails
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      
      {/* SVG Fallback */}
      <div style={{ display: 'none', alignItems: 'center', gap: '8px' }}>
        <svg width={isSmall ? "28" : "36"} height={isSmall ? "28" : "36"} viewBox="0 0 100 100" fill="none">
          {/* Top Left: Charcoal */}
          <rect x="10" y="10" width="36" height="36" rx="14" fill="#2D3136" />
          {/* Top Right: Crimson */}
          <rect x="54" y="10" width="36" height="36" rx="14" fill="#C81E2E" />
          {/* Bottom Left: Crimson */}
          <rect x="10" y="54" width="36" height="36" rx="14" fill="#C81E2E" />
          {/* Bottom Right: Crimson */}
          <rect x="54" y="54" width="36" height="36" rx="14" fill="#C81E2E" />
        </svg>
        <div>
          <div style={{
            fontSize: isSmall ? '15px' : '18px',
            fontWeight: '800',
            letterSpacing: '0.5px',
            color: '#C81E2E',
            lineHeight: 1
          }}>
            EDUMAX
          </div>
          {showSubtitle && (
            <div style={{
              fontSize: isSmall ? '10px' : '12px',
              fontWeight: '700',
              letterSpacing: '1px',
              color: '#2D3136',
              lineHeight: 1.2
            }}>
              CONSULTANCY
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
