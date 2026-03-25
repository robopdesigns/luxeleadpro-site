"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "agent" | "manager" | "admin";
}

// DEMO MODE: Set to true to bypass auth and preview dashboards
const DEMO_MODE = true;

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Allow demo access without auth
    if (DEMO_MODE) return;

    if (loading) return;

    if (!user) {
      if (requiredRole === "manager") {
        router.push("/manager/login");
      } else {
        router.push("/agent/login");
      }
      return;
    }

    if (requiredRole && profile?.role !== requiredRole) {
      router.push("/");
      return;
    }
  }, [user, profile, loading, requiredRole, router]);

  if (!DEMO_MODE && loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!DEMO_MODE && !user) {
    return null;
  }

  if (!DEMO_MODE && requiredRole && profile?.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
