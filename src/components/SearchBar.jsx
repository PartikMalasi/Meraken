const SearchBar = ({ onSearch }) => (
  <input
    type="text"
    placeholder="Search products..."
    onChange={(e) => onSearch(e.target.value)}
    className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
  />
);

export default SearchBar;
