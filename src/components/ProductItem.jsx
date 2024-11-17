import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import useCart

const ProductItem = ({ product }) => {
  const { addToCart } = useCart(); // Access addToCart function from CartContext

  return (
    <div className="border rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg duration-300 bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover mb-4 rounded-md"
      />
      <h2 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h2>
      <p className="text-gray-600 font-medium mb-4">${product.price}</p>
      <div className="flex gap-2">
        <Link
          to={`/product/${product.id}`}
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 text-center"
        >
          View Details
        </Link>
        <button
          onClick={() => addToCart(product)} // Add to cart
          className="inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300 text-center"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
