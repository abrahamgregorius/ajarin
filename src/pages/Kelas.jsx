import SafeArea from "../components/SafeArea";
import { GraduationCap, Baby, BookOpen, Gift, Monitor, Target, Users, Book } from 'lucide-react';

export default function Kelas() {
    const gradeLevels = [
        { id: 1, name: 'Kelas 1', icon: Book, color: 'bg-pink-100 text-pink-600' },
        { id: 2, name: 'Kelas 2', icon: Book, color: 'bg-pink-100 text-pink-600' },
        { id: 3, name: 'Kelas 3', icon: Book, color: 'bg-pink-100 text-pink-600' },
        { id: 4, name: 'Kelas 4', icon: Book, color: 'bg-pink-100 text-pink-600' },
        { id: 5, name: 'Kelas 5', icon: Book, color: 'bg-pink-100 text-pink-600' },
        { id: 6, name: 'Kelas 6', icon: Book, color: 'bg-pink-100 text-pink-600' },
        { id: 7, name: 'Kelas 7', icon: Book, color: 'bg-blue-100 text-blue-600' },
        { id: 8, name: 'Kelas 8', icon: Book, color: 'bg-blue-100 text-blue-600' },
        { id: 9, name: 'Kelas 9', icon: Book, color: 'bg-blue-100 text-blue-600' },
        { id: 10, name: 'Kelas 10', icon: Book, color: 'bg-purple-100 text-purple-600' },
        { id: 11, name: 'Kelas 11', icon: Book, color: 'bg-purple-100 text-purple-600' },
        { id: 12, name: 'Kelas 12', icon: Book, color: 'bg-purple-100 text-purple-600' }
    ];

    const categories = [
        { name: 'Matematika', emoji: '🔢', courses: 89, color: 'bg-blue-100 text-blue-600' },
        { name: 'Bahasa Indonesia', emoji: '📝', courses: 67, color: 'bg-green-100 text-green-600' },
        { name: 'IPA', emoji: '🔬', courses: 94, color: 'bg-purple-100 text-purple-600' },
        { name: 'IPS', emoji: '🌍', courses: 78, color: 'bg-orange-100 text-orange-600' },
        { name: 'Bahasa Inggris', emoji: '🇺🇸', courses: 56, color: 'bg-red-100 text-red-600' },
        { name: 'Seni Budaya', emoji: '🎨', courses: 43, color: 'bg-pink-100 text-pink-600' },
        { name: 'TIK', emoji: '💻', courses: 38, color: 'bg-indigo-100 text-indigo-600' },
        { name: 'Olahraga', emoji: '⚽', courses: 29, color: 'bg-teal-100 text-teal-600' }
    ];

    const quickActions = [
        { title: 'Gratis', icon: Gift, description: 'Belajar tanpa biaya' },
        { title: 'Kelas Live', icon: Monitor, description: 'Belajar real-time' },
        { title: 'Quiz Seru', icon: Target, description: 'Uji pengetahuanmu' },
        { title: 'Bareng™', icon: Users, description: 'Belajar bareng teman' }
    ];

    return (
        <>
            <SafeArea className="p-3 bg-blue-50 min-h-screen">
                <div className="header mb-6 text-center">
                    <div className="mb-4">
                        <GraduationCap size={40} />
                    </div>
                    <h1 className='text-3xl font-bold text-blue-600 mb-2'>
                        Pilih Kelas Belajarmu
                    </h1>
                    <p className='text-gray-700 text-base font-medium'>
                        Mari mulai petualangan belajar yang menyenangkan!
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {quickActions.map((action, index) => (
                            <div key={index} className={`bg-blue-500 flex flex-col justify-start items-center p-4 rounded-2xl text-white text-center shadow-lg transform hover:scale-105 transition-all cursor-pointer`}>
                                <action.icon size={32} className="mb-2" />
                                <h3 className="font-bold text-sm mb-1">{action.title}</h3>
                                <p className="text-xs opacity-90">{action.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="level-section mb-12">
                    <div className="bg-pink-50 p-6 rounded-2xl border-2 border-pink-200 mb-6">
                        <div className="flex items-center mb-4">
                            <Baby size={40} className="mr-3" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Sekolah Dasar (SD)</h2>
                                <p className="text-gray-600">Kelas 1-6 • Belajar sambil bermain!</p>
                            </div>
                        </div>

                        {/* SD Grade Buttons */}
                        <div className="grade-buttons mb-6">
                            <div className="grid grid-cols-3 md:grid-cols-3 gap-3">
                                {gradeLevels.filter(grade => grade.id >= 1 && grade.id <= 6).map((grade) => (
                                    <div key={grade.id} className={`p-4 flex flex-col justify-center items-center rounded-2xl shadow-lg transform hover:scale-105 transition-all cursor-pointer ${grade.color} text-center`}>
                                        <grade.icon size={32} className="mb-2" />
                                        <h3 className="font-bold text-sm">{grade.name}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* SMP Section */}
                <div className="level-section mb-12">
                    <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200 mb-6">
                        <div className="flex items-center mb-4">
                            <BookOpen size={40} className="mr-3" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Sekolah Menengah Pertama (SMP)</h2>
                                <p className="text-gray-600">Kelas 7-9 • Petualangan pengetahuan!</p>
                            </div>
                        </div>

                        {/* SMP Grade Buttons */}
                        <div className="grade-buttons mb-6">
                            <div className="grid grid-cols-3 gap-3">
                                {gradeLevels.filter(grade => grade.id >= 7 && grade.id <= 9).map((grade) => (
                                    <div key={grade.id} className={`p-4 flex flex-col justify-center items-center rounded-2xl shadow-lg transform hover:scale-105 transition-all cursor-pointer ${grade.color} text-center`}>
                                        <grade.icon size={32} className="mb-2" />
                                        <h3 className="font-bold text-sm">{grade.name}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* SMA Section */}
                <div className="level-section mb-12">
                    <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-200 mb-6">
                        <div className="flex items-center mb-4">
                            <GraduationCap size={40} className="mr-3" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Sekolah Menengah Atas (SMA)</h2>
                                <p className="text-gray-600">Kelas 10-12 • Siap menghadapi masa depan!</p>
                            </div>
                        </div>

                        {/* SMA Grade Buttons */}
                        <div className="grade-buttons mb-6">
                            <div className="grid grid-cols-3 gap-3">
                                {gradeLevels.filter(grade => grade.id >= 10 && grade.id <= 12).map((grade) => (
                                    <div key={grade.id} className={`p-4 flex flex-col justify-center items-center rounded-2xl shadow-lg transform hover:scale-105 transition-all cursor-pointer ${grade.color} text-center`}>
                                        <grade.icon size={32} className="mb-2" />
                                        <h3 className="font-bold text-sm">{grade.name}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Call to Action */}
                <div className="cta-section text-center">
                    <div className="bg-blue-500 p-6 rounded-2xl text-white shadow-2xl">
                        <h3 className="text-xl font-bold mb-2">Belum menemukan kursus yang cocok?</h3>
                        <p className="mb-4 text-sm opacity-90">Jangan khawatir! Kami terus menambahkan kursus-kursus menarik setiap hari</p>
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold text-base hover:bg-gray-100 transition-all shadow-lg">
                            Beri Saran Kursus
                        </button>
                    </div>
                </div>
            </SafeArea>
        </>
    )
}