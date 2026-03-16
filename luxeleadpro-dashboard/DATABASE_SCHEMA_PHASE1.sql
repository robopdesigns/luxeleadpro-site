-- LUXELEADPRO PHASE 1 - Additional Tables

-- Email Sequences
CREATE TABLE IF NOT EXISTS email_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) CHECK (type IN ('luxury_intel', 'market_update', 'buyer_nurture', 'seller_nurture')),
  emails JSONB DEFAULT '[]',
  schedule_frequency VARCHAR(50) DEFAULT 'weekly',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, name)
);

-- Email Sequence Emails (individual emails in a sequence)
CREATE TABLE IF NOT EXISTS sequence_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sequence_id UUID NOT NULL REFERENCES email_sequences(id) ON DELETE CASCADE,
  order_number INT NOT NULL,
  subject VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  luxury_intel JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(sequence_id, order_number)
);

-- Compliance Tracking
CREATE TABLE IF NOT EXISTS compliance_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id),
  lead_id UUID REFERENCES leads(id),
  consent_type VARCHAR(50) CHECK (consent_type IN ('email', 'sms', 'call')),
  consent_given BOOLEAN DEFAULT FALSE,
  consent_date TIMESTAMP WITH TIME ZONE,
  do_not_call BOOLEAN DEFAULT FALSE,
  tcpa_compliant BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, lead_id, consent_type)
);

-- Email Campaign Sends
CREATE TABLE IF NOT EXISTS email_sends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id),
  lead_id UUID REFERENCES leads(id),
  sequence_id UUID REFERENCES email_sequences(id),
  sequence_email_id UUID REFERENCES sequence_emails(id),
  recipient_email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'opened', 'clicked')),
  sent_at TIMESTAMP WITH TIME ZONE,
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(sequence_email_id, lead_id)
);

-- Agent Onboarding Progress
CREATE TABLE IF NOT EXISTS onboarding_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id),
  user_id UUID NOT NULL REFERENCES team_members(id),
  step_1_profile_complete BOOLEAN DEFAULT FALSE,
  step_2_lead_source_complete BOOLEAN DEFAULT FALSE,
  step_3_compliance_complete BOOLEAN DEFAULT FALSE,
  step_4_first_campaign_complete BOOLEAN DEFAULT FALSE,
  onboarding_complete BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(team_id, user_id)
);

-- Compliance Audit Log
CREATE TABLE IF NOT EXISTS compliance_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id),
  lead_id UUID REFERENCES leads(id),
  action VARCHAR(255) NOT NULL,
  compliance_check VARCHAR(100),
  result VARCHAR(50) CHECK (result IN ('pass', 'fail', 'warning')),
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_sequences_team ON email_sequences(team_id);
CREATE INDEX idx_sequence_emails_sequence ON sequence_emails(sequence_id);
CREATE INDEX idx_compliance_team ON compliance_tracking(team_id);
CREATE INDEX idx_compliance_lead ON compliance_tracking(lead_id);
CREATE INDEX idx_email_sends_team ON email_sends(team_id);
CREATE INDEX idx_email_sends_status ON email_sends(status);
CREATE INDEX idx_onboarding_team ON onboarding_progress(team_id);
CREATE INDEX idx_compliance_audit_team ON compliance_audit_log(team_id);

-- Triggers for updated_at
CREATE TRIGGER update_sequences_updated_at BEFORE UPDATE ON email_sequences
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
