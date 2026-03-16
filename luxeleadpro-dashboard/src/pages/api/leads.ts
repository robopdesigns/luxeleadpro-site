import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer, Lead } from '@/lib/supabase';
import { getMockLeads, addMockLead } from '@/lib/mockData';

const useMockData = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Lead[] | Lead | { error: string }>
) {
  if (req.method === 'GET') {
    // Fetch all leads with optional filters
    const { status, sortBy = 'created_at', order = 'desc' } = req.query;

    try {
      if (useMockData) {
        let leads = getMockLeads();

        if (status) {
          leads = leads.filter(l => l.status === status);
        }

        // Sort
        leads.sort((a, b) => {
          const aField = a[sortBy as keyof Lead];
          const bField = b[sortBy as keyof Lead];
          
          if (typeof aField === 'string' && typeof bField === 'string') {
            const aVal = new Date(aField).getTime();
            const bVal = new Date(bField).getTime();
            return order === 'asc' ? aVal - bVal : bVal - aVal;
          }
          return 0;
        });

        return res.status(200).json(leads);
      }

      let query = supabaseServer
        .from('leads')
        .select('*');

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query.order(sortBy as string, {
        ascending: order === 'asc',
      });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      return res.status(500).json({ error: 'Failed to fetch leads' });
    }
  }

  if (req.method === 'POST') {
    // Create a new lead
    const { name, email, phone, brokerage, market, gci_range, timeline, challenge } = req.body;

    try {
      if (useMockData) {
        const newLead = addMockLead({
          name,
          email,
          phone,
          brokerage,
          market,
          gci_range,
          timeline,
          challenge,
          status: 'new',
          qualification_score: 0,
        });
        return res.status(201).json(newLead);
      }

      const { data, error } = await supabaseServer
        .from('leads')
        .insert({
          name,
          email,
          phone,
          brokerage,
          market,
          gci_range,
          timeline,
          challenge,
          status: 'new',
        })
        .select()
        .single();

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(201).json(data);
    } catch (error) {
      console.error('Error creating lead:', error);
      return res.status(500).json({ error: 'Failed to create lead' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
