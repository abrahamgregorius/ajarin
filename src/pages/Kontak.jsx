import SafeArea from '../components/SafeArea';
import { GraduationCap, Mail, Phone, MapPin, Clock, Send, MessageCircle, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Contact() {
    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            details: 'support@ajarin.id',
            description: 'Kirim email untuk pertanyaan umum'
        },
        {
            icon: Phone,
            title: 'WhatsApp',
            details: '+62 812-3456-7890',
            description: 'Chat langsung dengan tim support'
        },
        {
            icon: MapPin,
            title: 'Alamat',
            details: 'Jl. Pendidikan No. 123, Jakarta Pusat',
            description: 'Kunjungi kantor kami'
        },
        {
            icon: Clock,
            title: 'Jam Kerja',
            details: 'Senin - Jumat: 08:00 - 17:00 WIB',
            description: 'Waktu operasional support'
        }
    ];

    const faqs = [
        {
            question: 'Bagaimana cara mendaftar di AJARIN?',
            answer: 'Kunjungi halaman registrasi dan isi formulir pendaftaran dengan data yang valid. Verifikasi email Anda dan mulai belajar!'
        },
        {
            question: 'Apakah AJARIN gratis?',
            answer: 'Ya, AJARIN menyediakan kursus gratis dan premium. Kursus gratis sudah mencakup materi berkualitas tinggi.'
        },
        {
            question: 'Bagaimana cara mengakses materi premium?',
            answer: 'Upgrade ke paket premium melalui halaman Subscription. Dapatkan akses penuh ke semua materi dan fitur eksklusif.'
        },
        {
            question: 'Apakah bisa belajar offline?',
            answer: 'Beberapa materi dapat didownload untuk akses offline. Fitur ini tersedia untuk pengguna premium.'
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
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Header */}
                <div className="bg-white rounded-lg p-6 shadow-md text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle size={32} className="text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Hubungi Kami</h1>
                    <p className="text-gray-600">Kami siap membantu Anda dengan pertanyaan tentang AJARIN</p>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Kontak</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {contactInfo.map((info, index) => {
                            const IconComponent = info.icon;
                            return (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <IconComponent size={20} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">{info.title}</h3>
                                            <p className="text-blue-600 font-medium">{info.details}</p>
                                            <p className="text-gray-600 text-sm mt-1">{info.description}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Contact Form */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Kirim Pesan</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Nama lengkap"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="nama@email.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subjek</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Subjek pesan"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
                                <textarea
                                    rows="4"
                                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Tulis pesan Anda di sini..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                            >
                                <Send size={20} />
                                <span>Kirim Pesan</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* FAQ */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Pertanyaan Umum</h2>
                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Ikuti Kami</h2>
                    <p className="text-gray-600 text-sm mb-4">Dapatkan update terbaru dan tips belajar di media sosial</p>
                    <div className="flex justify-center space-x-4">
                        <a href="#" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                            <Facebook size={20} />
                        </a>
                        <a href="#" className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white hover:bg-blue-800 transition-colors">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </SafeArea>
    )
}