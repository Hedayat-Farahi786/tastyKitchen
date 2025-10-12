import { Label, TextInput, Textarea, Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import cashIcon from "../assets/cash.png";
import creditIcon from "../assets/credit.png";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, resetCart } from "../store/cart";
import { useHistory } from "react-router-dom";
import { addOrder } from "../store/order";
import axios from "axios";
import toast from "react-hot-toast";
import io from "socket.io-client";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHED_KEY);

// Initialize socket connection with improved error handling
const socketUrl = import.meta.env.VITE_WEBSOCKET_URL || "http://localhost:4000";

let socket = null;
let socketErrorLogged = false; // Prevent error spam

try {
  socket = io(socketUrl, {
    transports: ["websocket", "polling"],
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
    timeout: 10000,
    autoConnect: true,
  });

  socket.on("connect_error", (error) => {
    if (!socketErrorLogged) {
      console.warn(
        "WebSocket connection unavailable. Real-time updates disabled.",
        error.message
      );
      socketErrorLogged = true;
    }
  });

  socket.on("connect", () => {
    console.log("Main app socket connected:", socket.id);
    socketErrorLogged = false; // Reset on successful connection
  });
} catch (error) {
  if (!socketErrorLogged) {
    console.warn(
      "WebSocket initialization skipped. Real-time updates disabled."
    );
    socketErrorLogged = true;
  }
}

const PaymentForm = ({ onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        onError();
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        onSuccess(paymentIntent);
      } else {
        onError();
      }
    } catch (error) {
      onError();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      <div
        className={
          isLoading
            ? "opacity-0 h-0 overflow-hidden"
            : "opacity-100 transition-opacity duration-150"
        }
      >
        <PaymentElement
          options={{
            layout: {
              type: "tabs",
              defaultCollapsed: false,
            },
          }}
          onReady={() => setIsLoading(false)}
          onLoadError={() => {
            setIsLoading(false);
            // Silently handle error
            onError();
          }}
        />
      </div>
      <button
        onClick={(e) => handleSubmit(e)}
        disabled={!stripe || isProcessing || isLoading}
        className="w-full bg-primary text-white rounded-xl px-6 py-4 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all duration-150 shadow-lg hover:shadow-xl"
        type="button"
      >
        {isProcessing ? "Zahlung wird verarbeitet..." : "Zahlung abschließen"}
      </button>
    </div>
  );
};

PaymentForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

