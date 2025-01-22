CREATE TABLE saved_roles (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  role TEXT NOT NULL,
  courses JSONB NOT NULL,
  requirements TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);