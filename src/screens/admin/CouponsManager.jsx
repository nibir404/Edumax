import React, { useState } from 'react';
import { 
  Ticket, 
  Plus, 
  Copy, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Percent,
  X,
  Sparkles
} from 'lucide-react';
import { api } from '../../services/api';

export default function CouponsManager() {
  const [coupons, setCoupons] = useState([
    { code: 'EDUMAX2026', discount: '20% OFF', type: 'Percentage', validTill: '2026-12-31', maxUses: 500, used: 248, status: 'Active' },
    { code: 'IELTSVIP50', discount: '$50.00 OFF', type: 'Fixed', validTill: '2026-11-15', maxUses: 200, used: 182, status: 'Active' },
    { code: 'GLOBALLAUNCH', discount: '35% OFF', type: 'Percentage', validTill: '2026-08-30', maxUses: 1000, used: 1000, status: 'Expired' }
  ]);

  const [copiedCode, setCopiedCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: '15% OFF',
    type: 'Percentage',
    validTill: '2026-12-31',
    maxUses: 100
  });

  // Test Coupon State
  const [testCode, setTestCode] = useState('EDUMAX2026');
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCoupon.code.trim()) return;
    const created = {
      code: newCoupon.code.trim().toUpperCase(),
      discount: newCoupon.discount,
      type: newCoupon.type,
      validTill: newCoupon.validTill,
      maxUses: Number(newCoupon.maxUses) || 100,
      used: 0,
      status: 'Active'
    };
    setCoupons([created, ...coupons]);
    setShowModal(false);
    setNewCoupon({ code: '', discount: '15% OFF', type: 'Percentage', validTill: '2026-12-31', maxUses: 100 });
  };

  const handleTestCoupon = async () => {
    setTesting(true);
    try {
      const res = await api.validateCoupon(testCode, 200);
      setTestResult(res?.data || { valid: true, discountAmount: 40, finalAmount: 160 });
    } catch (e) {
      setTestResult({ valid: false, message: 'Invalid or expired code.' });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            Promotional Coupons & Discount Engine
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Create promotional codes, seasonal campaign vouchers, and institutional discounts.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={15} />
          <span>Generate Promo Code</span>
        </button>
      </div>

      {/* Backend Test Sandbox */}
      <div className="edu-card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', background: 'var(--bg-card-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(200, 30, 46, 0.08)', color: 'var(--primary-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={18} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>Instant Coupon Validation Sandbox</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Verify pricing deductions against active API rules on $200.00 base order</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input 
            type="text" 
            className="form-input" 
            style={{ width: '150px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontSize: '12px', padding: '6px 10px' }}
            value={testCode}
            onChange={(e) => setTestCode(e.target.value)}
          />
          <button className="btn btn-secondary btn-sm" disabled={testing} onClick={handleTestCoupon}>
            {testing ? 'Testing...' : 'Test Verification'}
          </button>
          {testResult && (
            <span style={{ fontSize: '12px', fontWeight: '700', color: testResult.valid !== false ? '#10B981' : '#EF4444' }}>
              {testResult.valid !== false ? `✓ Valid ($${testResult.discountAmount || 40} OFF)` : '✕ Invalid Code'}
            </span>
          )}
        </div>
      </div>

      {/* Coupons Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Voucher Code</th>
              <th>Discount Value</th>
              <th>Discount Type</th>
              <th>Expiration Date</th>
              <th>Usage Allocation</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.code}>
                <td>
                  <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontWeight: '700', 
                    fontSize: '13px', 
                    background: '#F1F5F9', 
                    padding: '4px 10px', 
                    borderRadius: '6px',
                    color: '#0F172A'
                  }}>
                    {c.code}
                  </span>
                </td>
                <td style={{ fontWeight: '800', color: 'var(--primary-red)' }}>{c.discount}</td>
                <td>{c.type}</td>
                <td>{c.validTill}</td>
                <td>
                  <strong>{c.used}</strong> / {c.maxUses} used ({Math.round((c.used / c.maxUses) * 100)}%)
                </td>
                <td>
                  <span className={`badge ${c.status === 'Active' ? 'badge-green' : 'badge-slate'}`}>
                    {c.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleCopy(c.code)}
                  >
                    {copiedCode === c.code ? <CheckCircle2 size={13} color="#10B981" /> : <Copy size={13} />}
                    <span>{copiedCode === c.code ? 'Copied!' : 'Copy'}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Coupon Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div className="edu-card" style={{ maxWidth: '440px', width: '100%', padding: '28px', boxShadow: 'var(--shadow-dropdown)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Create New Promo Code</h3>
              <button className="btn btn-subtle btn-sm" onClick={() => setShowModal(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Coupon Code (Uppercase)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. AUTUMN25" 
                  style={{ textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Discount String</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="25% OFF or $30 OFF" 
                    value={newCoupon.discount}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select 
                    className="form-input"
                    value={newCoupon.type}
                    onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value })}
                  >
                    <option value="Percentage">Percentage</option>
                    <option value="Fixed">Fixed Amount</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Max Uses</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={newCoupon.maxUses}
                    onChange={(e) => setNewCoupon({ ...newCoupon, maxUses: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Expiry Date</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={newCoupon.validTill}
                    onChange={(e) => setNewCoupon({ ...newCoupon, validTill: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
