import { TemperatureUnitsEnum } from "./constants";

export const unitCoverter = (value: number, TemperatureUnitsEnum: TemperatureUnitsEnum) => {

  switch (TemperatureUnitsEnum) {
    case TemperatureUnitsEnum.C:
      return value;
    case TemperatureUnitsEnum.F:
      return Math.round((value - 32) * (5 / 9));
  }
}