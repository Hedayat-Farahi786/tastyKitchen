import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

const testimonials = [
    {
      id: 1,
      name: "Friedrich Müller",
      message:
        "Die Pizzen im Tasty Kitchen sind absolut köstlich! Der Käse ist perfekt geschmolzen, und der Teig ist genau richtig knusprig. Die Beläge sind frisch und geschmackvoll, so dass jeder Bissen ein Genuss ist. Das freundliche Personal und das gemütliche Ambiente machen es zu einem perfekten Ort für ein zwangloses Essen mit Freunden oder Familie.",
    },
    {
      id: 2,
      name: "Anna Schneider",
      message:
        "Tasty Kitchen ist meine Anlaufstelle für die saftigsten und leckersten Burger in der Stadt! Jeder Bissen ist voller Geschmack, und die Burger sind immer perfekt zubereitet. Die Vielfalt an Belägen und Saucen ermöglicht es mir, meinen Burger genau nach meinem Geschmack anzupassen. Die Portionen sind großzügig, so dass ich jedes Mal mit einem zufriedenen Bauch gehe.",
    },
    {
      id: 3,
      name: "Alex Becker",
      message:
        "Tasty Kitchen enttäuscht nie mit ihren köstlichen Pastagerichten! Die Pasta ist al dente gekocht, und die Saucen sind reichhaltig und geschmackvoll. Egal, ob es sich um eine klassische Spaghetti Bolognese oder eine cremige Alfredo handelt, jedes Gericht wird mit Liebe zum Detail zubereitet. Die warme und einladende Atmosphäre des Restaurants trägt zum Gesamterlebnis beim Essen bei.",
    },
    {
      id: 4,
      name: "Sophie Wagner",
      message:
        "Die Kombination aus Pizza, Burgern und Pasta im Tasty Kitchen ist ein Paradies für Feinschmecker! Die vielfältige Speisekarte bietet für jeden etwas, und die Qualität jedes Gerichts ist außergewöhnlich. Von den käseüberladenen Pizzen über saftige Burger bis hin zu geschmackvoller Pasta ist jeder Bissen ein kulinarisches Erlebnis. Das Engagement des Restaurants für Geschmack und Service hebt es von anderen ab.",
    },
    {
      id: 5,
      name: "Paula Maier",
      message:
        "Was für ein Juwel! Die Fusion von Geschmacksrichtungen im Tasty Kitchen ist unvergleichlich. Die einzigartige Kombination aus Pizza, Burgern und Pasta mag unkonventionell erscheinen, aber sie funktioniert wunderbar. Die Köche hier sind wahre kulinarische Künstler, und jedes Gericht ist ein Meisterwerk. Dieser Ort ist ein Muss für jeden Food-Enthusiasten, der etwas Außergewöhnliches erleben möchte.",
    },
  ];
  

const Testimonial = ({ testimonial }) => {
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
            {testimonial.message}
          </p>
          <i className="fas fa-quote-right mr-2 text-primary text-lg md:text-xl place-self-end"></i>
        </div>
        <div className="flex items-center space-x-2">

          <div className="w-10 h-10 rounded-full shadow-lg text-sm flex items-center justify-center font-semibold bg-primary text-white">
            <p>{testimonial.name.split(" ")[0].charAt(0)}</p>
            <p>{testimonial.name.split(" ")[1].charAt(0)}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">{testimonial.name}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {

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
      className="mx-auto max-w-md md:max-w-5xl pt-10 mt-10 mb-32"
      ref={ref}
    >
      <h2 className="text-primary text-3xl md:text-4xl font-bold text-center mb-5 md:mb-16">
      Kundenbewertungen
      </h2>
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: testimonial.id * 0.2 }} // Add a small delay for each testimonial
          >
            <Testimonial testimonial={testimonial} />
          </motion.div>
        ))}
      </Slider>
    </section>
  );
};

export default Testimonials;