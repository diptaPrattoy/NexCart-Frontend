"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function RiderDashboard() {
  const [rider, setRider] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [status, setStatus] = useState("");

  const [token, setToken] = useState<string | null>(null);
  const [riderId, setRiderId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  // Fetch Rider Information
  const fetchRider = async (
    token: string,
    riderId: string
  ) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/riders/${riderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRider(res.data);
      setStatus(res.data.status);

    } catch (error: any) {
      console.log(error);

      // Unauthorized
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("riderId");
        localStorage.removeItem("rider");

        window.location.href = "/login/rider";
      }
    }
  };

  // Fetch Reviews
  const fetchReviews = async (
    token: string,
    riderId: string
  ) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/riders/${riderId}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviews(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  // Load Data
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRiderId = localStorage.getItem("riderId");

    // If not logged in
    if (!storedToken || !storedRiderId) {
      window.location.href = "/login/rider";
      return;
    }

    setToken(storedToken);
    setRiderId(storedRiderId);

    const loadData = async () => {
      await fetchRider(storedToken, storedRiderId);
      await fetchReviews(storedToken, storedRiderId);

      setLoading(false);
    };

    loadData();

  }, []);

  // Change Rider Status
  const changeStatus = async () => {
    try {
      if (!token || !riderId) return;

      await axios.patch(
        `http://localhost:3000/riders/${riderId}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Status Updated Successfully");

      fetchRider(token, riderId);

    } catch (error) {
      console.log(error);

      alert("Failed to update status");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("riderId");
    localStorage.removeItem("rider");

    window.location.href = "/login/rider";
  };

  // Loading State
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-2xl font-bold">
        Loading Dashboard...
      </div>
    );
  }

  // No Rider
  if (!rider) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 text-2xl font-bold">
        Rider Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold">
              Welcome, {rider.name}
            </h1>

            <p className="text-gray-500 mt-1">
              {rider.email}
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">

          {/* Rider Profile */}
          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h2 className="text-2xl font-bold mb-5">
              Rider Profile
            </h2>

            <div className="space-y-3">

              <p>
                <strong>Name:</strong> {rider.name}
              </p>

              <p>
                <strong>Email:</strong> {rider.email}
              </p>

              <p>
                <strong>Phone:</strong> {rider.phone}
              </p>

              <p>
                <strong>Vehicle:</strong>{" "}
                {rider.vehicle_type || "N/A"}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {rider.current_location || "N/A"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="text-blue-600 font-bold capitalize">
                  {rider.status}
                </span>
              </p>

            </div>

          </div>

          {/* Change Status */}
          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h2 className="text-2xl font-bold mb-5">
              Change Status
            </h2>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border p-3 rounded-lg"
            >
              <option value="available">
                Available
              </option>

              <option value="busy">
                Busy
              </option>

              <option value="offline">
                Offline
              </option>
            </select>

            <button
              onClick={changeStatus}
              className="bg-blue-500 hover:bg-blue-600 text-white w-full mt-5 py-3 rounded-lg"
            >
              Update Status
            </button>

          </div>

          {/* Stats */}
          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h2 className="text-2xl font-bold mb-5">
              Dashboard Stats
            </h2>

            <div className="space-y-4">

              <div className="bg-green-100 p-4 rounded-lg">
                <p className="font-semibold">
                  Total Reviews
                </p>

                <p className="text-2xl font-bold">
                  {reviews.length}
                </p>
              </div>

              <div className="bg-yellow-100 p-4 rounded-lg">
                <p className="font-semibold">
                  Current Status
                </p>

                <p className="text-2xl font-bold capitalize">
                  {rider.status}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-6">

          <h2 className="text-2xl font-bold mb-6">
            Rider Reviews
          </h2>

          {reviews.length === 0 ? (
            <div className="text-gray-500">
              No reviews yet.
            </div>
          ) : (
            <div className="space-y-4">

              {reviews.map((review: any) => (
                <div
                  key={review.id}
                  className="border rounded-xl p-4"
                >
                  <p className="font-bold text-lg">
                    ⭐ Rating: {review.rating}
                  </p>

                  <p className="text-gray-700 mt-2">
                    {review.comment}
                  </p>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}