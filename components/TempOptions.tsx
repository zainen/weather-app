'use client';
import { TemperatureUnitsEnum } from "@/app/helpers/constants";
import { Switch } from "./ui/switch";
import { useWeatherAppContext } from "@/app/context/WeatherAppContext";

const TempOptions = () => {
  const context = useWeatherAppContext();
  
  return (
    <div className="flex self-end p-2">
      <p className="text-gray-500 dark:text-gray-400 px-2">
        {TemperatureUnitsEnum.F}
      </p>
      <Switch className="data-[state=checked]:bg-cyan-700" onClick={context?.toggleUnit} checked={context?.temperatureUnits === TemperatureUnitsEnum.C}/>
      <p className="text-gray-500 dark:text-gray-400 px-2">
        {TemperatureUnitsEnum.C}
      </p>
    </div>
  )
}

export { TempOptions }