import React, { useState } from 'react';
import { 
  Sparkles, 
  Save, 
  CheckCircle2, 
  Building2, 
  Cpu, 
  ShieldCheck, 
  Mic, 
  PenTool, 
  MessageSquare 
} from 'lucide-react';
import { PLATFORM_TENANTS } from '../../data/mockData';

export default function FeatureFlags() {
  const [selectedTenant, setSelectedTenant] = useState(PLATFORM_TENANTS[0].id);
  const [flags, setFlags] = useState({
    aiWritingGrading: true,
    liveSpeakingVideo: true,
    whatsappAlerts: true,
    antiCheatingProctoring: true,
    customDomainSsl: true,
    betaWhisperTranscriber: false
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key) => setFlags(f => ({ ...f, [key]: !f[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
          Per-Tenant Feature Flags & Rollouts
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
          Dynamically toggle beta modules, AI compute features, and video/audio streaming services per institute.
        </p>
      </div>

      {saved && (
        <div style={{ padding: '12px 18px', background: 'var(--accent-green-light)', color: '#065F46', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} /> Feature flags successfully deployed to tenant cache!
        </div>
      )}

      {/* Tenant Selector */}
      <div className="edu-card" style={{ padding: '24px' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Select Target Tenant</label>
          <select 
            className="form-select"
            value={selectedTenant}
            onChange={(e) => setSelectedTenant(e.target.value)}
          >
            {PLATFORM_TENANTS.map(t => (
              <option key={t.id} value={t.id}>{t.name} ({t.domain})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Feature Toggles List */}
      <div className="edu-card" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Active Feature Matrix</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#F8FAFC', borderRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <PenTool size={18} color="var(--primary-red)" />
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: '700' }}>Automated AI Writing Grader & Rewriter</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Provides instant Band 9 model rewrite and lexical annotations.</div>
              </div>
            </div>
            <input 
              type="checkbox" 
              checked={flags.aiWritingGrading}
              onChange={() => toggle('aiWritingGrading')}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary-red)', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#F8FAFC', borderRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Mic size={18} color="var(--accent-purple)" />
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: '700' }}>Live Speaking Examiner Interactive Console</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Real-time stopwatch, script cue cards, and 4-criteria rubric sliders.</div>
              </div>
            </div>
            <input 
              type="checkbox" 
              checked={flags.liveSpeakingVideo}
              onChange={() => toggle('liveSpeakingVideo')}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary-red)', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#F8FAFC', borderRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <MessageSquare size={18} color="var(--accent-green)" />
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: '700' }}>WhatsApp Webhook Result Delivery</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Direct messaging integration with WhatsApp Cloud API.</div>
              </div>
            </div>
            <input 
              type="checkbox" 
              checked={flags.whatsappAlerts}
              onChange={() => toggle('whatsappAlerts')}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary-red)', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#F8FAFC', borderRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Cpu size={18} color="var(--accent-blue)" />
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: '700' }}>Beta: Whisper v3 Neural Audio Transcriber</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Experimental sub-second phoneme alignment for pronunciation evaluation.</div>
              </div>
            </div>
            <input 
              type="checkbox" 
              checked={flags.betaWhisperTranscriber}
              onChange={() => toggle('betaWhisperTranscriber')}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary-red)', cursor: 'pointer' }}
            />
          </div>

        </div>

        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={handleSave}>
            <Save size={15} />
            <span>Save Feature Toggles</span>
          </button>
        </div>
      </div>

    </div>
  );
}
