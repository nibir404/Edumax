import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  MapPin, 
  Video, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { SPEAKING_SLOTS } from '../../data/mockData';

export default function SpeakingBooking() {
  const [selectedDate, setSelectedDate] = useState(8);
  const [selectedSlot, setSelectedSlot] = useState(SPEAKING_SLOTS[0]);
  const [selectedMode, setSelectedMode] = useState('Campus'); // 'Campus' | 'Online'
  const [isBooked, setIsBooked] = useState(false);

  // Calendar dates representation (October 2026)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
          Speaking Examiner Slot Reservation
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
          Schedule 1-on-1 official IELTS interview simulations with certified British Council & IDP trained examiners.
        </p>
      </div>

      {isBooked ? (
        <div className="edu-card" style={{ padding: '36px', textAlign: 'center', maxWidth: '580px', margin: '20px auto' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-green-light)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <CheckCircle2 size={32} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Interview Slot Confirmed!</h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '6px' }}>
            Your 1-on-1 interview with <strong>{selectedSlot.examiner}</strong> is locked for <strong>October {selectedDate}, 2026 ({selectedSlot.time})</strong>.
          </p>
          <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '10px', margin: '20px 0', border: '1px solid var(--border-color)', textAlign: 'left', fontSize: '13px' }}>
            <div>📍 <strong>Location:</strong> {selectedMode === 'Campus' ? selectedSlot.branch : 'Zoom High-Security Interview Room 2'}</div>
            <div style={{ marginTop: '6px' }}>📋 <strong>Requirements:</strong> Bring original passport or national ID. Be present 10 minutes prior.</div>
          </div>
          <button className="btn btn-primary" onClick={() => setIsBooked(false)}>
            Book Another Session
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
          
          {/* Calendar Picker (Panacea Inspired) */}
          <div className="edu-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700' }}>October 2026</h3>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px' }}><ChevronLeft size={14} /></button>
                <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px' }}><ChevronRight size={14} /></button>
              </div>
            </div>

            {/* Days header */}
            <div className="calendar-grid">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, idx) => (
                <div key={idx} className="calendar-day-header">{d}</div>
              ))}
              {days.map((day) => {
                const isAvailable = [8, 9, 10, 14, 15, 21, 22].includes(day);
                const isSelected = selectedDate === day;
                return (
                  <div
                    key={day}
                    className={`calendar-day-cell ${isSelected ? 'selected' : ''} ${isAvailable ? 'has-event' : ''}`}
                    onClick={() => isAvailable && setSelectedDate(day)}
                    style={{ opacity: isAvailable ? 1 : 0.4, cursor: isAvailable ? 'pointer' : 'not-allowed' }}
                  >
                    <span>{day}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '20px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0284C7' }} /> Available Slots
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#CBD5E1' }} /> Fully Booked
              </span>
            </div>
          </div>

          {/* Slot & Examiner Selector */}
          <div className="edu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '14px' }}>
                Available Slots for Oct {selectedDate}, 2026
              </h3>

              {/* Mode Selector */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <button 
                  className={`btn btn-sm ${selectedMode === 'Campus' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ flex: 1 }}
                  onClick={() => setSelectedMode('Campus')}
                >
                  <MapPin size={14} /> On-Campus Center
                </button>
                <button 
                  className={`btn btn-sm ${selectedMode === 'Online' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ flex: 1 }}
                  onClick={() => setSelectedMode('Online')}
                >
                  <Video size={14} /> Online Zoom
                </button>
              </div>

              {/* Time Slots List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {SPEAKING_SLOTS.map((slot) => {
                  const isSelected = selectedSlot.id === slot.id;
                  return (
                    <div
                      key={slot.id}
                      style={{
                        padding: '14px',
                        borderRadius: '10px',
                        border: `1.5px solid ${isSelected ? 'var(--primary-red)' : 'var(--border-color)'}`,
                        background: isSelected ? 'var(--primary-red-subtle)' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700', fontSize: '13.5px', color: 'var(--text-primary)' }}>
                          {slot.time}
                        </span>
                        <span className="badge badge-green">Available</span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        Examiner: <strong>{slot.examiner}</strong> • {slot.branch}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '12px' }}
                onClick={() => setIsBooked(true)}
              >
                Confirm Slot Reservation
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
