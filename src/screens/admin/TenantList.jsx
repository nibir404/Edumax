import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Plus, 
  ChevronRight, 
  Globe
} from 'lucide-react';
import { PLATFORM_TENANTS } from '../../data/mockData';

export default function TenantList({ onSelectTenant }) {
  const [search, setSearch] = useState('');

  const filtered = PLATFORM_TENANTS.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.domain.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
            Multi-Tenant Institutes
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
            34 institutional clients • Custom white-label domains and enterprise licenses
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search institutes or domains..." 
              style={{ paddingLeft: '32px', width: '240px', padding: '7px 10px 7px 32px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="btn btn-primary btn-sm" onClick={() => alert("Tenant provisioning modal opened.")}>
            <Plus size={14} />
            <span>Onboard Tenant</span>
          </button>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Institute / Organization</th>
              <th>White-Label Domain</th>
              <th>Student Seats</th>
              <th>Plan Tier</th>
              <th>Monthly SaaS MRR</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Management</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id}>
                <td>
                  <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{t.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Tenant ID: {t.id} • Renews: {t.renewal}</div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px' }}>
                    <Globe size={13} color="var(--text-muted)" />
                    <span>{t.domain}</span>
                  </div>
                </td>
                <td>
                  <strong>{t.students} Active</strong>
                </td>
                <td>
                  <span className="badge">{t.tier}</span>
                </td>
                <td>
                  <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{t.mrr}</span>
                </td>
                <td>
                  <span className={`badge ${t.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                    {t.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => onSelectTenant(t)}
                  >
                    <span>Inspect</span>
                    <ChevronRight size={12} />
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
