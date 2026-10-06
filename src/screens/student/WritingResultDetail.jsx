import React, { useState } from 'react';
import { 
  PenTool, 
  Sparkles, 
  ArrowLeft 
} from 'lucide-react';
import { DETAILED_RESULT } from '../../data/mockData';

export default function WritingResultDetail({ onBack }) {
  const data = DETAILED_RESULT.writing;
  const [activeTab, setActiveTab] = useState('annotated'); // 'annotated' | 'aiVersion' | 'sideBySide'
  const [selectedError, setSelectedError] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header & Back Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Back to All Results</span>
        </button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-amber">Task 2 Weight: 66%</span>
          <span className="badge badge-purple">AI + Examiner Co-Graded</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--primary-red-subtle)', color: 'var(--primary-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PenTool size={22} />
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
              Writing Evaluation • Band {data.band}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
              Task 1 (Report): <strong>Band {data.task1Band}</strong> • Task 2 (Opinion Essay): <strong>Band {data.task2Band}</strong>
            </p>
          </div>
        </div>

        {/* View Switcher Pills */}
        <div style={{ display: 'flex', background: '#F1F5F9', padding: '3px', borderRadius: 'var(--radius-full)' }}>
          <button 
            className={`btn btn-sm ${activeTab === 'annotated' ? 'btn-primary' : 'btn-subtle'}`}
            style={{ borderRadius: 'var(--radius-full)' }}
            onClick={() => setActiveTab('annotated')}
          >
            Candidate Annotations
          </button>
          <button 
            className={`btn btn-sm ${activeTab === 'aiVersion' ? 'btn-primary' : 'btn-subtle'}`}
            style={{ borderRadius: 'var(--radius-full)' }}
            onClick={() => setActiveTab('aiVersion')}
          >
            <Sparkles size={13} />
            <span>AI Band 9 Rewrite</span>
          </button>
        </div>
      </div>

      {/* 4 Official IELTS Writing Criteria Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {data.criteria.map((crit, idx) => (
          <div key={idx} className="edu-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Criterion {idx + 1}
              </span>
              <span style={{ 
                fontSize: '18px', 
                fontWeight: '800', 
                color: crit.score >= 7.0 ? 'var(--accent-green)' : 'var(--primary-red)' 
              }}>
                Band {crit.score}
              </span>
            </div>
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', marginBottom: '8px' }}>{crit.name}</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {crit.feedback}
            </p>
          </div>
        ))}
      </div>

      {/* Main Essay Inspection Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
        
        {/* Essay Display */}
        <div className="edu-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>
              {activeTab === 'annotated' ? 'Student Essay with Examiner Annotations' : 'AI Band 9.0 Exemplar Rewrite'}
            </h3>
            <span className="badge badge-slate">318 Words</span>
          </div>

          {activeTab === 'annotated' ? (
            <div className="writing-annotated-text">
              <p style={{ marginBottom: '14px' }}>
                In contemporary society, <span className="annotated-error" onClick={() => setSelectedError({ title: 'Overused Phrasing', explanation: 'Replace "an increasing number of individuals" with sophisticated synonyms such as "an escalating consensus contends".' })}>an increasing number of individuals argue</span> that technological advancements in artificial intelligence will lead to substantial job displacement. While this view has validity, I believe that AI will ultimately create new economic opportunities that surpass those destroyed.
              </p>
              <p style={{ marginBottom: '14px' }}>
                To begin with, automation has historically transformed the employment landscape rather than terminating it completely. When industrial machinery was introduced in the 19th century, numerous manual tasks were eliminated; <span className="annotated-suggestion">nonetheless, entirely new sectors emerged</span>. Similarly, the proliferation of AI algorithms requires skilled oversight, data curation, and ethical supervision.
              </p>
              <p style={{ marginBottom: '14px' }}>
                On the other hand, it is undeniable that certain routine positions will be severely affected. Roles such as basic data entry and telemarketing can now be executed by neural networks with greater efficiency. Consequently, governments must proactively establish retraining programs to <span className="annotated-error" onClick={() => setSelectedError({ title: 'Collocation Precision', explanation: 'Use "endow workers with competencies" rather than basic phrasing to hit Band 8+ Lexical Resource.' })}>equip displaced workers with high-order skills</span>.
              </p>
              <p>
                In conclusion, although the transition period will bring friction, the net result will foster innovation and higher-value career trajectories.
              </p>
            </div>
          ) : (
            <div className="writing-annotated-text" style={{ background: '#F0FDF4', borderColor: '#BBF7D0' }}>
              {data.aiImprovedEssay.split('\n\n').map((para, pIdx) => (
                <p key={pIdx} style={{ marginBottom: '14px', color: '#14532D' }}>
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Diagnostic Panel & Lexical Upgrade Suggestions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {selectedError ? (
            <div className="edu-card" style={{ padding: '20px', borderLeft: '4px solid var(--primary-red)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-red">{selectedError.title}</span>
                <button 
                  onClick={() => setSelectedError(null)} 
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: 'var(--text-muted)' }}
                >
                  Dismiss
                </button>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700', marginTop: '8px' }}>Examiner Correction Rule</div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                {selectedError.explanation}
              </p>
            </div>
          ) : (
            <div className="edu-card" style={{ padding: '20px', background: '#F8FAFC' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-red)' }}>
                <Sparkles size={16} />
                <span style={{ fontSize: '13px', fontWeight: '700' }}>Click any highlighted error</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Click on the underlined phrases in the essay to view specific examiner correction rules and Band 8+ upgrades.
              </p>
            </div>
          )}

          {/* Lexical Resource Upgrade Matrix */}
          <div className="edu-card" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>High-Impact Lexical Upgrades</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: '#DC2626', textDecoration: 'line-through' }}>job displacement</span>
                <span style={{ color: '#16A34A', fontWeight: '700' }}>labor obsolescence</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: '#DC2626', textDecoration: 'line-through' }}>create new opportunities</span>
                <span style={{ color: '#16A34A', fontWeight: '700' }}>catalyze economic avenues</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                <span style={{ color: '#DC2626', textDecoration: 'line-through' }}>equip workers</span>
                <span style={{ color: '#16A34A', fontWeight: '700' }}>endow human capital</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
