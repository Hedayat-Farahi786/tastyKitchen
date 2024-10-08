// src/Carousel.js
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner from "../assets/banner.jpeg";
import mobileBanner from "../assets/mobile-banner.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "./Loader";

const Carousel = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const images = [banner];
    let imagesLoaded = 0;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === images.length) {
          setLoading(false);
        }
      };
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Slider {...settings}>
          <div className="w-full">
            <div
              className="flex h-[100vh] md:h-[100vh] bg-cover bg-center relative"
              style={{ backgroundImage: `url(${banner})` }}
            >
              <div className="h-full w-full bg-gradient-to-r from-black flex flex-col items-start px-6 pt-32 md:px-32">
                <div className="title text-8xl md:text-9xl font-black mb-4 flex flex-col text-white">
                  Tasty <br /> <span className="borderTitle">Kitchen</span>{" "}
                  <br />
                </div>
                <p className="text-base text-white font-semibold md:w-5/12">
                  Köstliche Gerichte zum Greifen nah – Es ist Zeit zu essen,
                  sich zu entspannen und zu genießen!
                </p>
                <Link
                  to="/products"
                  className="text-base md:text-base mt-10 text-white border border-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded md:rounded-lg hover:bg-white hover:text-black transition-all duration-300"
                >
                  Jetzt bestellen
                </Link>
              </div>
            </div>
          </div>
          {/* Add more slides here */}
        </Slider>
      )}
    </div>
  );
};

export default Carousel;
