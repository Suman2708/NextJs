"use client";
import React from "react";
import { useCart } from "../context/cartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) return <div>Your cart is empty.</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Your Cart</h2>
      <ul className="space-y-4">
        {cart.map(item => (
          <li key={item.id} className="relative">
            <img src={item.snapshot} alt="outfit preview" className="w-32 h-40 object-cover border" />
            <button
              onClick={() => removeFromCart(item.id)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded p-1"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
