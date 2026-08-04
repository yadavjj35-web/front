import React, { useEffect, useState } from 'react';
import Button from '../../components/UI/Button';
import { useToast } from '../../components/Toast/ToastProvider';

export default function LanguageSettings() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  const { push } = useToast();

  function save() {
    localStorage.setItem('lang', lang);
    push({ title: 'Saved', message: 'Language preference saved' });
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm mb-1">Language</label>
        <select value={lang} onChange={(e) => setLang(e.target.value)} className="px-3 py-2 border rounded">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="hi">हिन्दी</option>
        </select>
      </div>
      <div>
        <Button onClick={save}>Save</Button>
      </div>
    </div>
  );
}
