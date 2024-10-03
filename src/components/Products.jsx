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
import { addToCart, toggleCart } from "../store/cart";
import LoadingPage from "./LoadingPage";

const Products = ({ dark }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state for loading

  useEffect(() => {
    // Fetch categories and products from your API
    axios
      .get("https://tastykitchen-backend.vercel.app/categories") // Change the URL to your API endpoint
      .then((response) => {
        const categories = response.data;

        const promises = categories.map((category) => {
          // Fetch products for each category
          return axios
            .get(
              `https://tastykitchen-backend.vercel.app/products?menuId=${category._id}`
            ) // Change the URL to your API endpoint
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
      toast.dismiss();
      toast((t) => (
        <span className="text-xs md:text-sm flex items-center justify-center space-x-3">
          <b>Produkt hinzugefügt!</b>
          <button
            className="border border-[#e53935] text-[#e53935] rounded-md px-2 py-1"
            onClick={() => {
              dispatch(toggleCart());
              toast.dismiss();
            }}
          >
            Warenkorb
          </button>
        </span>
      ));
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
  };

  return (
    <div className={`w-full ${dark ? "bg-[#f5f5f5] pb-10 " : ""}`}>
      {isLoading ? (
       <LoadingPage />
      ) : (
        <div>
          <div className="flex px-6 md:px-20 space-x-3 shadow-inner pt-24 md:pt-28">
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
                    <div key={i}>
                      {item.category !== "Alle" && (
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
                        className=" flex flex-wrap md:grid gap-5 md:gap-14 justify-around"
                        style={{
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(300px, 1fr))", // Responsive column sizing
                        }}
                      >
                        {item.products.length > 0
                          ? item?.products.map(
                              (product, i) =>
                                product.visible && (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
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
                    </div>
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
