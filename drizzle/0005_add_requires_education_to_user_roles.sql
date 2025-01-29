ALTER TABLE user_roles
ADD COLUMN IF NOT EXISTS requires_higher_education BOOLEAN;