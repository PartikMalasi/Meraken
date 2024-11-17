import React from "react";
import { useLocation, Link } from "react-router-dom";

const ProductDetails = () => {
  const { state } = useLocation();
  const product = state?.product;

  if (!product) {
    return <div>Product not found!</div>;
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
