"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Loader2, Search, Users, UserCheck, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  isActive?: boolean;
  createdAt: string;
}

const authHeader = () => ({
  headers: { Authorization: `Bearer ${Cookies.get("token")}` },
});

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3000/customer",
        authHeader(),
      );
      setCustomers(res.data);
    } catch {
      toast.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
    };

    
  useEffect(() => {
    fetchCustomers();
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchName.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchName.toLowerCase()),
  );

  const active = customers.filter((c) => c.isActive).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#1a1f16]">Customers</h1>
        <p className="mt-1 text-sm text-[#7a8a6a]">
          View all registered customers
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-3 gap-5">
        {[
          {
            label: "Total Customers",
            value: customers.length,
            icon: Users,
            color: "bg-[#4a7c59]",
          },
          {
            label: "Active",
            value: active,
            icon: UserCheck,
            color: "bg-green-500",
          },
          {
            label: "Total Orders",
            value: "—",
            icon: ShoppingCart,
            color: "bg-purple-500",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-[#e0d9cc] bg-white p-6 shadow-sm"
          >
            <div
              className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${color}`}
            >
              <Icon size={18} className="text-white" />
            </div>
            <p className="text-sm text-[#7a8a6a]">{label}</p>
            <p className="mt-1 text-3xl font-black text-[#1a1f16]">{value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#e0d9cc] bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-xl font-black text-[#1a1f16]">All Customers</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search customers..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="rounded-xl border border-[#e0d9cc] bg-[#faf8f3] px-4 py-2.5 text-sm outline-none focus:border-[#4a7c59] focus:ring-2 focus:ring-[#4a7c59]/20"
            />
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4a7c59] text-white">
              <Search size={15} />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={28} className="animate-spin text-[#4a7c59]" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e0d9cc] text-left">
                  {["ID", "Name", "Email", "Phone", "Status", "Joined"].map(
                    (h) => (
                      <th
                        key={h}
                        className="pb-3 text-xs font-bold uppercase tracking-wider text-[#7a8a6a]"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-[#f0ebe0] last:border-none hover:bg-[#faf8f3]"
                  >
                    <td className="py-4 text-sm text-[#7a8a6a]">
                      #{customer.id}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600">
                          {customer.name?.charAt(0).toUpperCase() ?? "C"}
                        </div>
                        <span className="text-sm font-semibold text-[#1a1f16]">
                          {customer.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-[#7a8a6a]">
                      {customer.email}
                    </td>
                    <td className="py-4 text-sm text-[#7a8a6a]">
                      {customer.phone ?? "—"}
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${customer.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                      >
                        {customer.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-[#7a8a6a]">
                      {new Date(customer.createdAt).toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "short", year: "numeric" },
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-12 text-center text-sm text-[#7a8a6a]"
                    >
                      No customers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
