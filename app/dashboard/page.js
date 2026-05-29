"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import axios from "axios";

import { useSession } from "next-auth/react";

import { toast } from "sonner";

import Navbar from "../../components/layout/Navbar";

export default function Dashboard() {
  const {
    data: session,
    status,
  } = useSession();
const router = useRouter();
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchUser();
  }, [status]);

  const fetchUser =
    async () => {
      try {
        // Google Login User
        if (
          session?.user
        ) {
          setUser({
            name:
              session.user.name,

            email:
              session.user.email,
          });

          setLoading(false);

          return;
        }

        // Email/Password User
        const res =
          await axios.get(
            "/api/auth/me",
            {
              withCredentials: true,
            }
          );

        if (
          res.data.success
        ) {
          setUser(
            res.data.user
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

  if (
    loading ||
    status === "loading"
  ) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 font-medium">
        Loading...
      </p>
    </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen p-10 bg-gray-100">
        
        <h1 className="text-4xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          
          <h2 className="text-2xl font-bold">
            Welcome,
            {" "}
            {user?.name}
          </h2>

          <p className="text-gray-500 mt-2">
            {user?.email}
          </p>
        </div>
      </div>
    </>
  );
}
