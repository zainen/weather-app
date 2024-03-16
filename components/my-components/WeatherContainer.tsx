import { WeatherAppProvider } from "@/app/context/WeatherAppContext";
import { Card } from "../ui/card";
import { SearchCity } from "./SearchCity";
import { TempOptions } from "./TempOptions";
import { WeatherToday } from "./WeatherToday";
import { WeatherUpcoming } from "./WeatherUpcoming";


const WeatherContainer = () => {

  return (
    <div className="h-fit w-full flex justify-center items-center text-primary-light">
      <div className="px-1 md:px-0 w-full flex justify-center">
        <WeatherAppProvider>
          <Card className={`max-w-6xl h-fit flex-grow flex flex-col p-2 m-2 sm:p-5 sm:m-5 md:p-10 md:m-10 bg-primary-dark border-none shadow-lg`}>
            <div className="flex flex-col-reverse sm:flex-row justify-center sm:justify-between">
              <SearchCity />
              <div className="h-full flex flex-col justify-center items-end sm:pt-7 md:pt-8">
                <TempOptions />
              </div>
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