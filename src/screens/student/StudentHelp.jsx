import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Mail, 
  CheckCircle2 
} from 'lucide-react';

export default function StudentHelp() {
  const [openFaq, setOpenFaq] = useState(0);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketData, setTicketData] = useState({ subject: '', category: 'Speaking Booking', message: '' });

  const faqs = [
    {
      q: 'How is the IELTS Speaking Mock conducted?',
      a: 'Speaking mock sessions can be attended either in-person at your campus branch or via our secure Zoom high-definition portal. A certified examiner conducts all 3 parts with authentic timing and generates your 4-criteria feedback within 2 hours.'
    },
    {
      q: 'How does the AI Writing Evaluator determine band scores?',
      a: 'Our algorithmic model evaluates Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy using calibrated IELTS examiner corpora. Your essay is subsequently reviewed and confirmed by our senior examiner.'
    },
    {
      q: 'Can I reschedule an upcoming Speaking slot?',
      a: 'Yes, slots can be rescheduled without penalty up to 6 hours before the booked interview time directly through your Speaking Booking screen.'
    },
    {
      q: 'How do I obtain my official paper Test Report Form (TRF)?',
      a: 'Your digital TRF is immediately downloadable in the My Results section. For an embossed hardcopy, visit the Gulshan HQ administrative desk with your student ID.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setTicketSubmitted(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
          Edumax Student Support & FAQ Hub
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
          Get instant assistance from examiners, academic counselors, and technical coordinators.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        
        {/* FAQ Accordions */}
        <div className="edu-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Frequently Asked Questions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  style={{ 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '8px', 
                    overflow: 'hidden' 
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: isOpen ? '#F8FAFC' : '#FFFFFF',
                      border: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'left',
                      fontSize: '13.5px',
                      fontWeight: '700',
                      color: isOpen ? 'var(--primary-red)' : 'var(--text-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, borderTop: '1px solid var(--border-color)', background: '#FAFAFA' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Ticket Form */}
        <div className="edu-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Submit a Support Ticket</h3>

          {ticketSubmitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-green-light)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <CheckCircle2 size={24} />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: '700' }}>Ticket Submitted!</h4>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Your ticket <strong>#EDX-8821</strong> has been queued. A senior academic counselor will reply within 30 minutes.
              </p>
              <button className="btn btn-secondary btn-sm" style={{ marginTop: '16px' }} onClick={() => setTicketSubmitted(false)}>
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Query Category</label>
                <select 
                  className="form-select"
                  value={ticketData.category}
                  onChange={(e) => setTicketData({ ...ticketData, category: e.target.value })}
                >
                  <option value="Speaking Booking">Speaking Examiner Slot Reschedule</option>
                  <option value="AI Writing Discrepancy">Writing Evaluation Inquiry</option>
                  <option value="Audio Headphone Issue">Technical / Mock Exam Lab Issue</option>
                  <option value="University Counseling">Overseas Admission Advice</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Subject</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Need to adjust Speaking interview date" 
                  required
                  value={ticketData.subject}
                  onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Message Details</label>
                <textarea 
                  className="form-textarea" 
                  rows={4} 
                  placeholder="Describe your issue or question in detail..." 
                  required
                  value={ticketData.message}
                  onChange={(e) => setTicketData({ ...ticketData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>
                <Send size={14} />
                <span>Submit Ticket</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
