"use client";
import Pusher from "pusher-js";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  User,
  LogOut,
  Store,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

import DashboardSection from "./DashboardSection";
import ProductsSection from "./ProductsSection";
import OrdersSection from "./OrdersSection";
import ProfileSection from "./ProfileSection";

export const API_BASE_URL = "https://nexcart-backend-o86x.onrender.com";

export const PRODUCT_CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports",
];

export type SellerShop = {
  id: number;
  shopName: string;
  shopAddress: string;
  tradeLicense: string;
};

export type Seller = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  nidNumber?: string;
  nidImage?: string | null;
  shop?: SellerShop | null;
};

export type Product = {
  id: number;
  productName: string;
  category: string;
  description?: string | null;
  price: number;
  quantity: number;
  productImage?: string | null;
};

export type OrderItem = {
  id: number;
  quantity: number;
  price: number;

  status: "pending" | "accepted" | "rejected" | "processing";

  product?: {
    id: number;
    productName: string;
    category: string;
    productImage?: string | null;
  };
};

export type Order = {
  id: number;
  status: "pending" | "processing" | "delivered" | "cancelled";
  paymentMethod: string;
  totalAmount: number;
  createdAt: string;

  customer?: {
    id: number;
    name: string;
  };

  orderItems?: OrderItem[];
};

export type ProductForm = {
  productName: string;
  category: string;
  description: string;
  price: string;
  quantity: string;
};

export type SellerProfileForm = {
  name: string;
  email: string;
  phone: string;
  nidNumber: string;
};

export const emptyForm: ProductForm = {
  productName: "",
  category: "",
  description: "",
  price: "",
  quantity: "",
};

export const emptyProfileForm: SellerProfileForm = {
  name: "",
  email: "",
  phone: "",
  nidNumber: "",
};
function decodeJwt(token: string) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}
const sectionTitles: Record<string, string> = {
  dashboard: "Dashboard",
  products: "Manage Products",
  orders: "Orders",
  profile: "Seller Profile",
};

