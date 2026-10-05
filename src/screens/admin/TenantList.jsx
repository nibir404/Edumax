import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Plus, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Globe,
  Sliders
} from 'lucide-react';
import { PLATFORM_TENANTS } from '../../data/mockData';

export default function TenantList({ onSelectTenant }) {
  const [search, setSearch] = useState('');

  const filtered = PLATFORM_TENANTS.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.domain.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            Multi-Tenant Educational Institutes (34 Active)
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Platform-wide institutional tenants, custom white-label domains, and licensing contracts.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search institutes or domains..." 
              style={{ paddingLeft: '36px', width: '260px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={() => alert("Tenant provisioning modal opened.")}>
            <Plus size={15} />
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
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Tenant ID: {t.id} • Contract Renews: {t.renewal}</div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                    <Globe size={14} color="var(--text-muted)" />
                    <span>{t.domain}</span>
                  </div>
                </td>
                <td>
                  <strong>{t.students} Active</strong>
                </td>
                <td>
                  <span className="badge badge-slate">{t.tier}</span>
                </td>
                <td>
                  <span style={{ fontWeight: '800', color: 'var(--accent-green)' }}>{t.mrr}</span>
                </td>
                <td>
                  <span className={`badge ${t.status === 'Active' ? 'badge-green' : 'badge-amber'}`}>
                    {t.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => onSelectTenant(t)}
                  >
                    <span>Manage Tenant</span>
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
