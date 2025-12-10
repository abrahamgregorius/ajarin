import SafeArea from "../components/SafeArea";
import { GraduationCap, ChevronDown, Gift, Monitor, Target, Users } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Kelas() {
    const [selectedLevel, setSelectedLevel] = useState('SD');

    const gradeLevels = {
        SD: [
            { id: 1, name: 'Kelas 1' },
            { id: 2, name: 'Kelas 2' },
            { id: 3, name: 'Kelas 3' },
            { id: 4, name: 'Kelas 4' },
            { id: 5, name: 'Kelas 5' },
            { id: 6, name: 'Kelas 6' }
        ],
        SMP: [
            { id: 7, name: 'Kelas 7' },
            { id: 8, name: 'Kelas 8' },
            { id: 9, name: 'Kelas 9' }
        ],
        SMA: [
            { id: 10, name: 'Kelas 10' },
            { id: 11, name: 'Kelas 11' },
            { id: 12, name: 'Kelas 12' }
        ]
    };

    const quickActions = [
        { title: 'Gratis', icon: Gift, description: 'Belajar tanpa biaya' },
        { title: 'Kelas Live', icon: Monitor, description: 'Belajar real-time' },
        { title: 'Quiz Seru', icon: Target, description: 'Uji pengetahuanmu' },
        { title: 'Bareng™', icon: Users, description: 'Belajar bareng teman' }
    ];

    return (
        <SafeArea className="bg-gray-50 min-h-screen">
            {/* Top App Bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <GraduationCap size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">Pilih Kelas</h1>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Fitur Unggulan</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {quickActions.map((action, index) => (
                            <div key={index} className="bg-blue-50 p-4 rounded-lg text-center">
                                <action.icon size={24} className="text-blue-600 mx-auto mb-2" />
                                <h3 className="font-medium text-gray-900 text-sm mb-1">{action.title}</h3>
                                <p className="text-gray-600 text-xs">{action.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Level Selection */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Tingkat Pendidikan</h2>
                    
                    {/* Level Dropdown */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Tingkat</label>
                        <div className="relative">
                            <select
                                value={selectedLevel}
                                onChange={(e) => setSelectedLevel(e.target.value)}
                                className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="SD">Sekolah Dasar (SD)</option>
                                <option value="SMP">Sekolah Menengah Pertama (SMP)</option>
                                <option value="SMA">Sekolah Menengah Atas (SMA)</option>
                            </select>
                            <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Grade Buttons */}
                    <div className="grid grid-cols-3 gap-3">
                        {gradeLevels[selectedLevel].map((grade) => (
                            <Link 
                                to={`/kelas/${grade.id}`} 
                                key={grade.id} 
                                className="bg-blue-50 text-blue-700 p-4 rounded-lg font-medium text-center hover:bg-blue-100 transition-colors"
                            >
                                {grade.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-blue-600 text-white rounded-xl p-6 text-center shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">Belum menemukan kursus yang cocok?</h3>
                    <p className="text-sm opacity-90 mb-4">Jangan khawatir! Kami terus menambahkan kursus menarik setiap hari</p>
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium">
                        Beri Saran Kursus
                    </button>
                </div>
            </div>
        </SafeArea>
    )
}