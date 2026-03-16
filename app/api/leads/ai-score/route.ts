import { NextRequest, NextResponse } from 'next/server';

interface Lead {
  name: string;
  email: string;
  phone?: string;
  budget?: number;
  timeline?: string;
  property_type?: string;
  market?: string;
  engagement_score?: number;
}

function calculateAIScore(lead: Lead): { score: number; reasoning: string[] } {
  let score = 0;
  const reasoning: string[] = [];

  // Budget scoring (0-30 points)
  if (lead.budget) {
    if (lead.budget >= 5000000) {
      score += 30;
      reasoning.push('Luxury budget ($5M+): High-value target');
    } else if (lead.budget >= 2000000) {
      score += 25;
      reasoning.push('Premium budget ($2M-5M): Strong prospect');
    } else if (lead.budget >= 1000000) {
      score += 20;
      reasoning.push('Luxury entry ($1M-2M): Qualified lead');
    } else if (lead.budget >= 500000) {
      score += 10;
      reasoning.push('Upper-middle market ($500K-1M): Monitor');
    }
  }

  // Timeline scoring (0-25 points)
  if (lead.timeline) {
    if (lead.timeline.toLowerCase().includes('asap') || lead.timeline.toLowerCase().includes('immediate')) {
      score += 25;
      reasoning.push('Timeline: ASAP - High urgency');
    } else if (lead.timeline.toLowerCase().includes('30') || lead.timeline.toLowerCase().includes('month')) {
      score += 15;
      reasoning.push('Timeline: 30 days - Moderate urgency');
    } else if (lead.timeline.toLowerCase().includes('60') || lead.timeline.toLowerCase().includes('quarter')) {
      score += 8;
      reasoning.push('Timeline: 60+ days - Exploratory');
    }
  }

  // Property type scoring (0-20 points)
  if (lead.property_type) {
    const propertyType = lead.property_type.toLowerCase();
    if (propertyType.includes('multi') || propertyType.includes('investment')) {
      score += 20;
      reasoning.push('Multi-family/Investment: High deal value');
    } else if (propertyType.includes('estate') || propertyType.includes('new')) {
      score += 18;
      reasoning.push('Estate/New construction: Premium property');
    } else if (propertyType.includes('luxury') || propertyType.includes('custom')) {
      score += 18;
      reasoning.push('Luxury/Custom home: High-value prospect');
    } else if (propertyType.includes('residential')) {
      score += 10;
      reasoning.push('Residential: Standard prospect');
    }
  }

  // Engagement scoring (0-15 points)
  if (lead.engagement_score) {
    score += Math.min(15, lead.engagement_score);
    reasoning.push(`Engagement: ${lead.engagement_score}/15 - Website interaction level`);
  }

  // Contact completeness (0-10 points)
  const completeness = [lead.name, lead.email, lead.phone, lead.budget].filter(Boolean).length;
  score += completeness * 2.5;
  reasoning.push(`Profile completeness: ${completeness}/4 fields`);

  return {
    score: Math.min(100, Math.round(score)),
    reasoning,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const lead = body.lead as Lead;

    if (!lead || !lead.name || !lead.email) {
      return NextResponse.json(
        { error: 'Lead must have name and email' },
        { status: 400 }
      );
    }

    const { score, reasoning } = calculateAIScore(lead);

    return NextResponse.json({
      success: true,
      leadName: lead.name,
      aiScore: score,
      scoreCategory:
        score >= 80 ? 'Hot Lead' :
        score >= 60 ? 'Warm Lead' :
        score >= 40 ? 'Cool Lead' :
        'Cold Lead',
      reasoning,
      nextActions: [
        score >= 80 ? 'Call immediately - high priority' : 'Add to email sequence',
        score >= 60 ? 'Follow up within 24 hours' : 'Nurture campaign',
        'Check compliance status',
      ],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to score lead' },
      { status: 500 }
    );
  }
}
