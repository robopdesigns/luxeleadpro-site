"use client";

import { LoginLayout } from "@/components/LoginLayout";
import { useRouter } from "next/navigation";

export default function DashboardLoginPage() {
  const router = useRouter();

  async function handleLogin(_email: string, password: string) {
    try {
      const res = await fetch("/api/dashboard-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) { router.push("/dashboard"); return null; }
      return "Invalid password. Please try again.";
    } catch { return "An error occurred."; }
  }

  return (
    <LoginLayout
      title="Owner Dashboard"
      subtitle="Access your command center"
      onSubmit={handleLogin}
      redirectTo="/dashboard"
      showEmailField={false}
    />
  );
}
