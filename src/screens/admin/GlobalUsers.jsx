import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ShieldCheck, 
  UserCheck, 
  Lock, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function GlobalUsers() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const usersList = [
    { id: 'usr-101', name: 'Nafis Ahmed', email: 'nafis.ahmed@edumax.io', tenant: 'Edumax Consultancy (HQ)', role: 'Student', status: 'Active', lastLogin: '10 mins ago' },
    { id: 'usr-102', name: 'Dr. Sarah Jenkins', email: 's.jenkins@edumax.io', tenant: 'Edumax Consultancy (HQ)', role: 'Teacher / Examiner', status: 'Active', lastLogin: 'Today 9:15 AM' },
    { id: 'usr-103', name: 'Kazi Farhan', email: 'kazi.farhan@edumax.io', tenant: 'Edumax Consultancy (HQ)', role: 'Manager / Owner', status: 'Active', lastLogin: 'Yesterday' },
    { id: 'usr-104', name: 'Tanvir Hossain', email: 't.hossain@edumax.io', tenant: 'Edumax Consultancy (HQ)', role: 'Branch Director', status: 'Active', lastLogin: 'Oct 03, 2026' },
    { id: 'usr-105', name: 'Alastair Campbell', email: 'a.campbell@apexpathway.co.uk', tenant: 'Apex Pathway IELTS UK', role: 'Teacher / Examiner', status: 'Active', lastLogin: 'Oct 02, 2026' }
  ];

  const filtered = usersList.filter(u => {
    if (roleFilter !== 'All' && !u.role.includes(roleFilter)) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            Global Multi-Tenant Users Registry
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Unified directory of candidates, teachers, examiners, and institutional managers across 34 tenants.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <select 
            className="form-select" 
            style={{ width: '160px' }}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="Student">Students Only</option>
            <option value="Teacher">Examiners Only</option>
            <option value="Manager">Managers Only</option>
          </select>

          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search user email or name..." 
              style={{ paddingLeft: '36px', width: '240px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>User Name & Email</th>
              <th>Tenant Institute</th>
              <th>System Role</th>
              <th>Status</th>
              <th>Last Active</th>
              <th style={{ textAlign: 'right' }}>Security Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>
                  <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{u.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{u.email}</div>
                </td>
                <td>
                  <span className="badge badge-slate">{u.tenant}</span>
                </td>
                <td>
                  <span style={{ fontWeight: '600' }}>{u.role}</span>
                </td>
                <td>
                  <span className="badge badge-green">{u.status}</span>
                </td>
                <td>{u.lastLogin}</td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => alert(`Impersonating session for ${u.name}...`)}
                  >
                    <span>Impersonate</span>
                    <ExternalLink size={12} />
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
