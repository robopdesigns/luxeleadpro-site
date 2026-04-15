import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OwnerDashboardClient from "./OwnerDashboardClient";

export default async function OwnerDashboardPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("dashboard_auth")?.value !== "1") {
    redirect("/dashboard/login");
  }

  return <OwnerDashboardClient />;
}
