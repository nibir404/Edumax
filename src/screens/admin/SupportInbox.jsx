import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Send,
  Building2
} from 'lucide-react';

export default function SupportInbox() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');

  const tickets = [
    {
      id: 'TICK-901',
      tenant: 'Edumax Consultancy (HQ)',
      sender: 'Nafis Ahmed (Student)',
      subject: 'Speaking Examiner Slot Reschedule to Tomorrow Afternoon',
      status: 'Open',
      priority: 'High',
      time: '18 mins ago',
      message: 'Hello, due to a clash with my university exam tomorrow morning, I request to switch my 10:00 AM slot with Dr. Sarah to the 2:30 PM slot in Lab 302.'
    },
    {
      id: 'TICK-902',
      tenant: 'British Standard Academy Dhaka',
      sender: 'Tanvir Hossain (Director)',
      subject: 'Request for Additional 500 Student Seat Licenses',
      status: 'In Progress',
      priority: 'Urgent',
      time: '1 hour ago',
      message: 'We are launching our November intensive cohort and will exceed our current 1,000 seat tier by 350 students next week.'
    },
    {
      id: 'TICK-903',
      tenant: 'Apex Pathway IELTS UK',
      sender: 'Alastair Campbell (Examiner)',
      subject: 'Custom Domain SSL Auto-Renewal Status',
      status: 'Resolved',
      priority: 'Medium',
      time: 'Yesterday',
      message: 'Confirming that our custom domain SSL has renewed automatically.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
          Central Multi-Tenant Support Inbox
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
          Escalated institutional queries, candidate rescheduling requests, and license expansion tickets.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        
        {/* Tickets Queue */}
        <div className="edu-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Ticket Queue (3 Active)</h3>
            <span className="badge badge-red">1 Urgent</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tickets.map((t) => (
              <div
                key={t.id}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  border: `1.5px solid ${selectedTicket?.id === t.id ? 'var(--primary-red)' : 'var(--border-color)'}`,
                  background: selectedTicket?.id === t.id ? 'var(--primary-red-subtle)' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onClick={() => setSelectedTicket(t)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className={`badge ${t.priority === 'Urgent' ? 'badge-red' : t.priority === 'High' ? 'badge-amber' : 'badge-slate'}`}>
                    {t.priority}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.time}</span>
                </div>

                <h4 style={{ fontSize: '14px', fontWeight: '700', marginTop: '8px', color: 'var(--text-primary)' }}>
                  {t.subject}
                </h4>

                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {t.sender} • <strong style={{ color: 'var(--brand-slate)' }}>{t.tenant}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reply & Detail Workspace */}
        <div className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {selectedTicket ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span className="badge badge-slate">{selectedTicket.id}</span>
                <span className="badge badge-green">{selectedTicket.status}</span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '800', lineHeight: 1.3 }}>{selectedTicket.subject}</h3>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 16px' }}>
                From: <strong>{selectedTicket.sender}</strong> ({selectedTicket.tenant})
              </div>

              <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '13px', lineHeight: 1.6, color: 'var(--text-primary)', marginBottom: '20px' }}>
                {selectedTicket.message}
              </div>

              <div className="form-group">
                <label className="form-label">Super Admin Direct Reply</label>
                <textarea 
                  className="form-textarea" 
                  rows={4}
                  placeholder="Type official response or slot adjustment confirmation..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%' }}
                onClick={() => {
                  alert(`Reply sent to ${selectedTicket.sender}!`);
                  setReplyText('');
                }}
              >
                <Send size={14} />
                <span>Send Response & Update Ticket</span>
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <MessageSquare size={36} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <div style={{ fontWeight: '600' }}>Select a ticket from the queue</div>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>Inspect candidate or tenant details and dispatch official replies.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
