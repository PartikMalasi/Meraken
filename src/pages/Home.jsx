import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";
import { useProduct } from "../context/ProductContext";

const Home = () => {
  const { products, loading } = useProduct(); // Access products and loading state from context
  const { addToCart } = useCart(); // Access addToCart from CartContext
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceRange, setPriceRange] = useState([0, 500]);

  useEffect(() => {
    // Initialize filteredProducts when products are loaded
    if (!loading && products.length > 0) {
      setFilteredProducts(products);
      setPriceRange([0, Math.max(...products.map((p) => p.price))]);
    }
  }, [products, loading]);

  const handleSearch = (query) => {
    const updatedProducts = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    applyFilters(updatedProducts);
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
    const filteredByCategory =
      category === "All" || !category
        ? products
        : products.filter((p) => p.category === category);
    applyFilters(filteredByCategory);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    applyFilters(filteredProducts, order);
  };
  const handlePriceChange = (range) => {
    setPriceRange(range);

    // Filter products based on the selected category and price range
    const filteredByCategory =
      selectedCategory && selectedCategory !== "All"
        ? products.filter((p) => p.category === selectedCategory)
        : products;

    applyFilters(
      filteredByCategory.filter(
        (p) => p.price >= range[0] && p.price <= range[1]
      )
    );
  };

  const applyFilters = (updatedProducts, order = sortOrder) => {
    const sortedProducts = [...updatedProducts].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 min-h-screen bg-gray-50 w-full">
      {/* Sidebar */}
      <div className="md:col-span-1 md:w-full md:sticky top-[90px] bg-white p-4 shadow-lg h-auto overflow-y-auto flex flex-col gap-6">
        <h1 className="text-3xl font-bold mt-4 text-gray-800">
          Product Catalog
        </h1>
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter
          categories={["All", ...new Set(products.map((p) => p.category))]}
          onFilter={handleFilter}
        />
        <div className="flex flex-wrap items-center gap-4 mt-4">
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
          {products.length > 0 && (
            <>
              <input
                type="range"
                min="0"
                max={Math.max(...products.map((p) => p.price))}
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
            </>
          )}
        </div>
      </div>

      {/* Products List */}
      <div
        className={`${
          loading ? "flex justify-center items-center" : " "
        } col-span-4 md:col-span-4 p-4 overflow-y-auto w-full`}
      >
        {loading ? (
          <Loader />
        ) : (
          <ProductList products={filteredProducts} addToCart={addToCart} />
        )}
      </div>
    </div>
  );
};

export default Home;
