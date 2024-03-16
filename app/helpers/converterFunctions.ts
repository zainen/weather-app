import { TemperatureUnitsEnum } from "./constants";

export const unitConverter = (valueCelsius: number, units: TemperatureUnitsEnum) => {

  switch (units) {
    case TemperatureUnitsEnum.C:
      return valueCelsius;
    case TemperatureUnitsEnum.F:
      return Math.round(valueCelsius * 1.8 + 32 );
  }
}

export const checkDaytime = (sunset: number | boolean) => {
  // allow force to day or night TRUE === Day FALSE == night
  if (typeof sunset === "boolean") return sunset;
  const time = Math.round(new Date().getTime() / 1000);
  return time <= sunset;
};

// since Openweather time is in seconds
export const secondsToMillisec = (seconds: number) =>{
  return seconds * 1000;
};

export const humanReadableTime = (time: number): string => {
  const mili = secondsToMillisec(time)
  const hour = new Date(mili).getHours().toString();
  const min = new Date(mili).getMinutes().toString();
  const checkMinute = `0${min}`.slice(min.length - 1);
  return `${hour}:${checkMinute}`;
};

export const visibilityDistanceToPercent = (distance: number): string => {
  return `${distance / 100}%`;
};