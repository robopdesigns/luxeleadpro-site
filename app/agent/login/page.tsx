"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function AgentLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleDemoLogin = () => {
    router.push("/agent");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await auth.login(formData.email, formData.password);

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      // Allow agent and admin roles, also allow if profile not loaded yet
      const role = result.profile?.role;
      if (role && role !== "agent" && role !== "admin") {
        setError("This account is not an agent account");
        setLoading(false);
        return;
      }

      router.push("/agent");
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <svg className="w-12 h-12 mx-auto mb-4" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.2"/>
              <path d="M 35 65 L 50 35 L 65 65" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M 50 35 L 50 65" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <h1 className="text-3xl font-display font-semibold text-gray-900">
              Agent Login
            </h1>
            <p className="text-gray-600 mt-2">
              Access your lead management dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-800 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0A192F] text-white font-semibold rounded-lg hover:bg-[#1a2940] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-400 font-medium">or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-3 border-2 border-[#D4AF37]/30 text-[#D4AF37] font-semibold rounded-lg hover:bg-[#D4AF37]/10 transition"
            >
              &#9654; Preview Agent Dashboard (Demo)
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-3 text-center text-sm">
            <div>
              <Link
                href="/agent/forgot-password"
                className="text-gray-600 hover:text-[#D4AF37] font-medium transition"
              >
                Forgot your password?
              </Link>
            </div>
            <div>
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/agent/signup"
                  className="text-[#D4AF37] hover:text-[#D4AF37] font-medium transition"
                >
                  Sign up
                </Link>
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                Are you a manager?{" "}
                <Link
                  href="/manager/login"
                  className="text-[#D4AF37] hover:text-[#D4AF37] font-medium transition"
                >
                  Manager login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}


