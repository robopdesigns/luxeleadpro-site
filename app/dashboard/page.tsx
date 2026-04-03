'use client';

import React, { useState } from 'react';

export default function LuxeLeadProDashboard() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'sales' | 'metrics' | 'docs'>('overview');
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const strategyDocs = [
    {
      slug: 'brand-audit',
      title: 'Opus Brand & Strategy Audit',
      category: 'Strategy',
      description: 'Deep analysis of brand positioning, website, pricing, credibility, and competitive landscape.',
      highlights: [
        'Replaced fake testimonials with Founding Agent Program',
        'New positioning: "The AI That Knows Your Market Before You Wake Up"',
        'Founding pricing strategy ($249/mo → $497 after 50 agents)',
        'Daily Briefing identified as the killer differentiator',
        'Full competitive landscape analysis',
      ],
    },
    {
      slug: 'sales-launch',
      title: 'Sales Launch Plan',
      category: 'Sales',
      description: 'Complete playbook for hiring, training, and launching a commission-based sales team.',
      highlights: [
        'Commission: 30% first month + 10% recurring + bonuses',
        'Tony Robbins-style daily sales rituals & mantras',
        '5-step pitch framework: Connect → Diagnose → Prescribe → Prove → Close',
        'Week-by-week rep schedule for first 2 weeks',
        'Prospect sourcing: LinkedIn, directories, brokerages, open houses',
      ],
    },
    {
      slug: 'hiring-kit',
      title: 'Hiring Kit',
      category: 'Sales',
      description: 'Job posting, interview scripts, screening criteria, role-play scoring rubric, onboarding checklist.',
      highlights: [
        'Ready-to-post job listing for LinkedIn/Indeed',
        '60-second video application filter (eliminates 80% bad fits)',
        '15-min phone screen with 5 sales DNA questions',
        '30-min final interview with live role-play scoring (1-5 × 5 skills)',
        'Red flags checklist & onboarding Day 1 checklist',
      ],
    },
    {
      slug: 'walkthrough',
      title: 'Company Walkthrough',
      category: 'Sales',
      description: 'Complete explainer for new hires — 30-sec pitch, 2-min explainer, product walkthrough, competitive landscape.',
      highlights: [
        '30-second pitch memorization script',
        'Full product feature walkthrough with selling points',
        'Competitive analysis: Zillow, Real Geeks, CINC, Luxury Presence, FUB',
        'How to explain LuxeLeadPro to agents, brokerages, friends, investors',
        'Company values & culture document',
      ],
    },
    {
      slug: 'vertical-expansion',
      title: 'Vertical Expansion Strategy',
      category: 'Strategy',
      description: 'Multi-industry roadmap — insurance, solar, roofing, construction, medical, financial, auto, gyms.',
      highlights: [
        'Tier 1: InsureLeadPro, SolarLeadPro, BuildLeadPro',
        'Tier 2: PracticeLeadPro, WealthLeadPro, DealerLeadPro, FitLeadPro',
        'Parent company: LeadPro AI',
        'Year 2: $480K-$960K ARR across 2 verticals',
        'Year 5: $3-5M ARR → $25-45M acquisition target',
      ],
    },
    {
      slug: 'timeline',
      title: 'Timeline & Revenue Projections',
      category: 'Strategy',
      description: 'Month-by-month projections — conservative and aggressive scenarios through December 2026.',
      highlights: [
        'Conservative Dec 2026: 80-125 clients, $20-31K MRR',
        'Aggressive Dec 2026: 180 clients, $45K MRR ($540K ARR)',
        '5 phases: Launch Prep → Hire → First Sales → Prove → Accelerate',
        'Risk analysis with mitigation strategies',
        'Key milestone: Get one agent one deal',
      ],
    },
    {
      slug: 'demo-script',
      title: 'Sales Demo Script',
      category: 'Sales',
      description: '20-30 minute structured demo with hook, problem, live demo, ROI, and close sequences.',
      highlights: [
        '6-part structure: Hook → Problem → Demo → Results → Pricing → Close',
        'Key line: "In the luxury space, your time is worth more than chasing ghosts"',
        'Trial close and hard close scripts',
        'Demo do\'s and don\'ts',
        'Post-demo follow-up checklist',
      ],
    },
    {
      slug: 'objections',
      title: 'Objection Handling Guide',
      category: 'Sales',
      description: '8 common objections with scripted responses and follow-up strategies.',
      highlights: [
        '"Too expensive" → ROI math (one deal = 50-100x return)',
        '"I already have a lead source" → We\'re a layer on top, not replacement',
        '"Need to think about it" → Ask what specifically',
        '"Want to wait and see" → FOMO + limited spots per market',
        'Golden rule: Acknowledge → Redirect → Close',
      ],
    },
  ];

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
                ? 'bg-purple-600 text-white hover:bg-purple-700' 
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
            <p className={`text-3xl font-bold text-purple-600`}>${(metrics.mrrTarget * 12).toLocaleString()}</p>
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
            {['overview', 'tasks', 'sales', 'metrics', 'docs'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab as any); setSelectedDoc(null); }}
                className={`flex-1 py-4 px-6 font-semibold text-center uppercase text-xs tracking-wide transition ${
                  activeTab === tab
                    ? isDark ? 'bg-purple-600 text-white' : 'bg-purple-600 text-white'
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'overview' && '📊 Overview'}
                {tab === 'tasks' && '✅ Tasks'}
                {tab === 'sales' && '💰 Sales'}
                {tab === 'metrics' && '📈 Metrics'}
                {tab === 'docs' && '📄 Strategy Docs'}
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
                          <p className="font-bold text-purple-600">{m.quarter}</p>
                          <span className={`text-xs px-2 py-1 rounded ${m.status === 'In Progress' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}>
                            {m.status}
                          </span>
                        </div>
                        <p className={`${textClass} text-sm mb-2`}>{m.goal}</p>
                        <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}>
                          <div className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600" style={{width: `${m.progress}%`}}></div>
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
                    <p className="text-xs text-gray-500 mb-2">Signature Plan</p>
                    <p className="text-2xl font-bold text-purple-600">$249/mo</p>
                    <p className="text-xs text-gray-500 mt-2">+ $249 setup · Rep earns: $75 first mo + $25/mo</p>
                  </div>
                  <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4`}>
                    <p className="text-xs text-gray-500 mb-2">Signature + Outreach</p>
                    <p className="text-2xl font-bold text-purple-600">$349/mo</p>
                    <p className="text-xs text-gray-500 mt-2">+ $249 setup · Rep earns: $105 first mo + $35/mo</p>
                  </div>
                  <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4`}>
                    <p className="text-xs text-gray-500 mb-2">Team + Outreach</p>
                    <p className="text-2xl font-bold text-purple-600">$999/mo</p>
                    <p className="text-xs text-gray-500 mt-2">+ $499 setup · Rep earns: $300 first mo + $100/mo</p>
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
                    task.priority === 'High' ? 'border-purple-500' :
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
                        <td className="py-4 px-4 text-sm font-bold text-purple-600">${sale.mrr}</td>
                        <td className="py-4 px-4 text-sm">{sale.stage}</td>
                        <td className="py-4 px-4">
                          <span className="text-xs px-2 py-1 rounded bg-purple-500 text-white font-semibold">
                            {sale.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">
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
                      <span className={`font-bold text-purple-600`}>$0</span>
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
                      <div className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600" style={{width: '0%'}}></div>
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
                      <span className={`font-bold text-purple-600`}>50</span>
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
                      <span className={`font-bold text-purple-600`}>{Math.round((metrics.tasksCompleted / (metrics.tasksCompleted + metrics.tasksRemaining)) * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DOCS TAB */}
          {activeTab === 'docs' && !selectedDoc && (
            <div className="p-8">
              <h2 className={`text-2xl font-bold ${textClass} mb-2`}>Strategy Documents</h2>
              <p className="text-sm text-gray-500 mb-8">All strategy, sales, and operational documents created by Atlas. Click any document to view key highlights.</p>
              
              {['Strategy', 'Sales'].map(cat => {
                const docs = strategyDocs.filter(d => d.category === cat);
                return (
                  <div key={cat} className="mb-8">
                    <h3 className="text-sm uppercase tracking-wider text-purple-600 font-semibold mb-4">{cat === 'Strategy' ? '📊 Strategy & Planning' : '💼 Sales & Training'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {docs.map(doc => (
                        <button
                          key={doc.slug}
                          onClick={() => setSelectedDoc(doc.slug)}
                          className={`${cardClass} border rounded-xl p-5 text-left hover:border-purple-400 transition`}
                        >
                          <h4 className={`font-bold ${textClass}`}>{doc.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                          <p className="text-xs text-purple-600 font-medium mt-3">View Details →</p>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SINGLE DOC VIEW */}
          {activeTab === 'docs' && selectedDoc && (() => {
            const doc = strategyDocs.find(d => d.slug === selectedDoc);
            if (!doc) return null;
            return (
              <div className="p-8">
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium mb-6 inline-block"
                >
                  ← Back to all documents
                </button>
                <div className={`${cardClass} border rounded-xl p-6`}>
                  <span className="text-xs uppercase tracking-wider text-purple-600 font-semibold">{doc.category}</span>
                  <h2 className={`text-2xl font-bold ${textClass} mt-2 mb-2`}>{doc.title}</h2>
                  <p className="text-sm text-gray-500 mb-6">{doc.description}</p>
                  
                  <h3 className={`font-semibold ${textClass} mb-4`}>Key Highlights</h3>
                  <div className="space-y-3">
                    {doc.highlights.map((h, i) => (
                      <div key={i} className={`flex items-start gap-3 ${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4`}>
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-purple-600 text-xs font-bold">{i + 1}</span>
                        </div>
                        <p className={`text-sm ${textClass}`}>{h}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-purple-50'} border ${isDark ? 'border-gray-600' : 'border-purple-200'}`}>
                    <p className="text-sm text-gray-500">📁 Full document available in workspace: <span className="font-mono text-purple-600">luxeleadpro/{doc.slug === 'brand-audit' ? 'OPUS_BRAND_AUDIT.md' : doc.slug === 'sales-launch' ? 'SALES_LAUNCH_PLAN.md' : doc.slug === 'hiring-kit' ? 'HIRING_KIT.md' : doc.slug === 'walkthrough' ? 'COMPANY_WALKTHROUGH.md' : doc.slug === 'vertical-expansion' ? 'VERTICAL_EXPANSION.md' : doc.slug === 'timeline' ? 'TIMELINE_PROJECTION.md' : doc.slug === 'demo-script' ? 'SALES_DEMO.md' : 'OBJECTIONS.md'}</span></p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </main>
    </div>
  );
}

