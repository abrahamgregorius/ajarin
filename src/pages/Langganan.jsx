import SafeArea from "../components/SafeArea";

export default function Subscription() {
    const plans = [
        {
            name: 'Gratis',
            price: 'Rp 0',
            icon: (
                <svg className="w-12 h-12 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 5a3 3 0 015.952-.517L10 10h.548l.425-5.517A3 3 0 0116 5a3 3 0 11-6 0zM12.447 8l.725-4.517A1 1 0 0012.217 3H7.783a1 1 0 00-.955 1.483L7.553 8H12.447z" clipRule="evenodd" />
                </svg>
            ),
            features: ['10 kursus menarik', 'Video HD 720p', 'Diskusi ramah', 'Sertifikat digital'],
            popular: false,
            color: 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50',
            buttonColor: 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600'
        },
        {
            name: 'Premium',
            price: '99k/bulan',
            icon: (
                <svg className="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ),
            features: ['Semua kursus unlimited', 'Video 4K super jernih', 'Chat tanpa batas', 'Sertifikat premium', 'Kelas live spesial', 'Download materi offline'],
            popular: true,
            color: 'border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50 ring-4 ring-blue-200',
            buttonColor: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
        },
        // {
        //     name: 'Family',
        //     price: 'Rp 199.000/bulan',
        //     icon: (
        //         <svg className="w-12 h-12 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
        //             <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        //         </svg>
        //     ),
        //     features: ['Semua fitur Premium', '5 anggota keluarga bersama', 'Laporan nilai anak', 'Konsultasi guru pribadi', 'Hadiah bulanan', 'Mode anak-anak khusus'],
        //     popular: false,
        //     color: 'border-pink-300 bg-gradient-to-br from-pink-50 to-red-50',
        //     buttonColor: 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600'
        // }
    ];

    const currentPlan = 'Premium';

    return (
        <>
            <SafeArea className="p-3 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
                {/* Header dengan logo SVG */}
                <div className="header mb-6 text-center">
                    <div className="mb-4">
                        <svg className="w-16 h-16 text-blue-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                    </div>
                    <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
                        Langganan AJARIN
                    </h1>
                    <p className='text-gray-700 text-base font-medium'>
                        Tingkatkan pengalaman belajar dengan paket premium
                    </p>
                </div>

                {/* Paket Aktif - Lebih profesional */}
                <div className="current-plan mb-8 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-6 rounded-2xl text-white shadow-xl">
                    <div className="flex items-center justify-center mb-3">
                        <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h2 className="text-xl font-bold">Paket Aktif: {currentPlan}</h2>
                    </div>
                    <p className="mb-4 text-center text-base">Berlaku hingga 15 Januari 2026</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-base hover:bg-gray-100 transition-all shadow-lg">
                            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Perpanjang
                        </button>
                        <button className="border-2 border-white text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all font-bold text-base">
                            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Ubah Paket
                        </button>
                    </div>
                </div>

                {/* Grid Paket - Dengan SVG icons */}
                <div className="plans-grid mb-8">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Pilih Paket Belajar</h2>
                        <p className="text-gray-600">Temukan paket yang sesuai dengan kebutuhanmu</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {plans.map(plan => (
                            <div key={plan.name} className={`rounded-2xl shadow-xl p-6 border-4 relative transform hover:scale-105 transition-all duration-300 ${plan.color}`}>
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                        <svg className="w-6 h-6 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                )}
                                <div className="text-center mb-4">
                                    <h3 className="text-2xl font-bold text-gray-800 mt-5 mb-1">{plan.name}</h3>
                                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">{plan.price}</p>
                                </div>
                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-gray-700 font-medium">
                                            <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-4 rounded-xl font-bold text-base transition-all transform hover:scale-105 shadow-lg text-white ${plan.buttonColor} ${
                                    plan.name === currentPlan
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                }`}>
                                    {plan.name === currentPlan ? 'Paket Aktif' : 'Pilih Paket'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Achievement Section - Dengan SVG icons */}
                <div className="achievements mb-8 bg-gradient-to-r from-yellow-300 to-orange-400 p-6 rounded-2xl text-white shadow-xl">
                    <div className="text-center mb-4">
                        <svg className="w-12 h-12 text-white mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <h2 className="text-xl font-bold mb-2">Pencapaian Belajar</h2>
                        <p className="text-sm">Kamu sudah belajar dengan baik!</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-white/20 p-3 rounded-xl">
                            <svg className="w-6 h-6 text-white mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                            </svg>
                            <p className="font-bold text-sm">25 Kursus</p>
                            <p className="text-xs">Diselesaikan</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-xl">
                            <svg className="w-6 h-6 text-white mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <p className="font-bold text-sm">150 Poin</p>
                            <p className="text-xs">Didapatkan</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-xl">
                            <svg className="w-6 h-6 text-white mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                            </svg>
                            <p className="font-bold text-sm">95%</p>
                            <p className="text-xs">Akurasi</p>
                        </div>
                    </div>
                </div>

                {/* Riwayat Pembayaran - Dengan SVG icons */}
                <div className="billing-history mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <h2 className="text-xl font-bold text-gray-800">Riwayat Pembayaran</h2>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-4 border-b-2 border-gradient-to-r from-blue-200 to-purple-200">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <div>
                                        <p className="font-bold text-gray-800 text-base">Premium Monthly</p>
                                        <p className="text-gray-600 text-sm">15 Desember 2025</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600 text-lg">Rp 99.000</p>
                                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-bold">Berhasil</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <div>
                                        <p className="font-bold text-gray-800 text-base">Premium Monthly</p>
                                        <p className="text-gray-600 text-sm">15 November 2025</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600 text-lg">Rp 99.000</p>
                                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-bold">Berhasil</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section - Dengan SVG icons */}
                <div className="faq-section">
                    <div className="text-center mb-6">
                        <svg className="w-10 h-10 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Pertanyaan Umum</h2>
                        <p className="text-gray-600">Jawaban untuk pertanyaanmu</p>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-2xl shadow-lg border-2 border-blue-200">
                            <h3 className="font-bold text-gray-800 mb-2 text-base flex items-center">
                                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Apakah bisa cancel langganan kapan saja?
                            </h3>
                            <p className="text-gray-700 text-sm ml-7">Ya, kamu bisa cancel langganan kapan saja tanpa biaya tambahan.</p>
                        </div>
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-5 rounded-2xl shadow-lg border-2 border-green-200">
                            <h3 className="font-bold text-gray-800 mb-2 text-base flex items-center">
                                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Apakah ada diskon untuk pelajar?
                            </h3>
                            <p className="text-gray-700 text-sm ml-7">Ya, pelajar dapat diskon 50% dengan verifikasi kartu pelajar.</p>
                        </div>
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-2xl shadow-lg border-2 border-purple-200">
                            <h3 className="font-bold text-gray-800 mb-2 text-base flex items-center">
                                <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Bagaimana cara upgrade paket?
                            </h3>
                            <p className="text-gray-700 text-sm ml-7">Upgrade paket bisa dilakukan langsung di aplikasi tanpa biaya tambahan.</p>
                        </div>
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-5 rounded-2xl shadow-lg border-2 border-yellow-200">
                            <h3 className="font-bold text-gray-800 mb-2 text-base flex items-center">
                                <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                                Ada hadiah apa untuk member premium?
                            </h3>
                            <p className="text-gray-700 text-sm ml-7">Banyak hadiah seperti sertifikat premium, badge khusus, dan kesempatan ikut event eksklusif.</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8 text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-2xl text-white shadow-2xl">
                        <svg className="w-12 h-12 text-white mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h3 className="text-xl font-bold mb-2">Siap Upgrade Pengalaman Belajarmu?</h3>
                        <p className="mb-4 text-sm">Bergabunglah dengan ribuan teman yang sudah belajar dengan AJARIN</p>
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold text-base hover:bg-gray-100 transition-all shadow-lg">
                            Mulai Sekarang
                        </button>
                    </div>
                </div>
            </SafeArea>
        </>
    )
}