import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";

const Menu = () => {
  // Sample product data - Replace this with your actual product data

  const products = [
    // {
    //   name: "Salami Pizza",
    //   description: "Tomato sauce, Cheese, and Salami",
    //   image:
    //     "https://www.bofrost.de/medias/01781-DE-pizza-con-salame-pic1.jpg-W1400xH1400R1.1?context=bWFzdGVyfHByb2R1Y3QtaW1hZ2VzfDExMzAyOTd8aW1hZ2UvanBlZ3xoODQvaDU4Lzk0MDcyMjE4MjU1NjYvMDE3ODFfREVfcGl6emEtY29uLXNhbGFtZV9waWMxLmpwZ19XMTQwMHhIMTQwMFIxLjF8YjRjY2FkZmZhZjRlMzU5NmUyYzU0ZjEzOTcxZmExM2ZhMDI2Yjk5YjMxZTkwOGMzZDQ4Y2QxODJhOTRiOGU0Nw",
    //   optionsTitle: "Select as size",
    //   options: [
    //     { size: "Single, Ø 26cm", price: 7.9 },
    //     { size: "Jumbo, Ø 32cm", price: 10.9 },
    //     { size: "Family, Ø 46cm x 33cm", price: 17.9 },
    //     { size: "Party, Ø 60cm x 40cm", price: 19.9 },
    //   ],
    //   menuId: 0,
    // },
    // {
    //   name: "Funghi Pizza",
    //   description: "Tomato sauce, Cheese, and Mushroom",
    //   image:
    //     "https://i0.wp.com/neffisso.de/wp-content/uploads/2022/06/Pizza-Funghi-scaled.jpg?fit=704%2C463&ssl=1",
    //   optionsTitle: "Select as size",
    //   options: [
    //     { size: "Single, Ø 26cm", price: 7.9 },
    //     { size: "Jumbo, Ø 32cm", price: 10.9 },
    //     { size: "Family, Ø 46cm x 33cm", price: 17.9 },
    //     { size: "Party, Ø 60cm x 40cm", price: 19.9 },
    //   ],
    //   menuId: 0,
    // },
    {
      name: "Chicken Burger",
      description: "Crispy Chicken, Salad, Mayonaise, Totmato and Onion",
      image:
        "https://www.recipetineats.com/wp-content/uploads/2019/08/Avocado-Chicken-Burgers_9.jpg",
      optionsTitle: "Your bun",
      options: [
        { size: "Sesame bun", price: 6.9 },
        { size: "Brioche bun", price: 7.9 },
        { size: "Wholegrain bun", price: 7.9 },
      ],
      menuId: 1,
    },
    {
      name: "Cheese Burger",
      description:
        "Beef, tomatoes, lettuce, burger sauce, onions, pickles and cheddar cheese",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=999&q=80",
      optionsTitle: "Your bun",
      options: [
        { size: "Sesame bun", price: 6.9 },
        { size: "Brioche bun", price: 7.9 },
        { size: "Wholegrain bun", price: 7.9 },
      ],
      menuId: 1,
    },
    {
      name: "Chicken Nuggets 10x",
      description: "Tasty 10-piece chicken nuggets, Finger-licking good!",
      image:
        "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
      options: [],
      menuId: 2,
    },
  ];

  const burgerToppings = [
    {
      name: "Bacon",
      price: 1.0,
    },
    {
      name: "Fleisch, 125g extra",
      price: 2.2,
    },
    {
      name: "Guacamole, hausgemach",
      price: 1.2,
    },
    {
      name: "Jalapenos",
      price: 0.6,
    },
    {
      name: "Käse",
      price: 0.6,
    },
  ];

  const pizzaToppings = [
    {
      name: "Ananas",
      price: 1.5,
    },
    {
      name: "Artischocken",
      price: 2.0,
    },
    {
      name: "Baconwürfeln",
      price: 2.5,
    },
    {
      name: "Barbecuesause",
      price: 2.0,
    },
    {
      name: "Champignons",
      price: 1.5,
    },
    {
      name: "Creme Fraiche",
      price: 2.0,
    },
    {
      name: "Gorgonzola",
      price: 2.0,
    },
    {
      name: "Gouda, extra",
      price: 2.0,
    },
    {
      name: "Hackfleisch",
      price: 2.5,
    },
    {
      name: "Hähnchenfleisch",
      price: 2.0,
    },
    {
      name: "Jalapenos",
      price: 1.5,
    },
    {
      name: "Knoblauch-Öl",
      price: 1.5,
    },
    {
      name: "Mais",
      price: 1.5,
    },
    {
      name: "Meeresfrüchten",
      price: 2.5,
    },
    {
      name: "Mozzarella",
      price: 2.0,
    },
    {
      name: "Öl, scharf",
      price: 1.5,
    },
    {
      name: "Oliven",
      price: 1.5,
    },
    {
      name: "Parmesan",
      price: 2.0,
    },
    {
      name: "Peperoni",
      price: 1.5,
    },
    {
      name: "Peperoni-Salami, Halal",
      price: 2.0,
    },
    {
      name: "Putenbrust, geräuchert",
      price: 2.5,
    },
    {
      name: "Rucola",
      price: 1.5,
    },
    {
      name: "Salami",
      price: 2.0,
    },
    {
      name: "Salami, Rind",
      price: 2.0,
    },
    {
      name: "Sauce Hollandaise",
      price: 2.0,
    },
    {
      name: "Schinken",
      price: 2.0,
    },
    {
      name: "Spinat",
      price: 1.5,
    },
    {
      name: "Sucuk",
      price: 2.0,
    },
    {
      name: "Thunfisch",
      price: 2.0,
    },
    {
      name: "Tomaten",
      price: 1.5,
    },
    {
      name: "Trüffel-Öl",
      price: 2.5,
    },
    {
      name: "Zwiebeln",
      price: 1.5,
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]); // Store selected pizzaToppings as an array
  const [extras, setExtras] = useState([]); // Store selected pizzaToppings as an array
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleModalOpen = (product) => {
    if (product.options.length === 0) {
      alert("No option");
    } else {
      setSelectedProduct(product);
      setSelectedOption(product.options[0]);
      setSelectedToppings([]);
      setTotalPrice(product.options[0].price);
      setExtras(product.menuId === 0 ? pizzaToppings : burgerToppings);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleToppingsChange = (topping) => {
    setSelectedToppings((prevToppings) =>
      prevToppings.some((item) => item.name === topping.name)
        ? prevToppings.filter((item) => item.name !== topping.name)
        : [...prevToppings, topping]
    );
  };

  const handleAddToBasket = () => {
    // Implement the logic to add the product to the basket
    // You can use selectedProduct, selectedOption, and quantity in this function
    alert(
      `Added to basket: ${selectedProduct.name}, Size: ${selectedOption.size}, Quantity: ${quantity}`
    );
    setIsModalOpen(false);
  };

  useEffect(() => {
    let totalPrice = selectedOption?.price || 0;
    selectedToppings.forEach((topping) => {
      totalPrice += topping.price;
    });
    setTotalPrice(totalPrice * quantity);
  }, [selectedOption, selectedToppings, quantity]);

  return (
    <div className="flex flex-wrap gap-4 justify-center my-4 mb-10">
      <div className="w-full flex flex-col items-center justify-center space-y-2 my-8">
        <p className="text-primary font-bold text-4xl">Our top three meals</p>
        <p className="font-semibold">Try our five best meals today.</p>
      </div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          description={product.description}
          options={product.options}
          image={product.image}
          onChooseOptions={() => handleModalOpen(product)}
        />
      ))}

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
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 cursor-pointer"
                  onClick={handleModalClose}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="bg-gray-100 p-5 rounded overflow-y-scroll max-h-11/12">
                {selectedProduct.options.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-semibold mb-2">Select a size</p>
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
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 bg-gray-200 text-2xl rounded-full focus:outline-none"
                    >
                      -
                    </button>
                    <p className="font-medium text-lg">{quantity}</p>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
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
  );
};

export default Menu;
