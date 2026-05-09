"use client";

import Cookies from "js-cookie";
import { useEffect } from "react";

const RiderDashboard = () => {

  // AUTH CHECK
  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    // Redirect if not rider
    if (!token || role !== "rider") {
      window.location.href = "/login/rider";
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8">

      <h1 className="text-4xl font-bold text-slate-900 mb-3">
        Rider Dashboard
      </h1>

      <p className="text-slate-500 mb-10">
        Welcome back Rider 👋
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-3xl shadow-md p-6">
          <h2 className="text-slate-500 text-lg">
            Total Deliveries
          </h2>

          <h1 className="text-4xl font-bold text-slate-900 mt-3">
            120
          </h1>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-6">
          <h2 className="text-slate-500 text-lg">
            Pending Orders
          </h2>

          <h1 className="text-4xl font-bold text-yellow-500 mt-3">
            8
          </h1>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-6">
          <h2 className="text-slate-500 text-lg">
            Completed Orders
          </h2>

          <h1 className="text-4xl font-bold text-green-500 mt-3">
            112
          </h1>
        </div>

      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl shadow-md p-6 mt-10">

        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Assigned Orders
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b text-left">

                <th className="pb-4 text-slate-500">
                  Order ID
                </th>

                <th className="pb-4 text-slate-500">
                  Customer
                </th>

                <th className="pb-4 text-slate-500">
                  Status
                </th>

                <th className="pb-4 text-slate-500">
                  Date
                </th>

              </tr>
            </thead>

            <tbody>

              <tr className="border-b">

                <td className="py-5 font-medium">
                  #1001
                </td>

                <td className="py-5">
                  Hridoy
                </td>

                <td className="py-5">

                  <span className="px-4 py-1 rounded-full text-sm bg-yellow-100 text-yellow-600">
                    Pending
                  </span>

                </td>

                <td className="py-5 text-slate-500">
                  10 May 2026
                </td>
              </tr>

              <tr>

                <td className="py-5 font-medium">
                  #1002
                </td>

                <td className="py-5">
                  Alex
                </td>

                <td className="py-5">

                  <span className="px-4 py-1 rounded-full text-sm bg-green-100 text-green-600">
                    Delivered
                  </span>

                </td>

                <td className="py-5 text-slate-500">
                  11 May 2026
                </td>
              </tr>

            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default RiderDashboard;