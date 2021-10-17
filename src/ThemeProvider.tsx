import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './ThemeContext';

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState('dark');

  const setThemeCallback = useCallback(
    (newTheme: string) => {
      const currentThemeClass = `theme-${theme}`;
      document.body.classList.remove(currentThemeClass);
      setTheme(newTheme);
    },
    [theme, setTheme],
  );

  const value = useMemo(
    () => ({ theme: theme, setTheme: setThemeCallback }),
    [theme, setThemeCallback],
  );

  useEffect(() => {
    const currentThemeClass = `theme-${theme}`;
    document.body.classList.add(currentThemeClass);
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
