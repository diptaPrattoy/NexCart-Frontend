"use client";

import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

export default function CustomerLoginPage() {
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (token && role) {
      window.location.href = `/dashboard/${role}`;
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    // Zod Validation
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      setErrors(
        result.error.flatten().fieldErrors
      );

      toast.error("Please fix the form errors");

      return;
    }

    try {
      setLoading(true);

      // Backend Login API
      const res = await axios.post(
        "http://localhost:3000/customer/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log(res.data);

      // Save JWT Token
      Cookies.set("token", res.data.token);

      // Save Role
      Cookies.set("role", "customer");

      // Success Toast
      toast.success("Login Successful 🎉");

      // if (usertype == )
      // {
      //     window.location.href =
      //   "/dashboard/customer";

      // }else(tpyr == )
      // {

      // }
      
      // Full Reload Redirect
      window.location.href =
        "/dashboard/customer";

    } catch (error: any) {
      console.log(error);

      // Error Toast
      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-blue-100 to-white px-4">

      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8">

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
          Customer Login
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Welcome back to NexCart
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
            />

            <p className="text-red-500 text-sm mt-1">
              {errors?.email?.[0]}
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
            />

            <p className="text-red-500 text-sm mt-1">
              {errors?.password?.[0]}
            </p>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 transition text-white py-3 rounded-xl font-semibold shadow-lg"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register/customer"
            className="text-blue-500 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}