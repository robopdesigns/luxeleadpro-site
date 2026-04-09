"use client";

import { LoginLayout } from "@/components/LoginLayout";
import { auth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AgentLoginPage() {
  const router = useRouter();

  async function handleLogin(email: string, password: string) {
    try {
      const result = await auth.login(email, password);
      if (result.error) return result.error;
      const role = result.profile?.role;
      if (role && role !== "agent" && role !== "admin") return "This account is not an agent account";
      router.push("/agent");
      return null;
    } catch { return "An error occurred. Please try again."; }
  }

  return (
    <LoginLayout
      title="Agent Login"
      subtitle="Access your lead intelligence dashboard"
      onSubmit={handleLogin}
      redirectTo="/agent"
      altLink={{ text: "Need an account?Contact us", href: "/pricing" }}
      showEmailField={true}
    />
  );
}
