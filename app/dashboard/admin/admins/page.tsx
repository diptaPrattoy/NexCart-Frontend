"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Loader2,
  Search,
  Trash2,
  Shield,
  UserCheck,
  UserX,
} from "lucide-react";
import toast from "react-hot-toast";

interface Admin {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
}

const authHeader = () => ({
  headers: { Authorization: `Bearer ${Cookies.get("token")}` },
});

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/admin", authHeader());
      setAdmins(res.data);
    } catch {
      toast.error("Failed to load admins");
    } finally {
      setLoading(false);
    }
    };
  
    
  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSearch = async () => {
    if (!searchName.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      setSearching(true);
      const res = await axios.get(
        `http://localhost:3000/admin/search?name=${searchName}`,
        authHeader(),
      );
      setSearchResults(res.data);
    } catch {
      toast.error("Search failed");
    } finally {
      setSearching(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this admin?")) return;
    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:3000/admin/${id}`, authHeader());
      toast.success("Admin deleted");
      setAdmins((prev) => prev.filter((a) => a.id !== id));
      setSearchResults((prev) => prev.filter((a) => a.id !== id));
    } catch {
      toast.error("Failed to delete admin");
    } finally {
      setDeletingId(null);
    }
  };

  const displayAdmins = searchResults.length > 0 ? searchResults : admins;
  const verified = admins.filter((a) => a.isVerified).length;
  const active = admins.filter((a) => a.isActive).length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#1a1f16]">Admins</h1>
        <p className="mt-1 text-sm text-[#7a8a6a]">Manage all admin accounts</p>
      </div>

      {/* Stat row */}
      <div className="mb-8 grid grid-cols-3 gap-5">
        {[
          {
            label: "Total Admins",
            value: admins.length,
            icon: Shield,
            color: "bg-[#4a7c59]",
          },
          {
            label: "Verified",
            value: verified,
            icon: UserCheck,
            color: "bg-green-500",
          },
          {
            label: "Unverified",
            value: admins.length - verified,
            icon: UserX,
            color: "bg-red-400",
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
          <h2 className="text-xl font-black text-[#1a1f16]">All Admins</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchName}
              onChange={(e) => {
                setSearchName(e.target.value);
                if (!e.target.value) setSearchResults([]);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="rounded-xl border border-[#e0d9cc] bg-[#faf8f3] px-4 py-2.5 text-sm outline-none focus:border-[#4a7c59] focus:ring-2 focus:ring-[#4a7c59]/20"
            />
            <button
              onClick={handleSearch}
              disabled={searching}
              className="flex items-center gap-2 rounded-xl bg-[#4a7c59] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3d6b4a] disabled:opacity-60"
            >
              {searching ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Search size={15} />
              )}
              Search
            </button>
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
                    "Verified",
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
                {displayAdmins.map((admin) => (
                  <tr
                    key={admin.id}
                    className="border-b border-[#f0ebe0] last:border-none hover:bg-[#faf8f3]"
                  >
                    <td className="py-4 text-sm text-[#7a8a6a]">#{admin.id}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d4e6c3] text-sm font-bold text-[#4a7c59]">
                          {admin.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-semibold text-[#1a1f16]">
                          {admin.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-[#7a8a6a]">
                      {admin.email}
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${admin.isVerified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                      >
                        {admin.isVerified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${admin.isActive ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}
                      >
                        {admin.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-[#7a8a6a]">
                      {new Date(admin.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => handleDelete(admin.id)}
                        disabled={deletingId === admin.id}
                        className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
                      >
                        {deletingId === admin.id ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <Trash2 size={12} />
                        )}
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {displayAdmins.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-12 text-center text-sm text-[#7a8a6a]"
                    >
                      No admins found
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
