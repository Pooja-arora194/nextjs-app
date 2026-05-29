"use client";
import { toast } from "sonner";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

import axios from "axios";

export default function Login() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "/api/auth/login",
        formData
      );

      const data = res.data;

      if (data.success) {
        toast.success( "Login Successful" );
        router.push("/dashboard");
      } else {
       toast.error(data.message);
      }
    } catch (error) {
    toast.error(
        error.response?.data
          ?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex justify-center items-center px-5">
      
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password:
                    e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-xl font-semibold transition duration-300 mb-4"
          >
            {loading
              ? "Please Wait..."
              : "Login"}
          </button>

          <button
            type="button"
            onClick={() =>
              signIn("google", {
                callbackUrl:
                  "/dashboard",
              })
            }
            className="w-full border border-gray-300 hover:bg-gray-100 py-4 rounded-xl font-semibold transition duration-300"
          >
            Continue with Google
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don’t have an account?
          <span
            onClick={() =>
              router.push(
                "/register"
              )
            }
            className="text-blue-600 cursor-pointer font-medium ml-2"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
