"use client";
import Link from 'next/link';

const CartIcon = ({ cartCount, toggle }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
    <Link href="../cart">
<button
       onClick={toggle}
        className="bg-blue-600 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg cursor-pointer"
      >
        🛒 <span>{cartCount}</span>
      </button>
    </Link>
      
    </div>
  );
};

export default CartIcon;