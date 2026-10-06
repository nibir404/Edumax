import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Star, 
  ChevronRight 
} from 'lucide-react';
import { STAFF_MEMBERS } from '../../data/mockData';

export default function StaffList({ onSelectStaff }) {
  const [search, setSearch] = useState('');

  const filtered = STAFF_MEMBERS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.role.toLowerCase().includes(search.toLowerCase()) ||
    s.branch.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            Faculty & Administrative Staff Directory
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Certified IELTS examiners, speaking interviewers, writing evaluators, and academic counselors.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search faculty..." 
              style={{ paddingLeft: '36px', width: '220px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={() => alert("Invite staff modal opened.")}>
            <Plus size={15} />
            <span>Onboard Examiner</span>
          </button>
        </div>
      </div>

      {/* Staff Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Staff Member</th>
              <th>Designated Role</th>
              <th>Campus Branch</th>
              <th>Active Batches</th>
              <th>Student Rating</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Permissions & Access</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((staff) => (
              <tr key={staff.id}>
                <td>
                  <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{staff.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{staff.email}</div>
                </td>
                <td>
                  <span className="badge badge-slate">{staff.role}</span>
                </td>
                <td>{staff.branch}</td>
                <td>
                  <strong>{staff.activeBatches} Cohorts</strong>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#D97706', fontWeight: '700' }}>
                    <Star size={14} fill="#D97706" /> {staff.rating}
                  </div>
                </td>
                <td>
                  <span className={`badge ${staff.status === 'Active' ? 'badge-green' : 'badge-amber'}`}>
                    {staff.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => onSelectStaff(staff)}
                  >
                    <span>Role & Permissions</span>
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
