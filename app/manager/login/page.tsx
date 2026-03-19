"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ManagerLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

      if (result.profile?.role !== "manager") {
        setError("This account is not a manager account");
        setLoading(false);
        return;
      }

      router.push("/manager");
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center font-bold text-neutral-950 mx-auto mb-4">
              ✨
            </div>
            <h1 className="text-3xl font-display font-semibold text-white">
              Manager Login
            </h1>
            <p className="text-neutral-400 mt-2">
              Access your management dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-950 border border-red-800 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                placeholder="manager@example.com"
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
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-500 text-neutral-950 font-semibold rounded-lg hover:bg-purple-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-3 text-center text-sm">
            <div>
              <Link
                href="/manager/forgot-password"
                className="text-purple-400 hover:text-purple-300 transition"
              >
                Forgot your password?
              </Link>
            </div>
            <div>
              <p className="text-neutral-400">
                Need to create an account?{" "}
                <Link
                  href="/pricing"
                  className="text-purple-400 hover:text-purple-300 transition"
                >
                  Contact us
                </Link>
              </p>
            </div>
            <div>
              <p className="text-neutral-400">
                Are you an agent?{" "}
                <Link
                  href="/agent/login"
                  className="text-purple-400 hover:text-purple-300 transition"
                >
                  Agent login
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

