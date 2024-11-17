import React from "react";
import { useCart } from "../context/CartContext"; // Import useCart

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart(); // Access cart functions

  const handleQuantityChange = (productId, quantity) => {
    if (quantity <= 0) return;
    updateQuantity(productId, quantity);
  };

  const handleIncrease = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1); // Increment quantity
  };

  const handleDecrease = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1); // Decrement quantity
    } else {
      removeFromCart(productId); // Remove item if quantity reaches 0
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border-b"
            >
              {/* Image Section */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image} // Assuming `item.image` contains the image URL
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p>${item.price}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecrease(item.id, item.quantity)} // Decrease quantity
                  className="bg-gray-300 px-3 py-1 rounded"
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
                  className="w-16 p-2 border rounded text-center"
                />
                <button
                  onClick={() => handleIncrease(item.id, item.quantity)} // Increase quantity
                  className="bg-gray-300 px-3 py-1 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)} // Remove item
                  className="bg-red-500 text-white px-4 py-2 rounded ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
