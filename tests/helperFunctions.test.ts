import { TemperatureUnitsEnum } from "@/app/helpers/constants";
import { checkDaytime, humanReadableTime, secondsToMillisec, unitConverter, visibilityDistanceToPercent } from "@/app/helpers/converterFunctions";

describe("unitConverter", () => {
  it("should convert Celsius to Fahrenheit", () => {
    const result = unitConverter(32, TemperatureUnitsEnum.F);
    expect(result).toBe(90);
  });

  it("should convert Fahrenheit to Celsius", () => {
    const result = unitConverter(32, TemperatureUnitsEnum.C);
    expect(result).toBe(32);
  });
});

describe("checkDaytime", () => {
  test("should return true when sunset is a boolean and true", () => {
    const sunset = true;
    const result = checkDaytime(sunset);
    expect(result).toBe(true);
  });

  test("should return false when sunset is a boolean and false", () => {
    const sunset = false;
    const result = checkDaytime(sunset);
    expect(result).toBe(false);
  });

  test("should return true when sunset is a number and current time is less than the sunset time", () => {
    const sunset = Date.now() + (1000 * 60 * 60 * 4); // force time 4 hours later in MS
    const result = checkDaytime(sunset);
    expect(result).toBe(true);
  });

  test("should return false when sunset is a number and current time is greater than the sunset time", () => {
    const sunset = 1634083200; // 2022-01-01 12:00:00
    const result = checkDaytime(sunset);
    expect(result).toBe(false);
  });
});

describe("Seconds to Millisec", () => {
  it("should convert seconds to millisec", () => {
    const result = secondsToMillisec(1);
    expect(result).toBe(1000);
  });
});

describe("humanReadableTime", () => {
  it("should return a string in the format of HH:mm", () => {
    const time = 12345;  // TIME IN UNIX
    const result = humanReadableTime(time);
    expect(result).toEqual("19:25");
  });
});

describe("visibilityDistanceToPercent 10000 is max", () => {
  it("should convert distance to a percentage", () => {
    const distance = 10000;
    const result = visibilityDistanceToPercent(distance);
    expect(result).toEqual("100%");
  });
  it("should convert distance to a percentage", () => {
    const distance = 1000;
    const result = visibilityDistanceToPercent(distance);
    expect(result).toEqual("10%");
  });
  it("should convert distance to a percentage", () => {
    const distance = 7900;
    const result = visibilityDistanceToPercent(distance);
    expect(result).toEqual("79%");
  });
});