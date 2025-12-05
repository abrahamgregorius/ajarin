import SafeArea from "../components/SafeArea";

export default function Subscription() {
    const plans = [
        {
            name: 'Basic',
            price: 'Gratis',
            features: ['Akses 10 kursus gratis', 'Video resolusi 720p', 'Diskusi terbatas', 'Sertifikat digital'],
            popular: false,
            color: 'border-gray-200'
        },
        {
            name: 'Premium',
            price: 'Rp 99.000/bulan',
            features: ['Akses semua kursus', 'Video resolusi 1080p', 'Diskusi unlimited', 'Sertifikat premium', 'Kelas live eksklusif', 'Download materi'],
            popular: true,
            color: 'border-blue-500 ring-2 ring-blue-200'
        },
        {
            name: 'Family',
            price: 'Rp 199.000/bulan',
            features: ['Semua fitur Premium', 'Akses untuk 5 anggota keluarga', 'Laporan progress anak', 'Konsultasi guru pribadi'],
            popular: false,
            color: 'border-purple-200'
        }
    ];

    const currentPlan = 'Premium';

    return (
        <>
            <SafeArea className="p-4">
                <div className="header mb-6">
                    <h1 className='text-2xl font-bold text-gray-800 mb-2'>Langganan AJARIN</h1>
                    <p className='text-gray-600'>Tingkatkan pengalaman belajar Anda dengan paket premium</p>
                </div>

                <div className="current-plan mb-8 bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-2xl text-white">
                    <h2 className="text-xl font-bold mb-2">Paket Aktif: {currentPlan}</h2>
                    <p className="mb-4">Berlaku hingga 15 Januari 2026</p>
                    <div className="flex space-x-4">
                        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Perpanjang
                        </button>
                        <button className="border border-white text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                            Ubah Paket
                        </button>
                    </div>
                </div>

                <div className="plans-grid mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Pilih Paket Langganan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {plans.map(plan => (
                            <div key={plan.name} className={`bg-white rounded-xl shadow-lg p-6 border-2 ${plan.color} relative`}>
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                        Paling Populer
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                                <p className="text-3xl font-bold text-blue-600 mb-4">{plan.price}</p>
                                <ul className="space-y-2 mb-6">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-gray-700">
                                            <span className="text-green-500 mr-2">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
                                    plan.name === currentPlan
                                        ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                                }`}>
                                    {plan.name === currentPlan ? 'Paket Aktif' : 'Pilih Paket'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="billing-history mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Riwayat Pembayaran</h2>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-800">Premium Monthly</p>
                                    <p className="text-gray-600 text-sm">15 Desember 2025</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600">Rp 99.000</p>
                                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">Berhasil</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-800">Premium Monthly</p>
                                    <p className="text-gray-600 text-sm">15 November 2025</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600">Rp 99.000</p>
                                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">Berhasil</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="faq-section">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Pertanyaan Umum</h2>
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="font-semibold text-gray-800 mb-2">Apakah bisa cancel langganan kapan saja?</h3>
                            <p className="text-gray-600">Ya, Anda bisa cancel langganan kapan saja tanpa biaya tambahan.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="font-semibold text-gray-800 mb-2">Apakah ada diskon untuk mahasiswa?</h3>
                            <p className="text-gray-600">Ya, mahasiswa mendapatkan diskon 50% dengan verifikasi KTM.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="font-semibold text-gray-800 mb-2">Bagaimana cara upgrade paket?</h3>
                            <p className="text-gray-600">Upgrade paket bisa dilakukan langsung di aplikasi tanpa biaya tambahan.</p>
                        </div>
                    </div>
                </div>
            </SafeArea>
        </>
    )
}