"use client";

import { useMemo, useState } from "react";

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

function csvEscape(value: string) {
  return `"${value.replaceAll("\"", "\"\"")}"`;
}

export default function DashboardClient({
  leads,
  appointments,
}: {
  leads: Lead[];
  appointments: Appointment[];
}) {
  const [query, setQuery] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const filteredLeads = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;

    return leads.filter((lead) =>
      [lead.full_name, lead.email, lead.phone, lead.market_area]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q))
    );
  }, [leads, query]);


  function exportLeadsCsv() {
    const headers = ["Name", "Email", "Phone", "Market", "Created"];
    const rows = filteredLeads.map((l) => [
      l.full_name || "",
      l.email || "",
      l.phone || "",
      l.market_area || "",
      l.created_at ? new Date(l.created_at).toISOString() : "",
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((c) => csvEscape(String(c))).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `luxeleadpro-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  async function logout() {
    setLoggingOut(true);
    await fetch("/api/dashboard-logout", { method: "POST" });
    window.location.href = "/dashboard/login";
  }

  return (
    <main className="min-h-screen bg-black p-6 text-white">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Luxe Lead AI Pro — Dashboard</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={exportLeadsCsv}
            className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
          >
            Export Leads CSV
          </button>
          <button
            onClick={logout}
            disabled={loggingOut}
            className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300 disabled:opacity-60"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>

      <section className="mb-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase text-white/60">Total leads loaded</p>
          <p className="mt-2 text-2xl font-bold">{leads.length}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase text-white/60">Filtered leads</p>
          <p className="mt-2 text-2xl font-bold">{filteredLeads.length}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase text-white/60">Appointments loaded</p>
          <p className="mt-2 text-2xl font-bold">{appointments.length}</p>
        </div>
      </section>

      <section className="mb-10">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Recent Leads</h2>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads..."
            className="w-full max-w-xs rounded-xl border border-white/20 bg-black/40 px-4 py-2 text-sm outline-none focus:border-yellow-400"
          />
        </div>
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
              {filteredLeads.map((l) => (
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
        <h2 className="mb-3 text-xl font-semibold">Recent Appointments</h2>
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
              {appointments.map((a) => (
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
