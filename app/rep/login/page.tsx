"use client";

import { LoginLayout } from "@/components/LoginLayout";
import { useRouter } from "next/navigation";

export default function RepLoginPage() {
  const router = useRouter();

  async function handleLogin(email: string, password: string) {
    try {
      const res = await fetch("/api/rep-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) { router.push("/rep"); return null; }
      return "Invalid email or password.";
    } catch { return "An error occurred."; }
  }

  return (
    <LoginLayout
      title="Sales Rep Portal"
      subtitle="Access your sales tools and pipeline"
      onSubmit={handleLogin}
      redirectTo="/rep"
      showEmailField={true}
    />
  );
}
