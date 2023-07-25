import React from "react";

const Products = () => {
  const items = [
    {
      category: "Pizza",
      products: [
        {
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
          menuId: 0,
        },
        {
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
          menuId: 0,
        },
      ],
    },
    {
      category: "Burgers",
      products: [
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
      ],
    },
  ];

  return (
    <div>
      <div className="flex px-20 py-10 space-x-3">
        {items.map((item, i) => (
          <div key={i} className="border rounded-full px-4 py-1 border-black text-sm cursor-pointer">
            <p>{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
