-- LUXELEADPRO v2 SCHEMA WITH TEAMS, ROLES, AND ADVANCED FEATURES

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  owner_id UUID NOT NULL,
  subscription_tier VARCHAR(50) DEFAULT 'agent' CHECK (subscription_tier IN ('agent', 'team', 'enterprise')),
  max_agents INT DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members with roles
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_email VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'agent' CHECK (role IN ('owner', 'manager', 'agent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, user_email)
);

-- Enhanced leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  assigned_agent_id UUID REFERENCES team_members(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  brokerage VARCHAR(255),
  market VARCHAR(255),
  gci_range VARCHAR(100),
  timeline VARCHAR(100),
  challenge TEXT,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  
  -- Deal tracking
  deal_value DECIMAL(12, 2),
  deal_stage VARCHAR(50),
  estimated_close_date DATE,
  
  -- Qualification scoring
  qualification_score INT DEFAULT 0,
  qualification_factors JSONB,
  lead_source VARCHAR(100),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  contact_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- Compliance audit trail
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES team_members(id),
  action VARCHAR(255) NOT NULL,
  action_type VARCHAR(50),
  old_value JSONB,
  new_value JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Commission tracking
CREATE TABLE IF NOT EXISTS commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES team_members(id),
  lead_id UUID REFERENCES leads(id),
  commission_amount DECIMAL(10, 2),
  commission_percentage DECIMAL(5, 2),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'earned', 'paid')),
  deal_value DECIMAL(12, 2),
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lead sources tracking
CREATE TABLE IF NOT EXISTS lead_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  source_name VARCHAR(100) NOT NULL,
  source_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, source_name)
);

-- Source analytics
CREATE TABLE IF NOT EXISTS source_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  source_id UUID NOT NULL REFERENCES lead_sources(id),
  leads_count INT DEFAULT 0,
  qualified_count INT DEFAULT 0,
  converted_count INT DEFAULT 0,
  total_revenue DECIMAL(12, 2),
  cost DECIMAL(10, 2),
  roi DECIMAL(8, 2),
  month DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_leads_team_id ON leads(team_id);
CREATE INDEX idx_leads_agent_id ON leads(assigned_agent_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_audit_lead_id ON audit_logs(lead_id);
CREATE INDEX idx_audit_team_id ON audit_logs(team_id);
CREATE INDEX idx_audit_created_at ON audit_logs(created_at DESC);
CREATE INDEX idx_team_members_team_id ON team_members(team_id);
CREATE INDEX idx_commissions_team_id ON commissions(team_id);
CREATE INDEX idx_commissions_agent_id ON commissions(agent_id);

-- Updated timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_commissions_updated_at BEFORE UPDATE ON commissions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE source_analytics ENABLE ROW LEVEL SECURITY;

-- Policy: Agents see only their own leads
CREATE POLICY leads_agent_policy ON leads
FOR SELECT USING (
  assigned_agent_id = (SELECT id FROM team_members WHERE user_email = current_user_email() LIMIT 1)
);

-- Policy: Managers see all team leads
CREATE POLICY leads_manager_policy ON leads
FOR SELECT USING (
  team_id IN (
    SELECT team_id FROM team_members 
    WHERE user_email = current_user_email() AND role IN ('manager', 'owner')
  )
);
