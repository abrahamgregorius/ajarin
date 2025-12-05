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
            <SafeArea className="p-4">
                <div className="hero-section mb-8 bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-2xl text-white text-center">
                    <h1 className="text-4xl font-bold mb-4">Tentang AJARIN</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Platform edukasi terdepan di Indonesia yang menghubungkan siswa dengan guru terbaik melalui teknologi modern
                    </p>
                </div>

                <div className="mission-section mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Misi Kami</h2>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <p className="text-gray-700 text-lg leading-relaxed text-center">
                            Memberikan akses pendidikan berkualitas tinggi kepada setiap siswa di Indonesia,
                            mempersiapkan generasi muda menghadapi tantangan masa depan dengan kurikulum
                            yang relevan dan metode pembelajaran inovatif.
                        </p>
                    </div>
                </div>

                <div className="stats-section mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">AJARIN dalam Angka</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl text-center border border-blue-100">
                                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                                <div className="text-gray-700 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="features-section mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Mengapa Memilih AJARIN?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <div className="text-3xl mb-4">🎓</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Kurikulum Terintegrasi</h3>
                            <p className="text-gray-600">Materi pembelajaran yang selaras dengan kurikulum nasional dan internasional</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <div className="text-3xl mb-4">👨‍🏫</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Guru Berkualitas</h3>
                            <p className="text-gray-600">Tim pengajar terdiri dari guru-guru berpengalaman dan ahli di bidangnya</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <div className="text-3xl mb-4">📱</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Akses Dimana Saja</h3>
                            <p className="text-gray-600">Belajar fleksibel melalui aplikasi mobile dan website kapan saja</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <div className="text-3xl mb-4">📊</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Progress Tracking</h3>
                            <p className="text-gray-600">Pantau perkembangan belajar dengan laporan yang detail dan akurat</p>
                        </div>
                    </div>
                </div>

                <div className="team-section mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tim Kami</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {team.map((member, index) => (
                            <div key={index} className="bg-white p-4 rounded-xl shadow-lg text-center">
                                <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-3" />
                                <h3 className="font-bold text-gray-800">{member.name}</h3>
                                <p className="text-blue-600 text-sm">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="contact-cta bg-gradient-to-r from-green-500 to-teal-600 p-8 rounded-2xl text-white text-center">
                    <h2 className="text-2xl font-bold mb-4">Punya Pertanyaan?</h2>
                    <p className="text-green-100 mb-6">Hubungi kami untuk informasi lebih lanjut tentang AJARIN</p>
                    <button className="bg-white text-green-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                        Hubungi Kami
                    </button>
                </div>
            </SafeArea>
        </>
    )
}