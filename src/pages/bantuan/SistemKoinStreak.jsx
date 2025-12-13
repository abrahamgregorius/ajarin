import SafeArea from "../../components/SafeArea";
import { GraduationCap, ArrowLeft, Award, ChevronDown, ChevronRight, Coins, Flame, ShoppingBag, Trophy, Target } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SistemKoinStreak() {
    const navigate = useNavigate();
    const [openDropdowns, setOpenDropdowns] = useState({});

    const toggleDropdown = (index) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const coinSections = [
        {
            title: 'Cara Mendapatkan Koin',
            icon: Coins,
            content: [
                {
                    subtitle: 'Menonton Video Pembelajaran',
                    details: 'Dapatkan 10 koin untuk setiap menit menonton video. Misalnya, menonton video selama 30 menit akan memberikan 300 koin.'
                },
                {
                    subtitle: 'Menyelesaikan Tugas Harian',
                    details: 'Selesaikan tugas harian untuk mendapatkan bonus koin tambahan. Pastikan untuk menonton minimal 1 video setiap hari.'
                },
                {
                    subtitle: 'Berpartisipasi Aktif',
                    details: 'Dapatkan koin bonus dengan memberikan komentar bermutu atau membantu siswa lain dalam diskusi.'
                },
                {
                    subtitle: 'Pencapaian Khusus',
                    details: 'Raih milestone tertentu seperti menyelesaikan 100 video atau mempertahankan streak 30 hari untuk mendapatkan koin bonus.'
                }
            ]
        },
        {
            title: 'Sistem Streak Harian',
            icon: Flame,
            content: [
                {
                    subtitle: 'Apa Itu Streak?',
                    details: 'Streak adalah rangkaian hari berturut-turut Anda belajar di AJARIN. Setiap hari yang Anda lewati tanpa belajar akan mereset streak Anda.'
                },
                {
                    subtitle: 'Cara Mempertahankan Streak',
                    details: 'Selesaikan tugas harian setiap hari dengan menonton minimal 1 video pembelajaran untuk menjaga streak Anda tetap hidup.'
                },
                {
                    subtitle: 'Manfaat Streak',
                    details: 'Streak yang panjang akan memberikan Anda badge kehormatan dan meningkatkan motivasi belajar Anda.'
                },
                {
                    subtitle: 'Melacak Progress Streak',
                    details: 'Pantau streak Anda melalui dashboard utama dan profil. Jangan biarkan streak Anda terputus!'
                }
            ]
        },
        {
            title: 'Menggunakan Koin di Toko',
            icon: ShoppingBag,
            content: [
                {
                    subtitle: 'Mengakses Toko Item',
                    details: 'Kunjungi halaman "Shop" untuk melihat berbagai item yang bisa dibeli dengan koin, seperti nickname khusus dan badge.'
                },
                {
                    subtitle: 'Memilih Item',
                    details: 'Pilih item yang Anda inginkan dan pastikan Anda memiliki cukup koin untuk membelinya.'
                },
                {
                    subtitle: 'Proses Pembelian',
                    details: 'Klik "Beli" dan konfirmasi pembelian. Item akan langsung aktif di profil Anda setelah pembelian berhasil.'
                },
                {
                    subtitle: 'Mengelola Item',
                    details: 'Kelola item yang telah dibeli melalui halaman profil. Beberapa item dapat diubah atau diganti kapan saja.'
                }
            ]
        },
        {
            title: 'Reward dan Achievement',
            icon: Trophy,
            content: [
                {
                    subtitle: 'Badge Pencapaian',
                    details: 'Dapatkan badge spesial untuk milestone seperti "Pelajar Aktif", "Master Streak", atau "Video Enthusiast".'
                },
                {
                    subtitle: 'Leaderboard',
                    details: 'Bersaing dengan siswa lain di leaderboard berdasarkan total jam belajar dan streak terpanjang.'
                },
                {
                    subtitle: 'Bonus Khusus',
                    details: 'Dapatkan bonus koin atau item eksklusif untuk pencapaian luar biasa seperti streak 100 hari.'
                },
                {
                    subtitle: 'Sertifikat Digital',
                    details: 'Dapatkan sertifikat digital sebagai bukti pencapaian Anda dalam perjalanan belajar di AJARIN.'
                }
            ]
        }
    ];

    const streakTips = [
        {
            icon: '🔥',
            title: 'Jaga Konsistensi',
            description: 'Belajar setiap hari meski hanya 10-15 menit untuk menjaga streak tetap hidup.'
        },
        {
            icon: '⏰',
            title: 'Atur Jadwal',
            description: 'Tentukan waktu belajar harian yang konsisten untuk membangun kebiasaan yang baik.'
        },
        {
            icon: '📅',
            title: 'Ingatkan Diri',
            description: 'Gunakan pengingat harian atau alarm untuk tidak melewatkan sesi belajar.'
        },
        {
            icon: '🎯',
            title: 'Tetapkan Target',
            description: 'Buat target harian yang realistis dan rayakan setiap pencapaian streak baru.'
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
                        <Award size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">Sistem Koin & Streak</h1>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Header */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Award size={32} className="text-yellow-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Sistem Reward AJARIN</h2>
                        <p className="text-gray-600">
                            Pelajari cara mendapatkan dan menggunakan koin serta membangun streak belajar Anda.
                        </p>
                    </div>
                </div>

                {/* Current Status */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Status Anda Saat Ini</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4 text-center">
                            <Coins size={24} className="text-yellow-600 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Total Koin</p>
                            <p className="text-xl font-bold text-yellow-600">1,250</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 text-center">
                            <Flame size={24} className="text-orange-600 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Streak Hari Ini</p>
                            <p className="text-xl font-bold text-orange-600">7</p>
                        </div>
                    </div>
                </div>

                {/* Coin & Streak Sections */}
                <div className="space-y-4">
                    {coinSections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="bg-white rounded-xl shadow-sm overflow-hidden">
                            {/* Section Header */}
                            <button
                                onClick={() => toggleDropdown(sectionIndex)}
                                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                        <section.icon size={20} className="text-yellow-600" />
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
                                            <div key={itemIndex} className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                                                <h4 className="font-semibold text-gray-900 mb-2">{item.subtitle}</h4>
                                                <p className="text-gray-700 text-sm leading-relaxed">{item.details}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Streak Maintenance Tips */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🔥 Tips Mempertahankan Streak</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {streakTips.map((tip, index) => (
                            <div key={index} className="bg-white rounded-lg p-4 flex items-start space-x-3">
                                <span className="text-2xl">{tip.icon}</span>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                                    <p className="text-gray-600 text-sm">{tip.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Achievement Preview */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🏆 Achievement yang Bisa Diraih</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 text-center">
                            <Trophy size={24} className="text-blue-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">Pelajar Aktif</p>
                            <p className="text-xs text-gray-600">Streak 30 hari</p>
                        </div>
                        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3 text-center">
                            <Target size={24} className="text-green-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">Master Video</p>
                            <p className="text-xs text-gray-600">100 video selesai</p>
                        </div>
                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3 text-center">
                            <Award size={24} className="text-purple-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">Koin Master</p>
                            <p className="text-xs text-gray-600">10,000 koin terkumpul</p>
                        </div>
                        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 text-center">
                            <Flame size={24} className="text-yellow-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">Streak Legend</p>
                            <p className="text-xs text-gray-600">Streak 100 hari</p>
                        </div>
                    </div>
                </div>

                {/* Need More Help */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Ada Pertanyaan Lain?</h3>
                        <p className="text-gray-600 mb-4">
                            Jika Anda masih memiliki pertanyaan tentang sistem reward, kunjungi FAQ atau hubungi dukungan.
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