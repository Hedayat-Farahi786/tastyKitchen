import { Label, TextInput, Tooltip } from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import cashIcon from "../assets/cash.png";
import klarnaIcon from "../assets/klarna.png";
import paypalIcon from "../assets/paypal.png";
import creditIcon from "../assets/credit.png";
import giroIcon from "../assets/giro.png";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../store/cart";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const payments = [
  {
    name: "Barzahlung",
    icon: cashIcon,
    title: "Bezahle mit",
    info: "Barzahlung - Passend",
  },
  {
    name: "Sofortüberweisung",
    icon: klarnaIcon,
    title: "Zahlungsvorgang mit",
    info: "Sofortüberweisung",
  },
  {
    name: "PayPal",
    icon: paypalIcon,
    title: "Zahlungsvorgang mit",
    info: "Paypal",
  },
  {
    name: "Kreditkarte",
    icon: creditIcon,
    title: "Zahlungsvorgang mit",
    info: "Kreditkarte",
  },
  {
    name: "GiroPay",
    icon: giroIcon,
    title: "Zahlungsvorgang mit",
    info: "GiroPay",
  },
];
const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState(payments[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    history.push('/done');
  };

  const handlePaymentSelection = (option) => {
    setSelectedPayment(option);
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  const getCartTotal = (cart) => {
    let total = 0;

    cart.forEach((item) => {
      total += item.price * item.quantity;
    });

    return total.toFixed(2);
  };

  return (
    <div className="pt-[10vh] w-full flex space-x-20 px-8 md:px-20 py-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="checkout__left w-full md:w-8/12 py-5 md:py-10"
      >
        <p className="text-2xl md:text-3xl font-semibold mb-8 md:mb-10">Delivery Address</p>
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-5 md:mb-5 space-y-2 mb-2">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="street" value="Straße" />
            </div>
            <TextInput
              id="street"
              {...register("street", { required: true })}
              placeholder="Straßenname eingeben"
              shadow
              type="text"
              name="street"
              color={errors.street ? "failure" : ""}
              helperText={
                errors.street && <span>Straßenname ist erforderlich</span>
              }
              className="w-full"
            />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="houseNumber" value="Hausnummer" />
            </div>
            <TextInput
              id="houseNumber"
              {...register("houseNumber", { required: true })}
              placeholder="Hausnummer eingeben"
              shadow
              type="text"
              name="houseNumber"
              color={errors.houseNumber ? "failure" : ""}
              helperText={
                errors.houseNumber && <span>Hausnummer ist erforderlich</span>
              }
              className="w-full"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-5 md:mb-5 space-y-2 mb-2">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="postcode" value="Postleitzahl" />
            </div>
            <TextInput
              id="postcode"
              {...register("postcode", { required: true })}
              placeholder="Postleitzahl eingeben"
              shadow
              type="text"
              name="postcode"
              color={errors.postcode ? "failure" : ""}
              helperText={
                errors.postcode && <span>Postleitzahl erforderlich</span>
              }
              className="w-full"
            />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="city" value="Stadt" />
            </div>
            <TextInput
              id="city"
              {...register("city", { required: true })}
              placeholder="Stadtname eingeben"
              shadow
              type="text"
              name="city"
              color={errors.city ? "failure" : ""}
              helperText={
                errors.city && <span>Name der Stadt erforderlich</span>
              }
              className="w-full"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-5 md:mb-5 space-y-2 mb-2">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="floor" value="Etage (freiwillig)" />
            </div>
            <TextInput
              id="floor"
              {...register("floor")}
              placeholder="Etagennummer eingeben"
              shadow
              type="text"
              name="floor"
              className="w-full"
            />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="company" value="Firmenname (freiwillig)" />
            </div>
            <TextInput
              id="company"
              {...register("company")}
              placeholder="Firmenname eingeben"
              shadow
              type="text"
              name="company"
              className="w-full"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-5 md:mb-5 space-y-2 mb-2">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Vor- und Zuname" />
            </div>
            <TextInput
              id="name"
              {...register("name", { required: true })}
              placeholder="Trage deinen Vor- und Zunamen ein"
              shadow
              type="text"
              name="name"
              color={errors.name ? "failure" : ""}
              helperText={
                errors.name && <span>Vollständiger Name erforderlich</span>
              }
              className="w-full"
            />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="email" value="E-mail" />
            </div>
            <TextInput
              id="email"
              {...register("email", { required: true })}
              placeholder="John@doe.com..."
              shadow
              type="email"
              name="email"
              color={errors.email ? "failure" : ""}
              helperText={
                errors.email && <span>E-mail Adresse erforderlich</span>
              }
              className="w-full"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-5 md:mb-5 space-y-2 mb-2">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="phone" value="Telefonnummer" />
            </div>
            <TextInput
              id="phone"
              {...register("phone", { required: true })}
              placeholder="Trage deine Telefonnummer ein, z.B. +49-XXXXXXXXXX"
              shadow
              type="text"
              name="phone"
              color={errors.phone ? "failure" : ""}
              helperText={
                errors.phone && <span>Postleitzahl erforderlich</span>
              }
              className="w-full"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-5 mt-5">
          <div className="w-full p-3 md:p-5 flex items-center justify-between border border-gray-300 cursor-pointer transition-all duration-200 linear hover:bg-[#f5f5f5] rounded-lg">
            <div className="flex items-center space-x-3 md:space-x-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 md:w-8 h-6 md:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="font-semibold text-md">Lieferzeit</p>
                <p className="text-xs md:text-sm">Geschätzte Ankunftszeit: 20-45 Min.</p>
              </div>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 md:w-6 h-4 md:h-6 text-[#017A39]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div
            onClick={() => setIsModalOpen(true)}
            className="w-full p-3 md:p-5 flex items-center justify-between border border-gray-300 cursor-pointer transition-all duration-200 linear hover:bg-[#f5f5f5] rounded-lg"
          >
            <div className="flex items-center space-x-3 md:space-x-5">
              <img
                className="w-6 md:w-8"
                src={selectedPayment.icon}
                alt={selectedPayment.name}
              />
              <div>
                <p className="font-semibold text-md">
                  {selectedPayment.name === "Barzahlung" ? (
                    <span>Bezahle mit</span>
                  ) : (
                    <span>Zahlungsvorgang mit</span>
                  )}
                </p>
                <p className="text-xs md:text-sm">
                  {selectedPayment.name === "Barzahlung" ? (
                    <span>Barzahlung - Passend {getCartTotal(cart)}€</span>
                  ) : (
                    <span>{selectedPayment.name}</span>
                  )}
                </p>
              </div>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 md:w-6 h-4 md:h-6 text-[#017A39]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div className="my-10">
          <button
            className="w-full md:w-max bg-primary text-white rounded-xl text-base md:text-lg px-10 py-4 font-semibold"
            type="submit"
          >
            Bestellen und bezahlen mit {selectedPayment.name} ({getCartTotal(cart)} €)
          </button>
        </div>

        <AnimatePresence>
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
                      className="w-full p-3 md:p-5 flex items-center justify-between border border-gray-300 cursor-pointer transition-all duration-200 linear hover:bg-[#f5f5f5] rounded-lg"
                    >
                      <div className="flex items-center space-x-5">
                        <img
                          className="w-6 md:w-8"
                          src={option.icon}
                          alt={option.name}
                        />

                        <p className="font-semibold text-md md:text-lg">{option.name}</p>
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
        </AnimatePresence>
      </form>
      <div className="checkout__right hidden md:block w-4/12 py-5 md:py-10">
      <div className="w-full flex items-center justify-between">
            <p className="font-semibold text-xl">Warenkorb</p>


          </div>

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
                            dispatch(removeFromCart({productId: item.product.id, extras: item.extras}))
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
            </div>
      </div>
    </div>
  );
};

export default Checkout;