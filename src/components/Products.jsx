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
      category: "Alle",
      menuId: 0,
      products: [],
    },
    {
      category: "Salate",
      menuId: 1,
      products: [
        {
          id: 1,
          name: "Tomatensalat",
          description: "mit Zwiebeln",
          image:
            "https://images.unsplash.com/photo-1623855244183-52fd8d3ce2f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dG9tYXRvJTIwc2FsYWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
          price: 5.4,
          optionsTitle: "",
          options: [{ price: 5.4, size: "Regular" }],
          menuId: 1
        },
        {
          id: 2,
          name: "Gurkensalat",
          image:
            "https://images.unsplash.com/photo-1610903122389-3674aafb17a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3VjdW1iZXIlMjBzYWxhZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
          description:
            "Klassischer Gurkensalat mit würzigem Essig-Öl-Dill-Dressing.",
          price: 4.9,
          optionsTitle: "",
          options: [{ price: 4.9, size: "Regular" }],
          menuId: 1
        },
        {
          id: 3,
          name: "Gemischter Salat",
          image:
            "https://www.justspices.de/media/recipe/resized/510x510/recipe/k/u/kuechen_kraeuter_dressing_mix_gruener_salat_mit_gurke_tomate_mais-3.jpg",
          description:
            "mit Salatmix, Cherrytomaten, Ruccola, Gurken, Tomaten, Mais und Oliven",
          price: 6.2,
          optionsTitle: "",
          options: [{ price: 6.2, size: "Regular" }],
          menuId: 1
        },
        {
          id: 4,
          name: "Caesar Salat",
          image: "https://www.koch-mit.de/app/uploads/2020/08/caesarsalad4.jpg",
          description:
            "mit Salatmix, Tomaten, Gurken, Hähnchenbrustfilet, Parmesan und Croutons",
          price: 8.6,
          optionsTitle: "",
          options: [{ price: 8.6, size: "Regular" }],
          menuId: 1
        },
        {
          id: 5,
          name: "Nizza Salat",
          image:
            "https://www.body.kitchen/wp-content/uploads/2020/06/1833_5ede26f962e695ebb35ba482_Nizza-Salat201-scaled.jpg",
          description: "mit Salatmix, Thunfisch, Ei, Oliven und Zwiebeln",
          price: 8.4,
          optionsTitle: "",
          options: [{ price: 8.4, size: "Regular" }],
          menuId: 1
        },
        {
          id: 6,
          name: "Chef Salat",
          image:
            "https://www.gusto.at/_storage/asset/7239190/storage/womanat:slideshow-large/file/168528210/2011-08-071.jpg",
          description: "mit Salatmix, Schinken, Käse, Oliven und Ei",
          price: 8.4,
          optionsTitle: "",
          options: [{ price: 8.4, size: "Regular" }],
          menuId: 1
        },
        {
          id: 7,
          name: "Tasty Salat",
          image:
            "https://www.curiouscuisiniere.com/wp-content/uploads/2017/07/Kachumbari-African-Tomato-and-Onion-Salad-2546.21.jpg",
          description:
            "mit Salatmix, Artischocken, Oliven, Peperoni, Ei, Thunfisch, Käse und Mais",
          price: 8.9,
          optionsTitle: "",
          options: [{ price: 8.9, size: "Regular" }],
          menuId: 1
        },
        {
          id: 8,
          name: "Tomaten Mozzarella",
          image:
            "https://utopia.de/app/uploads/2019/05/tomate-mozzarella-salat-cc0-pixabay-stocksnap-190508.jpg",
          description: "",
          price: 6.9,
          optionsTitle: "",
          options: [{ price: 6.9, size: "Regular" }],
          menuId: 1
        },
        {
          id: 9,
          name: "Griechischer Salat",
          image:
            "https://leckereideen.com/wp-content/uploads/2023/04/Griechischer-Bauernsalat3.jpg",
          description: "mit Salatmix, Schafskäse, Peperoni und Oliven",
          price: 8.4,
          optionsTitle: "",
          options: [{ price: 8.4, size: "Regular" }],
          menuId: 1
        },
        {
          id: 10,
          name: "Crunchy Chicken Salat",
          image:
            "https://img.hellofresh.com/hellofresh_s3/image/63c977ad8f06715cb60a065e-8abe2fd2.jpg",
          description: "mit Salatmix, Crunchy Chicken, Mais und Rucola",
          price: 8.9,
          optionsTitle: "",
          options: [{ price: 8.9, size: "Regular" }],
          menuId: 1
        },
      ],
    },
    {
      category: "Pizza",
      menuId: 2,
      products: [
        {
          id: 11,
          name: "Pizza Margherita",
          description: "Tomato sauce, Cheese, and Salami",
          image:
            "https://shop.eismann.de/upload/product-detail-theme/de/3181-pizza-margherita-F-20230118.jpg",
          optionsTitle: "Select as size",
          options: [
            { size: "Single, Ø 26cm", price: 7.5 },
            { size: "Jumbo, Ø 32cm", price: 10.9 },
            { size: "Family, Ø 46cm x 33cm", price: 18.9 },
            { size: "Party, Ø 60cm x 40cm", price: 20.9 },
          ],
          menuId: 2,
        },
        {
          id: 12,
          name: "Pizza Prosciutto",
          description: "Mit Schinken",
          image:
            "https://shop.brauereilocher.ch/files/appenzeller-bier/shop/brewbee/Brewbee%20V3/pizza-prosciutto-brewbee-brauerei-locher-produkt.jpg",
          optionsTitle: "Select as size",
          options: [
            { size: "Single, Ø 26cm", price: 8.9 },
            { size: "Jumbo, Ø 32cm", price: 12.9 },
            { size: "Family, Ø 46cm x 33cm", price: 20.9 },
            { size: "Party, Ø 60cm x 40cm", price: 22.9 },
          ],
          menuId: 2,
        },
        {
          id: 13,
          name: "Pizza Salami",
          description: "Tomato sauce, Cheese, and Salami",
          image:
            "https://www.bofrost.de/medias/01781-DE-pizza-con-salame-pic1.jpg-W1400xH1400R1.1?context=bWFzdGVyfHByb2R1Y3QtaW1hZ2VzfDExMzAyOTd8aW1hZ2UvanBlZ3xoODQvaDU4Lzk0MDcyMjE4MjU1NjYvMDE3ODFfREVfcGl6emEtY29uLXNhbGFtZV9waWMxLmpwZ19XMTQwMHhIMTQwMFIxLjF8YjRjY2FkZmZhZjRlMzU5NmUyYzU0ZjEzOTcxZmExM2ZhMDI2Yjk5YjMxZTkwOGMzZDQ4Y2QxODJhOTRiOGU0Nw",
          optionsTitle: "Select as size",
          options: [
            { size: "Single, Ø 26cm", price: 8.9 },
            { size: "Jumbo, Ø 32cm", price: 12.9 },
            { size: "Family, Ø 46cm x 33cm", price: 20.9 },
            { size: "Party, Ø 60cm x 40cm", price: 22.9 },
          ],
          menuId: 2,
        },
        {
          id: 14,
          name: "Pizza Funghi",
          description: "Tomato sauce, Cheese, and Mushroom",
          image:
            "https://i0.wp.com/neffisso.de/wp-content/uploads/2022/06/Pizza-Funghi-scaled.jpg?fit=704%2C463&ssl=1",
          optionsTitle: "Select as size",
          options: [
            { size: "Single, Ø 26cm", price: 8.5 },
            { size: "Jumbo, Ø 32cm", price: 12.5 },
            { size: "Family, Ø 46cm x 33cm", price: 20.5 },
            { size: "Party, Ø 60cm x 40cm", price: 22.5 },
          ],
          menuId: 2,
        },
        {
          id: 15,
          name: "Pizza Diabolo",
          description: "Mit Salami und grünen Peperoni",
          image: "https://www.lieferando.de/foodwiki/uploads/sites/8/2019/04/pizza-diavolo-1080x1080.jpg",         
            optionsTitle: "Select as size",
          options: [
            { size: "Single, Ø 26cm", price: 10.9 },
            { size: "Jumbo, Ø 32cm", price: 13.9 },
            { size: "Family, Ø 46cm x 33cm", price: 21.9 },
            { size: "Party, Ø 60cm x 40cm", price: 24.9 },
          ],
          menuId: 2,
        },
        {
          id: 16,
          name: "Pizza Narcos",
          description: "Mit geräucherter Putenbrust, Jalapenos, Sauce Hollandaise und Beef",
          image: "https://objedname.eu/user-data/factories/285/imgs/items/35222.png",
          optionsTitle: "Select as size",
          options: [
            { size: "Single, Ø 26cm", price: 11.9 },
            { size: "Jumbo, Ø 32cm", price: 14.9 },
            { size: "Family, Ø 46cm x 33cm", price: 25.9 },
            { size: "Party, Ø 60cm x 40cm", price: 28.9 },
          ],
          menuId: 2,
        },
        {
          id: 16,
          name: "Pizza Capricciosa",
          description: "mit Schinken, Oliven, Champignons, Artischocken und Peperoni",
          image: "https://antonios-penzberg.de/wp-content/uploads/2019/01/pizza-capricciosa.jpg",
          optionsTitle: "Select as size",
          options: [
            { size: "Single, Ø 26cm", price: 11.9 },
            { size: "Jumbo, Ø 32cm", price: 15.9 },
            { size: "Family, Ø 46cm x 33cm", price: 25.9 },
            { size: "Party, Ø 60cm x 40cm", price: 29.9 },
          ],
          menuId: 2,
        },
      ],
    },
    // {
    //   category: "Burgers",
    //   menuId: 3,
    //   products: [
    //     {
    //       id: 2000,
    //       name: "Chicken Burger",
    //       description: "Crispy Chicken, Salad, Mayonaise, Totmato and Onion",
    //       image:
    //         "https://www.recipetineats.com/wp-content/uploads/2019/08/Avocado-Chicken-Burgers_9.jpg",
    //       optionsTitle: "Your bun",
    //       options: [
    //         { size: "Sesame bun", price: 6.9 },
    //         { size: "Brioche bun", price: 7.9 },
    //         { size: "Wholegrain bun", price: 7.9 },
    //       ],
    //       menuId: 2,
    //     },
    //     {
    //       id: 2001,
    //       name: "Cheese Burger",
    //       description:
    //         "Beef, tomatoes, lettuce, burger sauce, onions, pickles and cheddar cheese",
    //       image:
    //         "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=999&q=80",
    //       optionsTitle: "Your bun",
    //       options: [
    //         { size: "Sesame bun", price: 6.9 },
    //         { size: "Brioche bun", price: 7.9 },
    //         { size: "Wholegrain bun", price: 7.9 },
    //       ],
    //       menuId: 2,
    //     },
    //   ],
    // },
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
                </>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Products;
