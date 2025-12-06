import SafeArea from '../components/SafeArea';

export default function Home() {
    // Data untuk kelas
    const classes = Array.from({ length: 12 }, (_, i) => i + 1);

    // Variasi gradient untuk button kelas
    const buttonGradients = [
        'from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600',
        'from-green-400 to-green-500 hover:from-green-500 hover:to-green-600',
        'from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600',
        'from-red-400 to-red-500 hover:from-red-500 hover:to-red-600',
        'from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600',
        'from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600',
        'from-indigo-400 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600',
        'from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600',
        'from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600',
        'from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600',
        'from-violet-400 to-violet-500 hover:from-violet-500 hover:to-violet-600',
        'from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600',
    ];

    // Data untuk topik populer
    const popularTopics = [
        { name: 'Persamaan Linear', class: 'Kelas 7', subject: 'Matematika', videos: 5 },
        { name: 'Struktur Atom', class: 'Kelas 10', subject: 'IPA', videos: 8 },
        { name: 'Sejarah Perjuangan', class: 'Kelas 11', subject: 'IPS', videos: 6 },
        { name: 'Tenses Bahasa Inggris', class: 'Kelas 8', subject: 'Bahasa Inggris', videos: 4 },
        { name: 'Puisi Lama', class: 'Kelas 9', subject: 'Bahasa Indonesia', videos: 7 },
    ];

    // Asumsi user sudah pernah nonton (untuk MVP)
    const hasProgress = true;
    const currentTopic = { name: 'Aljabar Linear', progress: 65 };

    return (
        <>
            <SafeArea className="">
                <div className="header mb-4 bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                    <h1 className='font-bold text-2xl mb-1'>Belajar apa hari ini?</h1>
                    <p className='text-blue-100 text-sm'>Pilih kelas dan materi sesuai kurikulum</p>
                    <div className="mt-3 flex space-x-2 text-xs">
                        <div className="bg-blue-500/30 px-2 py-1 rounded-full">📚 10,000+ Kursus</div>
                        <div className="bg-green-500/30 px-2 py-1 rounded-full">👨‍🏫 500+ Guru</div>
                        <div className="bg-purple-500/30 px-2 py-1 rounded-full">🎓 1M+ Siswa</div>
                    </div>
                </div>

                <div className="px-3 py-2">
                    {hasProgress && (
                        <div className="quick-continue mb-6">
                            <h2 className="text-lg font-bold mb-3 text-gray-800">Lanjutkan Belajar</h2>
                            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                                <h3 className="font-bold text-sm text-gray-800 mb-2">{currentTopic.name}</h3>
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                                    <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{ width: `${currentTopic.progress}%` }}></div>
                                </div>
                                <p className="text-xs text-gray-600 mb-3">Progres: {currentTopic.progress}% selesai</p>
                                <button className="w-full bg-gradient-to-r cursor-pointer from-blue-400 to-blue-500 text-white py-2 rounded-md font-medium text-sm hover:from-blue-500 hover:to-blue-600 transition-all flex items-center justify-center space-x-2">
                                    <span>Lanjutkan</span>
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="select-class mb-6">
                        <h2 className="text-lg font-bold mb-3 text-gray-800">Pilih Kelas</h2>
                        <div className="grid grid-cols-3 gap-3">
                            {classes.map((cls, index) => (
                                <button key={cls} className={`bg-gradient-to-r cursor-pointer ${buttonGradients[index % buttonGradients.length]} text-white p-4 rounded-lg font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2`}>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                    </svg>
                                    <span>Kelas {cls}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="popular-topics">
                        <h2 className="text-lg font-bold mb-3 text-gray-800">Topik Populer</h2>
                        <div className="space-y-3">
                            {popularTopics.map((topic, index) => {
                                const cardColors = [
                                    'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
                                    'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
                                    'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200',
                                    'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200',
                                    'bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200',
                                ];
                                return (
                                    <div key={index} className={`${cardColors[index % cardColors.length]} p-3 rounded-lg shadow-md border hover:shadow-lg transition-shadow`}>
                                        <h3 className="font-bold text-sm text-gray-800">{topic.name}</h3>
                                        <p className="text-blue-600 font-medium text-xs">{topic.class} - {topic.subject}</p>
                                        <p className="text-gray-600 text-xs mt-1">{topic.videos} video tersedia</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </SafeArea>
        </>
    )
}