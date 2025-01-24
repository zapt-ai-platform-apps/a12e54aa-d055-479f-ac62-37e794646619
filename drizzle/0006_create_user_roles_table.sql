CREATE TABLE IF NOT EXISTS user_roles (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  role_title TEXT NOT NULL,
  academic_year TEXT,
  subjects TEXT[],
  predicted_grades TEXT[],
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  requires_higher_education BOOLEAN
);