import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '@/lib/supabase';

interface CommissionParams {
  teamId: string;
  agentId: string;
  leadId: string;
  dealValue: number;
  commissionPercentage?: number;
  status?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      teamId,
      agentId,
      leadId,
      dealValue,
      commissionPercentage = 5,
      status = 'pending',
    } = req.body as CommissionParams;

    if (!teamId || !agentId || !leadValue) {
      return res.status(400).json({
        error: 'Missing required fields: teamId, agentId, dealValue',
      });
    }

    const commissionAmount = (dealValue * commissionPercentage) / 100;

    const { data, error } = await supabaseServer
      .from('commissions')
      .insert([
        {
          team_id: teamId,
          agent_id: agentId,
          lead_id: leadId || null,
          deal_value: dealValue,
          commission_percentage: commissionPercentage,
          commission_amount: commissionAmount,
          status,
        },
      ])
      .select();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      commission: data?.[0] || {},
      commissionAmount,
    });
  } catch (error) {
    console.error('Commission calculation error:', error);
    return res.status(500).json({
      error: 'Failed to calculate commission',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
