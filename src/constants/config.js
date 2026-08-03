// central place for API endpoint base + paths
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    logout: `${API_BASE_URL}/api/auth/logout`,
    forgot: `${API_BASE_URL}/api/auth/forgot`,
    reset: `${API_BASE_URL}/api/auth/reset`
  },
  dashboard: `${API_BASE_URL}/api/dashboard`,
  agents: `${API_BASE_URL}/api/agents`,
  workflows: `${API_BASE_URL}/api/workflows`,
  whatsapp: `${API_BASE_URL}/api/whatsapp`,
  woo: `${API_BASE_URL}/api/woo`,
  products: `${API_BASE_URL}/api/products`,
  orders: `${API_BASE_URL}/api/orders`,
  customers: `${API_BASE_URL}/api/customers`,
  crm: `${API_BASE_URL}/api/crm`,
  analytics: `${API_BASE_URL}/api/analytics`,
  approvals: `${API_BASE_URL}/api/approvals`,
  logs: `${API_BASE_URL}/api/logs`,
  monitoring: `${API_BASE_URL}/api/monitoring`,
  profile: `${API_BASE_URL}/api/profile`,
  billing: `${API_BASE_URL}/api/billing`
};
