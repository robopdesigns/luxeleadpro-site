import { createClient } from "@supabase/supabase-js";
import DashboardClient from "./DashboardClient";

type Lead = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  market_area: string | null;
  created_at: string | null;
};

type Appointment = {
  id: string;
  lead_name: string | null;
  lead_email: string | null;
  event_type: string | null;
  appointment_time: string | null;
  status: string | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getData(): Promise<{ leads: Lead[]; appointments: Appointment[] }> {
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  const { data: appointments } = await supabase
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  return {
    leads: (leads as Lead[] | null) || [],
    appointments: (appointments as Appointment[] | null) || [],
  };
}

export default async function DashboardPage() {
  const { leads, appointments } = await getData();
  return <DashboardClient leads={leads} appointments={appointments} />;
}
