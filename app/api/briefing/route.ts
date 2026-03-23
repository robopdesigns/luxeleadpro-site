import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/briefing
 * Called by a cron job (Vercel Cron or external scheduler) every morning.
 * Generates and sends daily AI briefings to all active agents.
 * 
 * Headers required:
 *   Authorization: Bearer CRON_SECRET
 * 
 * For now returns mock structure - connect to Supabase + email provider to activate.
 */
export async function POST(req: NextRequest) {
  // Security: verify cron secret
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // TODO: Replace with real Supabase query
    // const { data: agents } = await supabase
    //   .from('profiles')
    //   .select('id, email, first_name')
    //   .eq('role', 'agent')
    //   .eq('subscription_status', 'active');

    // Mock briefing generation
    const mockBriefing = {
      date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
      topLeads: [
        { name: 'Sarah Johnson', score: 92, neighborhood: 'Lincoln Park', estimatedValue: '$3.2M', action: 'Call today — showed strong buying signals last 48h' },
        { name: 'Michael Chen', score: 78, neighborhood: 'Gold Coast', estimatedValue: '$1.8M', action: 'Follow up on the listing you sent Friday' },
        { name: 'Elizabeth Brown', score: 65, neighborhood: 'River North', estimatedValue: '$2.4M', action: 'New to market — warm outreach recommended' },
      ],
      marketIntel: 'Luxury inventory in Lincoln Park down 12% this week. Buyer demand up. Strong seller market — push clients to act now.',
      complianceStatus: '✅ All contacts DNC-verified. No violations detected.',
    };

    // TODO: Send via Resend, SendGrid, or Postmark
    // await sendEmail({
    //   to: agent.email,
    //   subject: `🤖 Your AI Briefing — ${mockBriefing.date}`,
    //   html: generateBriefingEmail(mockBriefing, agent.first_name),
    // });

    return NextResponse.json({
      ok: true,
      message: 'Briefings generated successfully',
      briefing: mockBriefing,
      agentsNotified: 0, // Will be real count once email is wired
      note: 'Connect Supabase + email provider to activate real sends',
    });

  } catch (error) {
    console.error('Briefing generation failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'POST /api/briefing',
    description: 'Generate and send daily AI briefings to all active agents',
    nextSteps: [
      '1. Set CRON_SECRET env variable for security',
      '2. Connect Supabase to query real agent list',
      '3. Add email provider (Resend recommended - free tier)',
      '4. Set up Vercel Cron: vercel.json with 0 7 * * * schedule',
      '5. Wire up to real lead scoring data',
    ],
  });
}
