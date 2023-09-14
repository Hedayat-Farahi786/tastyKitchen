import React from "react";
import Carousel from "./Carousel";
import Menu from "./Menu";
import Services from "./Services";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Products from "./Products";

const Landing = () => {
  return (
    <>
      <Carousel />
      <Menu />
      <Services />
      {/* <div className="h-[150vh] overflow-y-scroll"> */}
      <Products dark={true} />
      {/* </div> */}
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

export default Landing;
