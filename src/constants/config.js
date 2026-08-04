export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    logout: `${API_BASE_URL}/api/auth/logout`,
    forgot: `${API_BASE_URL}/api/auth/forgot`,
    reset: `${API_BASE_URL}/api/auth/reset`
  },
  profile: `${API_BASE_URL}/api/v1/admin/profile`,
  dashboard: `${API_BASE_URL}/api/v1/dashboard`,
  agents: `${API_BASE_URL}/api/v1/agents`,
  agentsStatus: `${API_BASE_URL}/api/v1/agents/status`,
  workflows: `${API_BASE_URL}/api/v1/workflows`,
  whatsapp: `${API_BASE_URL}/api/v1/whatsapp`,
  woo: `${API_BASE_URL}/api/v1/woo`,
  products: `${API_BASE_URL}/api/v1/products`,
  orders: `${API_BASE_URL}/api/v1/orders`,
  customers: `${API_BASE_URL}/api/v1/customers`,
  crm: `${API_BASE_URL}/api/v1/crm`,
  analytics: `${API_BASE_URL}/api/v1/analytics`,
  approvals: `${API_BASE_URL}/api/v1/approvals`,
  logs: `${API_BASE_URL}/api/v1/logs`,
  monitoring: `${API_BASE_URL}/api/v1/monitoring`,
  billing: `${API_BASE_URL}/api/v1/billing`,
  upload: `${API_BASE_URL}/api/v1/upload`
};
