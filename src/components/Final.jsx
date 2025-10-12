import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import confetti from "canvas-confetti";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import delivery from "../assets/delivery.png";
import { motion } from "framer-motion";

const Final = () => {
  const { orderNumber } = useParams(); // Extract the order number from the route parameters

  // Mock restaurant location
  const [timeLeft, setTimeLeft] = useState(3600); // Time left in seconds (60 minutes)
  const [showCheckmark, setShowCheckmark] = useState(true); // Initial state to show the checkmark
  const [done, setDone] = useState(false); // Indicates if the timer is done
  const [order, setOrder] = useState(null); // State to store the order details

  const confettiFired = useRef(false); // useRef to track confetti firing

  // Confetti logic
  useEffect(() => {
    if (!confettiFired.current) {
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.8 },
      });
      confettiFired.current = true;
    }
  }, []); // Empty dependency array ensures this runs only once

  // Timer and checkmark logic
  useEffect(() => {
    let timer;
    if (!showCheckmark && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const updatedTimeLeft = prevTimeLeft - 1;
          if (updatedTimeLeft <= 0) {
            clearInterval(timer);
            setDone(true);
            return 0;
          }
          return updatedTimeLeft;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [showCheckmark, timeLeft]);

  useEffect(() => {
    if (showCheckmark) {
      const timeout = setTimeout(() => {
        setShowCheckmark(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [showCheckmark]);

  // Fetch order details and calculate time difference
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/orders/${orderNumber}`)
      .then((response) => {
        setOrder(response.data);
        console.log(response.data);

        const orderTime = new Date(response.data.time).getTime(); // Order time in milliseconds
        const currentTime = new Date().getTime(); // Current time in milliseconds

        // Calculate the difference in seconds and set time left
        const timeDifference = Math.floor((currentTime - orderTime) / 1000);
        const remainingTime = 3600 - timeDifference; // 60 minutes in seconds

        if (remainingTime > 0) {
          setTimeLeft(remainingTime);
        } else {
          setDone(true); // If more than 60 minutes have passed
        }
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
        toast.error("Fehler beim Laden der Bestellung.");
      });
  }, [orderNumber]);

  const percentage = ((3600 - timeLeft) / 3600) * 100;
  const borderStyle = {
    backgroundImage: `conic-gradient(
      #ffecec ${percentage}%,
      transparent 0
    )`,
  };

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Verfolgen Sie Ihre Lieferung",
          text: "Klicken Sie auf den unten stehenden Link, um die Lieferung Ihrer Bestellung zu verfolgen",
          url: window.location.href,
        });
        toast.success("Link erfolgreich geteilt!");
      } catch (error) {
        toast.error("Fehler beim Teilen.");
      }
    } else {
      toast.error("API Fehler beim Teilen");
    }
  };

  return (
    <div className="pt-[8vh] sm:pt-[10vh] w-full min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section with Delivery Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full flex items-center justify-center px-4 sm:px-6 md:px-8 py-4 sm:py-6"
      >
        <img
          src={delivery}
          alt="Delivery"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
        />
      </motion.div>

      {/* Timer Circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.3, delay: 0.1 }}
        className="w-full flex items-center justify-center relative mb-6 sm:mb-8 z-40"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-primary shadow-lg flex items-center justify-center">
          {done ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-white text-sm sm:text-base md:text-lg font-bold text-center px-2"
            >
              Geliefert!
            </motion.div>
          ) : showCheckmark ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-full bg-primary h-full rounded-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 scale-0 text-white animate-snap transition-all ease-linear duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
          ) : (
            <div
              className="w-full h-full rounded-full flex items-center justify-center p-0.5 sm:p-1"
              style={borderStyle}
            >
              <div className="font-bold bg-white shadow-lg h-full w-full rounded-full flex flex-col items-center justify-center">
                <span className="text-lg sm:text-xl md:text-2xl">
                  {Math.floor(timeLeft / 60) + 1}
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm">min</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Main Content Wrapper */}
      <div className="w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 space-y-6 sm:space-y-8 mb-10 sm:mb-12 md:mb-16">
        {/* Status Messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="w-full flex flex-col items-center justify-center space-y-3 sm:space-y-4"
        >
          {done ? (
            <>
              <motion.p
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="font-bold text-lg sm:text-xl md:text-2xl text-gray-800 text-center"
              >
                Ihre Bestellung wurde geliefert! 🎉
              </motion.p>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center max-w-lg px-2">
                Deine Bestellung bei Tasty Kitchen wurde an{" "}
                <span className="font-semibold text-primary">
                  {order?.delivery.street}, {order?.delivery.postcode} München
                </span>{" "}
                geliefert.
              </p>
            </>
          ) : (
            <>
              <motion.p
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="font-bold text-lg sm:text-xl md:text-2xl text-gray-800 text-center"
              >
                Deine Bestellung ist auf dem Weg! 🚗
              </motion.p>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center max-w-lg px-2">
                Deine Bestellung bei Tasty Kitchen ist unterwegs und wird in
                etwa{" "}
                <span className="font-bold text-primary">
                  {Math.floor(timeLeft / 60) + 1} Minuten
                </span>{" "}
                geliefert.
              </p>
            </>
          )}
        </motion.div>

        {/* Order Details Card */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="w-full max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100"
          >
            <div className="p-4 sm:p-6 md:p-8">
              {/* Order Number Header */}
              <div className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b-2 border-gray-100">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
                  <span className="text-gray-700">Bestellnummer</span>{" "}
                  <span className="text-primary">#{order?.orderNumber}</span>
                </h2>
                <div className="mt-3 flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    {new Date(order.time).toLocaleString("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              {/* Products List */}
              <div className="space-y-3 sm:space-y-4">
                {order.products.map((product) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start sm:items-center p-3 sm:p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
                  >
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 overflow-hidden rounded-xl shadow-md">
                        <img
                          src={product.productId.image}
                          alt={product.productId.name}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.target.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e53935'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      {product.quantity > 1 && (
                        <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                          {product.quantity}
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 truncate">
                        {product.productId.name}
                      </h3>

                      {/* Extras */}
                      {product.extras.length > 0 && (
                        <div className="mt-1 space-y-0.5">
                          {product.extras.map((extra) => {
                            const extraName =
                              product.productId.menuId.extras.find(
                                (ext) => ext._id === extra
                              )?.name;
                            return extraName ? (
                              <div
                                key={extra}
                                className="flex items-center text-xs sm:text-sm text-gray-600"
                              >
                                <svg
                                  className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-primary"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>{extraName}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}

                      {/* Price and Quantity */}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-sm sm:text-base md:text-lg text-primary font-bold">
                          €{product.price.toFixed(2)}
                        </div>
                        {product.quantity === 1 && (
                          <div className="text-xs sm:text-sm text-gray-500">
                            Menge: {product.quantity}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Delivery Note */}
              {order.delivery.note && order.delivery.note.trim() !== "" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg"
                >
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <div className="flex-1">
                      <p className="font-bold text-sm sm:text-base text-yellow-800 mb-1">
                        Lieferhinweis:
                      </p>
                      <p className="text-xs sm:text-sm text-yellow-700 break-words">
                        {order.delivery.note}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Payment Method */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-700 font-semibold">
                      Zahlungsmethode:
                    </span>
                  </div>
                  <span className="text-sm sm:text-base text-gray-800 font-bold">
                    {order.payment}
                  </span>
                </div>
              </div>

              {/* Total Price */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-700">
                    Gesamtpreis
                  </h3>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                    €{order.totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.2 }}
          className="w-full max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShareClick}
            className="w-full bg-primary hover:bg-primary/90 text-white text-sm sm:text-base md:text-lg py-3 sm:py-4 px-5 sm:px-6 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3"
          >
            <span>Tracking Link teilen</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="tel:+49893148784"
            className="w-full bg-white hover:bg-gray-50 text-primary border-2 border-primary text-sm sm:text-base md:text-lg py-3 sm:py-4 px-5 sm:px-6 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3"
          >
            <span>Ruf uns an</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Final;
