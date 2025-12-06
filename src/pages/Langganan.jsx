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
            <SafeArea className="p-3">
                <div className="header mb-4">
                    <h1 className='text-xl font-bold text-gray-800 mb-1'>Langganan AJARIN</h1>
                    <p className='text-gray-600 text-sm'>Tingkatkan pengalaman belajar Anda dengan paket premium</p>
                </div>

                <div className="current-plan mb-6 bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-xl text-white">
                    <h2 className="text-lg font-bold mb-1">Paket Aktif: {currentPlan}</h2>
                    <p className="mb-3 text-sm">Berlaku hingga 15 Januari 2026</p>
                    <div className="flex space-x-3">
                        <button className="bg-white text-blue-600 px-3 py-1.5 rounded-md font-medium text-sm hover:bg-gray-100 transition-colors">
                            Perpanjang
                        </button>
                        <button className="border border-white text-white px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors text-sm">
                            Ubah Paket
                        </button>
                    </div>
                </div>

                <div className="plans-grid mb-6">
                    <h2 className="text-lg font-semibold mb-3 text-gray-800">Pilih Paket Langganan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {plans.map(plan => (
                            <div key={plan.name} className={`bg-white rounded-lg shadow-md p-4 border-2 ${plan.color} relative`}>
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        Paling Populer
                                    </div>
                                )}
                                <h3 className="text-xl font-bold text-gray-800 mb-1">{plan.name}</h3>
                                <p className="text-2xl font-bold text-blue-600 mb-3">{plan.price}</p>
                                <ul className="space-y-1 mb-4">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-gray-700 text-sm">
                                            <span className="text-green-500 mr-2 text-sm">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-2 rounded-md font-medium text-sm transition-all ${
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

                <div className="billing-history mb-6">
                    <h2 className="text-lg font-semibold mb-3 text-gray-800">Riwayat Pembayaran</h2>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-3 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-800 text-sm">Premium Monthly</p>
                                    <p className="text-gray-600 text-xs">15 Desember 2025</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600 text-sm">Rp 99.000</p>
                                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">Berhasil</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-800 text-sm">Premium Monthly</p>
                                    <p className="text-gray-600 text-xs">15 November 2025</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600 text-sm">Rp 99.000</p>
                                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">Berhasil</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="faq-section">
                    <h2 className="text-lg font-semibold mb-3 text-gray-800">Pertanyaan Umum</h2>
                    <div className="space-y-3">
                        <div className="bg-white p-3 rounded-lg shadow-md">
                            <h3 className="font-semibold text-gray-800 mb-1 text-sm">Apakah bisa cancel langganan kapan saja?</h3>
                            <p className="text-gray-600 text-xs">Ya, Anda bisa cancel langganan kapan saja tanpa biaya tambahan.</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-md">
                            <h3 className="font-semibold text-gray-800 mb-1 text-sm">Apakah ada diskon untuk mahasiswa?</h3>
                            <p className="text-gray-600 text-xs">Ya, mahasiswa mendapatkan diskon 50% dengan verifikasi KTM.</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-md">
                            <h3 className="font-semibold text-gray-800 mb-1 text-sm">Bagaimana cara upgrade paket?</h3>
                            <p className="text-gray-600 text-xs">Upgrade paket bisa dilakukan langsung di aplikasi tanpa biaya tambahan.</p>
                        </div>
                    </div>
                </div>
            </SafeArea>
        </>
    )
}