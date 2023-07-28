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
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NoProducts from "../assets/productNoResult.png";

const Products = () => {
  const items = [
    {
      category: "All",
      menuId: 0,
      products: [],
    },
    {
      category: "Pizza",
      menuId: 1,
      products: [
        {
            id: 1000,
          name: "Salami Pizza",
          description: "Tomato sauce, Cheese, and Salami",
          image:
            "https://www.bofrost.de/medias/01781-DE-pizza-con-salame-pic1.jpg-W1400xH1400R1.1?context=bWFzdGVyfHByb2R1Y3QtaW1hZ2VzfDExMzAyOTd8aW1hZ2UvanBlZ3xoODQvaDU4Lzk0MDcyMjE4MjU1NjYvMDE3ODFfREVfcGl6emEtY29uLXNhbGFtZV9waWMxLmpwZ19XMTQwMHhIMTQwMFIxLjF8YjRjY2FkZmZhZjRlMzU5NmUyYzU0ZjEzOTcxZmExM2ZhMDI2Yjk5YjMxZTkwOGMzZDQ4Y2QxODJhOTRiOGU0Nw",
          optionsTitle: "Select as size",
          options: [
            { size: "Single, Ø 26cm", price: 7.9 },
            { size: "Jumbo, Ø 32cm", price: 10.9 },
            { size: "Family, Ø 46cm x 33cm", price: 17.9 },
            { size: "Party, Ø 60cm x 40cm", price: 19.9 },
          ],
          menuId: 1,
        },
        {
            id: 1001,
          name: "Funghi Pizza",
          description: "Tomato sauce, Cheese, and Mushroom",
          image:
            "https://i0.wp.com/neffisso.de/wp-content/uploads/2022/06/Pizza-Funghi-scaled.jpg?fit=704%2C463&ssl=1",
          optionsTitle: "Select as size",
          options: [
            { size: "Single, Ø 26cm", price: 7.9 },
            { size: "Jumbo, Ø 32cm", price: 10.9 },
            { size: "Family, Ø 46cm x 33cm", price: 17.9 },
            { size: "Party, Ø 60cm x 40cm", price: 19.9 },
          ],
          menuId: 1,
        },
      ],
    },
    {
      category: "Burgers",
      menuId: 2,
      products: [
        {
            id: 2000,
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
          menuId: 2,
        },
        {
            id: 2001,
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
          menuId: 2,
        },
      ],
    },
  ];

  const [activeMenu, setActiveMenu] = useState(0);

  const dispatch = useDispatch();

  const handleModalOpen = (product) => {
    if (product.options.length === 0) {
      alert("No option");
    } else {
      dispatch(setSelectedProduct(product));
      dispatch(setSelectedOption(product.options[0]));
      dispatch(resetTopping([]));
      dispatch(setTotalPrice(product.options[0].price));
      dispatch(setExtras(product));
      dispatch(setIsModalOpen(true));
    }
  };

  const handleMenuChange = (id) => {
    setActiveMenu(id);
  };

  return (
    <div className="w-full">
      <div className="flex px-6 md:px-20 space-x-3 pt-24 md:pt-28">
        {items.map((item, i) => (
          <div
            onClick={() => handleMenuChange(item.menuId)}
            key={i}
            className={`
            transition-all duration-200 linear border rounded-full px-4 py-1 border-gray-300 text-sm cursor-pointer ${
              item.menuId === activeMenu
                ? "bg-red-500 text-white font-bold"
                : ""
            }
            `}
          >
            <p>{item.category}</p>
          </div>
        ))}
      </div>

      <div className="w-full px-6 md:px-20 mb-20">
        <AnimatePresence>
          {items.map(
            (item, i) =>
              (activeMenu === 0 || item.menuId === activeMenu) && (
                <>
                  {item.category !== "All" && (
                    <div className="mt-10">
                      <div className="flex items-center justify-between">
                        <p className="text-primary font-semibold text-xl">
                          {item.category}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {item.products.length} items
                        </p>
                      </div>
                      <div className="w-full h-[1px] bg-gray-300 mb-5"></div>
                    </div>
                  )}
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className=" flex flex-wrap md:grid gap-5 md:gap-14"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(300px, 1fr))", // Responsive column sizing
                    }}
                  >
                    {item.products.length > 0
                      ? item?.products.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <ProductCard
                              product={item}
                              onChooseOptions={() => handleModalOpen(item)}
                              productsView={true}
                            />
                          </motion.div>
                        ))
                      : item.category !== "All" && (
                          <div className="flex flex-col space-y-2 mt-5 items-center justify-center w-full">
                            <img
                              src={NoProducts}
                              className="w-20"
                              alt="No items"
                            />
                            <p className="text-gray-500 text-sm">
                              No items Found
                            </p>
                          </div>
                        )}
                  </motion.div>
                </>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Products;
