'use client';

import React from 'react';

export default function DailyBriefing() {
  const briefing = {
    date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    agentName: 'John Smith',
    topLeads: [
      {
        id: 1,
        name: 'Sarah Johnson',
        score: 92,
        action: 'Call today - hot lead',
        budget: '$3.5M',
        timeline: 'ASAP',
      },
      {
        id: 2,
        name: 'Michael Chen',
        score: 78,
        action: 'Follow up - send market report',
        budget: '$2.8M',
        timeline: '30 days',
      },
      {
        id: 3,
        name: 'Elizabeth Brown',
        score: 65,
        action: 'Add to nurture sequence',
        budget: '$2.2M',
        timeline: '60 days',
      },
    ],
    marketUpdate: {
      headline: 'Luxury Market Strong in Hinsdale',
      summary: 'Average prices up 8.5% YoY. Only 24 active listings (low inventory). 38 days avg on market.',
      opportunities: 2,
    },
    coachingTip: 'Focus on active leads with ASAP timelines. They convert 3x faster than exploratory leads.',
    completionRate: 78,
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Daily AI Briefing</h1>
          <p className="text-gray-400">{briefing.date}</p>
        </div>

        {/* Welcome */}
        <div className="bg-gradient-to-r from-gold-600 to-gold-500 rounded-lg p-8 mb-8 text-gray-900">
          <h2 className="text-2xl font-bold mb-2">Good morning, {briefing.agentName}!</h2>
          <p>Here's your AI-powered briefing to maximize today's deals.</p>
        </div>

        {/* Top 3 Leads */}
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">🔥 Your Top 3 Leads Today</h2>
          <div className="space-y-4">
            {briefing.topLeads.map((lead) => (
              <div key={lead.id} className="bg-gray-700 rounded-lg p-6 border-l-4 border-gold-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{lead.name}</h3>
                    <p className="text-gray-400 text-sm">{lead.budget} budget • {lead.timeline} timeline</p>
                  </div>
                  <div className="bg-gold-500 text-gray-900 px-4 py-2 rounded-full font-bold text-lg">
                    {lead.score}
                  </div>
                </div>
                <p className="text-gold-300 font-semibold">→ {lead.action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Market Update */}
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">📊 Market Update</h2>
          <h3 className="text-xl font-semibold text-gold-500 mb-2">{briefing.marketUpdate.headline}</h3>
          <p className="text-gray-300 mb-4">{briefing.marketUpdate.summary}</p>
          <p className="text-gray-400">
            💡 <span className="text-gold-300">Opportunity:</span> {briefing.marketUpdate.opportunities} new luxury properties listed today that match your buyer profiles.
          </p>
        </div>

        {/* Coaching Tip */}
        <div className="bg-blue-900 bg-opacity-30 rounded-lg p-8 border border-blue-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">💡 Daily Coaching Tip</h2>
          <p className="text-gray-300 text-lg">{briefing.coachingTip}</p>
        </div>

        {/* Daily Goal */}
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">📈 Today's Goal</h2>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-300">Lead follow-ups completed</p>
              <p className="text-gold-500 font-semibold">{briefing.completionRate}%</p>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-gold-500 to-gold-400 h-4 rounded-full"
                style={{ width: `${briefing.completionRate}%` }}
              />
            </div>
          </div>
          <p className="text-gray-400 text-sm">Goal: 100% daily follow-ups. You're doing great! 🎯</p>
        </div>
      </div>
    </main>
  );
}

