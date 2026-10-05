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
import Sparkline from '../../components/charts/Sparkline';
import TrackBarChart from '../../components/charts/TrackBarChart';
import DonutPieChart from '../../components/charts/DonutPieChart';

export default function RevenueDashboard() {
  const mrrSeries = [
    { label: 'May', value: 92, detail: '$92,000 MRR' },
    { label: 'Jun', value: 98, detail: '$98,000 MRR' },
    { label: 'Jul', value: 106, detail: '$106,000 MRR' },
    { label: 'Aug', value: 114, detail: '$114,000 MRR' },
    { label: 'Sep', value: 121, detail: '$121,000 MRR' },
    { label: 'Oct', value: 128.5, detail: '$128,500 MRR (Current)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.3px', margin: 0 }}>
            Revenue & Commercial Analytics
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '3px', margin: 0 }}>
            Global recurring revenue, expansion metrics, and institutional licensing
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => alert("Exporting Global Financial Statements (CSV)...")}>
          <Download size={14} />
          <span>Export Statements</span>
        </button>
      </div>

      {/* 4 Stat Cards with Inline SVG Sparklines (SellPilot Style) */}
      <div className="stats-grid">
        
        <div className="edu-card stat-card" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DollarSign size={15} color="#10B981" />
              </div>
              <span className="stat-label" style={{ margin: 0 }}>Global MRR</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
              $128.5k
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--status-success-text)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ArrowUpRight size={13} />
              <span>+14.2% MoM</span>
            </div>
          </div>
          <Sparkline data={[98, 106, 114, 121, 128.5]} color="#10B981" width={74} height={32} />
        </div>

        <div className="edu-card stat-card" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={15} color="#0F172A" />
              </div>
              <span className="stat-label" style={{ margin: 0 }}>Annual Run Rate</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
              $1.54M
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--status-success-text)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ArrowUpRight size={13} />
              <span>+32% YoY</span>
            </div>
          </div>
          <Sparkline data={[1.1, 1.2, 1.35, 1.45, 1.54]} color="#0F172A" width={74} height={32} />
        </div>

        <div className="edu-card stat-card" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(200, 30, 46, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={15} color="var(--primary-red)" />
              </div>
              <span className="stat-label" style={{ margin: 0 }}>Avg Revenue / Tenant</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
              $3,780
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--status-success-text)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ArrowUpRight size={13} />
              <span>+8.5% Expansion</span>
            </div>
          </div>
          <Sparkline data={[3200, 3400, 3550, 3680, 3780]} color="var(--primary-red)" width={74} height={32} />
        </div>

        <div className="edu-card stat-card" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={15} color="#10B981" />
              </div>
              <span className="stat-label" style={{ margin: 0 }}>Annual Churn</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
              1.8%
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--status-success-text)', fontWeight: '600' }}>
              Industry Leading
            </div>
          </div>
          <Sparkline data={[2.5, 2.3, 2.1, 1.9, 1.8]} color="#10B981" width={74} height={32} isPositive={true} />
        </div>

      </div>

      {/* Visual Analytics Grid: MRR Growth Track Bar Chart + Regional Donut */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* MRR Growth Chart */}
        <div className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Revenue Velocity</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Monthly Recurring Growth ($k)</div>
            </div>
            <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#10B981', background: '#F0FDF4', padding: '2px 8px', borderRadius: '999px' }}>
              +39.6% 6-Month Run
            </span>
          </div>

          <TrackBarChart 
            items={mrrSeries} 
            maxVal={150} 
            height={180} 
            accentColor="#0F172A"
            brandColor="#10B981"
          />
        </div>

        {/* Regional Donut Pie */}
        <div className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Global Footprint</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Regional Revenue Share</div>
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DonutPieChart 
              segments={[
                { label: 'Bangladesh HQ', value: 58, color: '#C81E2E' },
                { label: 'United Kingdom', value: 22, color: '#0F172A' },
                { label: 'Australia', value: 12, color: '#10B981' },
                { label: 'Canada & ME', value: 8, color: '#64748B' }
              ]}
              size={170}
              strokeWidth={14}
              centerTitle="$128k"
              centerSubtitle="MRR"
            />
          </div>
        </div>

      </div>

    </div>
  );
}
