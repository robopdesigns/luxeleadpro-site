import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { teamId } = req.query;

    if (!teamId) {
      return res.status(400).json({ error: 'Team ID required' });
    }

    // Fetch team members
    const { data: members, error: membersError } = await supabaseServer
      .from('team_members')
      .select('*')
      .eq('team_id', teamId);

    if (membersError) throw membersError;

    // Fetch all team leads
    const { data: leads, error: leadsError } = await supabaseServer
      .from('leads')
      .select('*')
      .eq('team_id', teamId)
      .order('created_at', { ascending: false });

    if (leadsError) throw leadsError;

    // Calculate statistics
    let stats = {
      totalLeads: leads?.length || 0,
      newLeads: 0,
      contactedLeads: 0,
      qualifiedLeads: 0,
      convertedLeads: 0,
      lostLeads: 0,
      totalDealValue: 0,
      averageQualificationScore: 0,
      conversionRate: 0,
    };

    if (leads && leads.length > 0) {
      leads.forEach((lead) => {
        switch (lead.status) {
          case 'new':
            stats.newLeads++;
            break;
          case 'contacted':
            stats.contactedLeads++;
            break;
          case 'qualified':
            stats.qualifiedLeads++;
            break;
          case 'converted':
            stats.convertedLeads++;
            break;
          case 'lost':
            stats.lostLeads++;
            break;
        }
        stats.totalDealValue += lead.deal_value || 0;
      });

      stats.averageQualificationScore = Math.round(
        leads.reduce((sum, l) => sum + (l.qualification_score || 0), 0) / leads.length
      );

      stats.conversionRate = Math.round(
        (stats.convertedLeads / stats.totalLeads) * 100
      );
    }

    return res.status(200).json({
      success: true,
      members,
      leads,
      stats,
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({
      error: 'Failed to fetch team data',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
