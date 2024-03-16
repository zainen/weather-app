"use client";
import { checkDaytime, humanReadableTime, unitConverter, visibilityDistanceToPercent } from "@/app/helpers/converterFunctions";
import { iconSelector, tempuraturesIconSelector } from "@/app/helpers/iconSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "../ui/card";
import { faDroplet, faEye, faGauge, faMoon, faRotateRight, faSun } from '@fortawesome/free-solid-svg-icons';
import { useWeatherAppContext } from "@/app/context/WeatherAppContext";
import { Button } from "../ui/button";
import { useState } from "react";
import { WeatherApiResponse } from "@/app/helpers/types";


const WeatherToday = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { weather, temperatureUnits, currentWeatherQuery, setWeather, setError } = useWeatherAppContext();
  if (!weather) return 


  const handleSubmit = async () => {
    setIsLoading(true);
    if (isLoading) return;
    try {
      const data = await fetch("/api/weather?" + currentWeatherQuery, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        next: {
          // revalidate after 10 mins
          revalidate: 600,
          tags: [currentWeatherQuery]
        }
      })

      // simple self defined error code in 
      if (data.status === 406) throw "City Not Found";

      const response: WeatherApiResponse = await data.json();
      setWeather(response)
    } catch (e: unknown) {
      setError(e as string);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="w-full flex flex-col ">
      <div className="sm:flex w-full h-full text-2xl">
        <div className="sm:flex-1 w-full flex flex-col items-center justify-center sm:pr-2 pb-10 sm:pb-0">
          <div className='w-full flex flex-col items-center'>
            <h4 className="w-fit text-center text-4xl pb-10 pt-10 sm:pt-0">{weather?.day.name}, {weather?.day.sys.country}</h4>

            <p className='text-3xl pb-4'>{new Date(weather?.day.dt * 1000).toLocaleDateString("en-US", {weekday: "long"})}</p>
            <div className='flex items-center'>

              <p className='flex-2 text-4xl sm:text-7xl pr-4'>{Math.round((unitConverter(weather?.day.main.temp, temperatureUnits)))}{temperatureUnits}</p>
              <FontAwesomeIcon icon={iconSelector(weather?.day.weather[0].id, checkDaytime(weather?.day.sys.sunset))} className="h-10 w-10 sm:h-20 sm:w-20"/>
            </div>

            <div className="flex-1 w-full h-full py-4 flex justify-center items-center">
              {/* select icon based on openweather conditions code and before or after sunset */}
              <p className="w-fit h-fit text-2xl">{weather?.day.weather[0].description}</p>
            </div>
            <div className='flex'>
              <p className='pr-2'>L:</p>
              <p className='pr-4'>{Math.round(unitConverter(weather?.day.main.temp_min, temperatureUnits))}{temperatureUnits}</p>
              <p className='pr-2'>H:</p>
              <p>{Math.round(unitConverter(weather?.day.main.temp_max, temperatureUnits))}{temperatureUnits}</p>
            </div>
          </div>
          {weather?.day.rain && <div className='w-full flex h-1/2 justify-center items-end gap-1'>
            {weather?.day.rain && weather?.day.rain['1h'] !== undefined && 
              <Card className={`flex flex-col justify-center items-center h-fit py-2 sm:py-4 md:py-8 backdrop-blur-sm w-1/2 bg-light-blue bg-opacity-10 border-none shadow-lg`}>
                <p className='text-center'>1h fall</p>
                <div className='flex justify-center items-center'>
                  <FontAwesomeIcon icon={faDroplet} className='h-5 w-5'/>
                  <p>~{Math.round(weather?.day.rain['1h'])}</p>
                </div>
              </Card>
            }
            {weather?.day.rain && weather?.day.rain['3h'] !== undefined && 
              <Card className={`flex flex-col justify-center items-center h-fit py-2 sm:py-4 md:py-8 backdrop-blur-sm w-1/2 bg-light-blue bg-opacity-10 border-none shadow-lg`}>
                <p className='text-center'>3h fall</p>
                <div className='flex justify-center items-center'>
                  <FontAwesomeIcon icon={faDroplet} className='h-5 w-5'/>
                  <p>~{weather?.day.rain['3h']}</p>
                </div>
              </Card>
            }
          </div>}
        </div>
        <div className="sm:flex-1 flex flex-col w-full sm:pl-2">
          <div className="w-full flex justify-end">
            <Button className="w-fit bg-primary-light hover:bg-light-darker" onClick={handleSubmit}>
              <FontAwesomeIcon icon={faRotateRight} className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary-dark"/>
            </Button>
          </div>
          <h6 className='text-left  text-3xl'>Details</h6>
          <div className='w-full grid grid-cols-2 gap-1'>
            <Card className={`flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 backdrop-blur-2xl bg-light-blue bg-opacity-10 border-none shadow-md`}>
              <p>Feels like</p>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={tempuraturesIconSelector(weather?.day.main.feels_like)} className='h-5 w-5 pr-4'/>
                <p>{Math.round(unitConverter(weather?.day.main.feels_like, temperatureUnits))}{temperatureUnits}</p>
              </div>
            </Card>
            <Card className={`flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 backdrop-blur-2xl bg-light-blue bg-opacity-10 border-none shadow-md`}>
              <p>Humidity</p>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faDroplet} className='h-5 w-5 pr-4'/>
                <p>{weather?.day.main.humidity} %</p>
              </div>
            </Card>
            <Card className={`flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 backdrop-blur-2xl bg-light-blue bg-opacity-10 border-none shadow-md`}>
              <p>Sunrise</p>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faSun} className='h-5 w-5 pr-4'/>
                <p>{humanReadableTime(weather?.day.sys.sunrise)}</p>
              </div>
            </Card>
            <Card className={`flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 backdrop-blur-2xl bg-light-blue bg-opacity-10 border-none shadow-md`}>
              <p>Sunset</p>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faMoon} className='h-5 w-5 pr-4'/>
                <p>{humanReadableTime(weather?.day.sys.sunset)}</p>
              </div>
            </Card>
            <Card className={`flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 backdrop-blur-2xl bg-light-blue bg-opacity-10 border-none shadow-md`}>
              <p>Pressure</p>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faGauge} className='h-5 w-5 pr-4'/>
                <p>{weather?.day.main.pressure} hPa</p>
              </div>
            </Card>
            <Card className={`flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 backdrop-blur-2xl bg-light-blue bg-opacity-10 border-none shadow-md`}>
              <p>Visibility</p>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faEye} className='h-5 w-5 pr-4'/>
                <p>{visibilityDistanceToPercent(weather?.day.visibility)}</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


export { WeatherToday }