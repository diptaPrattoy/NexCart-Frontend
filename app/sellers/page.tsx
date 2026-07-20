"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Loader2,
  Mail,
  MapPin,
  Package,
  Phone,
  Search,
  Store,
  UserRound,
} from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://nexcart-backend-o86x.onrender.com";

interface Product {
  id: number;
  name?: string;
  productName?: string;
  price?: number;
  quantity?: number;
  productImage?: string;
}

interface SellerShop {
  id: number;
  shopName: string;
  shopAddress: string;
}

interface Seller {
  id: number;
  name: string;
  email: string;
  phone: string;
  shop?: SellerShop | null;
  products?: Product[];
}

function extractSellers(data: unknown): Seller[] {
  if (Array.isArray(data)) {
    return data as Seller[];
  }

  if (data && typeof data === "object" && "data" in data) {
    const responseData = (data as { data?: unknown }).data;
    return Array.isArray(responseData) ? (responseData as Seller[]) : [];
  }

  return [];
}

export default function SellerPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadSellers() {
      try {
        setLoading(true);
        setError("");

        /**
         * Recommended backend route:
         * GET /seller/public
         *
         * This should be a public route that returns sellers without:
         * password, nidNumber, nidImage, tradeLicense
         */
        const response = await fetch(`${API_BASE_URL}/seller/public`, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load sellers");
        }

        const result = await response.json();

        const safeSellers = extractSellers(result).map((seller) => ({
          id: seller.id,
          name: seller.name,
          email: seller.email,
          phone: seller.phone,
          shop: seller.shop
            ? {
                id: seller.shop.id,
                shopName: seller.shop.shopName,
                shopAddress: seller.shop.shopAddress,
              }
            : null,
          products: Array.isArray(seller.products) ? seller.products : [],
        }));

        setSellers(safeSellers);
      } catch {
        setError("Unable to load sellers right now.");
      } finally {
        setLoading(false);
      }
    }

    loadSellers();
  }, []);

  const filteredSellers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return sellers;
    }

    return sellers.filter((seller) => {
      const shopName = seller.shop?.shopName?.toLowerCase() || "";
      const shopAddress = seller.shop?.shopAddress?.toLowerCase() || "";

      const sellerName = seller.name?.toLowerCase() || "";
      const sellerEmail = seller.email?.toLowerCase() || "";
      const sellerPhone = seller.phone?.toLowerCase() || "";

      return (
        sellerName.includes(keyword) ||
        sellerEmail.includes(keyword) ||
        sellerPhone.includes(keyword) ||
        shopName.includes(keyword) ||
        shopAddress.includes(keyword)
      );
    });
  }, [search, sellers]);

  return (
    <main className="min-h-screen bg-[#f5fbf3]">
      <section className="bg-gradient-to-br from-[#e8f7e5] via-[#f5fbf3] to-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
              NexCart Sellers
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-[#15391f] sm:text-5xl">
              Trusted Sellers on NexCart
            </h1>

            <p className="mt-4 text-base leading-7 text-[#687b63] sm:text-lg">
              Browse verified sellers, explore their shops, and find products
              from trusted local businesses.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6f8068]"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search sellers, shops, email, phone, location..."
                className="w-full rounded-2xl border border-green-100 bg-white py-4 pl-12 pr-4 text-sm font-medium text-[#15391f] shadow-sm outline-none transition placeholder:text-[#91a18c] focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center">
              <div className="text-center">
                <Loader2
                  size={42}
                  className="mx-auto animate-spin text-green-700"
                />
                <p className="mt-4 font-semibold text-[#687b63]">
                  Loading sellers...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="mx-auto max-w-xl rounded-3xl border border-red-100 bg-red-50 p-6">
              <div className="flex gap-3">
                <AlertCircle className="shrink-0 text-red-600" />
                <div>
                  <h2 className="font-bold text-red-700">
                    Sellers could not be loaded
                  </h2>
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                </div>
              </div>
            </div>
          ) : filteredSellers.length === 0 ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-green-100 bg-white p-8 text-center shadow-sm">
              <div>
                <Store size={46} className="mx-auto text-green-700" />
                <h2 className="mt-4 text-xl font-black text-[#15391f]">
                  No sellers found
                </h2>
                <p className="mt-2 text-sm text-[#687b63]">
                  Try searching with another seller name, shop name, or
                  location.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredSellers.map((seller) => {
                const productCount = seller.products?.length || 0;

                return (
                  <article
                    key={seller.id}
                    className="group overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="h-2 bg-gradient-to-r from-green-700 via-green-500 to-lime-400" />

                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-xl font-black text-green-700">
                          {seller.name?.charAt(0)?.toUpperCase() || "S"}
                        </div>

                        <div className="min-w-0">
                          <h2 className="truncate text-xl font-black text-[#15391f]">
                            {seller.name}
                          </h2>

                          <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-green-700">
                            <Store size={16} />
                            {seller.shop?.shopName || "Shop not added"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        <div className="flex gap-3 rounded-2xl bg-[#f5fbf3] p-4">
                          <Mail
                            size={18}
                            className="mt-0.5 shrink-0 text-green-700"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold uppercase tracking-wide text-[#687b63]">
                              Email
                            </p>
                            <p className="break-all text-sm font-semibold text-[#15391f]">
                              {seller.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3 rounded-2xl bg-[#f5fbf3] p-4">
                          <Phone
                            size={18}
                            className="mt-0.5 shrink-0 text-green-700"
                          />
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-[#687b63]">
                              Phone
                            </p>
                            <p className="text-sm font-semibold text-[#15391f]">
                              {seller.phone}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3 rounded-2xl bg-[#f5fbf3] p-4">
                          <MapPin
                            size={18}
                            className="mt-0.5 shrink-0 text-green-700"
                          />
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-[#687b63]">
                              Shop Address
                            </p>
                            <p className="text-sm font-semibold leading-6 text-[#15391f]">
                              {seller.shop?.shopAddress ||
                                "Address not available"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-green-100 bg-white p-4">
                          <div className="flex items-center gap-2 text-green-700">
                            <Package size={18} />
                            <p className="text-xs font-bold uppercase tracking-wide">
                              Products
                            </p>
                          </div>

                          <p className="mt-2 text-2xl font-black text-[#15391f]">
                            {productCount}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-green-100 bg-white p-4">
                          <div className="flex items-center gap-2 text-green-700">
                            <UserRound size={18} />
                            <p className="text-xs font-bold uppercase tracking-wide">
                              Seller ID
                            </p>
                          </div>

                          <p className="mt-2 text-2xl font-black text-[#15391f]">
                            #{seller.id}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
