import SafeArea from '../components/SafeArea';

export default function Home() {
    const featuredCourses = [
        { id: 1, title: 'Matematika Dasar', instructor: 'Pak Ahmad', thumbnail: 'https://via.placeholder.com/150/FF6B6B/FFFFFF?text=Math', duration: '45 min', rating: 4.8, students: 1250 },
        { id: 2, title: 'Bahasa Indonesia', instructor: 'Bu Siti', thumbnail: 'https://via.placeholder.com/150/4ECDC4/FFFFFF?text=Bahasa', duration: '30 min', rating: 4.9, students: 980 },
        { id: 3, title: 'IPA Fisika', instructor: 'Pak Budi', thumbnail: 'https://via.placeholder.com/150/45B7D1/FFFFFF?text=Fisika', duration: '60 min', rating: 4.7, students: 750 },
        { id: 4, title: 'Sejarah Indonesia', instructor: 'Bu Rina', thumbnail: 'https://via.placeholder.com/150/F9CA24/FFFFFF?text=Sejarah', duration: '50 min', rating: 4.6, students: 620 },
    ];

    const categories = [
        { name: 'Matematika', icon: '🧮', color: 'bg-gradient-to-br from-red-400 to-red-600 text-white', desc: 'Aljabar, Geometri, Kalkulus' },
        { name: 'Bahasa Indonesia', icon: '📚', color: 'bg-gradient-to-br from-blue-400 to-blue-600 text-white', desc: 'Gramatika, Sastra, Menulis' },
        { name: 'IPA', icon: '🔬', color: 'bg-gradient-to-br from-green-400 to-green-600 text-white', desc: 'Fisika, Kimia, Biologi' },
        { name: 'IPS', icon: '🌍', color: 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white', desc: 'Geografi, Ekonomi, Sosiologi' },
        { name: 'Bahasa Inggris', icon: '🇺🇸', color: 'bg-gradient-to-br from-purple-400 to-purple-600 text-white', desc: 'Vocabulary, Grammar, Speaking' },
        { name: 'Seni Budaya', icon: '🎨', color: 'bg-gradient-to-br from-pink-400 to-pink-600 text-white', desc: 'Musik, Seni Rupa, Tari' },
        { name: 'Olahraga', icon: '⚽', color: 'bg-gradient-to-br from-orange-400 to-orange-600 text-white', desc: 'Pendidikan Jasmani' },
        { name: 'Agama', icon: '🙏', color: 'bg-gradient-to-br from-indigo-400 to-indigo-600 text-white', desc: 'Pendidikan Agama' },
    ];

    const testimonials = [
        { name: 'Sari', grade: 'Kelas 10', text: 'AJARIN bantu saya naik nilai matematika dari 70 ke 90!', avatar: 'https://via.placeholder.com/50/FF6B6B/FFFFFF?text=S' },
        { name: 'Ahmad', grade: 'Kelas 8', text: 'Video-video nya seru dan mudah dipahami. Terima kasih AJARIN!', avatar: 'https://via.placeholder.com/50/4ECDC4/FFFFFF?text=A' },
        { name: 'Maya', grade: 'Kelas 12', text: 'Persiapan UN sangat membantu. Recommended banget!', avatar: 'https://via.placeholder.com/50/45B7D1/FFFFFF?text=M' },
    ];

    const tips = [
        { title: 'Belajar 25 Menit Sehari', desc: 'Konsistensi adalah kunci kesuksesan. Belajar sedikit tapi rutin lebih baik daripada marathon belajar.', icon: '⏰' },
        { title: 'Gunakan Teknik Pomodoro', desc: 'Belajar 25 menit, istirahat 5 menit. Teknik ini meningkatkan fokus dan produktivitas.', icon: '🍅' },
        { title: 'Diskusikan dengan Teman', desc: 'Belajar bersama teman bisa memperdalam pemahaman dan membuat belajar lebih menyenangkan.', icon: '👥' },
        { title: 'Praktikkan Soal', desc: 'Latihan soal secara teratur membantu menguasai materi dan mempersiapkan ujian.', icon: '📝' },
    ];

    return (
        <>
            <SafeArea className="p-4">
                <div className="header mb-6 bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-2xl text-white">
                    <h1 className='font-bold text-2xl mb-2'>Selamat datang di AJARIN!</h1>
                    <p className='text-blue-100 text-lg'>Platform edukasi video terpusat dengan kurikulum Indonesia</p>
                    <div className="mt-4 flex space-x-4 text-sm">
                        <div className="bg-white/20 px-3 py-1 rounded-full">📚 10,000+ Kursus</div>
                        <div className="bg-white/20 px-3 py-1 rounded-full">👨‍🏫 500+ Guru</div>
                        <div className="bg-white/20 px-3 py-1 rounded-full">🎓 1M+ Siswa</div>
                    </div>
                </div>

                <div className="search-bar mb-6">
                    <input
                        type="text"
                        placeholder="🔍 Cari kursus, materi, atau guru..."
                        className="w-full p-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 text-lg shadow-lg"
                    />
                </div>

                <div className="featured-section mb-8">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">🔥 Kursus Populer</h2>
                    <div className="flex space-x-4 overflow-x-auto pb-4">
                        {featuredCourses.map(course => (
                            <div key={course.id} className="flex-shrink-0 w-56 bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-100 hover:shadow-2xl transition-shadow">
                                <img src={course.thumbnail} alt={course.title} className="w-full h-32 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-bold text-lg text-gray-800">{course.title}</h3>
                                    <p className="text-blue-600 font-medium">{course.instructor}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-sm text-gray-600">⏱️ {course.duration}</span>
                                        <span className="text-sm text-yellow-500">⭐ {course.rating}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{course.students.toLocaleString()} siswa</p>
                                    <button className="mt-3 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">Mulai Belajar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="categories-section mb-8">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">📂 Kategori Belajar</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {categories.map(category => (
                            <div key={category.name} className={`${category.color} p-4 rounded-xl flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform shadow-lg`}>
                                <span className="text-3xl mb-2">{category.icon}</span>
                                <span className="font-bold text-lg">{category.name}</span>
                                <span className="text-sm opacity-90 mt-1">{category.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="tips-section mb-8">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">💡 Tips Belajar</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {tips.map((tip, index) => (
                            <div key={index} className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-xl border-l-4 border-green-500">
                                <div className="flex items-start space-x-3">
                                    <span className="text-2xl">{tip.icon}</span>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{tip.title}</h3>
                                        <p className="text-gray-700 mt-1">{tip.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="testimonials-section mb-8">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">🌟 Testimoni Siswa</h2>
                    <div className="space-y-4">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-4 rounded-xl shadow-lg border-l-4 border-yellow-400">
                                <div className="flex items-start space-x-3">
                                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className="font-bold text-gray-800">{testimonial.name}</span>
                                            <span className="text-sm text-gray-500">({testimonial.grade})</span>
                                        </div>
                                        <p className="text-gray-700 italic">"{testimonial.text}"</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cta-section mb-8 bg-gradient-to-r from-orange-400 to-red-500 p-6 rounded-2xl text-white text-center">
                    <h2 className="text-2xl font-bold mb-2">Siap Tingkatkan Nilai Kamu?</h2>
                    <p className="text-orange-100 mb-4">Bergabunglah dengan ribuan siswa yang sudah sukses bersama AJARIN</p>
                    <button className="bg-white text-orange-500 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">Daftar Sekarang</button>
                </div>

                <div className="more-recommendations-section">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">🎯 Rekomendasi Khusus</h2>
                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl border-l-4 border-purple-500">
                            <h3 className="font-bold text-lg text-gray-800">Latihan Soal Matematika Kelas 8</h3>
                            <p className="text-gray-700 mt-1">Tingkatkan kemampuanmu dengan latihan soal interaktif dan pembahasan detail</p>
                            <div className="flex items-center justify-between mt-3">
                                <span className="text-sm text-purple-600 font-medium">500+ soal tersedia</span>
                                <button className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-600 transition-colors">Mulai Latihan</button>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-xl border-l-4 border-blue-500">
                            <h3 className="font-bold text-lg text-gray-800">Video Pembelajaran Fisika Animasi</h3>
                            <p className="text-gray-700 mt-1">Pelajari konsep fisika dengan video animasi 3D yang menarik dan mudah dipahami</p>
                            <div className="flex items-center justify-between mt-3">
                                <span className="text-sm text-blue-600 font-medium">20 video series</span>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">Tonton Video</button>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl border-l-4 border-yellow-500">
                            <h3 className="font-bold text-lg text-gray-800">Kelas Online Live dengan Guru</h3>
                            <p className="text-gray-700 mt-1">Ikuti kelas interaktif langsung dengan guru berpengalaman setiap hari</p>
                            <div className="flex items-center justify-between mt-3">
                                <span className="text-sm text-yellow-600 font-medium">Senin - Jumat, 19:00 WIB</span>
                                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600 transition-colors">Daftar Kelas</button>
                            </div>
                        </div>
                    </div>
                </div>
            </SafeArea>
        </>
    )
}