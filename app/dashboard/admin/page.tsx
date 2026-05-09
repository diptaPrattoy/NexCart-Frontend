"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Bike,
  Search,
  LogOut,
  Shield,
  ChevronRight,
  Loader2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// TYPES
// ─────────────────────────────────────────────
interface AdminProfile {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
}

// ─────────────────────────────────────────────
// SIDEBAR LINKS
// ─────────────────────────────────────────────
const navLinks = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Admins", icon: Shield, href: "/admin/dashboard/admins" },
  { label: "Sellers", icon: ShoppingBag, href: "/admin/dashboard/sellers" },
  { label: "Riders", icon: Bike, href: "/admin/dashboard/riders" },
  { label: "Customers", icon: Users, href: "/admin/dashboard/customers" },
];

// ─────────────────────────────────────────────
// STAT CARDS DATA
// ─────────────────────────────────────────────
const statCards = [
  {
    label: "Total Orders",
    value: "1,248",
    change: "+18%",
    color: "bg-green-500",
  },
  {
    label: "Total Sellers",
    value: "320",
    change: "Verified shops",
    color: "bg-blue-500",
  },
  {
    label: "Active Riders",
    value: "85",
    change: "Active today",
    color: "bg-yellow-500",
  },
  {
    label: "Revenue",
    value: "৳2.4M",
    change: "Monthly sales",
    color: "bg-purple-500",
  },
];

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export default function AdminDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [allAdmins, setAllAdmins] = useState<AdminProfile[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState<AdminProfile[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingAdmins, setLoadingAdmins] = useState(true);
  const [searching, setSearching] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");

  // ── Auth header helper ──
  const authHeader = () => ({
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  // ── Redirect if not logged in ──
  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (!token || role !== "admin") {
      router.push("/login/admin");
      return;
    }

    fetchProfile();
    fetchAllAdmins();
  }, []);

  // ── Fetch logged-in admin profile ──
  const fetchProfile = async () => {
    try {
      setLoadingProfile(true);
      // Decode JWT to get admin id
      const token = Cookies.get("token");
      if (!token) return;

      const payload = JSON.parse(atob(token.split(".")[1]));
      const adminId = payload.sub;

      const response = await axios.get(
        `http://localhost:3000/admin/${adminId}`,
        authHeader(),
      );
      setProfile(response.data);
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoadingProfile(false);
    }
  };

  // ── Fetch all admins ──
  const fetchAllAdmins = async () => {
    try {
      setLoadingAdmins(true);
      const response = await axios.get(
        "http://localhost:3000/admin",
        authHeader(),
      );
      setAllAdmins(response.data);
    } catch {
      toast.error("Failed to load admins");
    } finally {
      setLoadingAdmins(false);
    }
  };

  // ── Search admins by name ──
  const handleSearch = async () => {
    if (!searchName.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      setSearching(true);
      const response = await axios.get(
        `http://localhost:3000/admin/search?name=${searchName}`,
        authHeader(),
      );
      setSearchResults(response.data);
    } catch {
      toast.error("Search failed");
    } finally {
      setSearching(false);
    }
  };

  // ── Logout ──
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    toast.success("Logged out successfully");
    setTimeout(() => router.push("/login/admin"), 1000);
  };

  const displayAdmins = searchResults.length > 0 ? searchResults : allAdmins;

  return (
    <>
      <div className="flex min-h-screen bg-[#f8fafc]">
        {/* ── Sidebar ── */}
        <aside className="flex w-[240px] flex-col justify-between bg-slate-900 p-6">
          {/* Logo */}
          <div>
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500 text-lg">
                🛍
              </div>
              <span className="text-xl font-black text-white">NexCart</span>
            </div>

            {/* Nav */}
            <nav className="space-y-1">
              {navLinks.map(({ label, icon: Icon, href }) => (
                <button
                  key={label}
                  onClick={() => {
                    setActiveNav(label);
                    router.push(href);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition
                    ${
                      activeNav === label
                        ? "bg-green-500 text-white"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                >
                  <Icon size={18} />
                  {label}
                  {activeNav === label && (
                    <ChevronRight size={14} className="ml-auto" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </aside>

        {/* ── Main ── */}
        <main className="flex-1 p-8">
          {/* Top bar */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Welcome back, {loadingProfile ? "..." : profile?.name} 👋
              </p>
            </div>

            {/* Profile badge */}
            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                {profile?.name?.charAt(0).toUpperCase() ?? "A"}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {loadingProfile ? "Loading..." : profile?.name}
                </p>
                <p className="text-xs text-slate-500">
                  {loadingProfile ? "" : profile?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className={`mb-4 h-2 w-10 rounded-full ${card.color}`} />
                <p className="text-sm text-slate-500">{card.label}</p>
                <p className="mt-1 text-3xl font-extrabold text-slate-900">
                  {card.value}
                </p>
                <p className="mt-1 text-xs font-medium text-green-600">
                  {card.change}
                </p>
              </div>
            ))}
          </div>

          {/* Admin list */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            {/* Header + Search */}
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-xl font-extrabold text-slate-900">
                All Admins
              </h2>

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
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
                <button
                  onClick={handleSearch}
                  disabled={searching}
                  className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
                >
                  {searching ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Search size={16} />
                  )}
                  Search
                </button>
              </div>
            </div>

            {/* Table */}
            {loadingAdmins ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={28} className="animate-spin text-green-500" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        ID
                      </th>
                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Name
                      </th>
                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Email
                      </th>
                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Verified
                      </th>
                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Status
                      </th>
                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayAdmins.map((admin) => (
                      <tr key={admin.id} className="border-b last:border-none">
                        <td className="py-4 text-sm text-slate-500">
                          #{admin.id}
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                              {admin.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-semibold text-slate-800">
                              {admin.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 text-sm text-slate-500">
                          {admin.email}
                        </td>
                        <td className="py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold
                            ${
                              admin.isVerified
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {admin.isVerified ? "Verified" : "Pending"}
                          </span>
                        </td>
                        <td className="py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold
                            ${
                              admin.isActive
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {admin.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="py-4 text-sm text-slate-500">
                          {new Date(admin.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </td>
                      </tr>
                    ))}

                    {displayAdmins.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-12 text-center text-sm text-slate-400"
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
        </main>
      </div>

      <Toaster
        position="top-right"
        containerStyle={{ top: 20, right: 20 }}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#ffffff",
            color: "#0f172a",
            border: "1px solid #d1d5db",
            padding: "14px",
            borderRadius: "14px",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          },
          success: {
            style: { border: "1px solid #22c55e" },
            iconTheme: { primary: "#22c55e", secondary: "#ffffff" },
          },
          error: {
            style: { border: "1px solid #ef4444" },
            iconTheme: { primary: "#ef4444", secondary: "#ffffff" },
          },
        }}
      />
    </>
  );
}
