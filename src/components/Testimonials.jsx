import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import axios from "axios";

const Testimonial = ({ testimonial }) => {
  function formatDate(createdAt) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(createdAt).toLocaleDateString("de-DE", options);
  }

  // Generate random star rating for demo (4-5 stars)
  const rating = Math.random() > 0.5 ? 5 : 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-3 sm:p-4 md:p-6"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-200 p-6 sm:p-8 md:p-10 relative overflow-hidden card-hover">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gold-500/5 to-transparent rounded-full translate-y-12 -translate-x-12" />

        {/* Star Rating */}
        <div className="flex items-center space-x-1 mb-3 sm:mb-4 relative z-10">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                i < rating ? "text-gold-500" : "text-gray-300"
              }`}
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          ))}
          <span className="ml-2 text-xs sm:text-sm font-semibold text-gray-700">
            {rating}.0
          </span>
        </div>

        {/* Quote Content */}
        <div className="relative z-10 mb-4 sm:mb-6">
          <div className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 text-4xl sm:text-5xl md:text-6xl text-primary/20 font-serif">
            "
          </div>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed pl-4 sm:pl-6 relative">
            {testimonial.content}
          </p>
          <div className="absolute -bottom-3 sm:-bottom-4 right-0 text-4xl sm:text-5xl md:text-6xl text-primary/20 font-serif transform rotate-180">
            "
          </div>
        </div>

        {/* Author Info */}
        <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-gray-100 relative z-10">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="relative">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center font-bold text-base sm:text-lg text-white ring-4"
                style={{
                  background:
                    "linear-gradient(to bottom right, #e53935, #c62828)",
                  boxShadow: "0 0 0 4px rgba(229, 57, 53, 0.2)",
                }}
              >
                <span>{testimonial.author.split(" ")[0].charAt(0)}</span>
                <span>{testimonial.author.split(" ")[1]?.charAt(0) || ""}</span>
              </div>
              {/* Verified Badge */}
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2 border-white"
                style={{ backgroundColor: "#e53935" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-base sm:text-lg">
                {testimonial.author}
              </p>
              <p className="text-xs sm:text-sm text-primary font-medium">
                Verifizierter Kunde
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] sm:text-xs text-gray-400 font-medium">
              {formatDate(testimonial.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Fetch testimonials from your API
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/testimonials`)
      .then((response) => {
        const fetchedTestimonials = response.data;
        setTestimonials(fetchedTestimonials);
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
      });
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  return (
    <section
      id="testimonials"
      className="mx-auto max-w-5xl pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 px-4 sm:px-6 md:px-8 lg:px-16"
      ref={ref}
    >
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-10 sm:mb-12 md:mb-16"
      >
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
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
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
          <span className="text-primary font-semibold text-xs sm:text-sm">
            Bewertungen
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
          Was unsere <span className="gradient-text">Kunden</span> sagen
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
          Über 500 zufriedene Kunden vertrauen auf unsere Qualität und Service
        </p>

        {/* Rating Summary */}
        <div className="flex items-center justify-center space-x-4 sm:space-x-6 mt-6 sm:mt-8">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-primary mb-1">
              4.9
            </div>
            <div className="flex items-center space-x-1 mb-1 justify-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              500+ Bewertungen
            </div>
          </div>
        </div>
      </motion.div>

      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial._id}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: testimonials.indexOf(testimonial) * 0.2,
            }}
          >
            <Testimonial testimonial={testimonial} />
          </motion.div>
        ))}
      </Slider>
    </section>
  );
};

export default Testimonials;
