'use client';

import React from 'react';
import { Lead } from '@/lib/supabase';
import { FiTrendingUp, FiCheckCircle, FiXCircle, FiSmile } from 'react-icons/fi';

interface MetricsCardProps {
  leads: Lead[];
}

export default function MetricsCard({ leads }: MetricsCardProps) {
  // Calculate metrics
  const newLeads = leads.filter(l => l.status === 'new').length;
  const contactedLeads = leads.filter(l => l.status === 'contacted').length;
  const convertedLeads = leads.filter(l => l.status === 'converted').length;
  const lostLeads = leads.filter(l => l.status === 'lost').length;
  
  // Calculate this week's new leads
  const thisWeekLeads = leads.filter(l => {
    const leadDate = new Date(l.created_at);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return leadDate >= weekAgo;
  }).length;
  
  // Conversion rate (converted from new)
  const conversionRate = newLeads > 0 ? ((convertedLeads / newLeads) * 100).toFixed(1) : '0';
  
  // Contact rate (contacted + converted)
  const contactRate = newLeads > 0 ? (((contactedLeads + convertedLeads) / newLeads) * 100).toFixed(1) : '0';

  const metrics = [
    {
      label: 'New Leads This Week',
      value: thisWeekLeads,
      icon: FiSmile,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
    },
    {
      label: 'Conversion Rate',
      value: `${conversionRate}%`,
      icon: FiTrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
    },
    {
      label: 'Contact Rate',
      value: `${contactRate}%`,
      icon: FiCheckCircle,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900/20',
    },
    {
      label: 'Lost Leads',
      value: lostLeads,
      icon: FiXCircle,
      color: 'text-red-400',
      bgColor: 'bg-red-900/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div key={index} className={`luxe-card p-6 ${metric.bgColor}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-2">{metric.label}</p>
                <p className={`text-3xl font-bold ${metric.color}`}>{metric.value}</p>
              </div>
              <Icon className={`${metric.color} text-4xl opacity-50`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
