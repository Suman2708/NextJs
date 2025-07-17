"use client";
import { CartProvider } from "../context/cartContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function Providers({ children }) {
  return (
    <CartProvider>
      <DndProvider backend={HTML5Backend}>
        {children}
      </DndProvider>
    </CartProvider>
  );
}
