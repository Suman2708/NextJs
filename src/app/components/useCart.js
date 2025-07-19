import { useEffect, useState } from "react";

export const useCart = () => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem("outfitCart");
      if (stored) setCart(JSON.parse(stored));
    } catch (error) {
      console.error("Error loading cart from localStorage", error);
      setCart({});
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("outfitCart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage", error);
    }
  }, [cart]);

  const addToCart = (imageUrl) => {
    setCart((prev) => {
      const count = prev?.[imageUrl] || 0;
      return { ...prev, [imageUrl]: count + 1 };
    });
  };

    const updateQuantity = (src, delta) => {
    setCart((prev) => {
      const currentQty = prev[src] || 0;
      const newQty = currentQty + delta;

      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[src];
        return updated;
      }

      return { ...prev, [src]: newQty };
    });
  };

  return { cart, addToCart, updateQuantity,setCart };
};
