import SafeArea from '../components/SafeArea';
import StreakCoinDisplay from '../components/StreakCoinDisplay';
import { GraduationCap, Target, Users, Award, BookOpen, UserCheck, Smartphone, BarChart3, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function About() {
    // User progress state
        const { streak, coins, hasCompletedToday, studyHours, userRank } = useUserProgress();


    const stats = [
        { number: '1M+', label: 'Siswa Terdaftar', icon: Users },
        { number: '10,000+', label: 'Kursus Tersedia', icon: BookOpen },
        { number: '500+', label: 'Guru Profesional', icon: UserCheck },
        { number: '95%', label: 'Tingkat Kepuasan', icon: Award }
    ];

    const features = [
        {
            icon: BookOpen,
            title: 'Kurikulum Terintegrasi',
            description: 'Materi pembelajaran yang selaras dengan kurikulum nasional dan internasional',
            color: 'bg-blue-100 text-blue-600'
        },
        {
            icon: UserCheck,
            title: 'Guru Berkualitas',
            description: 'Tim pengajar terdiri dari guru-guru berpengalaman dan ahli di bidangnya',
            color: 'bg-green-100 text-green-600'
        },
        {
            icon: Smartphone,
            title: 'Akses Dimana Saja',
            description: 'Belajar fleksibel melalui aplikasi mobile dan website kapan saja',
            color: 'bg-purple-100 text-purple-600'
        },
        {
            icon: BarChart3,
            title: 'Progress Tracking',
            description: 'Pantau perkembangan belajar dengan laporan yang detail dan akurat',
            color: 'bg-orange-100 text-orange-600'
        }
    ];

    return (
        <SafeArea className="bg-gray-50 min-h-screen">
            {/* Top App Bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <GraduationCap size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">AJARIN</h1>
                    </div>
                    <StreakCoinDisplay
                        streak={streak}
                        coins={coins}
                        hasCompletedToday={hasCompletedToday}
                    />
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Header */}
                <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <GraduationCap size={32} className="text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Tentang AJARIN</h1>
                    <p className="text-gray-600">Platform edukasi terdepan di Indonesia yang menghubungkan siswa dengan guru terbaik melalui teknologi modern</p>
                </div>

                {/* Mission */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Misi Kami</h2>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Target size={24} className="text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Misi AJARIN</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Memberikan akses pendidikan berkualitas tinggi kepada setiap siswa di Indonesia,
                            mempersiapkan generasi muda menghadapi tantangan masa depan dengan kurikulum
                            yang relevan dan metode pembelajaran inovatif.
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">AJARIN dalam Angka</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <IconComponent size={24} className="text-blue-600" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                                    <div className="text-gray-600 text-sm">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Features */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Mengapa Memilih AJARIN?</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
                                    <div className="flex items-start space-x-3">
                                        <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center flex-shrink-0`}>
                                            <IconComponent size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <MessageCircle size={24} className="text-green-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Punya Pertanyaan?</h2>
                    <p className="text-gray-600 text-sm mb-4">Hubungi kami untuk informasi lebih lanjut tentang AJARIN</p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        Hubungi Kami
                    </button>
                </div>
            </div>
        </SafeArea>
    )
}