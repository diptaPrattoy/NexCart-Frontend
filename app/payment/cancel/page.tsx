"use client";

import Link from "next/link";
import { CircleSlash } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col items-center justify-center gap-4 px-4">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 py-16 px-8 flex flex-col items-center gap-4 max-w-md w-full">
        <div className="bg-amber-50 p-6 rounded-full">
          <CircleSlash size={48} className="text-amber-500" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-800 text-center">
          Payment Cancelled
        </h1>
        <p className="text-slate-400 text-sm text-center">
          You cancelled the payment before it completed. Your order is still saved — you can try paying again anytime.
        </p>
        <Link
          href="/cart"
          className="mt-2 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
        >
          Back to Cart
        </Link>
      </div>
    </div>
  );
}