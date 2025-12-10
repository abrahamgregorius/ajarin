import StreakCoinDisplay from '../../components/StreakCoinDisplay';
import { GraduationCap, ArrowLeft, Clock, Share2, Bookmark, Heart } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SafeArea from '../../components/SafeArea';

export default function ArticleDetail() {
    const { articleId } = useParams();

    // User progress state
    const [streak, setStreak] = useState(7);
    const [coins, setCoins] = useState(1250);
    const [hasCompletedToday, setHasCompletedToday] = useState(true);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    // Data untuk artikel informatif
    const articles = [
        {
            id: 1,
            title: 'Tips Belajar Matematika yang Efektif',
            excerpt: 'Pelajari cara belajar matematika yang menyenangkan dan efektif untuk meningkatkan pemahaman konsep...',
            category: 'Tips Belajar',
            readTime: '5 min',
            image: '📚',
            author: 'Tim AJARIN',
            publishDate: '15 Desember 2024',
            content: `
                <h2>Matematika sering dianggap sebagai pelajaran yang sulit dan menakutkan. Namun, dengan pendekatan yang tepat, matematika bisa menjadi pelajaran yang menarik dan menyenangkan.</h2>

                <h3>1. Pahami Konsep Dasar Terlebih Dahulu</h3>
                <p>Sebelum mempelajari rumus-rumus kompleks, pastikan Anda memahami konsep dasar dengan baik. Matematika adalah bangunan yang bertingkat, di mana setiap konsep saling terkait.</p>

                <h3>2. Praktikkan dengan Soal Berkala</h3>
                <p>Latihan adalah kunci utama. Mulailah dengan soal-soal sederhana dan tingkatkan kesulitannya secara bertahap. Jangan takut salah, karena kesalahan adalah bagian dari proses belajar.</p>

                <h3>3. Gunakan Visualisasi</h3>
                <p>Buatlah diagram, grafik, atau gambar untuk membantu memahami konsep abstrak. Visualisasi dapat membuat matematika lebih mudah dipahami dan diingat.</p>

                <h3>4. Belajar dalam Kelompok</h3>
                <p>Diskusikan soal matematika dengan teman-teman. Seringkali, penjelasan dari sudut pandang orang lain dapat memberikan wawasan baru.</p>

                <h3>5. Jangan Malu Bertanya</h3>
                <p>Jika ada konsep yang belum jelas, segera tanyakan kepada guru atau teman yang lebih paham. Belajar matematika adalah proses yang berkelanjutan.</p>

                <p>Dengan menerapkan tips-tips di atas secara konsisten, Anda akan melihat peningkatan yang signifikan dalam pemahaman matematika. Ingatlah bahwa matematika adalah bahasa alam semesta, dan setiap orang bisa mempelajarinya dengan tekun dan kesabaran.</p>
            `
        },
        {
            id: 2,
            title: 'Pentingnya Literasi Digital di Era Modern',
            excerpt: 'Dalam era digital saat ini, literasi digital menjadi keterampilan penting yang harus dikuasai oleh setiap siswa...',
            category: 'Teknologi',
            readTime: '7 min',
            image: '💻',
            author: 'Tim AJARIN',
            publishDate: '12 Desember 2024',
            content: `
                <h2>Literasi digital adalah kemampuan untuk menggunakan, memahami, dan berinteraksi dengan teknologi digital secara bijak. Di era modern ini, literasi digital bukan lagi pilihan, melainkan keharusan.</h2>

                <h3>Mengapa Literasi Digital Penting?</h3>
                <p>Dalam kehidupan sehari-hari, kita tidak bisa lepas dari teknologi digital. Mulai dari komunikasi, belajar, hingga bekerja, semuanya memerlukan kemampuan literasi digital yang baik.</p>

                <h3>Keterampilan Dasar Literasi Digital</h3>
                <ul>
                    <li><strong>Pemahaman Teknologi:</strong> Mengetahui cara kerja berbagai perangkat dan aplikasi digital</li>
                    <li><strong>Keamanan Online:</strong> Melindungi diri dari ancaman cyber dan menjaga privasi</li>
                    <li><strong>Evaluasi Informasi:</strong> Mampu membedakan informasi yang benar dan hoax</li>
                    <li><strong>Kolaborasi Digital:</strong> Bekerja sama menggunakan tools online</li>
                </ul>

                <h3>Dampak Positif Literasi Digital</h3>
                <p>Dengan literasi digital yang baik, siswa dapat:</p>
                <ul>
                    <li>Mengakses sumber belajar yang lebih luas</li>
                    <li>Mengembangkan kreativitas melalui berbagai platform digital</li>
                    <li>Mempersiapkan diri untuk dunia kerja masa depan</li>
                    <li>Menjadi warga digital yang bertanggung jawab</li>
                </ul>

                <p>Marilah kita bersama-sama membangun generasi yang melek digital dan siap menghadapi tantangan era modern.</p>
            `
        },
        {
            id: 3,
            title: 'Cara Mengatasi Kesulitan Belajar IPA',
            excerpt: 'IPA sering dianggap sulit, namun dengan metode yang tepat, pelajaran ini bisa menjadi menarik dan mudah dipahami...',
            category: 'Tips Belajar',
            readTime: '6 min',
            image: '🔬',
            author: 'Tim AJARIN',
            publishDate: '10 Desember 2024',
            content: `
                <h2>Ilmu Pengetahuan Alam (IPA) merupakan salah satu mata pelajaran yang sering menimbulkan kesulitan bagi siswa. Namun, dengan strategi belajar yang tepat, IPA bisa menjadi pelajaran yang menarik.</h2>

                <h3>Memahami Konsep Dasar</h3>
                <p>IPA terdiri dari berbagai cabang ilmu seperti Fisika, Kimia, dan Biologi. Mulailah dengan memahami konsep-konsep dasar sebelum masuk ke materi yang lebih kompleks.</p>

                <h3>Metode Belajar yang Efektif</h3>
                <ul>
                    <li><strong>Eksperimen Sederhana:</strong> Lakukan percobaan sederhana di rumah untuk memahami konsep</li>
                    <li><strong>Visualisasi:</strong> Gunakan gambar, video, dan animasi untuk membantu pemahaman</li>
                    <li><strong>Mind Mapping:</strong> Buat peta konsep untuk menghubungkan berbagai topik</li>
                    <li><strong>Diskusi Kelompok:</strong> Bertukar pikiran dengan teman untuk mendapatkan sudut pandang berbeda</li>
                </ul>

                <h3>Mengatasi Kesulitan Umum</h3>
                <p>Beberapa kesulitan yang sering dialami siswa dalam belajar IPA:</p>
                <ul>
                    <li><strong>Rumus Fisika:</strong> Hafalkan dengan memahami konsep, bukan hanya menghapal</li>
                    <li><strong>Reaksi Kimia:</strong> Pelajari pola dan prinsip dasar reaksi</li>
                    <li><strong>Sistim Biologi:</strong> Gunakan analogi dengan kehidupan sehari-hari</li>
                </ul>

                <p>Dengan pendekatan yang tepat dan konsistensi dalam belajar, IPA akan menjadi pelajaran yang menarik dan bermanfaat bagi masa depan Anda.</p>
            `
        },
        {
            id: 4,
            title: 'Motivasi Belajar: Temukan Passion Anda',
            excerpt: 'Belajar bukan hanya tentang nilai, tapi juga tentang menemukan passion dan minat yang sesungguhnya...',
            category: 'Motivasi',
            readTime: '4 min',
            image: '🎯',
            author: 'Tim AJARIN',
            publishDate: '8 Desember 2024',
            content: `
                <h2>Motivasi belajar adalah kunci utama untuk mencapai kesuksesan dalam pendidikan. Tanpa motivasi yang kuat, sulit bagi siswa untuk tetap fokus dan konsisten dalam belajar.</h2>

                <h3>Apa Itu Passion?</h3>
                <p>Passion adalah minat yang mendalam terhadap suatu bidang. Ketika Anda memiliki passion, belajar bukan lagi beban, melainkan kesenangan.</p>

                <h3>Cara Menemukan Passion Anda</h3>
                <ul>
                    <li><strong>Eksplorasi:</strong> Cobalah berbagai kegiatan dan lihat yang paling Anda nikmati</li>
                    <li><strong>Refleksi:</strong> Pikirkan tentang apa yang membuat Anda bahagia dan bersemangat</li>
                    <li><strong>Pengalaman:</strong> Ikuti kegiatan ekstrakurikuler yang beragam</li>
                    <li><strong>Diskusi:</strong> Bicarakan dengan orang tua, guru, dan teman tentang minat Anda</li>
                </ul>

                <h3>Menjaga Motivasi Belajar</h3>
                <p>Setelah menemukan passion, penting untuk menjaganya:</p>
                <ul>
                    <li>Tetapkan tujuan yang realistis</li>
                    <li>Rayakan setiap pencapaian</li>
                    <li>Cari dukungan dari orang terdekat</li>
                    <li>Jangan bandingkan diri dengan orang lain</li>
                </ul>

                <p>Ingatlah bahwa setiap orang memiliki kecepatan belajar yang berbeda. Yang penting adalah konsistensi dan ketekunan dalam mengejar passion Anda.</p>
            `
        },
        {
            id: 5,
            title: 'Persiapan Ujian Nasional yang Optimal',
            excerpt: 'Strategi persiapan menghadapi ujian nasional yang efektif dan efisien untuk mencapai hasil maksimal...',
            category: 'Persiapan Ujian',
            readTime: '8 min',
            image: '📝',
            author: 'Tim AJARIN',
            publishDate: '5 Desember 2024',
            content: `
                <h2>Ujian Nasional merupakan salah satu momen penting dalam perjalanan pendidikan siswa. Persiapan yang matang dan strategi yang tepat sangat diperlukan untuk menghadapi ujian ini.</h2>

                <h3>Perencanaan yang Matang</h3>
                <p>Buatlah jadwal belajar yang realistis dan dapat diikuti. Bagikan waktu untuk setiap mata pelajaran sesuai dengan tingkat kesulitan dan bobot nilai.</p>

                <h3>Teknik Belajar Efektif</h3>
                <ul>
                    <li><strong>Pemahaman Konsep:</strong> Fokus pada pemahaman mendalam, bukan menghapal</li>
                    <li><strong>Latihan Soal:</strong> Kerjakan soal-soal dari tahun-tahun sebelumnya</li>
                    <li><strong>Simulasi Ujian:</strong> Lakukan try out secara berkala</li>
                    <li><strong>Review Rutin:</strong> Tinjau kembali materi yang sudah dipelajari</li>
                </ul>

                <h3>Kesehatan Fisik dan Mental</h3>
                <p>Persiapan fisik dan mental sama pentingnya:</p>
                <ul>
                    <li>Istirahat yang cukup (7-8 jam per malam)</li>
                    <li>Olahraga teratur untuk menjaga kebugaran</li>
                    <li>Makan makanan bergizi</li>
                    <li>Kelola stres dengan teknik relaksasi</li>
                </ul>

                <h3>Tips di Hari H Ujian</h3>
                <ul>
                    <li>Periksa kelengkapan alat tulis dan dokumen</li>
                    <li>Tiba di lokasi ujian lebih awal</li>
                    <li>Jaga ketenangan dan fokus</li>
                    <li>Berdoa dan berusaha maksimal</li>
                </ul>

                <p>Dengan persiapan yang optimal, Anda akan lebih siap menghadapi Ujian Nasional dan meraih hasil yang terbaik.</p>
            `
        }
    ];

    const article = articles.find(a => a.id === parseInt(articleId));

    if (!article) {
        return (
            <SafeArea className="bg-gray-50 min-h-screen">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">📄</span>
                        </div>
                        <p className="text-gray-600 font-medium">Artikel tidak ditemukan</p>
                        <p className="text-gray-500 text-sm mt-2">Artikel sedang diproses</p>
                        <Link to="/articles" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Kembali ke Artikel
                        </Link>
                    </div>
                </div>
            </SafeArea>
        );
    }

    return (
        <SafeArea className="bg-gray-50 min-h-screen">
            {/* Top App Bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Link to="/articles" className="p-2 -m-2 text-gray-600 hover:text-gray-800">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center space-x-2">
                            <GraduationCap className="w-6 h-6 text-blue-600" />
                            <span className="text-lg font-semibold text-gray-900">Artikel</span>
                        </div>
                    </div>
                    <StreakCoinDisplay streak={streak} coins={coins} />
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Article Header */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="text-4xl">{article.image}</div>
                        <div className="flex-1">
                            <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mb-2">
                                {article.category}
                            </span>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                                {article.title}
                            </h1>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>{article.author}</span>
                                <div className="flex items-center space-x-1">
                                    <Clock size={14} />
                                    <span>{article.readTime} baca</span>
                                </div>
                                <span>{article.publishDate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div
                        className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </div>

                {/* Article Actions */}
                <div className="bg-white rounded-xl p-4 shadow-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                    isLiked
                                        ? 'bg-red-100 text-red-600'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <Heart size={20} className={isLiked ? 'fill-current' : ''} />
                                <span>Suka</span>
                            </button>
                            <button
                                onClick={() => setIsBookmarked(!isBookmarked)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                    isBookmarked
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <Bookmark size={20} className={isBookmarked ? 'fill-current' : ''} />
                                <span>Simpan</span>
                            </button>
                        </div>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                            <Share2 size={20} />
                            <span>Bagikan</span>
                        </button>
                    </div>
                </div>

                {/* Related Articles */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Artikel Terkait</h3>
                    <div className="space-y-3">
                        {articles
                            .filter(a => a.id !== article.id && a.category === article.category)
                            .slice(0, 3)
                            .map(relatedArticle => (
                                <Link
                                    key={relatedArticle.id}
                                    to={`/articles/${relatedArticle.id}`}
                                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className="text-2xl flex-shrink-0">{relatedArticle.image}</div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 text-sm leading-tight mb-1">
                                                {relatedArticle.title}
                                            </h4>
                                            <div className="flex items-center space-x-2 text-gray-500 text-xs">
                                                <Clock size={12} />
                                                <span>{relatedArticle.readTime} baca</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </SafeArea>
    );
}
