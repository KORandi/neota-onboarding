import React, {
  createContext, ReactElement, useContext, useState,
} from 'react';

interface Theme {
  theme: string,
  toggleTheme?: (theme: string) => void
}

export const ThemeContext = createContext<Theme>({ theme: 'light' });

export const ThemeContextProvider: React.FC<ReactElement> = function ({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = (): void => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): Theme => {
  const context = useContext<Theme>(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }

  return context;
};
