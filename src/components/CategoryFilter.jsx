const CategoryFilter = ({ categories, onFilter }) => (
  <div className="flex space-x-4">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onFilter(category)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {category}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
