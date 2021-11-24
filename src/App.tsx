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
          <Route path="/" element={<WeatherListPage title="Weather List" />} />
          <Route path="/dashboard" element={<WeatherDashboardPage title="Weather Dashboard" />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
};

export default App;
