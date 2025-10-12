import { useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import {
  resetTopping,
  setExtras,
  setIsModalOpen,
  setSelectedOption,
  setSelectedProduct,
  setTotalPrice,
} from "../store/productSlice";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NoProducts from "../assets/productNoResult.png";
import axios from "axios";
import toast from "react-hot-toast";
import { addToCart, openCart, toggleCart } from "../store/cart";
import Loader from "./Loader";

const Products = ({ dark }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state for loading

  useEffect(() => {
    // Fetch categories and products from your API
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/categories`)
      .then((response) => {
        const categories = response.data;

        const promises = categories.map((category) => {
          // Fetch products for each category
          return axios
            .get(
              `${import.meta.env.VITE_BACKEND_URL}/products?menuId=${
                category._id
              }`
            )
            .then((productResponse) => {
              // Filter products where visible is true
              const visibleProducts = productResponse.data.filter(
                (product) => product.visible
              );
              return {
                category: category.name,
                menuId: category._id,
                extras: category.extras,
                products: visibleProducts,
              };
            });
        });

        // Wait for all product requests to complete
        return Promise.all(promises);
      })
      .then((data) => {
        setItems([
          {
            category: "Alle",
            menuId: 0,
            products: [],
          },
          ...data,
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const [activeMenu, setActiveMenu] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const handleModalOpen = (product, extras) => {
    if (product.options.length === 0) {
      toast.dismiss();
      toast.error("Keine option");
    } else if (product.options.length === 1 && extras.length === 0) {
      dispatch(
        addToCart({
          product,
          extras,
          price: product.options[0].price,
          quantity: 1,
        })
      );
      dispatch(openCart());
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
    } else {
      dispatch(setSelectedProduct(product));
      dispatch(setSelectedOption(product.options[0]));
      dispatch(resetTopping([]));
      dispatch(setTotalPrice(product.options[0].price));
      dispatch(setExtras(extras));
      dispatch(setIsModalOpen(true));
    }
  };

  const handleMenuChange = (id) => {
    setActiveMenu(id);
    setSearchQuery(""); // Clear search when changing category
  };

  // Filter products based on search query
  const filterProducts = (products) => {
    if (!searchQuery.trim()) return products;

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  // Get total products count for active category
  const getActiveProductsCount = () => {
    if (activeMenu === 0) {
      // Count all products across all categories
      return items.reduce((total, item) => {
        if (item.category !== "Alle") {
          const filtered = filterProducts(item.products);
          return total + filtered.length;
        }
        return total;
      }, 0);
    } else {
      const activeItem = items.find((item) => item.menuId === activeMenu);
      return activeItem ? filterProducts(activeItem.products).length : 0;
    }
  };

  return (
    <div
      className={`w-full min-h-screen ${
        dark
          ? "bg-gradient-to-b from-red-50/50 via-red-50/20 to-red-50/50 pb-8 sm:pb-12 md:pb-16 pt-20 md:pt-24 lg:pt-28"
          : "bg-gray-50 pt-20 md:pt-24 lg:pt-28"
      }`}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div className="max-w-screen-2xl mx-auto">
          {/* Enhanced Category Navigation with Search */}
          <div className="sticky top-16 md:top-20 lg:top-24 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
            <div className="px-6 md:px-12 lg:px-16 xl:px-20 py-4 md:py-6">
              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative max-w-xl md:max-w-none mx-auto md:mx-0">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Gerichte suchen..."
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-full focus:border-primary focus:outline-none transition-all duration-300 text-sm md:text-base"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Category Tabs */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-hide flex-1">
                  {items.map((item, i) => (
                    <motion.div
                      key={i}
                      onClick={() => handleMenuChange(item.menuId)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`
                        transition-all duration-300 ease-out cursor-pointer
                        px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap flex items-center space-x-2
                        ${
                          item.menuId === activeMenu
                            ? "bg-primary text-white border-2 border-primary shadow-lg shadow-primary/30 scale-105"
                            : "bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300 hover:text-gray-900"
                        }
                      `}
                    >
                      <span>{item.category}</span>
                      {item.menuId === activeMenu && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-1.5 h-1.5 bg-white rounded-full"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Results Counter */}
                <div className="hidden md:flex items-center ml-4 px-4 py-2 bg-gray-50 rounded-full whitespace-nowrap">
                  <span className="text-sm font-semibold text-gray-600">
                    {getActiveProductsCount()}{" "}
                    {getActiveProductsCount() === 1 ? "Gericht" : "Gerichte"}
                  </span>
                </div>
              </div>

              {/* Mobile Results Counter */}
              <div className="md:hidden flex justify-center">
                <div className="px-4 py-1.5 bg-gray-50 rounded-full">
                  <span className="text-xs font-semibold text-gray-600">
                    {getActiveProductsCount()} Gerichte gefunden
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 pt-6 md:pt-8 pb-8 md:pb-12 lg:pb-20">
            <AnimatePresence mode="wait">
              {items.map(
                (item, i) =>
                  (activeMenu === 0 || item.menuId === activeMenu) && (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      {item.category !== "Alle" && (
                        <div className="mb-6 md:mb-8 mt-4 md:mt-0">
                          <div className="flex items-center justify-between mb-3 md:mb-4">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <div className="w-1 h-6 sm:h-7 md:h-8 bg-gradient-to-b from-primary to-red-600 rounded-full" />
                              <h2 className="text-primary font-bold text-xl sm:text-2xl md:text-3xl">
                                {item.category}
                              </h2>
                            </div>
                            <div className="flex items-center space-x-2 bg-gray-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                                />
                              </svg>
                              <span className="text-gray-600 font-semibold text-xs sm:text-sm">
                                {item.products.length} Gerichte
                              </span>
                            </div>
                          </div>
                          <div className="w-full h-px bg-gradient-to-r from-primary via-gray-200 to-transparent mb-6 md:mb-8"></div>
                        </div>
                      )}
                      <motion.div
                        layout
                        className="flex flex-col space-y-4 sm:space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 lg:gap-6 px-1 sm:px-2 md:px-0"
                      >
                        {(() => {
                          const filteredProducts = filterProducts(
                            item.products
                          );
                          return filteredProducts.length > 0
                            ? filteredProducts.map(
                                (product, i) =>
                                  product.visible && (
                                    <motion.div
                                      key={product._id || i}
                                      layout
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.9 }}
                                      transition={{
                                        duration: 0.2,
                                        delay: i * 0.03,
                                      }}
                                    >
                                      <ProductCard
                                        product={product}
                                        onChooseOptions={() =>
                                          handleModalOpen(product, item.extras)
                                        }
                                        productsView={true}
                                      />
                                    </motion.div>
                                  )
                              )
                            : item.category !== "Alle" && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="col-span-full flex flex-col space-y-4 items-center justify-center py-20"
                                >
                                  <div className="relative">
                                    <img
                                      src={NoProducts}
                                      className="w-32 opacity-50"
                                      alt="Keine Produkte"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                                  </div>
                                  <div className="text-center">
                                    <p className="text-gray-600 font-semibold text-lg">
                                      {searchQuery
                                        ? "Keine Ergebnisse gefunden"
                                        : "Keine Gerichte gefunden"}
                                    </p>
                                    <p className="text-gray-400 text-sm mt-1">
                                      {searchQuery
                                        ? `Keine Gerichte entsprechen "${searchQuery}"`
                                        : "In dieser Kategorie sind derzeit keine Produkte verfügbar"}
                                    </p>
                                    {searchQuery && (
                                      <button
                                        onClick={() => setSearchQuery("")}
                                        className="mt-4 px-4 py-2 bg-primary text-white rounded-full text-sm hover:bg-red-600 transition-colors"
                                      >
                                        Suche zurücksetzen
                                      </button>
                                    )}
                                  </div>
                                </motion.div>
                              );
                        })()}
                      </motion.div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
