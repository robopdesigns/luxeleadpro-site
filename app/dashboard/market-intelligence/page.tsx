'use client';

import React, { useState } from 'react';

export default function MarketIntelligence() {
  const [selectedMarket] = useState('Hinsdale, IL');

  const marketData = {
    neighborhood: 'Hinsdale, IL',
    avgPrice: 2850000,
    medianPrice: 2450000,
    priceChange: 8.5,
    activeListings: 24,
    soldYTD: 156,
    avgDaysOnMarket: 42,
    medianDaysOnMarket: 38,
    buyerProfile: {
      ageRange: '45-65',
      income: '$500K+',
      primaryFocus: 'Estate homes, Multi-family',
      relocation: '35% from Chicago',
    },
    trends: [
      { month: 'Jan', avgPrice: 2620000 },
      { month: 'Feb', avgPrice: 2680000 },
      { month: 'Mar', avgPrice: 2750000 },
      { month: 'Apr', avgPrice: 2800000 },
      { month: 'May', avgPrice: 2850000 },
    ],
    topProperties: [
      { address: '123 Estate Lane', price: 5200000, beds: 6, baths: 5.5, sqft: 12500 },
      { address: '456 Luxury Drive', price: 4800000, beds: 5, baths: 5, sqft: 11200 },
      { address: '789 Grand Manor', price: 4100000, beds: 5, baths: 4.5, sqft: 10800 },
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Market Intelligence</h1>
          <p className="text-gray-400">AI-powered market data for {selectedMarket}</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Average Price</p>
            <p className="text-3xl font-bold text-gold-500">${(marketData.avgPrice / 1000000).toFixed(2)}M</p>
            <p className="text-green-500 text-sm mt-2">↑ {marketData.priceChange}% YoY</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Active Listings</p>
            <p className="text-3xl font-bold text-white">{marketData.activeListings}</p>
            <p className="text-gray-400 text-sm mt-2">Low inventory market</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Sold YTD</p>
            <p className="text-3xl font-bold text-white">{marketData.soldYTD}</p>
            <p className="text-gray-400 text-sm mt-2">Strong buyer demand</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Avg Days on Market</p>
            <p className="text-3xl font-bold text-white">{marketData.medianDaysOnMarket}</p>
            <p className="text-gray-400 text-sm mt-2">Fast-moving market</p>
          </div>
        </div>

        {/* Buyer Profile */}
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Typical Buyer Profile</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-gray-400 text-sm">Age Range</p>
              <p className="text-xl font-semibold text-white">{marketData.buyerProfile.ageRange}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Income Level</p>
              <p className="text-xl font-semibold text-white">{marketData.buyerProfile.income}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Primary Focus</p>
              <p className="text-xl font-semibold text-white">{marketData.buyerProfile.primaryFocus}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Relocation</p>
              <p className="text-xl font-semibold text-white">{marketData.buyerProfile.relocation}</p>
            </div>
          </div>
        </div>

        {/* Top Properties */}
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Top Properties This Month</h2>
          <div className="space-y-4">
            {marketData.topProperties.map((prop, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-6 hover:bg-gray-650 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{prop.address}</h3>
                    <p className="text-gold-500 text-lg font-bold">${(prop.price / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">{prop.beds} beds • {prop.baths} baths</p>
                    <p className="text-gray-400 text-sm">{prop.sqft.toLocaleString()} sqft</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
