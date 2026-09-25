const API_BASE = '/api';

const getHeaders = (isMultipart = false) => {
  const headers = {};
  const token = localStorage.getItem('glowai_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

export const api = {
  // Auth
  login: async (credentials) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  register: async (userData) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  getProfile: async () => {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch profile');
    return data;
  },

  updateProfile: async (updates) => {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update profile');
    return data;
  },

  toggleRoutineCheck: async (period) => {
    const res = await fetch(`${API_BASE}/auth/routine-check`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ period })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update routine');
    return data;
  },

  // Products
  getProducts: async (filters = {}) => {
    const query = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== '' && filters[key] !== 'All') {
        query.append(key, filters[key]);
      }
    });
    const res = await fetch(`${API_BASE}/products?${query.toString()}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch products');
    return data;
  },

  getProductById: async (id) => {
    const res = await fetch(`${API_BASE}/products/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch product');
    return data;
  },

  addProductReview: async (productId, reviewData) => {
    const res = await fetch(`${API_BASE}/products/${productId}/reviews`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(reviewData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to post review');
    return data;
  },

  // AI Analysis
  analyzeImage: async (formData) => {
    const token = localStorage.getItem('glowai_token');
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const res = await fetch(`${API_BASE}/analysis`, {
      method: 'POST',
      headers: headers,
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'AI Analysis failed');
    return data;
  },

  getAnalysisHistory: async () => {
    const res = await fetch(`${API_BASE}/analysis/my-history`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch analysis history');
    return data;
  },

  // Doctors & Consultations
  getDoctors: async (specialty) => {
    const url = specialty && specialty !== 'All'
      ? `${API_BASE}/doctors?specialty=${encodeURIComponent(specialty)}`
      : `${API_BASE}/doctors`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch doctors');
    return data;
  },

  bookAppointment: async (bookingData) => {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(bookingData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to book consultation');
    return data;
  },

  getMyAppointments: async () => {
    const res = await fetch(`${API_BASE}/appointments/my-appointments`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch appointments');
    return data;
  },

  // Orders
  createOrder: async (orderData) => {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(orderData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Order placement failed');
    return data;
  },

  getMyOrders: async () => {
    const res = await fetch(`${API_BASE}/orders/my-orders`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch orders');
    return data;
  }
};
