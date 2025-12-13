import { GraduationCap, ArrowLeft, MessageCircle, ChevronDown, ChevronRight, Mail, MessageSquare, Bug, Lightbulb, Clock, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SafeArea from '../../components/SafeArea';

export default function KontakDukungan() {
    const navigate = useNavigate();
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [contactForm, setContactFDorm] = useState({
        name: '',
        email: '',
        category: '',
        subject: '',
        message: ''
    });

    const toggleDropdown = (index) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleFormChange = (field, value) => {
        setContactForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        alert('Pesan Anda telah dikirim! Tim dukungan akan merespons dalam 24 jam.');
        setContactForm({
            name: '',
            email: '',
            category: '',
            subject: '',
            message: ''
        });
    };

    const contactSections = [
        {
            title: 'Kirim Pesan ke Developer',
            icon: MessageSquare,
            content: [
                {
                    subtitle: 'Formulir Kontak',
                    details: 'Gunakan formulir di bawah ini untuk mengirim pesan langsung ke tim developer AJARIN.'
                },
                {
                    subtitle: 'Waktu Response',
                    details: 'Tim kami akan merespons pesan Anda dalam 24-48 jam kerja. Untuk masalah urgent, gunakan email langsung.'
                },
                {
                    subtitle: 'Informasi yang Dibutuhkan',
                    details: 'Sertakan detail lengkap tentang masalah Anda, termasuk langkah-langkah untuk mereproduksi error.'
                },
                {
                    subtitle: 'Bahasa Komunikasi',
                    details: 'Kami menerima pesan dalam Bahasa Indonesia dan English untuk memudahkan komunikasi.'
                }
            ]
        },
        {
            title: 'Laporkan Bug atau Error',
            icon: Bug,
            content: [
                {
                    subtitle: 'Identifikasi Masalah',
                    details: 'Jelaskan bug yang Anda temui dengan detail, termasuk langkah-langkah untuk mereproduksi masalah.'
                },
                {
                    subtitle: 'Sertakan Screenshot',
                    details: 'Lampirkan screenshot error atau perilaku yang tidak normal untuk membantu diagnosis.'
                },
                {
                    subtitle: 'Informasi Perangkat',
                    details: 'Sebutkan jenis perangkat, sistem operasi, dan versi aplikasi yang Anda gunakan.'
                },
                {
                    subtitle: 'Prioritas Bug',
                    details: 'Bug kritis akan ditangani lebih cepat. Kami akan memberi tahu Anda tentang progress perbaikan.'
                }
            ]
        },
        {
            title: 'Sarankan Fitur Baru',
            icon: Lightbulb,
            content: [
                {
                    subtitle: 'Deskripsikan Ide Anda',
                    details: 'Jelaskan fitur yang ingin Anda usulkan dengan detail dan manfaatnya bagi pengguna lain.'
                },
                {
                    subtitle: 'Berikan Contoh',
                    details: 'Sertakan contoh penggunaan atau mockup sederhana untuk membantu kami memahami visi Anda.'
                },
                {
                    subtitle: 'Bandingkan dengan Aplikasi Lain',
                    details: 'Jika memungkinkan, sebutkan aplikasi serupa yang memiliki fitur yang Anda inginkan.'
                },
                {
                    subtitle: 'Feedback akan Ditinjau',
                    details: 'Semua saran akan ditinjau oleh tim product. Fitur terpilih akan diimplementasikan dalam update mendatang.'
                }
            ]
        },
        {
            title: 'Bantuan Konten Pembelajaran',
            icon: GraduationCap,
            content: [
                {
                    subtitle: 'Koreksi Konten',
                    details: 'Laporkan kesalahan materi, rumus yang salah, atau informasi yang tidak akurat.'
                },
                {
                    subtitle: 'Permintaan Materi Baru',
                    details: 'Sarankan topik atau mata pelajaran yang belum tersedia di AJARIN.'
                },
                {
                    subtitle: 'Kualitas Video',
                    details: 'Berikan feedback tentang kualitas audio, video, atau penjelasan dalam video pembelajaran.'
                },
                {
                    subtitle: 'Aksesibilitas Konten',
                    details: 'Sarankan perbaikan untuk membuat konten lebih mudah diakses oleh semua pengguna.'
                }
            ]
        }
    ];

    const contactMethods = [
        {
            method: 'Email',
            icon: Mail,
            contact: 'support@ajarin.id',
            description: 'Untuk pertanyaan umum dan dukungan teknis',
            availability: '24/7'
        },
        {
            method: 'Live Chat',
            icon: MessageSquare,
            contact: 'Tersedia di aplikasi',
            description: 'Chat langsung dengan tim dukungan',
            availability: 'Senin-Jumat, 08:00-17:00 WIB'
        },
        {
            method: 'Forum Komunitas',
            icon: GraduationCap,
            contact: 'forum.ajarin.id',
            description: 'Diskusi dengan sesama pengguna',
            availability: '24/7'
        }
    ];

    const categories = [
        'Dukungan Teknis',
        'Bug Report',
        'Fitur Baru',
        'Konten Pembelajaran',
        'Akun & Profil',
        'Lainnya'
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
                        <MessageCircle size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">Kontak & Dukungan</h1>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Header */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle size={32} className="text-green-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Hubungi Tim AJARIN</h2>
                        <p className="text-gray-600">
                            Kami siap membantu Anda dengan berbagai cara. Pilih metode yang paling sesuai untuk kebutuhan Anda.
                        </p>
                    </div>
                </div>

                {/* Contact Methods */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📞 Cara Menghubungi Kami</h3>
                    <div className="space-y-4">
                        {contactMethods.map((method, index) => (
                            <div key={index} className="bg-white rounded-lg p-4 flex items-center space-x-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <method.icon size={24} className="text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900">{method.method}</h4>
                                    <p className="text-green-600 font-medium">{method.contact}</p>
                                    <p className="text-gray-600 text-sm">{method.description}</p>
                                    <div className="flex items-center space-x-1 mt-1">
                                        <Clock size={12} className="text-gray-400" />
                                        <span className="text-xs text-gray-500">{method.availability}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 Kirim Pesan Langsung</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Lengkap *
                                </label>
                                <input
                                    type="text"
                                    value={contactForm.name}
                                    onChange={(e) => handleFormChange('name', e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Masukkan nama Anda"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    value={contactForm.email}
                                    onChange={(e) => handleFormChange('email', e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="email@contoh.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kategori *
                            </label>
                            <select
                                value={contactForm.category}
                                onChange={(e) => handleFormChange('category', e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Pilih kategori</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subjek *
                            </label>
                            <input
                                type="text"
                                value={contactForm.subject}
                                onChange={(e) => handleFormChange('subject', e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Jelaskan singkat masalah Anda"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Pesan *
                            </label>
                            <textarea
                                value={contactForm.message}
                                onChange={(e) => handleFormChange('message', e.target.value)}
                                required
                                rows={5}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                placeholder="Jelaskan detail masalah atau pertanyaan Anda..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                        >
                            <Send size={16} />
                            <span>Kirim Pesan</span>
                        </button>
                    </form>
                </div>

                {/* Detailed Contact Sections */}
                <div className="space-y-4">
                    {contactSections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="bg-white rounded-xl shadow-sm overflow-hidden">
                            {/* Section Header */}
                            <button
                                onClick={() => toggleDropdown(sectionIndex)}
                                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <section.icon size={20} className="text-green-600" />
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
                                            <div key={itemIndex} className="bg-green-50 rounded-lg p-4 border border-green-200">
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

                {/* Response Time Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">⏰ Waktu Response</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <span className="text-gray-900 font-medium">Email Support</span>
                            <span className="text-blue-600 font-semibold">24-48 jam</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <span className="text-gray-900 font-medium">Live Chat</span>
                            <span className="text-green-600 font-semibold">5-30 menit</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <span className="text-gray-900 font-medium">Bug Reports</span>
                            <span className="text-orange-600 font-semibold">1-3 hari</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <span className="text-gray-900 font-medium">Feature Requests</span>
                            <span className="text-purple-600 font-semibold">1-2 minggu</span>
                        </div>
                    </div>
                </div>

                {/* Back to Help */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Butuh Bantuan Lain?</h3>
                        <p className="text-gray-600 mb-4">
                            Kembali ke halaman bantuan utama untuk melihat kategori bantuan lainnya.
                        </p>
                        <button
                            onClick={() => navigate('/bantuan')}
                            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                        >
                            Kembali ke Bantuan
                        </button>
                    </div>
                </div>
            </div>
        </SafeArea>
    );
}