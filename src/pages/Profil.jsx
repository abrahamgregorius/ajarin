import SafeArea from "../components/SafeArea";

export default function Profile() {
    const user = {
        name: 'Ahmad Rahman',
        email: 'ahmad.rahman@email.com',
        grade: 'Kelas 11 SMA',
        school: 'SMA Negeri 1 Jakarta',
        avatar: 'https://via.placeholder.com/120/4ECDC4/FFFFFF?text=AR',
        joinDate: 'Januari 2024',
        completedCourses: 24,
        totalHours: 156,
        currentStreak: 7,
        level: 12,
        experiencePoints: 2840,
        nextLevelXP: 3000,
        coins: 1250
    };

    const achievements = [
        { title: 'Pelajar Super', description: 'Belajar 30 hari berturut-turut', icon: '🔥', unlocked: true, rarity: 'legendary' },
        { title: 'Master Matematika', description: 'Selesai 10 kursus matematika', icon: '🧮', unlocked: true, rarity: 'epic' },
        { title: 'Penjelajah IPA', description: 'Jelajahi semua subjek IPA', icon: '🔬', unlocked: false, rarity: 'rare' },
        { title: 'Bahasa Expert', description: 'Capai level expert bahasa Indonesia', icon: '📚', unlocked: true, rarity: 'epic' },
        { title: 'Juara Quiz', description: 'Menang 50 quiz online', icon: '🏆', unlocked: false, rarity: 'legendary' },
        { title: 'Kolektor Badge', description: 'Kumpulkan 20 badge pencapaian', icon: '🎖️', unlocked: true, rarity: 'rare' },
    ];

    const recentCourses = [
        { title: 'Fisika Mekanika', progress: 85, lastAccessed: '2 hari lalu', subject: 'Fisika', color: 'from-blue-500 to-cyan-500' },
        { title: 'Bahasa Inggris Grammar', progress: 60, lastAccessed: '5 hari lalu', subject: 'Bahasa Inggris', color: 'from-green-500 to-emerald-500' },
        { title: 'Sejarah Indonesia Modern', progress: 100, lastAccessed: '1 minggu lalu', subject: 'Sejarah', color: 'from-purple-500 to-violet-500' },
    ];

    const menuItems = [
        {
            title: '🎨 Ubah Avatar',
            description: 'Pilih avatar kesukaanmu!',
            action: 'avatar'
        },
        {
            title: '📊 Laporan Belajar',
            description: 'Lihat progress belajarmu',
            action: 'report'
        },
        {
            title: '🏆 Pencapaian Saya',
            description: 'Koleksi badge dan trophy',
            action: 'achievements'
        },
        {
            title: '💰 Toko Koin',
            description: 'Tukar koin dengan hadiah',
            action: 'store'
        },
        {
            title: '👥 Teman Belajar',
            description: 'Temukan teman untuk belajar bersama',
            action: 'friends'
        },
        {
            title: '📱 Pengaturan Aplikasi',
            description: 'Sesuaikan pengalaman belajarmu',
            action: 'settings'
        },
        {
            title: '🔔 Notifikasi',
            description: 'Kelola pemberitahuan',
            action: 'notifications'
        },
        {
            title: '🔒 Privasi & Keamanan',
            description: 'Kelola data pribadimu',
            action: 'privacy'
        },
        {
            title: '📞 Bantuan & Dukungan',
            description: 'Butuh bantuan? Kami siap membantu!',
            action: 'help'
        },
        {
            title: '⭐ Beri Rating',
            description: 'Bantu kami menjadi lebih baik',
            action: 'rate'
        },
        {
            title: '📤 Bagikan Aplikasi',
            description: 'Ajak teman-temanmu belajar',
            action: 'share'
        },
        {
            title: '🚪 Keluar Akun',
            description: 'Keluar dari akunmu',
            action: 'logout',
            danger: true
        }
    ];

    const getRarityColor = (rarity) => {
        switch (rarity) {
            case 'legendary': return 'from-yellow-400 to-orange-500 border-yellow-400';
            case 'epic': return 'from-purple-500 to-pink-500 border-purple-400';
            case 'rare': return 'from-blue-500 to-cyan-500 border-blue-400';
            default: return 'from-gray-400 to-gray-500 border-gray-400';
        }
    };

    return (
        <>
            <SafeArea className="p-3 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
                {/* Profile Header - More Colorful */}
                <div className="profile-header mb-6 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 p-6 rounded-2xl text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

                    <div className="flex items-center space-x-4 relative z-10">
                        <div className="relative">
                            <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full border-4 border-white shadow-lg" />
                            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full border-2 border-white">
                                Lv.{user.level}
                            </div>
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
                            <p className="text-blue-100 text-base mb-1">{user.grade} • {user.school}</p>
                            <p className="text-sm text-blue-200">Bergabung sejak {user.joinDate} 🎓</p>
                        </div>
                    </div>

                    {/* XP Bar */}
                    <div className="mt-4 bg-white/20 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-500"
                            style={{width: `${(user.experiencePoints / user.nextLevelXP) * 100}%`}}
                        ></div>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                        <span>{user.experiencePoints} XP</span>
                        <span>{user.nextLevelXP} XP</span>
                    </div>

                    <button className="mt-4 bg-white text-purple-600 px-6 py-2 rounded-xl font-bold text-base hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                        ✏️ Edit Profil
                    </button>
                </div>

                {/* Stats Grid - More Visual */}
                <div className="stats-grid mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-lg text-white text-center transform hover:scale-105 transition-all">
                            <div className="text-2xl font-bold mb-1">{user.completedCourses}</div>
                            <div className="text-sm opacity-90">📚 Kursus Selesai</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-2xl shadow-lg text-white text-center transform hover:scale-105 transition-all">
                            <div className="text-2xl font-bold mb-1">{user.totalHours}</div>
                            <div className="text-sm opacity-90">⏰ Jam Belajar</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-2xl shadow-lg text-white text-center transform hover:scale-105 transition-all">
                            <div className="text-2xl font-bold mb-1">{user.currentStreak}</div>
                            <div className="text-sm opacity-90">🔥 Hari Berturut</div>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-4 rounded-2xl shadow-lg text-white text-center transform hover:scale-105 transition-all">
                            <div className="text-2xl font-bold mb-1">{user.coins}</div>
                            <div className="text-sm opacity-90">🪙 Koin</div>
                        </div>
                    </div>
                </div>

                {/* Recent Courses - Enhanced */}
                <div className="recent-courses mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800">📖 Kursus Terbaru</h2>
                        <button className="text-blue-600 font-semibold text-sm">Lihat Semua →</button>
                    </div>
                    <div className="space-y-4">
                        {recentCourses.map((course, index) => (
                            <div key={index} className="bg-white p-4 rounded-2xl shadow-lg border-2 border-gray-100 transform hover:scale-102 transition-all">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800 text-base mb-1">{course.title}</h3>
                                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">{course.subject}</span>
                                    </div>
                                    <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">{course.lastAccessed}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                                    <div className={`bg-gradient-to-r ${course.color} h-3 rounded-full transition-all duration-500`} style={{width: `${course.progress}%`}}></div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-600">{course.progress}% selesai</p>
                                    {course.progress === 100 && <span className="text-green-600 font-bold text-sm">✅ Selesai!</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Achievements - More Gamified */}
                <div className="achievements mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800">🏆 Pencapaian Saya</h2>
                        <button className="text-purple-600 font-semibold text-sm">Lihat Semua →</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {achievements.map((achievement, index) => (
                            <div key={index} className={`p-4 rounded-2xl border-4 shadow-lg transform hover:scale-105 transition-all ${
                                achievement.unlocked
                                    ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} text-white`
                                    : 'border-gray-300 bg-gray-50 text-gray-400'
                            }`}>
                                <div className="text-center">
                                    <div className={`text-3xl mb-2 ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                                        {achievement.icon}
                                    </div>
                                    <h3 className={`font-bold text-sm mb-1 ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                                        {achievement.title}
                                    </h3>
                                    <p className={`text-xs ${achievement.unlocked ? 'text-white/80' : 'text-gray-400'}`}>
                                        {achievement.description}
                                    </p>
                                    {achievement.unlocked && (
                                        <div className="mt-2 bg-white/20 px-2 py-1 rounded-full text-xs font-bold">
                                            {achievement.rarity.toUpperCase()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Menu Section - Comprehensive */}
                <div className="menu-section">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">⚙️ Menu Utama</h2>
                    <div className="grid grid-cols-1 gap-3">
                        {menuItems.map((item, index) => (
                            <div key={index} className={`bg-white p-4 rounded-2xl shadow-lg border-2 transform hover:scale-102 transition-all ${
                                item.danger ? 'border-red-200 bg-red-50' : 'border-gray-100'
                            }`}>
                                <div className="flex justify-between items-center">
                                    <div className="flex-1">
                                        <h3 className={`font-bold text-base mb-1 ${
                                            item.danger ? 'text-red-600' : 'text-gray-800'
                                        }`}>
                                            {item.title}
                                        </h3>
                                        <p className={`text-sm ${
                                            item.danger ? 'text-red-500' : 'text-gray-600'
                                        }`}>
                                            {item.description}
                                        </p>
                                    </div>
                                    <button className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                                        item.danger
                                            ? 'bg-red-500 text-white hover:bg-red-600'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                    } transform hover:scale-105`}>
                                        {item.danger ? '🚪' : '→'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl text-white shadow-lg">
                        <p className="text-sm mb-2">Terima kasih sudah belajar dengan AJARIN! 🎓</p>
                        <p className="text-xs opacity-80">Versi 2.1.0 • Terakhir update: Desember 2025</p>
                    </div>
                </div>
            </SafeArea>
        </>
    )
}