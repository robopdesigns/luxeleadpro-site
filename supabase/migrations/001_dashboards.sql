-- Sales Reps
CREATE TABLE IF NOT EXISTS sales_reps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'onboarding')),
  phone TEXT,
  avatar_url TEXT,
  hire_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pipeline Stages (track lead progression)
CREATE TABLE IF NOT EXISTS pipeline_stages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  stage TEXT NOT NULL CHECK (stage IN ('new', 'contacted', 'demo', 'proposal', 'won', 'lost')),
  changed_by UUID,
  notes TEXT,
  changed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead Assignments
CREATE TABLE IF NOT EXISTS lead_assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  rep_id UUID REFERENCES sales_reps(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'reassigned', 'completed'))
);

-- Rep Activities (calls, emails, demos, meetings)
CREATE TABLE IF NOT EXISTS rep_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rep_id UUID REFERENCES sales_reps(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('call', 'email', 'demo', 'meeting', 'note', 'follow_up')),
  notes TEXT,
  duration_minutes INT,
  outcome TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rep Check-ins
CREATE TABLE IF NOT EXISTS rep_checkins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rep_id UUID REFERENCES sales_reps(id) ON DELETE CASCADE,
  notes TEXT NOT NULL,
  calls_made INT DEFAULT 0,
  demos_booked INT DEFAULT 0,
  deals_closed INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Owner Tasks
CREATE TABLE IF NOT EXISTS owner_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Commissions
CREATE TABLE IF NOT EXISTS commissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rep_id UUID REFERENCES sales_reps(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('first_month', 'recurring', 'bonus')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add stage column to leads table if not exists
DO $$ BEGIN
  ALTER TABLE leads ADD COLUMN IF NOT EXISTS current_stage TEXT DEFAULT 'new';
  ALTER TABLE leads ADD COLUMN IF NOT EXISTS assigned_rep_id UUID REFERENCES sales_reps(id) ON DELETE SET NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Enable RLS
ALTER TABLE sales_reps ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE rep_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE rep_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE owner_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role full access" ON sales_reps FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON pipeline_stages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON lead_assignments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON rep_activities FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON rep_checkins FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON owner_tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON commissions FOR ALL USING (true) WITH CHECK (true);
