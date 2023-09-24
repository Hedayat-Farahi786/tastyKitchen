import { useDispatch, useSelector } from "react-redux";
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
import { addToCart, toggleCart } from "../store/cart";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Menu = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch top 3 products with extras from your API
    axios
      .get("https://tastykitchen-backend.vercel.app/products/top") // Change the URL to your API endpoint
      .then((response) => {
        const topProducts = response.data;
        setProducts(topProducts);
      })
      .catch((error) => {
        console.error("Error fetching top products:", error);
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

  return (
    <div
      id="menu-section"
      className="flex flex-wrap gap-4 justify-center my-4 mb-10"
    >
      <div className="w-full flex flex-col items-center justify-center space-y-2 my-8">
        <p className="text-primary font-bold text-2xl md:text-4xl text-center">
          Unsere Top drei Gerichte
        </p>
        <p className="font-semibold text-center text-xs md:text-base">
          Probieren Sie heute unsere drei top Gerichte.
        </p>
      </div>
      {products.map((item, i) => (
        <ProductCard
          key={i}
          product={item.product}
          onChooseOptions={() => handleModalOpen(item.product, item.extras)}
          productsView={false}
        />
      ))}
    </div>
  );
};

export default Menu;
