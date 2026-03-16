import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { teamId, name, description, type, emails, scheduleFrequency } = req.body;

    if (!teamId || !name || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data: sequence, error } = await supabaseServer
      .from('email_sequences')
      .insert([
        {
          team_id: teamId,
          name,
          description: description || null,
          type,
          emails: emails || [],
          schedule_frequency: scheduleFrequency || 'weekly',
          is_active: true,
        },
      ])
      .select();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      sequence: sequence?.[0] || {},
    });
  } catch (error) {
    console.error('Error creating sequence:', error);
    return res.status(500).json({
      error: 'Failed to create sequence',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
