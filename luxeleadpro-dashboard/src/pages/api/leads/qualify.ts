import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '@/lib/supabase';

function calculateQualificationScore(lead: any): { score: number; factors: any } {
  let score = 0;
  const factors: any = {};

  // GCI Range scoring (0-25 points)
  if (lead.gci_range) {
    if (lead.gci_range === '$50k+') {
      score += 25;
      factors.gciRange = 25;
    } else if (lead.gci_range === '$25k-$50k') {
      score += 20;
      factors.gciRange = 20;
    } else if (lead.gci_range === '$10k-$25k') {
      score += 15;
      factors.gciRange = 15;
    } else if (lead.gci_range === 'Under $10k') {
      score += 5;
      factors.gciRange = 5;
    }
  }

  // Timeline scoring (0-25 points)
  if (lead.timeline) {
    if (lead.timeline === 'asap' || lead.timeline === 'ASAP (0-30 days)') {
      score += 25;
      factors.timeline = 25;
    } else if (lead.timeline === '30-60' || lead.timeline === '30-60 days') {
      score += 15;
      factors.timeline = 15;
    } else if (lead.timeline === '60-plus' || lead.timeline === '60+ days') {
      score += 5;
      factors.timeline = 5;
    }
  }

  // Deal Value scoring (0-25 points)
  if (lead.deal_value) {
    if (lead.deal_value > 500000) {
      score += 25;
      factors.dealValue = 25;
    } else if (lead.deal_value > 250000) {
      score += 20;
      factors.dealValue = 20;
    } else if (lead.deal_value > 100000) {
      score += 15;
      factors.dealValue = 15;
    } else if (lead.deal_value > 0) {
      score += 10;
      factors.dealValue = 10;
    }
  }

  // Brokerage/Market scoring (0-15 points)
  if (lead.market && lead.market.length > 0) {
    score += 10;
    factors.market = 10;
  }

  if (lead.brokerage && lead.brokerage.length > 0) {
    score += 5;
    factors.brokerage = 5;
  }

  // Contact intent scoring (0-10 points)
  if (lead.challenge && lead.challenge.length > 20) {
    score += 10;
    factors.challenge = 10;
  }

  return {
    score: Math.min(100, score),
    factors,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Qualify a single lead
    try {
      const { leadId, ...leadData } = req.body;

      if (!leadId) {
        return res.status(400).json({ error: 'Lead ID required' });
      }

      const { score, factors } = calculateQualificationScore(leadData);

      const { data, error } = await supabaseServer
        .from('leads')
        .update({
          qualification_score: score,
          qualification_factors: factors,
        })
        .eq('id', leadId)
        .select();

      if (error) throw error;

      return res.status(200).json({
        success: true,
        lead: data?.[0] || {},
        score,
        factors,
      });
    } catch (error) {
      console.error('Qualification error:', error);
      return res.status(500).json({
        error: 'Failed to qualify lead',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  } else if (req.method === 'GET') {
    // Re-qualify all leads in a team
    try {
      const { teamId } = req.query;

      if (!teamId) {
        return res.status(400).json({ error: 'Team ID required' });
      }

      const { data: leads, error: fetchError } = await supabaseServer
        .from('leads')
        .select('*')
        .eq('team_id', teamId);

      if (fetchError) throw fetchError;

      let updated = 0;

      if (leads && leads.length > 0) {
        for (const lead of leads) {
          const { score, factors } = calculateQualificationScore(lead);

          await supabaseServer
            .from('leads')
            .update({
              qualification_score: score,
              qualification_factors: factors,
            })
            .eq('id', lead.id);

          updated++;
        }
      }

      return res.status(200).json({
        success: true,
        message: `Qualified ${updated} leads`,
        leadsProcessed: updated,
      });
    } catch (error) {
      console.error('Batch qualification error:', error);
      return res.status(500).json({
        error: 'Failed to qualify leads',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
