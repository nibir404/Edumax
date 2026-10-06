import React from 'react';
import { 
  Cpu, 
  Activity, 
  CheckCircle2, 
  DollarSign, 
  Database 
} from 'lucide-react';
import { SYSTEM_HEALTH } from '../../data/mockData';

export default function SystemHealth() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            System Telemetry & Operational Health
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Real-time infrastructure health, AI worker queues, API response times, and monthly compute costs.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#DCFCE7', color: '#166534', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '12.5px', fontWeight: '700' }}>
          <CheckCircle2 size={15} /> All Systems Operational ({SYSTEM_HEALTH.uptime})
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="stats-grid">
        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">API Gateway Latency</span>
            <span className="stat-value">{SYSTEM_HEALTH.apiLatency}</span>
            <span className="stat-trend up">Optimal</span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-green-light)', color: 'var(--accent-green)' }}>
            <Activity size={22} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Active AI Evaluation Workers</span>
            <span className="stat-value">{SYSTEM_HEALTH.activeWorkers}</span>
            <span className="stat-trend up">Auto-Scaling On</span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-blue-light)', color: 'var(--accent-blue)' }}>
            <Cpu size={22} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">PostgreSQL Connections</span>
            <span className="stat-value">{SYSTEM_HEALTH.dbConnections}</span>
            <span className="stat-trend up">Pooled</span>
          </div>
          <div className="stat-icon-box" style={{ background: 'var(--accent-purple-light)', color: 'var(--accent-purple)' }}>
            <Database size={22} />
          </div>
        </div>

        <div className="edu-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Current AWS/GCP Cost</span>
            <span className="stat-value">{SYSTEM_HEALTH.monthlyInfraCost}</span>
            <span className="stat-trend up">Within Budget</span>
          </div>
          <div className="stat-icon-box" style={{ background: '#FEF3C7', color: '#B45309' }}>
            <DollarSign size={22} />
          </div>
        </div>
      </div>

      {/* Queue & Error Details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="edu-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Background Processing Queues</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span style={{ fontWeight: '600' }}>Whisper Audio Processing Queue</span>
                <span className="badge badge-green">0 Pending (Real-time)</span>
              </div>
              <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '3px' }}>
                <div style={{ width: '4%', height: '100%', background: 'var(--accent-green)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span style={{ fontWeight: '600' }}>AI Writing Assessment Worker Queue</span>
                <span className="badge badge-blue">2 Jobs in Transit</span>
              </div>
              <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '3px' }}>
                <div style={{ width: '12%', height: '100%', background: 'var(--accent-blue)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span style={{ fontWeight: '600' }}>WhatsApp Webhook Dispatcher</span>
                <span className="badge badge-green">0 Backlog</span>
              </div>
              <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '3px' }}>
                <div style={{ width: '2%', height: '100%', background: 'var(--accent-green)' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="edu-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Incident Logs (Last 24 Hours)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px' }}>
            <div style={{ padding: '10px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontWeight: '700', color: 'var(--accent-green)' }}>[INFO] Automated Database Snapshot</span>
                <div style={{ color: 'var(--text-muted)' }}>Created encrypted backup in ap-southeast-1.</div>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>14 mins ago</span>
            </div>

            <div style={{ padding: '10px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontWeight: '700', color: 'var(--accent-blue)' }}>[INFO] Auto-scaled AI Workers (14 -&gt; 16)</span>
                <div style={{ color: 'var(--text-muted)' }}>Triggered by batch mock exam submission spike.</div>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>2 hours ago</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
