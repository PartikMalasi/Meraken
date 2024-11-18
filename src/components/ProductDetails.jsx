import React from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProduct();
  const { addToCart } = useCart();

  const product = products.find((item) => item.id === parseInt(id));

  const handleAddToCart = () => {
    addToCart(product);
  };

  if (!product) {
    return (
      <div className="p-4 bg-white shadow-md rounded-lg text-center mt-20">
        <p className="text-red-500 text-lg font-semibold">Product not found!</p>
        <Link
          to="/"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md inline-block hover:bg-blue-600 transition"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-5xl w-full flex flex-col md:flex-row gap-6 transform transition duration-300 hover:scale-105 md:mt-[2rem]">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {product.name}
            </h2>
            <p className="text-gray-600 text-lg mb-6">{product.description}</p>
            <p className="text-2xl font-semibold text-green-600 mb-4">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition transform hover:-translate-y-1"
            >
              Add to Cart
            </button>
            <Link
              to="/"
              className="bg-blue-500 text-white px-6 py-2 rounded-md text-center hover:bg-blue-600 transition transform hover:-translate-y-1 "
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
