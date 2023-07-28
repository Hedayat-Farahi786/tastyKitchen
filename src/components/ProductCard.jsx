import { motion } from "framer-motion";
import { useState } from "react";

const ProductCard = ({ product, onChooseOptions, productsView }) => {
  const [isProductsView, setIsProductsView] = useState(productsView);

  return (
    <motion.div
      onClick={onChooseOptions}
      className={`md:w-72 ${
        isProductsView ? "w-44" : "w-80"
      } cursor-pointer flex flex-col items-start justify-between shadow-lg rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:shadow-xl`}
    >
      <img
        src={product.image}
        alt={product.name}
        className={`${
          isProductsView ? "h-32" : "h-56"
        } md:h-56 max-h-72 w-full object-cover`}
      />
      {isProductsView}
      <div className="px-4 pt-4">
        <h2
          className={`${
            isProductsView ? "text-sm" : "text-lg"
          } md:text-lg font-semibold mb-2`}
        >
          {product.name}
        </h2>
        <p
          className={`text-gray-600 ${
            isProductsView ? "text-[10px]" : "text-xs"
          } md:text-xs`}
        >
          {product.description}
        </p>
      </div>
      <div
        className={`w-full flex items-end justify-end ${
          isProductsView ? "mt-2" : "mt-5"
        } md:mt-5`}
      >
        <div
          className={`w-full flex items-center justify-center space-x-2 transition-all duration-200 linear hover:bg-[#e53935] hover:text-white text-primary px-4 ${
            isProductsView ? "py-1" : "py-2"
          } md:py-2 rounded-br-lg rounded-bl-lg border border-[#E53935]`}
        >
          <p className={`${isProductsView ? "text-xs" : "text-sm"} md:text-sm`}>
            Add to cart
          </p>
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
