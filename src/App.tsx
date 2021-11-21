import React, { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import WeatherDashboardPage from './page/WeatherDashboardPage';
import WeatherListPage from './page/WeatherListPage';

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
