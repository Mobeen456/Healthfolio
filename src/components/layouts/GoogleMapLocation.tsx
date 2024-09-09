"use client"
import { useState, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

interface LatLng {
  lat: number;
  lng: number;
}

interface Place {
  geometry?: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
}

const onPlaceSelect = (place: Place) => setSearchLngLat({
    lat: place.geometry?.location?.lat(),
    lng: place.geometry?.location?.lng(),
  });
const GoogleMapLocation = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [searchLngLat, setSearchLngLat] = useState<LatLng | null>(null);
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Load script for Google Maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading....</div>;

  // Static lat and lng (replace with actual values)
  const center: LatLng = { lat: 0, lng: 0 }; // Replace 0 with YOUR_LATITUDE, YOUR_LONGITUDE

  // Handle place change on search
  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    
    if (place && place.geometry && place.geometry.location) {
  setSearchLngLat({
    lat: place.geometry.location.lat(),
    lng: place.geometry.location.lng(),
  });
} else {
      // Handle the case where place or place.geometry is undefined
      console.error("Place or geometry is undefined");
    }
  };

  // Get current location
  const handleGetLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedPlace(null);
          setSearchLngLat(null);
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  // On map load
  const onMapLoad = (map: google.maps.Map) => {
    const controlDiv = document.createElement("div");
    const controlUI = document.createElement("div");
    controlUI.innerHTML = "Get Location";
    controlUI.className =
      "bg-white text-black border-2 border-gray-300 rounded-lg shadow-md cursor-pointer mb-6 text-center w-full py-2";
    controlUI.addEventListener("click", handleGetLocationClick);
    controlDiv.appendChild(controlUI);

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      {/* Search component */}
      <Autocomplete
        onLoad={(autocomplete) => {
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={handlePlaceChanged}
        options={{ fields: ["address_components", "geometry", "name"] }}
      >
        <input
          type="text"
          placeholder="Search for a location"
          className="p-2 border border-gray-300 rounded-md shadow-sm w-3/4"
        />
      </Autocomplete>

      {/* Map component */}
      <GoogleMap
        zoom={currentLocation || selectedPlace ? 18 : 12}
        center={currentLocation || searchLngLat || center}
        mapContainerClassName="map"
        mapContainerStyle={{ width: "80%", height: "600px" }}
        onLoad={onMapLoad}
      >
        {selectedPlace && searchLngLat && <Marker position={searchLngLat} />}
        {currentLocation && <Marker position={currentLocation} />}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapLocation;
function setSearchLngLat(arg0: { lat: number | undefined; lng: number | undefined; }) {
    throw new Error("Function not implemented.");
}

