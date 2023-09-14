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

  return (
    <div className="w-full m-0">
      {/* {distance && <p>Distance: {distance} km</p>} */}
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

        {/* Marker for the restaurant */}
        <Marker position={[destination.lat, destination.lng]}>
          <Popup>Tasty Kitchen</Popup>
        </Marker>

        {/* Marker for the user's location */}
        <Marker position={[origin.lat, origin.lng]}>
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
