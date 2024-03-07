'use client'
import { FC, ReactNode, createContext, useContext, useState } from 'react';
import { Units } from '../helpers/constants';

export interface DefaultContextType {
  tempUnits: Units;
  toggleUnit: () => void;
}

const WeatherAppContext = createContext<DefaultContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}
export const WeatherAppProvider: FC<AppProviderProps> = ({ children }: { children: ReactNode }) => {
  const tempUnit = localStorage.getItem('tempUnits');
  tempUnit === null ? localStorage.setItem("tempUnits", Units.C) : null;
  const [tempUnits, setTempUnits] = useState(tempUnit || Units.C);

  const toggleUnit = () => {
    if (tempUnits === Units.C) {
      setTempUnits(Units.F);
      localStorage.setItem('tempUnits', Units.F);
    } else if (tempUnits === Units.F) {
      setTempUnits(Units.C);
      localStorage.setItem('tempUnits', Units.C);
    }
  };

  const sharedState = {
    tempUnits: tempUnits as Units,
    toggleUnit,
  };

  return (
    <WeatherAppContext.Provider value={sharedState}>
        {children}
    </WeatherAppContext.Provider>
  )
}

export function useWeatherAppContext() {
  return useContext(WeatherAppContext);
}