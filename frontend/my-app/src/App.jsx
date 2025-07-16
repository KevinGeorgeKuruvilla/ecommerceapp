import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductListPage from "./pages/productListPage"; // ✅ import your product page
import { LoginRegisterPage } from "./pages/LoginRegisterPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { AdminAddProductPage } from "./pages/AdminAddProductPage";
import { AdminEditProductPage } from "./pages/AdminEditProduct";
import OrderListPage from "./pages/OrderListPage";
import UserListPage from "./pages/UserListPage";
import { BlogPage } from "./pages/BlogPage";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="p-4">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <div className="p-6 border rounded-xl bg-white shadow">
                  About Page
                </div>
              }
            />
            <Route path="/auth" element={<LoginRegisterPage />} />
            <Route path="/shop" element={<ProductListPage />} />
            {/* ✅ Route for product page */}
            <Route
              path="/blog"
              element={
                <div className="p-6 border rounded-xl bg-white shadow">
                  <BlogPage />
                </div>
              }
            />
            <Route path="/admin/users" element={<UserListPage />} />
            <Route
              path="/contact"
              element={
                <div className="p-6 border rounded-xl bg-white shadow">
                  Contact Page
                </div>
              }
            />
            <Route
              path="/admin/add-product"
              element={<AdminAddProductPage />}
            />
            <Route path="/admin/orders" element={<OrderListPage />} />

            <Route
              path="/admin/product/edit/:id"
              element={<AdminEditProductPage />}
            />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
