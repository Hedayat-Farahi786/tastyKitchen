import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import {
  NavLink,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, toggleCart } from "../store/cart";
import noProducts from "../assets/productNoResult.png";
import { Tooltip } from "flowbite-react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0); // Add this state
  const [isHomeRoute, setIsHomeRoute] = useState(true); // Initialize as true since the Navbar is displayed on the Startseite route initially

  const location = useLocation();

  const dispatch = useDispatch();

  const handleMenuToggle = () => {
    setShowMenu((prev) => !prev);
  };

  const handleCartToggle = () => {
    dispatch(toggleCart());
  };

  const getCartTotal = (cart) => {
    let total = 0;

    cart.forEach((item) => {
      total += item.price * item.quantity;
    });

    return total.toFixed(2);
  };

  const getCartLength = (cart) => {
    let total = 0;

    cart.forEach((item) => {
      total += item.quantity;
    });

    return total;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsHomeRoute(location.pathname === "/");
  }, [location]);

  const cart = useSelector((state) => state.cart.cart);
  const showCart = useSelector((state) => state.cart.showCart);

  return (
    <nav
      className={`w-full h-10vh px-6 md:px-20 shadow-md fixed top-0 z-50 ${
        !isHomeRoute || scrollPosition > 20 ? "bg-white" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center py-4">
        {/* Left side - Logo */}
        <div className="flex justify-start">
          <Link to="/">
            <img className="h-10 w-auto sm:h-10" src={logo} alt="Logo" />
          </Link>
        </div>

        {/* Middle - Links */}
        <div
          className={`hidden md:flex space-x-10 text-md font-semibold ${
            !isHomeRoute || scrollPosition > 20 ? "" : "text-white"
          }`}
        >
          <Link to="/" className="hover:text-gray-400">
            Startseite
          </Link>
          <Link to="/products" className="hover:text-gray-400">
            Produkte
          </Link>
          {/* <ScrollLink
            to="testimonials-section"
            smooth={true}
            duration={500}
            offset={-200}
          >
            <Link to="#">Testimonials</Link>
          </ScrollLink> */}
          <ScrollLink
            to="contact-section"
            smooth={true}
            duration={500}
            offset={0}
          >
            <Link to="/contact">Kontakt</Link>
          </ScrollLink>
        </div>

        {/* Right side - User Avatar and Shopping Cart */}
        <div
          className={`hidden md:flex items-center space-x-4 ${
            !isHomeRoute || scrollPosition > 20 ? "" : "text-white"
          }`}
        >
          <div onClick={handleCartToggle} className="relative inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <span className="absolute -top-2 -right-1 bg-[#E53935] text-white rounded-full px-1 py-.5 text-xs font-semibold">
              {getCartLength(cart)}
            </span>
          </div>

          {/* USER AVATAR */}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            clas="w-8 h-8 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>*/}
        </div>

        {/* Mobile menu icon */}
        <div
          className={`md:hidden flex items-center space-x-4 ${
            !isHomeRoute || scrollPosition > 20 ? "" : "text-white"
          }`}
        >
          <div onClick={handleCartToggle} className="relative inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <span className="absolute -top-2 -right-1 bg-[#E53935] text-white rounded-full px-1 py-.5 text-xs font-semibold">
              {getCartLength(cart)}
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg
              onClick={handleMenuToggle}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMenu && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white shadow-xl p-5 space-y-1 absolute top-0 right-0 w-4/6 z-50 h-screen"
        >
          <div className="w-full flex items-center justify-end">
            <svg
              onClick={handleMenuToggle}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="flex flex-col space-y-2 pt-4">
            <NavLink
              exact
              to="/"
              onClick={handleMenuToggle}
              activeClassName="text-white bg-[#e53935]"
              className="block rounded px-4 py-1"
            >
              Startseite
            </NavLink>
            <div className="w-full h-[1px] bg-gray-200"></div>
            <NavLink
              to="/products"
              activeClassName="text-white bg-[#e53935]"
              className="block rounded px-4 py-1"
              onClick={handleMenuToggle}
            >
              Produkte
            </NavLink>
            {/* <div className="w-full h-[1px] bg-gray-200"></div>

            <ScrollLink
              to="testimonials-section"
              smooth={true}
              duration={500}
              offset={0}
            >
              <NavLink
                to="#"
                activeClassName="text-white bg-[#e53935]"
                className="block rounded px-4 py-1"
                onClick={handleMenuToggle}
              >
                Testimonials
              </NavLink>
            </ScrollLink> */}
            <div className="w-full h-[1px] bg-gray-200"></div>

            <ScrollLink
              to="contact-section"
              smooth={true}
              duration={500}
              offset={0}
            >
              <NavLink
                to="/contact"
                activeClassName="text-white bg-[#e53935]"
                className="block rounded px-4 py-1"
                onClick={handleMenuToggle}
              >
                Kontakt
              </NavLink>
            </ScrollLink>
          </div>
        </motion.div>
      )}

      {/* Cart Menu */}
      {showCart && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white shadow-xl p-5 space-y-1 fixed top-0 right-0 w-4/6 md:w-3/12 z-50 h-screen"
        >
          <div className="w-full flex items-center justify-between">
            <p className="font-semibold text-xl">Warenkorb</p>

            <svg
              onClick={handleCartToggle}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          {cart.length > 0 ? (
            <div>
              <div className="pt-10 flex flex-col space-y-2">
                {cart.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between space-x-2 w-full py-2">
                      <div className="flex space-x-2">
                        <img
                          className="w-12 h-12 object-cover rounded-md"
                          src={item.product.image}
                          alt={item.product.name}
                        />
                        <div className="flex flex-col space-y-1">
                          <p className="text-xs md:text-sm font-semibold">
                            {item.product.name}{" "}
                            <span className="font-normal text-gray-500 ml-1">
                              x{item.quantity}
                            </span>
                          </p>
                          <p className="text-xs text-gray-600">
                            {item.price.toFixed(2)}€
                          </p>
                          {item.extras.length > 0 && (
                            <Tooltip
                              content={item.extras
                                .map((extra) => extra.name)
                                .join(", ")}
                              style="light"
                            >
                              <p className="text-[8px] cursor-pointer md:text-[10px] text-primary underline">
                                Mit extras
                              </p>
                            </Tooltip>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <p className="font-semibold text-sm">
                          {(item.price * item.quantity).toFixed(2)}€
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4 text-red-600 cursor-pointer"
                          onClick={() =>
                            dispatch(
                              removeFromCart({
                                productId: item.product.id,
                                extras: item.extras,
                              })
                            )
                          }
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="h-[1px] w-full bg-gray-300 mt-3"></div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4">
                <p className="uppercase font-medium">Gesamt</p>
                <p className="text-xl text-primary font-semibold">
                  {getCartTotal(cart)}€
                </p>
              </div>

              <Link to="/checkout">
                <div
                  onClick={handleCartToggle}
                  className="w-full flex items-center justify-center space-x-2 bg-[#e53935] hover:bg-[#ca211f] cursor-pointer transition-all duration-200 linear text-white py-2 rounded-md font-medium mt-10"
                >
                  <p>Weiter</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          ) : (
            <div className="w-full h-4/6 flex flex-col items-center justify-center">
              <img src={noProducts} alt="No Items" className="w-40" />
              <p className="font-semibold">Fill your shopping cart</p>
              <p className="text-xs text-gray-500 text-center my-2">
                {" "}
                Add some delicious dishes from the menu and order your food.{" "}
              </p>
              <Link
                onClick={handleCartToggle}
                to="/products"
                className="mt-5 border px-4 py-1 rounded border-[#E53935] text-primary transition-all duration-200 linear cursor-pointer hover:bg-[#E53935] hover:text-white"
              >
                Add Items
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
