import { NextRequest, NextResponse } from "next/server";
import { CustomDayForecast, DayWeather, FiveDayWeather, WeatherApiResponse } from "@/app/helpers/types";
import { DAY_UNIX, HOUR_UNIX } from "@/app/helpers/constants";

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const location = searchParams.get("location");
  try {
    // keeping both day and five day requests short cache of day and long cache for five day requests
    const responseDay = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.API_KEY}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          // cache 1 hour
          revalidate: 3600
        }
      }
    );
    const responseFiveDay = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${process.env.API_KEY}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          // cache 1 day 
          revalidate: 86400
        }
      }
    );
    // exit early 
    if (responseDay.status === 404 || responseFiveDay.status === 404) return NextResponse.json({ message: "City Not Found" }, { status: 406 });

    const day: DayWeather = await responseDay.json();
    const fiveDay: FiveDayWeather = await responseFiveDay.json();

    const timezoneInSeconds = day.timezone / 60 / 60;
    
    // convert timezone to multiple of 3 rounding for closest multiple of 3
    // convert into milliseconds for JS Date format
    const offsetMS = Math.round(timezoneInSeconds / 3) * 3 * HOUR_UNIX * 1000;

    // get UTC date string
    const now = new Date();
    const midnightUtcMS = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0)
    // convert to midnight and add off set to acceptable 3 hour timeframes with approximate offset from timezone
    let nextDayStartingUnix = Math.floor(new Date(midnightUtcMS + offsetMS + (DAY_UNIX * 1000 )).getTime() / 1000);

    const nextDaysHighAndLow: CustomDayForecast[] = [];
    // starting -1 so else block does not work until next day found

    const futureTimes = fiveDay.list.filter(item => item.dt > day.dt);

    let pointer = -1;
    for (const item of futureTimes) {
      const {temp_max, temp_min} = item.main;
      if (item.dt === nextDayStartingUnix) {
        pointer++;
        // add 1 day
        nextDayStartingUnix = nextDayStartingUnix + DAY_UNIX;

        nextDaysHighAndLow.push({ temp_max, temp_min, dt: item.dt, weather_id: item.weather[0].id});
      } else if (pointer > 0) {

        const current = nextDaysHighAndLow[pointer];
          
        if (current.temp_max < temp_max) { 
          current.temp_max = temp_max;

        }
        if (current.temp_min > temp_min) current.temp_min = temp_min;
      }
    }

    // TODO maybe feature
    // const nextTwelveHours = futureTimes.slice(0, 4);

    const data: WeatherApiResponse = {
      day,
      nextDays: nextDaysHighAndLow
    };
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
