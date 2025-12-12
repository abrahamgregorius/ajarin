-- Enable RLS and add read access to curriculum tables
-- Use this to ensure Creators and Students can view the curriculum hierarchy

-- 1. Classes
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Everyone can view classes" ON public.classes;
CREATE POLICY "Everyone can view classes" ON public.classes FOR SELECT USING (true);

-- 2. Subjects
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Everyone can view subjects" ON public.subjects;
CREATE POLICY "Everyone can view subjects" ON public.subjects FOR SELECT USING (true);

-- 3. Materials
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Everyone can view materials" ON public.materials;
CREATE POLICY "Everyone can view materials" ON public.materials FOR SELECT USING (true);

-- 4. Topics
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Everyone can view topics" ON public.topics;
CREATE POLICY "Everyone can view topics" ON public.topics FOR SELECT USING (true);
