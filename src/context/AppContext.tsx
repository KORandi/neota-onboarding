import React, {
  createContext, useContext, useMemo, useState,
} from 'react';
import { IClimateDTO } from '../dto/IClimateDTO';

interface IAppContext {
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
    setClimate((oldClimateData) => ({ ...oldClimateData, ...climateData }));
  };

  const updateSearchType = (data: string): void => {
    setSearchType(data);
  };

  const addFlashMessage = (data: {message: string, type: string}): void => {
    setFlashMessages((messages) => [...messages, data]);
  };

  const popFlashMessage = (): void => {
    setFlashMessages((messages) => {
      if (messages.length > 0) {
        const newMessages = [...messages];
        newMessages.pop();
        return newMessages;
      }
      return messages;
    });
  };

  return (
    <AppContext.Provider
      value={useMemo(() => ({
        climate,
        searchType,
        flashMessages,
        updateClimate,
        updateSearchType,
        addFlashMessage,
        popFlashMessage,
      }), [climate, searchType, flashMessages])}
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
