import React, { useState } from 'react';
import { 
  Headphones, 
  Play, 
  Pause, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft,
  Clock,
  Sparkles,
  BarChart3,
  RotateCcw
} from 'lucide-react';
import { DETAILED_RESULT } from '../../data/mockData';

export default function ListeningResultDetail({ onBack, onReviewAnswers }) {
  const data = DETAILED_RESULT.listening;
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(35); // simulated 35%

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Back button & Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Back to All Results</span>
        </button>
        <span className="badge badge-blue">Official Cambridge Format</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--accent-blue-light)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Headphones size={22} />
            </div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
                Listening Result Analysis • Band {data.band}
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                Mock #109 • Evaluated on {DETAILED_RESULT.date} • Score: <strong>{data.score}</strong> ({data.accuracy})
              </p>
            </div>
          </div>
        </div>

        <button className="btn btn-primary" onClick={onReviewAnswers}>
          <CheckCircle2 size={16} />
          <span>Question-by-Question Review</span>
        </button>
      </div>

      {/* Simulated Audio Player with Waveform (Lurni & Panacea High-End Style) */}
      <div className="edu-card" style={{ padding: '24px', background: '#0F172A', color: '#FFFFFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8', border: '1px solid rgba(56, 189, 248, 0.4)' }}>
              Full Session Audio Track
            </span>
            <span style={{ fontSize: '12.5px', color: '#94A3B8' }}>30 Minutes Recording • UK / Australian Accents</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12.5px', color: '#94A3B8' }}>
            <Volume2 size={16} />
            <span>HQ Stereo</span>
          </div>
        </div>

        {/* Player Controls & Scrubber */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--primary-red)',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(200, 30, 46, 0.4)'
            }}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
          </button>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#94A3B8' }}>
              <span>10:45 (Section 2 - Map Labelling)</span>
              <span>30:00 Total</span>
            </div>

            {/* Simulated Animated Waveform */}
            <div style={{ height: '40px', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }} onClick={(e) => setAudioProgress(50)}>
              {Array.from({ length: 48 }).map((_, idx) => {
                const height = 10 + (Math.sin(idx * 0.4) * 16) + ((idx % 3) * 6);
                const isPlayed = (idx / 48) * 100 <= audioProgress;
                return (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      height: `${height}px`,
                      background: isPlayed ? 'var(--primary-red)' : '#334155',
                      borderRadius: '2px',
                      transition: 'background 0.2s'
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Accuracy By Section Cards */}
      <div>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '14px' }}>Section Breakdown</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {data.sections.map((sec, idx) => (
            <div key={idx} className="edu-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-slate">{sec.type}</span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent-green)' }}>{sec.accuracy}</span>
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', marginTop: '10px' }}>{sec.name}</h4>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Score achieved:</span>
                <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)' }}>{sec.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Question Type Accuracy & Remediation */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="edu-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px' }}>Accuracy by Question Type</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ fontWeight: '600' }}>Form / Table Completion</span>
                <span style={{ fontWeight: '700', color: 'var(--accent-green)' }}>100% (14/14)</span>
              </div>
              <div style={{ height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: 'var(--accent-green)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ fontWeight: '600' }}>Multiple Choice (Single & Multi)</span>
                <span style={{ fontWeight: '700', color: 'var(--accent-blue)' }}>90% (9/10)</span>
              </div>
              <div style={{ height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '90%', height: '100%', background: 'var(--accent-blue)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ fontWeight: '600' }}>Map / Plan Labelling</span>
                <span style={{ fontWeight: '700', color: 'var(--accent-amber)' }}>87.5% (7/8)</span>
              </div>
              <div style={{ height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '87.5%', height: '100%', background: 'var(--accent-amber)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Examiner Diagnostic Summary */}
        <div className="edu-card" style={{ padding: '24px', background: '#F8FAFC' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Sparkles size={18} color="var(--primary-red)" />
            <h3 style={{ fontSize: '15px', fontWeight: '700' }}>Examiner Diagnostic Insights</h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            "Nafis demonstrated exceptional audio concentration across all 4 parts. The minor deductions in Section 1 and Section 2 were due to word limit constraints (writing '150 dollars' when the $ symbol was provided in the prompt). Keep paying meticulous attention to instructions requesting <em>NO MORE THAN ONE WORD AND/OR A NUMBER</em>."
          </p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary btn-sm" onClick={onReviewAnswers}>
              Inspect 3 Incorrect Items
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
