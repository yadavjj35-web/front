import React, { useState } from 'react';
import AiSettings from './Settings/AiSettings';
import WhatsAppSettings from './Settings/WhatsAppSettings';
import WooSettings from './Settings/WooSettings';
import AmazonSettings from './Settings/AmazonSettings';
import SMTPSettings from './Settings/SMTPSettings';
import RedisSettings from './Settings/RedisSettings';
import SecuritySettings from './Settings/SecuritySettings';
import LanguageSettings from './Settings/LanguageSettings';
import ThemeSettings from './Settings/ThemeSettings';
import NotificationSettings from './Settings/NotificationSettings';

export default function SettingsIndex() {
  const tabs = [
    { key: 'general', label: 'General' },
    { key: 'ai', label: 'AI' },
    { key: 'whatsapp', label: 'WhatsApp' },
    { key: 'woo', label: 'WooCommerce' },
    { key: 'amazon', label: 'Amazon' },
    { key: 'smtp', label: 'SMTP' },
    { key: 'redis', label: 'Redis' },
    { key: 'security', label: 'Security' },
    { key: 'language', label: 'Language' },
    { key: 'theme', label: 'Theme' },
    { key: 'notifications', label: 'Notifications' }
  ];

  const [active, setActive] = useState('general');

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <div className="flex gap-2 mb-4 overflow-auto">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setActive(t.key)} className={`px-3 py-2 rounded ${active === t.key ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {active === 'general' && <div className="card">General settings are available via profile page.</div>}
        {active === 'ai' && <AiSettings />}
        {active === 'whatsapp' && <WhatsAppSettings />}
        {active === 'woo' && <WooSettings />}
        {active === 'amazon' && <AmazonSettings />}
        {active === 'smtp' && <SMTPSettings />}
        {active === 'redis' && <RedisSettings />}
        {active === 'security' && <SecuritySettings />}
        {active === 'language' && <LanguageSettings />}
        {active === 'theme' && <ThemeSettings />}
        {active === 'notifications' && <NotificationSettings />}
      </div>
    </div>
  );
}
