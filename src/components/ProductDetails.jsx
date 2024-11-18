import React from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../context/ProductContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProduct();
  const product = products.find((item) => item.id === parseInt(id));

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
