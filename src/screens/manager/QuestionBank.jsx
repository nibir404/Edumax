import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Lock, 
  Globe, 
  Edit3 
} from 'lucide-react';

export default function QuestionBank({ onOpenEditor, onCreateTest }) {
  const [skillFilter, setSkillFilter] = useState('All');
  const [scopeFilter, setScopeFilter] = useState('All'); // 'All' | 'Private' | 'Shared'
  const [search, setSearch] = useState('');

  const questions = [
    {
      id: 'QB-L-401',
      title: 'University Campus Tour & Sports Facility Map',
      skill: 'Listening',
      type: 'Map Labelling & Multiple Choice',
      scope: 'Private',
      difficulty: 'Medium',
      questionsCount: 10,
      usageCount: 14
    },
    {
      id: 'QB-R-812',
      title: 'The Evolution of Maritime Navigation Instruments',
      skill: 'Reading',
      type: 'Headings Matching & True/False/Not Given',
      scope: 'Shared',
      difficulty: 'Hard',
      questionsCount: 14,
      usageCount: 42
    },
    {
      id: 'QB-W-104',
      title: 'Task 2: Impact of Remote Work on Urban Infrastructure',
      skill: 'Writing',
      type: 'Opinion / Discussion Essay',
      scope: 'Private',
      difficulty: 'Advanced',
      questionsCount: 1,
      usageCount: 28
    },
    {
      id: 'QB-S-305',
      title: 'Part 2 Cue Card: Describe a Historical Architectural Monument',
      skill: 'Speaking',
      type: 'Individual Long Turn + Part 3 Follow-up',
      scope: 'Shared',
      difficulty: 'Medium',
      questionsCount: 6,
      usageCount: 89
    }
  ];

  const filtered = questions.filter(q => {
    if (skillFilter !== 'All' && q.skill !== skillFilter) return false;
    if (scopeFilter !== 'All' && q.scope !== scopeFilter) return false;
    if (search && !q.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            Question Bank Repository
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Author private institutional test sections alongside Cambridge-calibrated shared global assets.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={onCreateTest}>
            <span>Assemble Test Paper</span>
          </button>
          <button className="btn btn-primary" onClick={onOpenEditor}>
            <Plus size={15} />
            <span>Author New Question Item</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Listening', 'Reading', 'Writing', 'Speaking'].map(s => (
            <button
              key={s}
              className={`btn btn-sm ${skillFilter === s ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSkillFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <select 
            className="form-select" 
            style={{ width: '160px' }}
            value={scopeFilter}
            onChange={(e) => setScopeFilter(e.target.value)}
          >
            <option value="All">All Scopes</option>
            <option value="Private">Private Institute Only</option>
            <option value="Shared">Global Shared Pool</option>
          </select>

          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search items..." 
              style={{ paddingLeft: '36px', width: '200px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Questions Data Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Question Item Title & ID</th>
              <th>Skill</th>
              <th>Question Format</th>
              <th>Scope</th>
              <th>Difficulty</th>
              <th>Usage in Tests</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((q) => (
              <tr key={q.id}>
                <td>
                  <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{q.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ID: {q.id} • {q.questionsCount} Items</div>
                </td>
                <td>
                  <span className="badge badge-slate">{q.skill}</span>
                </td>
                <td>{q.type}</td>
                <td>
                  {q.scope === 'Private' ? (
                    <span className="badge badge-red">
                      <Lock size={11} /> Edumax Private
                    </span>
                  ) : (
                    <span className="badge badge-blue">
                      <Globe size={11} /> Global Shared
                    </span>
                  )}
                </td>
                <td>
                  <span className={`badge ${q.difficulty === 'Hard' || q.difficulty === 'Advanced' ? 'badge-red' : 'badge-green'}`}>
                    {q.difficulty}
                  </span>
                </td>
                <td>
                  <strong>{q.usageCount} Exam Papers</strong>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={onOpenEditor}
                  >
                    <Edit3 size={13} />
                    <span>Edit Item</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
