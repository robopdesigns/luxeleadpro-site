import { NextRequest, NextResponse } from "next/server";

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────

interface OutreachRequest {
  leadId: string;
  agentEmail: string;
  agentName: string;
  leadName: string;
  leadEmail: string;
  neighborhood: string;
  estimatedValue: string; // e.g. "$2.5M–$3.2M"
  vertical?: string;      // e.g. "luxury residential"
}

interface EmailMessage {
  seq: number;
  sendDay: number;
  subject: string;
  body: string;
}

interface OutreachSequence {
  leadId: string;
  leadEmail: string;
  agentName: string;
  agentEmail: string;
  neighborhood: string;
  estimatedValue: string;
  generatedAt: string;
  emails: EmailMessage[];
  note: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// Email template generator
// ──────────────────────────────────────────────────────────────────────────────

function generateSequence(req: OutreachRequest): OutreachSequence {
  const {
    leadId,
    agentEmail,
    agentName,
    leadName,
    leadEmail,
    neighborhood,
    estimatedValue,
    vertical = "luxury real estate",
  } = req;

  const firstName = leadName.split(" ")[0];

  const emails: EmailMessage[] = [
    // ── Email 1 – Day 1 ──────────────────────────────────────────────────────
    {
      seq: 1,
      sendDay: 1,
      subject: `Quick question about ${neighborhood} properties`,
      body: `Hi ${firstName},

I hope this finds you well. My name is ${agentName}, and I specialize in ${vertical} in the ${neighborhood} area — specifically in the ${estimatedValue} range.

I noticed you've been exploring opportunities in ${neighborhood} and wanted to reach out personally. This market moves fast, and a few exceptional properties have come across my desk that aren't listed publicly yet.

Do you have 10 minutes this week for a quick call? I'd love to share what I'm seeing and find out if any of it lines up with what you're looking for.

Looking forward to connecting,
${agentName}
${agentEmail}

P.S. No pressure at all — just want to make sure you have access to everything the market has to offer in ${neighborhood}.`,
    },

    // ── Email 2 – Day 3 ──────────────────────────────────────────────────────
    {
      seq: 2,
      sendDay: 3,
      subject: `Re: ${neighborhood}`,
      body: `Hi ${firstName},

Just following up on my note from a couple days ago.

One thing I want to share: agents who use AI-powered lead intelligence in the ${neighborhood} market are identifying the right buyers 2–3 weeks before traditional outreach. That means you get first access to motivated sellers, off-market properties, and pricing insights your competition simply doesn't have.

For properties in the ${estimatedValue} range, timing is everything — the difference between a deal and a miss is often a single well-timed conversation.

If a brief 10-minute call makes sense, I'd love to walk you through what I'm seeing in ${neighborhood} right now.

Best,
${agentName}
${agentEmail}`,
    },

    // ── Email 3 – Day 7 ──────────────────────────────────────────────────────
    {
      seq: 3,
      sendDay: 7,
      subject: `Last thought on ${neighborhood}`,
      body: `Hi ${firstName},

I'll keep this short — I don't want to crowd your inbox.

I've enjoyed following the ${neighborhood} market and thought of you when I came across a few interesting developments in the ${estimatedValue} price band. Whether now is the right time for you or not, I'd genuinely love to connect.

If the timing is ever right, feel free to reach back out. I'll be here.

Wishing you all the best,
${agentName}
${agentEmail}

— No reply needed. I just wanted to leave the door open.`,
    },
  ];

  return {
    leadId,
    leadEmail,
    agentName,
    agentEmail,
    neighborhood,
    estimatedValue,
    generatedAt: new Date().toISOString(),
    emails,
    note: "Sequence generated. Connect Resend (or another email provider) to send these emails on schedule.",
  };
}

// ──────────────────────────────────────────────────────────────────────────────
// Route handlers
// ──────────────────────────────────────────────────────────────────────────────

export async function GET() {
  return NextResponse.json({
    endpoint: "POST /api/outreach",
    status: "active",
    description:
      "Generates a 3-email luxury real estate cold outreach sequence. Connect Resend (or another provider) to schedule delivery.",
    requiredBody: {
      leadId: "string",
      agentEmail: "string",
      agentName: "string",
      leadName: "string",
      leadEmail: "string",
      neighborhood: "string",
      estimatedValue: "string (e.g. '$2.5M–$3.2M')",
      vertical: "string (optional, default: 'luxury real estate')",
    },
    sequence: [
      { seq: 1, sendDay: 1, subject: "Quick question about [neighborhood] properties" },
      { seq: 2, sendDay: 3, subject: "Re: [neighborhood]" },
      { seq: 3, sendDay: 7, subject: "Last thought on [neighborhood]" },
    ],
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<OutreachRequest>;

    // Validate required fields
    const required: (keyof OutreachRequest)[] = [
      "leadId",
      "agentEmail",
      "agentName",
      "leadName",
      "leadEmail",
      "neighborhood",
      "estimatedValue",
    ];

    const missing = required.filter((k) => !body[k]);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields", missing },
        { status: 400 }
      );
    }

    const sequence = generateSequence(body as OutreachRequest);

    return NextResponse.json({ success: true, sequence }, { status: 200 });
  } catch (err) {
    console.error("[/api/outreach] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
