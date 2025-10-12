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
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
  };

  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-7 h-7 text-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
          />
        </svg>
      ),
      title: "Büro Catering",
      description: "Perfekt für Meetings & Events",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-7 h-7 text-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      ),
      title: "Krankenhäuser",
      description: "Gesunde Mahlzeiten täglich",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-7 h-7 text-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
          />
        </svg>
      ),
      title: "Express Lieferung",
      description: "Schnell & zuverlässig",
    },
  ];

  return (
    <div
      className="w-full py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white"
      style={{ overflow: "visible" }}
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20"
        style={{ overflow: "visible" }}
      >
        <div className="services-slider" style={{ overflow: "visible" }}>
          <Slider {...settings}>
            <div className="w-full" style={{ overflow: "visible" }}>
              <div
                className="grid md:grid-cols-2 gap-12 items-center"
                style={{ overflow: "visible" }}
              >
                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="order-2 md:order-1"
                >
                  {/* Badge */}
                  <div className="inline-flex items-center space-x-2 bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-4 h-4 sm:w-5 sm:h-5 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-primary font-semibold text-xs sm:text-sm">
                      Unsere Services
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Tägliche <span className="gradient-text">Essens</span>
                    <br />
                    Lieferung
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
                    Köstliche tägliche Mahlzeiten geliefert an Büros,
                    Krankenhäuser und darüber hinaus! Genießen Sie müheloses
                    Essen mit uns, jeden einzelnen Tag.
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3 sm:space-x-4 bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 card-hover"
                      >
                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 bg-gradient-to-r from-primary/5 to-gold-500/5 p-4 sm:p-6 rounded-2xl">
                    {[
                      { number: "100+", label: "Unternehmen" },
                      { number: "1000+", label: "Mahlzeiten/Tag" },
                      { number: "5★", label: "Service" },
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1">
                          {stat.number}
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-600 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    to="contact-section"
                    smooth={true}
                    duration={500}
                    className="group inline-flex items-center space-x-2 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                    style={{ backgroundColor: "#e53935" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#d32f2f")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#e53935")
                    }
                  >
                    <span>Kontaktiere uns!</span>
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
                  </Link>
                </motion.div>

                {/* Right Image */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="order-1 md:order-2 relative overflow-visible"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={servicesImage}
                      alt="Daily Meals Service"
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay Badge */}
                    <div
                      className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg"
                      style={{ zIndex: 20 }}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                          Jetzt verfügbar
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Card */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -bottom-8 sm:-bottom-6 -right-4 sm:-right-6 bg-white p-3 sm:p-4 rounded-2xl shadow-2xl w-[calc(100%-2rem)] sm:w-auto sm:max-w-xs z-[9999]"
                    style={{ zIndex: 9999 }}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      {/* User Icons */}
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                            style={{ backgroundColor: "#e53935" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="white"
                              className="w-4 h-4 sm:w-5 sm:h-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        ))}
                      </div>
                      {/* Order Count */}
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500 font-medium">
                          Heute bestellt
                        </p>
                        <p
                          className="text-base sm:text-lg font-bold"
                          style={{ color: "#e53935" }}
                        >
                          20+ Mahlzeiten
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Services;
