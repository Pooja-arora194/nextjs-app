"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { toast } from "sonner";

import Navbar from "../../components/layout/Navbar";

export default function Profile() {
  const [loading, setLoading] =
    useState(true);
const [isGoogleUser, setIsGoogleUser] =
  useState(false);
const router = useRouter();
  console.log(isGoogleUser, "isGoogleUser")
  const [updating, setUpdating] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
    });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile =
    async () => {
      try {
        const res =
          await axios.get(
            "/api/profile",{ withCredentials: true, }
          );

        if (
          res.data.success
        ) {
          console.log(res.data, "dfnncxnbvncxv")
          setFormData({
            name:
              res.data.user.name,

            email:
              res.data.user.email,
          });
           setIsGoogleUser(
    res.data.user.provider ===
      "google"
  );
        } else {
        router.push("/login");
        }
      } catch (error) {
        toast.error(
          "Unauthorized"
        );

      router.push("/login");
      } finally {
        setLoading(false);
      }
    };

  const handleUpdate =
    async (e) => {
      e.preventDefault();

      try {
        setUpdating(true);

        const res =
          await axios.put(
            "/api/profile",
            formData,{ withCredentials: true, }
          );

        if (
          res.data.success
        ) {
          toast.success(
            "Profile Updated Successfully"
          );
        }
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Update Failed"
        );
      } finally {
        setUpdating(false);
      }
    };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-14 h-14 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-50 flex justify-center items-center p-6">
        
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8">
          
          <div className="flex flex-col items-center mb-8">
            
            <div className="w-28 h-28 rounded-full bg-black text-white flex justify-center items-center text-5xl font-bold mb-5">
              {formData.name?.charAt(0)}
            </div>

            <h1 className="text-4xl font-bold text-gray-900">
              My Profile
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your account information
            </p>
          </div>

          <form
            onSubmit={handleUpdate}
          >
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={
                  formData.name
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name:
                      e.target
                        .value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={
                  formData.email
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email:
                      e.target
                        .value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your email"
              />
            </div>

          <button
  type="submit"
  disabled={
    updating ||
    isGoogleUser
  }
  className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-2xl font-semibold transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
>
  {isGoogleUser
    ? "Managed by Google"
    : updating
    ? "Updating..."
    : "Save Changes"}
</button>
          </form>
        </div>
      </div>
    </>
  );
}
