import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Send, 
  UserCheck, 
  ChevronRight
} from 'lucide-react';
import { TEACHER_BATCHES } from '../../data/mockData';

export default function BatchDetail({ onBack, onSelectStudent, onAssignTest }) {
  const batch = TEACHER_BATCHES[0];
  const [search, setSearch] = useState('');

  const studentsList = [
    { id: 'std_01', name: 'Nafis Ahmed', target: 8.0, currentBand: 7.5, attendance: '96%', lastMock: 'Mock #09 (Band 7.5)', status: 'On Track' },
    { id: 'std_02', name: 'Tasnia Faruque', target: 7.5, currentBand: 7.0, attendance: '92%', lastMock: 'Mock #09 (Band 7.0)', status: 'On Track' },
    { id: 'std_03', name: 'Arif Chowdhury', target: 7.0, currentBand: 6.5, attendance: '88%', lastMock: 'Mock #08 (Band 6.5)', status: 'Needs Speaking Review' },
    { id: 'std_04', name: 'Sadia Rahman', target: 7.5, currentBand: 7.0, attendance: '94%', lastMock: 'Mock #09 (Band 7.0)', status: 'On Track' },
    { id: 'std_05', name: 'Mahmudul Hasan', target: 7.0, currentBand: 6.0, attendance: '80%', lastMock: 'Mock #08 (Band 6.0)', status: 'Writing Focus Required' }
  ];

  const filtered = studentsList.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header & Back Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Back to All Batches</span>
        </button>
        <button className="btn btn-primary btn-sm" onClick={onAssignTest}>
          <Send size={14} />
          <span>Assign Paper to This Batch</span>
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            {batch.name}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Assigned Room: <strong>{batch.room}</strong> • {batch.schedule} • Class Average: <strong>Band {batch.avgBand}</strong>
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search enrolled students..." 
            style={{ paddingLeft: '36px', width: '260px' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Roster Data Table (Lurni & Panacea Style) */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Target Band</th>
              <th>Current Band</th>
              <th>Attendance Rate</th>
              <th>Latest Mock Attempt</th>
              <th>Academic Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((std) => (
              <tr key={std.id}>
                <td>
                  <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{std.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ID: {std.id}</div>
                </td>
                <td>
                  <span className="badge badge-slate">Band {std.target}</span>
                </td>
                <td>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: '800', color: 'var(--primary-red)' }}>
                    Band {std.currentBand}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <UserCheck size={14} color="var(--accent-green)" />
                    <span style={{ fontWeight: '600' }}>{std.attendance}</span>
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: '12.5px' }}>{std.lastMock}</span>
                </td>
                <td>
                  <span className={`badge ${std.status === 'On Track' ? 'badge-green' : 'badge-amber'}`}>
                    {std.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => onSelectStudent(std)}
                  >
                    <span>View 360° Profile</span>
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
