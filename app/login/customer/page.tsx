"use client";

import Link from "next/link";
import Image from "next/image";

export default function CustomerLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#dcdcdc] px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div className="p-10 flex flex-col justify-center bg-[#e5e5e5] relative">
          {/* Logo */}
          <div className="absolute top-6 left-6 border-4 border-black w-16 h-16 flex items-center justify-center">
            <h1 className="text-3xl font-light">△</h1>
          </div>

          <div className="mt-10">
            <h1 className="text-5xl font-bold mb-10 text-center">Login In</h1>

            <form className="space-y-6">
              {/* Email */}
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-white px-5 py-4 rounded-2xl outline-none shadow-md"
              />

              {/* Password */}
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-white px-5 py-4 rounded-2xl outline-none shadow-md"
              />

              {/* Forgot Password */}
              <div>
                <button
                  type="button"
                  className="text-sm underline text-gray-600"
                >
                  forget password
                </button>
              </div>

              {/* Login Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 transition text-white px-12 py-3 rounded-full font-semibold shadow-lg"
                >
                  Login in
                </button>
              </div>

              {/* Signup */}
              <p className="text-center text-sm">
                Don&apos;t have account?{" "}
                <Link
                  href="/register/customer"
                  className="text-blue-500 underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-green-500 flex items-center justify-center p-10">
          <Image
            src="/asset/login.jpg"
            alt="Grocery Store"
            width={500}
            height={500}
            className="w-full h-full object-cover  bg-full rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
}
