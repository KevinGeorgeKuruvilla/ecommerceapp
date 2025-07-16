// src/pages/AdminDashboardPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (!storedUser) {
      navigate("/auth");
    } else {
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser.isAdmin) {
        alert("Access denied. Admins only.");
        navigate("/");
      } else {
        setUserInfo(parsedUser);
        fetchDashboardData(parsedUser.token);
      }
    }
  }, [navigate]);

  const fetchDashboardData = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [usersRes, ordersRes, revenueRes] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/users", config),
        // axios.get("http://localhost:5000/api/admin/orders", config),
        // axios.get("http://localhost:5000/api/admin/revenue", config),
      ]);

      setTotalUsers(usersRes.data.length);
      setTotalOrders(ordersRes.data.length);
      setTotalRevenue(revenueRes.data.total || 0);
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-xl p-6 border border-blue-200">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-gray-600 text-lg font-medium">{totalUsers}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 border border-green-200">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-gray-600 text-lg font-medium">{totalOrders}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 border border-purple-200">
          <h2 className="text-xl font-semibold mb-2">Revenue</h2>
          <p className="text-gray-600 text-lg font-medium">₹{totalRevenue}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/admin/products")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
          >
            Manage Products
          </button>
          <button
            onClick={() => navigate("/admin/orders")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow"
          >
            Manage Orders
          </button>
          <button
            onClick={() => navigate("/admin/users")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow"
          >
            Manage Users
          </button>
          <button
            onClick={() => navigate("/admin/add-product")}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl shadow"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
