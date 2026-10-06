import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  CheckCircle2 
} from 'lucide-react';
import { STUDENT_RESULTS } from '../../data/mockData';

export default function MyResultsList({ onNavigate }) {
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredResults = STUDENT_RESULTS.filter(res => {
    if (filterStatus === 'All') return true;
    return res.status === filterStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            My Results & Performance Ledger
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Official mock attempt history, TRF test reports, and examiner remarks.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Evaluated', 'Pending Evaluation'].map((status) => (
            <button
              key={status}
              className={`btn btn-sm ${filterStatus === status ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Results Table (Lurni & Panacea Style) */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Mock Title & ID</th>
              <th>Test Date</th>
              <th>Status</th>
              <th>Overall Band</th>
              <th>Listening</th>
              <th>Reading</th>
              <th>Writing</th>
              <th>Speaking</th>
              <th>Examiner</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((item) => (
              <tr key={item.id}>
                <td>
                  <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{item.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ID: {item.id} • {item.type}</div>
                </td>

                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                    <Calendar size={14} color="var(--text-muted)" />
                    <span>{item.date}</span>
                  </div>
                </td>

                <td>
                  {item.status === 'Evaluated' ? (
                    <span className="badge badge-green">
                      <CheckCircle2 size={12} /> Evaluated
                    </span>
                  ) : (
                    <span className="badge badge-amber">
                      <Clock size={12} /> In Review
                    </span>
                  )}
                </td>

                <td>
                  {item.overallBand ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontSize: '17px', 
                        fontWeight: '800', 
                        color: 'var(--primary-red)' 
                      }}>
                        {item.overallBand}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>/ 9.0</span>
                    </div>
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Pending</span>
                  )}
                </td>

                <td>
                  <span style={{ fontWeight: '600' }}>{item.listening}</span>
                </td>
                <td>
                  <span style={{ fontWeight: '600' }}>{item.reading}</span>
                </td>
                <td>
                  <span style={{ fontWeight: '600', color: typeof item.writing === 'string' ? '#B45309' : 'inherit' }}>
                    {item.writing}
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: '600', color: typeof item.speaking === 'string' ? '#0369A1' : 'inherit' }}>
                    {item.speaking}
                  </span>
                </td>

                <td>
                  <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                    {item.examiner}
                  </span>
                </td>

                <td style={{ textAlign: 'right' }}>
                  {item.status === 'Evaluated' ? (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => onNavigate('listening-detail')}
                        title="View Detailed Skill Analysis"
                      >
                        <span>Drilldown</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      className="btn btn-subtle btn-sm"
                      onClick={() => alert("Examiner is currently reviewing the Task 2 writing criteria.")}
                    >
                      Status Details
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Summary Box */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <div className="edu-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Current Average Band
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: 'var(--primary-red)', marginTop: '4px' }}>
            7.25 / 9.0
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Based on last 3 official mock evaluations.
          </div>
        </div>

        <div className="edu-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Strongest Skill Area
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: 'var(--accent-blue)', marginTop: '4px' }}>
            Listening (8.5)
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            92.5% accuracy in Section 1 and Section 4.
          </div>
        </div>

        <div className="edu-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Target Gap Focus
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: 'var(--accent-amber)', marginTop: '4px' }}>
            Writing (+1.5 needed)
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Current 6.5 vs target 8.0 goal.
          </div>
        </div>
      </div>

    </div>
  );
}
