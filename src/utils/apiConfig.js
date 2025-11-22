// Get API base URL with fallback to proxy or default
export const getApiBaseUrl = () => {
  // Use environment variable if available
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // Fallback to proxy (for development)
  return '';
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to build full API URL
export const getApiUrl = (endpoint) => {
  if (!endpoint) return '';
  // If endpoint already includes full URL, return as is
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint;
  }
  // Ensure endpoint starts with /
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  // If API_BASE_URL is empty, use relative path (proxy will handle it)
  if (!API_BASE_URL) {
    return normalizedEndpoint;
  }
  // Ensure API_BASE_URL doesn't end with /
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  return `${baseUrl}${normalizedEndpoint}`;
};

export const getImageUrl = (path) => {
  if (!path) return '';
  // If path already includes full URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  // If API_BASE_URL is empty, path should already be relative from server
  if (!API_BASE_URL) {
    return path;
  }
  // Ensure API_BASE_URL doesn't end with /
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  return `${baseUrl}${path}`;
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