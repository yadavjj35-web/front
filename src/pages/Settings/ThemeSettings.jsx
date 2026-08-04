import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../../components/UI/Button';

export default function ThemeSettings() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="space-y-3">
      <div className="text-sm">Current theme: <strong>{theme}</strong></div>
      <div>
        <Button onClick={toggleTheme}>Toggle Theme</Button>
      </div>
    </div>
  );
}
