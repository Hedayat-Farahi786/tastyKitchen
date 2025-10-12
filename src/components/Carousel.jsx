// src/Carousel.js
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner from "../assets/banner.jpeg";
import mobileBanner from "../assets/mobile-banner.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { motion } from "framer-motion";
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
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: "cubic-bezier(0.87, 0, 0.13, 1)",
  };

  return (
    <div className="relative overflow-hidden">
      {loading ? (
        <Loader />
      ) : (
        <Slider {...settings}>
          <div className="w-full">
            <div
              className="flex h-screen min-h-screen bg-cover bg-center relative parallax-bg"
              style={{ backgroundImage: `url(${banner})` }}
            >
              {/* Gradient Overlay with Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

              {/* Animated Floating Elements */}
              <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-32 right-40 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl animate-float-delayed" />

              {/* Content Container */}
              <div className="relative h-full w-full flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-40 max-w-screen-2xl mx-auto -mt-12 sm:-mt-16 md:-mt-8">
                {/* Top Content Group */}
                <div className="flex flex-col items-start w-full max-w-4xl">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 md:mb-5 lg:mb-6"
                  >
                    <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-gold-500"></span>
                    </span>
                    <span className="text-white text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide">
                      München's #1 Restaurant
                    </span>
                  </motion.div>

                  {/* Main Title */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="title text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-2 sm:mb-3 md:mb-4 lg:mb-6 flex flex-col text-white"
                  >
                    <span className="animate-fade-in">Tasty</span>
                    <span className="borderTitle inline-block mt-1 sm:mt-1.5 md:mt-2">
                      Kitchen
                    </span>
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-medium w-full sm:w-11/12 md:w-9/12 lg:w-8/12 xl:w-7/12 mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-relaxed"
                    style={{ lineHeight: "1.8" }}
                  >
                    Köstliche Gerichte zum Greifen nah – Es ist Zeit zu essen,
                    sich zu entspannen und zu genießen!
                  </motion.p>

                  {/* Features List */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 lg:mb-8 w-full"
                  >
                    {[
                      {
                        icon: (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        ),
                        text: "Frische Zutaten",
                      },
                      {
                        icon: (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                            />
                          </svg>
                        ),
                        text: "Schnelle Lieferung",
                      },
                      {
                        icon: (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                        ),
                        text: "Top Bewertet",
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-1.5 sm:space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full ${
                          index === 0 ? "hidden sm:flex" : "flex"
                        }`}
                      >
                        <span className="text-white flex-shrink-0">
                          {feature.icon}
                        </span>
                        <span className="text-white text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-0 sm:mb-6 md:mb-8 lg:mb-12 w-full sm:w-auto"
                  >
                    <Link
                      to="/products"
                      className="group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-4.5 text-sm sm:text-base md:text-lg font-bold text-white bg-gradient-to-r from-primary-500 to-primary-700 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow shine-effect"
                    >
                      <span className="relative z-10 flex items-center space-x-2">
                        <span>Jetzt bestellen</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                    </Link>

                    <Link
                      to="#menu-section"
                      className="group inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-4.5 text-sm sm:text-base md:text-lg font-bold text-white border-2 border-white/50 backdrop-blur-sm rounded-full transition-all duration-300 hover:bg-white hover:text-gray-900 hover:scale-105"
                    >
                      <span className="flex items-center space-x-2">
                        <span>Menü ansehen</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 transform group-hover:translate-y-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </Link>
                  </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="absolute bottom-28 sm:bottom-32 md:bottom-28 left-6 sm:left-auto md:left-auto lg:right-16 xl:right-40 flex justify-center sm:justify-start md:justify-center lg:justify-end"
                >
                  <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 sm:px-8 py-3 sm:py-4 md:py-5 w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-xl">
                    {[
                      { number: "500+", label: "Glückliche Kunden" },
                      { number: "20+", label: "Gerichte" },
                      { number: "4.9", label: "★ Bewertung" },
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5 sm:mb-1">
                          {stat.number}
                        </div>
                        <div className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-white/70 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
                >
                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 0.2,
                    }}
                    className="flex flex-col items-center space-y-2 cursor-pointer"
                  >
                    <span className="text-white/50 text-[10px] sm:text-xs font-medium tracking-widest uppercase">
                      Scroll
                    </span>
                    <div className="w-5 h-9 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
                      <motion.div
                        animate={{
                          y: [0, 14, 0],
                          opacity: [0.8, 0, 0.8],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          repeatDelay: 0.2,
                        }}
                        className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/70 rounded-full"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </Slider>
      )}
    </div>
  );
};

export default Carousel;
