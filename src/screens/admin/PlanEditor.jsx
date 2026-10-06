import React, { useState } from 'react';
import { 
  Plus, 
  Check, 
  Edit3, 
  X, 
  CheckCircle2 
} from 'lucide-react';

export default function PlanEditor() {
  const [plans, setPlans] = useState([
    {
      id: 'plan_starter',
      name: 'Starter Academy',
      price: '$450',
      period: '/mo',
      seats: 300,
      branches: 1,
      features: ['Full 4-Skill Mock Tests', 'Basic AI Writing Grader', 'Standard Question Bank']
    },
    {
      id: 'plan_pro',
      name: 'Institute Pro',
      price: '$1,400',
      period: '/mo',
      seats: 1000,
      branches: 3,
      features: ['Live Speaking Video Console', 'Band 9 AI Exemplar Rewriter', 'Custom Branding & Subdomain', 'Priority Support']
    },
    {
      id: 'plan_enterprise',
      name: 'Enterprise VIP Cloud',
      price: '$3,800',
      period: '/mo',
      seats: 2500,
      branches: 10,
      features: ['Unlimited Branches', 'Dedicated Whispering Voice AI Engine', 'Custom Domain SSL', '24/7 Account Director']
    }
  ]);

  const [editingPlan, setEditingPlan] = useState(null);
  const [savedBanner, setSavedBanner] = useState('');

  const handleSavePlan = (e) => {
    e.preventDefault();
    if (!editingPlan) return;
    const exists = plans.some(p => p.id === editingPlan.id);
    if (exists) {
      setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
      setSavedBanner(`Updated entitlements for ${editingPlan.name}!`);
    } else {
      setPlans([...plans, editingPlan]);
      setSavedBanner(`Created new tier: ${editingPlan.name}!`);
    }
    setEditingPlan(null);
    setTimeout(() => setSavedBanner(''), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
            SaaS Plan Entitlements & Pricing Editor
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
            Define student seat quotas, AI compute allocations, and recurring monthly pricing tiers.
          </p>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={() => setEditingPlan({
            id: `plan_custom_${Date.now().toString().slice(-4)}`,
            name: 'New Custom Tier',
            price: '$950',
            period: '/mo',
            seats: 600,
            branches: 2,
            features: ['4-Skill Diagnostic Sim', 'Standard Question Bank', 'Email Support']
          })}
        >
          <Plus size={15} />
          <span>Create New Tier</span>
        </button>
      </div>

      {savedBanner && (
        <div style={{ padding: '12px 16px', background: 'var(--accent-green-light)', color: '#065F46', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} />
          <span>{savedBanner}</span>
        </div>
      )}

      {/* Plans Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {plans.map((plan) => (
          <div key={plan.id} className="edu-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800' }}>{plan.name}</h3>
                <span className="badge badge-slate">{plan.id}</span>
              </div>

              <div style={{ margin: '18px 0' }}>
                <span style={{ fontSize: '34px', fontWeight: '900', color: 'var(--primary-red)' }}>{plan.price}</span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{plan.period}</span>
              </div>

              <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '18px', fontSize: '12.5px' }}>
                <div>👥 <strong>Seats:</strong> Up to {plan.seats} students</div>
                <div style={{ marginTop: '4px' }}>🏢 <strong>Branches:</strong> Up to {plan.branches} locations</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                {plan.features.map((feat, fIdx) => (
                  <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={14} color="var(--accent-green)" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <button 
                className="btn btn-secondary btn-sm" 
                style={{ width: '100%' }} 
                onClick={() => setEditingPlan({ ...plan })}
              >
                <Edit3 size={13} />
                <span>Configure Entitlements</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Tier Modal */}
      {editingPlan && (
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
          <div className="edu-card" style={{ maxWidth: '480px', width: '100%', padding: '28px', boxShadow: 'var(--shadow-dropdown)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Configure {editingPlan.name}</h3>
              <button className="btn btn-subtle btn-sm" onClick={() => setEditingPlan(null)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSavePlan} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Tier Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Price ($)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Period</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={editingPlan.period}
                    onChange={(e) => setEditingPlan({ ...editingPlan, period: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Student Seat Quota</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={editingPlan.seats}
                    onChange={(e) => setEditingPlan({ ...editingPlan, seats: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Max Branches</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={editingPlan.branches}
                    onChange={(e) => setEditingPlan({ ...editingPlan, branches: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setEditingPlan(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Entitlements
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
