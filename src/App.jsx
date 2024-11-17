import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import Home from "./pages/Home";
import ProductDetails from "./components/ProductDetails";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart"; // Import Cart page
import CartButton from "./components/CartButton"; // Import CartButton
const App = () => (
  <CartProvider>
    {" "}
    {/* Wrap the app with CartProvider */}
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} /> {/* Add cart route */}
      </Routes>
      <CartButton /> {/* Place Cart Button here */}
    </Router>
  </CartProvider>
);

export default App;
