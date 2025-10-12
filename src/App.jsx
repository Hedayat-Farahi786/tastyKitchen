import Navbar from "./components/Navbar";
import "leaflet/dist/leaflet.css";
// import 'react-leaflet-markercluster/dist/styles.min.css'; // If you're using marker clusters

import { Flowbite } from "flowbite-react";
import LoadingPage from "./components/LoadingPage";
import Products from "./components/Products";
import Contact from "./components/Contact";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
  addTopping,
  removeTopping,
  setIsModalOpen,
  setQuantity,
  setSelectedOption,
  setTotalPrice,
} from "./store/productSlice";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import { addToCart, openCart, toggleCart } from "./store/cart";
import toast, { Toaster } from "react-hot-toast";
import Checkout from "./components/Checkout";
import Final from "./components/Final";
const customTheme = {
  button: {
    color: {
      primary: "bg-[#E53935] hover:bg-[#E53935] text-white",
    },
  },
};

const App = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const scrollPosition = useRef(0);

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
    dispatch(
      addToCart({
        product: selectedProduct,
        extras: selectedToppings,
        price: totalPrice,
        quantity,
      })
    );
    dispatch(openCart());
    dispatch(setIsModalOpen(false));
    // toast.dismiss();
    // toast.success(
    //   (t) => (
    //     <div className="flex items-center gap-3 py-1">
    //       <div className="flex items-center gap-2">
    //         <span className="font-semibold text-gray-800">Zum Warenkorb hinzugefügt!</span>
    //       </div>
    //       <button
    //         onClick={() => {
    //           dispatch(openCart());
    //           toast.dismiss(t.id);
    //         }}
    //         className="ml-2 bg-primary hover:bg-primary/90 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
    //       >
    //         Warenkorb ansehen
    //       </button>
    //     </div>
    //   ),
    //   {
    //     duration: 4000,
    //     style: {
    //       background: '#fff',
    //       color: '#363636',
    //       padding: '12px 16px',
    //       borderRadius: '12px',
    //       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    //       border: '1px solid #e5e7eb',
    //       maxWidth: '500px',
    //     },
    //   }
    // );
  };

  const handleLoadingComplete = (complete) => {
    setIsLoadingComplete(complete);
  };

  // Lock body scroll when modal is open with smooth experience
  useEffect(() => {
    if (isModalOpen) {
      // Save current scroll position
      scrollPosition.current = window.scrollY;

      // Temporarily disable smooth scrolling
      const htmlElement = document.documentElement;
      const originalScrollBehavior = htmlElement.style.scrollBehavior;
      htmlElement.style.scrollBehavior = "auto";

      // Apply styles in the correct order to prevent visual jump
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";

      // Store original scroll behavior for cleanup
      document.body.dataset.originalScrollBehavior = originalScrollBehavior;
    } else if (scrollPosition.current !== undefined) {
      // Get the saved scroll position
      const savedScrollY = scrollPosition.current;

      // Temporarily disable smooth scrolling for instant restoration
      const htmlElement = document.documentElement;
      htmlElement.style.scrollBehavior = "auto";

      // Remove fixed positioning first
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";

      // Restore scroll position immediately without animation
      window.scrollTo(0, savedScrollY);

      // Restore smooth scrolling after a brief delay
      setTimeout(() => {
        htmlElement.style.scrollBehavior =
          document.body.dataset.originalScrollBehavior || "";
        delete document.body.dataset.originalScrollBehavior;
      }, 50);
    }

    // Cleanup on unmount
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.documentElement.style.scrollBehavior = "";
    };
  }, [isModalOpen]);

  useEffect(() => {
    let totalPrice = selectedOption?.price || 0;
    selectedToppings?.forEach((topping) => {
      totalPrice += topping.price;
    });
    dispatch(setTotalPrice(totalPrice * quantity));
  }, [selectedOption, selectedToppings, quantity]);

  return (
    <div className="w-full overflow-x-hidden relative">
      <Router>
        <Toaster position="bottom-center" />
        <Flowbite theme={{ theme: customTheme }}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/products" component={Products} />
            <Route path="/contact" component={Contact} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/done/:orderNumber" component={Final} />
          </Switch>
        </Flowbite>
      </Router>

      {/* Enhanced Product Options Modal - Full Width Mobile with Bottom Sheet */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-end justify-center z-50 bg-black/50"
            onClick={handleModalClose}
          >
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full md:max-w-2xl md:rounded-t-2xl overflow-hidden flex flex-col"
              style={{
                height: "auto",
                maxHeight: "85vh",
              }}
            >
              {/* Drag Handle - Mobile Only */}
              <div className="md:hidden flex justify-center pt-2 pb-1 bg-white">
                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
              </div>

              {/* Header with Product Info - Clean White Design */}
              <div className="relative bg-white border-b border-gray-100 p-4 md:p-6 flex-shrink-0">
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleModalClose}
                  className="absolute top-3 right-3 md:top-4 md:right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-all duration-300 z-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-5 h-5 md:w-6 md:h-6 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>

                {/* Product Details */}
                <div className="pr-10 md:pr-12">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-lg md:text-2xl font-bold mb-1.5 text-gray-900"
                  >
                    {selectedProduct.name}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-600 text-xs md:text-sm leading-relaxed mb-2"
                  >
                    {selectedProduct.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center space-x-2 bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-full"
                  >
                    <span className="text-base md:text-xl font-bold text-primary">
                      {totalPrice.toFixed(2)} €
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Options Content - Scrollable with better spacing */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-white pb-6">
                {/* Size/Options Selection */}
                {selectedProduct.options.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl p-4 border border-gray-100"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-1 h-5 bg-primary rounded-full" />
                      <h3 className="text-base md:text-lg font-bold text-gray-900">
                        {selectedProduct.optionsTitle || "Größe wählen"}
                      </h3>
                    </div>
                    <div className="space-y-2.5">
                      {selectedProduct.options.map((option, i) => (
                        <motion.label
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all duration-300 ${
                            selectedOption === option
                              ? "bg-primary/5 border-2 border-primary"
                              : "bg-gray-50 border-2 border-transparent hover:border-gray-200 active:bg-gray-100"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              checked={selectedOption === option}
                              onChange={() => handleOptionChange(option)}
                              className="w-4 h-4 md:w-5 md:h-5 text-primary focus:ring-primary focus:ring-2"
                              type="radio"
                              name="productOption"
                            />
                            <span className="font-semibold text-sm md:text-base text-gray-800">
                              {option.size}
                            </span>
                          </div>
                          <span className="text-gray-600 font-semibold text-sm md:text-base">
                            {option.price.toFixed(2)} €
                          </span>
                        </motion.label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Extras Selection */}
                {extras.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl p-4 border border-gray-100"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-1 h-5 bg-primary rounded-full" />
                      <h3 className="text-base md:text-lg font-bold text-gray-900">
                        Extras hinzufügen
                      </h3>
                    </div>
                    <div className="space-y-2.5">
                      {extras.map((topping, i) => (
                        <motion.label
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all duration-300 ${
                            selectedToppings.some(
                              (item) => item.name === topping.name
                            )
                              ? "bg-primary/5 border-2 border-primary"
                              : "bg-gray-50 border-2 border-transparent hover:border-gray-200 active:bg-gray-100"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              className="w-4 h-4 md:w-5 md:h-5 text-primary focus:ring-primary focus:ring-2 rounded"
                              checked={selectedToppings.some(
                                (item) => item.name === topping.name
                              )}
                              onChange={() => handleToppingsChange(topping)}
                            />
                            <span className="font-semibold text-sm md:text-base text-gray-800">
                              {topping.name}
                            </span>
                          </div>
                          <span className="text-gray-600 font-semibold text-sm md:text-base">
                            +{topping.price.toFixed(2)} €
                          </span>
                        </motion.label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer with Quantity and Add Button - Fixed at bottom with nice padding */}
              {selectedProduct.options.length > 0 && (
                <div className="border-t border-gray-100 bg-white p-5 md:p-6 flex-shrink-0 safe-area-bottom">
                  <div className="flex items-center justify-between space-x-3 md:space-x-4 mb-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2 md:space-x-3 bg-gray-50 rounded-full p-1 border border-gray-100">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          dispatch(setQuantity(Math.max(1, quantity - 1)))
                        }
                        className="w-10 h-10 md:w-11 md:h-11 bg-white rounded-full font-bold text-gray-700 hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center border border-gray-100 text-lg"
                      >
                        -
                      </motion.button>
                      <span className="font-bold text-base md:text-lg w-8 text-center text-gray-900">
                        {quantity}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => dispatch(setQuantity(quantity + 1))}
                        className="w-10 h-10 md:w-11 md:h-11 bg-white rounded-full font-bold text-gray-700 hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center border border-gray-100 text-lg"
                      >
                        +
                      </motion.button>
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleAddToBasket}
                      className="flex-1 bg-primary hover:bg-red-600 text-white font-bold py-3.5 md:py-4 px-4 md:px-6 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5 md:w-6 md:h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                      <span className="text-base md:text-lg font-semibold">
                        <span className="hidden sm:inline">Hinzufügen • </span>
                        {totalPrice.toFixed(2)} €
                      </span>
                    </motion.button>
                  </div>
                  {/* Optional Helper Text - Low Opacity */}
                  <p className="text-xs text-center text-gray-400 mt-1 opacity-40">
                    Wählen Sie Ihre Optionen und fügen Sie sie dem Warenkorb
                    hinzu
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // return (
  //   <>
  //     {isLoadingComplete ? (

  //     ) : (
  //       <LoadingPage setLoadingComplete={handleLoadingComplete} />
  //     )}
  //   </>
  // );
};

export default App;
