import React from "react";
import { useCart } from "../context/CartContext"; // Import useCart

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart(); // Access cart functions

  const handleQuantityChange = (productId, quantity) => {
    if (quantity <= 0) return;
    updateQuantity(productId, quantity);
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
              <div>
                <p>{item.name}</p>
                <p>${item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  className="w-16 p-2 border rounded"
                />
                <button
                  onClick={() => removeFromCart(item.id)} // Remove item
                  className="bg-red-500 text-white px-4 py-2 rounded"
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
