// src/Carousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner from "../assets/banner.jpeg";
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
          className="flex h-[90vh] md:h-[90vh] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="h-full w-full bg-gradient-to-r from-black flex flex-col items-start px-8 pt-32 md:px-32">
            <div className="title text-8xl md:text-9xl font-black mb-4 flex flex-col text-white">Tasty <br /> <span className='borderTitle'>Kitchen</span> <br /></div>
            <p className="text-base text-white font-semibold">Delicious dishes at your fingertips – it's time to eat, relax, and enjoy!</p>
            <a href="#" className="text-base md:text-base mt-5 text-white bg-[#E53935] font-semibold py-2 px-4 md:py-3 md:px-6 rounded md:rounded-lg hover:bg-white hover:text-black transition-all duration-300">
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
