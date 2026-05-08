"use client";

import { useState } from "react";
import { z } from "zod";

// ✅ Fixed Schema
const customerSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" }),

  email: z.string().email({ message: "Invalid Email" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),

  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" }),

  phone: z
    .string()
    .regex(/^\d{11}$/, { message: "Phone number must be 11 digits" }),
});

export default function RegisterCustomer() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const result = customerSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors(formattedErrors);
      setSuccess("");
    } else {
      setErrors({});
      setSuccess("Customer Registration Successful 🎉");

      // reset form
      setFormData({
        fullName: "",
        email: "",
        password: "",
        address: "",
        phone: "",
      });
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-white via-blue-200 to-white p-6 min-h-screen">

      <div className="bg-white/30 shadow-2xl backdrop-blur-xl p-8 border border-white/40 rounded-3xl w-full max-w-md">

        <h2 className="mb-4 font-extrabold text-green-900 text-xl text-center">
          🛒 Customer Registration
        </h2>

        {/* ✅ Success Message */}
        {success && (
          <p className="mb-4 font-semibold text-green-700 text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold text-green-900">
              Name:
            </label>
            <input
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="bg-white p-3 border rounded-lg w-full"
              placeholder="Enter your full name"
            />
            <p className="text-red-500 text-sm">
              {errors?.fullName?.[0]}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold text-green-900">
              Email:
            </label>
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-white p-3 border rounded-lg w-full"
              placeholder="example@gmail.com"
            />
            <p className="text-red-500 text-sm">
              {errors?.email?.[0]}
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold text-green-900">
              Password:
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="bg-white p-3 border rounded-lg w-full"
                placeholder="Enter password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="top-2 right-2 absolute bg-gray-700 px-2 py-1 rounded text-white text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <p className="text-red-500 text-sm">
              {errors?.password?.[0]}
            </p>
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-semibold text-green-900">
              Address:
            </label>
            <input
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="bg-white p-3 border rounded-lg w-full"
              placeholder="Delivery address"
            />
            <p className="text-red-500 text-sm">
              {errors?.address?.[0]}
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-semibold text-green-900">
              Phone:
            </label>
            <input
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="bg-white p-3 border rounded-lg w-full"
              placeholder="01XXXXXXXXX"
            />
            <p className="text-red-500 text-sm">
              {errors?.phone?.[0]}
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 shadow-lg py-3 rounded-xl w-full font-bold text-white"
          >
            Register Customer
          </button>
        </form>

        <p className="mt-5 text-green-900 text-sm text-center">
          🛍️ Online Grocery System
        </p>
      </div>
    </div>
  );
}