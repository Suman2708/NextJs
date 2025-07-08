"use client";
import { useDrop } from 'react-dnd';
import { useState } from 'react';

const Canvas = ({ onAddToCart }) => {
  const [outfit, setOutfit] = useState({
    cap: null,
    accessories: null,
    tops: null,
    belt: null,
    bottoms: null,
    shoes: null,
  });

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['cap', 'accessories', 'tops', 'belt', 'bottoms', 'shoes'],
    drop: (item, monitor) => {
      const type = monitor.getItemType();
      setOutfit((prev) => ({ ...prev, [type]: item.image }));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleReset = () => {
    setOutfit({
      cap: null,
      accessories: null,
      tops: null,
      belt: null,
      bottoms: null,
      shoes: null,
    });
  };

  return (
    <div
      ref={drop}
      className="w-full h-[650px] border-2 border-dashed relative bg-white rounded-xl shadow-md overflow-hidden"
    >
      {/* Cap */}
      {outfit.cap && (
        <img
          src={outfit.cap}
          alt="cap"
          className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 z-50"
        />
      )}

      {/* Accessories */}
      {outfit.accessories && (
        <img
          src={outfit.accessories}
          alt="accessories"
          className="absolute top-20 left-1/2 transform -translate-x-1/2 w-20 z-40"
        />
      )}

      {/* Tops */}
      {outfit.tops && (
        <img
          src={outfit.tops}
          alt="tops"
          className="absolute top-36 left-1/2 transform -translate-x-1/2 w-24 z-30"
        />
      )}

      {/* Belt */}
      {outfit.belt && (
        <img
          src={outfit.belt}
          alt="belt"
          className="absolute top-60 left-1/2 transform -translate-x-1/2 w-20 z-30"
        />
      )}

      {/* Bottoms */}
      {outfit.bottoms && (
        <img
          src={outfit.bottoms}
          alt="bottoms"
          className="absolute top-[300px] left-1/2 transform -translate-x-1/2 w-24 z-10"
        />
      )}

      {/* Shoes */}
      {outfit.shoes && (
        <img
          src={outfit.shoes}
          alt="shoes"
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-20 z-0"
        />
      )}

      {/* Buttons */}
      <div className="absolute bottom-4 right-4 flex gap-3">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-lg"
          onClick={() => {
            const selectedItems = Object.values(outfit).filter(Boolean);
            onAddToCart(selectedItems);
          }}
        >
          Add to Cart
        </button>

        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md shadow-lg"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Canvas;
