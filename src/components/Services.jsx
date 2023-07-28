// src/components/Services.js
import React from "react";
import { motion } from "framer-motion";

import servicesImage from "../assets/services.png";
import Slider from "react-slick";
import { Link } from "react-scroll";

const Services = () => {
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
      <div className="w-full mt-10">
        <div
          className="flex h-[60vh] md:h-[80vh] bg-cover bg-right md:bg-left relative"
          style={{ backgroundImage: `url(${servicesImage})` }}
        >
          <div className="h-full w-full bg-gradient-to-r from-black flex flex-col items-start justify-center space-y-4 px-6 md:px-32">
            <div className="text-4xl md:text-6xl font-bold mb-4 flex flex-col text-white">
            Tägliche Essens
            </div>
            <p className="text-sm md:text-base text-white font-normal md:w-5/12">
            Köstliche tägliche Mahlzeiten geliefert an Büros, Krankenhäuser und darüber hinaus! Genießen Sie müheloses Essen mit uns, jeden einzelnen Tag.
            </p>
            <div>
                <div className="mt-5 md:mt-10">
            <Link
              to="/products"
              className="mt-10 text-xs cursor-pointer md:text-base text-white bg-transparent border border-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              Kontaktiere uns!
            </Link>
                </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add more slides here */}
    </Slider>
  );
};

export default Services;
