import React from 'react';
import MapWithDistance from './MapWithDistance';

const Final = () => {
  // Mock restaurant location
  const restaurantLocation = { lat: 48.217800, lng: 11.525440 }; // Replace LATITUDE and LONGITUDE with the actual coordinates of your restaurant.
  const restaurant = [48.217800, 11.525440]; // Replace LATITUDE and LONGITUDE with the actual coordinates of your restaurant.

  // User's location (you can obtain this using the Geolocation API as shown in the previous response)
  const userLocation = { lat: 48.223590, lng: 11.555860 }; // Replace USER_LATITUDE and USER_LONGITUDE with the actual coordinates of the user's location.
  const user = [48.133220, 11.531990]; // Replace USER_LATITUDE and USER_LONGITUDE with the actual coordinates of the user's location.

  return (
    <div className="pt-[8vh] w-full">
      {/* Map showing the distance between the restaurant and user's location */}
      <MapWithDistance customerLocation={user} restaurantLocation={restaurant} />

      {/* Rest of your Final page content */}
      {/* ... */}
      <div className='w-full py-10 flex items-center justify-center space-x-3 text-xs md:text-lg font-medium'>
        <p><span className='text-primary'>Vielen Dank!</span> Ihre Bestellung wurde übermittelt!</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 md:w-8 h-5 md:h-8 text-[#017a39]">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

      </div>
    </div>
  );
};

export default Final;
