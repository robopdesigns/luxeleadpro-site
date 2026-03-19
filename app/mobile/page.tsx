'use client';

import React, { useState } from 'react';

export default function LuxeLeadProMobileApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [userType] = useState('agent');

  // Sample data
  const hotLeads = [
    { id: 1, name: 'Sarah Johnson', score: 92, budget: '$3.5M', status: 'hot', neighborhood: 'Gold Coast', days: 1 },
    { id: 2, name: 'Michael Chen', score: 78, budget: '$2.8M', status: 'warm', neighborhood: 'Lincoln Park', days: 3 },
    { id: 3, name: 'Elizabeth Brown', score: 65, budget: '$2.2M', status: 'cool', neighborhood: 'Naperville', days: 5 },
  ];

  const briefing = {
    date: 'Wed, Mar 18',
    topLead: { name: 'Sarah Johnson', score: 92, reason: 'New buyer + $3.5M budget + active last 24h' },
    marketUpdate: 'Luxury inventory down 8% YoY in premium neighborhoods. Urgency: HIGH',
    action: 'Follow up with top 3 leads today for best conversion rate'
  };

  const marketData = {
    neighborhood: 'Gold Coast',
    listings: 234,
    avgPrice: '$3.2M',
    daysOnMarket: 28,
    trend: '-12%',
    buyerProfile: 'C-suite execs, foreign investors, established professionals'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50" style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-4 shadow-lg">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <div>
            <h1 className="text-2xl font-bold font-serif">LuxeLeadPro</h1>
            <p className="text-xs text-purple-100">AI Lead Scoring</p>
          </div>
          <div className="text-right text-sm">
            <p className="text-purple-100">Wed, Mar 18</p>
            <p className="font-bold">3:35 PM</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <>
            {/* Daily Briefing CTA */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 mb-6 shadow-lg">
              <h2 className="font-bold text-lg mb-2">📊 Your Daily Briefing</h2>
              <p className="text-sm text-blue-100 mb-4">3 hot leads + market update</p>
              <button 
                onClick={() => setActiveTab('briefing')}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition"
              >
                View Now →
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-200">
                <p className="text-2xl font-bold text-green-600">3</p>
                <p className="text-xs text-green-700 mt-1">Hot Leads</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg p-4 text-center border border-purple-200">
                <p className="text-2xl font-bold text-purple-600">8.2%</p>
                <p className="text-xs text-purple-700 mt-1">Conversion</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center border border-purple-200">
                <p className="text-2xl font-bold text-purple-600">$2.8M</p>
                <p className="text-xs text-purple-700 mt-1">Total MRR</p>
              </div>
            </div>

            {/* Today's Top Leads */}
            <h2 className="font-bold text-lg text-gray-900 mb-4">🔥 Today's Hot Leads</h2>
            <div className="space-y-3 mb-6">
              {hotLeads.slice(0, 3).map((lead) => (
                <div 
                  key={lead.id}
                  className="bg-white rounded-lg border-l-4 border-purple-500 p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{lead.name}</h3>
                      <p className="text-sm text-gray-600">{lead.neighborhood}</p>
                    </div>
                    <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {lead.score}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{lead.budget} budget</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-green-500 text-white py-2 rounded font-semibold text-xs hover:bg-green-600 transition">
                      📞 Call
                    </button>
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded font-semibold text-xs hover:bg-blue-600 transition">
                      ✉️ Email
                    </button>
                    <button className="flex-1 bg-gray-300 text-gray-900 py-2 rounded font-semibold text-xs hover:bg-gray-400 transition">
                      📋 Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <>
            <h2 className="font-bold text-lg text-gray-900 mb-4">All Leads</h2>
            <div className="space-y-3">
              {hotLeads.map((lead) => (
                <div 
                  key={lead.id}
                  className={`bg-white rounded-lg p-4 border-l-4 ${
                    lead.score >= 80 ? 'border-red-500' : lead.score >= 60 ? 'border-purple-500' : 'border-blue-500'
                  } shadow-sm`}
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{lead.name}</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      lead.score >= 80 ? 'bg-red-100 text-red-700' :
                      lead.score >= 60 ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {lead.score}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{lead.neighborhood} • {lead.budget}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* BRIEFING TAB */}
        {activeTab === 'briefing' && (
          <>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 mb-6 border border-blue-200">
              <h2 className="font-bold text-lg text-gray-900 mb-2">Daily AI Briefing</h2>
              <p className="text-sm text-gray-600 mb-4">{briefing.date}</p>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <h3 className="font-bold text-gray-900 mb-2">🎯 Top Lead Today</h3>
                <p className="font-semibold text-purple-600 mb-1">{briefing.topLead.name}</p>
                <p className="text-sm text-gray-600">{briefing.topLead.reason}</p>
              </div>

              <div className="bg-white rounded-lg p-4 mb-4">
                <h3 className="font-bold text-gray-900 mb-2">📈 Market Update</h3>
                <p className="text-sm text-gray-600">{briefing.marketUpdate}</p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-2">✅ Action Item</h3>
                <p className="text-sm text-gray-600">{briefing.action}</p>
              </div>
            </div>
          </>
        )}

        {/* MARKET INTEL TAB */}
        {activeTab === 'market' && (
          <>
            <h2 className="font-bold text-lg text-gray-900 mb-4">Market Intelligence</h2>
            
            <div className="bg-white rounded-lg p-6 mb-4 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">{marketData.neighborhood}</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Active Listings</span>
                  <span className="font-bold text-gray-900">{marketData.listings}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Avg Price</span>
                  <span className="font-bold text-gray-900">{marketData.avgPrice}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Days on Market</span>
                  <span className="font-bold text-gray-900">{marketData.daysOnMarket}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Year-over-Year Trend</span>
                  <span className="font-bold text-red-600">{marketData.trend}</span>
                </div>
                
                <div>
                  <span className="text-sm text-gray-600">Buyer Profile</span>
                  <p className="font-semibold text-gray-900 mt-2">{marketData.buyerProfile}</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* COMPLIANCE TAB */}
        {activeTab === 'compliance' && (
          <>
            <h2 className="font-bold text-lg text-gray-900 mb-4">Compliance Check</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">✅</span>
                <div>
                  <p className="font-bold text-green-900">Compliance Clear</p>
                  <p className="text-sm text-green-700">All leads verified</p>
                </div>
              </div>
            </div>

            <h3 className="font-bold text-gray-900 mb-3">DNC Status by Lead</h3>
            <div className="space-y-2">
              {hotLeads.map((lead) => (
                <div key={lead.id} className="bg-white rounded-lg p-3 border border-gray-200 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{lead.name}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">CLEAR</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="grid grid-cols-5 gap-0">
          <button
            onClick={() => setActiveTab('home')}
            className={`py-4 text-center text-xs font-semibold transition ${
              activeTab === 'home'
                ? 'text-purple-600 border-t-2 border-purple-600'
                : 'text-gray-600'
            }`}
          >
            🏠 Home
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`py-4 text-center text-xs font-semibold transition ${
              activeTab === 'leads'
                ? 'text-purple-600 border-t-2 border-purple-600'
                : 'text-gray-600'
            }`}
          >
            📋 Leads
          </button>
          <button
            onClick={() => setActiveTab('briefing')}
            className={`py-4 text-center text-xs font-semibold transition ${
              activeTab === 'briefing'
                ? 'text-purple-600 border-t-2 border-purple-600'
                : 'text-gray-600'
            }`}
          >
            📊 Brief
          </button>
          <button
            onClick={() => setActiveTab('market')}
            className={`py-4 text-center text-xs font-semibold transition ${
              activeTab === 'market'
                ? 'text-purple-600 border-t-2 border-purple-600'
                : 'text-gray-600'
            }`}
          >
            📈 Market
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`py-4 text-center text-xs font-semibold transition ${
              activeTab === 'compliance'
                ? 'text-purple-600 border-t-2 border-purple-600'
                : 'text-gray-600'
            }`}
          >
            ✅ Legal
          </button>
        </div>
      </div>
    </div>
  );
}


