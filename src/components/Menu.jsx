import React from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    name: 'Salami Pizza',
    description: 'Tomato sauce, Cheese, and Salami',
    image: 'https://www.bofrost.de/medias/01781-DE-pizza-con-salame-pic1.jpg-W1400xH1400R1.1?context=bWFzdGVyfHByb2R1Y3QtaW1hZ2VzfDExMzAyOTd8aW1hZ2UvanBlZ3xoODQvaDU4Lzk0MDcyMjE4MjU1NjYvMDE3ODFfREVfcGl6emEtY29uLXNhbGFtZV9waWMxLmpwZ19XMTQwMHhIMTQwMFIxLjF8YjRjY2FkZmZhZjRlMzU5NmUyYzU0ZjEzOTcxZmExM2ZhMDI2Yjk5YjMxZTkwOGMzZDQ4Y2QxODJhOTRiOGU0Nw',
    options: [
      { size: '26cm', price: 7.90 },
      { size: '32cm', price: 10.90 },
      { size: '46x33cm', price: 17.90 },
      { size: '60x40cm', price: 19.90 },
    ],
  },
  {
    name: 'Funghi Pizza',
    description: 'Tomato sauce, Cheese, and Mushroom',
    image: 'https://i0.wp.com/neffisso.de/wp-content/uploads/2022/06/Pizza-Funghi-scaled.jpg?fit=704%2C463&ssl=1',
    options: [
      { size: '26cm', price: 7.90 },
      { size: '32cm', price: 10.90 },
      { size: '46x33cm', price: 17.90 },
      { size: '60x40cm', price: 19.90 },
    ],
  },
  {
    name: 'Chicken Burger',
    description: 'Crispy Chicken, Salad, Mayonaise, Totmato, Onion',
    image: 'https://th.bing.com/th/id/R.7fbe527c70202435c00962aa6c9a46f9?rik=EJts4ij9%2b2xpVg&riu=http%3a%2f%2fww1.hdnux.com%2fphotos%2f43%2f20%2f06%2f9240964%2f3%2f920x1240.jpg&ehk=6dno1dPAZvLcnWE353NoZtDX4H0pDufFB4En8%2bzIFCE%3d&risl=&pid=ImgRaw&r=0',
    options: [
      { size: 'Medium', price: 5.90 },
    ],
  },
  // Margarita
//   https://meliz-palast.de/wp-content/uploads/2017/02/2017-01-19_Meliz_0067-600x600.jpg
];

const Menu = () => {
  return (
    <div className="flex flex-wrap justify-center py-20">
        <div className='w-full flex flex-col items-center justify-center space-y-2 mb-8'>
            <p className='text-primary font-bold text-4xl'>Our top three meals</p>
            <p className='font-semibold'>Try our five best meals today.</p>
        </div>
      {products.map((product) => (
        <div key={product.name} className="m-4">
          <ProductCard name={product.name} description={product.description} image={product.image} options={product.options} />
        </div>
      ))}
    </div>
  );
};

export default Menu;
