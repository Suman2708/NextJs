"use client";
import { DndProvider } from 'react-dnd';
import { CartProvider } from "./context/cartContext";
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from './components/draggble';
import Canvas from './components/canvas';
import { useState } from 'react';
import CartIcon from './components/cartIcon';
import Cart from './components/cart';

const Home = () => {
    const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => setShowCart(!showCart);
  const bottoms = [
    '/bottoms/bottom1.jpg',
    '/bottoms/bottom2.jpg',
    '/bottoms/bottom3.jpg',
    '/bottoms/bottom4.png',
    '/bottoms/bottom5.png',
  ];

  const accessories = [
    '/accessories/sunglasses.jpg'
  ];

  const shoes = [
    '/shoes/shoes1.webp',
    '/shoes/shoes2.webp',
    '/shoes/shoes3.jpg',
    '/shoes/shoes4.jpg',
    '/shoes/shoes5.png',
  ];

  const tops = [
    '/tops/top1.jpg',
    '/tops/top2.jpg',
    '/tops/top3.jpg',
    '/tops/top4.png',
    '/tops/top5.png',
  ];
    const cap = [
    '/cap/cap.png',
    '/cap/hat.png'
  ];
    const belt = [
    '/belt/belt.jpg',
    '/belt/belt2.jpg'
  ];

  const handleAddToCart = (selectedItems) => {
    alert('Items added to cart:\n' + selectedItems.join('\n'));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Outfit Builder</h1>
        <div className='z-10'>
          <CartIcon />
        </div>
        
        <div className="flex gap-6">
          {/* Clothing Items */}
          <div className="flex flex-col gap-6 w-1/2 overflow-y-auto max-h-[80vh] pr-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Bottoms</h2>
              <div className="flex gap-3 flex-wrap">
                {bottoms.map((img, idx) => (
                  <DraggableItem key={idx} image={img} type="bottoms" />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Tops</h2>
              <div className="flex gap-3 flex-wrap">
                {tops.map((img, idx) => (
                  <DraggableItem key={idx} image={img} type="tops" />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Shoes</h2>
              <div className="flex gap-3 flex-wrap">
                {shoes.map((img, idx) => (
                  <DraggableItem key={idx} image={img} type="shoes" />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Cap</h2>
              <div className="flex gap-3 flex-wrap">
                {cap.map((img, idx) => (
                  <DraggableItem key={idx} image={img} type="cap" />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Belt</h2>
              <div className="flex gap-3 flex-wrap">
                {belt.map((img, idx) => (
                  <DraggableItem key={idx} image={img} type="belt" />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Accessories</h2>
              <div className="flex gap-3 flex-wrap">
                {accessories.map((img, idx) => (
                  <DraggableItem key={idx} image={img} type="accessories" />
                ))}
              </div>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="w-1/2">
            <Canvas onAddToCart={handleAddToCart} />
          </div>
        </div>
        <Cart/>
      </div>
    </DndProvider>

  );
};

export default Home;
