// src/components/LoadingPage.js

import React, { useEffect, useState } from 'react';
import pizza from "../assets/pizza.png"

const LoadingPage = ({ setLoadingComplete }) => {


    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
      // Preload the image
      const image = new Image();
      image.src = pizza;
  
      image.onload = () => {
        // Image is loaded, show the loading page
        setIsImageLoaded(true);
      };
  
      // Simulate some loading process
      setTimeout(() => {
        setLoadingComplete(true);
      }, 2000); // Adjust the duration as needed
    }, [setLoadingComplete]);
  return (
    <div className="loading-container">
      <div className="loading-logo flex flex-col items-center justify-center space-y-3 h-screen">

      <img
        className="w-32 animate-[spin_2s_linear_infinite]"
        
        src={pizza}
        alt="Logo"
      />
      <span className='text-xs'>Stay Hungry, Almost There...</span>
      </div>
    </div>
  );
};

export default LoadingPage;