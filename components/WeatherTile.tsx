'use client';
import { WeatherAppProvider } from "@/app/context/WeatherAppContext";
import { TempOptions } from "./TempOptions";
import { Card } from "./ui/card";

const WeatherTile = () => {
  return (
    <WeatherAppProvider>
      <div className="h-fit w-full flex flex-column md:flex-row justify-between px-4 py-2">
        <TempOptions />
        <div className="w-full md:max-w-lg px-1 md:px-0">
          <Card className="bg-slate-600 ">WeatherApp</Card>
        </div>
      </div>
    </WeatherAppProvider>
  )
}

export { WeatherTile }