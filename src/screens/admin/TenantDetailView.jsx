import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Building2, 
  Globe, 
  Save, 
  CheckCircle2, 
  ShieldCheck, 
  Sliders,
  AlertTriangle
} from 'lucide-react';
import { PLATFORM_TENANTS } from '../../data/mockData';

export default function TenantDetailView({ onBack }) {
  const tenant = PLATFORM_TENANTS[0];
  const [tenantName, setTenantName] = useState(tenant.name);
  const [domain, setDomain] = useState(tenant.domain);
  const [maxSeats, setMaxSeats] = useState(2000);
  const [status, setStatus] = useState('Active');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Back to Tenant Directory</span>
        </button>
        <span className="badge badge-purple">Super Admin Tenant Control</span>
      </div>

      {saved && (
        <div style={{ padding: '12px 18px', background: 'var(--accent-green-light)', color: '#065F46', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} /> Tenant entitlements & custom domain updated successfully!
        </div>
      )}

      {/* Tenant Identity Card */}
      <div className="edu-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--primary-red-subtle)', color: 'var(--primary-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800' }}>{tenant.name}</h2>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tenant ID: {tenant.id} • Registered Oct 2024</div>
            </div>
          </div>
          <span className="badge badge-green">Enterprise SaaS</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="edu-card" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Quota Entitlements & Routing</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Organization Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Custom White-Label Domain</label>
              <input 
                type="text" 
                className="form-input" 
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Enrolled Student Seat Limit</label>
              <input 
                type="number" 
                className="form-input" 
                value={maxSeats}
                onChange={(e) => setMaxSeats(parseInt(e.target.value))}
                min={100}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tenant Account Status</label>
              <select 
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Active">Active / In Good Standing</option>
                <option value="Suspended">Suspended (Payment Overdue)</option>
                <option value="Maintenance">Scheduled Maintenance</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button type="submit" className="btn btn-primary">
              <Save size={15} />
              <span>Update Tenant Configuration</span>
            </button>
          </div>
        </div>
      </form>

    </div>
  );
}
