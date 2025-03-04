"use client";

import { useState, useEffect } from "react";
import { GoogleMap, Marker, Polygon, Polyline } from "@react-google-maps/api";

const MAP_CONTAINER_STYLE = {
  width: "100%",
  height: "80vh",
  borderRadius: "15px 0px 0px 15px",
};

const DEFAULT_CENTER = {
  lat: 31.5497, 
  lng: 74.3436,
};

const MAP_OPTIONS = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "roadmap",
};

const LOCATIONS = [
  { id: 1, lat: 31.5497, lng: 74.3436 },
  { id: 2, lat: 33.6938, lng: 73.0652 }, 
];

const POLYGON_COORDINATES = [...LOCATIONS, LOCATIONS[0]]; 
const PATH_COORDINATES = [...LOCATIONS];

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        (error) => console.error("Error fetching location:", error)
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={currentLocation || DEFAULT_CENTER}
        options={MAP_OPTIONS}
        zoom={14}
      >

        {currentLocation && <Marker position={currentLocation} />}


        {LOCATIONS.map(({ id, lat, lng }) => (
          <Marker key={id} position={{ lat, lng }} />
        ))}

        <Polygon
          paths={POLYGON_COORDINATES}
          options={{
            fillColor: "#FF0000",
            fillOpacity: 0.4,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
        />

        <Polyline
          path={PATH_COORDINATES}
          options={{
            strokeColor: "#0000FF",
            strokeOpacity: 1,
            strokeWeight: 3,
          }}
        />
      </GoogleMap>
    </div>
  );
};

export { Map };
