import { NextRequest, NextResponse } from "next/server";


export async function GET(_request: NextRequest) {
  try {

    const data = await JSON.stringify({});
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
