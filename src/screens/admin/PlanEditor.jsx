import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  Check, 
  Edit3, 
  Save, 
  DollarSign,
  Users
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

        <button className="btn btn-primary" onClick={() => alert("Create new tier modal opened.")}>
          <Plus size={15} />
          <span>Create New Tier</span>
        </button>
      </div>

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
              <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={() => alert(`Editing tier: ${plan.name}`)}>
                <Edit3 size={13} />
                <span>Configure Entitlements</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
