type RainTimeWindow = "1h" | "3h";

interface WeatherObject {
  id: number;
  main: string;
  description: string;
  icon: string;
}

type RainOptions = Partial<Record<RainTimeWindow, number>>;

interface TemperatureMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level?: number;
  grnd_level?: number;
  humidity: number;
  temp_kf?: number;
};

export interface DayWeather {
  coord: { lon: number; lat: number };
  weather: WeatherObject[];
  base: string;
  main: TemperatureMain;
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  rain?: RainOptions;
}

interface FiveDayListItem {
  dt: number;
  main: TemperatureMain;
  weather: WeatherObject[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: RainOptions;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface FiveDayWeather {
  cod: string;
  message: number;
  cnt: number;
  list: FiveDayListItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface CurrentWeatherResponse {
  day: DayWeather;
  fiveDay: FiveDayWeather;
}
