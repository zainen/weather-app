import { TemperatureUnitsEnum } from "./constants";

export const unitCoverter = (value: number, units: TemperatureUnitsEnum) => {

  switch (units) {
    case TemperatureUnitsEnum.C:
      return value;
    case TemperatureUnitsEnum.F:
      return Math.round((value - 32) * (5 / 9));
  }
}

export const checkDaytime = (sunset: number) => {
  const time = Math.round(new Date().getTime() / 1000)
  return time < sunset;
}


export const humanReadableTime = (time: number): string => {
  const hour = new Date(time * 1000).getHours().toString();
  const min = new Date(time * 1000).getMinutes().toString();
  const checkMinute = `0${min}`.slice(min.length - 1);
  return `${hour}:${checkMinute}`;
} 

export const visibilityDistanceToPercent = (distance: number): string => {
  return `${distance / 100}%`
}