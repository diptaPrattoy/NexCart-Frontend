"use client";

import CartPage from "@/components/CartPage";
import axios from "axios";
import Cookies from "js-cookie";

import Link from "next/link";

import { useEffect, useState } from "react";

export default function CustomerDashboard() {
  const [user, setUser] = useState<any>(null);

  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const token = Cookies.get("token");

    const role = Cookies.get("role");

    if (!token || role !== "customer") {
      window.location.href = "/login/customer";

      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));

    // PROFILE
    axios
      .get("http://localhost:3000/customer/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // ORDERS
    axios
      .get(`http://localhost:3000/customer/my-orders/${payload.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // LOGOUT
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");

    window.location.href = "/login/customer";
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {/* TOP PROFILE */}
      <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-6">
          {/* PROFILE */}
          <div className="flex items-center gap-5">
            <img
              src={
                user?.profilePic
                  ? `http://localhost:3000/uploads/profile/${user.profilePic}`
                  : "/no-image.png"
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
            />

            <div>
              <h1 className="text-4xl font-black text-slate-800">
                {user?.name}
              </h1>

              <p className="text-slate-500 mt-2">{user?.email}</p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/dashboard/customer/profile"
              className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              My Profile
            </Link>

            <Link
              href="/dashboard/customer/cart"
              className="px-6 py-3 rounded-2xl bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition"
            >
              Cart
            </Link>

            <button
              onClick={() => {
                document.getElementById("order")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="px-6 py-3 rounded-2xl bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition"
            >
              Orders
            </button>

            <button
              onClick={handleLogout}
              className="px-6 py-3 rounded-2xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <CartPage></CartPage>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* TOTAL */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h3 className="text-slate-500 font-medium">Total Orders</h3>

          <h1 className="text-5xl font-black text-slate-800 mt-4">
            {orders.length}
          </h1>
        </div>

        {/* PENDING */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h3 className="text-slate-500 font-medium">Pending Orders</h3>

          <h1 className="text-5xl font-black text-yellow-500 mt-4">
            {orders.filter((o) => o.status === "pending").length}
          </h1>
        </div>

        {/* DELIVERED */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h3 className="text-slate-500 font-medium">Delivered Orders</h3>

          <h1 className="text-5xl font-black text-green-500 mt-4">
            {orders.filter((o) => o.status === "delivered").length}
          </h1>
        </div>
      </div>

      {/* ORDERS */}
      <div id="order" className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Recent Orders</h2>

            <p className="text-slate-500 text-sm mt-1">
              Track your latest purchases
            </p>
          </div>

          <Link
            href="/dashboard/customer/myorder"
            className="px-5 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            View All
          </Link>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-slate-50">
              <tr className="text-left">
                <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                  Order ID
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                  Product
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                  Date
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-slate-500">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-16 text-slate-400 text-lg"
                  >
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.slice(0, 5).map((order: any) => (
                  <tr
                    key={order.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    {/* ID */}
                    <td className="px-6 py-5 font-semibold text-slate-700">
                      #{order.id}
                    </td>

                    {/* PRODUCT */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            order.orderItems?.[0]?.product?.productImage
                              ? `http://localhost:3000/uploads/products/${order.orderItems[0].product.productImage}`
                              : "/no-image.png"
                          }
                          alt="Product"
                          className="w-14 h-14 rounded-xl object-cover border"
                        />

                        <div>
                          <h3 className="font-semibold text-slate-800">
                            {order.orderItems?.[0]?.product?.productName}
                          </h3>

                          <p className="text-sm text-slate-500">
                            Qty: {order.orderItems?.[0]?.quantity}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold

                          ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-600"
                              : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : order.status === "cancelled"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-blue-100 text-blue-600"
                          }
                        `}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-5 text-slate-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    {/* TOTAL */}
                    <td className="px-6 py-5">
                      <span className="text-lg font-bold text-blue-600">
                        ${order.totalAmount}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
