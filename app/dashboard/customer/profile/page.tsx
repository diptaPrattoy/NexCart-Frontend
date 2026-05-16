"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CustomerProfilePage() {
  const [user, setUser] = useState<any>(null);

  const [profilePic, setProfilePic] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  // FETCH PROFILE
  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    // AUTH CHECK
    if (!token || role !== "customer") {
      window.location.href = "/login/customer";

      return;
    }

    // GET PROFILE
    axios
      .get("http://localhost:3000/customer/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        setUser(res.data);

        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
        });
      })
      .catch((err) => {
        console.log(err);

        toast.error("Failed to load profile");
      });
  }, []);

  // UPDATE PROFILE
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = Cookies.get("token");

      // CREATE FORMDATA
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);

      formDataToSend.append("email", formData.email);

      // IMAGE
      if (profilePic) {
        formDataToSend.append("profilePic", profilePic);
      }

      console.log(profilePic);

      // API REQUEST
      const res = await axios.put(
        `http://localhost:3000/customer/profile/${user.id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res.data);

      toast.success("Profile Updated Successfully");

      // REFRESH PROFILE
      setUser(res.data.user);
    } catch (error: any) {
      console.log(error);

      toast.error(error.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg grid grid-cols-1 md:grid-cols-3 overflow-hidden">
        {/* LEFT SIDE */}
        <div className="bg-[#0f172a] text-white p-10 flex flex-col items-center justify-center">
          {/* PROFILE IMAGE */}
          <img
            src={
              user?.profilePic
                ? `http://localhost:3000/uploads/profile/${user.profilePic}?t=${new Date().getTime()}`
                : "https://i.pravatar.cc/200"
            }
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
          />

          {/* NAME */}
          <h1 className="text-2xl font-bold mt-6">
            {user?.name || "Loading..."}
          </h1>

          {/* EMAIL */}
          <p className="text-slate-300 mt-2 text-center">
            {user?.email || "Loading..."}
          </p>

          {/* CHANGE PHOTO */}
          <label className="mt-6 bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-xl font-semibold cursor-pointer">
            Change Photo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setProfilePic(e.target.files[0]);
                }
              }}
            />
          </label>

          {/* IMAGE NAME */}
          {profilePic && (
            <p className="mt-3 text-sm text-slate-300 text-center">
              {profilePic.name}
            </p>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="md:col-span-2 p-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Edit Profile
          </h2>

          <form onSubmit={handleUpdate} className="space-y-6">
            {/* NAME */}
            <div>
              <label className="block mb-2 text-slate-600 font-medium">
                Full Name
              </label>

              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-2 text-slate-600 font-medium">
                Email
              </label>

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* UPDATE BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 transition text-white px-8 py-4 rounded-2xl font-semibold shadow-lg"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
