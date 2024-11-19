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
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="flex flex-col items-center justify-center lg:grid lg:grid-cols-5 gap-4 w-full">
        {/* Top Catalog for Small Screens */}
        <div className="block lg:hidden p-4 bg-white shadow-lg w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Product Catalog
          </h1>
          <div className="space-y-4">
            <SearchBar onSearch={handleSearch} />
            <CategoryFilter
              categories={["All", ...new Set(products.map((p) => p.category))]}
              onFilter={handleFilter}
            />
            <div className="flex flex-wrap items-center gap-4">
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
            <div>
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
        </div>

        {/* Sidebar for Large Screens */}
        <div className="hidden lg:block col-span-1 fixed top-[90px] left-0 bg-white p-4 shadow-lg h-[calc(100vh-90px)] overflow-y-auto flex flex-col space-y-6 w-1/5">
          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Product Catalog
          </h1>
          <SearchBar onSearch={handleSearch} />
          <CategoryFilter
            categories={["All", ...new Set(products.map((p) => p.category))]}
            onFilter={handleFilter}
          />
          <div className="flex flex-wrap items-center gap-6">
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
          <div>
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
            loading ? "flex justify-center items-center" : ""
          } col-span-5 lg:col-span-4 lg:ml-[25%] p-4 overflow-y-auto w-full`}
        >
          {loading ? (
            <Loader />
          ) : (
            <ProductList products={filteredProducts} addToCart={addToCart} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
