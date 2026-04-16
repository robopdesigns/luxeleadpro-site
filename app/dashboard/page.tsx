import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("dashboard_auth")?.value !== "1") redirect("/dashboard/login");
  return <iframe src="/v2/dashboard-owner.html" style={{ width: "100%", height: "100vh", border: "none", display: "block" }} />;
}
