import React, { useState, useEffect } from 'react';
import { Lead } from '@/lib/supabase';
import LeadsTable from '@/components/LeadsTable';
import MetricsCard from '@/components/MetricsCard';
import ConversionFunnel from '@/components/ConversionFunnel';

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/leads');
      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }
      const data = await response.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch leads:', err);
      setError(err instanceof Error ? err.message : 'Failed to load leads');
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchLeads, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (id: string, status: Lead['status']) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, contact_date: new Date().toISOString() }),
      });

      if (response.ok) {
        fetchLeads();
      }
    } catch (error) {
      console.error('Failed to update lead:', error);
    }
  };

  return (
    <div className="min-h-screen bg-luxe-dark text-gray-200">
      {/* Header */}
      <header className="border-b border-gray-700 bg-luxe-darker/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold luxe-accent">LuxeLeadPro</h1>
              <p className="text-gray-400 mt-1">Lead Management Dashboard</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Total Leads</p>
              <p className="text-3xl font-bold text-luxe-gold">{leads.length}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-300">
            <p className="font-semibold">Error loading leads</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={fetchLeads}
              className="mt-2 px-3 py-1 bg-red-800 text-red-100 rounded hover:bg-red-700 text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-luxe-gold mb-4"></div>
              <p className="text-gray-400">Loading your dashboard...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Metrics Cards */}
            <MetricsCard leads={leads} />

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Funnel - takes 2 columns */}
              <div className="lg:col-span-2">
                <ConversionFunnel leads={leads} />
              </div>

              {/* Status Breakdown */}
              <div className="luxe-card p-8">
                <h2 className="text-2xl font-bold mb-6 luxe-accent">Status Breakdown</h2>
                <div className="space-y-4">
                  {[
                    { status: 'new' as const, label: 'New', color: 'text-blue-400', bgColor: 'bg-blue-900/20' },
                    { status: 'contacted' as const, label: 'Contacted', color: 'text-yellow-400', bgColor: 'bg-yellow-900/20' },
                    { status: 'converted' as const, label: 'Converted', color: 'text-green-400', bgColor: 'bg-green-900/20' },
                    { status: 'lost' as const, label: 'Lost', color: 'text-red-400', bgColor: 'bg-red-900/20' },
                  ].map(({ status, label, color, bgColor }) => {
                    const count = leads.filter(l => l.status === status).length;
                    const percentage = leads.length > 0 ? (count / leads.length * 100) : 0;
                    return (
                      <div key={status} className={`p-4 rounded-lg ${bgColor}`}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{label}</span>
                          <span className={`${color} font-bold`}>{count}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full ${color.replace('text-', 'bg-')}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{percentage.toFixed(1)}%</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Leads Table */}
            <div className="luxe-card p-8">
              <h2 className="text-2xl font-bold mb-6 luxe-accent">All Leads</h2>
              <LeadsTable
                leads={leads}
                onStatusChange={handleStatusChange}
                onRefresh={fetchLeads}
              />
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-700 bg-luxe-darker/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-400">
          <p>LuxeLeadPro Admin Dashboard • Last updated: {new Date().toLocaleString()}</p>
        </div>
      </footer>
    </div>
  );
}
