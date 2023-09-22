import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import { getDistance } from "geolib";

// Import your custom marker icon image
import customMarkerIcon from "../assets/mark.png";

const MapWithDistance = ({ origin, destination }) => {
  const [distance, setDistance] = useState(null);
  const [route, setRoute] = useState([]);

  useEffect(() => {
    // Calculate distance between origin and destination
    const calculatedDistance = getDistance(origin, destination) / 1000; // Divide by 1000 to convert meters to kilometers
    setDistance(calculatedDistance.toFixed(2)); // Set distance with 2 decimal places

    // Create the route polyline
    const routeCoordinates = [origin, destination];
    setRoute(routeCoordinates);
  }, [origin, destination]);

  // Create a custom Icon object for the markers
  const customIcon = L.icon({
    iconUrl: customMarkerIcon, // Path to your custom marker icon image
    iconSize: [32, 32], // Adjust the size as needed
    iconAnchor: [16, 32], // Adjust the anchor point if necessary
  });

  return (
    <div className="w-full m-0">
      <MapContainer
        center={[
          (origin.lat + destination.lat) / 2,
          (origin.lng + destination.lng) / 2,
        ]}
        zoom={13}
        style={{ width: "100%", height: "300px" }}
        className="z-40"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker for the restaurant with custom icon */}
        <Marker position={[destination.lat, destination.lng]} icon={customIcon}>
          <Popup>Tasty Kitchen</Popup>
        </Marker>

        {/* Marker for the user's location with custom icon */}
        <Marker position={[origin.lat, origin.lng]} icon={customIcon}>
          <Popup>Deine Adresse</Popup>
        </Marker>

        {/* Polyline representing the route */}
        <Polyline
          positions={route}
          color="#e53935"
          pathOptions={{ weight: 4, dashArray: "10 10" }}
        />
      </MapContainer>
    </div>
  );
};

export default MapWithDistance;
