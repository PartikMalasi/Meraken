import React, { useState } from "react";
import products from "../data/products.json";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const categories = [...new Set(products.map((p) => p.category))];

  const handleSearch = (query) => {
    setFilteredProducts(
      products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const handleFilter = (category) => {
    setFilteredProducts(products.filter((p) => p.category === category));
  };

  return (
    <div className="p-4">
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter categories={categories} onFilter={handleFilter} />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Home;
