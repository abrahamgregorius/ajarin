import SafeArea from "../components/SafeArea";
import StreakCoinDisplay from "../components/StreakCoinDisplay";
import { GraduationCap, User, Settings, LogOut, ChevronRight, CircleUser } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useUserProgress } from '../hooks/useUserProgress';
import * as db from '../lib/database';

export default function Profile() {
    const { user: authUser, logout } = useAuth();
    const navigate = useNavigate();
    const { streak, coins, hasCompletedToday, loading: progressLoading, completeDailyTask } = useUserProgress();

    // Profile data state
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load profile data on component mount
    useEffect(() => {
        const loadProfileData = async () => {
            if (!authUser?.id) return;

            try {
                const { data: profile, error } = await db.getUserProfile(authUser.id);

                if (profile) {
                    setProfileData(profile);
                }
            } catch (error) {
                console.error('Error loading profile:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProfileData();
    }, [authUser?.id]);

    const user = {
        name: authUser?.name || profileData?.full_name || 'User',
        email: authUser?.email || 'user@email.com',
        grade: profileData?.grade || authUser?.grade || 'Kelas belum diatur',
        school: profileData?.school || authUser?.school || 'Sekolah belum diatur',
        avatar: profileData?.avatar_url || authUser?.avatar || 'https://via.placeholder.com/120/4ECDC4/FFFFFF?text=U',
        joinDate: 'Januari 2024', // This could also be stored in profile
        completedCourses: 24, // This could be calculated from user activity
        totalHours: 156 // This could be calculated from user activity
    };

    const handleMenuClick = (action) => {
        switch (action) {
            case 'logout':
                logout();
                navigate('/masuk');
                break;
            case 'profile':
                // Handle profile edit
                console.log('Edit profile');
                break;
            case 'settings':
                // Handle settings
                console.log('Open settings');
                break;
            case 'help':
                // Handle help
                console.log('Open help');
                break;
            default:
                break;
        }
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
                    <StreakCoinDisplay
                        streak={streak}
                        coins={coins}
                        hasCompletedToday={hasCompletedToday}
                    />
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Profile Info */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center space-x-4">
                        {/* <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full" /> */}
                        <CircleUser className="w-16 h-16 rounded-full"></CircleUser>
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
                            <div className="text-sm text-gray-600">Video Selesai</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{user.totalHours}</div>
                            <div className="text-sm text-gray-600">Jam Belajar</div>
                        </div>
                    </div>
                </div>

                {/* Daily Task Test */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tugas Harian</h3>
                    <div className="text-center">
                        <p className="text-gray-600 text-sm mb-4">
                            {hasCompletedToday
                                ? "Kamu sudah menyelesaikan tugas hari ini! 🎉"
                                : "Selesaikan tugas harian untuk mendapatkan streak dan koin!"
                            }
                        </p>
                        <button
                            onClick={completeDailyTask}
                            disabled={hasCompletedToday || progressLoading}
                            className={`w-full py-3 rounded-lg font-medium transition-colors ${
                                hasCompletedToday
                                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                        >
                            {progressLoading ? 'Memuat...' : hasCompletedToday ? 'Sudah Selesai Hari Ini' : 'Selesaikan Tugas (+10 Koin)'}
                        </button>
                    </div>
                </div>

                {/* Menu */}
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="divide-y divide-gray-200">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handleMenuClick(item.action)}
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