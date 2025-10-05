const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.DEV 
    ? '/api'  // Use proxy in development
    : 'https://oyo-agri-backend-production.up.railway.app/api'); // Direct call in production

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    FARMER_CREATE: '/v1/Farmer/Create',
    FARMER_GET_ALL: '/v1/Farmer/GetAll',
    FARM_CREATE: '/v1/Farm/Create',
    LOGIN: '/v1/Auth/Login',
    // Add more endpoints as needed
  }
};

// Helper function to build full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};