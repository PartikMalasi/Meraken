const CategoryFilter = ({ categories, onFilter }) => (
  <div className="flex flex-wrap gap-4 flex-col">
    <h1>Categories</h1>
    <div className="flex flex-wrap gap-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilter(category)}
          className="px-2 py-2 bg-blue-500 text-white rounded"
        >
          {category}
        </button>
      ))}
    </div>
  </div>
);

export default CategoryFilter;
