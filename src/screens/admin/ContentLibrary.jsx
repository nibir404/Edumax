import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  Globe, 
  CheckCircle2, 
  Plus, 
  Clock, 
  Sparkles,
  BookOpen,
  Headphones
} from 'lucide-react';

export default function ContentLibrary() {
  const [skill, setSkill] = useState('All');

  const sharedItems = [
    { id: 'GLB-01', title: 'Cambridge Academic Reading Battery 19', questions: 40, verifiedBy: 'Global Cambridge Review Board', status: 'Approved', downloads: 820 },
    { id: 'GLB-02', title: 'High-Fidelity British Council Listening Master Audio', questions: 40, verifiedBy: 'UK Native Accents Panel', status: 'Approved', downloads: 1450 },
    { id: 'GLB-03', title: 'Task 2 AI Writing Benchmark Prompts 2026', questions: 24, verifiedBy: 'Senior Examiner Consensus', status: 'Approved', downloads: 640 },
    { id: 'GLB-04', title: 'Speaking Part 2 & 3 Modern Technology Cue Cards', questions: 18, verifiedBy: 'Global Speaking Committee', status: 'Approved', downloads: 910 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            Global Shared IELTS Content Library
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Central repository of peer-reviewed Cambridge test papers shared across licensed tenants.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => alert("Upload global curriculum pack...")}>
          <Plus size={15} />
          <span>Publish to Global Pool</span>
        </button>
      </div>

      {/* Grid of Global Content */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {sharedItems.map((item) => (
          <div key={item.id} className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span className="badge badge-blue">
                  <Globe size={12} /> Global Standard
                </span>
                <span className="badge badge-green">{item.status}</span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>{item.title}</h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                Certified by: <strong>{item.verifiedBy}</strong>
              </p>

              <div style={{ marginTop: '16px', padding: '12px', background: '#F8FAFC', borderRadius: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <div>📝 <strong>Questions:</strong> {item.questions} official items</div>
                <div style={{ marginTop: '4px' }}>📥 <strong>Institutes Using:</strong> {item.downloads} downloads</div>
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={() => alert("Synced to your institute library!")}>
                Sync to Tenant Question Banks
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
