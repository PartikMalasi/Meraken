import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, removeFromCart }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border-b"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>
                  ${item.price} x {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 font-semibold text-xl">
            Total: ${calculateTotal().toFixed(2)}
          </div>
          <Link
            to="/"
            className="mt-4 bg-blue-500 text-white p-2 rounded-md inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