export default function SellerDashboardPage() {
  const [activeSection, setActiveSection] = useState<
    "dashboard" | "products" | "orders" | "profile"
  >("dashboard");

  const [seller, setSeller] = useState<Seller | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [profileForm, setProfileForm] =
    useState<SellerProfileForm>(emptyProfileForm);

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileUpdating, setProfileUpdating] = useState(false);

  const statistics = useMemo(() => {
    const totalProducts = products.length;

    const totalStock = products.reduce(
      (sum, p) => sum + Number(p.quantity || 0),
      0,
    );

    const outOfStock = products.filter((p) => Number(p.quantity) <= 0).length;

    const totalInventoryValue = products.reduce(
      (sum, p) => sum + Number(p.price || 0) * Number(p.quantity || 0),
      0,
    );

    const activeCategories = new Set(
      products.map((p) => p.category).filter(Boolean),
    ).size;

    return {
      totalProducts,
      totalStock,
      outOfStock,
      totalInventoryValue,
      activeCategories,
    };
  }, [products]);

  useEffect(() => {
    const pusher = new Pusher(
      "8ce8e1219e4b306f5eba",

      {
        cluster: "ap2",
      },
    );

    const channel = pusher.subscribe("seller-channel");

    channel.bind(
      "new-order",

      (data: any) => {
        console.log(data);

        toast.success(`🛒 ${data.message}`);
      },
    );

    return () => {
      channel.unbind_all();

      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const savedToken = Cookies.get("token");
    const savedSeller = Cookies.get("seller");

    if (!savedToken || !savedSeller) {
      toast.error("Please login first");
      window.location.href = "/login/seller";
      return;
    }

    try {
      const parsedSeller = JSON.parse(savedSeller) as Seller;

      setSeller(parsedSeller);

      setProfileForm({
        name: parsedSeller.name || "",
        email: parsedSeller.email || "",
        phone: parsedSeller.phone || "",
        nidNumber: parsedSeller.nidNumber || "",
      });

      loadSellerProducts(parsedSeller.id);
      loadSellerOrders(parsedSeller.id);
    } catch {
      Cookies.remove("token");
      Cookies.remove("seller");

      toast.error("Session expired");
      window.location.href = "/login/seller";
    }
  }, []);

  const loadSellerProducts = async (sellerId: number) => {
    try {
      setProductsLoading(true);

      const response = await axios.get(
        `${API_BASE_URL}/seller/${sellerId}/products`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );

      const productList = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      setProducts(productList);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setProductsLoading(false);
    }
  };

  // const loadSellerOrders = async (sellerId: number) => {
  //   try {
  //     setOrdersLoading(true);

  //     const response = await axios.get(
  //       `${API_BASE_URL}/seller/${sellerId}/orders`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${Cookies.get("token")}`,
  //         },
  //       },
  //     );

  //     const orderList = Array.isArray(response.data)
  //       ? response.data
  //       : response.data?.data || [];

  //     setOrders(orderList);
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to load orders");
  //   } finally {
  //     setOrdersLoading(false);
  //   }
  // };

  // const handleLogout = () => {
  //   Cookies.remove("token");
  //   Cookies.remove("seller");

  //   toast.success("Logged out successfully");

  //   setTimeout(() => {
  //     window.location.href = "/login/seller";
  //   }, 700);
  // };
  const loadSellerOrders = async (sellerId: number) => {
    try {
      setOrdersLoading(true);

      const token = Cookies.get("token");

      console.log("SELLER ORDER DEBUG:", {
        apiUrl: `${API_BASE_URL}/seller/${sellerId}/orders`,
        tokenExists: Boolean(token),
        tokenPayload: token ? decodeJwt(token) : null,
        sellerIdFromCookie: sellerId,
      });

      const response = await axios.get(
        `${API_BASE_URL}/seller/${sellerId}/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const orderList = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      setOrders(orderList);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("LOAD SELLER ORDERS FAILED:", {
          status: error.response?.status,
          data: error.response?.data,
          url: `${API_BASE_URL}/seller/${sellerId}/orders`,
          tokenExists: Boolean(Cookies.get("token")),
          tokenPayload: Cookies.get("token")
            ? decodeJwt(Cookies.get("token") as string)
            : null,
        });

        toast.error(
          error.response?.data?.message ||
            "Failed to load orders. Please login again.",
        );
      } else {
        console.error(error);
        toast.error("Failed to load orders");
      }
    } finally {
      setOrdersLoading(false);
    }
  };
  const handleLogout = () => {
    Cookies.remove("token", { path: "/" });
    Cookies.remove("role", { path: "/" });
    Cookies.remove("seller", { path: "/" });

    toast.success("Logged out successfully");

    setTimeout(() => {
      window.location.href = "/login/seller";
    }, 700);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setProductImage(null);
    setEditingProductId(null);
  };

  const handleSubmitProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = Cookies.get("token");

    if (!token || !seller) return;

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("productName", form.productName);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("quantity", form.quantity);

      if (productImage) {
        formData.append("productImage", productImage);
      }

      if (editingProductId) {
        await axios.patch(
          `${API_BASE_URL}/seller/products/${editingProductId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        toast.success("Product updated");
      } else {
        await axios.post(
          `${API_BASE_URL}/seller/${seller.id}/products`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        toast.success("Product created");
      }

      resetForm();
      loadSellerProducts(seller.id);
    } catch {
      toast.error("Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setActiveSection("products");

    setEditingProductId(product.id);

    setForm({
      productName: product.productName,
      category: product.category,
      description: product.description || "",
      price: String(product.price),
      quantity: String(product.quantity),
    });
  };

  const handleDelete = async (productId: number) => {
    const token = Cookies.get("token");

    if (!token || !seller) {
      toast.error("Session expired. Please login again.");
      return;
    }

    if (!confirm("Delete this product?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/seller/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product deleted");
      loadSellerProducts(seller.id);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("DELETE PRODUCT FAILED:", {
          status: error.response?.status,
          data: error.response?.data,
          url: `${API_BASE_URL}/seller/products/${productId}`,
        });

        toast.error(
          error.response?.data?.message ||
            "Failed to delete product. Check console.",
        );
      } else {
        console.error(error);
        toast.error("Failed to delete product");
      }
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = Cookies.get("token");

    if (!token || !seller) return;

    try {
      setProfileUpdating(true);

      const formData = new FormData();

      formData.append("name", profileForm.name);
      formData.append("email", profileForm.email);
      formData.append("phone", profileForm.phone);
      formData.append("nidNumber", profileForm.nidNumber);

      if (profileImage) {
        formData.append("nidImage", profileImage);
      }

      const response = await axios.patch(
        `${API_BASE_URL}/seller/${seller.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const updatedSeller = response.data?.data || response.data;

      setSeller(updatedSeller);

      Cookies.set("seller", JSON.stringify(updatedSeller), {
        expires: 1,
        sameSite: "lax",
      });

      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    } finally {
      setProfileUpdating(false);
    }
  };

  const updateOrderItemStatus = async (
    orderItemId: number,
    status: "pending" | "accepted" | "rejected" | "processing",
  ) => {
    try {
      const token = Cookies.get("token");

      if (!token) return;

      await axios.patch(
        `${API_BASE_URL}/seller/order-items/${orderItemId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Order item updated");

      if (seller) {
        loadSellerOrders(seller.id);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order item");
    }
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "products",
      label: "Products",
      icon: Package,
    },
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingBag,
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
  ];

  return (
    <div className="flex min-h-screen bg-green-50">
      <aside className="w-[260px] min-h-screen bg-[#0d3d24] flex flex-col flex-shrink-0 sticky top-0 px-5 py-7">
        <div className="flex items-center gap-3 px-2 pb-7 mb-6 border-b border-white/[0.08]">
          <div className="w-9 h-9 bg-green-400 rounded-xl flex items-center justify-center flex-shrink-0 text-[#0d3d24]">
            <TrendingUp size={18} />
          </div>

          {/* <span className="text-white font-bold text-lg tracking-tight">
            Nex<span className="text-green-400">Cart</span>
          </span> */}
        </div>

        <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-white/30 px-2 mb-2">
          Navigation
        </p>

        <nav className="flex flex-col gap-0.5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() =>
                  setActiveSection(item.id as typeof activeSection)
                }
                className={`relative flex items-center gap-3 w-full text-left px-3 py-[11px] rounded-xl text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-green-400/15 text-green-400"
                    : "text-white/55 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-[20%] h-[60%] w-[3px] bg-green-400 rounded-r-full" />
                )}

                <Icon size={18} className="flex-shrink-0 opacity-90" />

                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex-1" />

        <div className="flex items-center gap-2.5 pt-5 mt-5 border-t border-white/[0.08]">
          <img
            src={
              seller?.nidImage
                ? `${API_BASE_URL}/uploads/${seller.nidImage}`
                : "/avatar.png"
            }
            alt="avatar"
            className="w-9 h-9 rounded-xl object-cover border border-white/15 flex-shrink-0"
          />

          <div className="flex-1 overflow-hidden">
            <p className="text-[13px] font-semibold text-white truncate">
              {seller?.name || "Seller"}
            </p>

            <p className="text-[11px] text-white/35">Seller Account</p>
          </div>

          <button
            onClick={handleLogout}
            title="Logout"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/12 text-white/40 hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 transition-all flex-shrink-0"
          >
            <LogOut size={15} />
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 flex flex-col">
        <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-black/[0.07] sticky top-0 z-10">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span>NexCart</span>

              <ChevronRight size={13} />
              <span>{sectionTitles[activeSection]}</span>
            </div>

            <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">
              {sectionTitles[activeSection]}
            </h1>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 bg-green-50 border border-black/[0.07] rounded-xl text-sm font-medium text-gray-600">
            <Store size={14} className="text-green-600" />

            <span>{seller?.shop?.shopName || "No Shop"}</span>

            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_0_3px_rgba(22,163,74,0.2)] animate-pulse" />
          </div>
        </header>

        <div className="flex-1 p-8">
          {activeSection === "dashboard" && (
            <DashboardSection seller={seller} statistics={statistics} />
          )}

          {activeSection === "products" && (
            <ProductsSection
              products={products}
              productsLoading={productsLoading}
              form={form}
              setForm={setForm}
              productImage={productImage}
              setProductImage={setProductImage}
              editingProductId={editingProductId}
              submitting={submitting}
              handleChange={handleChange}
              handleSubmitProduct={handleSubmitProduct}
              handleEdit={handleEdit}
              resetForm={resetForm}
            />
          )}

          {activeSection === "orders" && (
            <OrdersSection
              orders={orders}
              ordersLoading={ordersLoading}
              updateOrderItemStatus={updateOrderItemStatus}
            />
          )}

          {activeSection === "profile" && (
            <ProfileSection
              seller={seller}
              profileForm={profileForm}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              profileUpdating={profileUpdating}
              handleProfileChange={handleProfileChange}
              handleUpdateProfile={handleUpdateProfile}
            />
          )}
        </div>
      </main>
    </div>
  );
}
