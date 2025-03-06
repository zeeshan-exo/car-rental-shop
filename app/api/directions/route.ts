// /app/api/directions/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");

  if (!origin || !destination) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;
   
    const url = "https://routes.googleapis.com/directions/v2:computeRoutes";


    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": googleApiKey!,
        "X-Goog-FieldMask": "routes.polyline"
      },
      body: JSON.stringify({
        origin: { location: { latLng: { latitude: Number(origin.split(",")[0]), longitude: Number(origin.split(",")[1]) } } },
        destination: { location: { latLng: { latitude: Number(destination.split(",")[0]), longitude: Number(destination.split(",")[1]) } } },
        travelMode: "DRIVE",
      })
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch directions" }, { status: 500 });
  }
}
