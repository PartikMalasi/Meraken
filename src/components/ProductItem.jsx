import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => (
  <div className="border rounded-lg p-4 shadow-md">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-32 object-cover mb-2"
    />
    <h2 className="text-lg font-bold">{product.name}</h2>
    <p className="text-gray-600">${product.price}</p>
    <Link
      to={`/product/${product.id}`}
      className="text-blue-500 underline mt-2 block"
    >
      View Details
    </Link>
  </div>
);

export default ProductItem;
