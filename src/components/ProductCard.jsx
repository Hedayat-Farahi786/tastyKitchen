import { motion } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";

const ProductCard = ({ product, onChooseOptions, productsView }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isProductsView = productsView;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onChooseOptions) {
      onChooseOptions();
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className={`${
        isProductsView ? "w-full" : "w-full max-w-sm"
      } cursor-pointer flex ${
        isProductsView ? "flex-row md:flex-col" : "flex-col"
      } bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-primary/40 hover:shadow-xl transition-all duration-200 ease-out group relative`}
    >
      {/* Image Container - Full Width Creative Display */}
      <div
        className={`relative flex-shrink-0 overflow-hidden ${
          isProductsView
            ? "w-44 h-44 md:w-full md:h-72 md:rounded-t-3xl rounded-l-3xl md:rounded-l-none"
            : "w-full h-80 rounded-t-3xl"
        }`}
      >
        {imageError ? (
          /* Beautiful Placeholder for Missing Images - Mobile Responsive */
          <div className="w-full h-full bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Decorative Background Circles - Scaled for mobile */}
            <div className="absolute top-0 right-0 w-16 h-16 md:w-32 md:h-32 bg-primary/10 rounded-full blur-2xl md:blur-3xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 md:w-40 md:h-40 bg-orange-400/10 rounded-full blur-2xl md:blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-48 md:h-48 bg-yellow-400/10 rounded-full blur-2xl md:blur-3xl" />

            {/* Icon Container - Responsive sizing */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 bg-white/80 backdrop-blur-sm p-3 sm:p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl shadow-lg border border-white/50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-primary"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>

            {/* Text - Mobile responsive */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="relative z-10 mt-2 sm:mt-3 md:mt-4 text-gray-600 font-semibold text-xs sm:text-sm md:text-base text-center px-2 sm:px-4"
            >
              Bild nicht verfügbar
            </motion.p>

            {/* Decorative Dots Pattern - Responsive positioning */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full" />
              <div className="absolute top-4 left-6 sm:top-8 sm:left-12 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-orange-500 rounded-full" />
              <div className="absolute top-6 right-4 sm:top-12 sm:right-8 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-500 rounded-full" />
              <div className="absolute bottom-6 left-4 sm:bottom-12 sm:left-8 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-red-400 rounded-full" />
              <div className="absolute bottom-3 right-6 sm:bottom-6 sm:right-12 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full" />
            </div>
          </div>
        ) : (
          <>
            <motion.img
              src={product.image}
              alt={product.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              style={{
                objectPosition: "center",
              }}
            />
          </>
        )}
        {/* Creative Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Decorative Corner Element */}
        <div
          className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        />

        {/* Price Badge - Enhanced Design */}
        {product?.options[0]?.price && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className={`absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-sm text-primary ${
              isProductsView
                ? "px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 text-sm sm:text-base"
                : "px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base"
            } rounded-xl sm:rounded-2xl font-bold border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-200`}
          >
            {product.options[0].price.toFixed(2)} €
          </motion.div>
        )}

        {/* View Details Hint - Appears on Hover */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.15 }}
          className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold text-gray-700 shadow-lg whitespace-nowrap hidden sm:block"
        >
          Zum Anpassen klicken
        </motion.div>
      </div>

      {/* Content Section */}
      <div
        className={`${
          isProductsView ? "p-4 md:p-6" : "p-6"
        } flex-1 flex flex-col`}
      >
        <div className="flex-1 mb-3 md:mb-4">
          <h2
            className={`${
              isProductsView ? "text-base md:text-lg" : "text-xl"
            } font-bold text-gray-900 mb-1.5 md:mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300`}
          >
            {product.name}
          </h2>
          <p
            className={`text-gray-500 ${
              isProductsView ? "text-xs md:text-sm" : "text-sm"
            } line-clamp-2 md:line-clamp-3 leading-relaxed`}
          >
            {product.description || "Leckeres Gericht aus frischen Zutaten"}
          </p>
        </div>

        {/* Action Button - Clean White Design */}
        <motion.div
          className="w-full"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div
            className={`bg-white border-2 border-primary ${
              isProductsView ? "px-3 py-2 md:px-4 md:py-3" : "px-4 py-3"
            } rounded-xl font-semibold text-center flex items-center justify-center space-x-2 group/button hover:bg-primary transition-all duration-300`}
          >
            <span
              className={`text-primary group-hover/button:text-white transition-colors duration-300 ${
                isProductsView ? "text-xs md:text-sm" : "text-base"
              }`}
            >
              Optionen wählen
            </span>
            <motion.svg
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className={`text-primary group-hover/button:text-white transition-colors duration-300 ${
                isProductsView ? "w-4 h-4 md:w-5 md:h-5" : "w-5 h-5"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </motion.svg>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    visible: PropTypes.bool,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  onChooseOptions: PropTypes.func.isRequired,
  productsView: PropTypes.bool,
};

export default ProductCard;
