// src/pages/ProductListPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = userInfo?.isAdmin;

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-12 underline underline-offset-8">
        Product List
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-6 rounded-2xl border-2 border-blue-300 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-44 object-cover rounded-xl mb-4 border border-gray-300"
            />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {product.name}
            </h2>
            <p className="text-gray-700 text-sm mb-4 line-clamp-3">
              {product.description.length > 60
                ? product.description.substring(0, 60) + "..."
                : product.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-700">
                ₹{product.price}
              </span>
              <span className="text-sm text-gray-600">
                Stock: {product.countInStock}
              </span>
            </div>
            {isAdmin && (
              <Link
                to={`/admin/product/edit/${product._id}`}
                className="text-sm  bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow"
              >
                Edit
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
