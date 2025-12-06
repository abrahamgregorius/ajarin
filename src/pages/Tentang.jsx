import SafeArea from '../components/SafeArea';

export default function About() {
    const stats = [
        { number: '1M+', label: 'Siswa Terdaftar' },
        { number: '10,000+', label: 'Kursus Tersedia' },
        { number: '500+', label: 'Guru Profesional' },
        { number: '95%', label: 'Tingkat Kepuasan' }
    ];

    const team = [
        { name: 'Dr. Ahmad Santoso', role: 'CEO & Founder', image: 'https://via.placeholder.com/100/4ECDC4/FFFFFF?text=AS' },
        { name: 'Prof. Siti Nurhaliza', role: 'Head of Education', image: 'https://via.placeholder.com/100/45B7D1/FFFFFF?text=SN' },
        { name: 'Budi Prasetyo', role: 'Tech Lead', image: 'https://via.placeholder.com/100/F9CA24/FFFFFF?text=BP' },
        { name: 'Maya Sari', role: 'Content Director', image: 'https://via.placeholder.com/100/E84393/FFFFFF?text=MS' }
    ];

    return (
        <>
            <SafeArea className="p-3">
                <div className="hero-section mb-6 bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-xl text-white text-center">
                    <h1 className="text-2xl font-bold mb-2">Tentang AJARIN</h1>
                    <p className="text-base text-blue-100 max-w-2xl mx-auto">
                        Platform edukasi terdepan di Indonesia yang menghubungkan siswa dengan guru terbaik melalui teknologi modern
                    </p>
                </div>

                <div className="mission-section mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-3 text-center">Misi Kami</h2>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-gray-700 text-sm leading-relaxed text-center">
                            Memberikan akses pendidikan berkualitas tinggi kepada setiap siswa di Indonesia,
                            mempersiapkan generasi muda menghadapi tantangan masa depan dengan kurikulum
                            yang relevan dan metode pembelajaran inovatif.
                        </p>
                    </div>
                </div>

                <div className="stats-section mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-3 text-center">AJARIN dalam Angka</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg text-center border border-blue-100">
                                <div className="text-2xl font-bold text-blue-600 mb-1">{stat.number}</div>
                                <div className="text-gray-700 font-medium text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="features-section mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-3 text-center">Mengapa Memilih AJARIN?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <div className="text-2xl mb-2">🎓</div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">Kurikulum Terintegrasi</h3>
                            <p className="text-gray-600 text-sm">Materi pembelajaran yang selaras dengan kurikulum nasional dan internasional</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <div className="text-2xl mb-2">👨‍🏫</div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">Guru Berkualitas</h3>
                            <p className="text-gray-600 text-sm">Tim pengajar terdiri dari guru-guru berpengalaman dan ahli di bidangnya</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <div className="text-2xl mb-2">📱</div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">Akses Dimana Saja</h3>
                            <p className="text-gray-600 text-sm">Belajar fleksibel melalui aplikasi mobile dan website kapan saja</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <div className="text-2xl mb-2">📊</div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">Progress Tracking</h3>
                            <p className="text-gray-600 text-sm">Pantau perkembangan belajar dengan laporan yang detail dan akurat</p>
                        </div>
                    </div>
                </div>

                <div className="team-section mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-3 text-center">Tim Kami</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {team.map((member, index) => (
                            <div key={index} className="bg-white p-3 rounded-lg shadow-md text-center">
                                <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full mx-auto mb-2" />
                                <h3 className="font-bold text-gray-800 text-sm">{member.name}</h3>
                                <p className="text-blue-600 text-xs">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="contact-cta bg-gradient-to-r from-green-500 to-teal-600 p-4 rounded-xl text-white text-center">
                    <h2 className="text-lg font-bold mb-2">Punya Pertanyaan?</h2>
                    <p className="text-green-100 text-sm mb-4">Hubungi kami untuk informasi lebih lanjut tentang AJARIN</p>
                    <button className="bg-white text-green-600 px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors">
                        Hubungi Kami
                    </button>
                </div>
            </SafeArea>
        </>
    )
}