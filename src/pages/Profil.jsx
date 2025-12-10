import SafeArea from "../components/SafeArea";
import { GraduationCap, User, Settings, LogOut, ChevronRight } from 'lucide-react';

export default function Profile() {
    const user = {
        name: 'Ahmad Rahman',
        email: 'ahmad.rahman@email.com',
        grade: 'Kelas 11 SMA',
        school: 'SMA Negeri 1 Jakarta',
        avatar: 'https://via.placeholder.com/120/4ECDC4/FFFFFF?text=AR',
        joinDate: 'Januari 2024',
        completedCourses: 24,
        totalHours: 156
    };

    const menuItems = [
        {
            title: 'Edit Profil',
            icon: User,
            action: 'profile'
        },
        {
            title: 'Pengaturan',
            icon: Settings,
            action: 'settings'
        },
        {
            title: 'Bantuan',
            icon: GraduationCap,
            action: 'help'
        },
        {
            title: 'Keluar',
            icon: LogOut,
            action: 'logout',
            danger: true
        }
    ];

    return (
        <SafeArea className="bg-gray-50 min-h-screen">
            {/* Top App Bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <GraduationCap size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">Profil</h1>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Profile Info */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center space-x-4">
                        <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full" />
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
                            <p className="text-gray-600 text-sm">{user.email}</p>
                            <p className="text-gray-600 text-sm">{user.grade} • {user.school}</p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistik</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{user.completedCourses}</div>
                            <div className="text-sm text-gray-600">Kursus Selesai</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{user.totalHours}</div>
                            <div className="text-sm text-gray-600">Jam Belajar</div>
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="divide-y divide-gray-200">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                className={`w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                                    item.danger ? 'text-red-600' : 'text-gray-900'
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <item.icon size={20} />
                                    <span className="font-medium">{item.title}</span>
                                </div>
                                <ChevronRight size={20} className="text-gray-400" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </SafeArea>
    )
}