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
        action: 'Call today — hot lead',
        budget: '$3.5M',
        timeline: 'ASAP',
        neighborhood: 'Lincoln Park',
        tags: ['🔥 High Intent', '💰 $3.5M+ Buyer', '✅ DNC Clear'],
      },
      {
        id: 2,
        name: 'Michael Chen',
        score: 78,
        action: 'Follow up — send market report',
        budget: '$2.8M',
        timeline: '30 days',
        neighborhood: 'Gold Coast',
        tags: ['📈 Active Searcher', '🏡 Upsizer'],
      },
      {
        id: 3,
        name: 'Elizabeth Brown',
        score: 65,
        action: 'Add to nurture email sequence',
        budget: '$2.2M',
        timeline: '60 days',
        neighborhood: 'River North',
        tags: ['🌱 Nurture', '📊 Watching Market'],
      },
    ],
    marketUpdate: {
      headline: 'Luxury Market Strong in Hinsdale',
      summary: 'Average prices up 8.5% YoY. Only 24 active listings (low inventory). 38 days avg on market.',
      opportunities: 2,
    },
    coachingTip: 'Focus on active leads with ASAP timelines. They convert 3× faster than exploratory leads.',
    completionRate: 78,
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">📊 Daily AI Briefing</h1>
            <p className="text-gray-500 text-sm">{briefing.date}</p>
          </div>
          <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="text-purple-700 text-sm font-semibold">🤖 AI Generated</span>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 mb-8 text-white shadow-sm">
          <h2 className="text-2xl font-bold mb-1">Good morning, {briefing.agentName}!</h2>
          <p className="text-white/80">Here&apos;s your AI-powered briefing to maximize today&apos;s deals.</p>
        </div>

        {/* Top 3 Leads */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">🔥 Your Top 3 Leads Today</h2>
          <div className="space-y-4">
            {briefing.topLeads.map((lead, i) => (
              <div
                key={lead.id}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-sm transition"
                style={{ borderLeftColor: i === 0 ? '#9333ea' : i === 1 ? '#ec4899' : '#a855f7', borderLeftWidth: '4px' }}
              >
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-base font-bold text-gray-900">{lead.name}</h3>
                      <span className="text-gray-400 text-sm">·</span>
                      <span className="text-gray-500 text-sm">{lead.neighborhood}</span>
                      <span className="text-gray-400 text-sm">·</span>
                      <span className="text-gray-500 text-sm">{lead.budget} budget</span>
                      <span className="text-gray-400 text-sm">·</span>
                      <span className="text-gray-500 text-sm">{lead.timeline} timeline</span>
                    </div>
                    <p className="text-purple-700 font-semibold text-sm mb-2">→ {lead.action}</p>
                    <div className="flex flex-wrap gap-2">
                      {lead.tags.map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0 text-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-sm">
                      <span className="text-white font-bold text-lg">{lead.score}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">AI Score</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Update */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Market Update</h2>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-4">
            <h3 className="text-base font-bold text-blue-900 mb-1">{briefing.marketUpdate.headline}</h3>
            <p className="text-blue-700 text-sm">{briefing.marketUpdate.summary}</p>
          </div>
          <p className="text-gray-600 text-sm">
            💡 <strong>Opportunity:</strong> {briefing.marketUpdate.opportunities} new luxury properties listed today that match your buyer profiles. Act fast — inventory is tight.
          </p>
        </div>

        {/* Coaching Tip */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">💡 Daily Coaching Tip</h2>
          <p className="text-gray-700 text-base leading-relaxed">{briefing.coachingTip}</p>
        </div>

        {/* Daily Goal Progress */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">📈 Today&apos;s Goal</h2>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-700">Lead follow-ups completed</p>
                <p className="text-purple-600 font-bold text-sm">{briefing.completionRate}%</p>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${briefing.completionRate}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-700">Calls made today</p>
                <p className="text-pink-600 font-bold text-sm">40%</p>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full"
                  style={{ width: '40%' }}
                />
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-5">Goal: 100% daily follow-ups. You&apos;re doing great! 🎯</p>
        </div>
      </div>
    </main>
  );
}
