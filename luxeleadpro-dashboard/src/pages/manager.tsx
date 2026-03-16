import React, { useEffect, useState } from 'react';

interface TeamMember {
  id: string;
  user_email: string;
  role: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  status: string;
  deal_value: number | null;
  qualification_score: number;
  assigned_agent_id: string;
  created_at: string;
}

interface TeamStats {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  convertedLeads: number;
  totalDealValue: number;
  averageQualificationScore: number;
}

export default function ManagerDashboard() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<TeamStats>({
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    convertedLeads: 0,
    totalDealValue: 0,
    averageQualificationScore: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  useEffect(() => {
    fetchManagerData();
  }, []);

  async function fetchManagerData() {
    try {
      setLoading(true);

      // Fetch all team leads from API
      const leadsResponse = await fetch('/api/leads');
      const leadsData = leadsResponse.ok ? await leadsResponse.json() : [];

      setLeads(leadsData || []);
      
      // For now, set mock team members (would need a team members API endpoint)
      setTeamMembers([]);

      // Calculate stats
      if (leadsData && leadsData.length > 0) {
        const newCount = leadsData.filter((l: Lead) => l.status === 'new').length;
        const qualifiedCount = leadsData.filter((l: Lead) => l.status === 'qualified').length;
        const convertedCount = leadsData.filter((l: Lead) => l.status === 'converted').length;
        const totalDealValue = leadsData.reduce((sum: number, l: Lead) => sum + (l.deal_value || 0), 0);
        const avgScore = leadsData.reduce((sum: number, l: Lead) => sum + (l.qualification_score || 0), 0) / leadsData.length;

        setStats({
          totalLeads: leadsData.length,
          newLeads: newCount,
          qualifiedLeads: qualifiedCount,
          convertedLeads: convertedCount,
          totalDealValue,
          averageQualificationScore: Math.round(avgScore),
        });
      }
    } catch (error) {
      console.error('Error fetching manager data:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredLeads = selectedAgent
    ? leads.filter((l) => l.assigned_agent_id === selectedAgent)
    : leads;

  const getAgentName = (agentId: string) => {
    const agent = teamMembers.find((m) => m.id === agentId);
    return agent?.user_email || 'Unassigned';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'qualified':
        return 'bg-purple-100 text-purple-800';
      case 'converted':
        return 'bg-green-100 text-green-800';
      case 'lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl p-8">
        <h1 className="text-4xl font-bold text-black mb-2">Manager Dashboard</h1>
        <p className="text-gray-600 mb-8">Team performance and lead management</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 mb-8">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-600">Total Leads</p>
            <p className="mt-2 text-3xl font-bold text-black">{stats.totalLeads}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-600">New</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">{stats.newLeads}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-600">Qualified</p>
            <p className="mt-2 text-3xl font-bold text-purple-600">{stats.qualifiedLeads}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-600">Converted</p>
            <p className="mt-2 text-3xl font-bold text-green-600">{stats.convertedLeads}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-600">Total Deal Value</p>
            <p className="mt-2 text-2xl font-bold text-black">${stats.totalDealValue.toLocaleString()}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-600">Avg Qualification</p>
            <p className="mt-2 text-3xl font-bold text-orange-600">{stats.averageQualificationScore}</p>
          </div>
        </div>

        {/* Agent Filter */}
        <div className="mb-6 flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Filter by Agent:</label>
          <select
            value={selectedAgent || ''}
            onChange={(e) => setSelectedAgent(e.target.value || null)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm"
          >
            <option value="">All Agents</option>
            {teamMembers
              .filter((m) => m.role !== 'owner')
              .map((member) => (
                <option key={member.id} value={member.id}>
                  {member.user_email}
                </option>
              ))}
          </select>
        </div>

        {/* Leads Table */}
        <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Agent</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Deal Value</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Qualification</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Date Added</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{lead.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lead.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{getAgentName(lead.assigned_agent_id || '')}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {lead.deal_value ? `$${lead.deal_value.toLocaleString()}` : '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{lead.qualification_score}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps = async () => {
  return { props: {} };
};
