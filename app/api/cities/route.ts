import { SuggestedLocationName, formattedSuggestions } from "@/app/helpers/types";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const city = searchParams.get("city");
  const state = searchParams.get("state") ?? '';
  const country = searchParams.get("country") ?? '';

  let query = `${city}`;
  if (state) query += `,${state}`;
  if (country) query += `,${country}`;
  try {
    const suggestionsResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${3}&appid=${process.env.API_KEY}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          // cache 1 day
          revalidate: 86400
        }
      });
    if (suggestionsResponse.status !==  200) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }
    const suggestionsJSON: SuggestedLocationName[] = await suggestionsResponse.json();
    const formattedSuggestions: formattedSuggestions = suggestionsJSON.map(item => {
      const { name: city, state, country } = item;
      let joined = city;
      if (state) joined += `, ${state}`;
      if (country) joined += `, ${country}`;
      return joined;
    });
    return NextResponse.json(formattedSuggestions, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}