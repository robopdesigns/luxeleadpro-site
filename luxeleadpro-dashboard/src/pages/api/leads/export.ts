import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '@/lib/supabase';
import { getMockLeads } from '@/lib/mockData';

const useMockData = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { status } = req.query;

  try {
    let leads: any[] = [];

    if (useMockData) {
      let allLeads = getMockLeads();
      if (status) {
        allLeads = allLeads.filter(l => l.status === status);
      }
      leads = allLeads;
    } else {
      let query = supabaseServer.from('leads').select('*');

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      leads = data || [];
    }

    if (leads.length === 0) {
      return res.status(200).send('name,email,phone,brokerage,market,gci_range,timeline,challenge,status,created_at,updated_at,notes,contact_date');
    }

    const headers = Object.keys(leads[0]);
    const csv = [
      headers.join(','),
      ...leads.map((lead: any) =>
        headers.map(header => {
          const value = lead[header];
          if (value === null || value === undefined) return '';
          if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      ),
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="leads-${new Date().toISOString().split('T')[0]}.csv"`);
    return res.status(200).send(csv);
  } catch (error) {
    console.error('Error exporting leads:', error);
    return res.status(500).json({ error: 'Failed to export leads' });
  }
}
