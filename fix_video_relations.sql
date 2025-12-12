-- Fix Foreign Key relationship to allow joining videos with profiles
-- We need the foreign key to point to public.profiles, not auth.users, for PostgREST joins to work easily

-- 1. Drop the old constraint if it exists (it might point to auth.users)
ALTER TABLE public.videos
DROP CONSTRAINT IF EXISTS videos_creator_id_fkey;

-- 2. Add the constraint pointing to public.profiles
ALTER TABLE public.videos
ADD CONSTRAINT videos_creator_id_fkey
FOREIGN KEY (creator_id)
REFERENCES public.profiles(id)
ON DELETE SET NULL;

-- 3. Ensure Admins can read all profiles (for the moderation list)
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT USING (
  auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  )
);

-- 4. Ensure we have a policy for public profile viewing if it doesn't exist (fallback)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
FOR SELECT USING (true);
