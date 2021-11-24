import React, { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './contexts/AppContext';
import WeatherDashboardPage from './pages/WeatherDashboardPage';
import WeatherListPage from './pages/WeatherListPage';

const App = function (): ReactElement {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeatherListPage />} />
          <Route path="/dashboard" element={<WeatherDashboardPage />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
};

export default App;
