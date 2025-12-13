import { GraduationCap, ArrowLeft, HelpCircle, ChevronDown, ChevronRight, Monitor, Wifi, Smartphone, AlertTriangle, RefreshCw, Shield } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SafeArea from '../../components/SafeArea';

export default function BantuanTeknis() {
    const navigate = useNavigate();
    const [openDropdowns, setOpenDropdowns] = useState({});

    const toggleDropdown = (index) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const technicalSections = [
        {
            title: 'Masalah Video Tidak Bisa Dimuat',
            icon: Monitor,
            content: [
                {
                    subtitle: 'Periksa Koneksi Internet',
                    details: 'Pastikan koneksi internet Anda stabil dan cukup cepat. Coba refresh halaman atau restart aplikasi.'
                },
                {
                    subtitle: 'Bersihkan Cache Browser',
                    details: 'Hapus cache dan cookie browser Anda. Untuk aplikasi mobile, coba restart aplikasi atau reinstall jika perlu.'
                },
                {
                    subtitle: 'Coba Browser Lain',
                    details: 'Jika menggunakan browser, coba gunakan browser berbeda seperti Chrome, Firefox, atau Safari.'
                },
                {
                    subtitle: 'Periksa Firewall/Antivirus',
                    details: 'Nonaktifkan sementara firewall atau antivirus yang mungkin memblokir pemutaran video.'
                }
            ]
        },
        {
            title: 'Masalah Login dan Autentikasi',
            icon: Shield,
            content: [
                {
                    subtitle: 'Lupa Password',
                    details: 'Gunakan fitur "Lupa Password" di halaman login untuk mereset password Anda melalui email.'
                },
                {
                    subtitle: 'Akun Tidak Ditemukan',
                    details: 'Pastikan email yang Anda gunakan sudah terdaftar. Jika belum, lakukan pendaftaran akun baru.'
                },
                {
                    subtitle: 'Masalah Verifikasi Email',
                    details: 'Periksa folder spam/junk email Anda. Jika belum menerima email verifikasi, hubungi dukungan.'
                },
                {
                    subtitle: 'Sesi Login Berakhir',
                    details: 'Login ulang ke aplikasi. Ini adalah fitur keamanan normal untuk melindungi akun Anda.'
                }
            ]
        },
        {
            title: 'Aplikasi Lambat atau Error',
            icon: RefreshCw,
            content: [
                {
                    subtitle: 'Restart Aplikasi',
                    details: 'Tutup aplikasi sepenuhnya dan buka kembali. Untuk browser, refresh halaman dengan Ctrl+F5.'
                },
                {
                    subtitle: 'Periksa Update Aplikasi',
                    details: 'Pastikan aplikasi Anda menggunakan versi terbaru. Update melalui Play Store atau App Store.'
                },
                {
                    subtitle: 'Bersihkan Data Aplikasi',
                    details: 'Hapus cache aplikasi atau reinstall aplikasi untuk mengatasi masalah performa.'
                },
                {
                    subtitle: 'Periksa Kompatibilitas Perangkat',
                    details: 'AJARIN mendukung Android 8.0+ dan iOS 12.0+. Pastikan perangkat Anda memenuhi spesifikasi minimum.'
                }
            ]
        },
        {
            title: 'Masalah Kompatibilitas Perangkat',
            icon: Smartphone,
            content: [
                {
                    subtitle: 'Sistem Operasi Tidak Didukung',
                    details: 'Update sistem operasi perangkat Anda ke versi terbaru yang kompatibel dengan AJARIN.'
                },
                {
                    subtitle: 'Ruang Penyimpanan Penuh',
                    details: 'Hapus file yang tidak perlu atau pindahkan ke penyimpanan eksternal untuk membebaskan ruang.'
                },
                {
                    subtitle: 'Masalah RAM/Teknologi',
                    details: 'Tutup aplikasi lain yang berjalan di background untuk mengoptimalkan performa AJARIN.'
                },
                {
                    subtitle: 'Masalah Browser Mobile',
                    details: 'Gunakan browser terbaru atau aplikasi mobile AJARIN untuk pengalaman terbaik.'
                }
            ]
        }
    ];

    const troubleshootingSteps = [
        {
            step: 1,
            title: 'Identifikasi Masalah',
            description: 'Tentukan gejala yang Anda alami dengan jelas.',
            icon: ''
        },
        {
            step: 2,
            title: 'Coba Solusi Dasar',
            description: 'Restart aplikasi, periksa koneksi internet, dan bersihkan cache.',
            icon: ''
        },
        {
            step: 3,
            title: 'Periksa Kompatibilitas',
            description: 'Pastikan perangkat dan sistem operasi Anda didukung.',
            icon: ''
        },
        {
            step: 4,
            title: 'Hubungi Dukungan',
            description: 'Jika masalah berlanjut, laporkan ke tim dukungan dengan detail lengkap.',
            icon: ''
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
                        <HelpCircle size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">Bantuan Teknis</h1>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Header */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <HelpCircle size={32} className="text-red-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Pusat Bantuan Teknis</h2>
                        <p className="text-gray-600">
                            Temukan solusi untuk masalah teknis yang sering terjadi di AJARIN.
                        </p>
                    </div>
                </div>

                {/* System Requirements */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📱 Persyaratan Sistem</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Android</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Android 8.0 atau lebih tinggi</li>
                                <li>• RAM minimal 2GB</li>
                                <li>• Penyimpanan 100MB</li>
                                <li>• Koneksi internet stabil</li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">iOS</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• iOS 12.0 atau lebih tinggi</li>
                                <li>• iPhone 6s atau lebih baru</li>
                                <li>• Penyimpanan 100MB</li>
                                <li>• Koneksi internet stabil</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Technical Issues Sections */}
                <div className="space-y-4">
                    {technicalSections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="bg-white rounded-xl shadow-sm overflow-hidden">
                            {/* Section Header */}
                            <button
                                onClick={() => toggleDropdown(sectionIndex)}
                                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                        <section.icon size={20} className="text-red-600" />
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
                                            <div key={itemIndex} className="bg-red-50 rounded-lg p-4 border border-red-200">
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

                {/* Troubleshooting Steps */}
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Panduan Troubleshooting</h3>
                    <div className="space-y-4">
                        {troubleshootingSteps.map((step, index) => (
                            <div key={index} className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 font-bold text-sm">{step.step}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                        {/* <span className="text-lg">{step.icon}</span> */}
                                        <h4 className="font-semibold text-gray-900">{step.title}</h4>
                                    </div>
                                    <p className="text-gray-600 text-sm">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Common Issues */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Masalah Umum & Solusi Cepat</h3>
                    <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <AlertTriangle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-gray-900 text-sm">Video Loading Lambat</h4>
                                <p className="text-gray-600 text-sm">Periksa kecepatan internet atau ganti ke kualitas video yang lebih rendah.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <Wifi size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-gray-900 text-sm">Koneksi Internet Bermasalah</h4>
                                <p className="text-gray-600 text-sm">Coba restart router atau gunakan koneksi data seluler sebagai alternatif.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <Smartphone size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-gray-900 text-sm">Aplikasi Crash</h4>
                                <p className="text-gray-600 text-sm">Update aplikasi ke versi terbaru atau reinstall jika crash berulang.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Support */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                    <div className="text-center">
                        <HelpCircle size={32} className="mx-auto mb-3" />
                        <h3 className="text-lg font-bold mb-2">Masih Mengalami Masalah?</h3>
                        <p className="text-blue-100 mb-4">
                            Jika solusi di atas tidak menyelesaikan masalah Anda, tim dukungan AJARIN siap membantu.
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => navigate('/bantuan')}
                                className="flex-1 bg-white/20 text-white py-3 rounded-lg font-medium hover:bg-white/30 transition-colors border border-white/30"
                            >
                                Kembali ke Bantuan
                            </button>
                            <button
                                onClick={() => navigate('/bantuan/kontak-dukungan')}
                                className="flex-1 bg-white text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
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