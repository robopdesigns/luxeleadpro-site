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
    const { leadId, teamId, userId, action, actionType, oldValue, newValue } = req.body;

    if (!leadId || !teamId || !action) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabaseServer
      .from('audit_logs')
      .insert([
        {
          lead_id: leadId,
          team_id: teamId,
          user_id: userId || null,
          action,
          action_type: actionType || null,
          old_value: oldValue || null,
          new_value: newValue || null,
          ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress || null,
          user_agent: req.headers['user-agent'] || null,
        },
      ])
      .select();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      log: data?.[0] || {},
    });
  } catch (error) {
    console.error('Audit log error:', error);
    return res.status(500).json({
      error: 'Failed to create audit log',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
