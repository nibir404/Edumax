import React, { useState } from 'react';
import SpiderChart from '../../components/charts/SpiderChart';
import DotBarChart from '../../components/charts/DotBarChart';
import DonutPieChart from '../../components/charts/DonutPieChart';

export default function ProgressAnalytics() {
  const [activeTab, setActiveTab] = useState('reading');

  const skillsData = [
    { label: 'Listening', current: 8.5, target: 8.0 },
    { label: 'Reading', current: 8.0, target: 8.0 },
    { label: 'Writing', current: 7.0, target: 8.0 },
    { label: 'Speaking', current: 7.5, target: 8.0 }
  ];

  const subskillBreakdown = [
    { skill: 'Everyday Dialogue (Listening Sec 1-2)', score: 96, band: 9.0 },
    { skill: 'Academic Monologues (Listening Sec 3-4)', score: 88, band: 8.0 },
    { skill: 'True / False / Not Given (Reading)', score: 85, band: 8.0 },
    { skill: 'Heading Matching (Reading)', score: 90, band: 8.5 },
    { skill: 'Fluency & Discourse (Speaking Part 2)', score: 84, band: 7.5 },
    { skill: 'Lexical Range & Idioms (Speaking)', score: 88, band: 8.0 },
    { skill: 'Data Trends & Synthesis (Writing Task 1)', score: 80, band: 7.5 },
    { skill: 'Coherence & Task Response (Writing Task 2)', score: 68, band: 6.5 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.3px', margin: 0 }}>
          Progress Analytics & Band Predictor
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px', margin: 0 }}>
          Real-time competency calibration against Cambridge IELTS assessment rubrics
        </p>
      </div>

      {/* Top Prediction Metric - Minimalist 60/30/10 Card */}
      <div 
        className="edu-card" 
        style={{ 
          padding: '24px 28px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '20px',
          background: '#FFFFFF',
          borderLeft: '4px solid var(--primary-red)'
        }}
      >
        <div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
            Official Score Projection
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>
            Band 8.0 Target Attainable
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
            Projected range: <strong>Band 7.5 — 8.0</strong> • Receptive skills leading with 8.5 average.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>Statistical Confidence</div>
            <div style={{ fontSize: '26px', fontWeight: '800', color: '#10B981' }}>94%</div>
          </div>
          <div style={{ width: '1px', height: '36px', background: 'var(--border-color)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>Target Attainment</div>
            <div style={{ fontSize: '26px', fontWeight: '800', color: 'var(--primary-red)' }}>93.8%</div>
          </div>
        </div>
      </div>

      {/* Visual Analytics Row 1: Spider Chart + Item Dot Bar Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* 4-Skill Spider / Radar Chart */}
        <div className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', marginBottom: '14px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Skill Profile</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>4-Skill Competency Spider</div>
          </div>

          <SpiderChart skills={skillsData} size={240} />
        </div>

        {/* 40-Question Item-by-Item Dot Bar Chart */}
        <div className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Visual Dot Matrix</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>40-Question Accuracy Map</div>
              </div>
              <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-subtle)', padding: '2px', borderRadius: '6px' }}>
                {['reading', 'listening'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: activeTab === tab ? '#FFFFFF' : 'none',
                      border: 'none',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: activeTab === tab ? '700' : '500',
                      color: activeTab === tab ? '#0F172A' : '#64748B',
                      cursor: 'pointer'
                    }}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Dot Bar Visual */}
            <DotBarChart dotsPerRow={20} />
          </div>

          {/* Sub-note */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', marginTop: '14px', display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
            <span>Receptive Raw Score: <strong>37 / 40</strong></span>
            <span style={{ color: 'var(--primary-red)', fontWeight: '600' }}>3 Distractor Traps Flagged</span>
          </div>
        </div>

      </div>

      {/* Visual Analytics Row 2: Sub-Skill Progress Bars + Donut Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* Sub-Skill Mastery Bars */}
        <div className="edu-card" style={{ padding: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Micro-Skill Calibrations</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Skill Mastery Matrix</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {subskillBreakdown.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{item.skill}</span>
                  <span style={{ fontWeight: '700', color: item.score >= 85 ? '#10B981' : item.score >= 75 ? '#0F172A' : 'var(--primary-red)' }}>
                    Band {item.band} ({item.score}%)
                  </span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      width: `${item.score}%`, 
                      height: '100%', 
                      background: item.score >= 85 ? '#10B981' : item.score >= 75 ? '#0F172A' : 'var(--primary-red)',
                      borderRadius: '3px'
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error Types Donut Pie */}
        <div className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Deduction Analysis</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Error Type Distribution</div>
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DonutPieChart 
              segments={[
                { label: 'Distractor Traps', value: 5, color: '#C81E2E' },
                { label: 'Time Management', value: 4, color: '#0F172A' },
                { label: 'Spelling / Grammar', value: 2, color: '#10B981' },
                { label: 'Vocabulary Gaps', value: 2, color: '#94A3B8' }
              ]}
              size={170}
              strokeWidth={14}
              centerTitle="13"
              centerSubtitle="Total Errors"
            />
          </div>
        </div>

      </div>

    </div>
  );
}
