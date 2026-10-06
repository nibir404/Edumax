import React, { useState } from 'react';
import { 
  Upload, 
  Globe, 
  Save, 
  CheckCircle2 
} from 'lucide-react';
import Logo from '../../components/Logo';

export default function BrandingSettings() {
  const [primaryColor, setPrimaryColor] = useState('#C81E2E');
  const [slateColor, setSlateColor] = useState('#1F242D');
  const [portalDomain, setPortalDomain] = useState('edumax.ieltscloud.app');
  const [companyName, setCompanyName] = useState('Edumax Consultancy');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
          White-Label & Branding Customizer
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
          Customize your institute logo, brand colors, custom subdomain, and candidate test portal.
        </p>
      </div>

      {saved && (
        <div style={{ padding: '12px 18px', background: 'var(--accent-green-light)', color: '#065F46', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} /> White-label branding successfully saved and cached!
        </div>
      )}

      {/* Brand Identity Form */}
      <form onSubmit={handleSave} className="edu-card" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Institute Identity</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Logo Preview */}
          <div style={{ padding: '20px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: '700' }}>Active Institutional Logo</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Rendered across student exam report forms and certificates.</div>
              <div style={{ marginTop: '12px' }}>
                <Logo size="medium" />
              </div>
            </div>

            <button type="button" className="btn btn-secondary btn-sm" onClick={() => alert("Upload custom logo file (.png/.svg)...")}>
              <Upload size={14} />
              <span>Upload New Logo</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Institute Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Custom White-Label Subdomain</label>
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Globe size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px' }} />
                <input 
                  type="text" 
                  className="form-input" 
                  style={{ paddingLeft: '36px' }}
                  value={portalDomain}
                  onChange={(e) => setPortalDomain(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Color Tokens */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Primary Brand Accent (Edumax Crimson)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="color" 
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  style={{ width: '42px', height: '42px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                />
                <input 
                  type="text" 
                  className="form-input" 
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Secondary Brand Charcoal</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="color" 
                  value={slateColor}
                  onChange={(e) => setSlateColor(e.target.value)}
                  style={{ width: '42px', height: '42px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                />
                <input 
                  type="text" 
                  className="form-input" 
                  value={slateColor}
                  onChange={(e) => setSlateColor(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button type="submit" className="btn btn-primary">
              <Save size={15} />
              <span>Apply White-Label Settings</span>
            </button>
          </div>

        </div>
      </form>

    </div>
  );
}
