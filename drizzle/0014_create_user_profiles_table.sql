-- Drop existing user_profiles table if it exists
DROP TABLE IF EXISTS user_profiles CASCADE;

-- Create user_profiles table with proper CockroachDB-compatible syntax
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    academic_year TEXT,
    subjects TEXT[],
    predicted_grades TEXT[],
    location_preference TEXT,
    skills TEXT[],
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);