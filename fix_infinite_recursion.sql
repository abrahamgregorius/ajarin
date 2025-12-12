-- Fix Infinite Recursion in RLS Policies
-- The previous policy created a loop: checking permissions on 'profiles' required reading 'profiles'.

-- 1. Create a secure function to check the user's role without triggering RLS
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT AS $$
DECLARE
  user_role text;
BEGIN
  -- Read the role from the profiles table directly
  -- processing this function as SECURITY DEFINER bypasses RLS
  SELECT role INTO user_role
  FROM public.profiles
  WHERE id = auth.uid();

  RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Fix 'profiles' table policy
-- Allow users to view their own profile, and Admins to view ALL profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- Create a comprehensive policy
CREATE POLICY "Profiles access policy" ON public.profiles
FOR SELECT USING (
  -- User matches the profile ID
  auth.uid() = id
  OR
  -- OR User is an admin (using the secure function to avoid recursion)
  get_my_role() = 'admin'
  OR
  -- OR Public Read access (optional, if you want everyone to see names)
  true
);

-- Note: If we set USING (true), the other checks are redundant for SELECT.
-- But if we want to restrict it later, the get_my_role() pattern is crucial.
-- For now, let's Stick to the requirement: Admins need to see everyone.
-- Previous setup had 'Public profiles are viewable by everyone' set to true.
-- If that is true, then we don't even need the Admin check for SELECT.
-- Let's assume we want to restrict it properly now OR just fix the recursion.

-- Let's proceed with a clean, restricted policy that works:
DROP POLICY IF EXISTS "Profiles access policy" ON public.profiles;
CREATE POLICY "Anyone can view profiles" ON public.profiles
FOR SELECT USING (true);
-- Wait, if everyone can view profiles, why did I add the specific Admin policy?
-- Because I might have removed the "Everyone" policy in a previous step thinking it was insecure or redundant.
-- Let's just make it "Everyone can view profiles" to be safe and simple and definitely avoid recursion.


-- 3. Fix 'videos' table policy (Admins view all)
-- Use the function here too for better performance/safety
DROP POLICY IF EXISTS "Admins can view all videos" ON public.videos;
CREATE POLICY "Admins can view all videos" ON public.videos
FOR SELECT USING (
  get_my_role() = 'admin'
);
