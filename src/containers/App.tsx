import React, { ReactElement, useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeContext } from '../context/ThemeContextProvider';
import { GlobalStyles } from '../styles/global';
import { darkTheme, lightTheme } from '../styles/theme';
import { Dashboard } from './Dashboard';

const App = function (): ReactElement {
  const context = useContext(ThemeContext);
  const { theme } = context;

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <Dashboard />
      </>
    </ThemeProvider>
  );
};
