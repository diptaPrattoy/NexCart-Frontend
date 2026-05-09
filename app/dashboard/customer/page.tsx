"use client";

import Link from "next/link";

export default function CustomerDashboardPage() {
  const cards = [
    {
      title: "Total Orders",
      value: "12",
      color: "bg-blue-500",
    },
    {
      title: "Cart Items",
      value: "5",
      color: "bg-green-500",
    },
    {
      title: "Pending Orders",
      value: "3",
      color: "bg-yellow-500",
    },
    {
      title: "Delivered",
      value: "9",
      color: "bg-purple-500",
    },
  ];

  const orders = [
    {
      id: "#1025",
      product: "Wireless Headphone",
      status: "Delivered",
      date: "10 May 2026",
      price: "$120",
    },
    {
      id: "#1026",
      product: "Smart Watch",
      status: "Pending",
      date: "12 May 2026",
      price: "$80",
    },
    {
      id: "#1027",
      product: "Gaming Mouse",
      status: "Cancelled",
      date: "15 May 2026",
      price: "$45",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">

      {/* Sidebar */}
      <aside className="w-[260px] bg-[#0f172a] text-white flex flex-col justify-between p-6">

        <div>
          {/* Logo */}
          <h1 className="text-3xl font-bold mb-12">
            NexCart
          </h1>

          {/* Menu */}
          <nav className="space-y-3">

            <Link
              href="/dashboard/customer"
              className="block bg-blue-600 px-5 py-3 rounded-2xl font-medium"
            >
              Dashboard
            </Link>

            <Link
              href="/dashboard/customer/profile"
              className="block hover:bg-slate-800 px-5 py-3 rounded-2xl transition"
            >
              My Profile
            </Link>

            <Link
              href="/dashboard/customer/cart"
              className="block hover:bg-slate-800 px-5 py-3 rounded-2xl transition"
            >
              Cart
            </Link>

            <Link
              href="/dashboard/customer/orders"
              className="block hover:bg-slate-800 px-5 py-3 rounded-2xl transition"
            >
              Orders
            </Link>

            <Link
              href="/dashboard/customer/settings"
              className="block hover:bg-slate-800 px-5 py-3 rounded-2xl transition"
            >
              Settings
            </Link>
          </nav>
        </div>

        {/* Logout */}
        <button className="bg-red-500 hover:bg-red-600 transition px-5 py-3 rounded-2xl font-semibold">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Top Header */}
        <div className="flex items-center justify-between mb-10">

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Welcome Back 👋
            </h1>

            <p className="text-slate-500 mt-2">
              Here’s what’s happening with your account today.
            </p>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl shadow">

            <img
              src="https://i.pravatar.cc/100"
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />

            <div>
              <h3 className="font-semibold text-slate-800">
                Customer
              </h3>

              <p className="text-sm text-slate-500">
                customer@nexcart.com
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-md p-6"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${card.color} mb-5`}
              />

              <h2 className="text-slate-500 text-lg">
                {card.title}
              </h2>

              <h1 className="text-4xl font-bold text-slate-900 mt-2">
                {card.value}
              </h1>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-3xl shadow-md p-6">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold text-slate-900">
              Recent Orders
            </h2>

            <button className="text-blue-600 font-medium">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="text-left border-b">

                  <th className="pb-4 text-slate-500">
                    Order ID
                  </th>

                  <th className="pb-4 text-slate-500">
                    Product
                  </th>

                  <th className="pb-4 text-slate-500">
                    Status
                  </th>

                  <th className="pb-4 text-slate-500">
                    Date
                  </th>

                  <th className="pb-4 text-slate-500">
                    Price
                  </th>
                </tr>
              </thead>

              <tbody>

                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-none"
                  >

                    <td className="py-5 font-medium">
                      {order.id}
                    </td>

                    <td className="py-5">
                      {order.product}
                    </td>

                    <td className="py-5">

                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium
                        ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-600"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {order.status}
                      </span>

                    </td>

                    <td className="py-5 text-slate-500">
                      {order.date}
                    </td>

                    <td className="py-5 font-semibold">
                      {order.price}
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}