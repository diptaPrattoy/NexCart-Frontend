"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const API_BASE_URL = "https://nexcart-backend-o86x.onrender.com";

export default function OrderDetails({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchOrder = async () => {
    try {
      setLoading(true);

      const token = Cookies.get("token");

      const res = await axios.get(
        `${API_BASE_URL}/seller/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrder(res.data);
    } catch (err) {
      console.error(err);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    fetchOrder();
  }
}, [orderId]);
  /* ---------------- LOADING UI ---------------- */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  /* ---------------- EMPTY STATE ---------------- */
  if (!order) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">Order Not Found</h2>
          <p className="text-gray-500 mt-1">
            This order does not exist or you don’t have access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            Order #{order.id}
          </h1>
          <p className="text-sm text-gray-500">View full order details</p>
        </div>

        <span
          className={`px-4 py-1 rounded-full text-sm font-bold border
          ${
            order.status === "pending"
              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
              : order.status === "processing"
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : order.status === "delivered"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* INFO CARD */}
      <div className="bg-white border rounded-2xl p-5 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-400">Customer</p>
            <p className="font-bold text-gray-800">
              {order.customer?.name || "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Payment</p>
            <p className="font-bold text-gray-800 capitalize">
              {order.paymentMethod}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Total</p>
            <p className="font-black text-green-600">
              ৳{Number(order.totalAmount).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* ITEMS */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Order Items</h2>

        {order.orderItems?.map((item: any) => (
          <div
            key={item.id}
            className="bg-white border rounded-xl p-4 flex items-center justify-between hover:shadow-sm transition"
          >
            {/* LEFT */}
            <div>
              <p className="font-bold text-gray-900">
                {item.product?.productName}
              </p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>

            {/* RIGHT */}
            <div className="text-right">
              <p className="font-semibold text-gray-800">
                ৳{Number(item.price).toLocaleString()}
              </p>

              <span
                className={`text-xs px-3 py-1 rounded-full border font-semibold
                ${
                  item.status === "pending"
                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                    : item.status === "accepted"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : item.status === "rejected"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
