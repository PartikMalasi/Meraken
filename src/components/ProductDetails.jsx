import React from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/products.json";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover mb-4"
      />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-700">${product.price}</p>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <Link to="/" className="text-blue-500 underline mt-4 block">
        Back to Products
      </Link>
    </div>
  );
};

export default ProductDetails;
