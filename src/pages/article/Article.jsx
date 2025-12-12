import StreakCoinDisplay from '../../components/StreakCoinDisplay';
import { GraduationCap, Search, Clock, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SafeArea from '../../components/SafeArea';
import { useUserProgress } from '../../hooks/useUserProgress';

export default function Article() {
    // User progress state
        const { streak, coins, hasCompletedToday, studyHours, userRank } = useUserProgress();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    // Data untuk artikel informatif
    const articles = [
        {
            id: 1,
            title: 'Tips Belajar Matematika yang Efektif',
            excerpt: 'Pelajari cara belajar matematika yang menyenangkan dan efektif untuk meningkatkan pemahaman konsep...',
            category: 'Tips Belajar',
            readTime: '5 min',
            image: '📚',
            content: 'Matematika sering dianggap sebagai pelajaran yang sulit dan menakutkan. Namun, dengan pendekatan yang tepat, matematika bisa menjadi pelajaran yang menarik dan menyenangkan. Berikut adalah beberapa tips efektif untuk belajar matematika...'
        },
        {
            id: 2,
            title: 'Pentingnya Literasi Digital di Era Modern',
            excerpt: 'Dalam era digital saat ini, literasi digital menjadi keterampilan penting yang harus dikuasai oleh setiap siswa...',
            category: 'Teknologi',
            readTime: '7 min',
            image: '💻',
            content: 'Literasi digital adalah kemampuan untuk menggunakan, memahami, dan berinteraksi dengan teknologi digital secara bijak. Di era modern ini, literasi digital bukan lagi pilihan, melainkan keharusan...'
        },
        {
            id: 3,
            title: 'Cara Mengatasi Kesulitan Belajar IPA',
            excerpt: 'IPA sering dianggap sulit, namun dengan metode yang tepat, pelajaran ini bisa menjadi menarik dan mudah dipahami...',
            category: 'Tips Belajar',
            readTime: '6 min',
            image: '🔬',
            content: 'Ilmu Pengetahuan Alam (IPA) merupakan salah satu mata pelajaran yang sering menimbulkan kesulitan bagi siswa. Namun, dengan strategi belajar yang tepat, IPA bisa menjadi pelajaran yang menarik...'
        },
        {
            id: 4,
            title: 'Motivasi Belajar: Temukan Passion Anda',
            excerpt: 'Belajar bukan hanya tentang nilai, tapi juga tentang menemukan passion dan minat yang sesungguhnya...',
            category: 'Motivasi',
            readTime: '4 min',
            image: '🎯',
            content: 'Motivasi belajar adalah kunci utama untuk mencapai kesuksesan dalam pendidikan. Tanpa motivasi yang kuat, sulit bagi siswa untuk tetap fokus dan konsisten dalam belajar...'
        },
        {
            id: 5,
            title: 'Persiapan Ujian Nasional yang Optimal',
            excerpt: 'Strategi persiapan menghadapi ujian nasional yang efektif dan efisien untuk mencapai hasil maksimal...',
            category: 'Persiapan Ujian',
            readTime: '8 min',
            image: '📝',
            content: 'Ujian Nasional merupakan salah satu momen penting dalam perjalanan pendidikan siswa. Persiapan yang matang dan strategi yang tepat sangat diperlukan untuk menghadapi ujian ini...'
        },
        {
            id: 6,
            title: 'Teknik Membaca Cepat dan Efektif',
            excerpt: 'Pelajari teknik membaca cepat yang dapat meningkatkan pemahaman dan efisiensi belajar Anda...',
            category: 'Tips Belajar',
            readTime: '6 min',
            image: '📖',
            content: 'Membaca adalah keterampilan dasar yang sangat penting dalam proses belajar. Dengan teknik membaca yang tepat, Anda dapat meningkatkan kecepatan dan pemahaman bacaan...'
        },
        {
            id: 7,
            title: 'Manfaat Belajar Bahasa Asing di Usia Muda',
            excerpt: 'Belajar bahasa asing sejak dini memberikan banyak manfaat bagi perkembangan otak dan karier masa depan...',
            category: 'Bahasa',
            readTime: '5 min',
            image: '🌍',
            content: 'Belajar bahasa asing di usia muda memiliki banyak manfaat yang akan berdampak positif bagi perkembangan anak. Selain meningkatkan kemampuan kognitif, belajar bahasa asing juga membuka peluang karier yang lebih luas...'
        },
        {
            id: 8,
            title: 'Cara Mengelola Waktu Belajar yang Baik',
            excerpt: 'Teknik manajemen waktu yang efektif untuk siswa agar dapat belajar dengan lebih produktif dan efisien...',
            category: 'Tips Belajar',
            readTime: '7 min',
            image: '⏰',
            content: 'Mengelola waktu belajar dengan baik adalah keterampilan penting yang harus dimiliki oleh setiap siswa. Dengan manajemen waktu yang tepat, siswa dapat belajar lebih efektif dan mencapai hasil yang maksimal...'
        }
    ];

    const categories = ['Semua', 'Tips Belajar', 'Motivasi', 'Teknologi', 'Persiapan Ujian', 'Bahasa'];

    // Filter articles based on search and category
    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'Semua' || article.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <SafeArea className="bg-gray-50 min-h-screen">
            {/* Top App Bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Link to="/" className="p-2 -m-2 text-gray-600 hover:text-gray-800">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center space-x-2">
                            <GraduationCap className="w-6 h-6 text-blue-600" />
                            <span className="text-lg font-semibold text-gray-900">Artikel</span>
                        </div>
                    </div>
                    <StreakCoinDisplay streak={streak} coins={coins} hasCompletedToday={hasCompletedToday} />
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Header */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Artikel Informatif</h1>
                    <p className="text-gray-600">Temukan tips belajar, motivasi, dan informasi berguna untuk mendukung perjalanan belajar Anda</p>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari artikel..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Category Filter */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Kategori</h2>
                    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${selectedCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Articles List */}
                <div className="space-y-4">
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map((article) => (
                            <Link
                                key={article.id}
                                to={`/articles/${article.id}`}
                                className="block bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="text-3xl flex-shrink-0">{article.image}</div>
                                    <div className="flex-1">
                                        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mb-2">
                                            {article.category}
                                        </span>
                                        <h3 className="font-semibold text-gray-900 text-lg mb-2 leading-tight">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                                            {article.excerpt}
                                        </p>
                                        <div className="flex items-center space-x-2 text-gray-500">
                                            <Clock size={14} />
                                            <span className="text-sm">{article.readTime} baca</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search size={32} className="text-gray-400" />
                            </div>
                            <p className="text-gray-600 font-medium">Tidak ada artikel ditemukan</p>
                            <p className="text-gray-500 text-sm mt-2">Coba ubah kata kunci pencarian atau kategori</p>
                        </div>
                    )}
                </div>
            </div>
        </SafeArea>
    );
}
