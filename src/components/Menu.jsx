import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setSelectedProduct,
  setSelectedOption,
  setSelectedToppings,
  setExtras,
  setTotalPrice,
  setIsModalOpen,
  resetTopping,
} from "../store/productSlice";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";
import { addToCart, openCart } from "../store/cart";
import { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch top 3 products with extras from your API
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/products/top`)
      .then((response) => {
        const topProducts = response.data;
        setProducts(topProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching top products:", error);
        setLoading(false);
      });
  }, []);

  const selectedToppings = useSelector(
    (state) => state.product.selectedToppings
  );

  const dispatch = useDispatch();

  const handleModalOpen = (product, extras) => {
    if (product.options.length === 0) {
      toast.error("Keine option");
    } else if (extras.length === 0) {
      dispatch(
        addToCart({
          product: product,
          extras: selectedToppings,
          price: product.options[0].price,
          quantity: 1,
        })
      );
      dispatch(setIsModalOpen(false));
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

  return (
    <div
      id="menu-section"
      className="w-full py-10 sm:py-12 md:py-16 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-4 h-4 sm:w-5 sm:h-5 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
            <span className="text-primary font-semibold text-xs sm:text-sm">
              Unsere Bestseller
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Top <span className="text-primary">Drei</span> Gerichte
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Entdecken Sie unsere beliebtesten Gerichte, mit Liebe zubereitet und
            von unseren Gästen am meisten geschätzt
          </p>
          <div className="mt-4 sm:mt-6 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75" />
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150" />
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {loading
            ? // Enhanced skeleton loaders
              Array(3)
                .fill()
                .map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-md"
                  >
                    <Skeleton height={256} className="rounded-t-2xl" />
                    <div className="p-6">
                      <Skeleton height={28} width="80%" className="mb-3" />
                      <Skeleton count={2} className="mb-4" />
                      <Skeleton height={48} className="rounded-xl" />
                    </div>
                  </motion.div>
                ))
            : // Render the actual product cards with stagger animation
              products.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: i * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <ProductCard
                    product={item.product}
                    onChooseOptions={() =>
                      handleModalOpen(item.product, item.extras)
                    }
                    productsView={false}
                  />
                </motion.div>
              ))}
        </div>

        {/* Call to Action */}
        {!loading && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="text-center mt-8 sm:mt-10 md:mt-12"
          >
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              style={{ backgroundColor: "#e53935" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#d32f2f")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#e53935")
              }
            >
              <span>Alle Gerichte ansehen</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Menu;
