"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Loader2,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Bike,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface OrderItem {
  id: number;
  quantity: number;
  product: { productName: string; price: number };
}

interface Order {
  id: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  customer: { id: number; name: string; email: string };
  orderItems: OrderItem[];
  rider?: { id: number; name: string };
}

interface Rider {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
}

const authHeader = () => ({
  headers: { Authorization: `Bearer ${Cookies.get("token")}` },
});

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

const PAYMENT_STYLES: Record<string, string> = {
  cash: "bg-gray-100 text-gray-600",
  card: "bg-purple-100 text-purple-600",
  bkash: "bg-pink-100 text-pink-600",
  nagad: "bg-orange-100 text-orange-600",
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [availableRiders, setAvailableRiders] = useState<Rider[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigningOrderId, setAssigningOrderId] = useState<number | null>(null);
  const [selectedRider, setSelectedRider] = useState<Record<number, number>>(
    {},
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingStatusId, setUpdatingStatusId] = useState<number | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3000/customer/orders-details",
        authHeader(),
      );
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAvailableRiders = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/riders/available",
        authHeader(),
      );
      setAvailableRiders(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to load available riders");
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    fetchAvailableRiders();
  }, [fetchOrders, fetchAvailableRiders]);

  // ── Assign rider to order ──
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

  // ── Update order status ──
  const handleStatusUpdate = async (orderId: number, status: string) => {
    try {
      setUpdatingStatusId(orderId);
      await axios.patch(
        `http://localhost:3000/customer/orders/${orderId}/status`,
        { status },
        authHeader(),
      );
      toast.success(`Order status updated to ${status}`);
      fetchOrders();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingStatusId(null);
    }
  };

  // ── Filter orders ──
  const filtered =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  // ── Stats ──
  const pending = orders.filter((o) => o.status === "pending").length;
  const processing = orders.filter((o) => o.status === "processing").length;
  const delivered = orders.filter((o) => o.status === "delivered").length;
  const cancelled = orders.filter((o) => o.status === "cancelled").length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#1a1f16]">Orders</h1>
          <p className="mt-1 text-sm text-[#7a8a6a]">
            Manage orders and assign riders
          </p>
        </div>
        <button
          onClick={() => {
            fetchOrders();
            fetchAvailableRiders();
          }}
          className="flex items-center gap-2 rounded-xl border border-[#e0d9cc] bg-white px-4 py-2.5 text-sm font-semibold text-[#4a7c59] transition hover:bg-[#f0ebe0]"
        >
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-2 gap-5 md:grid-cols-4">
        {[
          {
            label: "Pending",
            value: pending,
            icon: Clock,
            color: "bg-yellow-500",
            filter: "pending",
          },
          {
            label: "Processing",
            value: processing,
            icon: Bike,
            color: "bg-blue-500",
            filter: "processing",
          },
          {
            label: "Delivered",
            value: delivered,
            icon: CheckCircle,
            color: "bg-green-500",
            filter: "delivered",
          },
          {
            label: "Cancelled",
            value: cancelled,
            icon: XCircle,
            color: "bg-red-400",
            filter: "cancelled",
          },
        ].map(({ label, value, icon: Icon, color, filter }) => (
          <button
            key={label}
            onClick={() =>
              setStatusFilter(statusFilter === filter ? "all" : filter)
            }
            className={`rounded-2xl border p-6 text-left shadow-sm transition hover:shadow-md
              ${statusFilter === filter ? "border-[#4a7c59] ring-2 ring-[#4a7c59]/20" : "border-[#e0d9cc] bg-white"}`}
          >
            <div
              className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${color}`}
            >
              <Icon size={18} className="text-white" />
            </div>
            <p className="text-sm text-[#7a8a6a]">{label}</p>
            <p className="mt-1 text-3xl font-black text-[#1a1f16]">{value}</p>
          </button>
        ))}
      </div>

      {/* Available Riders bar */}
      <div className="mb-6 rounded-2xl border border-[#e0d9cc] bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Bike size={16} className="text-[#4a7c59]" />
            <span className="text-sm font-bold text-[#1a1f16]">
              Available Riders ({availableRiders.length}):
            </span>
          </div>
          {availableRiders.length === 0 ? (
            <span className="text-sm text-[#7a8a6a]">
              No riders available right now
            </span>
          ) : (
            availableRiders.map((r) => (
              <span
                key={r.id}
                className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
              >
                🟢 {r.name}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Orders list */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="animate-spin text-[#4a7c59]" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-[#e0d9cc] bg-white p-12 text-center text-sm text-[#7a8a6a]">
            <Package size={32} className="mx-auto mb-3 text-[#c8d4b8]" />
            No orders found
          </div>
        ) : (
          filtered.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-[#e0d9cc] bg-white p-6 shadow-sm"
            >
              {/* Order header */}
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-[#1a1f16]">
                    Order #{order.id}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${STATUS_STYLES[order.status] ?? "bg-gray-100 text-gray-600"}`}
                  >
                    {order.status}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${PAYMENT_STYLES[order.paymentMethod] ?? "bg-gray-100 text-gray-600"}`}
                  >
                    {order.paymentMethod}
                  </span>
                </div>
                <span className="text-xs text-[#7a8a6a]">
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {/* Customer info */}
                <div className="rounded-xl bg-[#faf8f3] p-4">
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#7a8a6a]">
                    Customer
                  </p>
                  <p className="font-semibold text-[#1a1f16]">
                    {order.customer?.name ?? "—"}
                  </p>
                  <p className="text-xs text-[#7a8a6a]">
                    {order.customer?.email ?? "—"}
                  </p>
                </div>

                {/* Order items */}
                <div className="rounded-xl bg-[#faf8f3] p-4">
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#7a8a6a]">
                    Items
                  </p>
                  {order.orderItems?.map((item) => (
                    <p key={item.id} className="text-sm text-[#1a1f16]">
                      {item.product?.productName} × {item.quantity}
                      <span className="ml-2 text-xs text-[#7a8a6a]">
                        ৳{item.product?.price}
                      </span>
                    </p>
                  ))}
                </div>

                {/* Rider info / assignment */}
                <div className="rounded-xl bg-[#faf8f3] p-4">
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#7a8a6a]">
                    Rider
                  </p>
                  {order.rider ? (
                    <p className="font-semibold text-[#4a7c59]">
                      🛵 {order.rider.name}
                    </p>
                  ) : order.status === "pending" ? (
                    <div className="flex items-center gap-2">
                      <select
                        value={selectedRider[order.id] ?? ""}
                        onChange={(e) =>
                          setSelectedRider((prev) => ({
                            ...prev,
                            [order.id]: Number(e.target.value),
                          }))
                        }
                        className="flex-1 rounded-xl border border-[#e0d9cc] bg-white px-3 py-2 text-sm outline-none focus:border-[#4a7c59]"
                      >
                        <option value="">Select rider</option>
                        {availableRiders.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleAssignRider(order.id)}
                        disabled={assigningOrderId === order.id}
                        className="flex items-center gap-1.5 rounded-xl bg-[#4a7c59] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#3d6b4a] disabled:opacity-60"
                      >
                        {assigningOrderId === order.id ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <Bike size={12} />
                        )}
                        Assign
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-[#7a8a6a]">No rider assigned</p>
                  )}
                </div>
              </div>

              {/* Status update actions */}
              {order.status !== "delivered" && order.status !== "cancelled" && (
                <div className="mt-4 flex items-center gap-2 border-t border-[#f0ebe0] pt-4">
                  <span className="text-xs font-bold text-[#7a8a6a]">
                    Update status:
                  </span>
                  {order.status === "pending" && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, "processing")}
                      disabled={updatingStatusId === order.id}
                      className="flex items-center gap-1.5 rounded-xl bg-blue-500 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-blue-600 disabled:opacity-60"
                    >
                      {updatingStatusId === order.id ? (
                        <Loader2 size={11} className="animate-spin" />
                      ) : null}
                      Mark Processing
                    </button>
                  )}
                  {order.status === "processing" && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, "delivered")}
                      disabled={updatingStatusId === order.id}
                      className="flex items-center gap-1.5 rounded-xl bg-green-500 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-green-600 disabled:opacity-60"
                    >
                      {updatingStatusId === order.id ? (
                        <Loader2 size={11} className="animate-spin" />
                      ) : null}
                      Mark Delivered
                    </button>
                  )}
                  <button
                    onClick={() => handleStatusUpdate(order.id, "cancelled")}
                    disabled={updatingStatusId === order.id}
                    className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-500 hover:text-white disabled:opacity-60"
                  >
                    Cancel Order
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
