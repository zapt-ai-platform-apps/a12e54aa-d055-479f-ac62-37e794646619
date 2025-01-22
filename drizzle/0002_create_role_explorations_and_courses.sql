CREATE TABLE role_explorations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  exploration_type TEXT NOT NULL,
  role_title TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  requires_education BOOLEAN NOT NULL,
  academic_year TEXT,
  subjects TEXT[],
  predicted_grades JSONB,
  country TEXT
);

CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exploration_id UUID NOT NULL REFERENCES role_explorations(id),
  provider_name TEXT NOT NULL,
  course_title TEXT NOT NULL,
  course_url TEXT NOT NULL,
  is_higher_education BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);