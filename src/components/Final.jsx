import React, { useEffect, useState } from "react";
import MapWithDistance from "./MapWithDistance";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const Final = () => {
  // Mock restaurant location
  const restaurantLocation = { lat: 48.2178, lng: 11.52544 }; // Replace LATITUDE and LONGITUDE with the actual coordinates of your restaurant.

  // User's location (you can obtain this using the Geolocation API as shown in the previous response)
  const userLocation = { lat: 48.22359, lng: 11.55586 }; // Replace USER_LATITUDE and USER_LONGITUDE with the actual coordinates of the user's location.

  const [initialTime] = useState(120); // Initial time in seconds
  const [timeLeft, setTimeLeft] = useState(initialTime); // Initial time left in seconds
  const [showCheckmark, setShowCheckmark] = useState(true); // Initial state to show the checkmark
  const [done, setDone] = useState(false); // Indicates if the timer is done

  const order = useSelector((state) => state.order.order);

  console.log(order)

  useEffect(() => {
    let timer;

    if (showCheckmark) {
      // Display the checkmark for the first 3 seconds
      setTimeout(() => {
        setShowCheckmark(false);
        // Start the timer countdown after 3 seconds
        timer = setInterval(() => {
          // Update the time left
          setTimeLeft((prevTimeLeft) => {
            if (prevTimeLeft === 0) {
              clearInterval(timer);
              setDone(true);
              return 0;
            }
            return prevTimeLeft - 1;
          });
        }, 1000);
      }, 1500);
    }

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, [showCheckmark]); // Add showCheckmark as a dependency

  // Calculate the percentage of time left
  const percentage = ((initialTime - timeLeft) / initialTime) * 100;
  // Create a conic gradient to represent the decreasing border
  const borderStyle = {
    backgroundImage: `conic-gradient(
      #ffecec ${percentage}%,
      transparent 0
    )`,
  };

  const hkandleShareClick = async () => {
    const shareContent = {
      title: "Verfolgen Sie Ihre Lieferung",
      text: "Klicken Sie auf den unten stehenden Link, um die Lieferung Ihrer Bestellung zu verfolgen",
      url: window.location.href, // Get the current URL
    };
    try {
      if (navigator.share) {
        await navigator.share(shareContent);
        toast.success(`wurde dem Korb hinzugefügt!`);
      } else {
        toast.error(
          "Die Weitergabefunktion wird in diesem Browser nicht unterstützt. Sie können den Link manuell kopieren."
        );
      }
    } catch (error) {
      toast.error("Fehler beim Teilen.");
    }
  };
  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Share this link',
          text: 'Check out this cool website!',
          url: window.location.href, // You can replace this with the URL you want to share
        });
        console.log('Link shared successfully');
      } catch (error) {
        console.error('Error sharing link:', error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      console.log('Web Share API is not supported');
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
              Deine Bestellung bei Tasty Kitchen wurde an Wintersteinstr. 62,
              80933 München geliefert.
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
          <span className="font-semibold text-lg">234234</span>
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
