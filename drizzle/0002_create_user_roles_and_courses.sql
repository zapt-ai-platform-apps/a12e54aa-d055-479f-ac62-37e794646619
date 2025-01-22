CREATE TABLE IF NOT EXISTS user_roles (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  role_title TEXT NOT NULL,
  academic_year TEXT,
  subjects TEXT[],
  predicted_grades TEXT[],
  country TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  requires_higher_education BOOLEAN
);

CREATE TABLE IF NOT EXISTS saved_courses (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  role_id INT REFERENCES user_roles(id),
  provider_name TEXT NOT NULL,
  course_title TEXT NOT NULL,
  course_url TEXT NOT NULL,
  is_higher_education BOOLEAN,
  saved_at TIMESTAMP DEFAULT NOW()
);