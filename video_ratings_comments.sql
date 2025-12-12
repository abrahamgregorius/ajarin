-- Video Ratings and Comments System
-- Run this in your Supabase SQL Editor

-- Add description column to videos table
ALTER TABLE public.videos ADD COLUMN IF NOT EXISTS description text;

-- Create video_ratings table
CREATE TABLE IF NOT EXISTS public.video_ratings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id uuid NOT NULL,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(video_id, user_id) -- One rating per user per video
);

-- Create video_comments table
CREATE TABLE IF NOT EXISTS public.video_comments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id uuid NOT NULL,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  comment_text text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create video_stats table to cache rating averages and counts
CREATE TABLE IF NOT EXISTS public.video_stats (
  video_id uuid PRIMARY KEY,
  average_rating numeric(3,2) DEFAULT 0,
  total_ratings integer DEFAULT 0,
  total_comments integer DEFAULT 0,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.video_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_stats ENABLE ROW LEVEL SECURITY;

-- Policies for video_ratings
CREATE POLICY "Users can view all video ratings." ON video_ratings FOR SELECT USING (true);
CREATE POLICY "Users can insert their own ratings." ON video_ratings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ratings." ON video_ratings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ratings." ON video_ratings FOR DELETE USING (auth.uid() = user_id);

-- Policies for video_comments
CREATE POLICY "Users can view all video comments." ON video_comments FOR SELECT USING (true);
CREATE POLICY "Users can insert their own comments." ON video_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments." ON video_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments." ON video_comments FOR DELETE USING (auth.uid() = user_id);

-- Policies for video_stats
CREATE POLICY "Everyone can view video stats." ON video_stats FOR SELECT USING (true);

-- Function to update video stats when rating is added/updated/deleted
CREATE OR REPLACE FUNCTION update_video_stats()
RETURNS trigger AS $$
BEGIN
  -- Calculate new stats for the video
  INSERT INTO public.video_stats (video_id, average_rating, total_ratings, total_comments, updated_at)
  SELECT
    v.video_id,
    COALESCE(AVG(r.rating), 0)::numeric(3,2),
    COUNT(DISTINCT r.id),
    COUNT(DISTINCT c.id),
    now()
  FROM (SELECT NEW.video_id as video_id UNION SELECT OLD.video_id as video_id) v
  LEFT JOIN public.video_ratings r ON r.video_id = v.video_id
  LEFT JOIN public.video_comments c ON c.video_id = v.video_id
  WHERE v.video_id IS NOT NULL
  GROUP BY v.video_id
  ON CONFLICT (video_id) DO UPDATE SET
    average_rating = EXCLUDED.average_rating,
    total_ratings = EXCLUDED.total_ratings,
    total_comments = EXCLUDED.total_comments,
    updated_at = EXCLUDED.updated_at;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers for video_ratings
CREATE TRIGGER update_video_stats_on_rating_change
  AFTER INSERT OR UPDATE OR DELETE ON public.video_ratings
  FOR EACH ROW EXECUTE FUNCTION update_video_stats();

-- Triggers for video_comments
CREATE TRIGGER update_video_stats_on_comment_change
  AFTER INSERT OR UPDATE OR DELETE ON public.video_comments
  FOR EACH ROW EXECUTE FUNCTION update_video_stats();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_video_ratings_updated_at
  BEFORE UPDATE ON public.video_ratings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_video_comments_updated_at
  BEFORE UPDATE ON public.video_comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_video_stats_updated_at
  BEFORE UPDATE ON public.video_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();