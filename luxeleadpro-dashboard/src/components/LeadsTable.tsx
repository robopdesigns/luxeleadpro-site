'use client';

import React, { useState, useEffect } from 'react';
import { Lead } from '@/lib/supabase';
import { FiDownload, FiFilter } from 'react-icons/fi';

interface LeadsTableProps {
  leads: Lead[];
  onStatusChange: (id: string, status: Lead['status']) => void;
  onRefresh: () => void;
}

export default function LeadsTable({ leads, onStatusChange, onRefresh }: LeadsTableProps) {
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(leads);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [sortBy, setSortBy] = useState<'created_at' | 'updated_at'>('created_at');

  useEffect(() => {
    let filtered = leads;
    if (selectedStatus) {
      filtered = leads.filter(lead => lead.status === selectedStatus);
    }
    filtered.sort((a, b) => {
      const dateA = new Date(a[sortBy]).getTime();
      const dateB = new Date(b[sortBy]).getTime();
      return dateB - dateA;
    });
    setFilteredLeads(filtered);
  }, [leads, selectedStatus, sortBy]);

  const statusBadge: Record<Lead['status'], string> = {
    new: 'status-new',
    contacted: 'status-contacted',
    qualified: 'status-qualified',
    converted: 'status-converted',
    lost: 'status-lost',
  };

  const handleExport = async () => {
    try {
      const params = selectedStatus ? `?status=${selectedStatus}` : '';
      const response = await fetch(`/api/leads/export${params}`);
      const csv = await response.text();
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center flex-wrap">
        <FiFilter className="text-luxe-gold" />
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="luxe-select"
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
          <option value="lost">Lost</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'created_at' | 'updated_at')}
          className="luxe-select"
        >
          <option value="created_at">Sort by Created</option>
          <option value="updated_at">Sort by Updated</option>
        </select>

        <button
          onClick={handleExport}
          className="ml-auto luxe-button flex items-center gap-2"
        >
          <FiDownload /> Export CSV
        </button>

        <button
          onClick={onRefresh}
          className="luxe-button-secondary"
        >
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-800 border-b border-gray-700 sticky top-0">
            <tr>
              <th className="px-6 py-4 font-semibold text-luxe-gold">Name</th>
              <th className="px-6 py-4 font-semibold text-luxe-gold">Email</th>
              <th className="px-6 py-4 font-semibold text-luxe-gold">Phone</th>
              <th className="px-6 py-4 font-semibold text-luxe-gold">Market</th>
              <th className="px-6 py-4 font-semibold text-luxe-gold">GCI Range</th>
              <th className="px-6 py-4 font-semibold text-luxe-gold">Timeline</th>
              <th className="px-6 py-4 font-semibold text-luxe-gold">Status</th>
              <th className="px-6 py-4 font-semibold text-luxe-gold">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{lead.name}</td>
                  <td className="px-6 py-4 text-gray-300">{lead.email}</td>
                  <td className="px-6 py-4 text-gray-300">{lead.phone || '-'}</td>
                  <td className="px-6 py-4 text-gray-300">{lead.market || '-'}</td>
                  <td className="px-6 py-4 text-gray-300">{lead.gci_range || '-'}</td>
                  <td className="px-6 py-4 text-gray-300">{lead.timeline || '-'}</td>
                  <td className="px-6 py-4">
                    <select
                      value={lead.status}
                      onChange={(e) => onStatusChange(lead.id, e.target.value as Lead['status'])}
                      className={`luxe-badge cursor-pointer px-2 py-1 ${statusBadge[lead.status]}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="lost">Lost</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-400">
                  No leads found. Start by adding your first lead!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-400 flex justify-between">
        <span>Showing {filteredLeads.length} of {leads.length} leads</span>
        {filteredLeads.length > 0 && (
          <span className="text-luxe-gold">
            {((filteredLeads.length / leads.length) * 100).toFixed(0)}% of total
          </span>
        )}
      </div>
    </div>
  );
}
