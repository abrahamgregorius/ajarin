import { Link } from 'react-router-dom';
import SafeArea from '../components/SafeArea';
import { useState } from 'react';
import { GraduationCap, BookOpen, Users, Play, ChevronDown } from 'lucide-react';

export default function Home() {
    const [selectedLevel, setSelectedLevel] = useState('SD');

    // Data untuk kelas berdasarkan level
    const classesByLevel = {
        SD: Array.from({ length: 6 }, (_, i) => i + 1),
        SMP: Array.from({ length: 3 }, (_, i) => i + 7),
        SMA: Array.from({ length: 3 }, (_, i) => i + 10)
    };

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
        <SafeArea className="bg-gray-50 min-h-screen">
            {/* Top App Bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <GraduationCap size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">AJARIN</h1>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                            <BookOpen size={16} />
                            <span>10K Kursus</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Users size={16} />
                            <span>500 Guru</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {hasProgress && (
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">Lanjutkan Belajar</h2>
                        <div className="flex items-center space-x-3">
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900 mb-1">{currentTopic.name}</h3>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${currentTopic.progress}%` }}></div>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{currentTopic.progress}% selesai</p>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
                                <Play size={16} />
                                <span>Lanjut</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Class Selection with Dropdown */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Pilih Kelas</h2>
                    
                    {/* Level Dropdown */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tingkat</label>
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

                    {/* Class Buttons */}
                    <div className="grid grid-cols-3 gap-3">
                        {classesByLevel[selectedLevel].map((cls) => (
                            <Link 
                                to={`/kelas/${cls}`} 
                                key={cls} 
                                className="bg-blue-50 text-blue-700 p-4 rounded-lg font-medium text-center hover:bg-blue-100 transition-colors"
                            >
                                Kelas {cls}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Popular Topics Slider */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Topik Populer</h2>
                    <div className="flex space-x-4 overflow-x-auto pb-2">
                        {popularTopics.map((topic, index) => (
                            <div key={index} className="flex-shrink-0 w-64 bg-gray-50 p-3 rounded-lg">
                                <h3 className="font-medium text-gray-900 mb-1">{topic.name}</h3>
                                <p className="text-blue-600 text-sm mb-1">{topic.class} - {topic.subject}</p>
                                <p className="text-gray-600 text-sm">{topic.videos} video</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SafeArea>
    )
}