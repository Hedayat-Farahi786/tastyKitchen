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

const Menu = () => {
  const products = [
    // {
      // id: 1000,
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
      // id: 1001,
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
      menuId: 3,
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
      menuId: 3,
    },
    {
      name: "Chicken Nuggets 10x",
      description: "Tasty 10-piece chicken nuggets, Finger-licking good!",
      image:
        "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
      options: [
        {size: "Regular 10x", price: 5}
      ],
      menuId: 6,
    },
  ];

  const selectedToppings = useSelector(
    (state) => state.product.selectedToppings
  );

  const dispatch = useDispatch();

  const handleModalOpen = (product) => {
    if (product.options.length === 0) {
      alert("No option");
    } else if(product.options.length === 1 && selectedToppings.length === 0) {
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
          <button className="border border-[#e53935] text-[#e53935] rounded-md px-2 py-1" onClick={() => {
            dispatch(toggleCart());
            toast.dismiss();
          }}>
          Warenkorb
          </button>
        </span>
      ));
    } else {
      dispatch(setSelectedProduct(product));
      dispatch(setSelectedOption(product.options[0]));
      dispatch(resetTopping([]));
      dispatch(setTotalPrice(product.options[0].price));
      dispatch(setExtras(product));
      dispatch(setIsModalOpen(true));
    }
  };

  return (
    <div id="menu-section" className="flex flex-wrap gap-4 justify-center my-4 mb-10">
      <div className="w-full flex flex-col items-center justify-center space-y-2 my-8">
        <p className="text-primary font-bold text-2xl md:text-4xl text-center">Unsere Top drei Gerichte</p>
        <p className="font-semibold text-center text-xs md:text-base">Probieren Sie heute unsere drei top Gerichte.</p>
      </div>
      {products.map((product, i) => (
        <ProductCard
          key={i}
          product={product}
          onChooseOptions={() => handleModalOpen(product)}
          productsView={false}
        />
      ))}
    </div>
  );
};

export default Menu;
