import SafeArea from '../components/SafeArea';

export default function Contact() {
    const contactInfo = [
        {
            icon: '📧',
            title: 'Email',
            details: 'support@ajarin.id',
            description: 'Kirim email untuk pertanyaan umum'
        },
        {
            icon: '📱',
            title: 'WhatsApp',
            details: '+62 812-3456-7890',
            description: 'Chat langsung dengan tim support'
        },
        {
            icon: '📍',
            title: 'Alamat',
            details: 'Jl. Pendidikan No. 123, Jakarta Pusat',
            description: 'Kunjungi kantor kami'
        },
        {
            icon: '🕒',
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
        <>
            <SafeArea className="p-3">
                <div className="hero-section mb-6 bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200/50 shadow-sm">
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-2xl text-white">💬</span>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Hubungi Kami</h1>
                            <p className="text-base text-gray-600 max-w-md leading-relaxed">
                                Kami siap membantu Anda dengan pertanyaan tentang AJARIN
                            </p>
                        </div>
                    </div>
                </div>

                <div className="contact-info mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-3 text-center">Informasi Kontak</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                                <div className="flex items-start space-x-3">
                                    <div className="text-2xl">{info.icon}</div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-sm">{info.title}</h3>
                                        <p className="text-blue-600 font-semibold text-sm">{info.details}</p>
                                        <p className="text-gray-600 text-xs mt-1">{info.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="contact-form mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-3 text-center">Kirim Pesan</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="Nama lengkap"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="nama@email.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="Subjek pesan"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                                <textarea
                                    rows="4"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="Tulis pesan Anda di sini..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-3 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                            >
                                Kirim Pesan
                            </button>
                        </form>
                    </div>
                </div>

                <div className="faq-section mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-3 text-center">Pertanyaan Umum</h2>
                    <div className="space-y-3 max-w-4xl mx-auto">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-bold text-gray-800 text-sm mb-2">{faq.question}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="social-media bg-gradient-to-r from-purple-500 to-pink-600 p-4 rounded-xl text-white text-center">
                    <h2 className="text-lg font-bold mb-2">Ikuti Kami</h2>
                    <p className="text-purple-100 text-sm mb-4">Dapatkan update terbaru dan tips belajar di media sosial</p>
                    <div className="flex justify-center space-x-4">
                        <a href="#" className="text-2xl hover:scale-110 transition-transform">📘</a>
                        <a href="#" className="text-2xl hover:scale-110 transition-transform">📷</a>
                        <a href="#" className="text-2xl hover:scale-110 transition-transform">🐦</a>
                        <a href="#" className="text-2xl hover:scale-110 transition-transform">💼</a>
                    </div>
                </div>
            </SafeArea>
        </>
    )
}