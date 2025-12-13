import SafeArea from "../components/SafeArea";
import { GraduationCap, ArrowLeft, HelpCircle, MessageCircle, BookOpen, Award, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Bantuan() {
    const navigate = useNavigate();

    const helpCategories = [
        {
            title: 'Panduan Penggunaan',
            icon: BookOpen,
            description: 'Pelajari cara menggunakan AJARIN dengan maksimal',
            items: [
                'Cara menonton video pembelajaran',
                'Cara mendapatkan koin dan streak',
                'Cara menggunakan fitur komentar',
                'Cara menyimpan video favorit'
            ]
        },
        {
            title: 'Sistem Koin & Streak',
            icon: Award,
            description: 'Pelajari sistem reward dan pencapaian',
            items: [
                'Cara mendapatkan koin (10 koin per menit menonton)',
                'Cara membangun streak harian',
                'Cara menggunakan koin untuk belanja',
                'Reward dan achievement yang bisa didapat'
            ]
        },
        {
            title: 'Bantuan Teknis',
            icon: HelpCircle,
            description: 'Solusi untuk masalah teknis yang sering terjadi',
            items: [
                'Video tidak bisa dimuat',
                'Masalah login dan autentikasi',
                'Aplikasi lambat atau error',
                'Masalah kompatibilitas perangkat'
            ]
        },
        {
            title: 'Kontak & Dukungan',
            icon: MessageCircle,
            description: 'Hubungi tim AJARIN untuk bantuan lebih lanjut',
            items: [
                'Kirim pesan ke developer',
                'Laporkan bug atau error',
                'Sarankan fitur baru',
                'Bantuan konten pembelajaran'
            ]
        }
    ];

    const faqItems = [
        {
            question: 'Bagaimana cara mendapatkan koin?',
            answer: 'Anda mendapatkan 10 koin untuk setiap menit menonton video pembelajaran. Koin juga bisa didapat dari menyelesaikan tugas harian.'
        },
        {
            question: 'Apa itu streak dan bagaimana cara mendapatkannya?',
            answer: 'Streak adalah rangkaian hari berturut-turut Anda belajar. Anda mendapat streak dengan menyelesaikan tugas harian setiap hari.'
        },
        {
            question: 'Bagaimana cara mengubah nama atau foto profil?',
            answer: 'Pergi ke menu Profil > Edit Profil untuk mengubah informasi pribadi Anda seperti nama, sekolah, dan foto profil.'
        },
        {
            question: 'Video apa saja yang tersedia di AJARIN?',
            answer: 'AJARIN menyediakan video pembelajaran untuk semua jenjang SD, SMP, dan SMA dengan berbagai mata pelajaran.'
        },
        {
            question: 'Bagaimana cara melaporkan video yang bermasalah?',
            answer: 'Gunakan tombol "Laporkan" yang ada di halaman video untuk melaporkan konten yang bermasalah.'
        }
    ];

    return (
        <SafeArea className="bg-gray-50 min-h-screen">
            {/* Top App Bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-lg">
                            <ArrowLeft size={24} className="text-gray-600" />
                        </button>
                        <GraduationCap size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">Bantuan</h1>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Welcome Message */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <HelpCircle size={32} className="text-blue-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Butuh Bantuan?</h2>
                        <p className="text-gray-600">
                            Temukan jawaban untuk pertanyaan Anda atau hubungi tim AJARIN untuk bantuan lebih lanjut.
                        </p>
                    </div>
                </div>

                {/* Help Categories */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Kategori Bantuan</h3>
                    {helpCategories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                // Navigate to specific category page
                                const categoryRoutes = {
                                    'Panduan Penggunaan': '/bantuan/panduan-penggunaan',
                                    'Sistem Koin & Streak': '/bantuan/sistem-koin-streak',
                                    'Bantuan Teknis': '/bantuan/bantuan-teknis',
                                    'Kontak & Dukungan': '/bantuan/kontak-dukungan'
                                };
                                navigate(categoryRoutes[category.title]);
                            }}
                            className="w-full bg-white rounded-xl p-4 shadow-sm hover:bg-gray-50 transition-colors text-left"
                        >
                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <category.icon size={20} className="text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-1">{category.title}</h4>
                                    <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                                    <div className="space-y-1">
                                        {category.items.slice(0, 2).map((item, itemIndex) => (
                                            <div key={itemIndex} className="text-sm text-gray-700 flex items-center">
                                                <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                                                {item}
                                            </div>
                                        ))}
                                        {category.items.length > 2 && (
                                            <div className="text-sm text-blue-600 font-medium">
                                                +{category.items.length - 2} topik lainnya...
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-gray-400 flex-shrink-0" />
                            </div>
                        </button>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Pertanyaan Umum (FAQ)</h3>
                    <div className="space-y-3">
                        {faqItems.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Support */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                    <div className="text-center">
                        <MessageCircle size={32} className="mx-auto mb-3" />
                        <h3 className="text-lg font-bold mb-2">Butuh Bantuan Lebih Lanjut?</h3>
                        <p className="text-blue-100 mb-4">
                            Tim AJARIN siap membantu Anda dengan pertanyaan atau masalah yang Anda hadapi.
                        </p>
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                            Hubungi Dukungan
                        </button>
                    </div>
                </div>

                {/* App Info */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-center">
                        <GraduationCap size={24} className="text-blue-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-900 mb-1">AJARIN v1.0.0</h4>
                        <p className="text-gray-600 text-sm">
                            Aplikasi pembelajaran interaktif untuk siswa Indonesia
                        </p>
                        <p className="text-gray-500 text-xs mt-2">
                            © 2025 AJARIN. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </SafeArea>
    );
}