// src/pages/OrderListPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OrderListPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.isAdmin) {
      alert("Access denied. Admins only.");
      navigate("/");
      return;
    }

    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(
          "http://localhost:5000/api/admin/orders",
          config
        );
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800 underline">
        Order Management
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Paid</th>
              <th className="py-3 px-4 text-left">Delivered</th>
              <th className="py-3 px-4 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="py-3 px-4">{order._id}</td>
                  <td className="py-3 px-4">{order.user?.name || "N/A"}</td>
                  <td className="py-3 px-4">₹{order.totalPrice}</td>
                  <td className="py-3 px-4">{order.isPaid ? "Yes" : "No"}</td>
                  <td className="py-3 px-4">
                    {order.isDelivered ? "Yes" : "No"}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
