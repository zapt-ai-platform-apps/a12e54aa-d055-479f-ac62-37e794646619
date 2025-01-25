-- Create user_roles table with proper CockroachDB-compatible syntax
CREATE TABLE IF NOT EXISTS user_roles (
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

-- Create saved_courses table with proper foreign key reference
CREATE TABLE IF NOT EXISTS saved_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    role_id UUID REFERENCES user_roles(id) ON DELETE CASCADE,
    provider_name TEXT NOT NULL,
    course_title TEXT NOT NULL,
    course_url TEXT NOT NULL,
    is_higher_education BOOLEAN,
    saved_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_profiles table if not exists
CREATE TABLE IF NOT EXISTS user_profiles (
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