'use client';
import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { TemperatureUnitsEnum } from '../helpers/constants';
import { WeatherApiResponse } from '../helpers/types';

export interface DefaultContextType {
  temperatureUnits: TemperatureUnitsEnum;
  toggleUnit: () => void;
  weather?: WeatherApiResponse;
  setWeather: React.Dispatch<React.SetStateAction<WeatherApiResponse | undefined>>;
}

export const WeatherAppContext = createContext<DefaultContextType | null>(null);

interface AppProviderProps {
  children: ReactNode;
}
export const WeatherAppProvider: FC<AppProviderProps> = ({ children }: { children: ReactNode }) => {
  const [temperatureUnits, setTemperatureUnits] = useState<TemperatureUnitsEnum | undefined>();
  const [weather, setWeather] = useState<WeatherApiResponse | undefined>();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getUnit =  localStorage.getItem('temperatureUnits');
      getUnit === null ? localStorage.setItem("temperatureUnits", TemperatureUnitsEnum.C) : null;
      setTemperatureUnits(getUnit as TemperatureUnitsEnum || TemperatureUnitsEnum.C);
    }
  }, [])
  

  const toggleUnit = () => {
    if (temperatureUnits === TemperatureUnitsEnum.C) {
      setTemperatureUnits(TemperatureUnitsEnum.F);
      localStorage.setItem('temperatureUnits', TemperatureUnitsEnum.F);
    } else if (temperatureUnits === TemperatureUnitsEnum.F) {
      setTemperatureUnits(TemperatureUnitsEnum.C);
      localStorage.setItem('temperatureUnits', TemperatureUnitsEnum.C);
    }
  };

  const sharedState = {
    temperatureUnits: temperatureUnits as TemperatureUnitsEnum,
    toggleUnit,
    weather,
    setWeather,
  };

  return (
    <WeatherAppContext.Provider value={sharedState}>
      {children}
    </WeatherAppContext.Provider>
  )
}

export function useWeatherAppContext() {
  const context = useContext(WeatherAppContext);
  if (!context) {
    throw new Error('useWeatherAppContext must be used within a WeatherAppProvider');
  }
  return context;
}