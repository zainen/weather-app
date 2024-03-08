import { faSun, faMoon, faCloud, faCloudSun, faCloudMoon, faCloudSunRain, faCloudRain, faCloudMoonRain, faCloudShowersHeavy, faCloudBolt, faSnowflake, IconDefinition, faSmog, faTemperature2, faTemperature3, faTemperature0, faTemperature1  } from "@fortawesome/free-solid-svg-icons"

type TimeOfDay = "day" | "night"

export const iconSelector = (openWeatherConditionCode: number, isDaytime: boolean): IconDefinition => {
  // weather-conditions code from OpenWeather https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
  // 2xx
  if (openWeatherConditionCode < 300) {
    return faCloudBolt;
  // 3xx
  } else if (openWeatherConditionCode < 500) {
    return faCloudRain;
  // 5xx
  } else if (openWeatherConditionCode < 600) {
    if (openWeatherConditionCode < 502) { 
      return isDaytime  ? faCloudSunRain : faCloudMoonRain;
    } else if (openWeatherConditionCode < 511) {
      return faCloudShowersHeavy;
    } else if (openWeatherConditionCode === 511) {
      return faSnowflake;
    }
    return faCloudShowersHeavy;
  // 6xx
  } else if (openWeatherConditionCode < 700) {
    return faSnowflake;
  // 7xx
  } else if (openWeatherConditionCode < 800) {
    // TODO
    return faSmog;
  // 8xx
  } else if (openWeatherConditionCode === 800) {
    return isDaytime ? faSun : faMoon;
  } else {
    if (openWeatherConditionCode === 801) {
      return isDaytime ? faCloudSun : faCloudMoon;
    }
  }
  return faCloud;
}

export const tempuraturesIconSelector = (temp: number): IconDefinition => {
  if (temp < 0) {
    return faTemperature0;
  } else if (temp < 10) {
    return faTemperature1;
  } else if (temp < 20) {
    return faTemperature2;
  }
  return faTemperature3
}