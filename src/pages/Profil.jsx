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
            <SafeArea className="p-3">
                <div className="profile-header mb-4 bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-xl text-white">
                    <div className="flex items-center space-x-3">
                        <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full border-4 border-white" />
                        <div>
                            <h1 className="text-xl font-bold">{user.name}</h1>
                            <p className="text-blue-100 text-sm">{user.grade} • {user.school}</p>
                            <p className="text-xs text-blue-200">Bergabung sejak {user.joinDate}</p>
                        </div>
                    </div>
                    <button className="mt-3 bg-white text-blue-600 px-3 py-1.5 rounded-md font-medium text-sm hover:bg-gray-100 transition-colors">
                        Edit Profil
                    </button>
                </div>

                <div className="stats-grid mb-6">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white p-3 rounded-lg shadow-md text-center">
                            <div className="text-xl font-bold text-blue-600">{user.completedCourses}</div>
                            <div className="text-gray-600 text-xs">Kursus Selesai</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-md text-center">
                            <div className="text-xl font-bold text-green-600">{user.totalHours}</div>
                            <div className="text-gray-600 text-xs">Jam Belajar</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-md text-center">
                            <div className="text-xl font-bold text-orange-600">{user.currentStreak}</div>
                            <div className="text-gray-600 text-xs">Hari Berturut</div>
                        </div>
                    </div>
                </div>

                <div className="recent-courses mb-6">
                    <h2 className="text-lg font-semibold mb-3 text-gray-800">Kursus Terbaru</h2>
                    <div className="space-y-3">
                        {recentCourses.map((course, index) => (
                            <div key={index} className="bg-white p-3 rounded-lg shadow-md">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold text-gray-800 text-sm">{course.title}</h3>
                                    <span className="text-xs text-gray-500">{course.lastAccessed}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{width: `${course.progress}%`}}></div>
                                </div>
                                <p className="text-xs text-gray-600">{course.progress}% selesai</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="achievements mb-6">
                    <h2 className="text-lg font-semibold mb-3 text-gray-800">Pencapaian</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {achievements.map((achievement, index) => (
                            <div key={index} className={`p-3 rounded-lg border-2 ${achievement.unlocked ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-gray-50'}`}>
                                <div className="text-center">
                                    <div className={`text-2xl mb-1 ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>{achievement.icon}</div>
                                    <h3 className={`font-semibold text-sm ${achievement.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>{achievement.title}</h3>
                                    <p className={`text-xs ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>{achievement.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="settings-section">
                    <h2 className="text-lg font-semibold mb-3 text-gray-800">Pengaturan</h2>
                    <div className="space-y-3">
                        <div className="bg-white p-3 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-gray-800 text-sm">Notifikasi</h3>
                                <p className="text-gray-600 text-xs">Kelola pengaturan notifikasi</p>
                            </div>
                            <button className="text-blue-600 font-medium text-sm">Atur</button>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-gray-800 text-sm">Privasi</h3>
                                <p className="text-gray-600 text-xs">Kelola data pribadi Anda</p>
                            </div>
                            <button className="text-blue-600 font-medium text-sm">Atur</button>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-gray-800 text-sm">Bantuan</h3>
                                <p className="text-gray-600 text-xs">Pusat bantuan dan FAQ</p>
                            </div>
                            <button className="text-blue-600 font-medium text-sm">Buka</button>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-red-600 text-sm">Keluar</h3>
                                <p className="text-gray-600 text-xs">Keluar dari akun Anda</p>
                            </div>
                            <button className="text-red-600 font-medium text-sm">Keluar</button>
                        </div>
                    </div>
                </div>
            </SafeArea>
        </>
    )
}