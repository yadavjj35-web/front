/**
 * apiContracts.js
 *
 * Documented expected shapes for primary endpoints used by the frontend.
 * This file is a reference for frontend-backend integration. Update as backend changes.
 */

export const contracts = {
  auth: {
    login: {
      request: { email: 'string', password: 'string' },
      response: { token: 'string', user: { id: 'string', email: 'string', name: 'string', role: 'string' } }
    },
    forgot: { request: { email: 'string' }, response: { ok: true } },
    reset: { request: { token: 'string', password: 'string' }, response: { ok: true } }
  },

  profile: {
    get: { response: { user: { id: 'string', name: 'string', email: 'string', company: 'string', settings: {} } } },
    put: { request: { name: 'string', company: 'string', settings: {} }, response: { ok: true } }
  },

  dashboard: {
    get: {
      response: {
        totalOrders: 'number',
        revenue: 'number',
        whatsappMessages: 'number',
        aiRequests: 'number',
        runningWorkflows: 'number',
        activeAgents: 'number',
        failedTasks: 'number',
        todaysSales: 'number',
        salesChart: [{ date: 'string', value: 'number' }],
        ordersChart: [{ date: 'string', count: 'number' }],
        aiUsageChart: [{ date: 'string', value: 'number' }]
      }
    }
  },

  whatsapp: {
    list: { response: { conversations: [] } },
    convo: { response: { contact: 'string', messages: [{ id: 'string', fromMe: 'boolean', text: 'string', ts: 'string', attachments: [] }] } },
    send: { request: { to: 'string', text: 'string' }, response: { ok: true } },
    templates: {
      list: { response: { templates: [{ id: 'string', name: 'string', body: 'string' }] } },
      pending: { response: { templates: [] } }
    },
    broadcast: { request: { title: 'string', message: 'string', targets: ['string'] }, response: { broadcastId: 'string' } }
  },

  products: {
    list: { response: { items: [{ id: 'string', name: 'string', price: 'number', image: 'string', category: 'string', stock: 'number' }], page: 'number', totalPages: 'number', total: 'number' } }
  },

  orders: {
    list: { response: { items: [], page: 'number', totalPages: 'number', total: 'number' } },
    get: {
      response: {
        orderId: 'string',
        customerName: 'string',
        customerEmail: 'string',
        items: [{ sku: 'string', name: 'string', price: 'number', quantity: 'number', image: 'string' }],
        subtotal: 'number',
        shipping: 'number',
        tax: 'number',
        total: 'number',
        timeline: []
      }
    },
    track: { response: { status: 'string', courier: 'string', events: [{ status: 'string', ts: 'string', location: 'string' }] } }
  },

  agents: {
    list: { response: [{ name: 'string', online: true, cpu: 'number', memory: 'number', currentWorkflow: 'string', queue: 'number', lastAction: 'string', uptime: 'string' }] },
    status: { response: {} }
  },

  upload: {
    multipart: { request: 'formdata', response: { files: [{ url: 'string', name: 'string', size: 'number', mime: 'string' }] } }
  }
};
