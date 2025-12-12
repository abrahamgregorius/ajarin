-- Add role-based access control and video approval system
-- Run this in your Supabase SQL Editor

-- 1. Add role column to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'student';

-- Add CHECK constraint for role column (separate to avoid IF NOT EXISTS issues)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'profiles_role_check' AND conrelid = 'public.profiles'::regclass
    ) THEN
        ALTER TABLE public.profiles
        ADD CONSTRAINT profiles_role_check CHECK (role IN ('student', 'creator', 'admin'));
    END IF;
END $$;

-- 2. Add approved column to videos table
ALTER TABLE public.videos
ADD COLUMN IF NOT EXISTS approved BOOLEAN DEFAULT false;

-- 3. Add creator_id to videos table
ALTER TABLE public.videos
ADD COLUMN IF NOT EXISTS creator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- 4. Add timestamps to videos table if they don't exist
ALTER TABLE public.videos
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());

ALTER TABLE public.videos
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());

-- Add youtube_url column if it doesn't exist
ALTER TABLE public.videos
ADD COLUMN IF NOT EXISTS youtube_url TEXT;

-- Add duration column if it doesn't exist (in minutes)
ALTER TABLE public.videos
ADD COLUMN IF NOT EXISTS duration INTEGER;

-- Add difficulty column if it doesn't exist
ALTER TABLE public.videos
ADD COLUMN IF NOT EXISTS difficulty TEXT;

-- 5. Create index for faster queries on approved videos
CREATE INDEX IF NOT EXISTS idx_videos_approved ON public.videos(approved);

-- 6. Create index for creator videos queries
CREATE INDEX IF NOT EXISTS idx_videos_creator_id ON public.videos(creator_id);

-- 7. Create index for topic videos queries (improves student video listing performance)
CREATE INDEX IF NOT EXISTS idx_videos_topic_id ON public.videos(topic_id);

-- 8. Update RLS policies for videos table to handle creator submissions
-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view approved videos" ON public.videos;
DROP POLICY IF EXISTS "Creators can insert videos" ON public.videos;
DROP POLICY IF EXISTS "Creators can update own videos" ON public.videos;
DROP POLICY IF EXISTS "Admins can update any video" ON public.videos;

-- Enable RLS on videos table
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Anyone can view approved videos
CREATE POLICY "Anyone can view approved videos" ON public.videos
FOR SELECT USING (approved = true OR auth.uid() = creator_id);

-- Creators and admins can insert videos
CREATE POLICY "Creators can insert videos" ON public.videos
FOR INSERT WITH CHECK (
  auth.uid() IN (
    SELECT id FROM public.profiles WHERE role IN ('creator', 'admin')
  )
);

-- Creators can update their own pending videos
CREATE POLICY "Creators can update own pending videos" ON public.videos
FOR UPDATE USING (
  auth.uid() = creator_id AND approved = false
);

-- Admins can update any video
CREATE POLICY "Admins can update any video" ON public.videos
FOR UPDATE USING (
  auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  )
);

-- Creators can delete their own pending videos
CREATE POLICY "Creators can delete own pending videos" ON public.videos
FOR DELETE USING (
  auth.uid() = creator_id AND approved = false
);

-- Admins can delete any video
CREATE POLICY "Admins can delete any video" ON public.videos
FOR DELETE USING (
  auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  )
);

-- 9. Create a function to automatically set creator_id on insert
CREATE OR REPLACE FUNCTION set_video_creator()
RETURNS TRIGGER AS $$
BEGIN
  NEW.creator_id := auth.uid();
  NEW.created_at := timezone('utc'::text, now());
  NEW.updated_at := timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Create trigger to auto-set creator_id
DROP TRIGGER IF EXISTS set_video_creator_trigger ON public.videos;
CREATE TRIGGER set_video_creator_trigger
  BEFORE INSERT ON public.videos
  FOR EACH ROW
  EXECUTE FUNCTION set_video_creator();

-- 11. Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_video_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 12. Create trigger to auto-update timestamp
DROP TRIGGER IF EXISTS update_video_timestamp_trigger ON public.videos;
CREATE TRIGGER update_video_timestamp_trigger
  BEFORE UPDATE ON public.videos
  FOR EACH ROW
  EXECUTE FUNCTION update_video_timestamp();
