import { WeatherAppProvider } from "@/app/context/WeatherAppContext";
import { TempOptions } from "./TempOptions";
import { Card } from "../ui/card";
import { SearchCity } from "./SearchCity";
import { WeatherToday } from './WeatherToday';
import { WeatherUpcoming } from './WeatherUpcoming';


const WeatherContainer = () => {
  
  return (
    <div className="h-fit w-full flex justify-center items-center">
      <div className="px-1 md:px-0 w-full flex justify-center">
        <WeatherAppProvider>
          <Card className="max-w-6xl h-fit flex-grow bg-slate-300 flex flex-col p-2 m-2 sm:p-5 sm:m-5 md:p-10 md:m-10">
            <div className="flex flex-col-reverse sm:flex-row justify-center sm:justify-between">
              <SearchCity />
              <TempOptions />
            </div>
            <WeatherToday />
            <WeatherUpcoming />            
          </Card>
        </WeatherAppProvider>
      </div>
    </div>
  )
}

export { WeatherContainer }