const payments = [
  {
    name: "Barzahlung",
    icon: cashIcon,
    title: "Bezahlen mit",
    info: "Summe",
  },
  {
    name: "Kreditkarte",
    icon: creditIcon,
    title: "Bezahlen mit",
    info: "Summe",
  },
];

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState(payments[1]); // Default to credit card
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false); // Add this flag
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  useEffect(() => {
    // Only redirect if cart is empty AND order hasn't just been placed
    if (
      cart.length === 0 &&
      !isOrderPlaced &&
      history.location.pathname !== "/products"
    ) {
      history.replace("/products");
    }
  }, [cart.length, history, isOrderPlaced]);

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      reset(JSON.parse(savedData));
    }
  }, [reset]);

  useEffect(() => {
    if (selectedPayment.name === "Kreditkarte" && cart.length > 0) {
      const createPaymentIntent = async () => {
        setIsLoadingPayment(true);
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/create-payment-intent`,
            {
              amount: Math.round(getCartTotal(cart) * 100), // Convert to cents
              currency: "eur",
            }
          );

          if (response.data?.clientSecret) {
            setClientSecret(response.data.clientSecret);
          } else {
            // Silently switch to cash payment
            setSelectedPayment(payments[0]);
          }
        } catch (error) {
          // Silently switch to cash payment on any error
          setSelectedPayment(payments[0]);
        } finally {
          setIsLoadingPayment(false);
        }
      };

      createPaymentIntent();
    } else {
      setClientSecret("");
      setIsLoadingPayment(false);
    }
  }, [selectedPayment, cart]);

  const getCartTotal = (cart) => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  function modifyProductsArray(products) {
    return products.map((productItem) => ({
      productId: productItem.product._id,
      extras: productItem.extras,
      quantity: productItem.quantity,
      price: productItem.price,
    }));
  }

  const placeOrder = (orderData) => {
    // Only emit if socket is connected
    if (socket?.connected) {
      console.log("Emitting new_order event:", orderData.orderNumber);
      socket.emit("new_order", orderData);
    } else {
      console.warn(
        "WebSocket not connected, order placed without real-time notification"
      );
    }
  };

  const onSubmit = async (data) => {
    // Prevent submission if credit card is selected (handled separately)
    if (selectedPayment.name === "Kreditkarte") {
      return;
    }

    setIsSubmitting(true);
    setIsOrderPlaced(true); // Set flag before processing
    localStorage.setItem("formData", JSON.stringify(data));

    try {
      data.products = cart;
      data.totalPrice = getCartTotal(cart);
      data.payment = selectedPayment.name;
      data.time = new Date().toLocaleString();

      const res = {
        customer: {
          name: data.name,
          phone: data.phone,
        },
        delivery: {
          street: data.street,
          postcode: data.postcode,
          floor: data.floor,
          company: data.company,
          note: data.note,
        },
        products: modifyProductsArray(data.products),
        totalPrice: data.totalPrice,
        payment: data.payment,
        time: new Date(),
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/orders`,
        res
      );
      const order = response.data;

      placeOrder(order);
      dispatch(addOrder(order));
      dispatch(resetCart());
      history.push("/done/" + order.orderNumber);
    } catch (error) {
      console.error("Order error:", error);
      toast.error(
        "Fehler beim Aufgeben der Bestellung. Bitte versuchen Sie es erneut."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSelection = (option) => {
    setSelectedPayment(option);
  };

  // Handle successful payment and place order
  const handlePaymentSuccess = async () => {
    setIsOrderPlaced(true); // Set flag before processing
    toast.success("Zahlung erfolgreich!");
    const formData = getValues();
    await onSubmit(formData);
  };

  // Handle payment error - silently switch to cash payment
  const handlePaymentError = () => {
    setSelectedPayment(payments[0]); // Switch to Barzahlung
  };

  const renderPaymentSection = () => {
    if (selectedPayment.name === "Kreditkarte") {
      if (isLoadingPayment) {
        return (
          <div className="mt-8 mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-3"></div>
              <p className="text-gray-600">Zahlungsformular wird geladen...</p>
            </div>
          </div>
        );
      }

      if (!clientSecret) {
        // Don't show anything, just fall through to cash payment
        return null;
      }

      const options = {
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#017A39",
            borderRadius: "0.75rem",
            fontFamily: "system-ui, sans-serif",
          },
          rules: {
            ".Input": {
              border: "1px solid #E5E7EB",
              borderRadius: "0.5rem",
              padding: "12px",
            },
            ".Input:focus": {
              border: "1px solid #017A39",
              boxShadow: "0 0 0 1px #017A39",
            },
          },
        },
      };

      return (
        <div className="mt-8 mb-6">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm md:text-lg font-bold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-4 h-4 md:w-5 md:h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              Kreditkartendaten eingeben
            </h3>

            <Elements stripe={stripePromise} options={options}>
              <PaymentForm
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </Elements>
          </div>
        </div>
      );
    }

    return (
      <div className="mt-8 mb-6">
        <button
          className="w-full bg-primary text-white rounded-xl text-base md:text-lg px-8 py-4 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
          type="submit"
          disabled={cart.length === 0 || isSubmitting}
        >
          {isSubmitting
            ? "Wird verarbeitet..."
            : `Jetzt bestellen • ${getCartTotal(cart).toFixed(2)} €`}
        </button>
        <p className="text-center text-xs text-gray-500 mt-3">
          Mit dem Absenden bestätigen Sie unsere Allgemeinen
          Geschäftsbedingungen
        </p>
      </div>
    );
  };

  return (
    <div className="pt-[10vh] min-h-screen bg-gray-50">
      <div className="w-full flex flex-col md:flex-row gap-8 px-4 md:px-8 lg:px-20 py-6 md:py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="checkout__left w-full md:w-8/12 bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10"
        >
          <div className="flex items-center space-x-3 mb-8 md:mb-10">
            <div className="bg-primary/10 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 md:w-7 md:h-7 text-primary"
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Lieferadresse
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
            <div className="w-full">
              <div className="mb-2 block">
                <Label
                  htmlFor="street"
                  value="Straße und Hausnummer *"
                  className="font-semibold"
                />
              </div>
              <TextInput
                id="street"
                {...register("street", { required: true })}
                placeholder="z.B. Hauptstraße 123"
                shadow
                type="text"
                name="street"
                color={errors.street ? "failure" : ""}
                helperText={
                  errors.street && (
                    <span className="text-red-600 text-xs">
                      Bitte geben Sie Ihre Straße und Hausnummer ein
                    </span>
                  )
                }
                className="w-full"
              />
            </div>
            <div className="w-full">
              <div className="mb-2 block">
                <Label
                  htmlFor="postcode"
                  value="Postleitzahl *"
                  className="font-semibold"
                />
              </div>
              <TextInput
                id="postcode"
                {...register("postcode", { required: true })}
                placeholder="z.B. 12345"
                shadow
                type="text"
                name="postcode"
                color={errors.postcode ? "failure" : ""}
                helperText={
                  errors.postcode && (
                    <span className="text-red-600 text-xs">
                      Bitte geben Sie Ihre Postleitzahl ein
                    </span>
                  )
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
            <div className="w-full">
              <div className="mb-2 block">
                <Label
                  htmlFor="name"
                  value="Vor- und Nachname *"
                  className="font-semibold"
                />
              </div>
              <TextInput
                id="name"
                {...register("name", { required: true })}
                placeholder="z.B. Max Mustermann"
                shadow
                type="text"
                name="name"
                color={errors.name ? "failure" : ""}
                helperText={
                  errors.name && (
                    <span className="text-red-600 text-xs">
                      Bitte geben Sie Ihren vollständigen Namen ein
                    </span>
                  )
                }
                className="w-full"
              />
            </div>
            <div className="w-full">
              <div className="mb-2 block">
                <Label
                  htmlFor="phone"
                  value="Telefonnummer *"
                  className="font-semibold"
                />
              </div>
              <TextInput
                id="phone"
                {...register("phone", { required: true })}
                placeholder="z.B. +49 123 4567890"
                shadow
                type="tel"
                name="phone"
                color={errors.phone ? "failure" : ""}
                helperText={
                  errors.phone && (
                    <span className="text-red-600 text-xs">
                      Bitte geben Sie Ihre Telefonnummer ein
                    </span>
                  )
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="floor" value="Etage (optional)" />
              </div>
              <TextInput
                id="floor"
                {...register("floor")}
                placeholder="z.B. 3. OG"
                shadow
                type="text"
                name="floor"
                className="w-full"
              />
            </div>
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="company" value="Firmenname (optional)" />
              </div>
              <TextInput
                id="company"
                {...register("company")}
                placeholder="z.B. Meine Firma GmbH"
                shadow
                type="text"
                name="company"
                className="w-full"
              />
            </div>
          </div>

          <div className="mb-4 md:mb-5">
            <div className="w-full">
              <div className="mb-2 block">
                <Label
                  htmlFor="note"
                  value="Hinweise für die Lieferung (optional)"
                />
              </div>
              <Textarea
                id="note"
                {...register("note")}
                placeholder="z.B. Klingeln Sie bitte zweimal, Hinterer Eingang..."
                shadow
                name="note"
                rows={4}
                className="w-full resize-none"
              />
            </div>
          </div>

          {/* Delivery Time Info */}
          <div className="mt-8 mb-6">
            <div className="w-full p-4 md:p-5 flex items-center space-x-3 md:space-x-4 bg-primary/5 border-2 border-primary/20 rounded-xl">
              <div className="bg-primary/10 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 md:w-7 h-6 md:h-7 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-sm md:text-base text-gray-800">
                  Lieferzeit
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  Geschätzte Ankunftszeit: 30-60 Minuten
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="mt-8">
            <p className="text-xl md:text-2xl font-semibold mb-5">
              Zahlungsmethode
            </p>

            <div className="flex flex-col space-y-3">
              {payments.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => handlePaymentSelection(option)}
                  className={`w-full p-4 md:p-5 flex items-center justify-between border-2 cursor-pointer transition-all duration-300 rounded-xl shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    option.name === selectedPayment.name
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center space-x-4 md:space-x-5">
                    <div
                      className={`p-2 rounded-lg ${
                        option.name === selectedPayment.name
                          ? "bg-primary/10"
                          : "bg-gray-100"
                      }`}
                    >
                      <img
                        className="w-6 md:w-8 h-6 md:h-8 object-contain"
                        src={option.icon}
                        alt={option.name}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm md:text-base text-gray-800">
                        {option.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {option.name === "Barzahlung"
                          ? "Bei Lieferung bezahlen"
                          : "Sicher online bezahlen"}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full border-2 transition-all duration-300 ${
                      option.name === selectedPayment.name
                        ? "border-primary bg-primary"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {option.name === selectedPayment.name && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="currentColor"
                        className="w-4 h-4 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Payment Summary */}
            <div className="mt-5 p-4 bg-primary/5 border-2 border-primary/20 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <img
                      className="w-6 md:w-7 h-6 md:h-7 object-contain"
                      src={selectedPayment.icon}
                      alt={selectedPayment.name}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">
                      Ausgewählte Zahlungsmethode
                    </p>
                    <p className="font-bold text-sm md:text-base text-gray-800">
                      {selectedPayment.name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">Gesamtsumme</p>
                  <p className="text-xl md:text-2xl font-bold text-primary">
                    {getCartTotal(cart).toFixed(2)} €
                  </p>
                </div>
              </div>
            </div>
          </div>

          {renderPaymentSection()}

          {/* <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-end md:items-center justify-center z-50 bg-opacity-50 bg-black"
            >
              <div className="bg-white rounded-t-lg md:rounded-lg w-full md:w-6/12 h-[90%] p-6 md:p-10 flex flex-col md:justify-between">
                <div className="flex items-start justify-between">
                  <h2 className="text-2xl font-semibold">Bezahlmethoden</h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 cursor-pointer"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>

                <div className="pt-10 flex flex-col space-y-5">
                  {payments.map((option, i) => (
                    <div
                      key={i}
                      onClick={() => handlePaymentSelection(option)}
                      className="w-full p-3 md:p-5 flex items-center justify-between border border-gray-300 cursor-pointer transition-all duration-200 hover:bg-[#f5f5f5] rounded-lg"
                    >
                      <div className="flex items-center space-x-5">
                        <img
                          className="w-6 md:w-8"
                          src={option.icon}
                          alt={option.name}
                        />
                        <p className="font-semibold text-md md:text-lg">
                          {option.name}
                        </p>
                      </div>

                      {option.name === selectedPayment.name && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 md:w-6 h-5 md:h-6 text-[#017A39]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence> */}
        </form>

        <div className="checkout__right hidden md:block w-full md:w-4/12 bg-white rounded-2xl shadow-lg p-6 md:p-8 sticky top-24 h-fit max-h-[calc(100vh-7rem)] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-gray-800">Warenkorb</h3>
            </div>
            <span className="bg-primary text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">
              {cart.length}
            </span>
          </div>

          <div className="space-y-3">
            {cart.map((item, index) => (
              <div
                key={`${item.product._id}-${item.extras
                  .map((e) => e._id)
                  .join("-")}`}
                className="group"
              >
                <div className="flex justify-between space-x-3 py-3 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200">
                  <div className="flex space-x-3 flex-1">
                    <div className="relative">
                      <img
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        src={item.product.image}
                        alt={item.product.name}
                      />
                      <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1 flex-1">
                      <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {item.price.toFixed(2)} € × {item.quantity}
                      </p>
                      {item.extras.length > 0 && (
                        <Tooltip
                          content={item.extras
                            .map((extra) => extra.name)
                            .join(", ")}
                          style="light"
                        >
                          <p className="text-[10px] cursor-pointer text-primary font-medium">
                            + {item.extras.length} Extra
                            {item.extras.length > 1 ? "s" : ""}
                          </p>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-bold text-sm text-gray-800">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                    <button
                      type="button"
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
                        strokeWidth="2"
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
                {index < cart.length - 1 && (
                  <div className="h-px bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t-2 border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Gesamtsumme
              </p>
              <p className="text-2xl text-primary font-bold">
                {getCartTotal(cart).toFixed(2)} €
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
