"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import { toast } from "sonner";

export default function Navbar() {
  const router = useRouter();
  const handleLogout =
    async () => {
      try {
        await axios.post(
          "/api/auth/logout",
          {},
          {
            withCredentials: true,
          }
        );

        toast.success(
          "Logout Successful"
        );

      router.push("/login");
      } catch (error) {
        toast.error(
          "Logout Failed"
        );
      }
    };

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
      
      <h1 className="text-2xl font-bold">
        UserApp
      </h1>

      <div className="flex items-center gap-6">
        
        <Link
          href="/dashboard"
          className="hover:text-gray-300 transition"
        >
          Dashboard
        </Link>

        <Link
          href="/profile"
          className="hover:text-gray-300 transition"
        >
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
