-- Fix RLS policy to allow Admins to VIEW all videos (including pending ones)

-- 1. Drop the restrictive policy if we want to replace it, OR just add a new one for Admins.
-- Adding a specific one for admins is safer and cleaner.

DROP POLICY IF EXISTS "Admins can view all videos" ON public.videos;

CREATE POLICY "Admins can view all videos" ON public.videos
FOR SELECT USING (
  auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  )
);
