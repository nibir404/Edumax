import React from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  Target, 
  Award, 
  Calendar, 
  CheckCircle,
  HelpCircle,
  ArrowUpRight
} from 'lucide-react';
import { CURRENT_USERS } from '../../data/mockData';

export default function ProgressAnalytics() {
  const user = CURRENT_USERS.student;

  const masteryGrid = [
    { skill: 'Listening: Section 1 & 2 (Everyday Social)', mastery: 96, status: 'Mastered' },
    { skill: 'Listening: Section 3 & 4 (Academic Seminars)', mastery: 90, status: 'Mastered' },
    { skill: 'Reading: True / False / Not Given Recognition', mastery: 89, status: 'Proficient' },
    { skill: 'Reading: Headings & Paragraph Matching', mastery: 85, status: 'Proficient' },
    { skill: 'Speaking: Fluency & Discourse Markers', mastery: 84, status: 'Proficient' },
    { skill: 'Speaking: Lexical Resource & Idiomatic Flow', mastery: 88, status: 'Proficient' },
    { skill: 'Writing: Task 1 Report Overview & Data Trends', mastery: 80, status: 'Solid' },
    { skill: 'Writing: Task 2 Complex Grammar & Collocations', mastery: 68, status: 'Needs Improvement' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
          Progress Analytics & Band Predictor
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
          Empirical competency mapping based on authentic Cambridge score scaling algorithms.
        </p>
      </div>

      {/* Top Prediction Widget (AI Predicted Band) */}
      <div 
        className="edu-card" 
        style={{ 
          padding: '28px', 
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', 
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div style={{ maxWidth: '540px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase' }}>
            <Sparkles size={16} />
            <span>AI Predictive Exam Algorithm</span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginTop: '6px' }}>
            Projected Official Score: Band 8.0
          </h2>
          <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '6px', lineHeight: 1.6 }}>
            Based on your last 4 mock iterations, high Listening performance (8.5), and strong speaking flow, our regression model projects an official test score between <strong>Band 7.5 and 8.0</strong>.
          </p>
        </div>

        <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.06)', padding: '20px 32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '600' }}>Model Confidence</div>
          <div style={{ fontSize: '38px', fontWeight: '900', color: '#10B981', lineHeight: 1.1, marginTop: '4px' }}>94%</div>
          <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '4px' }}>High Statistical Reliability</div>
        </div>
      </div>

      {/* Skill Mastery Grid (Panacea / Lurni Style) */}
      <div className="edu-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Sub-Skill Mastery Matrix</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {masteryGrid.map((item, idx) => (
            <div key={idx} style={{ padding: '16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{item.skill}</span>
                <span className={`badge ${item.mastery >= 90 ? 'badge-green' : item.mastery >= 80 ? 'badge-blue' : 'badge-amber'}`}>
                  {item.mastery}%
                </span>
              </div>
              <div style={{ height: '7px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${item.mastery}%`, 
                  height: '100%', 
                  background: item.mastery >= 90 ? 'var(--accent-green)' : item.mastery >= 80 ? 'var(--accent-blue)' : 'var(--accent-amber)' 
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
