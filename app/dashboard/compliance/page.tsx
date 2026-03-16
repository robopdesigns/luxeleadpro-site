'use client';

import React, { useState } from 'react';

export default function ComplianceDashboard() {
  const [agents] = useState([
    {
      id: 1,
      name: 'John Smith',
      score: 98,
      status: 'Compliant',
      dncChecks: 156,
      tcpaAudits: 12,
      violations: 0,
      lastAudit: '2 days ago',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      score: 94,
      status: 'Compliant',
      dncChecks: 134,
      tcpaAudits: 10,
      violations: 0,
      lastAudit: '5 days ago',
    },
    {
      id: 3,
      name: 'Michael Chen',
      score: 87,
      status: 'Warning',
      dncChecks: 98,
      tcpaAudits: 8,
      violations: 1,
      lastAudit: '1 week ago',
    },
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Compliance Dashboard</h1>
          <p className="text-gray-400">TCPA/DNC compliance tracking & audit trail</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Compliant Agents</p>
            <p className="text-4xl font-bold text-green-500">2/3</p>
            <p className="text-gray-400 text-sm mt-2">67% fully compliant</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">DNC Checks Performed</p>
            <p className="text-4xl font-bold text-blue-500">388</p>
            <p className="text-gray-400 text-sm mt-2">This month</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">TCPA Audits</p>
            <p className="text-4xl font-bold text-purple-500">30</p>
            <p className="text-gray-400 text-sm mt-2">Auto-conducted</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Violations Detected</p>
            <p className="text-4xl font-bold text-red-500">1</p>
            <p className="text-gray-400 text-sm mt-2">All resolved</p>
          </div>
        </div>

        {/* Agent Compliance */}
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Agent Compliance Scores</h2>
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-gray-700 rounded-lg p-6 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {agent.dncChecks} DNC checks • {agent.tcpaAudits} TCPA audits • Last audit: {agent.lastAudit}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-bold ${agent.score >= 95 ? 'text-green-500' : agent.score >= 85 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {agent.score}
                  </div>
                  <span className={`text-sm font-semibold ${agent.status === 'Compliant' ? 'text-green-500' : 'text-yellow-500'}`}>
                    {agent.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Templates */}
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Legal Documentation Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['TCPA Consent Form', 'DNC Registry Verification', 'Lead Disclosure Template', 'Compliance Audit Report'].map((doc, index) => (
              <button key={index} className="bg-gray-700 hover:bg-gray-650 rounded-lg p-4 text-left transition border border-gray-600 hover:border-gold-500">
                <p className="font-semibold text-white">{doc}</p>
                <p className="text-gray-400 text-sm mt-1">Download template</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
