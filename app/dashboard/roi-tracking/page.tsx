'use client';

import React from 'react';

export default function ROITracking() {
  const leadSources = [
    {
      source: 'Luxury Market Ads',
      leads: 342,
      converted: 28,
      conversionRate: 8.2,
      cost: 4200,
      costPerLead: 12.28,
      revenue: 2800000,
      roi: 66571,
    },
    {
      source: 'Referral Network',
      leads: 156,
      converted: 18,
      conversionRate: 11.5,
      cost: 1500,
      costPerLead: 9.62,
      revenue: 1800000,
      roi: 120000,
    },
    {
      source: 'Content Marketing',
      leads: 289,
      converted: 15,
      conversionRate: 5.2,
      cost: 3600,
      costPerLead: 12.46,
      revenue: 1500000,
      roi: 41567,
    },
    {
      source: 'Email Campaigns',
      leads: 512,
      converted: 32,
      conversionRate: 6.3,
      cost: 2800,
      costPerLead: 5.47,
      revenue: 3200000,
      roi: 114286,
    },
  ];

  const totalStats = {
    totalLeads: leadSources.reduce((sum, s) => sum + s.leads, 0),
    totalConverted: leadSources.reduce((sum, s) => sum + s.converted, 0),
    totalSpent: leadSources.reduce((sum, s) => sum + s.cost, 0),
    totalRevenue: leadSources.reduce((sum, s) => sum + s.revenue, 0),
  };

  const avgROI = ((totalStats.totalRevenue - totalStats.totalSpent) / totalStats.totalSpent * 100).toFixed(1);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Lead Source ROI Tracking</h1>
          <p className="text-gray-400">Track which sources convert best & optimize budget</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Total Leads</p>
            <p className="text-4xl font-bold text-white">{totalStats.totalLeads}</p>
            <p className="text-gray-400 text-sm mt-2">All sources YTD</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Converted</p>
            <p className="text-4xl font-bold text-green-500">{totalStats.totalConverted}</p>
            <p className="text-gray-400 text-sm mt-2">{((totalStats.totalConverted / totalStats.totalLeads) * 100).toFixed(1)}% avg conversion</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Total Spent</p>
            <p className="text-4xl font-bold text-gold-500">${(totalStats.totalSpent / 1000).toFixed(1)}K</p>
            <p className="text-gray-400 text-sm mt-2">Marketing budget</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Total Revenue</p>
            <p className="text-4xl font-bold text-green-500">${(totalStats.totalRevenue / 1000000).toFixed(1)}M</p>
            <p className="text-gray-400 text-sm mt-2">ROI: {avgROI}%</p>
          </div>
        </div>

        {/* Lead Source Breakdown */}
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 overflow-x-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Lead Source Performance</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-gray-400 font-semibold py-3 px-4">Source</th>
                <th className="text-gray-400 font-semibold py-3 px-4">Leads</th>
                <th className="text-gray-400 font-semibold py-3 px-4">Converted</th>
                <th className="text-gray-400 font-semibold py-3 px-4">Conv. Rate</th>
                <th className="text-gray-400 font-semibold py-3 px-4">Cost/Lead</th>
                <th className="text-gray-400 font-semibold py-3 px-4">Revenue</th>
                <th className="text-gray-400 font-semibold py-3 px-4">ROI</th>
              </tr>
            </thead>
            <tbody>
              {leadSources.map((source, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-700 transition">
                  <td className="font-semibold text-white py-4 px-4">{source.source}</td>
                  <td className="text-gray-300 py-4 px-4">{source.leads}</td>
                  <td className="text-green-500 py-4 px-4 font-semibold">{source.converted}</td>
                  <td className="text-blue-500 py-4 px-4">{source.conversionRate}%</td>
                  <td className="text-gold-500 py-4 px-4">${source.costPerLead.toFixed(2)}</td>
                  <td className="text-green-500 py-4 px-4 font-semibold">${(source.revenue / 1000000).toFixed(1)}M</td>
                  <td className="text-purple-500 py-4 px-4 font-bold">{(source.roi / 1000).toFixed(0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Budget Recommendation */}
        <div className="bg-gradient-to-r from-gold-900 to-gold-800 rounded-lg p-8 mt-8 border border-gold-700">
          <h2 className="text-2xl font-bold text-white mb-4">💡 Budget Optimization Recommendation</h2>
          <p className="text-gray-100 mb-4">
            Based on ROI performance, increase budget allocation to "Referral Network" (120,000% ROI) and "Email Campaigns" (114,286% ROI).
            These sources have the highest conversion rates and lowest cost per acquisition.
          </p>
          <p className="text-gray-100">
            Suggested reallocation: Move 30% of budget from Content Marketing to high-performing channels.
          </p>
        </div>
      </div>
    </main>
  );
}
