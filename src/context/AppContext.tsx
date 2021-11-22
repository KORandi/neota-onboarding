import React, { createContext, useContext, useState } from 'react';
import { IClimateDTO } from '../dto/IClimateDTO';

export interface IAppContext {
  climate: {
    isLoaded: boolean,
    data: IClimateDTO[]
  },
  searchType: string,
  flashMessages: {message: string, type: string}[];
  updateClimate: (data: {
    isLoaded: boolean,
    data: IClimateDTO[]
  }) => void;
  updateSearchType: (data: string) => void;
  addFlashMessage: (data: {message: string, type: string}) => void;
  popFlashMessage: () => void;
}

export const AppContext = createContext<IAppContext>({
  climate: {
    isLoaded: false,
    data: [],
  },
  searchType: '',
  flashMessages: [],
  updateClimate: () => null,
  updateSearchType: () => null,
  addFlashMessage: () => null,
  popFlashMessage: () => null,
});

export const AppContextProvider: React.FunctionComponent = function ({ children }) {
  const [climate, setClimate] = useState<{
    isLoaded: boolean,
    data: IClimateDTO[]
  }>({
    isLoaded: true,
    data: [],
  });
  const [searchType, setSearchType] = useState<string>('');
  const [flashMessages, setFlashMessages] = useState<{message: string, type: string}[]>([]);

  const updateClimate = (climateData: {
    isLoaded: boolean,
    data: IClimateDTO[]
  }): void => {
    setClimate({ ...climateData });
  };

  const updateSearchType = (data: string): void => {
    setSearchType(data);
  };

  const addFlashMessage = (data: {message: string, type: string}): void => {
    setFlashMessages((messages) => [...messages, data]);
  };

  const popFlashMessage = (): void => {
    setFlashMessages((messages) => {
      const temp = [...messages];
      temp.pop();
      return temp;
    });
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AppContext.Provider value={{
      climate, updateClimate, searchType, updateSearchType, flashMessages, addFlashMessage, popFlashMessage,
    }}
    >
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
