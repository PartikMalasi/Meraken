import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import useCart

const CartButton = () => {
  const { cart } = useCart(); // Access the cart from context

  return (
    <div className="fixed bottom-4 right-4 z-10">
      <Link
        to="/cart"
        className="flex items-center justify-center bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition"
      >
        Shopping Cart
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-2">
            {cart.length}
          </span>
        )}
      </Link>
    </div>
  );
};

export default CartButton;
