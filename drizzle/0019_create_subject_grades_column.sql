ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS subject_grades JSONB DEFAULT '[]';