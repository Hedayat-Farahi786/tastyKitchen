// src/components/Map.js

import { divIcon } from 'leaflet';
import React, { useRef, useEffect, useState } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';

import car from "../assets/car.png"
import mark from "../assets/mark.png"

const MapWithDistance = ({ restaurantLocation, customerLocation }) => {
  const mapRef = useRef(null);


  const [carPosition, setCarPosition] = useState(restaurantLocation);

  useEffect(() => {
    let progress = 0;

    const moveCar = () => {
      if (progress < 1) {
        progress += 0.01; // Adjust the step size as needed
        const lat = restaurantLocation[0] + progress * (customerLocation[0] - restaurantLocation[0]);
        const lng = restaurantLocation[1] + progress * (customerLocation[1] - restaurantLocation[1]);
        setCarPosition([lat, lng]);
      }
    };

    const interval = setInterval(moveCar, 1000); // Update car's position every second

    return () => clearInterval(interval);
  }, [restaurantLocation, customerLocation]);


  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      // Fit the map to show both restaurant and customer locations
      map.leafletElement.fitBounds([restaurantLocation, customerLocation]);
    }
  }, [restaurantLocation, customerLocation]);

  const carIconMarkup = renderToStaticMarkup(<img src={car} className='relative h-12 w-12' />);
  const carMarkerIcon = divIcon({
    html: carIconMarkup,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon bg-transparent border-none'
  });
  const markIconMarkup = renderToStaticMarkup(<img src={mark} className='relative h-12 w-12' />);
  const markMarkerIcon = divIcon({
    html:markIconMarkup,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon bg-transparent border-none'
  });

  return (
    <LeafletMap
      ref={mapRef}
      center={[(restaurantLocation[0] + customerLocation[0]) / 2, (restaurantLocation[1] + customerLocation[1]) / 2]}
      zoom={11}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker icon={carMarkerIcon} position={carPosition}>
        <Popup>Restaurant</Popup>
      </Marker>
      <Marker icon={markMarkerIcon} position={customerLocation}>
        <Popup>Customer</Popup>
      </Marker>
      {/* Add car animation logic here */}
    </LeafletMap>
  );
};

export default MapWithDistance;
