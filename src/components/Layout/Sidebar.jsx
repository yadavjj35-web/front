import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiCpu, FiUsers, FiLayers, FiBell, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const items = [
  { to: '/', label: 'Dashboard', icon: <FiHome /> },
  { to: '/ai-executive', label: 'AI Executive', icon: <FiCpu /> },
  { to: '/ai-agents', label: 'AI Agents', icon: <FiCpu /> },
  { to: '/workflows', label: 'Workflows', icon: <FiLayers /> },
  { to: '/whatsapp', label: 'WhatsApp', icon: <FiUsers /> },
  { to: '/woo', label: 'WooCommerce', icon: <FiUsers /> },
  { to: '/products', label: 'Products', icon: <FiUsers /> },
  { to: '/orders', label: 'Orders', icon: <FiUsers /> },
  { to: '/customers', label: 'Customers', icon: <FiUsers /> },
  { to: '/crm', label: 'CRM', icon: <FiUsers /> },
  { to: '/analytics', label: 'Analytics', icon: <FiUsers /> },
  { to: '/approvals', label: 'Owner Approval', icon: <FiBell /> },
  { to: '/logs', label: 'Logs', icon: <FiLogOut /> },
  { to: '/monitoring', label: 'Monitoring', icon: <FiCpu /> },
  { to: '/settings', label: 'Settings', icon: <FiSettings /> }
];

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
      <div className="p-4 text-lg font-semibold border-b border-slate-100 dark:border-slate-700">WA‑AI Admin</div>
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 ${isActive ? 'bg-slate-100 dark:bg-slate-700 font-medium' : ''}`
            }
          >
            <span className="text-xl text-primary">{it.icon}</span>
            <span>{it.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-slate-100 dark:border-slate-700">
        <button onClick={() => toggleTheme()} className="w-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700">
          Toggle Theme ({theme})
        </button>
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full mt-2 px-3 py-2 rounded-md text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
        >
          <div className="flex items-center gap-2">
            <FiLogOut /> <span>Logout</span>
          </div>
        </button>
      </div>
    </aside>
  );
}
