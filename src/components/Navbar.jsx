import { useEffect, useState } from "react";
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
    <>
      <nav
        className={`w-full h-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 fixed top-0 z-40 transition-all duration-500 ease-in-out ${
          !isHomeRoute || scrollPosition > 20
            ? "bg-white/98 backdrop-blur-md shadow-sm border-b border-gray-200"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex justify-between items-center py-2 md:py-3 lg:py-4 max-w-screen-2xl mx-auto">
          {/* Left side - Logo */}
          <div className="flex justify-start">
            <Link
              to="/"
              className="transition-transform hover:scale-105 duration-200"
            >
              <img
                className="h-8 w-auto sm:h-9 md:h-10 lg:h-11"
                src={logo}
                alt="Logo"
              />
            </Link>
          </div>

          {/* Middle - Links */}
          <div
            className={`hidden md:flex items-center space-x-6 lg:space-x-12 xl:space-x-16 text-sm lg:text-base font-bold transition-colors duration-300 ${
              !isHomeRoute || scrollPosition > 20
                ? "text-gray-700"
                : "text-white"
            }`}
            style={
              !isHomeRoute || scrollPosition > 20
                ? {}
                : { textShadow: "0 2px 8px rgba(0,0,0,0.8)" }
            }
          >
            <Link
              to="/"
              className="relative py-2 px-3 transition-all duration-200 hover:text-primary group"
            >
              Startseite
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              to="/products"
              className="relative py-2 px-3 transition-all duration-200 hover:text-primary group"
            >
              Menü
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <ScrollLink
              to="contact-section"
              smooth={true}
              duration={500}
              offset={0}
              onClick={() => {
                if (location.pathname !== "/") {
                  window.location.href = "/#contact-section";
                }
              }}
              className="relative py-2 px-3 transition-all duration-200 hover:text-primary cursor-pointer group"
            >
              Kontakt
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </ScrollLink>
          </div>

          {/* Right side - Shopping Cart & CTA */}
          <div
            className={`hidden md:flex items-center space-x-4 lg:space-x-6 transition-colors duration-300 ${
              !isHomeRoute || scrollPosition > 20
                ? "text-gray-700"
                : "text-white"
            }`}
            style={
              !isHomeRoute || scrollPosition > 20
                ? {}
                : { filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.8))" }
            }
          >
            {/* Order Now Button - Only show when scrolled or not on home */}
            {(!isHomeRoute || scrollPosition > 20) && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/products"
                  className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-primary to-red-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Jetzt bestellen</span>
                </Link>
              </motion.div>
            )}

            <button
              onClick={handleCartToggle}
              className="relative inline-flex items-center justify-center p-2.5 lg:p-3 rounded-xl hover:bg-primary/10 transition-all duration-200 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="w-6 h-6 lg:w-7 lg:h-7 group-hover:text-primary transition-colors duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              {getCartLength(cart) > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gradient-to-br from-primary to-red-600 text-white rounded-full w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center text-xs font-bold shadow-md"
                >
                  {getCartLength(cart)}
                </motion.span>
              )}
            </button>
          </div>

          {/* Mobile menu icon and cart */}
          <div
            className={`md:hidden flex items-center space-x-3 transition-colors duration-300 ${
              !isHomeRoute || scrollPosition > 20
                ? "text-gray-700"
                : "text-white"
            }`}
            style={
              !isHomeRoute || scrollPosition > 20
                ? {}
                : { filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.8))" }
            }
          >
            <button
              onClick={handleCartToggle}
              className="relative inline-flex items-center justify-center p-1.5 rounded-lg hover:bg-primary/10 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              {getCartLength(cart) > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shadow-lg">
                  {getCartLength(cart)}
                </span>
              )}
            </button>
            <button
              onClick={handleMenuToggle}
              className="p-1.5 rounded-lg hover:bg-primary/10 transition-all duration-200"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
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
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleMenuToggle}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998] md:hidden"
          />

          {/* Menu */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-80 sm:w-96 z-[9999] h-screen bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl md:hidden overflow-y-auto"
          >
            {/* Header - Brand Section */}
            <div className="relative bg-gradient-to-br from-primary to-primary/90 p-6 pb-8">
              {/* Decorative pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-24 h-24 border-2 border-white rounded-full" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white rounded-full" />
              </div>

              <div className="relative flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-2 rounded-xl">
                    <img className="h-10 w-auto" src={logo} alt="Logo" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">
                      Tasty Kitchen
                    </p>
                    <p className="text-white/90 text-xs">Frisch & Lecker</p>
                  </div>
                </div>
                <button
                  onClick={handleMenuToggle}
                  className="p-2.5 rounded-xl bg-white hover:bg-gray-100 backdrop-blur-sm transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Cart Summary Badge */}
              {getCartLength(cart) > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="mt-4 bg-white/20 backdrop-blur-md rounded-2xl p-3 border border-white/30"
                >
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-white/20 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">
                        {getCartLength(cart)} Artikel im Warenkorb
                      </span>
                    </div>
                    <span className="text-sm font-bold">
                      {getCartTotal(cart)} €
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Navigation Section */}
            <div className="px-4 py-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">
                Navigation
              </p>
              <div className="space-y-2">
                <NavLink
                  exact
                  to="/"
                  onClick={handleMenuToggle}
                  activeClassName="bg-primary text-white shadow-lg shadow-primary/20"
                  className="flex items-center justify-between px-6 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-300 group"
                >
                  <div className="flex-1">
                    <p className="text-lg font-bold text-gray-800 group-hover:text-gray-900 group-[.bg-primary]:text-white">
                      Startseite
                    </p>
                    <p className="text-xs text-gray-500 group-hover:text-gray-600 group-[.bg-primary]:text-white/90 mt-0.5">
                      Zur Hauptseite
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-400 group-hover:text-primary group-[.bg-primary]:text-white/70 transition-colors"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </NavLink>

                <NavLink
                  to="/products"
                  activeClassName="bg-primary text-white shadow-lg shadow-primary/20"
                  className="flex items-center justify-between px-6 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-300 group"
                  onClick={handleMenuToggle}
                >
                  <div className="flex-1">
                    <p className="text-lg font-bold text-gray-800 group-hover:text-gray-900 group-[.bg-primary]:text-white">
                      Menü
                    </p>
                    <p className="text-xs text-gray-500 group-hover:text-gray-600 group-[.bg-primary]:text-white/90 mt-0.5">
                      Unsere Speisekarte
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-400 group-hover:text-primary group-[.bg-primary]:text-white/70 transition-colors"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </NavLink>

                <ScrollLink
                  to="contact-section"
                  smooth={true}
                  duration={500}
                  offset={0}
                  onClick={() => {
                    handleMenuToggle();
                    if (location.pathname !== "/") {
                      window.location.href = "/#contact-section";
                    }
                  }}
                >
                  <div className="flex items-center justify-between px-6 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-300 group cursor-pointer">
                    <div className="flex-1">
                      <p className="text-lg font-bold text-gray-800 group-hover:text-gray-900">
                        Kontakt
                      </p>
                      <p className="text-xs text-gray-500 group-hover:text-gray-600 mt-0.5">
                        Schreiben Sie uns
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </div>
                </ScrollLink>
              </div>

              {/* Quick Info Cards */}
              <div className="mt-8 px-4 space-y-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
                  Informationen
                </p>

                {/* Opening Hours */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-4 border border-primary/10 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-white rounded-xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 font-semibold mb-0.5 uppercase tracking-wide">
                        Öffnungszeiten
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        Mo-So: 11:00 - 23:00
                      </p>
                    </div>
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-4 border border-primary/10 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-white rounded-xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 font-semibold mb-0.5 uppercase tracking-wide">
                        Lieferzeit
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        30-45 Minuten
                      </p>
                    </div>
                  </div>
                </div>

                {/* Restaurant Address */}
                <button
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/search/?api=1&query=Karlsfelder+Str.+13+80995+München",
                      "_blank"
                    )
                  }
                  className="w-full bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-4 border border-primary/10 shadow-sm hover:shadow-md hover:from-primary/10 hover:to-primary/15 transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2.5 bg-white rounded-xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">
                        Unsere Adresse
                      </p>
                      <p className="text-base font-bold text-gray-900 leading-relaxed">
                        Karlsfelder Str. 13
                        <br />
                        80995 München
                      </p>
                      <p className="text-xs text-primary font-semibold mt-2 flex items-center group-hover:underline">
                        <span>In Google Maps öffnen</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                          className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                          />
                        </svg>
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Cart Menu */}
      {showCart && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCartToggle}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-[9998]"
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white shadow-2xl fixed top-0 right-0 w-full sm:w-96 md:w-[420px] z-[9999] h-screen flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-lg text-gray-800">Warenkorb</p>
                  {cart.length > 0 && (
                    <p className="text-xs text-gray-500">
                      {cart.length} Artikel
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleCartToggle}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {cart.length > 0 ? (
              <>
                {/* Cart Items - Scrollable */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.product._id}-${item.extras
                        .map((e) => e._id || e.name)
                        .join("-")}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-3 transition-all duration-150"
                    >
                      <div className="flex space-x-3">
                        <div className="relative">
                          <img
                            className="w-20 h-20 object-cover rounded-lg shadow-sm"
                            src={item.product.image}
                            alt={item.product.name}
                          />
                          <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                            {item.quantity}
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                              {item.product.name}
                            </p>
                            {item.extras.length > 0 && (
                              <Tooltip
                                content={item.extras
                                  .map((extra) => extra.name)
                                  .join(", ")}
                                style="light"
                              >
                                <p className="text-xs text-primary cursor-pointer hover:underline mt-1">
                                  + {item.extras.length} Extras
                                </p>
                              </Tooltip>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-sm font-bold text-primary">
                              {(item.price * item.quantity).toFixed(2)} €
                            </p>
                            <button
                              onClick={() =>
                                dispatch(
                                  removeFromCart({
                                    productId: item.product._id,
                                    extras: item.extras,
                                  })
                                )
                              }
                              className="p-1.5 rounded-lg hover:bg-red-50 transition-colors duration-200 group"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-4 text-red-500 group-hover:text-red-600"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer - Fixed */}
                <div className="border-t border-gray-100 bg-white p-5 space-y-4">
                  {/* Total */}
                  <div className="flex items-center justify-between py-3 px-4 bg-primary/5 rounded-xl">
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">
                        Gesamt
                      </p>
                      <p className="text-2xl font-bold text-primary mt-1">
                        {getCartTotal(cart)} €
                      </p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-2">
                    <Link to="/checkout" onClick={handleCartToggle}>
                      <button className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 mb-2">
                        <span>Zur Kasse</span>
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
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </button>
                    </Link>

                    <Link to="/products" onClick={handleCartToggle}>
                      <button className="w-full text-center border-2 border-primary text-primary py-3 rounded-xl font-medium transition-all duration-200 hover:bg-primary/5">
                        Mehr hinzufügen
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center px-5">
                <div className="bg-gray-50 rounded-full p-8 mb-6">
                  <img
                    src={noProducts}
                    alt="No Items"
                    className="w-32 h-32 opacity-60"
                  />
                </div>
                <p className="font-bold text-xl text-gray-800 mb-2">
                  Ihr Warenkorb ist leer
                </p>
                <p className="text-sm text-gray-500 text-center mb-8 max-w-xs">
                  Fügen Sie köstliche Gerichte aus unserer Speisekarte hinzu und
                  bestellen Sie Ihr Essen.
                </p>
                <Link onClick={handleCartToggle} to="/products">
                  <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5">
                    Jetzt bestellen
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </>
  );
};

export default Navbar;
