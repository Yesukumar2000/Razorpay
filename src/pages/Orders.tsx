import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

interface OrderItem {
  product: { name: string; price: number };
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "{}"); // Get stored user data
        if (!user.id) {
          setError("User not found. Please log in again.");
          return;
        }

        const { data } = await axios.get(`http://localhost:5000/orders/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(data.orders);
      } catch (error: any) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

      {/* Display total orders count */}
      <p className="text-lg font-semibold mb-4">
        Total Orders: <span className="text-blue-600">{orders.length}</span>
      </p>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="p-4 border rounded mb-4">
            <p>Order ID: {order._id}</p>
            <p>Status: {order.status}</p>
            <p>Total: ₹{order.totalAmount}</p>
            <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
