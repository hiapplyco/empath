
ALTER TABLE caregiver_profiles
ADD COLUMN IF NOT EXISTS processed_profile jsonb;
