import { Link } from 'react-router-dom';
import SafeArea from '../components/SafeArea';
import { useState } from 'react';
import { GraduationCap, BookOpen, Users, Play, ChevronDown, TrendingUp, Award, Clock, ChevronRight } from 'lucide-react';

export default function Home() {
    const [selectedLevel, setSelectedLevel] = useState('SD');

    // Function to get time-based greeting
    const getTimeBasedGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'Selamat Pagi';
        if (hour >= 12 && hour < 15) return 'Selamat Siang';
        if (hour >= 15 && hour < 18) return 'Selamat Sore';
        return 'Selamat Malam';
    };

    // Data untuk kelas berdasarkan level
    const classesByLevel = {
        SD: Array.from({ length: 6 }, (_, i) => i + 1),
        SMP: Array.from({ length: 3 }, (_, i) => i + 7),
        SMA: Array.from({ length: 3 }, (_, i) => i + 10)
    };

    // Data untuk topik populer
    const popularTopics = [
        { name: 'Persamaan Linear', class: 'Kelas 7', subject: 'Matematika', videos: 5 },
        { name: 'Struktur Atom', class: 'Kelas 10', subject: 'IPA', videos: 8 },
        { name: 'Sejarah Perjuangan', class: 'Kelas 11', subject: 'IPS', videos: 6 },
        { name: 'Tenses Bahasa Inggris', class: 'Kelas 8', subject: 'Bahasa Inggris', videos: 4 },
        { name: 'Puisi Lama', class: 'Kelas 9', subject: 'Bahasa Indonesia', videos: 7 },
    ];

    // Data untuk artikel informatif
    const articles = [
        {
            id: 1,
            title: 'Tips Belajar Matematika yang Efektif',
            excerpt: 'Pelajari cara belajar matematika yang menyenangkan dan efektif untuk meningkatkan pemahaman konsep...',
            category: 'Tips Belajar',
            readTime: '5 min',
            image: '📚'
        },
        {
            id: 2,
            title: 'Pentingnya Literasi Digital di Era Modern',
            excerpt: 'Dalam era digital saat ini, literasi digital menjadi keterampilan penting yang harus dikuasai oleh setiap siswa...',
            category: 'Teknologi',
            readTime: '7 min',
            image: '💻'
        },
        {
            id: 3,
            title: 'Cara Mengatasi Kesulitan Belajar IPA',
            excerpt: 'IPA sering dianggap sulit, namun dengan metode yang tepat, pelajaran ini bisa menjadi menarik dan mudah dipahami...',
            category: 'Tips Belajar',
            readTime: '6 min',
            image: '🔬'
        },
        {
            id: 4,
            title: 'Motivasi Belajar: Temukan Passion Anda',
            excerpt: 'Belajar bukan hanya tentang nilai, tapi juga tentang menemukan passion dan minat yang sesungguhnya...',
            category: 'Motivasi',
            readTime: '4 min',
            image: '🎯'
        },
        {
            id: 5,
            title: 'Persiapan Ujian Nasional yang Optimal',
            excerpt: 'Strategi persiapan menghadapi ujian nasional yang efektif dan efisien untuk mencapai hasil maksimal...',
            category: 'Persiapan Ujian',
            readTime: '8 min',
            image: '📝'
        }
    ];

    return (
        <SafeArea className="bg-gray-50 min-h-screen">
            {/* Top App Bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <GraduationCap size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">AJARIN</h1>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                            <BookOpen size={16} />
                            <span>10K Kursus</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Users size={16} />
                            <span>500 Guru</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Hero Section */}
                <div className="bg-linear-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
                    <div className="text-left">
                        <h1 className="text-2xl font-bold mb-1">{getTimeBasedGreeting()}, Andi</h1>
                        <p className="text-blue-100 text-lg mb-2">Mau belajar apa hari ini?</p>
                        <div className="flex items-center justify-start space-x-2 text-blue-100">
                            <BookOpen size={20} />
                            <span className="text-sm">Temukan materi terbaik untukmu</span>
                        </div>
                    </div>
                </div>

                {/* Today's Highlights */}
                <div className="bg-white rounded-xl p-4 shadow-md">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Sorotan Hari Ini</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center">
                            <TrendingUp size={24} className="text-blue-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">500+ Siswa</p>
                            <p className="text-xs text-gray-600">Belajar hari ini</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg text-center">
                            <Award size={24} className="text-green-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">25 Kursus</p>
                            <p className="text-xs text-gray-600">Baru ditambahkan</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Clock size={16} className="text-gray-400" />
                                <span className="text-sm text-gray-600">Update terakhir: 2 jam yang lalu</span>
                            </div>
                            {/* <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                                Lihat Semua
                            </button> */}
                        </div>
                    </div>
                </div>

                {/* Class Selection with Dropdown */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Pilih Kelas</h2>
                    
                    {/* Level Dropdown */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tingkat</label>
                        <div className="relative">
                            <select
                                value={selectedLevel}
                                onChange={(e) => setSelectedLevel(e.target.value)}
                                className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="SD">Sekolah Dasar (SD)</option>
                                <option value="SMP">Sekolah Menengah Pertama (SMP)</option>
                                <option value="SMA">Sekolah Menengah Atas (SMA)</option>
                            </select>
                            <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Class Buttons */}
                    <div className="grid grid-cols-3 gap-3">
                        {classesByLevel[selectedLevel].map((cls) => (
                            <Link 
                                to={`/kelas/${cls}`} 
                                key={cls} 
                                className="bg-blue-50 text-blue-700 p-4 rounded-lg font-medium text-center hover:bg-blue-100 transition-colors"
                            >
                                Kelas {cls}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Popular Topics Slider */}
                <div className="bg-white rounded-xl p-4 shadow-md">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Topik Populer</h2>
                    <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100 hover:scrollbar-thumb-blue-400">
                        {popularTopics.map((topic, index) => (
                            <div key={index} className="flex-shrink-0 w-64 bg-gray-50 p-3 rounded-lg">
                                <h3 className="font-medium text-gray-900 mb-1">{topic.name}</h3>
                                <p className="text-blue-600 text-sm mb-1">{topic.class} - {topic.subject}</p>
                                <p className="text-gray-600 text-sm">{topic.videos} video</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Articles Section */}
                <div className="bg-white rounded-xl p-4 shadow-md">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Artikel Informatif</h2>
                        <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center space-x-1">
                            <span>Lihat Semua</span>
                            <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100 hover:scrollbar-thumb-blue-400">
                        {articles.map((article) => (
                            <Link
                                key={article.id}
                                to={`/artikel/${article.id}`}
                                className="flex-shrink-0 w-72 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-start space-x-3 mb-3">
                                    <div className="text-2xl">{article.image}</div>
                                    <div className="flex-1">
                                        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mb-2">
                                            {article.category}
                                        </span>
                                        <h3 className="font-medium text-gray-900 text-sm leading-tight mb-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                                            {article.excerpt}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-1 text-gray-500">
                                        <Clock size={12} />
                                        <span className="text-xs">{article.readTime} baca</span>
                                    </div>
                                    <div className="text-blue-600">
                                        <ChevronRight size={16} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </SafeArea>
    )
}