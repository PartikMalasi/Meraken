import React, { useState } from "react";
import products from "../data/products.json";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import Loader from "../components/Loader"; // Import the Loader component
import { useCart } from "../context/CartContext"; // Import the Cart context hook
import { Link } from "react-router-dom";

const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [loading, setLoading] = useState(false); // State for loading

  // Destructure cart-related methods from the context
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  // Create a list of categories, including 'All'
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const maxPrice = Math.max(...products.map((p) => p.price));

  const handleSearch = (query) => {
    setLoading(true); // Start loading
    const updatedProducts = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    applyFilters(updatedProducts);
  };

  const handleFilter = (category) => {
    setLoading(true); // Start loading
    setSelectedCategory(category);
    const filteredByCategory =
      category === "All" || !category
        ? products
        : products.filter((p) => p.category === category);
    applyFilters(filteredByCategory);
  };

  const handleSort = (order) => {
    setLoading(true); // Start loading
    setSortOrder(order);
    applyFilters(filteredProducts, order);
  };

  const handlePriceChange = (range) => {
    setLoading(true); // Start loading
    setPriceRange(range);
    const filteredByCategory =
      selectedCategory && selectedCategory !== "All"
        ? products.filter((p) => p.category === selectedCategory)
        : products;

    const filteredByPrice = filteredByCategory.filter(
      (p) => p.price >= range[0] && p.price <= range[1]
    );
    applyFilters(filteredByPrice);
  };

  const applyFilters = (updatedProducts, order = sortOrder) => {
    setTimeout(() => {
      // Simulating delay for loader effect
      const sortedProducts = [...updatedProducts].sort((a, b) => {
        return order === "asc" ? a.price - b.price : b.price - a.price;
      });
      setFilteredProducts(sortedProducts);
      setLoading(false); // End loading
    }, 500); // Delay of 500ms for loader visibility
  };

  return (
    <div className="grid grid-cols-4 min-h-screen bg-gray-50 w-full">
      {/* Fixed Header */}
      <div className="col-span-1 w-1/5 fixed top-[90px] bg-white p-4 shadow-lg h-[calc(100vh-64px)] overflow-y-auto flex flex-col gap-6 p-4">
        <h1 className="text-3xl font-bold mt-4 text-gray-800">
          Product Catalog
        </h1>
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter categories={categories} onFilter={handleFilter} />
        <div className="flex items-center gap-4 mt-4">
          <label className="font-medium">Sort by Price:</label>
          <select
            value={sortOrder}
            onChange={(e) => handleSort(e.target.value)}
            className="border p-2 rounded shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="my-4">
          <label className="font-medium">Price Range:</label>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) =>
              handlePriceChange([priceRange[0], Number(e.target.value)])
            }
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-sm mt-2 text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className=" ml-[20rem] col-span-3 p-4 overflow-y-auto w-full">
        {/* Show loader while loading */}
        {loading ? (
          <Loader /> // Render Loader component when loading
        ) : (
          <ProductList
            products={filteredProducts}
            addToCart={addToCart} // Pass addToCart function to ProductList
          />
        )}
      </div>
    </div>
  );
};

export default Home;
