import React, { useState } from 'react';
import { 
  Ticket, 
  Plus, 
  Copy, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Percent 
} from 'lucide-react';

export default function CouponsManager() {
  const [coupons, setCoupons] = useState([
    { code: 'EDUMAX2026', discount: '20% OFF', type: 'Percentage', validTill: '2026-12-31', maxUses: 500, used: 248, status: 'Active' },
    { code: 'IELTSVIP50', discount: '$50.00 OFF', type: 'Fixed', validTill: '2026-11-15', maxUses: 200, used: 182, status: 'Active' },
    { code: 'GLOBALLAUNCH', discount: '35% OFF', type: 'Percentage', validTill: '2026-08-30', maxUses: 1000, used: 1000, status: 'Expired' }
  ]);

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

        <button className="btn btn-primary" onClick={() => alert("Coupon creation modal opened.")}>
          <Plus size={15} />
          <span>Generate Promo Code</span>
        </button>
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
                    fontSize: '14px', 
                    background: '#F1F5F9', 
                    padding: '4px 10px', 
                    borderRadius: '6px',
                    color: 'var(--brand-slate)'
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
                    onClick={() => alert(`Copied code: ${c.code}`)}
                  >
                    <Copy size={13} />
                    <span>Copy</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
