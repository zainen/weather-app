'use client';
import { ChangeEvent, useState, KeyboardEvent, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { WeatherApiResponse, formattedSuggestions } from "@/app/helpers/types";
import { useWeatherAppContext } from "@/app/context/WeatherAppContext";


// TODO sanitize input DOUBLE CHECK ',' how openweather uses them
const SearchCity = () => {
  const {setWeather} = useWeatherAppContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [autocompleteCities, setAutocompleteCities] = useState<formattedSuggestions>([])
  const [debounced] = useDebounce(searchQuery, 1000);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (debounced.length > 0) {
        const removeWhitespace = debounced.replace(/\s/g, "");
        const [city, state, country] = removeWhitespace.split(",");
        const searchParams = new URLSearchParams({city});

        if (state) {
          searchParams.append("state", state);
        }
        if (country) {
          searchParams.append("country", country);
        }
        
        const suggestedLocationsResponse = await fetch("/api/cities?" + searchParams, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
          cache: "no-cache"
        })
        const suggestedLocations = await suggestedLocationsResponse.json();
        setAutocompleteCities(suggestedLocations);
      }
    }
    fetchData();
  }, [debounced]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    setSearchQuery(e.target.value);
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      return handleSubmit();
    }
  }
  const handleSubmit = async () => {
    try {
      const data = await fetch('/api/weather?' + new URLSearchParams({location: searchQuery}), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        next: {
          // revalidate after 10 mins
          revalidate: 600
        }
      })
      // TODO improve error handling

      if (data.status === 406) throw "City Not Found";

      const response: WeatherApiResponse = await data.json();
      setWeather(response)
    } catch (e: unknown) {
      setError(e as string);
    }
  }
  return (
    <div className="w-full flex flex-col justify-center sm:flex-row sm:justify-between">
      <div className="w-full sm:mr-4">
        <Label htmlFor="search-bar" className="pl-1">Location</Label>
        <Input  placeholder="City, State, Country" onFocus={() => setError('')} className={`mr-4 mb-4 sm:mb-0 ${error ? "border-red-600" : ""}`} list='places' onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)} pattern={autocompleteCities.join("|")} autoComplete="off"/>
        <datalist id='places' className="">
            {autocompleteCities.map((city, i) => (
              <option key={i} className="" onClick={() => setSearchQuery(city)} value={city}></option>
            ))}
          </datalist>
      </div>
      <div className="flex items-end">
        <Button className="bg-cyan-700 w-full sm:w-fit" onClick={handleSubmit}>Search</Button>
      </div>
    </div>
  )
};

export { SearchCity };