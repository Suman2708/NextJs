"use client";
import Image from "next/image";

const CartPanel = ({ cart, updateQuantity }) => {
  const items = Object.entries(cart);

  return (
    <div className="p-4 border rounded-md bg-white shadow w-full">
      <h2 className="text-xl font-bold mb-4">🛒 Your Outfit Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">Cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {items.map(([url, count]) => (
            <li
              key={url}
              className="flex items-center justify-between gap-4 border-b pb-2"
            >
              <Image src={url} alt="cart-img" width={50} height={50} className="rounded" />
              <input
                type="number"
                value={count}
                onChange={(e) => updateQuantity(url, parseInt(e.target.value))}
                className="w-16 border px-2 py-1 rounded"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPanel;