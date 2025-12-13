import SafeArea from "../../components/SafeArea";
import { GraduationCap, ArrowLeft, BookOpen, ChevronDown, ChevronRight, Play, MessageSquare, Heart, Star } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PanduanPenggunaan() {
    const navigate = useNavigate();
    const [openDropdowns, setOpenDropdowns] = useState({});

    const toggleDropdown = (index) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const guideSections = [
        {
            title: 'Menonton Video Pembelajaran',
            icon: Play,
            content: [
                {
                    subtitle: 'Cara Memilih Video',
                    details: 'Pilih kelas dan mata pelajaran yang sesuai dengan tingkat Anda. Setiap video memiliki deskripsi lengkap tentang materi yang akan dipelajari.'
                },
                {
                    subtitle: 'Memulai Pemutaran',
                    details: 'Klik tombol play pada video yang ingin Anda tonton. Video akan otomatis memulai pemutaran dan Anda akan mendapatkan koin setiap menitnya.'
                },
                {
                    subtitle: 'Mengatur Kualitas Video',
                    details: 'Gunakan pengatur kualitas video di bagian bawah player untuk menyesuaikan dengan koneksi internet Anda.'
                },
                {
                    subtitle: 'Menggunakan Fitur Fullscreen',
                    details: 'Klik ikon layar penuh untuk pengalaman menonton yang lebih immersive dan fokus.'
                }
            ]
        },
        {
            title: 'Mendapatkan Koin dan Streak',
            icon: Star,
            content: [
                {
                    subtitle: 'Sistem Koin',
                    details: 'Anda mendapatkan 10 koin untuk setiap menit menonton video. Koin dapat digunakan untuk membeli item di toko seperti nickname khusus.'
                },
                {
                    subtitle: 'Membangun Streak',
                    details: 'Selesaikan tugas harian setiap hari untuk membangun streak. Streak akan reset jika Anda melewatkan satu hari tanpa belajar.'
                },
                {
                    subtitle: 'Tugas Harian',
                    details: 'Lengkapi tugas harian dengan menonton minimal 1 video untuk mendapatkan reward dan menjaga streak Anda.'
                },
                {
                    subtitle: 'Melacak Progress',
                    details: 'Pantau progress belajar Anda melalui dashboard utama yang menampilkan streak dan koin terkini.'
                }
            ]
        },
        {
            title: 'Fitur Komentar dan Interaksi',
            icon: MessageSquare,
            content: [
                {
                    subtitle: 'Menambah Komentar',
                    details: 'Klik ikon komentar pada video untuk melihat diskusi dari siswa lainnya. Tambahkan komentar Anda untuk bertanya atau berbagi pemahaman.'
                },
                {
                    subtitle: 'Memberikan Rating',
                    details: 'Beri rating pada video setelah menonton untuk membantu siswa lain mengetahui kualitas konten.'
                },
                {
                    subtitle: 'Melaporkan Konten',
                    details: 'Gunakan tombol "Laporkan" jika menemukan komentar atau konten yang tidak sesuai untuk menjaga lingkungan belajar yang sehat.'
                },
                {
                    subtitle: 'Berinteraksi dengan Siswa Lain',
                    details: 'Diskusikan materi pelajaran dengan siswa dari sekolah atau daerah lain untuk memperluas wawasan.'
                }
            ]
        },
        {
            title: 'Menyimpan dan Mengelola Video',
            icon: Heart,
            content: [
                {
                    subtitle: 'Menandai Video Favorit',
                    details: 'Klik ikon hati pada video yang ingin Anda simpan untuk ditonton lagi di lain waktu.'
                },
                {
                    subtitle: 'Mengakses Video Tersimpan',
                    details: 'Kunjungi bagian "Favorit" di profil Anda untuk melihat semua video yang telah Anda simpan.'
                },
                {
                    subtitle: 'Mengorganisir Materi',
                    details: 'Gunakan fitur favorit untuk mengorganisir materi berdasarkan mata pelajaran atau topik tertentu.'
                },
                {
                    subtitle: 'Review Materi',
                    details: 'Kembali ke video favorit untuk review materi sebelum ujian atau tugas sekolah.'
                }
            ]
        }
    ];

    return (
        <SafeArea className="bg-gray-50 min-h-screen">
            {/* Top App Bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => navigate('/bantuan')} className="p-1 hover:bg-gray-100 rounded-lg">
                            <ArrowLeft size={24} className="text-gray-600" />
                        </button>
                        <BookOpen size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">Panduan Penggunaan</h1>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Header */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen size={32} className="text-blue-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Panduan Lengkap AJARIN</h2>
                        <p className="text-gray-600">
                            Pelajari cara menggunakan semua fitur AJARIN untuk pengalaman belajar yang maksimal.
                        </p>
                    </div>
                </div>

                {/* Guide Sections */}
                <div className="space-y-4">
                    {guideSections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="bg-white rounded-xl shadow-sm overflow-hidden">
                            {/* Section Header */}
                            <button
                                onClick={() => toggleDropdown(sectionIndex)}
                                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <section.icon size={20} className="text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                                </div>
                                {openDropdowns[sectionIndex] ? (
                                    <ChevronDown size={20} className="text-gray-400" />
                                ) : (
                                    <ChevronRight size={20} className="text-gray-400" />
                                )}
                            </button>

                            {/* Section Content */}
                            {openDropdowns[sectionIndex] && (
                                <div className="px-4 pb-4 border-t border-gray-100">
                                    <div className="space-y-4 pt-4">
                                        {section.content.map((item, itemIndex) => (
                                            <div key={itemIndex} className="bg-gray-50 rounded-lg p-4">
                                                <h4 className="font-semibold text-gray-900 mb-2">{item.subtitle}</h4>
                                                <p className="text-gray-600 text-sm leading-relaxed">{item.details}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Quick Tips */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips Cepat Belajar</h3>
                    <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-green-600 text-sm font-bold">1</span>
                            </div>
                            <p className="text-gray-700 text-sm">Tonton video secara bertahap, jangan buru-buru menyelesaikan semua materi dalam satu hari.</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-green-600 text-sm font-bold">2</span>
                            </div>
                            <p className="text-gray-700 text-sm">Aktifkan notifikasi untuk mengingatkan Anda tentang tugas harian dan streak.</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-green-600 text-sm font-bold">3</span>
                            </div>
                            <p className="text-gray-700 text-sm">Gunakan fitur komentar untuk bertanya jika ada materi yang belum jelas.</p>
                        </div>
                    </div>
                </div>

                {/* Need More Help */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Masih Butuh Bantuan?</h3>
                        <p className="text-gray-600 mb-4">
                            Jika Anda masih memiliki pertanyaan, kunjungi bagian FAQ atau hubungi tim dukungan kami.
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => navigate('/bantuan')}
                                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                            >
                                Kembali ke Bantuan
                            </button>
                            <button
                                onClick={() => navigate('/bantuan/kontak-dukungan')}
                                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                Hubungi Dukungan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </SafeArea>
    );
}