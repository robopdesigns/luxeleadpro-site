"use client";

import { LoginLayout } from "@/components/LoginLayout";
import { auth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function ManagerLoginPage() {
  const router = useRouter();

  async function handleLogin(email: string, password: string) {
    try {
      const result = await auth.login(email, password);
      if (result.error) return result.error;
      const role = result.profile?.role;
      if (role && role !== "manager" && role !== "admin") return "This account is not a manager account";
      router.push("/manager");
      return null;
    } catch { return "An error occurred. Please try again."; }
  }

  return (
    <LoginLayout
      title="Manager Login"
      subtitle="Access your team management dashboard"
      onSubmit={handleLogin}
      redirectTo="/manager"
      altLink={{ text: "Are you an agent?Agent login", href: "/agent/login" }}
      showEmailField={true}
    />
  );
}
