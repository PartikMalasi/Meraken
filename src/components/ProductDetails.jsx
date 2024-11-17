import React from "react";
import { useParams, Link } from "react-router-dom"; // Import useParams
import products from "../data/products"; // Replace with your actual data source

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const product = products.find((item) => item.id === parseInt(id)); // Find the product by ID

  if (!product) {
    return (
      <div className="p-4 bg-white shadow-md rounded-lg">
        <p className="text-red-500">Product not found!</p>
        <Link
          to="/"
          className="mt-4 bg-blue-500 text-white p-2 rounded-md inline-block"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover mb-4"
      />
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-xl font-semibold">${product.price}</p>
      <Link
        to="/"
        className="mt-4 bg-blue-500 text-white p-2 rounded-md inline-block"
      >
        Back to Products
      </Link>
    </div>
  );
};

export default ProductDetails;
