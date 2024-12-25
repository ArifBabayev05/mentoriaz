export const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getImageUrl = (path) => {
  if (!path) return '';
  return `${API_BASE_URL}${path}`;
};

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout'
  },
  PROFILE: {
    GET: (id) => `/api/profile/${id}`,
    UPDATE: '/api/profile/update',
    UPLOAD: '/api/upload'
  },
  MENTORS: {
    LIST: '/api/mentors',
    DETAILS: (id) => `/api/mentors/${id}`
  },
  APPOINTMENTS: {
    CREATE: '/api/appointments/create',
    LIST: '/api/appointments',
    CANCEL: (id) => `/api/appointments/${id}/cancel`
  },
  PAYMENTS: {
    CREATE: '/api/payments/create',
    CALLBACK: '/api/payments/callback'
  },
  ADMIN: {
    REVIEWS: {
      LIST: '/api/admin/reviews',
      UPDATE: (id) => `/api/admin/reviews/${id}`,
      DELETE: (id) => `/api/admin/reviews/${id}`
    },
    PROFILES: {
      LIST: '/api/admin/profiles',
      UPDATE: (id) => `/api/admin/profiles/${id}`,
      DELETE: (id) => `/api/admin/profiles/${id}`
    },
    APPOINTMENTS: {
      LIST: '/api/admin/appointments',
      UPDATE: (id) => `/api/admin/appointments/${id}`,
      DELETE: (id) => `/api/admin/appointments/${id}`
    },
    USERS: {
      LIST: '/api/admin/users',
      UPDATE: (id) => `/api/admin/users/${id}`,
      DELETE: (id) => `/api/admin/users/${id}`
    }
  }
}; 