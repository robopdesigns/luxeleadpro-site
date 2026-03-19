'use client';

import React, { useState } from 'react';

export default function OperationsDashboard() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-gray-900' : 'bg-white';
  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const cardClass = isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200';
  const inputClass = isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300';

  // Sales Data
  const [sales] = useState([
    { id: 1, date: '2026-03-18', customer: 'John Smith', email: 'john@example.com', plan: 'Team Plan', status: 'Active', revenue: 799 },
    { id: 2, date: '2026-03-17', customer: 'Sarah Johnson', email: 'sarah@example.com', plan: 'Per Agent', status: 'Trial', revenue: 199 },
    { id: 3, date: '2026-03-16', customer: 'Michael Chen', email: 'michael@example.com', plan: 'Team Plan', status: 'Active', revenue: 799 },
  ]);

  // Employees Data
  const [employees] = useState([
    { id: 1, name: 'Rob Podgorski', role: 'CEO/Founder', email: 'rob@luxeleadpro.com', status: 'Active', startDate: '2026-03-14' },
  ]);

  // Key Metrics
  const totalRevenue = sales.reduce((sum, s) => sum + (s.status === 'Active' ? s.revenue : 0), 0);
  const totalCustomers = sales.filter(s => s.status === 'Active').length;
  const trialCustomers = sales.filter(s => s.status === 'Trial').length;

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className={`text-3xl font-bold ${textClass}`}>LuxeLeadPro Operations</h1>
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
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className={`${cardClass} border rounded-lg p-6`}>
            <p className="text-sm text-gray-500 mb-2">Monthly Recurring Revenue</p>
            <p className={`text-4xl font-bold text-purple-600`}>${totalRevenue}</p>
            <p className="text-xs text-gray-500 mt-2">+$0 this month</p>
          </div>
          <div className={`${cardClass} border rounded-lg p-6`}>
            <p className="text-sm text-gray-500 mb-2">Active Customers</p>
            <p className={`text-4xl font-bold ${textClass}`}>{totalCustomers}</p>
            <p className="text-xs text-gray-500 mt-2">Paying plans</p>
          </div>
          <div className={`${cardClass} border rounded-lg p-6`}>
            <p className="text-sm text-gray-500 mb-2">Trial Customers</p>
            <p className={`text-4xl font-bold text-blue-600`}>{trialCustomers}</p>
            <p className="text-xs text-gray-500 mt-2">Converting soon</p>
          </div>
          <div className={`${cardClass} border rounded-lg p-6`}>
            <p className="text-sm text-gray-500 mb-2">Team Size</p>
            <p className={`text-4xl font-bold text-green-600`}>{employees.length}</p>
            <p className="text-xs text-gray-500 mt-2">+0 this month</p>
          </div>
        </div>

        {/* Sales Tracking */}
        <div className={`${cardClass} border rounded-lg p-8 mb-8`}>
          <h2 className={`text-2xl font-bold ${textClass} mb-6`}>Sales Tracking</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Plan</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">MRR</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} className={`border-b ${isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-100'} transition`}>
                    <td className="py-4 px-4 text-sm">{sale.date}</td>
                    <td className="py-4 px-4 text-sm font-medium">{sale.customer}</td>
                    <td className="py-4 px-4 text-sm">{sale.email}</td>
                    <td className="py-4 px-4 text-sm">{sale.plan}</td>
                    <td className="py-4 px-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        sale.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {sale.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm font-bold text-purple-600">${sale.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Employee Management */}
        <div className={`${cardClass} border rounded-lg p-8`}>
          <h2 className={`text-2xl font-bold ${textClass} mb-6`}>Team & Employees</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Start Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id} className={`border-b ${isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-100'} transition`}>
                    <td className="py-4 px-4 text-sm font-medium">{emp.name}</td>
                    <td className="py-4 px-4 text-sm">{emp.role}</td>
                    <td className="py-4 px-4 text-sm">{emp.email}</td>
                    <td className="py-4 px-4 text-sm">{emp.startDate}</td>
                    <td className="py-4 px-4 text-sm">
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className={`mt-6 px-6 py-2 rounded-lg font-semibold ${
            isDark 
              ? 'bg-purple-600 text-white hover:bg-purple-700' 
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}>
            + Add Employee
          </button>
        </div>
      </main>
    </div>
  );
}


