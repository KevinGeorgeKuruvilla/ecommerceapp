// src/pages/AdminAddProductPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function AdminAddProductPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
    image: "",
    category: "",
    brand: "",
  });

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.isAdmin) {
      alert("Access denied");
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        "http://localhost:5000/api/admin/product",
        formData,
        config
      );
      alert("Product created successfully!");
      navigate("/admin/dashboard"); // or wherever you want to go after add
    } catch (err) {
      alert(
        "Failed to create product: " + err.response?.data?.message ||
          err.message
      );
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type={key === "price" || key === "countInStock" ? "number" : "text"}
            name={key}
            placeholder={key[0].toUpperCase() + key.slice(1)}
            value={formData[key]}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
