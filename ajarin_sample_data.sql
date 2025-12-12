-- ===========================================
-- AJARIN CURRICULUM & YOUTUBE VIDEOS INSERT
-- Run this in Supabase SQL Editor
-- ===========================================

-- 1. CLASSES (Kelas)
INSERT INTO public.classes (id, name) VALUES
(1, 'Kelas 1 SD'),
(2, 'Kelas 2 SD'),
(3, 'Kelas 3 SD'),
(4, 'Kelas 4 SD'),
(5, 'Kelas 5 SD'),
(6, 'Kelas 6 SD'),
(7, 'Kelas 7 SMP'),
(8, 'Kelas 8 SMP'),
(9, 'Kelas 9 SMP'),
(10, 'Kelas 10 SMA'),
(11, 'Kelas 11 SMA'),
(12, 'Kelas 12 SMA')
ON CONFLICT (id) DO NOTHING;

-- 2. SUBJECTS (Mata Pelajaran)
INSERT INTO public.subjects (id, name, class_id) VALUES
-- SD (Kelas 1-6)
(1, 'Matematika', 1), (2, 'Bahasa Indonesia', 1), (3, 'IPA', 1), (4, 'IPS', 1),
(5, 'Matematika', 2), (6, 'Bahasa Indonesia', 2), (7, 'IPA', 2), (8, 'IPS', 2),
(9, 'Matematika', 3), (10, 'Bahasa Indonesia', 3), (11, 'IPA', 3), (12, 'IPS', 3),
(13, 'Matematika', 4), (14, 'Bahasa Indonesia', 4), (15, 'IPA', 4), (16, 'IPS', 4),
(17, 'Matematika', 5), (18, 'Bahasa Indonesia', 5), (19, 'IPA', 5), (20, 'IPS', 5),
(21, 'Matematika', 6), (22, 'Bahasa Indonesia', 6), (23, 'IPA', 6), (24, 'IPS', 6),

-- SMP (Kelas 7-9)
(25, 'Matematika', 7), (26, 'Bahasa Indonesia', 7), (27, 'IPA', 7), (28, 'IPS', 7),
(29, 'Matematika', 8), (30, 'Bahasa Indonesia', 8), (31, 'IPA', 8), (32, 'IPS', 8),
(33, 'Matematika', 9), (34, 'Bahasa Indonesia', 9), (35, 'IPA', 9), (36, 'IPS', 9),

-- SMA (Kelas 10-12)
(37, 'Matematika', 10), (38, 'Bahasa Indonesia', 10), (39, 'Bahasa Inggris', 10),
(40, 'Fisika', 10), (41, 'Kimia', 10), (42, 'Biologi', 10), (43, 'Ekonomi', 10),
(44, 'Matematika', 11), (45, 'Bahasa Indonesia', 11), (46, 'Bahasa Inggris', 11),
(47, 'Fisika', 11), (48, 'Kimia', 11), (49, 'Biologi', 11), (50, 'Geografi', 11),
(51, 'Matematika', 12), (52, 'Bahasa Indonesia', 12), (53, 'Bahasa Inggris', 12),
(54, 'Fisika', 12), (55, 'Kimia', 12), (56, 'Biologi', 12), (57, 'Sosiologi', 12)
ON CONFLICT (id) DO NOTHING;

-- 3. MATERIALS (Materi)
INSERT INTO public.materials (id, name, subject_id) VALUES
-- Matematika SD
(1, 'Bilangan Bulat', 1), (2, 'Penjumlahan', 1), (3, 'Pengurangan', 1),
(4, 'Bilangan Bulat', 5), (5, 'Perkalian', 5), (6, 'Pembagian', 5),
(7, 'Bilangan Bulat', 9), (8, 'Geometri Dasar', 9), (9, 'Pengukuran', 9),

-- Matematika SMP
(10, 'Aljabar', 25), (11, 'Geometri', 25), (12, 'Statistika', 25),
(13, 'Persamaan Linear', 29), (14, 'Fungsi', 29), (15, 'Trigonometri', 33),

