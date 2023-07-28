import Navbar from "./components/Navbar";

import { Flowbite } from "flowbite-react";
import LoadingPage from "./components/LoadingPage";
import Products from "./components/Products";
import { useEffect, useState } from "react";
import Menu from "./components/Menu";
import Carousel from "./components/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
  addTopping,
  removeTopping,
  setIsModalOpen,
  setQuantity,
  setSelectedOption,
  setSelectedToppings,
  setTotalPrice,
} from "./store/productSlice";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import { addToCart } from "./store/cart";
const customTheme = {
  button: {
    color: {
      primary: "bg-[#E53935] hover:bg-[#E53935] text-white",
    },
  },
};

const App = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const isModalOpen = useSelector((state) => state.product.isModalOpen);
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const totalPrice = useSelector((state) => state.product.totalPrice);
  const quantity = useSelector((state) => state.product.quantity);
  const selectedOption = useSelector((state) => state.product.selectedOption);
  const selectedToppings = useSelector(
    (state) => state.product.selectedToppings
  );
  const extras = useSelector((state) => state.product.extras);

  const dispatch = useDispatch();

  const handleOptionChange = (option) => {
    dispatch(setSelectedOption(option));
  };

  const handleModalClose = () => {
    dispatch(setIsModalOpen(false));
  };

  const handleToppingsChange = (topping) => {
    if (selectedToppings.some((item) => item.name === topping.name)) {
      dispatch(removeTopping(topping.name));
    } else {
      dispatch(addTopping(topping));
    }
  };

  const handleAddToBasket = () => {
    dispatch(addToCart({product: selectedProduct, price: selectedOption.price, quantity}))
    dispatch(setIsModalOpen(false));
  };

  const handleLoadingComplete = (complete) => {
    setIsLoadingComplete(complete);
  };

  useEffect(() => {
    let totalPrice = selectedOption?.price || 0;
    selectedToppings?.forEach((topping) => {
      totalPrice += topping.price;
    });
    dispatch(setTotalPrice(totalPrice * quantity));
  }, [selectedOption, selectedToppings, quantity]);

  return (
    <>
      {isLoadingComplete ? (
        <div className="w-full overflow-x-hidden relative">
          <Router>
            <Flowbite theme={{ theme: customTheme }}>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/products" component={Products} />
              </Switch>
            </Flowbite>
          </Router>

          {/* Modal */}

          <AnimatePresence>
            {isModalOpen && selectedProduct && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-end md:items-center justify-center z-50 bg-opacity-50 bg-black"
              >
                <div className="bg-white rounded-t-lg md:rounded-lg w-full md:w-6/12 h-[90%] p-6 md:p-10 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col mb-4 space-y-2">
                      <h2 className="text-2xl font-semibold">
                        {selectedProduct.name}
                      </h2>
                      <p className="text-xs text-gray-600">
                        {selectedProduct.description}
                      </p>
                      <h2 className="text-xl md:text-2xl font-semibold text-primary">
                        {totalPrice.toFixed(2)}€
                      </h2>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-8 h-8 cursor-pointer"
                      onClick={handleModalClose}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div className="bg-gray-100 p-5 rounded overflow-y-scroll max-h-11/12">
                    {selectedProduct.options.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <p className="text-sm font-semibold mb-2">
                          Select a size
                        </p>
                        {selectedProduct.options.map((option, i) => (
                          <label
                            className="pl-2 flex items-center space-x-3 cursor-pointer"
                            key={i}
                          >
                            <input
                              checked={selectedOption === option}
                              onChange={() => handleOptionChange(option)}
                              className="text-primary focus:ring-[#E53935]"
                              type="radio"
                            />
                            <div className="flex items-center space-x-2">
                              <p className="text-sm">{option.size}</p>
                              <span className="text-xs text-gray-500">
                                {option.price.toFixed(2)}€
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                    <div className="w-full h-[1px] bg-gray-300 my-5"></div>
                    {selectedProduct.options.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <p className="text-sm font-semibold mb-2">
                          {selectedProduct.optionsTitle}
                        </p>
                        {extras.map((topping, i) => (
                          <label
                            className="pl-2 flex items-center space-x-3 cursor-pointer"
                            key={i}
                          >
                            <input
                              type="checkbox"
                              className="text-primary focus:ring-[#E53935]"
                              checked={selectedToppings.some(
                                (item) => item.name === topping.name
                              )}
                              onChange={() => handleToppingsChange(topping)}
                            />
                            <div className="flex items-center space-x-2">
                              <p className="text-sm">{topping.name}</p>
                              <span className="text-xs text-gray-500">
                                {topping.price.toFixed(2)}€
                              </span>
                            </div>
                          </label>
                        ))}

                        {/* {extras.map((topping, i) => (
                      <div className="pl-2 flex items-center space-x-3" key={i}>
                        <input
                          type="checkbox"
                          className="text-primary focus:ring-[#E53935] cursor-pointer"
                          checked={selectedToppings.some(
                            (item) => item.name === topping.name
                          )}
                          onChange={() => handleToppingsChange(topping)}
                        />
                        <p className="text-sm">{topping.name}</p>
                        <span className="text-xs text-gray-500">
                          {topping.price.toFixed(2)}€
                        </span>
                      </div>
                    ))} */}
                      </div>
                    )}
                  </div>
                  {selectedProduct.options.length > 0 && (
                    <div className="flex items-center justify-between space-x-5 mt-10">
                      <div className="flex items-center gap-5">
                        <button
                          onClick={() =>
                            dispatch(setQuantity(Math.max(1, quantity - 1)))
                          }
                          className="px-4 py-2 bg-gray-200 text-2xl rounded-full focus:outline-none"
                        >
                          -
                        </button>
                        <p className="font-medium text-lg">{quantity}</p>
                        <button
                          onClick={() => dispatch(setQuantity(quantity + 1))}
                          className="px-4 py-2 bg-gray-200 text-2xl rounded-full focus:outline-none"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={handleAddToBasket}
                        className="flex-1 bg-primary text-white font-semibold py-2 px-4 rounded-full text-2xl shadow"
                      >
                        {totalPrice.toFixed(2)} €
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <LoadingPage setLoadingComplete={handleLoadingComplete} />
      )}
    </>
  );
};

export default App;
