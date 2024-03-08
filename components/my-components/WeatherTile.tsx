'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { WeatherAppProvider } from "@/app/context/WeatherAppContext";
import { TempOptions } from "./TempOptions";
import { Card } from "../ui/card";
import { SearchCity } from "./SearchCity";
import { iconSelector, tempuraturesIconSelector } from "@/app/helpers/iconSelector";
import { checkDaytime, humanReadableTime, visibilityDistanceToPercent } from "@/app/helpers/converterFunctions";
import { faDroplet, faEye, faGauge, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { dummyWeatherFull } from '@/app/helpers/dummy-to-delete';


const WeatherTile = () => {
  const { day, fiveDay} = dummyWeatherFull
  
  return (
    <div className="h-fit w-full flex justify-center items-center">
      <div className="px-1 md:px-0 w-full flex justify-center">
        <WeatherAppProvider>
          <Card className="max-w-7xl h-fit flex-grow bg-slate-300 flex flex-col p-2 sm:p-5 md:p-10">
            <div className="flex flex-col-reverse sm:flex-row justify-center sm:justify-between">
              <SearchCity />
              <TempOptions />
            </div>
            <div className="w-full flex flex-col py-8 justify-center items-center">
              <h4 className="w-fit text-center text-6xl pt-4 md:pt-8 lg:pt-10">{day.name}, {day.sys.country}</h4>
              <div className="sm:flex w-full h-full text-2xl">
                <div className="sm:flex-1 w-full flex flex-col items-center justify-center sm:pr-2 pb-10 sm:pb-0">
                  <div className='w-full flex flex-col items-center'>
                    <div className="flex-1 w-full h-full py-4 flex justify-center items-center">
                      {/* select icon based on openweather conditions code and before or after sunset */}
                      <FontAwesomeIcon icon={iconSelector(day.weather[0].id, checkDaytime(day.sys.sunset))} className="pr-8 h-20 w-20 sm:h-20 sm:w-20 md:h-20 md:w-20"/>
                      <p className="w-fit h-fit text-2xl">{day.weather[0].description}</p>
                    </div>
                    <p className='flex-2 text-9xl font-bold'>{Math.round(day.main.temp)}°</p>
                  </div>
                  <div className='w-full flex h-1/2 justify-center items-center'>
                    {day.rain && day.rain['1h'] !== undefined && 
                      <Card className='flex flex-col justify-center items-center h-fit py-2 sm:py-4 md:py-8 bg-gray-400 bg-opacity-50 opacity-90 w-1/2'>
                        <p className='text-center'>1h fall</p>
                        <div className='flex justify-center items-center'>
                          <FontAwesomeIcon icon={faDroplet} className='h-10 w-10'/>
                          <p>~{Math.round(day.rain['1h'])}</p>
                        </div>
                      </Card>
                    }
                    {day.rain && day.rain['3h'] !== undefined && 
                      <Card className='flex flex-col justify-center items-center h-fit py-2 sm:py-4 md:py-8 bg-gray-400 bg-opacity-50 opacity-90 w-1/2'>
                        <p className='text-center'>3h fall</p>
                        <div className='flex justify-center items-center'>
                          <FontAwesomeIcon icon={faDroplet} className='h-10 w-10'/>
                          <p>~{day.rain['3h']}</p>
                        </div>
                      </Card>
                    }
                  </div>
                </div>
                <div className="sm:flex-1 flex flex-col w-full sm:pl-2">
                  <h6 className='text-left sm:pt-8 md:pt-16 lg:pt-20 text-3xl'>Details</h6>
                  <div className='w-full grid grid-cols-2'>
                    <Card className='flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 bg-gray-400 bg-opacity-50 opacity-90'>
                      <p>feels like</p>
                      <FontAwesomeIcon icon={tempuraturesIconSelector(day.main.feels_like)} className='h-10 w-10'/>
                      {Math.round(day.main.feels_like)}°
                    </Card>
                    <Card className='flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 bg-gray-400 bg-opacity-50 opacity-90'>
                      <p>Pressure</p>
                      <FontAwesomeIcon icon={faGauge} className='h-10 w-10'/>
                      {day.main.pressure}
                    </Card>
                    <Card className='flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 bg-gray-400 bg-opacity-50 opacity-90'>
                      <p>Low</p>
                      <FontAwesomeIcon icon={tempuraturesIconSelector(day.main.temp_min)} className='h-10 w-10'/>
                      {Math.round(day.main.temp_min)}°
                    </Card>
                    <Card className='flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 bg-gray-400 bg-opacity-50 opacity-90'>
                      <p>High</p>
                      <FontAwesomeIcon icon={tempuraturesIconSelector(day.main.temp_max)} className='h-10 w-10'/>
                      {Math.round(day.main.temp_max)}°
                    </Card>
                    <Card className='flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 bg-gray-400 bg-opacity-50 opacity-90'>
                      <p>Humidity</p>
                      <FontAwesomeIcon icon={faDroplet} className='h-10 w-10'/>
                      {day.main.humidity}
                    </Card>
                    <Card className='flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 bg-gray-400 bg-opacity-50 opacity-90'>
                      <p>Visibility</p>
                      <FontAwesomeIcon icon={faEye} className='h-10 w-10'/>
                      {visibilityDistanceToPercent(day.visibility)}
                    </Card>
                    <Card className='flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 bg-gray-400 bg-opacity-50 opacity-90'>
                      <p>Sunrise</p>
                      <FontAwesomeIcon icon={faSun} className='h-10 w-10'/>
                      {humanReadableTime(day.sys.sunrise)}
                    </Card>
                    <Card className='flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 bg-gray-400 bg-opacity-50 opacity-90'>
                      <p>Sunset</p>
                      <FontAwesomeIcon icon={faMoon} className='h-10 w-10'/>
                      {humanReadableTime(day.sys.sunset)}
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </WeatherAppProvider>
      </div>
    </div>
  )
}

export { WeatherTile }