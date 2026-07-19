"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentFailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col items-center justify-center gap-4 px-4">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 py-16 px-8 flex flex-col items-center gap-4 max-w-md w-full">
        <div className="bg-red-50 p-6 rounded-full">
          <XCircle size={48} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-800 text-center">
          Payment Failed
        </h1>
        <p className="text-slate-400 text-sm text-center">
          Something went wrong while processing your payment. No charge was made — please try again.
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