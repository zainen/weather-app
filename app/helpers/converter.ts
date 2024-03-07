import { Units } from "./constants";

export const unitCoverter = (value: number, units: Units) => {

  switch (units) {
    case Units.C:
      return value;
    case Units.F:
      return Math.round((value - 32) * (5 / 9));
  }
}