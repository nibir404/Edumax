import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  ArrowLeft, 
  Clock, 
  FileText, 
  Sparkles,
  ChevronRight,
  Eye
} from 'lucide-react';
import { DETAILED_RESULT } from '../../data/mockData';

export default function ReadingResultDetail({ onBack, onReviewAnswers }) {
  const data = DETAILED_RESULT.reading;
  const [activePassage, setActivePassage] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Back button & Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Back to All Results</span>
        </button>
        <span className="badge badge-green">Academic Standard Passed</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--accent-green-light)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={22} />
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
              Academic Reading Analysis • Band {data.band}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
              Test ID #R-109 • Total Correct: <strong>{data.score}</strong> ({data.accuracy}) • Time Spent: 54 mins / 60 mins
            </p>
          </div>
        </div>

        <button className="btn btn-primary" onClick={onReviewAnswers}>
          <CheckCircle2 size={16} />
          <span>Detailed Answer Review</span>
        </button>
      </div>

      {/* 3 Passage Performance Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {data.passages.map((p, idx) => (
          <div 
            key={idx} 
            className={`edu-card edu-card-interactive`}
            style={{ 
              padding: '20px', 
              borderColor: activePassage === idx ? 'var(--primary-red)' : 'var(--border-color)',
              background: activePassage === idx ? 'var(--primary-red-subtle)' : '#FFFFFF'
            }}
            onClick={() => setActivePassage(idx)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge badge-slate">{p.type}</span>
              <span style={{ fontSize: '15px', fontWeight: '800', color: activePassage === idx ? 'var(--primary-red)' : 'var(--text-primary)' }}>
                {p.score}
              </span>
            </div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', lineHeight: 1.3 }}>{p.title}</h4>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Eye size={12} /> Click to inspect passage notes
            </div>
          </div>
        ))}
      </div>

      {/* Passage Context & Question Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        
        {/* Passage Reader Excerpt */}
        <div className="edu-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>
              Passage Excerpt: {data.passages[activePassage].title}
            </h3>
            <span className="badge badge-slate">Section {activePassage + 1}</span>
          </div>

          <div style={{ 
            fontSize: '13.5px', 
            lineHeight: '1.8', 
            color: 'var(--text-secondary)', 
            background: '#F8FAFC', 
            padding: '18px', 
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            maxHeight: '320px',
            overflowY: 'auto'
          }}>
            <p style={{ marginBottom: '12px' }}>
              <strong>Paragraph A:</strong> During the mid-eighteenth century, oceanic mercantile routes fundamentally revolutionized global commerce. While earlier historical records attributed tea distribution strictly to ritualistic and therapeutic practices in imperial dynasties, expanding maritime networks opened unprecedented consumer markets in northern Europe.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Paragraph B:</strong> <span style={{ background: '#DCFCE7', padding: '2px 4px', borderRadius: '3px' }}>Early records indicate tea was administered strictly for therapeutic virtues before evolving into a recreational infusion.</span> This empirical discovery led botanists to establish specialized nurseries across highland valleys.
            </p>
            <p>
              <strong>Paragraph C:</strong> Consequently, customs officials established stringent quality grading metrics. The economic vitality of these voyages stimulated secondary manufacturing in ceramics, silver cutlery, and naval architecture.
            </p>
          </div>
        </div>

        {/* Question Type Precision */}
        <div className="edu-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px' }}>Question Type Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span>True / False / Not Given</span>
                <strong>8 / 9 (89%)</strong>
              </div>
              <div style={{ height: '7px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '89%', height: '100%', background: 'var(--accent-green)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span>Headings Matching</span>
                <strong>6 / 7 (85%)</strong>
              </div>
              <div style={{ height: '7px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '85%', height: '100%', background: 'var(--accent-blue)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span>Summary Completion</span>
                <strong>9 / 10 (90%)</strong>
              </div>
              <div style={{ height: '7px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '90%', height: '100%', background: 'var(--accent-green)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span>Multiple Choice Questions (MCQ)</span>
                <strong>12 / 14 (86%)</strong>
              </div>
              <div style={{ height: '7px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '86%', height: '100%', background: 'var(--accent-blue)' }} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '14px', background: '#FEF3C7', borderRadius: '8px', border: '1px solid #FDE68A', fontSize: '12px', color: '#92400E' }}>
            💡 <strong>Examiner Tip:</strong> In Passage 3, question 35 was missed due to confusing "NOT GIVEN" with "FALSE". Remember: if the author never contradicts the statement, mark NOT GIVEN.
          </div>
        </div>

      </div>

    </div>
  );
}
