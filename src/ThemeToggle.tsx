import React from 'react';
import { ThemeContext } from './ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme } = React.useContext(ThemeContext);

  function handleToggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return <button onClick={handleToggleTheme}>Change theme</button>;
}
