# 🛍️ Product Catalog Application

## 📝 Overview

A dynamic React.js web application that provides an intuitive and responsive product browsing experience. Users can search, filter, and sort products with ease across mobile and desktop platforms.

## 🚀 Features

- **🔍 Product Search**: Quickly find products by name
- **📂 Category Filtering**: Browse products by specific categories
- **💰 Price Sorting**: Sort products by price (ascending/descending)
- **💳 Price Range Slider**: Set budget-based product filters
- **📱 Responsive Design**: Seamless experience on mobile and desktop

## 📸 Application Screenshots


![Desktop View](/images/Home.png)
![Product Details](/images/Product_Details.png)
![Cart](/images/Cart.png)

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **Language**: JavaScript (ES6+)

## 🔧 Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/product-catalog.git
   ```

2. Install dependencies
   ```bash
   cd product-catalog
   npm install
   ```

3. Run the application
   ```bash
   npm start
   ```

## 🌟 Key Functions

### Product Search
```javascript
const handleSearch = (query) => {
  const updatedProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
  applyFilters(updatedProducts);
};
```

### Category Filter
```javascript
const handleFilter = (category) => {
  setSelectedCategory(category);
  const filteredByCategory =
    category === "All" || !category
      ? products
      : products.filter((p) => p.category === category);
  applyFilters(filteredByCategory);
};
```

## 🚧 Future Enhancements

- Pagination
- User Authentication
- Product Reviews and Ratings

## 🚧 Challenges Faced

### 1. **Handling Multiple Filters and Sorting Together**
**Problem:** When users apply multiple filters (such as category, price, etc.), maintaining the state of the filtered products becomes complex. The application needs to track all these filters and combine them seamlessly to display the correct products.

**Solution:** 
- The solution was to manage all filter states individually and combine them when applying filters to the product list. 
- By creating a unified filter handler that applied all filters together, we were able to ensure that the products displayed were correctly filtered according to all selected criteria.

### 2. **Ensuring Responsiveness**
**Problem:** Ensuring that the UI adapts correctly to various screen sizes, especially on mobile devices where screen real estate is limited. Traditional layouts often result in a cluttered interface on smaller screens.

**Solution:** 
- The design uses **Tailwind CSS's utility classes** like `lg:hidden`, `lg:block`, `flex`, and `grid` to switch between mobile-first and desktop-first layouts dynamically.
- For mobile screens, a collapsible sidebar is implemented, and a stacked layout is used for filters and the product list, providing a seamless experience across devices.

### 3. **State Management in Complex UI**
**Problem:** Managing state across various UI components that interact with each other, like the search bar, category filter, price range slider, and product list.

**Solution:** 
- **Centralized State Management**: We used React’s `useState` to manage the state of filters and sorting.
- By keeping the state of all filters and the search query in one place, we were able to synchronize changes across all components efficiently.

## 📄 License

[MIT License]

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines before getting started.

## 👥 Contact

Your Name - partikoffical@gmail.com
