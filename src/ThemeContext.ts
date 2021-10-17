import React from 'react';

const ThemeContext = React.createContext({
  theme: 'dark',
  setTheme: (newTheme: string) => {
    console.log(newTheme);
  },
});

export { ThemeContext };
