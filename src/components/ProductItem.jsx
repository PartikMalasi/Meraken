import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductItem = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col border rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg duration-300 bg-white">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover mb-4 rounded-md"
      />

      {/* Product Info */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {product.name}
      </h2>
      <p className="text-lg font-medium text-gray-600 mb-4">
        ${product.price.toFixed(2)}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Link
          to={`/product/${product.id}`}
          className="flex-1 bg-blue-500 text-white py-1.5 px-3 rounded-md text-sm hover:bg-blue-600 transition-all text-center "
        >
          View Details
        </Link>
        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-green-500 text-white py-1.5 px-3 rounded-md text-sm hover:bg-green-600 transition-all text-center"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
