import React from "react";
import { useCart } from "../context/CartContext";
const ProductDetails = ({ product, onClose }) => {
  const { addToCart } = useCart(); // Access addToCart from CartContext
  const handleAddToCart = () => {
    addToCart(product);
    onClose(); // Close modal after adding to cart
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-lg shadow-lg p-6 max-w-8xl gap-8 w-full mx-auto">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-h-80 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Details Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center md:text-left">
          {product.name}
        </h2>
        <p className="text-gray-600 text-lg mb-2 text-center md:text-left">
          Category:{" "}
          <span className="bg-gray-100 rounded-md p-1">
            {product.category || "General"}
          </span>
        </p>
        <p className="text-gray-600 text-md mb-4 text-center md:text-left">
          {product.description}
        </p>
        <p className="text-2xl font-semibold text-green-600 mb-4 text-center md:text-left">
          ${product.price.toFixed(2)}
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 rounded-md border border-black transition transform hover:-translate-y-1"
          >
            Add to Cart
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md border border-black transition transform hover:-translate-y-1"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
