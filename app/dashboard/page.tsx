'use client';

import React, { useState } from 'react';

export default function LuxeLeadProDashboard() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'sales' | 'metrics'>('overview');

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const cardClass = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  // Key Metrics
  const metrics = {
    mrrTarget: 370000,
    mrrCurrent: 0,
    customersTarget: 50,
    customersCurrent: 0,
    trialConversions: 0,
    salesRepCount: 0,
    tasksCompleted: 8,
    tasksRemaining: 12,
  };

  // Tasks
  const tasks = [
    { id: 1, title: 'Get 1st Customer', status: 'In Progress', priority: 'Critical', dueDate: 'Mar 31', progress: 0 },
    { id: 2, title: 'Sign up for Wave accounting', status: 'Pending', priority: 'High', dueDate: 'Today', progress: 0 },
    { id: 3, title: 'Open business bank account', status: 'Pending', priority: 'High', dueDate: 'This Week', progress: 0 },
    { id: 4, title: 'Set up @luxeleadpro.com email', status: 'Pending', priority: 'High', dueDate: 'This Week', progress: 0 },
    { id: 5, title: 'Apply for EIN (via Stripe Atlas)', status: 'Pending', priority: 'High', dueDate: 'After 1st Sale', progress: 0 },
    { id: 6, title: 'Hire first sales rep', status: 'Pending', priority: 'High', dueDate: 'Month 2', progress: 0 },
    { id: 7, title: 'Complete mobile app (lead pages)', status: 'In Progress', priority: 'High', dueDate: 'This Week', progress: 60 },
    { id: 8, title: 'Build daily briefing mobile page', status: 'In Progress', priority: 'High', dueDate: 'This Week', progress: 40 },
    { id: 9, title: 'Launch sales collateral (pitch deck)', status: 'Pending', priority: 'Medium', dueDate: 'Apr 7', progress: 0 },
    { id: 10, title: 'Record demo videos', status: 'Pending', priority: 'Medium', dueDate: 'Apr 14', progress: 0 },
    { id: 11, title: 'Set up Stripe billing integration', status: 'Pending', priority: 'High', dueDate: 'Before Launch', progress: 0 },
    { id: 12, title: 'Create sales CRM (free version)', status: 'Pending', priority: 'Medium', dueDate: 'Apr 1', progress: 0 },
  ];

  // Sales Pipeline
  const sales = [
    { id: 1, customer: 'TBD - First Lead', email: 'TBD', plan: 'Team Plan', status: 'Prospect', mrr: 799, stage: 'Outreach' },
  ];

  // Milestones
  const milestones = [
    { quarter: 'Q1 2026', goal: '5 customers', status: 'In Progress', progress: 0 },
    { quarter: 'Q2 2026', goal: '20 customers', status: 'Pending', progress: 0 },
    { quarter: 'Q3 2026', goal: '40 customers', status: 'Pending', progress: 0 },
    { quarter: 'Q4 2026', goal: '50 customers', status: 'Pending', progress: 0 },
  ];

  return (
    <div className={`min-h-screen transition-colors ${bgClass}`}>
      {/* Header */}
      <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-20`}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className={`text-4xl font-bold font-serif ${textClass}`}>LuxeLeadPro</h1>
            <p className="text-sm text-gray-500 mt-1">Business Command Center</p>
          </div>
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              isDark 
                ? 'bg-amber-600 text-white hover:bg-amber-700' 
                : 'bg-gray-800 text-white hover:bg-gray-900'
            }`}
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Top Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className={`${cardClass} border rounded-lg p-6`}>
            <p className="text-sm text-gray-500 mb-2">Annual Revenue Target</p>
            <p className={`text-3xl font-bold text-amber-600`}>${(metrics.mrrTarget * 12).toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Year 1 goal</p>
          </div>
          <div className={`${cardClass} border rounded-lg p-6`}>
            <p className="text-sm text-gray-500 mb-2">Customer Target</p>
            <p className={`text-3xl font-bold text-green-600`}>{metrics.customersTarget}</p>
            <p className="text-xs text-gray-500 mt-2">{metrics.customersCurrent} acquired</p>
          </div>
          <div className={`${cardClass} border rounded-lg p-6`}>
            <p className="text-sm text-gray-500 mb-2">Tasks Completed</p>
            <p className={`text-3xl font-bold text-blue-600`}>{metrics.tasksCompleted}/{metrics.tasksCompleted + metrics.tasksRemaining}</p>
            <p className="text-xs text-gray-500 mt-2">{Math.round((metrics.tasksCompleted / (metrics.tasksCompleted + metrics.tasksRemaining)) * 100)}% done</p>
          </div>
          <div className={`${cardClass} border rounded-lg p-6`}>
            <p className="text-sm text-gray-500 mb-2">Sales Reps</p>
            <p className={`text-3xl font-bold text-purple-600`}>{metrics.salesRepCount}</p>
            <p className="text-xs text-gray-500 mt-2">Target: 2 by Month 4</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={`${cardClass} border rounded-lg mb-8 overflow-hidden`}>
          <div className="flex border-b border-gray-700">
            {['overview', 'tasks', 'sales', 'metrics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-4 px-6 font-semibold text-center uppercase text-xs tracking-wide transition ${
                  activeTab === tab
                    ? isDark ? 'bg-amber-600 text-white' : 'bg-amber-600 text-white'
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'overview' && '📊 Overview'}
                {tab === 'tasks' && '✅ Tasks'}
                {tab === 'sales' && '💰 Sales'}
                {tab === 'metrics' && '📈 Metrics'}
              </button>
            ))}
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Business Status */}
                <div>
                  <h2 className={`text-2xl font-bold ${textClass} mb-6`}>📋 Business Status</h2>
                  <div className="space-y-4">
                    <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4`}>
                      <p className="text-sm text-gray-500 mb-2">Product Status</p>
                      <p className={`font-bold ${textClass}`}>✅ LIVE & PREMIUM</p>
                      <p className="text-xs text-gray-500 mt-1">Website, dashboards, mobile app (PWA)</p>
                    </div>
                    <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4`}>
                      <p className="text-sm text-gray-500 mb-2">Business Setup</p>
                      <p className={`font-bold ${textClass}`}>🔄 IN PROGRESS</p>
                      <p className="text-xs text-gray-500 mt-1">FREE: EIN, bank account, email. PAID: After 1st sale</p>
                    </div>
                    <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4`}>
                      <p className="text-sm text-gray-500 mb-2">Customers</p>
                      <p className={`font-bold ${textClass}`}>0 → Target: 50</p>
                      <p className="text-xs text-gray-500 mt-1">Founder sales starting now</p>
                    </div>
                    <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4`}>
                      <p className="text-sm text-gray-500 mb-2">Team</p>
                      <p className={`font-bold ${textClass}`}>1 (Rob) → Target: 5+</p>
                      <p className="text-xs text-gray-500 mt-1">Hire sales reps on commission</p>
                    </div>
                  </div>
                </div>

                {/* Q1 Milestones */}
                <div>
                  <h2 className={`text-2xl font-bold ${textClass} mb-6`}>🎯 2026 Milestones</h2>
                  <div className="space-y-4">
                    {milestones.map((m, i) => (
                      <div key={i} className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4`}>
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-bold text-amber-600">{m.quarter}</p>
                          <span className={`text-xs px-2 py-1 rounded ${m.status === 'In Progress' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}>
                            {m.status}
                          </span>
                        </div>
                        <p className={`${textClass} text-sm mb-2`}>{m.goal}</p>
                        <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}>
                          <div className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600" style={{width: `${m.progress}%`}}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-8">
                <h2 className={`text-2xl font-bold ${textClass} mb-6`}>💡 Quick Reference</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4`}>
                    <p className="text-xs text-gray-500 mb-2">Per Agent Plan</p>
                    <p className="text-2xl font-bold text-amber-600">$199/mo</p>
                    <p className="text-xs text-gray-500 mt-2">Commission: $477.60</p>
                  </div>
                  <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4`}>
                    <p className="text-xs text-gray-500 mb-2">Team Plan</p>
                    <p className="text-2xl font-bold text-amber-600">$799/mo</p>
                    <p className="text-xs text-gray-500 mt-2">Commission: $2,397</p>
                  </div>
                  <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4`}>
                    <p className="text-xs text-gray-500 mb-2">Enterprise</p>
                    <p className="text-2xl font-bold text-amber-600">Custom</p>
                    <p className="text-xs text-gray-500 mt-2">Commission: 20%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TASKS TAB */}
          {activeTab === 'tasks' && (
            <div className="p-8">
              <h2 className={`text-2xl font-bold ${textClass} mb-6`}>Task Checklist</h2>
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div key={task.id} className={`${isDark ? 'bg-gray-700 hover:bg-gray-650' : 'bg-gray-100 hover:bg-gray-50'} border-l-4 ${
                    task.priority === 'Critical' ? 'border-red-500' :
                    task.priority === 'High' ? 'border-amber-500' :
                    'border-blue-500'
                  } rounded-lg p-4 transition`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <input type="checkbox" className="mt-1" defaultChecked={task.status === 'Completed'} />
                        <div className="flex-1">
                          <h3 className={`font-semibold ${textClass}`}>{task.title}</h3>
                          <p className="text-xs text-gray-500 mt-1">Due: {task.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className={`text-xs px-2 py-1 rounded font-semibold ${
                          task.status === 'Completed' ? 'bg-green-500 text-white' :
                          task.status === 'In Progress' ? 'bg-blue-500 text-white' :
                          'bg-gray-500 text-white'
                        }`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                    {task.progress > 0 && (
                      <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}>
                        <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" style={{width: `${task.progress}%`}}></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SALES TAB */}
          {activeTab === 'sales' && (
            <div className="p-8">
              <h2 className={`text-2xl font-bold ${textClass} mb-6`}>Sales Pipeline</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-500">Customer</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-500">Plan</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-500">MRR</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-500">Stage</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((sale) => (
                      <tr key={sale.id} className={`border-b ${isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'} transition`}>
                        <td className="py-4 px-4 text-sm font-medium">{sale.customer}</td>
                        <td className="py-4 px-4 text-sm">{sale.plan}</td>
                        <td className="py-4 px-4 text-sm font-bold text-amber-600">${sale.mrr}</td>
                        <td className="py-4 px-4 text-sm">{sale.stage}</td>
                        <td className="py-4 px-4">
                          <span className="text-xs px-2 py-1 rounded bg-yellow-500 text-white font-semibold">
                            {sale.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="mt-6 px-6 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition">
                + Add Prospect
              </button>
            </div>
          )}

          {/* METRICS TAB */}
          {activeTab === 'metrics' && (
            <div className="p-8">
              <h2 className={`text-2xl font-bold ${textClass} mb-6`}>Key Performance Indicators</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-6`}>
                  <h3 className={`font-semibold ${textClass} mb-4`}>Revenue Tracking</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Current MRR:</span>
                      <span className={`font-bold text-amber-600`}>$0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Target MRR (Year 1):</span>
                      <span className={`font-bold ${textClass}`}>${(metrics.mrrTarget).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Progress:</span>
                      <span className={`font-bold text-blue-600`}>0%</span>
                    </div>
                    <div className={`w-full h-3 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}>
                      <div className="h-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600" style={{width: '0%'}}></div>
                    </div>
                  </div>
                </div>

                <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-6`}>
                  <h3 className={`font-semibold ${textClass} mb-4`}>Customer Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Active Customers:</span>
                      <span className={`font-bold text-green-600`}>0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Trial Customers:</span>
                      <span className={`font-bold text-blue-600`}>0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Conversion Rate:</span>
                      <span className={`font-bold ${textClass}`}>0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Customer Goal:</span>
                      <span className={`font-bold text-amber-600`}>50</span>
                    </div>
                  </div>
                </div>

                <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-6`}>
                  <h3 className={`font-semibold ${textClass} mb-4`}>Commission Tracking</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Commissions Paid:</span>
                      <span className={`font-bold text-purple-600`}>$0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Commission % of Revenue:</span>
                      <span className={`font-bold ${textClass}`}>0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Cost Per Acquisition:</span>
                      <span className={`font-bold text-red-600`}>$0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">CAC:LTV Ratio:</span>
                      <span className={`font-bold ${textClass}`}>0:0</span>
                    </div>
                  </div>
                </div>

                <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-6`}>
                  <h3 className={`font-semibold ${textClass} mb-4`}>Team & Operations</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Team Size:</span>
                      <span className={`font-bold text-green-600`}>1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Sales Reps:</span>
                      <span className={`font-bold ${textClass}`}>0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tasks Completed:</span>
                      <span className={`font-bold text-blue-600`}>{metrics.tasksCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Completion Rate:</span>
                      <span className={`font-bold text-amber-600`}>{Math.round((metrics.tasksCompleted / (metrics.tasksCompleted + metrics.tasksRemaining)) * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
