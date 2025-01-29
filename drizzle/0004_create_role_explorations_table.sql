CREATE TABLE IF NOT EXISTS role_explorations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  exploration_type TEXT NOT NULL,
  role_title TEXT NOT NULL,
  requires_education BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);