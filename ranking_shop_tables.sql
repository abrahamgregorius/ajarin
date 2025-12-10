-- Add study_hours column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS study_hours numeric(10,2) DEFAULT 0;

-- Create shop_items table for purchasable items
CREATE TABLE IF NOT EXISTS public.shop_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  price integer NOT NULL,
  type text NOT NULL CHECK (type IN ('nickname', 'avatar', 'theme')),
  data jsonb, -- Store additional data like nickname text, avatar url, etc.
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user_purchases table to track what users have bought
CREATE TABLE IF NOT EXISTS public.user_purchases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  item_id uuid REFERENCES public.shop_items ON DELETE CASCADE NOT NULL,
  purchased_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, item_id) -- Prevent duplicate purchases
);

-- Insert sample nickname items
INSERT INTO public.shop_items (name, description, price, type, data) VALUES
('Pro Scholar', 'Nickname untuk siswa berprestasi', 500, 'nickname', '{"nickname": "Pro Scholar"}'),
('Math Wizard', 'Ahli matematika sejati', 750, 'nickname', '{"nickname": "Math Wizard"}'),
('Science Master', 'Master ilmu pengetahuan', 750, 'nickname', '{"nickname": "Science Master"}'),
('Language Guru', 'Guru bahasa yang ulung', 600, 'nickname', '{"nickname": "Language Guru"}'),
('History Expert', 'Ahli sejarah', 600, 'nickname', '{"nickname": "History Expert"}'),
('Elite Learner', 'Pembelajar elit', 1000, 'nickname', '{"nickname": "Elite Learner"}'),
('Genius Kid', 'Anak genius', 800, 'nickname', '{"nickname": "Genius Kid"}'),
('Study Champion', 'Juara belajar', 900, 'nickname', '{"nickname": "Study Champion"}');

-- Enable RLS for new tables
ALTER TABLE public.shop_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_purchases ENABLE ROW LEVEL SECURITY;

-- Policies for shop_items (everyone can read active items)
CREATE POLICY "Shop items are viewable by everyone." ON shop_items FOR SELECT USING (is_active = true);

-- Policies for user_purchases
CREATE POLICY "Users can view their own purchases." ON user_purchases FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own purchases." ON user_purchases FOR INSERT WITH CHECK (auth.uid() = user_id);