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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <div className="bg-white rounded-lg shadow-md p-8 flex flex-col space-y-2">
        <div className="flex space-x-2">
          <i className="fas fa-quote-left mr-2 text-primary text-lg md:text-xl"></i>
          <p className="text-gray-600 text-sm md:text-base mb-4">
            {testimonial.content}
          </p>
          <i className="fas fa-quote-right mr-2 text-primary text-lg md:text-xl place-self-end"></i>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full shadow-lg text-sm flex items-center justify-center font-semibold bg-primary text-white">
              <p>{testimonial.author.split(" ")[0].charAt(0)}</p>
              <p>{testimonial.author.split(" ")[1].charAt(0)}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                {testimonial.author}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            {formatDate(testimonial.createdAt)}
          </p>
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
      .get("https://tastykitchen-backend.vercel.app/testimonials") // Change the URL to your API endpoint
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
    threshold: 0.2, // Adjust this threshold value as needed
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
    autoplaySpeed: 5000, // Change this value to adjust the autoplay speed in milliseconds
    pauseOnHover: true,
  };

  return (
    <section
      id="testimonials"
      className="mx-auto max-w-md md:max-w-5xl pt-10 mt-10 mb-2lo0"
      ref={ref}
    >
      <h2 className="text-primary text-3xl md:text-4xl font-bold text-center mb-5 md:mb-16">
        Kundenbewertungen
      </h2>
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial._id}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: testimonials.indexOf(testimonial) * 0.2,
            }} // Add a small delay for each testimonial
          >
            <Testimonial testimonial={testimonial} />
          </motion.div>
        ))}
      </Slider>
    </section>
  );
};

export default Testimonials;
