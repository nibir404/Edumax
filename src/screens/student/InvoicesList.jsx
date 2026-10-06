import React from 'react';
import { 
  Download, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';

export default function InvoicesList({ onBack }) {
  const invoices = [
    { id: 'INV-2026-092', date: 'Sep 01, 2026', amount: '$49.00', status: 'Paid', description: 'Edumax IELTS Masterclass VIP Monthly Seat' },
    { id: 'INV-2026-081', date: 'Aug 01, 2026', amount: '$49.00', status: 'Paid', description: 'Edumax IELTS Masterclass VIP Monthly Seat' },
    { id: 'INV-2026-070', date: 'Jul 01, 2026', amount: '$49.00', status: 'Paid', description: 'Registration & Diagnostic Assessment Fee' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Back to Subscription</span>
        </button>
        <span className="badge badge-green">All Accounts In Good Standing</span>
      </div>

      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
          Past Invoices & Receipts
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
          Download tax receipts and proof of institutional IELTS enrollment.
        </p>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Billing Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Download</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td style={{ fontWeight: '700' }}>{inv.id}</td>
                <td>{inv.date}</td>
                <td>{inv.description}</td>
                <td style={{ fontWeight: '700' }}>{inv.amount}</td>
                <td>
                  <span className="badge badge-green">
                    <CheckCircle2 size={12} /> {inv.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => alert(`Downloading PDF receipt for ${inv.id}...`)}
                  >
                    <Download size={14} />
                    <span>PDF</span>
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
