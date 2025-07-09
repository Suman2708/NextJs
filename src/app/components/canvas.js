"use client";
import { useDrop } from 'react-dnd';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import html2canvas from 'html2canvas';

const defaultOutfit = {
  cap: null,
  accessories: null,
  tops: null,
  belt: null,
  bottoms: null,
  shoes: null,
};

const Canvas = ({ onAddToCart }) => {
  const [outfit, setOutfit] = useState(defaultOutfit);

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
    if (confirm("Are you sure you want to reset the outfit?")) {
      setOutfit(defaultOutfit);
      toast("Outfit reset.");
    }
  };

  const handleAddToCart = () => {
    const selectedItems = Object.values(outfit).filter(Boolean);
    if (selectedItems.length === 0) {
      toast("No items selected.");
      return;
    }
    onAddToCart(selectedItems);
    toast.success("Outfit added to cart!");
  };

  const handleSnapshot = () => {
    const canvas = document.getElementById("outfit-canvas");
    html2canvas(canvas).then((canvasEl) => {
      const link = document.createElement("a");
      link.download = "outfit.png";
      link.href = canvasEl.toDataURL();
      link.click();
    });
  };

  return (
    <div className="relative">
      <Toaster position="top-right" />
      <div
        ref={drop}
        id="outfit-canvas"
        className="w-full h-[650px] border-2 border-dashed relative bg-white rounded-xl shadow-md overflow-hidden"
      >
        {outfit.cap && (
          <img
            src={outfit.cap}
            alt="cap"
            className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 z-50"
          />
        )}
        {outfit.accessories && (
          <img
            src={outfit.accessories}
            alt="accessories"
            className="absolute top-20 left-1/2 transform -translate-x-1/2 w-20 z-40"
          />
        )}
        {outfit.tops && (
          <img
            src={outfit.tops}
            alt="tops"
            className="absolute top-36 left-1/2 transform -translate-x-1/2 w-24 z-30"
          />
        )}
        {outfit.belt && (
          <img
            src={outfit.belt}
            alt="belt"
            className="absolute top-60 left-1/2 transform -translate-x-1/2 w-20 z-30"
          />
        )}
        {outfit.bottoms && (
          <img
            src={outfit.bottoms}
            alt="bottoms"
            className="absolute top-[300px] left-1/2 transform -translate-x-1/2 w-24 z-10"
          />
        )}
        {outfit.shoes && (
          <img
            src={outfit.shoes}
            alt="shoes"
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-20 z-0"
          />
        )}
      </div>

      <div className="flex gap-3 mt-4 justify-end">
        <button
          onClick={handleSnapshot}
          className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
        >
          Save as Image
        </button>
        <button
          onClick={handleAddToCart}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
        >
          Add to Cart
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Canvas;
