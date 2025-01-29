CREATE TABLE IF NOT EXISTS saved_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role TEXT NOT NULL,
  courses JSONB NOT NULL,
  requirements TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);