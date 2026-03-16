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
    const { teamId, leadId, email, phone, consentType } = req.body;

    if (!teamId || !leadId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check compliance status
    const { data: compliance, error: complianceError } = await supabaseServer
      .from('compliance_tracking')
      .select('*')
      .eq('team_id', teamId)
      .eq('lead_id', leadId)
      .eq('consent_type', consentType || 'email')
      .single();

    if (complianceError && complianceError.code !== 'PGRST116') {
      throw complianceError;
    }

    const tcpaCompliant = compliance?.tcpa_compliant ?? true;
    const doNotCall = compliance?.do_not_call ?? false;
    const consentGiven = compliance?.consent_given ?? false;

    // Log compliance check
    await supabaseServer
      .from('compliance_audit_log')
      .insert([
        {
          team_id: teamId,
          lead_id: leadId,
          action: `compliance_check_${consentType || 'email'}`,
          compliance_check: 'tcpa_check',
          result: tcpaCompliant && !doNotCall && consentGiven ? 'pass' : 'fail',
          details: {
            tcpaCompliant,
            doNotCall,
            consentGiven,
            email,
            phone,
          },
        },
      ]);

    return res.status(200).json({
      success: true,
      compliance: {
        tcpaCompliant,
        doNotCall,
        consentGiven,
        canContact: tcpaCompliant && !doNotCall && consentGiven,
      },
    });
  } catch (error) {
    console.error('Compliance check error:', error);
    return res.status(500).json({
      error: 'Failed to check compliance',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
