"use client";

import { useState, useEffect } from "react";
import { GoogleMap, Polyline, Marker } from "@react-google-maps/api";

const MAP_CONTAINER_STYLE = {
  width: "100%",
  height: "80vh",
  borderRadius: "15px 0px 0px 15px",
};

const DEFAULT_CENTER = { lat: 31.5497, lng: 74.3436 };
const MAP_OPTIONS = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "roadmap",
};

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDestination] = useState<{ lat: number; lng: number } | null>(null);
  const [route, setRoute] = useState<{ lat: number; lng: number }[]>([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => console.error("Error fetching location:", error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newDestination = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      setDestination(newDestination);
      await fetchRoute(newDestination);
    }
  };

  const fetchRoute = async (destination: { lat: number; lng: number }) => {
    if (!currentLocation) return;
  
    const response = await fetch(
      `/api/directions?origin=${currentLocation.lat},${currentLocation.lng}&destination=${destination.lat},${destination.lng}`
    );
    const data = await response.json();

    console.log("Google Directions API Response:", data);
  
    if (data.routes?.length > 0) {
      const polylinePoints = decodePolyline(data.routes[0].overview_polyline.points);
      setRoute(polylinePoints);
    }
  };
  

  const decodePolyline = (encoded: string): { lat: number; lng: number }[] => {
    let index = 0, lat = 0, lng = 0, coordinates = [];

    while (index < encoded.length) {
      let shift = 0, result = 0, byte;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      lat += (result & 1 ? ~(result >> 1) : result >> 1);

      shift = 0, result = 0;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      lng += (result & 1 ? ~(result >> 1) : result >> 1);

      coordinates.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }

    return coordinates;
  };

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={currentLocation || DEFAULT_CENTER}
        options={MAP_OPTIONS}
        zoom={14}
        onClick={handleMapClick}
      >
        {currentLocation && <Marker position={currentLocation} label="You" />}

        {destination && <Marker position={destination} label="Dest" />}

        {route.length > 0 && (
  <Polyline
    path={route}
    options={{
      strokeColor: "#0000FF",
      strokeOpacity: 1,
      strokeWeight: 4,
    }}
  />
)}

      </GoogleMap>
    </div>
  );
};

export { Map };
