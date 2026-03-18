'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function MobileHome() {
  const [userType] = useState<'agent' | 'manager'>('agent');

  // Sample hot leads for today
  const hotLeads = [
    { id: 1, name: 'Sarah Johnson', score: 92, budget: '$3.5M', action: 'Call NOW' },
    { id: 2, name: 'Michael Chen', score: 78, budget: '$2.8M', action: 'Email' },
    { id: 3, name: 'Elizabeth Brown', score: 65, budget: '$2.2M', action: 'Follow-up' },
  ];

  const managerStats = [
    { label: 'Team MRR', value: '$15,000', color: 'text-green-600' },
    { label: 'Active Customers', value: '5', color: 'text-blue-600' },
    { label: 'Top Agent', value: 'John Smith', color: 'text-amber-600' },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-amber-500 text-white sticky top-0 z-50 px-4 py-6 rounded-b-2xl shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">LuxeLeadPro</h1>
            <p className="text-sm text-amber-100">Mobile App</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-amber-100">Wed, Mar 18</p>
            <p className="text-lg font-bold">11:26 AM</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 max-w-md mx-auto">
        {/* Agent View */}
        {userType === 'agent' && (
          <>
            {/* Daily Briefing CTA */}
            <Link href="/mobile/briefing" className="block mb-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-lg mb-1">📊 Your Daily Briefing</h2>
                  <p className="text-sm text-blue-100">3 hot leads + market update</p>
                </div>
                <span className="text-2xl">→</span>
              </div>
            </Link>

            {/* Hot Leads Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🔥 Today's Hot Leads</h2>
              <div className="space-y-3">
                {hotLeads.map((lead) => (
                  <Link 
                    key={lead.id}
                    href={`/mobile/leads/${lead.id}`}
                    className="block bg-gray-50 rounded-lg p-4 border-l-4 border-amber-500 hover:bg-gray-100 transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                      <span className="bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {lead.score}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{lead.budget} budget</p>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-green-500 text-white py-2 rounded font-semibold text-sm hover:bg-green-600 transition">
                        📞 {lead.action}
                      </button>
                      <button className="flex-1 bg-blue-500 text-white py-2 rounded font-semibold text-sm hover:bg-blue-600 transition">
                        ✉️ Email
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/mobile/leads" className="block mt-4 text-center text-amber-600 font-semibold hover:text-amber-700">
                View All Leads →
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center hover:bg-blue-100 transition">
                  <div className="text-2xl mb-2">📋</div>
                  <p className="text-sm font-semibold text-blue-900">My Contacts</p>
                </button>
                <button className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 text-center hover:bg-purple-100 transition">
                  <div className="text-2xl mb-2">📊</div>
                  <p className="text-sm font-semibold text-purple-900">Analytics</p>
                </button>
                <button className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center hover:bg-green-100 transition">
                  <div className="text-2xl mb-2">✅</div>
                  <p className="text-sm font-semibold text-green-900">Compliance</p>
                </button>
                <button className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 text-center hover:bg-orange-100 transition">
                  <div className="text-2xl mb-2">⚙️</div>
                  <p className="text-sm font-semibold text-orange-900">Settings</p>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Manager View */}
        {userType === 'manager' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {managerStats.map((stat, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Team Dashboard */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">👥 Team Leaderboard</h2>
              <div className="space-y-3">
                {[
                  { rank: 1, name: 'John Smith', deals: 12, commission: '$2,890' },
                  { rank: 2, name: 'Sarah Johnson', deals: 8, commission: '$1,920' },
                  { rank: 3, name: 'Mike Chen', deals: 5, commission: '$1,200' },
                ].map((agent) => (
                  <div key={agent.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-amber-600">#{agent.rank}</span>
                      <div>
                        <p className="font-semibold text-gray-900">{agent.name}</p>
                        <p className="text-xs text-gray-600">{agent.deals} deals this month</p>
                      </div>
                    </div>
                    <p className="font-bold text-green-600">{agent.commission}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Manager Actions */}
            <div className="space-y-3">
              <button className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition">
                📊 View Full Dashboard
              </button>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                💬 Message Team
              </button>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>LuxeLeadPro Mobile v1.0</p>
          <p>Available offline • Push notifications enabled</p>
        </div>
      </main>
    </div>
  );
}
