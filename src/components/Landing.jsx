import React from "react";
import Carousel from "./Carousel";
import Menu from "./Menu";
import Services from "./Services";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
import Contact from "./Contact";

const Landing = () => {
  return (
    <>
      <Carousel />
      <Menu />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

export default Landing;
