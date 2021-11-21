import React, { createContext, useContext, useState } from 'react';
import { IClimateDTO } from '../dto/IClimateDTO';

export interface IAppContext {
    weatherData: IClimateDTO[],
    updateWeatherData: (data: IClimateDTO[]) => void;
}

export const AppContext = createContext<IAppContext>({
  weatherData: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateWeatherData: () => {},
});

export const AppContextProvider: React.FunctionComponent = function ({ children }) {
  const [weatherData, setData] = useState<IClimateDTO[]>([]);

  const updateWeatherData = (data: IClimateDTO[]): void => {
    setData(data);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AppContext.Provider value={{ weatherData, updateWeatherData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): IAppContext => {
  const context = useContext<IAppContext>(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
};
