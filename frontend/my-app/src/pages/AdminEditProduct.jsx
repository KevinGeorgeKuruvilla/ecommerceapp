// src/pages/AdminEditProductPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function AdminEditProductPage() {
  const { id } = useParams();
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
    const fetchProduct = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/products`);
      const found = data.find((p) => p._id === id);
      if (found) {
        setFormData(found);
      } else {
        alert("Product not found");
        navigate("/admin/dashboard");
      }
    };
    fetchProduct();
  }, [id, navigate]);

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
      await axios.put(
        `http://localhost:5000/api/admin/product/${id}`,
        formData,
        config
      );
      alert("Product updated successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Failed to update product: " + err.response?.data?.message);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
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
          Update Product
        </button>
      </form>
    </div>
  );
}
