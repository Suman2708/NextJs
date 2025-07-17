"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

// Cart item structure
// { id: string, snapshot: string (png data URL), timestamp: number }

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("outfitCart") || "[]");
    setCart(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("outfitCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => setCart(prev => [...prev, item]);
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};
