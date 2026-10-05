const API_BASE = 'http://localhost:5001/api';

// Token Management
let authToken = localStorage.getItem('edumax_auth_token') || '';

export function setAuthToken(token) {
  authToken = token;
  if (token) {
    localStorage.setItem('edumax_auth_token', token);
  } else {
    localStorage.removeItem('edumax_auth_token');
  }
}

export function getAuthToken() {
  return authToken || localStorage.getItem('edumax_auth_token') || '';
}

async function request(endpoint, options = {}) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });
    
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`[API Client] Fallback mode for ${endpoint}:`, err.message);
    return { success: false, error: err.message };
  }
}

export const api = {
  // Auth & Token Management
  login: async ({ email, role }) => {
    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, role })
    });
    if (res && res.success && res.data?.token) {
      setAuthToken(res.data.token);
    }
    return res;
  },
  
  socialLogin: async ({ provider, role, profile }) => {
    const res = await request('/auth/social-login', {
      method: 'POST',
      body: JSON.stringify({ provider, role, profile })
    });
    if (res && res.success && res.data?.token) {
      setAuthToken(res.data.token);
    }
    return res;
  },

  getMe: () => request('/auth/me'),

  logout: () => {
    setAuthToken('');
  },

  // User & Profile
  getUser: (role) => request(`/user/${role}`),
  updateProfile: (profileData) => request('/user/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  }),

  // Exams & Tests
  getTests: () => request('/tests'),
  submitExam: (payload) => request('/exams/submit', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  getResults: () => request('/results'),

  // Speaking Slots & Atomic Booking
  getSpeakingSlots: () => request('/speaking/slots'),
  bookSpeakingSlot: (slotId, mode) => request('/speaking/book', {
    method: 'POST',
    body: JSON.stringify({ slotId, mode })
  }),
  submitSpeakingEvaluation: (payload) => request('/speaking/evaluate', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),

  // Batches & Sessions (Manager)
  getBatches: () => request('/batches'),
  createBatch: (batchData) => request('/batches/create', {
    method: 'POST',
    body: JSON.stringify(batchData)
  }),
  scheduleExamSession: (sessionData) => request('/exams/schedule', {
    method: 'POST',
    body: JSON.stringify(sessionData)
  }),
  publishResults: (sessionId, options) => request('/results/publish', {
    method: 'POST',
    body: JSON.stringify({ sessionId, options })
  }),

  // Platform Admin
  getTenants: () => request('/tenants'),
  updateTenant: (id, data) => request(`/tenants/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  validateCoupon: (code, amount) => request('/coupons/validate', {
    method: 'POST',
    body: JSON.stringify({ code, amount })
  }),
  toggleFeatureFlag: (tenantId, flagKey, enabled) => request('/features/toggle', {
    method: 'POST',
    body: JSON.stringify({ tenantId, flagKey, enabled })
  }),
  getTelemetry: () => request('/system/telemetry'),
  replySupportTicket: (ticketId, replyText) => request('/tickets/reply', {
    method: 'POST',
    body: JSON.stringify({ ticketId, replyText })
  }),

  // System Concurrency & Scalability Benchmark
  runConcurrencyBenchmark: (workers = 25) => request('/system/concurrency-test', {
    method: 'POST',
    body: JSON.stringify({ workers })
  }),

  // Notifications
  getNotifications: () => request('/notifications'),
  markNotificationsRead: () => request('/notifications/read', {
    method: 'POST'
  })
};
