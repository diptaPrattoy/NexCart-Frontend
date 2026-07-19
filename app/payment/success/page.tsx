"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col items-center justify-center gap-4 px-4">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 py-16 px-8 flex flex-col items-center gap-4 max-w-md w-full">
        <div className="bg-green-50 p-6 rounded-full">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-800 text-center">
          Payment Successful
        </h1>
        <p className="text-slate-400 text-sm text-center">
          Your order has been confirmed and payment received. Thank you for
          shopping with us!
        </p>
        <Link
          href="/"
          className="mt-2 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
