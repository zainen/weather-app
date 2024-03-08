import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const location = searchParams.get("location");
  try {
    const respondDay = await fetch(
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
    const day = await respondDay.json();
    const fiveDay = await responseFiveDay.json();
    const data = { day, fiveDay };
    console.log(JSON.stringify(data))
    // TODO delete when no longer needing dummy values
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
