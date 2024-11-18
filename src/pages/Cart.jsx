import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (productId, quantity) => {
    if (quantity <= 0) return;
    updateQuantity(productId, quantity);
  };

  const handleIncrease = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecrease = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="flex items-center justify-center flex-col gap-6">
          {" "}
          <p className="text-center text-gray-600">Your cart is empty.</p>{" "}
          <Link
            to="/"
            className="bg-blue-500 text-white px-6 py-2 rounded-md text-center hover:bg-blue-600 transition transform hover:-translate-y-1 "
          >
            Back to Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row justify-between items-center bg-white p-4 shadow-lg rounded-lg"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full md:w-1/2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-gray-600 text-sm">${item.price}</p>
                  <p className="text-gray-800 font-medium">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Quantity Controls and Actions */}
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <button
                  onClick={() => handleDecrease(item.id, item.quantity)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-full transition duration-200"
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  className="w-12 text-center p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                <button
                  onClick={() => handleIncrease(item.id, item.quantity)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-full transition duration-200"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total Price */}
          <div className="bg-white p-4 shadow-lg rounded-lg text-right">
            <p className="text-xl font-bold">
              Grand Total: $
              {cart
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
