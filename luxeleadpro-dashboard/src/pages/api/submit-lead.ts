import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '@/lib/supabase';

interface LeadData {
  name: string;
  email: string;
  phone?: string;
  brokerage?: string;
  market?: string;
  gci_range?: string;
  timeline?: string;
  challenge?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, brokerage, market, gci_range, timeline, challenge } = req.body as LeadData;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check for duplicate email
    const { data: existingLead, error: checkError } = await supabaseServer
      .from('leads')
      .select('id')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 means no rows found, which is fine
      throw checkError;
    }

    if (existingLead) {
      return res.status(409).json({ error: 'This email has already been submitted' });
    }

    // Insert lead into Supabase
    const { data, error } = await supabaseServer
      .from('leads')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          brokerage: brokerage || null,
          market: market || null,
          gci_range: gci_range || null,
          timeline: timeline || null,
          challenge: challenge || null,
          status: 'new',
        },
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }

    return res.status(201).json({
      success: true,
      message: 'Lead submitted successfully',
      lead: data?.[0] || {},
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({
      error: 'Failed to submit lead',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
