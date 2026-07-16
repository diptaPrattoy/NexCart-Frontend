"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { LogIn } from "lucide-react";

const sellerLoginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SellerLoginData = z.infer<typeof sellerLoginSchema>;

export default function SellerLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (token && role) {
      router.push(`/dashboard/${role}`);
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SellerLoginData>({
    resolver: zodResolver(sellerLoginSchema),
  });

  const onSubmit = async (data: SellerLoginData) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/seller/login",
        data,
      );

      const token =
        response.data?.access_token ||
        response.data?.accessToken ||
        response.data?.token;

      if (!token) {
        toast.error("Token not found in login response");
        return;
      }

      Cookies.set("token", token, {
        expires: 1,
        sameSite: "strict",
      });

      Cookies.set("role", "seller", {
        expires: 1,
        sameSite: "strict",
      });

      if (response.data?.seller) {
        Cookies.set("seller", JSON.stringify(response.data.seller), {
          expires: 1,
          sameSite: "strict",
        });
      }

      if (response.data?.data) {
        Cookies.set("seller", JSON.stringify(response.data.data), {
          expires: 1,
          sameSite: "strict",
        });
      }

      toast.success(response.data?.message || "Seller login successful");

      setTimeout(() => {
        router.push("/dashboard/seller/");
      }, 800);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (Array.isArray(message)) {
          toast.error(message.join(", "));
        } else {
          toast.error(message || "Seller login failed");
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-green-600 text-white flex items-center justify-center">
            <LogIn size={30} />
          </div>

          <h1 className="text-3xl font-black text-gray-900">Seller Login</h1>

          <p className="text-sm text-gray-500 mt-1">
            Access your NexCart seller account
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
        >
          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
            />

            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
            />

            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have a seller account?{" "}
          <Link
            href="/register/seller"
            className="text-green-600 font-bold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
