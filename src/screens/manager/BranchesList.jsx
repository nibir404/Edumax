import React from 'react';
import { 
  Plus, 
  ChevronRight 
} from 'lucide-react';
import { INSTITUTE_BRANCHES } from '../../data/mockData';

export default function BranchesList() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            Campus Branches Management
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Multi-branch physical test facilities, local exam directors, and capacity allocation.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => alert("Branch creation wizard opened.")}>
          <Plus size={15} />
          <span>Provision New Branch</span>
        </button>
      </div>

      {/* Branches Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {INSTITUTE_BRANCHES.map((b) => (
          <div key={b.id} className="edu-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span className="badge badge-red">{b.code} Campus</span>
              <span className="badge badge-green">Operational</span>
            </div>

            <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '4px' }}>{b.name}</h3>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Branch Director: <strong>{b.manager}</strong>
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '12.5px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Students:</span>
                <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{b.students} active</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Staff:</span>
                <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{b.staff} members</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Exam Labs:</span>
                <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{b.rooms} suites</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Monthly Intake:</span>
                <div style={{ fontWeight: '800', color: 'var(--accent-green)' }}>{b.revenue}</div>
              </div>
            </div>

            <button 
              className="btn btn-secondary btn-sm" 
              style={{ width: '100%', marginTop: '16px' }}
              onClick={() => alert(`Opening configuration for ${b.name}`)}
            >
              <span>Manage Campus Facilities</span>
              <ChevronRight size={13} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
