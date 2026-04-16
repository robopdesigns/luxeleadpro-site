import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OwnerDash from "./OwnerDash";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("dashboard_auth")?.value !== "1") redirect("/dashboard/login");
  return <OwnerDash />;
}
