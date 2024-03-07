'use client';
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { CurrentWeatherResponse } from "@/app/helpers/types";
import { useWeatherAppContext } from "@/app/context/WeatherAppContext";

const SearchCity = () => {
  const {setWeather} = useWeatherAppContext();

  const [searchQuery, setSearchQuery] = useState("");
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
      
      const response: CurrentWeatherResponse = await data.json()
      setWeather(response)
    } catch (e) {
      // TODO handle error
      console.log(e);
    }
  }
  return (
    <div className="w-full flex flex-col justify-center sm:flex-row sm:justify-between">
      <div className="w-full sm:mr-4">
        <Label htmlFor="search-bar" className="pl-1">Location</Label>
        <Input placeholder="City, State, Country" className="mr-4" onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)}/>
      </div>
      <div className="flex items-end">
        <Button className="bg-cyan-700 w-full sm:w-fit" onClick={handleSubmit}>Search</Button>
      </div>
    </div>
  )
};

export { SearchCity };