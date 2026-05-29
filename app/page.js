
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 flex items-center justify-center px-5">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        
        {/* Left Side */}
        <div className="p-10 md:p-14 flex flex-col justify-center">
          <h1 className="text-5xl font-extrabold leading-tight text-gray-900 mb-6">
            User Management
            <span className="text-blue-600">
              {" "}Dashboard
            </span>
          </h1>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Secure authentication system with
            JWT, Google Login, Profile
            Management and Protected Routes
            using Next.js App Router.
          </p>

          <div className="flex gap-4">
            <Link
              href="/login"
              className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="border border-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-black to-gray-800 p-10">
          <div className="text-white">
            <div className="grid grid-cols-2 gap-5">
              
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl">
                <h2 className="text-4xl font-bold">
                  150+
                </h2>

                <p className="text-gray-300 mt-2">
                  Total Users
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl">
                <h2 className="text-4xl font-bold">
                  98%
                </h2>

                <p className="text-gray-300 mt-2">
                  Secure Auth
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl">
                <h2 className="text-4xl font-bold">
                  JWT
                </h2>

                <p className="text-gray-300 mt-2">
                  Authentication
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl">
                <h2 className="text-4xl font-bold">
                  OAuth
                </h2>

                <p className="text-gray-300 mt-2">
                  Google Login
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
