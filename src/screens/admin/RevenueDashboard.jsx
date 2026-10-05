import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Globe, 
  Building2, 
  Award, 
  ArrowUpRight,
  Download
} from 'lucide-react';
import { PLATFORM_TENANTS } from '../../data/mockData';

export default function RevenueDashboard() {
  const regions = [
    { country: 'Bangladesh (HQ & Franchises)', share: '58%', mrr: '$74,500', tenants: 18 },
    { country: 'United Kingdom (London & Manchester)', share: '22%', mrr: '$28,200', tenants: 7 },
    { country: 'Australia (Sydney & Melbourne)', share: '12%', mrr: '$15,400', tenants: 5 },
    { country: 'Canada & Middle East', share: '8%', mrr: '$10,400', tenants: 4 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            Global Revenue & Commercial Analytics
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Multi-tenant recurring revenue (MRR), annualized run rate (ARR), and international franchise licensing.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => alert("Exporting Global Financial Statements (CSV)...")}>
          <Download size={14} />
          <span>Export Financial Ledger</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="stats-grid">
        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Global Monthly Recurring Revenue</span>
            <span className="stat-value">$128,500</span>
            <span className="stat-trend up">
              <ArrowUpRight size={14} /> +14.2% MoM
            </span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-green-light)', color: 'var(--accent-green)' }}>
            <DollarSign size={22} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Annualized Run Rate (ARR)</span>
            <span className="stat-value">$1.54M</span>
            <span className="stat-trend up">+32% YoY</span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-blue-light)', color: 'var(--accent-blue)' }}>
            <TrendingUp size={22} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Average Revenue Per Tenant</span>
            <span className="stat-value">$3,780</span>
            <span className="stat-trend up">+8.5% Net Expansion</span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--primary-red-subtle)', color: 'var(--primary-red)' }}>
            <Building2 size={22} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Annual Churn Rate</span>
            <span className="stat-value">1.8%</span>
            <span className="stat-trend up" style={{ color: 'var(--accent-green)' }}>World-Class Low</span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-purple-light)', color: 'var(--accent-purple)' }}>
            <Award size={22} />
          </div>
        </div>
      </div>

      {/* Regional Revenue Distribution Card */}
      <div className="edu-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>
          Geographic & International Franchise Breakdown
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {regions.map((reg, idx) => (
            <div key={idx} style={{ padding: '16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div>
                  <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>{reg.country}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '8px' }}>({reg.tenants} licensed institutes)</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span className="badge badge-slate">{reg.share} of Total</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: '800', color: 'var(--accent-green)' }}>
                    {reg.mrr} / mo
                  </span>
                </div>
              </div>

              <div style={{ height: '7px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: reg.share, height: '100%', background: 'var(--primary-red)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
