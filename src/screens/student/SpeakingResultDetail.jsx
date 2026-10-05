import React, { useState } from 'react';
import { 
  Mic, 
  Play, 
  Pause, 
  Volume2, 
  ArrowLeft, 
  Clock, 
  Sparkles, 
  MessageSquare,
  Award,
  CheckCircle2
} from 'lucide-react';
import { DETAILED_RESULT } from '../../data/mockData';

export default function SpeakingResultDetail({ onBack }) {
  const data = DETAILED_RESULT.speaking;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayTime, setCurrentPlayTime] = useState('01:45');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Back to All Results</span>
        </button>
        <span className="badge badge-purple">1-on-1 Certified Examiner Interview</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--accent-purple-light)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mic size={22} />
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
              Speaking Evaluation • Band {data.band}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
              Candidate: <strong>{DETAILED_RESULT.candidate}</strong> • Examiner: <strong>Dr. Sarah Jenkins</strong> • Session Duration: 14 mins
            </p>
          </div>
        </div>

        <button className="btn btn-secondary" onClick={() => alert("Downloading full encrypted interview audio (.mp3)...")}>
          Download Recording
        </button>
      </div>

      {/* Audio Playback Bar */}
      <div className="edu-card" style={{ padding: '20px', background: '#0F172A', color: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'var(--primary-red)',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
          </button>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>
              <span>Playing: Part 2 Cue Card Response ({currentPlayTime})</span>
              <span>14:12 Total</span>
            </div>

            {/* Scrubber bar */}
            <div style={{ height: '6px', background: '#334155', borderRadius: '3px', position: 'relative' }}>
              <div style={{ width: '30%', height: '100%', background: 'var(--primary-red)', borderRadius: '3px' }} />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Criteria Scores */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {data.criteria.map((crit, idx) => (
          <div key={idx} className="edu-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Criterion {idx + 1}
              </span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: crit.score >= 7.5 ? 'var(--accent-green)' : 'var(--accent-blue)' }}>
                Band {crit.score}
              </span>
            </div>
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', marginBottom: '6px' }}>{crit.name}</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {crit.feedback}
            </p>
          </div>
        ))}
      </div>

      {/* Timestamped Transcript with Examiner Notes */}
      <div className="edu-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Full Interview Audio Transcript</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Click any timestamp to jump to corresponding audio section</p>
          </div>
          <span className="badge badge-slate">Whisper AI Synced</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {data.transcript.map((item, idx) => {
            const isCandidate = item.speaker === 'Candidate';
            return (
              <div 
                key={idx} 
                style={{ 
                  padding: '16px', 
                  borderRadius: '10px', 
                  background: isCandidate ? '#F8FAFC' : '#F1F5F9',
                  border: isCandidate ? '1px solid var(--border-color)' : '1px solid transparent',
                  marginLeft: isCandidate ? '30px' : '0',
                  marginRight: isCandidate ? '0' : '30px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: '700', 
                    color: isCandidate ? 'var(--primary-red)' : 'var(--brand-slate)' 
                  }}>
                    {item.speaker}
                  </span>
                  <span 
                    style={{ fontSize: '11px', color: 'var(--accent-blue)', cursor: 'pointer', fontWeight: '600' }}
                    onClick={() => setCurrentPlayTime(item.time)}
                  >
                    ▶ {item.time}
                  </span>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
