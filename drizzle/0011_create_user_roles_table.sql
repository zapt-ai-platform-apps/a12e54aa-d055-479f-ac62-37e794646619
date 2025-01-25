-- Drop existing tables if they exist
DROP TABLE IF EXISTS saved_courses CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;

-- Create user_roles table with CockroachDB-compatible UUID primary key
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role_title TEXT NOT NULL,
  academic_year TEXT,
  subjects TEXT[],
  predicted_grades TEXT[],
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  requires_higher_education BOOLEAN
);

-- Create saved_courses table with proper UUID references
CREATE TABLE saved_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role_id UUID REFERENCES user_roles(id) ON DELETE CASCADE,
  provider_name TEXT NOT NULL,
  course_title TEXT NOT NULL,
  course_url TEXT NOT NULL,
  is_higher_education BOOLEAN,
  saved_at TIMESTAMPTZ DEFAULT now()
);