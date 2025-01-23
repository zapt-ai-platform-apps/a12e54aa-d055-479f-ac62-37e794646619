CREATE TABLE IF NOT EXISTS niche_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id INT REFERENCES user_roles(id),
  prompt TEXT NOT NULL,
  expected_answer_keywords TEXT[],
  difficulty_level TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS challenge_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  challenge_id UUID REFERENCES niche_challenges(id),
  response TEXT NOT NULL,
  feedback TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_specializations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role_id INT REFERENCES user_roles(id),
  specialization TEXT NOT NULL,
  confirmed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);