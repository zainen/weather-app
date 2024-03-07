'use client';
import { WeatherAppProvider } from "@/app/context/WeatherAppContext";
import { TempOptions } from "./TempOptions";
import { Card } from "./ui/card";
import { SearchCity } from "./my-components/SearchCity";

const WeatherTile = () => {
  return (
    <div className="h-fit w-full flex justify-center items-center">
      <div className="px-1 md:px-0 w-full flex justify-center">
        <WeatherAppProvider>
          <Card className="h-fit max-w-xl bg-slate-300 flex flex-col p-2 md:p-5">
            <div className="flex flex-col-reverse sm:flex-row justify-center sm:justify-between">
              <SearchCity />
              <TempOptions />
            </div>
            <div>
              WeatherApp
            </div>
          </Card>
        </WeatherAppProvider>
      </div>
    </div>
  )
}

export { WeatherTile }