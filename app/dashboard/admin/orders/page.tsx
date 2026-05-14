"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Loader2, Package, CheckCircle, Bike, RefreshCw, Clock,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

interface OrderItem {
  id: number;
  quantity: number;
  product: { productName: string; price: number };
  seller?: { id: number; name: string; shop?: { shopName: string } };
}

interface Order {
  id: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  totalAmount: number;
  customer: { id: number; name: string; email: string };
  orderItems: OrderItem[];
  rider?: { id: number; name: string };
}

interface Rider {
  id: number;
  name: string;
  status: string;
}

const authHeader = () => ({
  headers: { Authorization: `Bearer ${Cookies.get("token")}` },
});

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  accepted: "bg-teal-100 text-teal-700",
  partial: "bg-orange-100 text-orange-600",
  rider_assigned: "bg-blue-100 text-blue-700",
  out_for_delivery: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

const PAYMENT_STYLES: Record<string, string> = {
  cash: "bg-gray-100 text-gray-600",
  card: "bg-purple-100 text-purple-600",
  bkash: "bg-pink-100 text-pink-600",
  nagad: "bg-orange-100 text-orange-600",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [availableRiders, setAvailableRiders] = useState<Rider[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigningOrderId, setAssigningOrderId] = useState<number | null>(null);
  const [selectedRider, setSelectedRider] = useState<Record<number, number>>({});

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3000/customer/orders-details",
        authHeader(),
      );
      const all = Array.isArray(res.data) ? res.data : [];

      // Admin only sees seller-processed orders
      const adminVisible = all.filter((o) =>
        ["accepted", "partial", "rider_assigned", "out_for_delivery", "delivered", "cancelled"].includes(o.status)
      );
      setOrders(adminVisible);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAvailableRiders = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/riders/available", authHeader());
      setAvailableRiders(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to load riders");
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    fetchAvailableRiders();
  }, [fetchOrders, fetchAvailableRiders]);

  const handleAssignRider = async (orderId: number) => {
    const riderId = selectedRider[orderId];
    if (!riderId) {
      toast.error("Please select a rider first");
      return;
    }
    try {
      setAssigningOrderId(orderId);
      await axios.patch(
        `http://localhost:3000/admin/orders/${orderId}/rider`,
        { riderId },
        authHeader(),
      );
      toast.success("Rider assigned successfully!");
      fetchOrders();
      fetchAvailableRiders();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to assign rider");
    } finally {
      setAssigningOrderId(null);
    }
  };

  // Stats
  const readyCount = orders.filter((o) =>
    ["accepted", "partial"].includes(o.status) && !o.rider
  ).length;

  const assignedCount = orders.filter((o) =>
    o.status === "rider_assigned" ||
    (["accepted", "partial"].includes(o.status) && !!o.rider)
  ).length;

  const deliveredCount = orders.filter((o) => o.status === "delivered").length;
  const cancelledCount = orders.filter((o) => o.status === "cancelled").length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#1a1f16]">Orders</h1>
          <p className="mt-1 text-sm text-[#7a8a6a]">Assign riders to accepted orders</p>
        </div>
        <button
          onClick={() => { fetchOrders(); fetchAvailableRiders(); }}
          className="flex items-center gap-2 rounded-xl border border-[#e0d9cc] bg-white px-4 py-2.5 text-sm font-semibold text-[#4a7c59] transition hover:bg-[#f0ebe0]"
        >
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-2 gap-5 md:grid-cols-4">
        {[
          { label: "Ready to Assign", value: readyCount, icon: Package, color: "bg-teal-500" },
          { label: "Rider Assigned", value: assignedCount, icon: Bike, color: "bg-blue-500" },
          { label: "Delivered", value: deliveredCount, icon: CheckCircle, color: "bg-green-500" },
          { label: "Cancelled", value: cancelledCount, icon: XCircle, color: "bg-red-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl border border-[#e0d9cc] bg-white p-6 shadow-sm">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
              <Icon size={18} className="text-white" />
            </div>
            <p className="text-sm text-[#7a8a6a]">{label}</p>
            <p className="mt-1 text-3xl font-black text-[#1a1f16]">{value}</p>
          </div>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="animate-spin text-[#4a7c59]" />
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-2xl border border-[#e0d9cc] bg-white p-12 text-center text-sm text-[#7a8a6a]">
            <Package size={32} className="mx-auto mb-3 text-[#c8d4b8]" />
            No orders found
          </div>
        ) : (
          [...orders]
            .sort((a, b) => a.id - b.id) // ← descending by id
            .map((order) => (
              <div
                key={order.id}
                className={`rounded-2xl border bg-white p-6 shadow-sm ${order.status === "cancelled"
                    ? "border-red-100"
                    : order.status === "delivered"
                      ? "border-green-100"
                      : "border-[#e0d9cc]"
                  }`}
              >
                {/* Order header */}
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-[#1a1f16]">
                      Order #{order.id}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${STATUS_STYLES[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {order.status.replace(/_/g, " ")}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${PAYMENT_STYLES[order.paymentMethod] ?? "bg-gray-100 text-gray-600"}`}>
                      {order.paymentMethod}
                    </span>
                    {/* Rider assigned badge — shows next to status */}
                    {(order.status === "rider_assigned" ||
                      (["accepted", "partial"].includes(order.status) && order.rider)) && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                          Rider Assigned
                        </span>
                      )}
                  </div>
                  <span className="text-xs text-[#7a8a6a]">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {/* Customer */}
                  <div className="rounded-xl bg-[#faf8f3] p-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#7a8a6a]">Customer</p>
                    <p className="font-semibold text-[#1a1f16]">{order.customer?.name ?? "—"}</p>
                    <p className="text-xs text-[#7a8a6a]">{order.customer?.email ?? "—"}</p>
                  </div>

                  {/* Items */}
                  <div className="rounded-xl bg-[#faf8f3] p-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#7a8a6a]">Items</p>
                    {order.orderItems?.map((item) => (
                      <div key={item.id} className="mb-2">
                        <p className="text-sm text-[#1a1f16]">
                          {item.product?.productName} × {item.quantity}
                          <span className="ml-2 text-xs text-[#7a8a6a]">৳{item.product?.price}</span>
                        </p>
                        {item.seller?.shop?.shopName && (
                          <p className="text-xs text-[#7a8a6a]">
                            {item.seller.shop.shopName}
                          </p>
                        )}
                      </div>
                    ))}
                    <p className="mt-2 text-xs font-bold text-[#4a7c59]">
                      Total: ৳{Number(order.totalAmount).toLocaleString()}
                    </p>
                  </div>

                  {/* Rider */}
                  <div className="rounded-xl bg-[#faf8f3] p-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#7a8a6a]">Rider</p>

                    {/* Cancelled — no rider section */}
                    {order.status === "cancelled" ? (
                      <p className="text-sm text-red-400">Order cancelled</p>

                      /* Delivered — show rider */
                    ) : order.status === "delivered" ? (
                      <div>
                        <p className="font-semibold text-[#4a7c59]">
                          {order.rider?.name ?? "—"}
                        </p>
                      </div>

                      /* Already has rider assigned */
                    ) : order.rider ? (
                      <p className="font-semibold text-[#4a7c59]"> {order.rider.name}</p>

                      /* Ready to assign — show dropdown */
                    ) : ["accepted", "partial"].includes(order.status) ? (
                      <div className="flex items-center gap-2">
                        <select
                          value={selectedRider[order.id] ?? ""}
                          onChange={(e) => setSelectedRider((prev) => ({
                            ...prev, [order.id]: Number(e.target.value),
                          }))}
                          className="flex-1 rounded-xl border border-[#e0d9cc] bg-white px-3 py-2 text-sm outline-none focus:border-[#4a7c59]"
                        >
                          <option value="">Select rider</option>
                          {availableRiders.map((r) => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleAssignRider(order.id)}
                          disabled={assigningOrderId === order.id}
                          className="flex items-center gap-1.5 rounded-xl bg-[#4a7c59] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#3d6b4a] disabled:opacity-60"
                        >
                          {assigningOrderId === order.id
                            ? <Loader2 size={12} className="animate-spin" />
                            : <Bike size={12} />}
                          Assign
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-[#7a8a6a]">—</p>
                    )}
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}