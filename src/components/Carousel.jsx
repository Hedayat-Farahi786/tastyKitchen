// src/Carousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner from "../assets/banner-1.png";
import mobileBanner from "../assets/mobile-banner.png";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Slider {...settings}>
      <div className="w-full">
        <div
          className="hidden md:flex h-[70vh] md:h-[80vh] bg-cover bg-left relative"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="h-full w-full bg-black bg-opacity-10 flex flex-col items-start px-8 pt-20 md:pt-32 md:px-44">
            {/* <p className="text-base text-white">Welcome to</p> */}
            <div className="title text-5xl md:text-8xl font-black mb-4 uppercase flex flex-col space0"><span className='text-[#E53935]'>tasty</span> <span className='text-[#ffc700]'>kitchen</span> <span className='text-white'>München</span></div>
            <a href="#" className="text-xs md:text-base mt-2 md:mt-5 text-white border-2 border-white font-semibold py-1 px-3 md:py-3 md:px-6 rounded md:rounded-lg hover:bg-white hover:text-black transition-all duration-300">
              Order Now!
            </a>
          </div>
        </div>
        <div
          className="flex md:hidden h-[70vh] md:h-[80vh] bg-cover bg-top-center relative"
          style={{ backgroundImage: `url(${mobileBanner})` }}
        >
          <div className="h-full w-full bg-black bg-opacity-10 flex flex-col items-start px-8 pt-10 md:pt-32 md:px-44">
            {/* <p className="text-base text-white">Welcome to</p> */}
            <div className="title text-5xl md:text-8xl font-black mb-4 uppercase flex flex-col space0"><span className='text-[#E53935]'>tasty</span> <span className='text-[#ffc700]'>kitchen</span> <span className='text-white'>München</span></div>
            <a href="#" className="text-xs md:text-base mt-2 md:mt-5 text-white border-2 border-white font-semibold py-1 px-3 md:py-3 md:px-6 rounded md:rounded-lg hover:bg-white hover:text-black transition-all duration-300">
              Order Now!
            </a>
          </div>
        </div>
      </div>
      {/* Add more slides here */}
    </Slider>
  );
};

export default Carousel;
