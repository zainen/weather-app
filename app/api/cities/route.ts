import { NextRequest, NextResponse } from "next/server";


export async function GET(_request: NextRequest) {
  console.log("HERE")
  try {

    const data = await JSON.stringify({});
    console.log(data)
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
