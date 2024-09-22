import React, { useEffect, useRef, useState } from "react";
import MapWithDistance from "./MapWithDistance";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../store/cart";
import confetti from 'canvas-confetti'; // Import canvas-confetti
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Final = () => {
  const { orderNumber } = useParams(); // Extract the order number from the route parameters

  // Mock restaurant location
  const restaurantLocation = { lat: 48.2178, lng: 11.52544 }; // Replace LATITUDE and LONGITUDE with the actual coordinates of your restaurant.

  // User's location (you can obtain this using the Geolocation API as shown in the previous response)
  const userLocation = { lat: 48.22359, lng: 11.55586 }; // Replace USER_LATITUDE and USER_LONGITUDE with the actual coordinates of the user's location.

  const [initialTime] = useState(60); // Initial time in minutes
  const [timeLeft, setTimeLeft] = useState((initialTime - 1) * 60); // Initial time left in seconds
  const [showCheckmark, setShowCheckmark] = useState(true); // Initial state to show the checkmark
  const [done, setDone] = useState(false); // Indicates if the timer is done
  const [order, setOrder] = useState(null); // State to store the order details

  const dispatch = useDispatch();

  const confettiFired = useRef(false); // useRef to track confetti firing

  // Log states to diagnose re-renders
  console.log('Component rendered with showCheckmark:', showCheckmark, 'and done:', done);

  // Confetti logic
  useEffect(() => {
    if (!confettiFired.current) {
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.8 }
      });
      confettiFired.current = true;
    }
  }, []); // Empty dependency array ensures this runs only once

  // Timer and checkmark logic
  useEffect(() => {
    console.log("useEffect for timer/checkmark entered");

    let timer;
    if (!showCheckmark) {
      // Timer logic only starts if showCheckmark is false
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

    // Cleanup for timer interval
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [showCheckmark]); // Depend on showCheckmark

  useEffect(() => {
    // This effect handles the initial delay before hiding the checkmark
    if (showCheckmark) {
      const timeout = setTimeout(() => {
        setShowCheckmark(false);
        console.log("Checkmark hidden, starting timer");
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [showCheckmark]);

  // Fetch order details based on the order number
  useEffect(() => {
    axios.get(`https://tastykitchen-backend.vercel.app/orders/${orderNumber}`)
      .then(response => {
        setOrder(response.data);
        // Proceed with the remaining logic once the order details are fetched successfully
        // For example, dispatch an action or call a function
        // dispatch(addOrder(response.data));
        // handleRemainingLogic();
      })
      .catch(error => {
        console.error('Error fetching order:', error);
        toast.error("Fehler beim Laden der Bestellung.");
      });
  }, [orderNumber]);

  // Calculate the percentage of time left
  const percentage = ((initialTime - timeLeft) / initialTime) * 100;
  // Create a conic gradient to represent the decreasing border
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
        toast.dismiss();
      toast((t) => (
        <span className="text-xs md:text-sm flex items-center justify-center space-x-3">
          <b>Produkt hinzugefügt!</b>
          <button className="border border-[#e53935] text-[#e53935] rounded-md px-2 py-1" onClick={() => {
            dispatch(toggleCart());
            toast.dismiss();
          }}>
          Warenkorb
          </button>
        </span>
      ));
      } catch (error) {
        toast.error("Fehler beim Teilen.");
      }
    } else {
      toast.error("API Fehler beim Teilen");
    }
  };

  return (
    <div className="pt-[8vh] w-full">
      {/* Map showing the distance between the restaurant and user's location */}
      <MapWithDistance origin={userLocation} destination={restaurantLocation} />

      {/* Rest of your Final page content */}

      <div className="w-full flex items-center justify-center relative -top-10 z-50">
        <div
          className={`w-20 h-20 rounded-full bg-[#e53535] flex items-center justify-center`}
        >
          {done ? (
            // Display "Done" when the timer is finished
            <div className="text-white text-sm font-semibold">Geliefert!</div>
          ) : showCheckmark ? (
            // Display the checkmark for the first 3 seconds
            <div className="w-full bg-[#e53935] h-full rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 scale-0 text-white animate-snap transition-all ease-linear duration-200"
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
            </div>
          ) : (
            // After the checkmark, display the countdown timer
            <div
              className="w-full h-full rounded-full flex items-center justify-center p-1"
              style={borderStyle}
            >
              <div className="font-bold bg-white shadow-lg h-full w-full rounded-full flex flex-col items-center justify-center">
                <span className="text-xl">{Math.floor(timeLeft / 60) + 1}</span>
                <span className="text-xs">min</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center px-5 space-y-5 mb-10">
        {done ? (
          <>
            <p className="font-semibold text-lg">
              Ihre Bestellung wurde geliefert!
            </p>
            <p className="text-sm text-center">
              Deine Bestellung bei Tasty Kitchen wurde an {order.street},
              {order.postcode} München geliefert.
            </p>
          </>
        ) : (
          <>
            <p className="font-semibold text-lg">
              Deine Bestellung is auf dem Weg!
            </p>
            <p className="text-sm text-center">
              Deine Bestellung bei Tasty Kitchen ist unterwegs und wird in etwa{" "}
              {Math.floor(timeLeft / 60) + 1} Minuten geliefert.
            </p>
          </>
        )}

        <div className="flex flex-col items-center justify-center space-x-2">
          <span className="text-[#e53935] text-base">Bestellnummer</span>
          <span className="font-semibold text-lg">#{order?.orderNumber}</span>
        </div>

        <button
          onClick={handleShareClick}
          className="bg-[#e53935] text-white text-base py-2 px-5 rounded-md flex items-center justify-center space-x-4"
        >
          <span>Tracking Link teilen</span>
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
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
        </button>
        <a
          href="tel:00491751404599"
          className="text-[#e53935] border border-[#e53935] text-base py-2 px-5 rounded-md flex items-center justify-center space-x-4"
        >
          <span>Ruf uns an</span>
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
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Final;
