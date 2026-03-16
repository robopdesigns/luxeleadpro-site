import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Client-side Supabase (browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase (API routes)
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);

// Types
export interface Lead {
  id: string;
  team_id?: string;
  assigned_agent_id?: string;
  name: string;
  email: string;
  phone?: string;
  brokerage?: string;
  market?: string;
  gci_range?: string;
  timeline?: string;
  challenge?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  deal_value?: number;
  deal_stage?: string;
  estimated_close_date?: string;
  qualification_score: number;
  qualification_factors?: Record<string, number>;
  lead_source?: string;
  created_at: string;
  updated_at: string;
  contact_date?: string;
  notes?: string;
}
