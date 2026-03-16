'use client';

import React from 'react';
import { Lead } from '@/lib/supabase';

interface FunnelStats {
  new: number;
  contacted: number;
  converted: number;
}

interface ConversionFunnelProps {
  leads: Lead[];
}

export default function ConversionFunnel({ leads }: ConversionFunnelProps) {
  const stats: FunnelStats = {
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length,
  };

  const total = stats.new;
  const contactedRate = total > 0 ? (stats.contacted / total * 100).toFixed(1) : 0;
  const convertedRate = total > 0 ? (stats.converted / total * 100).toFixed(1) : 0;

  const funnelStages = [
    { label: 'New Leads', count: stats.new, percentage: 100, color: 'from-blue-600 to-blue-500' },
    { label: 'Contacted', count: stats.contacted, percentage: total > 0 ? (stats.contacted / total * 100) : 0, color: 'from-yellow-600 to-yellow-500' },
    { label: 'Converted', count: stats.converted, percentage: total > 0 ? (stats.converted / total * 100) : 0, color: 'from-green-600 to-green-500' },
  ];

  return (
    <div className="luxe-card p-8">
      <h2 className="text-2xl font-bold mb-8 luxe-accent">Conversion Funnel</h2>
      
      <div className="space-y-6">
        {funnelStages.map((stage, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-medium">{stage.label}</span>
              <span className="text-luxe-gold font-bold">{stage.count} ({stage.percentage.toFixed(1)}%)</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-8 overflow-hidden shadow-inner">
              <div
                className={`h-full bg-gradient-to-r ${stage.color} flex items-center justify-center transition-all duration-500 rounded-full`}
                style={{ width: `${stage.percentage}%` }}
              >
                {stage.percentage > 15 && (
                  <span className="text-white text-xs font-bold">{stage.percentage.toFixed(1)}%</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Contact Rate</p>
            <p className="text-2xl font-bold text-yellow-400">{contactedRate}%</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Conversion Rate</p>
            <p className="text-2xl font-bold text-green-400">{convertedRate}%</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Total Leads</p>
            <p className="text-2xl font-bold text-luxe-gold">{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
