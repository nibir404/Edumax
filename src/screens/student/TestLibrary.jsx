import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  Play, 
  Headphones, 
  BookOpen, 
  PenTool, 
  Mic, 
  Sparkles, 
  X 
} from 'lucide-react';
import { TEST_LIBRARY } from '../../data/mockData';

export default function TestLibrary({ onStartTest }) {
  const [filterType, setFilterType] = useState('All');
  const [filterSkill, setFilterSkill] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestModal, setSelectedTestModal] = useState(null);

  const filteredTests = TEST_LIBRARY.filter(test => {
    const matchesType = filterType === 'All' || test.type.includes(filterType);
    const matchesSkill = filterSkill === 'All' || test.category === filterSkill || (filterSkill === 'Full Mock' && test.category === 'Full Mock');
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          test.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSkill && matchesSearch;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Listening': return Headphones;
      case 'Reading': return BookOpen;
      case 'Writing': return PenTool;
      case 'Speaking': return Mic;
      default: return Sparkles;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header & Filter Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            Official IELTS Test Library
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Cambridge authentic past papers, AI-graded writing prompts, and simulated live speaking tests.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '36px', width: '260px' }}
              placeholder="Search tests or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Type Filter */}
          <select 
            className="form-select" 
            style={{ width: '150px' }}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Formats</option>
            <option value="Academic">Academic</option>
            <option value="General">General Training</option>
          </select>
        </div>
      </div>

      {/* Category Pills (Lurni / Panacea Style) */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {['All', 'Full Mock', 'Listening', 'Reading', 'Writing', 'Speaking'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterSkill(cat)}
            className={`btn btn-sm ${filterSkill === cat ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tests Card Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {filteredTests.map((test) => {
          const Icon = getCategoryIcon(test.category);
          return (
            <div key={test.id} className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: test.category === 'Writing' ? 'var(--primary-red-subtle)' : 'var(--bg-subtle)',
                    color: test.category === 'Writing' ? 'var(--primary-red)' : 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={20} />
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span className="badge badge-slate">{test.type}</span>
                    <span className={`badge ${test.difficulty === 'Hard' || test.difficulty === 'Advanced' ? 'badge-red' : 'badge-green'}`}>
                      {test.difficulty}
                    </span>
                  </div>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px', lineHeight: 1.3 }}>
                  {test.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {test.duration}
                  </span>
                  <span>•</span>
                  <span>{test.questions} Questions</span>
                  <span>•</span>
                  <span>{test.attempts} Taken</span>
                </div>

                {/* Tag Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {test.tags.map((tag, tIdx) => (
                    <span key={tIdx} style={{ fontSize: '11px', background: '#F1F5F9', color: '#475569', padding: '3px 8px', borderRadius: '4px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%' }}
                onClick={() => setSelectedTestModal(test)}
              >
                <Play size={15} />
                <span>Start Examination</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Start Test Confirmation Modal */}
      {selectedTestModal && (
        <div className="modal-overlay" onClick={() => setSelectedTestModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--primary-red-subtle)', color: 'var(--primary-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Play size={18} />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: '700' }}>Confirm Examination Launch</h3>
              </div>
              <button 
                onClick={() => setSelectedTestModal(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '12px', marginBottom: '20px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: '700', fontSize: '15px' }}>{selectedTestModal.title}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Standard official exam conditions will apply. Timer is fixed at <strong>{selectedTestModal.duration}</strong>.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '12px', fontSize: '12.5px' }}>
                <div>⏱ <strong>Time Limit:</strong> {selectedTestModal.duration}</div>
                <div>📝 <strong>Questions:</strong> {selectedTestModal.questions}</div>
                <div>🎧 <strong>Audio Check:</strong> Pass Guaranteed</div>
                <div>🤖 <strong>Evaluation:</strong> AI + Examiner Double-Check</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedTestModal(null)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  if (onStartTest) {
                    onStartTest(selectedTestModal);
                  } else {
                    alert(`Starting exam: ${selectedTestModal.title}. Best of luck!`);
                  }
                  setSelectedTestModal(null);
                }}
              >
                Begin Exam Session
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
