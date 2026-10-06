import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  ChevronRight 
} from 'lucide-react';
import { TEACHER_BATCHES } from '../../data/mockData';

export default function BatchList({ onCreateBatch, onSelectBatch }) {
  const [filterStatus, setFilterStatus] = useState('Active');
  const [search, setSearch] = useState('');

  // Extended list of all institute batches across 5 branches
  const allBatches = [
    ...TEACHER_BATCHES,
    {
      id: 'BATCH-D05',
      name: 'Dhanmondi Foundation IELTS Morning',
      studentsCount: 20,
      schedule: 'Sun, Tue, Thu (10:00 AM - 12:00 PM)',
      avgBand: 6.5,
      progress: 55,
      nextSession: 'Tomorrow, 10:00 AM',
      room: 'DHM Suite 101',
      branch: 'Dhanmondi Academic Center',
      status: 'Active'
    },
    {
      id: 'BATCH-U02',
      name: 'Uttara Fast-Track Weekend Cohort',
      studentsCount: 18,
      schedule: 'Sat & Sun (3:00 PM - 6:00 PM)',
      avgBand: 7.0,
      progress: 30,
      nextSession: 'Saturday, 3:00 PM',
      room: 'UTR Lab 2',
      branch: 'Uttara Hub',
      status: 'Active'
    },
    {
      id: 'BATCH-UP01',
      name: 'November Cambridge Intensive B-15',
      studentsCount: 30,
      schedule: 'Daily (7:00 PM - 9:00 PM)',
      avgBand: 0,
      progress: 0,
      nextSession: 'Starts Nov 01, 2026',
      room: 'Gulshan Lab 304',
      branch: 'Gulshan HQ',
      status: 'Upcoming'
    }
  ];

  const filtered = allBatches.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            Institute Cohort & Batch Registry
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Manage ongoing student cohorts, classroom assignments, and performance tracks across all branches.
          </p>
        </div>

        <button className="btn btn-primary" onClick={onCreateBatch}>
          <Plus size={15} />
          <span>Create New Cohort</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['Active', 'Upcoming', 'Completed'].map((s) => (
            <button
              key={s}
              className={`btn btn-sm ${filterStatus === s ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilterStatus(s)}
            >
              {s} Batches
            </button>
          ))}
        </div>

        <div style={{ position: 'relative' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search cohort name or ID..." 
            style={{ paddingLeft: '36px', width: '260px' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Batches Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Cohort Name & ID</th>
              <th>Campus Branch</th>
              <th>Class Schedule</th>
              <th>Students</th>
              <th>Average Band</th>
              <th>Curriculum Progress</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id}>
                <td>
                  <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{b.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ID: {b.id} • Room: {b.room}</div>
                </td>
                <td>
                  <span className="badge badge-slate">{b.branch || 'Gulshan HQ'}</span>
                </td>
                <td>{b.schedule}</td>
                <td>
                  <strong>{b.studentsCount} Students</strong>
                </td>
                <td>
                  {b.avgBand > 0 ? (
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: '800', color: 'var(--primary-red)' }}>
                      Band {b.avgBand}
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)' }}>Unreleased</span>
                  )}
                </td>
                <td style={{ minWidth: '140px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                    <span>{b.progress}%</span>
                  </div>
                  <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${b.progress}%`, height: '100%', background: 'var(--primary-red)' }} />
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => onSelectBatch(b)}
                  >
                    <span>Manage</span>
                    <ChevronRight size={13} />
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
