"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";

export default function Cart() {
  const { updateQuantity, cartQuantities } = useCart();
  const [cartArray, setCartArray] = useState([]);

  // Sync localStorage cartQuantities to local state
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartQuantities") || "{}");
    const array = Object.entries(stored); // convert object to array of [url, quantity]
    setCartArray(array);
  }, [cartQuantities]); // Re-run when context updates

  if (cartArray.length === 0) return <div>Your cart is empty.</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Your Cart</h2>
      <ul className="space-y-4">
        {cartArray.map(([src, quantity]) => (
          <li key={src} className="flex items-center gap-4">
            <img
              src={src}
              alt="cart item"
              className="w-24 h-32 object-cover border"
            />
            <div>
              <p className="font-medium">Quantity: {quantity}</p>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => updateQuantity(src, 1)}
                  className="bg-green-500 px-2 py-1 rounded text-white"
                >
                  +
                </button>
                <button
                  onClick={() => updateQuantity(src, -1)}
                  className="bg-red-500 px-2 py-1 rounded text-white"
                >
                  -
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
