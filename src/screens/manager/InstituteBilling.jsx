import React from 'react';
import { 
  CreditCard, 
  Download, 
  Users, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  DollarSign
} from 'lucide-react';

export default function InstituteBilling() {
  const invoices = [
    { id: 'INV-INST-902', date: 'Oct 01, 2026', amount: '$3,800.00', status: 'Paid', seats: '2,000 Student Seats + Unlimited AI' },
    { id: 'INV-INST-891', date: 'Sep 01, 2026', amount: '$3,800.00', status: 'Paid', seats: '2,000 Student Seats + Unlimited AI' },
    { id: 'INV-INST-880', date: 'Aug 01, 2026', amount: '$3,800.00', status: 'Paid', seats: '2,000 Student Seats + Unlimited AI' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
          Institute SaaS Subscription & Billing
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
          Manage your enterprise multi-branch seat quota, AI evaluation credits, and monthly invoices.
        </p>
      </div>

      {/* Subscription Tier Overview Card */}
      <div 
        className="edu-card" 
        style={{ 
          padding: '28px', 
          background: 'linear-gradient(135deg, #FFF1F2 0%, #FFFFFF 100%)', 
          border: '1.5px solid var(--primary-red-border)' 
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="badge badge-red">Enterprise Institutional Plan</span>
            <h2 style={{ fontSize: '22px', fontWeight: '800', marginTop: '8px', color: 'var(--brand-slate)' }}>
              Edumax Full Campus Cloud Suite
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Authorized for up to 5 campus branches across Bangladesh. Renews on <strong>November 01, 2026</strong>.
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-red)' }}>
              $3,800<span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>/mo</span>
            </div>
            <button className="btn btn-secondary btn-sm" style={{ marginTop: '8px' }} onClick={() => alert("Contacting account executive for tier increase...")}>
              Upgrade Seat Quota
            </button>
          </div>
        </div>

        {/* Seat Usage Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
              <span style={{ fontWeight: '600' }}>Enrolled Student Seats</span>
              <strong>1,420 / 2,000 (71%)</strong>
            </div>
            <div style={{ height: '7px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '71%', height: '100%', background: 'var(--primary-red)' }} />
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>580 vacant seats available</div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
              <span style={{ fontWeight: '600' }}>Whisper Voice AI Minutes</span>
              <strong>28,400 / 50,000 mins</strong>
            </div>
            <div style={{ height: '7px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '56%', height: '100%', background: 'var(--accent-blue)' }} />
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Automatic rollover enabled</div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
              <span style={{ fontWeight: '600' }}>Campus Branches Allowed</span>
              <strong>5 / 5 Utilized</strong>
            </div>
            <div style={{ height: '7px', background: '#DCFCE7', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', background: 'var(--accent-green)' }} />
            </div>
            <div style={{ fontSize: '11px', color: 'var(--accent-green)', marginTop: '4px' }}>All branch hubs connected</div>
          </div>
        </div>
      </div>

      {/* Invoice Receipts Table */}
      <div className="edu-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Past Institutional Invoices</h3>
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice Reference</th>
                <th>Billing Period</th>
                <th>Entitlements Covered</th>
                <th>Amount Paid</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: '700' }}>{inv.id}</td>
                  <td>{inv.date}</td>
                  <td>{inv.seats}</td>
                  <td style={{ fontWeight: '700' }}>{inv.amount}</td>
                  <td>
                    <span className="badge badge-green">
                      <CheckCircle2 size={12} /> {inv.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => alert(`Downloading PDF invoice for ${inv.id}...`)}
                    >
                      <Download size={14} />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