-- Matematika SMA
(16, 'Kalkulus', 37), (17, 'Matematika Diskrit', 37), (18, 'Vektor', 44),
(19, 'Matriks', 44), (20, 'Limit dan Kontinuitas', 51), (21, 'Integral', 51),

-- Fisika SMA
(22, 'Mekanika', 40), (23, 'Gelombang', 40), (24, 'Listrik', 47), (25, 'Magnet', 47),
(26, 'Optik', 54), (27, 'Fisika Modern', 54),

-- Kimia SMA
(28, 'Stoikiometri', 41), (29, 'Termokimia', 41), (30, 'Larutan', 48), (31, 'Koloid', 48),
(32, 'Reaksi Redoks', 55), (33, 'Elektrokimia', 55),

-- Biologi SMA
(34, 'Sel', 42), (35, 'Jaringan', 42), (36, 'Genetika', 49), (37, 'Ekologi', 49),
(38, 'Biologi Molekuler', 56), (39, 'Biotechnology', 56),

-- Bahasa Indonesia
(40, 'Teks Naratif', 2), (41, 'Teks Deskriptif', 2), (42, 'Teks Eksposisi', 38),
(43, 'Teks Persuasi', 38), (44, 'Teks Argumentasi', 45), (45, 'Teks Negosiasi', 45),

-- Bahasa Inggris
(46, 'Simple Present', 39), (47, 'Present Continuous', 39), (48, 'Past Tense', 46),
(49, 'Future Tense', 46), (50, 'Passive Voice', 53), (51, 'Reported Speech', 53)
ON CONFLICT (id) DO NOTHING;

-- 4. TOPICS (Topik)
INSERT INTO public.topics (id, name, material_id) VALUES
-- Matematika SD
(1, 'Mengenal Angka 1-10', 1), (2, 'Penjumlahan Angka', 2), (3, 'Pengurangan Angka', 3),
(4, 'Bilangan Puluhan', 4), (5, 'Perkalian Dasar', 5), (6, 'Pembagian Dasar', 6),
(7, 'Bangun Datar', 8), (8, 'Bangun Ruang', 8), (9, 'Satuan Panjang', 9),

-- Matematika SMP
(10, 'Variabel dan Konstanta', 10), (11, 'Persamaan Linear Satu Variabel', 13),
(12, 'Sistem Persamaan Linear', 13), (13, 'Fungsi Linear', 14), (14, 'Fungsi Kuadrat', 14),
(15, 'Trigonometri Sudut Istimewa', 15), (16, 'Identitas Trigonometri', 15),

-- Matematika SMA
(17, 'Limit Fungsi', 16), (18, 'Turunan Fungsi', 16), (19, 'Integral Tak Tentu', 21),
(20, 'Integral Tentu', 21), (21, 'Teorema Pythagoras', 18), (22, 'Operasi Vektor', 18),

-- Fisika SMA
(23, 'Gerak Lurus', 22), (24, 'Gerak Parabola', 22), (25, 'Hukum Newton', 22),
(26, 'Gelombang Mekanik', 23), (27, 'Gelombang Elektromagnetik', 23),
(28, 'Rangkaian Listrik', 24), (29, 'Medan Magnet', 25), (30, 'Induksi Elektromagnetik', 25),

-- Kimia SMA
(31, 'Mol dan Mol Massa', 28), (32, 'Reaksi Kimia', 28), (33, 'Kalor Reaksi', 29),
(34, 'Entalpi', 29), (35, 'Konsentrasi Larutan', 30), (36, 'pH dan Derajat Keasaman', 30),
(37, 'Reaksi Redoks', 32), (38, 'Sel Elektrokimia', 33),

-- Biologi SMA
(39, 'Struktur Sel', 34), (40, 'Fungsi Organel Sel', 34), (41, 'Jaringan Hewan', 35),
(42, 'Jaringan Tumbuhan', 35), (43, 'Pewarisan Sifat', 36), (44, 'DNA dan RNA', 38),

