"use client";
import { checkDaytime, humanReadableTime, unitCoverter, visibilityDistanceToPercent } from "@/app/helpers/converterFunctions";
import { iconSelector, tempuraturesIconSelector } from "@/app/helpers/iconSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "../ui/card";
import { faDroplet, faEye, faGauge, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useWeatherAppContext } from "@/app/context/WeatherAppContext";


const WeatherToday = () => {
  const { weather, temperatureUnits } = useWeatherAppContext();
  if (!weather) return 
  return (
    <div className="w-full flex flex-col ">
              <div className="sm:flex w-full h-full text-2xl">
                <div className="sm:flex-1 w-full flex flex-col items-center justify-center sm:pr-2 pb-10 sm:pb-0">
                  <div className='w-full flex flex-col items-center'>
                    <h4 className="w-fit text-center text-4xl pb-10 pt-10 sm:pt-0">{weather?.day.name}, {weather?.day.sys.country}</h4>

                    <p className='text-3xl pb-4'>{new Date(weather?.day.dt * 1000).toLocaleDateString("en-US", {weekday: "long"})}</p>
                    <div className='flex items-center'>

                      <p className='flex-2 text-4xl sm:text-7xl pr-4'>{Math.round((unitCoverter(weather?.day.main.temp, temperatureUnits)))}{temperatureUnits}</p>
                      <FontAwesomeIcon icon={iconSelector(weather?.day.weather[0].id, checkDaytime(weather?.day.sys.sunset))} className="h-10 w-10 sm:h-20 sm:w-20"/>
                    </div>

                    <div className="flex-1 w-full h-full py-4 flex justify-center items-center">
                      {/* select icon based on openweather conditions code and before or after sunset */}
                      <p className="w-fit h-fit text-2xl">{weather?.day.weather[0].description}</p>
                    </div>
                    <div className='flex'>
                      <p className='pr-2'>L:</p>
                      <p className='pr-4'>{Math.round(unitCoverter(weather?.day.main.temp_min, temperatureUnits))}{temperatureUnits}</p>
                      <p className='pr-2'>H:</p>
                      <p>{Math.round(unitCoverter(weather?.day.main.temp_max, temperatureUnits))}{temperatureUnits}</p>
                    </div>
                  </div>
                  {weather?.day.rain && <div className='w-full flex h-1/2 justify-center items-center'>
                    {weather?.day.rain && weather?.day.rain['1h'] !== undefined && 
                      <Card className='flex flex-col justify-center items-center h-fit py-2 sm:py-4 md:py-8 bg-gray-400 bg-opacity-50 opacity-90 w-1/2'>
                        <p className='text-center'>1h fall</p>
                        <div className='flex justify-center items-center'>
                          <FontAwesomeIcon icon={faDroplet} className='h-5 w-5'/>
                          <p>~{Math.round(weather?.day.rain['1h'])}</p>
                        </div>
                      </Card>
                    }
                    {weather?.day.rain && weather?.day.rain['3h'] !== undefined && 
                      <Card className='flex flex-col justify-center items-center h-fit py-2 sm:py-4 md:py-8 bg-gray-400 bg-opacity-50 opacity-90 w-1/2'>
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
                  <h6 className='text-left sm:pt-8 md:pt-16 lg:pt-20 text-3xl'>Details</h6>
                  <div className='w-full grid grid-cols-2'>
                    <Card className='flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 bg-gray-400 bg-opacity-50 opacity-90'>
                      <p>Feels like</p>
                      <div className='flex items-center'>
                        <FontAwesomeIcon icon={tempuraturesIconSelector(weather?.day.main.feels_like)} className='h-5 w-5 pr-4'/>
                        <p>{Math.round(unitCoverter(weather?.day.main.feels_like, temperatureUnits))}{temperatureUnits}</p>
                      </div>
                    </Card>
                    <Card className='flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 bg-gray-400 bg-opacity-50 opacity-90'>
                      <p>Humidity</p>
                      <div className='flex items-center'>
                        <FontAwesomeIcon icon={faDroplet} className='h-5 w-5 pr-4'/>
                        <p>{weather?.day.main.humidity}</p>
                      </div>
                    </Card>
                    <Card className='flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 bg-gray-400 bg-opacity-50 opacity-90'>
                      <p>Sunrise</p>
                      <div className='flex items-center'>
                        <FontAwesomeIcon icon={faSun} className='h-5 w-5 pr-4'/>
                        <p>{humanReadableTime(weather?.day.sys.sunrise)}</p>
                      </div>
                    </Card>
                    <Card className='flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 bg-gray-400 bg-opacity-50 opacity-90'>
                      <p>Sunset</p>
                      <div className='flex items-center'>
                        <FontAwesomeIcon icon={faMoon} className='h-5 w-5 pr-4'/>
                        <p>{humanReadableTime(weather?.day.sys.sunset)}</p>
                      </div>
                    </Card>
                    <Card className='flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 bg-gray-400 bg-opacity-50 opacity-90'>
                      <p>Pressure</p>
                      <div className='flex items-center'>
                        <FontAwesomeIcon icon={faGauge} className='h-5 w-5 pr-4'/>
                        <p>{weather?.day.main.pressure}</p>
                      </div>
                    </Card>
                    <Card className='flex flex-col justify-center items-center py-2 sm:py-4 md:py-8 bg-gray-400 bg-opacity-50 opacity-90'>
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