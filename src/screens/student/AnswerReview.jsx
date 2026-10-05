import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  ArrowLeft, 
  HelpCircle, 
  BookOpen, 
  Headphones,
  Sparkles
} from 'lucide-react';
import { ANSWER_REVIEW_ITEMS } from '../../data/mockData';

export default function AnswerReview({ onBack }) {
  const [filterMode, setFilterMode] = useState('All'); // 'All' | 'Correct' | 'Incorrect'
  const [search, setSearch] = useState('');

  const filteredItems = ANSWER_REVIEW_ITEMS.filter(item => {
    if (filterMode === 'Correct' && !item.isCorrect) return false;
    if (filterMode === 'Incorrect' && item.isCorrect) return false;
    if (search && !item.prompt.toLowerCase().includes(search.toLowerCase()) && !item.studentAnswer.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Back to Result</span>
        </button>
        <span className="badge badge-slate">Mock #109 Answer Key & Audio Scripts</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            Question-by-Question Diagnostic Review
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Verify each question against official Cambridge criteria, audio transcripts, and passage source evidence.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Correct', 'Incorrect'].map((mode) => (
            <button
              key={mode}
              className={`btn btn-sm ${filterMode === mode ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilterMode(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Question Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredItems.map((item) => (
          <div 
            key={item.qNum} 
            className="edu-card" 
            style={{ 
              padding: '22px', 
              borderLeft: `5px solid ${item.isCorrect ? 'var(--accent-green)' : 'var(--primary-red)'}` 
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: item.isCorrect ? 'var(--accent-green-light)' : 'var(--primary-red-subtle)',
                  color: item.isCorrect ? 'var(--accent-green)' : 'var(--primary-red)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '13px'
                }}>
                  {item.qNum}
                </span>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>{item.skill}</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{item.prompt}</div>
                </div>
              </div>

              <div>
                {item.isCorrect ? (
                  <span className="badge badge-green">
                    <CheckCircle2 size={13} /> Correct (+1.0)
                  </span>
                ) : (
                  <span className="badge badge-red">
                    <XCircle size={13} /> Incorrect (0.0)
                  </span>
                )}
              </div>
            </div>

            {/* Answer Comparison Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: '#F8FAFC', padding: '14px', borderRadius: '8px', margin: '14px 0' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Your Response</span>
                <div style={{ fontSize: '14px', fontWeight: '700', color: item.isCorrect ? 'var(--accent-green)' : 'var(--primary-red)', marginTop: '2px' }}>
                  {item.studentAnswer}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Official Answer Key</span>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {item.correctAnswer}
                </div>
              </div>
            </div>

            {/* Evidence & Explanation Quote */}
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <Sparkles size={16} color="var(--primary-red)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <strong>Evidence & Official Rationale:</strong> {item.explanation}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