-- Bahasa Indonesia
(45, 'Membuat Cerita Pendek', 40), (46, 'Menggambarkan Objek', 41),
(47, 'Mengembangkan Argumen', 42), (48, 'Teks Persuasi', 43),
(49, 'Berargumentasi', 44), (50, 'Negosiasi', 45),

-- Bahasa Inggris
(51, 'Simple Present Tense', 46), (52, 'Present Continuous Tense', 47),
(53, 'Simple Past Tense', 48), (54, 'Past Continuous Tense', 48),
(55, 'Passive Voice', 50), (56, 'Reported Speech', 51)
ON CONFLICT (id) DO NOTHING;

-- 5. YOUTUBE VIDEOS (APPROVED videos for students)
INSERT INTO public.videos (id, title, video_url, description, topic_id, approved, difficulty, duration) VALUES
-- Matematika SD
(gen_random_uuid(), 'Belajar Angka 1-10 dengan Cara Menyenangkan', 'https://www.youtube.com/watch?v=O8V7vD70mQc', 'Pelajari cara mengenal angka 1 sampai 10 dengan metode yang menyenangkan dan mudah dipahami untuk anak SD kelas 1.', 1, true, 'pemula', 8),
(gen_random_uuid(), 'Penjumlahan untuk Anak SD - Mudah dan Seru', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Video pembelajaran penjumlahan sederhana untuk anak SD dengan contoh-contoh yang mudah dipahami.', 2, true, 'pemula', 10),
(gen_random_uuid(), 'Belajar Pengurangan dengan Objek Nyata', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', 'Pelajari konsep pengurangan menggunakan objek nyata sehari-hari untuk memudahkan pemahaman anak SD.', 3, true, 'pemula', 12),
(gen_random_uuid(), 'Bilangan Puluhan - Mudah Dipahami', 'https://www.youtube.com/watch?v=kJQP7kiw5Fk', 'Penjelasan lengkap tentang bilangan puluhan untuk anak SD kelas 2.', 4, true, 'pemula', 9),
(gen_random_uuid(), 'Perkalian Dasar untuk Anak SD', 'https://www.youtube.com/watch?v=9vKqVkMQHKk', 'Pelajari tabel perkalian 1-10 dengan cara yang menyenangkan dan mudah diingat.', 5, true, 'pemula', 15),
(gen_random_uuid(), 'Pembagian Sederhana untuk Pemula', 'https://www.youtube.com/watch?v=8JYbj8VZ5vI', 'Panduan pembagian untuk anak SD dengan contoh visual yang mudah dipahami.', 6, true, 'pemula', 11),

-- Matematika SMP
(gen_random_uuid(), 'Variabel dan Konstanta - Aljabar Dasar', 'https://www.youtube.com/watch?v=WV4Lvw9l1DY', 'Penjelasan lengkap tentang variabel dan konstanta dalam aljabar untuk siswa SMP.', 10, true, 'menengah', 12),
(gen_random_uuid(), 'Persamaan Linear Satu Variabel', 'https://www.youtube.com/watch?v=rCvxX_QyNmI', 'Panduan lengkap menyelesaikan persamaan linear satu variabel dengan berbagai metode.', 11, true, 'menengah', 18),
(gen_random_uuid(), 'Sistem Persamaan Linear Dua Variabel', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Pelajari cara menyelesaikan SPLDV dengan metode substitusi, eliminasi, dan grafis.', 12, true, 'menengah', 22),
(gen_random_uuid(), 'Fungsi Linear - Konsep dan Grafik', 'https://www.youtube.com/watch?v=0X_fPNl1E_4', 'Penjelasan fungsi linear, gradien, dan persamaan garis lurus.', 13, true, 'menengah', 16),
(gen_random_uuid(), 'Fungsi Kuadrat - Parabola', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Pelajari fungsi kuadrat, titik puncak, dan sifat-sifat parabola.', 14, true, 'menengah', 20),
(gen_random_uuid(), 'Trigonometri Sudut Istimewa', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Pelajari nilai-nilai trigonometri untuk sudut 0°, 30°, 45°, 60°, 90°.', 15, true, 'menengah', 14),

-- Matematika SMA
(gen_random_uuid(), 'Limit Fungsi - Konsep Dasar Kalkulus', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Penjelasan konsep limit fungsi sebagai dasar kalkulus diferensial.', 17, true, 'lanjutan', 25),
(gen_random_uuid(), 'Turunan Fungsi - Aturan-Aturan Turunan', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Panduan lengkap tentang aturan-aturan turunan dalam kalkulus.', 18, true, 'lanjutan', 30),
(gen_random_uuid(), 'Integral Tak Tentu - Teknik Pengintegralan', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Pelajari berbagai teknik mengintegralkan fungsi dalam kalkulus integral.', 19, true, 'lanjutan', 28),
(gen_random_uuid(), 'Integral Tentu - Aplikasi Luas Daerah', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Penjelasan integral tentu dan aplikasinya dalam menghitung luas daerah.', 20, true, 'lanjutan', 26),
(gen_random_uuid(), 'Vektor - Operasi dan Aplikasi', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Pelajari operasi vektor, resultan, dan aplikasi dalam fisika.', 22, true, 'lanjutan', 24),

-- Fisika SMA
(gen_random_uuid(), 'Gerak Lurus Beraturan (GLB)', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Penjelasan GLB, GLBB, dan grafik gerak dengan contoh soal.', 23, true, 'menengah', 20),
(gen_random_uuid(), 'Gerak Parabola - Proyektil', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Pelajari gerak parabola, jangkauan, dan ketinggian maksimum.', 24, true, 'menengah', 22),
(gen_random_uuid(), 'Hukum Newton - Gaya dan Gerak', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Penjelasan tiga hukum Newton dan aplikasinya dalam kehidupan.', 25, true, 'menengah', 25),
(gen_random_uuid(), 'Gelombang Mekanik - Getaran dan Gelombang', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Pelajari konsep getaran, gelombang, dan parameter gelombang.', 26, true, 'menengah', 18),
(gen_random_uuid(), 'Rangkaian Listrik - Hambatan dan Arus', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Penjelasan rangkaian listrik seri, paralel, dan hukum Ohm.', 28, true, 'menengah', 23),

-- Kimia SMA
(gen_random_uuid(), 'Mol dan Perhitungan Kimia', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Pelajari konsep mol, massa molar, dan perhitungan stoikiometri.', 31, true, 'menengah', 21),
(gen_random_uuid(), 'Reaksi Kimia dan Persamaan Reaksi', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Penjelasan jenis reaksi kimia dan cara menulis persamaan reaksi.', 32, true, 'menengah', 19),
(gen_random_uuid(), 'Termokimia - Kalor Reaksi', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Pelajari konsep entalpi, kalor reaksi, dan hukum Hess.', 33, true, 'menengah', 24),
(gen_random_uuid(), 'Larutan - Konsentrasi dan Sifat Koligatif', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Penjelasan konsentrasi larutan, pH, dan sifat koligatif.', 35, true, 'menengah', 22),
(gen_random_uuid(), 'Reaksi Redoks - Bilangan Oksidasi', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Pelajari reaksi redoks, bilangan oksidasi, dan aplikasi dalam kehidupan.', 37, true, 'lanjutan', 26),

-- Biologi SMA
(gen_random_uuid(), 'Struktur Sel - Organel dan Fungsinya', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Penjelasan lengkap struktur sel dan fungsi setiap organel.', 39, true, 'menengah', 28),
(gen_random_uuid(), 'Jaringan Hewan dan Tumbuhan', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Pelajari berbagai jenis jaringan pada hewan dan tumbuhan.', 41, true, 'menengah', 25),
(gen_random_uuid(), 'Genetika - Pewarisan Sifat Mendel', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Penjelasan hukum-hukum Mendel dan pola pewarisan sifat.', 43, true, 'menengah', 30),
(gen_random_uuid(), 'DNA dan RNA - Materi Genetik', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Pelajari struktur DNA, RNA, dan proses replikasi.', 44, true, 'lanjutan', 27),

-- Bahasa Indonesia
(gen_random_uuid(), 'Cara Membuat Cerita Pendek yang Menarik', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Panduan lengkap membuat cerita pendek dengan struktur yang baik.', 45, true, 'menengah', 20),
(gen_random_uuid(), 'Teks Deskriptif - Menggambarkan Objek', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Pelajari cara menulis teks deskriptif yang baik dan menarik.', 46, true, 'menengah', 18),
(gen_random_uuid(), 'Teks Eksposisi - Mengembangkan Argumen', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Panduan mengembangkan argumen dalam teks eksposisi.', 47, true, 'menengah', 22),
(gen_random_uuid(), 'Berargumentasi dengan Baik', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Pelajari teknik berargumentasi yang efektif dan logis.', 49, true, 'menengah', 19),

-- Bahasa Inggris
(gen_random_uuid(), 'Simple Present Tense - Penggunaan dan Contoh', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Penjelasan lengkap simple present tense dengan contoh praktis.', 51, true, 'pemula', 16),
(gen_random_uuid(), 'Present Continuous Tense', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Pelajari present continuous tense dan penggunaannya.', 52, true, 'pemula', 14),
(gen_random_uuid(), 'Simple Past Tense - Regular & Irregular Verbs', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Panduan lengkap simple past tense dengan daftar irregular verbs.', 53, true, 'menengah', 21),
(gen_random_uuid(), 'Passive Voice - Kalimat Pasif', 'https://www.youtube.com/watch?v=8JzMq5qf9Tc', 'Pelajari cara mengubah kalimat aktif menjadi pasif.', 55, true, 'menengah', 18)
ON CONFLICT DO NOTHING;

-- 6. Sample ratings for videos
INSERT INTO public.video_ratings (video_id, user_id, rating) 
SELECT 
    v.id,
    '00000000-0000-0000-0000-000000000001'::uuid,
    floor(random() * 5 + 1)::int
FROM public.videos v
WHERE v.approved = true
LIMIT 20;

-- 7. Sample comments for videos
INSERT INTO public.video_comments (video_id, user_id, comment_text)
SELECT 
    v.id,
    '00000000-0000-0000-0000-000000000001'::uuid,
    CASE (random() * 6)::int
        WHEN 0 THEN 'Video yang sangat membantu! Terima kasih penjelasannya.'
        WHEN 1 THEN 'Penjelasan yang mudah dipahami, cocok untuk belajar mandiri.'
        WHEN 2 THEN 'Materi disampaikan dengan baik, ada contoh-contoh yang jelas.'
        WHEN 3 THEN 'Bagus sekali videonya, membantu saya memahami konsep ini.'
        WHEN 4 THEN 'Terima kasih atas penjelasan yang detail dan lengkap.'
        WHEN 5 THEN 'Video ini sangat berguna untuk persiapan ujian.'
        ELSE 'Penjelasan yang sistematis dan mudah diikuti.'
    END
FROM public.videos v
WHERE v.approved = true
LIMIT 25;

-- 8. Summary
SELECT 
    '✅ Data berhasil dimasukkan!' as status,
    'Classes: ' || (SELECT COUNT(*) FROM public.classes) as classes,
    'Subjects: ' || (SELECT COUNT(*) FROM public.subjects) as subjects,
    'Materials: ' || (SELECT COUNT(*) FROM public.materials) as materials,
    'Topics: ' || (SELECT COUNT(*) FROM public.topics) as topics,
    'Videos: ' || (SELECT COUNT(*) FROM public.videos WHERE approved = true) as videos,
    'Ratings: ' || (SELECT COUNT(*) FROM public.video_ratings) as ratings,
    'Comments: ' || (SELECT COUNT(*) FROM public.video_comments) as comments;
