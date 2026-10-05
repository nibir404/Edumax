import React, { useState } from 'react';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Check, 
  AlertCircle,
  Save
} from 'lucide-react';

export default function NotificationSettings() {
  const [channels, setChannels] = useState({
    emailResults: true,
    emailReminders: true,
    smsSpeakingSlot: true,
    whatsappAlerts: true,
    browserPush: false,
    batchAnnouncements: true
  });

  const toggle = (key) => {
    setChannels(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
          Notification Settings & Alerts
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
          Choose how you receive official mock results, speaking interview confirmations, and batch schedules.
        </p>
      </div>

      <div className="edu-card" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Channel Delivery Preferences</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--accent-blue-light)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={20} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700' }}>Email Result Bulletins & TRF Reports</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Send PDF breakdown as soon as the examiner releases your scores.</div>
              </div>
            </div>
            <input 
              type="checkbox" 
              checked={channels.emailResults} 
              onChange={() => toggle('emailResults')}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary-red)', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#DCFCE7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageSquare size={20} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700' }}>WhatsApp Instant Alerts</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Real-time interview room links and speaking countdown notifications.</div>
              </div>
            </div>
            <input 
              type="checkbox" 
              checked={channels.whatsappAlerts} 
              onChange={() => toggle('whatsappAlerts')}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary-red)', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Smartphone size={20} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700' }}>SMS Reminders</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>SMS reminder 2 hours prior to scheduled speaking interview.</div>
              </div>
            </div>
            <input 
              type="checkbox" 
              checked={channels.smsSpeakingSlot} 
              onChange={() => toggle('smsSpeakingSlot')}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary-red)', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary-red-subtle)', color: 'var(--primary-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bell size={20} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700' }}>In-App Browser Push</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Desk alerts for new homework assignments and teacher feedback.</div>
              </div>
            </div>
            <input 
              type="checkbox" 
              checked={channels.browserPush} 
              onChange={() => toggle('browserPush')}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary-red)', cursor: 'pointer' }}
            />
          </div>

        </div>

        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={() => alert("Notification channels updated.")}>
            <Save size={15} />
            <span>Save Channel Preferences</span>
          </button>
        </div>
      </div>

    </div>
  );
}
