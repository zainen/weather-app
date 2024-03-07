import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const location = searchParams.get("location");
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&TemperatureUnitsEnum=metric&appid=${process.env.API_KEY}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 600
        }
      }
    );
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
