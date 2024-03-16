'use client';
import { ChangeEvent, useState, KeyboardEvent, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { WeatherApiResponse, formattedSuggestions } from "@/app/helpers/types";
import { useWeatherAppContext } from "@/app/context/WeatherAppContext";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"


// WARNING open weather does not accept Vancouver, Washington, US. do not use state in request BC works but not others 
const SearchCity = () => {
  const {setWeather, setCurrentWeatherQuery, error, setError, isLoading, setIsLoading} = useWeatherAppContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [autocompleteCities, setAutocompleteCities] = useState<formattedSuggestions>([])
  const [debounced] = useDebounce<string>(searchQuery, 1000);

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
          cache: "force-cache",
          next: {
            tags: [`${searchParams}`]
          }
        })

        if (suggestedLocationsResponse.status !== 200) {
          setError("could not find any matching cities")
          return 
        }
        const suggestedLocations = await suggestedLocationsResponse.json();
        setAutocompleteCities(suggestedLocations);
      }
    }
    fetchData();
  }, [debounced, setError]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    setSearchQuery(e.target.value);
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      return handleSubmit();
    }
  }
  const handleSubmit = async () => {
    setIsLoading(true);
    if (isLoading) return;
    // actual feature... Ḩeşār-e Sefīd, IR is not searchable but is returned with undefined 
    // oddly enough this returns Ḩeşār-e Sefīd, IR
    // if (!searchQuery) {
    //   setError("Please search for a city")
    //   return;
    // };
    const removeWhitespace = searchQuery.replace(/\s/g, "");
    const [city, state, country] = removeWhitespace.split(",");
    const searchParams = new URLSearchParams({ city, state, country });
    try {
      const data = await fetch(`/api/weather?` + searchParams, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        next: {
          // revalidate after 10 mins
          revalidate: 600
        }
      })

      // simple self defined error code in 
      if (data.status === 406) throw "City Not Found";

      const response: WeatherApiResponse = await data.json();
      setWeather(response)
      setCurrentWeatherQuery(`${searchParams}`)
    } catch (e: unknown) {
      setError(e as string);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="w-full">
      <div className="w-full flex flex-col justify-center sm:flex-row sm:justify-between">
        <div className="w-full sm:mr-4">
          <Label htmlFor="search-bar" className="sm:text-xl md:text-2xl pl-1">Location</Label>
          <Input  placeholder="City, State, Country" onFocus={() => setError('')} className={`text-lg text-primary-dark bg-primary-light shadow-lg mr-4 mb-4 sm:mb-0 ${error ? "border-warn border-2" : ""}`} list='places' onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)} pattern={autocompleteCities.join("|")} autoComplete="off"/>
          <datalist id='places' className="">
            {autocompleteCities.map((city, i) => (
              <option key={i} onClick={() => setSearchQuery(city)} value={city}></option>
              ))}
          </datalist>
        </div>
        <div className="flex items-end">
          <Button className="bg-cyan-600 hover:bg-cyan-700 shadow-lg w-full sm:w-fit" disabled={isLoading} onClick={handleSubmit}>Search</Button>
        </div>
      </div>
      {error ? 
          <Alert variant="destructive" className="p-3">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <div className="flex pl-2">

              <AlertTitle className="pr-4 mb-0">Error:</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
            </div>
          </Alert>
          :
          <div className="h-11"></div>
        }
    </div>
  )
};

export { SearchCity };