import Link from "next/link";
import { ArrowLeft, ShoppingCart, Store, MapPin, Package } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";

const API_BASE_URL = "https://nexcart-backend-o86x.onrender.com";

type SellerShop = {
  id: number;
  shopName: string;
  shopAddress: string;
  tradeLicense: string;
};

type Product = {
  id: number;
  productName: string;
  category: string;
  description?: string | null;
  price: number;
  quantity: number;
  productImage?: string | null;
  sellerShop?: SellerShop | null;
};

import axios from "axios";

async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await axios.get(`${API_BASE_URL}/seller/products/${id}`);
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 md:p-16 text-center max-w-md w-full">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5">
            <Package className="text-red-400" size={28} />
          </div>
          <h1 className="text-2xl font-black text-slate-800">
            Product Not Found
          </h1>
          <p className="mt-2 text-slate-500 text-sm">
            The product you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <ArrowLeft size={16} />
            Back To Home
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = product.productImage
    ? `${API_BASE_URL}/uploads/products/${product.productImage}`
    : "";

  const isOutOfStock = Number(product.quantity) <= 0;

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-14">
      <div className="max-w-6xl mx-auto px-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-semibold text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* LEFT — Image */}
            <div className="relative bg-slate-50 min-h-[320px] md:min-h-[560px] flex items-center justify-center">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ShoppingCart className="text-indigo-200" size={100} />
              )}

              <span
                className={`absolute top-5 left-5 px-3 py-1.5 rounded-full text-xs font-black ${
                  isOutOfStock
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {isOutOfStock ? "Out of Stock" : "In Stock"}
              </span>
            </div>

            {/* RIGHT — Details */}
            <div className="p-6 md:p-10 flex flex-col">
              <span className="text-indigo-600 font-black uppercase tracking-widest text-xs">
                {product.category}
              </span>

              <h1 className="mt-2 text-3xl md:text-4xl font-black text-slate-800 leading-tight">
                {product.productName}
              </h1>

              <p className="mt-4 text-3xl md:text-4xl font-black text-slate-900">
                ৳{Number(product.price).toLocaleString()}
              </p>

              <div className="my-6 h-px bg-slate-100" />

              <p className="text-slate-500 leading-relaxed text-sm">
                {product.description || "No description available."}
              </p>

              <div className="my-6 h-px bg-slate-100" />

              {/* Meta info */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                    <Package size={16} className="text-indigo-600" />
                  </div>
                  <span className="font-semibold text-slate-700 text-sm">
                    Available Quantity:{" "}
                    <span className="font-black">{product.quantity}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                    <Store size={16} className="text-indigo-600" />
                  </div>
                  <span className="font-semibold text-slate-700 text-sm">
                    {product.sellerShop?.shopName || "No Shop"}
                  </span>
                </div>

                {product.sellerShop?.shopAddress && (
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-slate-500" />
                    </div>
                    <span className="text-slate-500 text-sm">
                      {product.sellerShop.shopAddress}
                    </span>
                  </div>
                )}
              </div>

              {/* Add to cart — pushed to bottom */}
              <div className="mt-8 pt-2">
                <AddToCartButton
                  productId={product.id}
                  productName={product.productName}
                  quantity={Number(product.quantity)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
