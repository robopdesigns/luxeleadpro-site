import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '@/lib/supabase';

// Placeholder for email service (SendGrid, Resend, etc.)
async function sendEmailViaProvider(
  to: string,
  subject: string,
  body: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  // TODO: Integrate with SendGrid, Resend, or similar
  // For now, just simulate success
  console.log(`Email would be sent to: ${to}, Subject: ${subject}`);
  return {
    success: true,
    messageId: `msg_${Date.now()}`,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { teamId, leadId, sequenceId, recipientEmail, subject, body } = req.body;

    if (!teamId || !leadId || !recipientEmail || !subject || !body) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check compliance before sending
    const { data: compliance } = await supabaseServer
      .from('compliance_tracking')
      .select('*')
      .eq('team_id', teamId)
      .eq('lead_id', leadId)
      .eq('consent_type', 'email')
      .single();

    if (compliance?.do_not_call || !compliance?.consent_given) {
      return res.status(403).json({
        error: 'Cannot send email - compliance violation',
        reason: compliance?.do_not_call ? 'On Do Not Call list' : 'No consent given',
      });
    }

    // Send email
    const emailResult = await sendEmailViaProvider(recipientEmail, subject, body);

    if (!emailResult.success) {
      return res.status(500).json({
        error: 'Failed to send email',
        details: emailResult.error,
      });
    }

    // Log the send
    const { data: send, error: sendError } = await supabaseServer
      .from('email_sends')
      .insert([
        {
          team_id: teamId,
          lead_id: leadId,
          sequence_id: sequenceId || null,
          recipient_email: recipientEmail,
          subject,
          status: 'sent',
          sent_at: new Date().toISOString(),
        },
      ])
      .select();

    if (sendError) throw sendError;

    return res.status(200).json({
      success: true,
      send: send?.[0] || {},
      messageId: emailResult.messageId,
    });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({
      error: 'Failed to send email sequence',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
