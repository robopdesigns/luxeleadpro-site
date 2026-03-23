import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/leads/import
 * Accepts CSV or JSON lead data and imports into the system.
 * Supports: Manual CSV, Follow Up Boss webhook, Zapier webhook
 */
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    let leads: any[] = [];

    if (contentType.includes('application/json')) {
      // JSON import (Zapier, Follow Up Boss, etc.)
      const body = await req.json();
      leads = Array.isArray(body) ? body : [body];
    } else if (contentType.includes('text/csv') || contentType.includes('multipart/form-data')) {
      // CSV import - parse the data
      const text = await req.text();
      const lines = text.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      leads = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
        const lead: any = {};
        headers.forEach((header, i) => {
          lead[header] = values[i] || '';
        });
        return lead;
      });
    }

    if (leads.length === 0) {
      return NextResponse.json({ error: 'No leads found in request' }, { status: 400 });
    }

    // Normalize lead fields (handle different CRM naming conventions)
    const normalizedLeads = leads.map(lead => ({
      first_name: lead.first_name || lead.firstname || lead['first name'] || lead.name?.split(' ')[0] || '',
      last_name: lead.last_name || lead.lastname || lead['last name'] || lead.name?.split(' ')[1] || '',
      email: lead.email || lead.email_address || '',
      phone: lead.phone || lead.phone_number || lead.mobile || '',
      source: lead.source || lead.lead_source || 'import',
      notes: lead.notes || lead.comments || '',
      estimated_value: lead.estimated_value || lead.price || lead.budget || '',
      neighborhood: lead.neighborhood || lead.area || lead.location || '',
      imported_at: new Date().toISOString(),
      ai_score: null, // Will be scored by AI overnight
    }));

    // TODO: Save to Supabase
    // const { data, error } = await supabase
    //   .from('leads')
    //   .insert(normalizedLeads.map(lead => ({ ...lead, agent_id: agentId })));

    return NextResponse.json({
      ok: true,
      imported: normalizedLeads.length,
      leads: normalizedLeads,
      message: `Successfully imported ${normalizedLeads.length} leads. AI scoring will run overnight.`,
      note: 'Connect Supabase to persist leads to database',
    });

  } catch (error) {
    console.error('Lead import failed:', error);
    return NextResponse.json({ error: 'Import failed. Check your data format.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'POST /api/leads/import',
    description: 'Import leads from CSV, JSON, Follow Up Boss, or Zapier',
    supportedFormats: ['JSON array', 'CSV file', 'Follow Up Boss webhook', 'Zapier webhook'],
    csvTemplate: 'first_name,last_name,email,phone,source,neighborhood,estimated_value,notes',
    zapierWebhook: 'Point your Zapier webhook to POST /api/leads/import with JSON body',
    followUpBoss: 'Use Follow Up Boss webhook URL: https://luxeleadpro.com/api/leads/import',
  });
}
