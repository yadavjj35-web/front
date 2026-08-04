import React from 'react';
import { APP_TITLE } from '../../constants/strings';

export default function Meta({ title, description = '' }) {
  const full = title ? `${title} • ${APP_TITLE}` : APP_TITLE;
  React.useEffect(() => {
    document.title = full;
    if (description) {
      let el = document.querySelector('meta[name="description"]');
      if (!el) {
        el = document.createElement('meta');
        el.name = 'description';
        document.head.appendChild(el);
      }
      el.content = description;
    }
  }, [full, description]);
  return null;
}
