// // "use client";
// // import React, { createContext, useState, useContext, useEffect } from "react";

// // // Cart item structure
// // // { id: string, snapshot: string (png data URL), timestamp: number }

// // const CartContext = createContext();

// // export const CartProvider = ({ children }) => {
// //   const [cart, setCart] = useState([]);

// //   useEffect(() => {
// //     const stored = JSON.parse(localStorage.getItem("outfitCart") || "[]");
// //     setCart(stored);
// //   }, []);

// //   useEffect(() => {
// //     localStorage.setItem("outfitCart", JSON.stringify(cart));
// //   }, [cart]);

// //   const addToCart = (item) => setCart(prev => [...prev, item]);
// //   const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

// //   return (
// //     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// // export const useCart = () => {
// //   const ctx = useContext(CartContext);
// //   if (!ctx) throw new Error("useCart must be inside CartProvider");
// //   return ctx;
// // };






// "use client";
// import React, { createContext, useContext, useEffect, useState } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState({});

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("outfitCart") || "{}");
//     setCart(stored);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("outfitCart", JSON.stringify(cart));
//   }, [cart]);

//   // ✅ This is the function your Canvas file is trying to call
//   const updateQuantity = (src, delta) => {
//     setCart((prev) => {
//       const currentQty = prev[src] || 0;
//       const newQty = currentQty + delta;

//       if (newQty <= 0) {
//         const updated = { ...prev };
//         delete updated[src];
//         return updated;
//       }

//       return { ...prev, [src]: newQty };
//     });
//   };

//   // const addToCart = (snapshot) => {
//   //   const id = Date.now().toString();
//   //   const newItem = { id, snapshot };
//   //   const existing = JSON.parse(localStorage.getItem("savedOutfits") || "[]");
//   //   localStorage.setItem("savedOutfits", JSON.stringify([...existing, newItem]));
//   // };



// const addToCart = (snapshot) => {
//   const id = Date.now().toString();
//   const newItem = { id, snapshot };

//   let existing = [];
//   try {
//     const parsed = JSON.parse(localStorage.getItem("savedOutfits"));
//     existing = Array.isArray(parsed) ? parsed : [];
//   } catch (err) {
//     existing = [];
//   }

//   const updated = [...existing, newItem];
//   localStorage.setItem("savedOutfits", JSON.stringify(updated));
//   setCart(updated);
// };


//   const removeFromCart = (id) => {
//     const updated = (JSON.parse(localStorage.getItem("savedOutfits") || "[]")).filter(
//       (item) => item.id !== id
//     );
//     localStorage.setItem("savedOutfits", JSON.stringify(updated));
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, updateQuantity, addToCart, removeFromCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within a CartProvider");
//   return context;
// };






"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartQuantities, setCartQuantities] = useState({});
  const [savedOutfits, setSavedOutfits] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedQuantities = JSON.parse(localStorage.getItem("outfitCart") || "{}");
    const storedOutfits = JSON.parse(localStorage.getItem("savedOutfits") || "[]");
    setCartQuantities(storedQuantities);
    setSavedOutfits(storedOutfits);
  }, []);

  // Persist quantity-based cart
  useEffect(() => {
    localStorage.setItem("outfitCart", JSON.stringify(cartQuantities));
  }, [cartQuantities]);

  // Persist saved outfits
  useEffect(() => {
    localStorage.setItem("savedOutfits", JSON.stringify(savedOutfits));
  }, [savedOutfits]);

  const updateQuantity = (src, delta) => {
    setCartQuantities((prev) => {
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

const addToCart = (snapshot, usedImageSrcs = []) => {
  const id = Date.now().toString();
  const newItem = { id, snapshot };

  // Store the saved outfit preview
  const existing = JSON.parse(localStorage.getItem("savedOutfits") || "[]");
  const updated = [...existing, newItem];
  localStorage.setItem("savedOutfits", JSON.stringify(updated));
  setSavedOutfits(updated); // ← also manage savedOutfits in state if needed
  // setCartQuantities(savedOutfits)
  // ✅ Increment quantity of each image used in the snapshot
  usedImageSrcs.forEach(src => updateQuantity(src, 1));
};


  const removeFromCart = (id) => {
    setSavedOutfits((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartQuantities,
        savedOutfits,
        updateQuantity,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
