'use client';
import { TemperatureUnitsEnum } from "@/app/helpers/constants";
import { Switch } from "../ui/switch";
import { useWeatherAppContext } from "@/app/context/WeatherAppContext";

const TempOptions = () => {
  const { toggleUnit, temperatureUnits } = useWeatherAppContext();
  
  return (
    <div className="flex p-2">
      <p className="px-2">
        {TemperatureUnitsEnum.F}
      </p>
      <Switch className="data-[state=checked]:bg-cyan-600 shadow-lg" onClick={toggleUnit} checked={temperatureUnits === TemperatureUnitsEnum.C}/>
      <p className="px-2">
        {TemperatureUnitsEnum.C}
      </p>
    </div>
  )
}

export { TempOptions }