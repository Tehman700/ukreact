-- Add meet_url column to inquiry table
ALTER TABLE inquiry 
ADD COLUMN IF NOT EXISTS meet_url TEXT;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_inquiry_meet_url ON inquiry(meet_url);
