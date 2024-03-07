'use client';

import { Units } from "@/app/helpers/constants";
import { Switch } from "./ui/switch";
import { useWeatherAppContext } from "@/app/context/WeatherAppContext";

const TempOptions = () => {
  const context = useWeatherAppContext();
  
  return (
    <div className="flex">
      <p className="text-gray-500 dark:text-gray-400 px-2">
        {Units.F}
      </p>
      <Switch className="data-[state=checked]:bg-cyan-700" onClick={context?.toggleUnit} checked={context?.tempUnits === Units.C}/>
      <p className="text-gray-500 dark:text-gray-400 px-2">
        {Units.C}
      </p>
    </div>
  )
}

export { TempOptions }