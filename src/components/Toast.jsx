import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  return (
    <div className="toast-container">
      <div 
        className="toast"
        style={{
          borderLeft: `4px solid ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#38BDF8'}`
        }}
      >
        {type === 'success' ? (
          <CheckCircle2 size={18} color="#10B981" />
        ) : type === 'error' ? (
          <AlertCircle size={18} color="#EF4444" />
        ) : (
          <Info size={18} color="#38BDF8" />
        )}
        <span style={{ fontSize: '13px', fontWeight: '500' }}>{message}</span>
        <button 
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', marginLeft: '8px' }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
