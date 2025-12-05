import SafeArea from "../components/SafeArea";

export default function Profile() {
    const user = {
        name: 'Ahmad Rahman',
        email: 'ahmad.rahman@email.com',
        grade: 'Kelas 11 SMA',
        school: 'SMA Negeri 1 Jakarta',
        avatar: 'https://via.placeholder.com/100/4ECDC4/FFFFFF?text=AR',
        joinDate: 'Januari 2024',
        completedCourses: 24,
        totalHours: 156,
        currentStreak: 7
    };

    const achievements = [
        { title: 'Pelajar Rajin', description: 'Belajar 30 hari berturut-turut', icon: '🔥', unlocked: true },
        { title: 'Master Matematika', description: 'Selesai 10 kursus matematika', icon: '🧮', unlocked: true },
        { title: 'Penjelajah IPA', description: 'Jelajahi semua subjek IPA', icon: '🔬', unlocked: false },
        { title: 'Bahasa Expert', description: 'Capai level expert bahasa Indonesia', icon: '📚', unlocked: true },
    ];

    const recentCourses = [
        { title: 'Fisika Mekanika', progress: 85, lastAccessed: '2 hari lalu' },
        { title: 'Bahasa Inggris Grammar', progress: 60, lastAccessed: '5 hari lalu' },
        { title: 'Sejarah Indonesia Modern', progress: 100, lastAccessed: '1 minggu lalu' },
    ];

    return (
        <>
            <SafeArea className="p-4">
                <div className="profile-header mb-6 bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-2xl text-white">
                    <div className="flex items-center space-x-4">
                        <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full border-4 border-white" />
                        <div>
                            <h1 className="text-2xl font-bold">{user.name}</h1>
                            <p className="text-blue-100">{user.grade} • {user.school}</p>
                            <p className="text-sm text-blue-200">Bergabung sejak {user.joinDate}</p>
                        </div>
                    </div>
                    <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Edit Profil
                    </button>
                </div>

                <div className="stats-grid mb-8">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                            <div className="text-2xl font-bold text-blue-600">{user.completedCourses}</div>
                            <div className="text-gray-600 text-sm">Kursus Selesai</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                            <div className="text-2xl font-bold text-green-600">{user.totalHours}</div>
                            <div className="text-gray-600 text-sm">Jam Belajar</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                            <div className="text-2xl font-bold text-orange-600">{user.currentStreak}</div>
                            <div className="text-gray-600 text-sm">Hari Berturut</div>
                        </div>
                    </div>
                </div>

                <div className="recent-courses mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Kursus Terbaru</h2>
                    <div className="space-y-4">
                        {recentCourses.map((course, index) => (
                            <div key={index} className="bg-white p-4 rounded-xl shadow-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold text-gray-800">{course.title}</h3>
                                    <span className="text-sm text-gray-500">{course.lastAccessed}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{width: `${course.progress}%`}}></div>
                                </div>
                                <p className="text-sm text-gray-600">{course.progress}% selesai</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="achievements mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Pencapaian</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {achievements.map((achievement, index) => (
                            <div key={index} className={`p-4 rounded-xl border-2 ${achievement.unlocked ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-gray-50'}`}>
                                <div className="text-center">
                                    <div className={`text-3xl mb-2 ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>{achievement.icon}</div>
                                    <h3 className={`font-semibold ${achievement.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>{achievement.title}</h3>
                                    <p className={`text-sm ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>{achievement.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="settings-section">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Pengaturan</h2>
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-xl shadow-lg flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-gray-800">Notifikasi</h3>
                                <p className="text-gray-600 text-sm">Kelola pengaturan notifikasi</p>
                            </div>
                            <button className="text-blue-600 font-semibold">Atur</button>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-lg flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-gray-800">Privasi</h3>
                                <p className="text-gray-600 text-sm">Kelola data pribadi Anda</p>
                            </div>
                            <button className="text-blue-600 font-semibold">Atur</button>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-lg flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-gray-800">Bantuan</h3>
                                <p className="text-gray-600 text-sm">Pusat bantuan dan FAQ</p>
                            </div>
                            <button className="text-blue-600 font-semibold">Buka</button>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-lg flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-red-600">Keluar</h3>
                                <p className="text-gray-600 text-sm">Keluar dari akun Anda</p>
                            </div>
                            <button className="text-red-600 font-semibold">Keluar</button>
                        </div>
                    </div>
                </div>
            </SafeArea>
        </>
    )
}