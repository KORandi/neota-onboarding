import React, {
  createContext, useContext, useMemo, useState,
} from 'react';
import { IClimateAavgDTO } from '../dtos/IClimateAavgDTO';
import { IClimateMavgDTO } from '../dtos/IClimateMavgDTO';
import { IFilterForm } from '../ifaces/IFilterForm';

interface IAppContext {
  mavg: {
    isLoaded: boolean,
    data: IClimateMavgDTO[]
  },
  aavg: {
    isLoaded: boolean,
    data: IClimateAavgDTO[]
  },
  filter: IFilterForm,
  flashMessages: {message: string, type: string}[];
  updateMavg: (data: {
    isLoaded: boolean,
    data: IClimateMavgDTO[]
  }) => void;
  updateAavg: (data: {
    isLoaded: boolean,
    data: IClimateAavgDTO[]
  }) => void;
  addFlashMessage: (data: {message: string, type: string}) => void;
  popFlashMessage: () => void;
  updateFilter: (filter: IFilterForm) => void;
}

const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppContextProvider: React.FunctionComponent = function ({ children }) {
  const [mavg, setMavg] = useState<{
    isLoaded: boolean,
    data: IClimateMavgDTO[]
  }>({
    isLoaded: true,
    data: [],
  });
  const [aavg, setAavg] = useState<{
    isLoaded: boolean,
    data: IClimateAavgDTO[]
  }>({
    isLoaded: true,
    data: [],
  });
  const [flashMessages, setFlashMessages] = useState<{message: string, type: string}[]>([]);
  const [filter, setFilter] = useState<IFilterForm>({});

  const updateMavg = (climateData: {
    isLoaded: boolean,
    data: IClimateMavgDTO[]
  }): void => {
    setMavg((oldClimateData) => ({ ...oldClimateData, ...climateData }));
  };

  const updateAavg = (climateData: {
    isLoaded: boolean,
    data: IClimateAavgDTO[]
  }): void => {
    setAavg((oldClimateData) => ({ ...oldClimateData, ...climateData }));
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

  const updateFilter = (newFilter: IFilterForm): void => {
    setFilter(newFilter);
  };

  return (
    <AppContext.Provider
      value={useMemo(() => ({
        mavg,
        aavg,
        flashMessages,
        filter,
        updateMavg,
        updateAavg,
        addFlashMessage,
        popFlashMessage,
        updateFilter,
      }), [mavg, aavg, flashMessages, filter])}
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
