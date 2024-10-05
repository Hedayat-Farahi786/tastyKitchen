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
import { addToCart, openCart } from "../store/cart";
import { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch top 3 products with extras from your API
    axios
      .get("https://tastykitchen-backend.vercel.app/products/top")
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
      toast.dismiss();
      toast((t) => (
        <span className="text-xs md:text-sm flex items-center justify-center space-x-3">
          <b>Produkt hinzugefügt!</b>
          <button
            className="border border-[#e53935] text-[#e53935] rounded-md px-2 py-1"
            onClick={() => {
              dispatch(openCart());
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
      {loading ? (
        // Render skeleton loaders while data is loading
        Array(3)
          .fill()
          .map((_, i) => (
            <div key={i} className="w-80 p-4">
              <Skeleton height={200} />
              <Skeleton count={2} />
            </div>
          ))
      ) : (
        // Render the actual product cards once data is loaded
        products.map((item, i) => (
          <ProductCard
            key={i}
            product={item.product}
            onChooseOptions={() => handleModalOpen(item.product, item.extras)}
            productsView={false}
          />
        ))
      )}
    </div>
  );
};

export default Menu;
