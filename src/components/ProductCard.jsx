import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ name, description, options, image }) => {
  const [selectedOption, setSelectedOption] = useState(options.length > 0 ? options[0] : null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <motion.div
      className="w-90 shadow-lg rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:shadow-xl"
    >
      <img src={image} alt={name} className="h-56 max-h-72 w-full object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-1">{name}</h2>
        <p className="text-gray-600 text-xs">{description}</p>

        <div className="flex text-xs flex-wrap gap-3 mt-8">
          {options.map((option) => (
            <button
              key={option.size}
              onClick={() => handleOptionChange(option)}
              className={`${
                selectedOption === option ? 'bg-[#E53935] text-white' : 'bg-gray-200 text-gray-800'
              } font-semibold py-1 px-2 rounded-lg text-xs transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none`}
            >
              {option.size}
            </button>
          ))}
        </div>

        <div className="flex items-end justify-between mt-4">
          <p className="font-semibold text-base">{selectedOption ? selectedOption.price.toFixed(2) : options[0].price.toFixed(2)}€</p>
          <button
            className={`mt-4 ${
              selectedOption
                ? 'bg-[#E53935] hover:bg-[#D32F2F]'
                : 'bg-gray-400 pointer-events-none'
            } text-white font-medium py-2 px-4 rounded shadow text-sm cursor-pointer`}
            disabled={!selectedOption}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
