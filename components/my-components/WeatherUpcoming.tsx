"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "../ui/card";
import { iconSelector } from "@/app/helpers/iconSelector";
import { checkDaytime, unitCoverter } from "@/app/helpers/converterFunctions";
import { useWeatherAppContext } from "@/app/context/WeatherAppContext";

const WeatherUpcoming = () => {
  const { weather, temperatureUnits } = useWeatherAppContext();
  if (!weather) return
  console.log("upcoming", weather.nextDays)
  return (
    <>
      <h4>NEXT {weather.nextDays.length} DAYS</h4>
      <div className={`w-full flex`}> 
        {weather.nextDays.map((day, i) => 
          <Card key={`day_${i}`} className='flex-1 gap-1 md:gp-2 flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 bg-gray-400 bg-opacity-50 opacity-90'>
            <div className='w-full flex flex-col items-center'>
              {/* to local should be fine for client components */}
              <FontAwesomeIcon icon={iconSelector(day.weather_id, checkDaytime(true))} className="h-5 w-5 sm:h-10 sm:w-10 pb-4 pt-4 md:pt-0"/>
                <p className='text-lg font-semibold pb-4'>{new Date(day.dt * 1000).toLocaleDateString("en-US", {weekday: "short"})}</p>
                <div className='w-full flex flex-col justify-center items-center'>

                  <div className='flex pb-2 md:w-1/2 justify-evenly'>
                    <p className='pr-2 md:pr-0'>H:</p>
                    <p>{Math.round(unitCoverter(day.temp_max, temperatureUnits))}{temperatureUnits}</p>
                  </div>
                  <div className='flex md:w-1/2 justify-evenly'>
                    <p className='pr-2 md:pr-0'>L:</p>
                    <p>{Math.round(unitCoverter(day.temp_min, temperatureUnits))}{temperatureUnits}</p>
                  </div>
                </div>
            </div>
          </Card>
        )}
      </div>
    </>
  )
}

export { WeatherUpcoming }