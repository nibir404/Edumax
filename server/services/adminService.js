import { db } from '../data/store.js';

export class AdminService {
  static getTenants() {
    return db.get('tenants') || [];
  }

  static updateTenant(id, updateData) {
    const tenants = db.get('tenants') || [];
    const index = tenants.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Tenant not found');

    tenants[index] = { ...tenants[index], ...updateData };
    db.set('tenants', tenants);
    return tenants[index];
  }

  static validateCoupon(code, originalPrice = 49.00) {
    const coupons = db.get('coupons') || [];
    const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase().trim());

    if (!coupon) {
      return { valid: false, message: 'Invalid or unrecognized coupon code.' };
    }
    if (coupon.status !== 'Active' || coupon.used >= coupon.maxUses) {
      return { valid: false, message: 'This coupon has expired or reached maximum redemption limit.' };
    }

    let discountAmount = 0;
    if (coupon.type === 'Percentage') {
      const percent = parseInt(coupon.discount.replace(/[^0-9]/g, '')) || 10;
      discountAmount = (originalPrice * percent) / 100;
    } else {
      discountAmount = parseFloat(coupon.discount.replace(/[^0-9.]/g, '')) || 20;
    }

    const finalPrice = Math.max(0, originalPrice - discountAmount);

    return {
      valid: true,
      code: coupon.code,
      discount: coupon.discount,
      discountAmount,
      finalPrice: finalPrice.toFixed(2),
      message: `Coupon applied successfully! You save $${discountAmount.toFixed(2)}.`
    };
  }

  static toggleFeatureFlag(tenantId, flagKey, enabled) {
    const flags = db.get('featureFlags') || {};
    if (!flags[tenantId]) flags[tenantId] = {};
    flags[tenantId][flagKey] = enabled;
    db.set('featureFlags', flags);
    return flags[tenantId];
  }

  static getSystemTelemetry() {
    return {
      status: 'Healthy',
      uptime: '99.98%',
      apiLatency: `${Math.floor(24 + Math.random() * 8)} ms`,
      activeWorkers: 16,
      aiQueueLoad: '3.8% (Optimal)',
      dbPoolStatus: '142 / 500 connections active',
      monthlyInfraCost: '$840.20',
      timestamp: new Date().toISOString()
    };
  }

  static replySupportTicket(ticketId, replyText) {
    const tickets = db.get('supportTickets') || [];
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) throw new Error('Ticket not found');

    ticket.status = 'Resolved';
    ticket.adminReply = replyText;
    ticket.resolvedAt = new Date().toISOString();
    db.set('supportTickets', tickets);

    // Notify user
    const notifs = db.get('notifications') || [];
    notifs.unshift({
      id: `notif-${Date.now()}`,
      title: `Support Ticket #${ticketId} Resolved`,
      body: `Platform Admin response: "${replyText.slice(0, 60)}..."`,
      time: 'Just now',
      read: false
    });
    db.set('notifications', notifs);

    return ticket;
  }
}
