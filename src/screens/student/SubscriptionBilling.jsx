import React from 'react';
import { 
  CreditCard, 
  Check, 
  Zap, 
  ShieldCheck, 
  ArrowUpRight, 
  HelpCircle,
  Clock
} from 'lucide-react';

export default function SubscriptionBilling({ onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
          Subscription & Entitlements
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
          Your current plan tier, speaking interview credits, and payment methods.
        </p>
      </div>

      {/* Active Plan Card */}
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
            <span className="badge badge-red">Active Enrolled Tier</span>
            <h2 style={{ fontSize: '22px', fontWeight: '800', marginTop: '8px', color: 'var(--brand-slate)' }}>
              Edumax IELTS Masterclass VIP Pass
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Full institutional pass through Gulshan Branch enrollment. Renews on <strong>November 30, 2026</strong>.
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-red)' }}>
              $49<span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>/mo (Covered by Institute)</span>
            </div>
            <button className="btn btn-secondary btn-sm" style={{ marginTop: '8px' }} onClick={() => onNavigate('invoices')}>
              View Invoices
            </button>
          </div>
        </div>

        {/* Quota Progress */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
              <span style={{ fontWeight: '600' }}>1-on-1 Speaking Interviews</span>
              <strong>8 / 10 Used</strong>
            </div>
            <div style={{ height: '7px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '80%', height: '100%', background: 'var(--primary-red)' }} />
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>2 credits remaining this cycle</div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
              <span style={{ fontWeight: '600' }}>AI Writing Evaluations</span>
              <strong>Unlimited</strong>
            </div>
            <div style={{ height: '7px', background: '#DCFCE7', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', background: 'var(--accent-green)' }} />
            </div>
            <div style={{ fontSize: '11px', color: 'var(--accent-green)', marginTop: '4px' }}>Fair use policy active</div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
              <span style={{ fontWeight: '600' }}>Full Mock Exams</span>
              <strong>7 / 12 Taken</strong>
            </div>
            <div style={{ height: '7px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '58%', height: '100%', background: 'var(--accent-blue)' }} />
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>5 official papers available</div>
          </div>
        </div>
      </div>

      {/* Payment Method Card */}
      <div className="edu-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Payment Method on File</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: '#0F172A', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700' }}>Visa Corporate Debit •••• 4821</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Expires 08/29 • Primary Billing Method</div>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => alert("Billing details updated.")}>
            Update Card
          </button>
        </div>
      </div>

    </div>
  );
}
