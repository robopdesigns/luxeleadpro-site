import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getData() {
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

return { leads: leads || [], appointments: appointments || [] };
}

export default async function DashboardPage() {
const { leads, appointments } = await getData();

return (
<main className="min-h-screen bg-black text-white p-6">
<h1 className="text-3xl font-bold mb-6">Luxe Lead AI Pro — Dashboard</h1>

<section className="mb-10">
<h2 className="text-xl font-semibold mb-3">Recent Leads</h2>
<div className="overflow-x-auto rounded-xl border border-white/10">
<table className="w-full text-sm">
<thead className="bg-white/10">
<tr>
<th className="p-3 text-left">Name</th>
<th className="p-3 text-left">Email</th>
<th className="p-3 text-left">Phone</th>
<th className="p-3 text-left">Market</th>
<th className="p-3 text-left">Created</th>
</tr>
</thead>
<tbody>
{leads.map((l: any) => (
<tr key={l.id} className="border-t border-white/10">
<td className="p-3">{l.full_name || "-"}</td>
<td className="p-3">{l.email || "-"}</td>
<td className="p-3">{l.phone || "-"}</td>
<td className="p-3">{l.market_area || "-"}</td>
<td className="p-3">
{l.created_at ? new Date(l.created_at).toLocaleString() : "-"}
</td>
</tr>
))}
</tbody>
</table>
</div>
</section>

<section>
<h2 className="text-xl font-semibold mb-3">Recent Appointments</h2>
<div className="overflow-x-auto rounded-xl border border-white/10">
<table className="w-full text-sm">
<thead className="bg-white/10">
<tr>
<th className="p-3 text-left">Name</th>
<th className="p-3 text-left">Email</th>
<th className="p-3 text-left">Event</th>
<th className="p-3 text-left">Time</th>
<th className="p-3 text-left">Status</th>
</tr>
</thead>
<tbody>
{appointments.map((a: any) => (
<tr key={a.id} className="border-t border-white/10">
<td className="p-3">{a.lead_name || "-"}</td>
<td className="p-3">{a.lead_email || "-"}</td>
<td className="p-3">{a.event_type || "-"}</td>
<td className="p-3">
{a.appointment_time
? new Date(a.appointment_time).toLocaleString()
: "-"}
</td>
<td className="p-3">{a.status || "-"}</td>
</tr>
))}
</tbody>
</table>
</div>
</section>
</main>
);
}