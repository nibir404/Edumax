import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  Play, 
  Pause, 
  RotateCcw, 
  Save 
} from 'lucide-react';
import { api } from '../../services/api';

export default function SpeakingInterviewConsole({ onFinish }) {
  const [activePart, setActivePart] = useState(1); // 1 | 2 | 3
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Timer State
  const [seconds, setSeconds] = useState(240); // 4 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Examiner Rubric Scores (0.5 increments from 1.0 to 9.0)
  const [scores, setScores] = useState({
    fc: 7.5, // Fluency & Coherence
    lr: 8.0, // Lexical Resource
    gra: 7.0, // Grammatical Range & Accuracy
    pr: 7.5  // Pronunciation
  });

  const [examinerNotes, setExaminerNotes] = useState('Candidate displays strong lexical flexibility. Natural transition between Part 1 and Part 2. Minor hesitation when constructing past counterfactual conditionals.');

  // Calculate real-time overall band (rounded to nearest 0.5)
  const calculateOverall = () => {
    const avg = (scores.fc + scores.lr + scores.gra + scores.pr) / 4;
    return (Math.round(avg * 2) / 2).toFixed(1);
  };

  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleResetTimer = (defaultSecs) => {
    setIsTimerRunning(false);
    setSeconds(defaultSecs);
  };

  const scripts = {
    1: {
      title: 'Part 1: Introduction & Interview (4 - 5 Minutes)',
      instructions: 'Ask 4-5 general questions about familiar topics. Do not interrupt natural flow unless exceeding time limits.',
      questions: [
        'Good morning/afternoon. My name is Dr. Sarah Jenkins. Can you confirm your full name and show your identification?',
        'Let’s talk about your hometown. What is the most memorable aspect of the city where you grew up?',
        'Do you think your hometown is a suitable place for young professionals to establish their careers?',
        'Let’s move on to reading habits. What genre of literature or news do you find yourself drawn to regularly?'
      ]
    },
    2: {
      title: 'Part 2: Individual Long Turn (3 - 4 Minutes)',
      instructions: 'Give the candidate the cue card and paper/pencil. Allow exactly 1 minute of preparation time, then invite them to speak for 1 to 2 minutes.',
      cueCard: {
        prompt: 'Describe an ambitious project you successfully completed.',
        bullets: [
          'What the project was and why you initiated it',
          'Who worked on this undertaking alongside you',
          'What challenges or technical hurdles arose during implementation',
          'And explain why achieving this milestone meant a great deal to you.'
        ]
      }
    },
    3: {
      title: 'Part 3: Two-Way Analytical Discussion (4 - 5 Minutes)',
      instructions: 'Ask abstract questions linked to Part 2. Probe candidate’s ability to justify opinions, analyze hypothetical scenarios, and evaluate societal implications.',
      questions: [
        'Why do you believe collaborative teamwork is emphasized so heavily in modern tech environments over individual work?',
        'How might technological automation alter the ways young people acquire problem-solving competencies?',
        'Do ambitious corporate projects invariably bring negative consequences to work-life equilibrium?'
      ]
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Console Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0F172A', color: '#FFFFFF', padding: '16px 24px', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mic size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#38BDF8', fontWeight: '700', textTransform: 'uppercase' }}>
              LIVE EXAMINER TEST ENVIRONMENT
            </div>
            <div style={{ fontSize: '16px', fontWeight: '800' }}>
              Candidate: Nafis Ahmed (ID #EDX-4912) • Academic Mock #109
            </div>
          </div>
        </div>

        {/* Live Stopwatch Timer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase' }}>Part {activePart} Timer</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '26px', fontWeight: '800', color: seconds <= 30 ? '#EF4444' : '#10B981' }}>
              {formatTime(seconds)}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button 
              className="btn btn-sm" 
              style={{ background: isTimerRunning ? '#F59E0B' : 'var(--primary-red)', color: '#FFF' }}
              onClick={() => setIsTimerRunning(!isTimerRunning)}
            >
              {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
              <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
            </button>
            <button 
              className="btn btn-sm btn-subtle"
              onClick={() => handleResetTimer(activePart === 2 ? 180 : 240)}
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Part Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {[1, 2, 3].map((partNum) => (
          <button
            key={partNum}
            className={`btn ${activePart === partNum ? 'btn-primary' : 'btn-secondary'}`}
            style={{ flex: 1, padding: '12px' }}
            onClick={() => {
              setActivePart(partNum);
              handleResetTimer(partNum === 2 ? 180 : 240);
            }}
          >
            <span>Part {partNum}: {partNum === 1 ? 'Introduction' : partNum === 2 ? 'Long Turn Cue Card' : 'Discussion'}</span>
          </button>
        ))}
      </div>

      {/* Console Grid: Script on Left, Rubric Panel on Right */}
      <div className="speaking-console-container">
        
        {/* Examiner Script & Cue Card */}
        <div className="speaking-script-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>{scripts[activePart].title}</h3>
            <span className="badge badge-slate">Official Script</span>
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '16px', fontStyle: 'italic' }}>
            {scripts[activePart].instructions}
          </p>

          {activePart === 2 ? (
            <div className="cue-card-box">
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#B45309', textTransform: 'uppercase' }}>Candidate Cue Card (Candidate has paper & pencil)</div>
              <h4 style={{ fontSize: '15px', fontWeight: '800', margin: '8px 0', color: '#78350F' }}>
                {scripts[2].cueCard.prompt}
              </h4>
              <p style={{ fontSize: '12px', color: '#92400E', marginBottom: '8px' }}>You should say:</p>
              <ul style={{ paddingLeft: '20px', fontSize: '13px', color: '#78350F' }}>
                {scripts[2].cueCard.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {scripts[activePart].questions.map((q, qIdx) => (
                <div key={qIdx} style={{ padding: '12px 14px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '13.5px', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--primary-red)' }}>Q{qIdx + 1}:</strong> {q}
                </div>
              ))}
            </div>
          )}

          {/* Audio Visualizer Simulator */}
          <div style={{ marginTop: '24px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Microphone Audio Input Feed (Whisper Auto-Transcribing)
            </div>
            <div className="audio-recorder-visualizer">
              {Array.from({ length: 32 }).map((_, idx) => (
                <div 
                  key={idx} 
                  className="waveform-bar" 
                  style={{ 
                    animationDelay: `${(idx % 8) * 0.15}s`,
                    background: isTimerRunning ? '#38BDF8' : '#475569' 
                  }} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* IELTS Rubric Scoring Panel */}
        <div className="rubric-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Examiner Scoring Rubric</h3>
            <span className="badge badge-red" style={{ fontSize: '13px' }}>
              Band {calculateOverall()}
            </span>
          </div>

          {/* Fluency & Coherence Slider */}
          <div className="rubric-item">
            <div className="rubric-header">
              <span className="rubric-name">Fluency & Coherence (FC)</span>
              <span className="rubric-score-badge">Band {scores.fc}</span>
            </div>
            <input 
              type="range" 
              min="4.0" 
              max="9.0" 
              step="0.5" 
              value={scores.fc}
              className="rubric-range"
              onChange={(e) => setScores({ ...scores, fc: parseFloat(e.target.value) })}
            />
          </div>

          {/* Lexical Resource Slider */}
          <div className="rubric-item">
            <div className="rubric-header">
              <span className="rubric-name">Lexical Resource (LR)</span>
              <span className="rubric-score-badge">Band {scores.lr}</span>
            </div>
            <input 
              type="range" 
              min="4.0" 
              max="9.0" 
              step="0.5" 
              value={scores.lr}
              className="rubric-range"
              onChange={(e) => setScores({ ...scores, lr: parseFloat(e.target.value) })}
            />
          </div>

          {/* Grammatical Range & Accuracy Slider */}
          <div className="rubric-item">
            <div className="rubric-header">
              <span className="rubric-name">Grammar & Accuracy (GRA)</span>
              <span className="rubric-score-badge">Band {scores.gra}</span>
            </div>
            <input 
              type="range" 
              min="4.0" 
              max="9.0" 
              step="0.5" 
              value={scores.gra}
              className="rubric-range"
              onChange={(e) => setScores({ ...scores, gra: parseFloat(e.target.value) })}
            />
          </div>

          {/* Pronunciation Slider */}
          <div className="rubric-item">
            <div className="rubric-header">
              <span className="rubric-name">Pronunciation (PR)</span>
              <span className="rubric-score-badge">Band {scores.pr}</span>
            </div>
            <input 
              type="range" 
              min="4.0" 
              max="9.0" 
              step="0.5" 
              value={scores.pr}
              className="rubric-range"
              onChange={(e) => setScores({ ...scores, pr: parseFloat(e.target.value) })}
            />
          </div>

          {/* Notes Scratchpad */}
          <div>
            <label className="form-label" style={{ fontSize: '12px' }}>Confidential Examiner Notes</label>
            <textarea 
              className="form-textarea" 
              rows={3} 
              value={examinerNotes}
              onChange={(e) => setExaminerNotes(e.target.value)}
            />
          </div>

          {/* Finalize Button */}
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '6px' }}
            disabled={isSubmitting}
            onClick={async () => {
              setIsSubmitting(true);
              try {
                await api.submitSpeakingEvaluation({
                  candidateId: 'std_01',
                  scores,
                  overallBand: calculateOverall(),
                  examinerNotes
                });
              } catch {}
              setIsSubmitting(false);
              if (onFinish) onFinish();
            }}
          >
            <Save size={15} />
            <span>{isSubmitting ? 'Locking Evaluation...' : `Lock & Publish Score (Band ${calculateOverall()})`}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
