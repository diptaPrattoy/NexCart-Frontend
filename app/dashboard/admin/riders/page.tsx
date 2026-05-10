"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Loader2, Search, Trash2, Bike, UserCheck, MapPin } from "lucide-react";
import toast from "react-hot-toast";

interface Rider {
  id: number;
  name: string;
  email: string;
  phone?: string;
  isAvailable?: boolean;
  isActive?: boolean;
  createdAt: string;
}

const authHeader = () => ({
  headers: { Authorization: `Bearer ${Cookies.get("token")}` },
});

export default function RidersPage() {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchName, setSearchName] = useState("");

  const fetchRiders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3000/riders/all-riders",
        authHeader(),
      );
      setRiders(res.data);
    } catch {
      toast.error("Failed to load riders");
    } finally {
      setLoading(false);
    }
    };
  
    
  useEffect(() => {
    fetchRiders();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this rider?")) return;
    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:3000/riders/${id}`, authHeader());
      toast.success("Rider deleted");
      setRiders((prev) => prev.filter((r) => r.id !== id));
    } catch {
      toast.error("Failed to delete rider");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = riders.filter(
    (r) =>
      r.name?.toLowerCase().includes(searchName.toLowerCase()) ||
      r.email?.toLowerCase().includes(searchName.toLowerCase()),
  );

  const available = riders.filter((r) => r.isAvailable).length;
  const active = riders.filter((r) => r.isActive).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#1a1f16]">Riders</h1>
        <p className="mt-1 text-sm text-[#7a8a6a]">
          Manage all delivery riders
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-3 gap-5">
        {[
          {
            label: "Total Riders",
            value: riders.length,
            icon: Bike,
            color: "bg-[#4a7c59]",
          },
          {
            label: "Available Now",
            value: available,
            icon: MapPin,
            color: "bg-green-500",
          },
          {
            label: "Active Riders",
            value: active,
            icon: UserCheck,
            color: "bg-blue-500",
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
          <h2 className="text-xl font-black text-[#1a1f16]">All Riders</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search riders..."
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
                  {[
                    "ID",
                    "Name",
                    "Email",
                    "Phone",
                    "Available",
                    "Status",
                    "Joined",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="pb-3 text-xs font-bold uppercase tracking-wider text-[#7a8a6a]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((rider) => (
                  <tr
                    key={rider.id}
                    className="border-b border-[#f0ebe0] last:border-none hover:bg-[#faf8f3]"
                  >
                    <td className="py-4 text-sm text-[#7a8a6a]">#{rider.id}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
                          {rider.name?.charAt(0).toUpperCase() ?? "R"}
                        </div>
                        <span className="text-sm font-semibold text-[#1a1f16]">
                          {rider.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-[#7a8a6a]">
                      {rider.email}
                    </td>
                    <td className="py-4 text-sm text-[#7a8a6a]">
                      {rider.phone ?? "—"}
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${rider.isAvailable ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                      >
                        {rider.isAvailable ? "Available" : "Busy"}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${rider.isActive ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}
                      >
                        {rider.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-[#7a8a6a]">
                      {new Date(rider.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => handleDelete(rider.id)}
                        disabled={deletingId === rider.id}
                        className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
                      >
                        {deletingId === rider.id ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <Trash2 size={12} />
                        )}
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-12 text-center text-sm text-[#7a8a6a]"
                    >
                      No riders found
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
