import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer, Lead } from '@/lib/supabase';
import { getMockLeads, updateMockLead } from '@/lib/mockData';

const useMockData = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Lead | { error: string }>
) {
  const { id } = req.query;
  const idStr = typeof id === 'string' ? id : id?.[0];

  if (!idStr) {
    return res.status(400).json({ error: 'Missing lead ID' });
  }

  if (req.method === 'GET') {
    try {
      if (useMockData) {
        const leads = getMockLeads();
        const lead = leads.find(l => l.id === idStr);
        if (!lead) {
          return res.status(404).json({ error: 'Lead not found' });
        }
        return res.status(200).json(lead);
      }

      const { data, error } = await supabaseServer
        .from('leads')
        .select('*')
        .eq('id', idStr)
        .single();

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching lead:', error);
      return res.status(500).json({ error: 'Failed to fetch lead' });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { status, notes, contact_date } = req.body;

      if (useMockData) {
        const updates: Partial<Lead> = {};
        if (status) updates.status = status;
        if (notes !== undefined) updates.notes = notes;
        if (contact_date) updates.contact_date = contact_date;

        const updated = updateMockLead(idStr, updates);
        if (!updated) {
          return res.status(404).json({ error: 'Lead not found' });
        }
        return res.status(200).json(updated);
      }

      const { data, error } = await supabaseServer
        .from('leads')
        .update({
          ...(status && { status }),
          ...(notes !== undefined && { notes }),
          ...(contact_date && { contact_date }),
        })
        .eq('id', idStr)
        .select()
        .single();

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error('Error updating lead:', error);
      return res.status(500).json({ error: 'Failed to update lead' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
