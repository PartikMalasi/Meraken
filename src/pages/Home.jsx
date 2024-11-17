import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import Loader from "../components/Loader"; // Import the Loader component
import { useCart } from "../context/CartContext"; // Import the Cart context hook

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [loading, setLoading] = useState(true); // Initial loading state

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/8ec11ff3-d143-45ec-aa70-4a1c7f5e91a8"
        ); // Replace with your Mocky API URL
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setPriceRange([0, Math.max(...data.map((p) => p.price))]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    setLoading(true);
    const updatedProducts = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    applyFilters(updatedProducts);
  };

  const handleFilter = (category) => {
    setLoading(true);
    setSelectedCategory(category);
    const filteredByCategory =
      category === "All" || !category
        ? products
        : products.filter((p) => p.category === category);
    applyFilters(filteredByCategory);
  };

  const handleSort = (order) => {
    setLoading(true);
    setSortOrder(order);
    applyFilters(filteredProducts, order);
  };

  const handlePriceChange = (range) => {
    setLoading(true);
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
      const sortedProducts = [...updatedProducts].sort((a, b) => {
        return order === "asc" ? a.price - b.price : b.price - a.price;
      });
      setFilteredProducts(sortedProducts);
      setLoading(false);
    }, 500);
  };

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <Loader />
      </div>
    ); // Full-page loader, centered

  return (
    <div className="grid grid-cols-4 min-h-screen bg-gray-50 w-full">
      {/* Sidebar */}
      <div className="col-span-1 w-1/5 fixed top-[90px] bg-white p-4 shadow-lg h-[calc(100vh-64px)] overflow-y-auto flex flex-col gap-6">
        <h1 className="text-3xl font-bold mt-4 text-gray-800">
          Product Catalog
        </h1>
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter
          categories={["All", ...new Set(products.map((p) => p.category))]}
          onFilter={handleFilter}
        />
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
            max={priceRange[1]}
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
      <div className="ml-[20rem] col-span-3 p-4 overflow-y-auto w-full">
        <ProductList products={filteredProducts} addToCart={addToCart} />
      </div>
    </div>
  );
};

export default Home;
