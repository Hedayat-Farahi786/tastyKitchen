import React, { useState } from "react";
import { motion } from "framer-motion";

const pizzaSizes = [
  { name: "Small", price: 8 },
  { name: "Medium", price: 10 },
  { name: "Large", price: 12 },
];

const Builder = () => {
  const [selectedSize, setSelectedSize] = useState(pizzaSizes[0]);
  const [ingredients, setIngredients] = useState([]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleIngredientClick = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  const handleOrderClick = () => {
    // Implement the order functionality here
    console.log("Ordered!");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center h-screen">
      {/* Left Panel - Pizza Options */}
      <div className="w-full sm:w-1/4 px-4">
        <h2 className="text-xl font-bold mb-4">Choose your size:</h2>
        {pizzaSizes.map((size) => (
          <button
            key={size.name}
            className={`w-full px-4 py-2 text-white font-semibold rounded-lg mb-2 ${
              size === selectedSize ? "bg-green-500" : "bg-gray-500"
            }`}
            onClick={() => handleSizeChange(size)}
          >
            {size.name} (${size.price})
          </button>
        ))}
        {/* Add other pizza options here (e.g., crust, sauce, etc.) */}
      </div>

      {/* Middle Panel - Pizza */}
      <motion.div
        className="w-full sm:w-1/2 relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <img
          src="https://www.kindpng.com/picc/m/74-742450_elote-cart-pizza-base-pizza-dough-clipart-hd.png"
          alt="Pizza"
          className="w-full"
          style={{ maxWidth: "400px" }}
        />
        {ingredients.map((ingredient, index) => (
          <motion.img
            key={index}
            src={`/ingredients/${ingredient}.png`}
            alt={ingredient}
            className="absolute"
            style={{ maxWidth: "50px" }}
            initial={{ y: -100, x: 100, opacity: 0 }}
            animate={{ y: 0, x: 0, opacity: 1 }}
          />
        ))}
      </motion.div>

      {/* Right Panel - Ingredients */}
      <div className="w-full sm:w-1/4 px-4">
        <h2 className="text-xl font-bold mb-4">Choose ingredients:</h2>
        <div className="flex flex-wrap">
          {/* You can use your own list of ingredients */}
          {[
            "pepperoni",
            "mushrooms",
            "bell_peppers",
            "onions",
            "olives",
            // Add more ingredients
          ].map((ingredient) => (
            <button
              key={ingredient}
              className="w-1/2 px-4 py-2 text-white font-semibold rounded-lg mb-2 bg-purple-500"
              onClick={() => handleIngredientClick(ingredient)}
            >
              {ingredient.replace("_", " ")}
            </button>
          ))}
        </div>
        <button
          className="w-full px-4 py-2 text-white font-semibold rounded-lg mt-4 bg-blue-500"
          onClick={handleOrderClick}
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default Builder;
