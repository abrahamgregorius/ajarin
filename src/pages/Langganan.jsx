import SafeArea from "../components/SafeArea";
import StreakCoinDisplay from "../components/StreakCoinDisplay";
import { GraduationCap, Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useUserProgress } from '../hooks/useUserProgress';

export default function Subscription() {
    const [selectedPlan, setSelectedPlan] = useState('Gratis');
    const { streak, coins, hasCompletedToday } = useUserProgress();

    const plans = [
        {
            name: 'Gratis',
            price: 'Rp 0',
            features: ['10 kursus menarik', 'Video HD 720p', 'Diskusi ramah', 'Sertifikat digital']
        },
        {
            name: 'Premium',
            price: '99k/bulan',
            features: ['Semua kursus unlimited', 'Video 4K super jernih', 'Chat tanpa batas', 'Sertifikat premium', 'Kelas live spesial', 'Download materi offline'],
            popular: true
        }
    ];

    const currentPlan = 'Premium';

    return (
        <SafeArea className="bg-gray-50 min-h-screen">
            {/* Top App Bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <GraduationCap size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">Langganan</h1>
                    </div>
                    <StreakCoinDisplay
                        streak={streak}
                        coins={coins}
                        hasCompletedToday={hasCompletedToday}
                    />
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Current Plan */}
                <div className="bg-blue-600 text-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-center mb-3">
                        <Check size={24} className="mr-2" />
                        <h2 className="text-lg font-semibold">Paket Aktif: {currentPlan}</h2>
                    </div>
                    <p className="text-center text-sm opacity-90 mb-4">Berlaku hingga 15 Januari 2026</p>
                    <div className="flex gap-3 justify-center">
                        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm">
                            Perpanjang
                        </button>
                        <button className="border border-white text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-white/10">
                            Ubah Paket
                        </button>
                    </div>
                </div>

                {/* Plan Selection */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Pilih Paket</h2>
                    
                    {/* Plan Dropdown */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Paket Belajar</label>
                        <div className="relative">
                            <select
                                value={selectedPlan}
                                onChange={(e) => setSelectedPlan(e.target.value)}
                                className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="Gratis">Gratis</option>
                                <option value="Premium">Premium</option>
                            </select>
                            <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Plan Details */}
                    {plans.map(plan => plan.name === selectedPlan && (
                        <div key={plan.name} className="bg-white rounded-lg p-4 shadow-md">
                            <div className="text-center mb-4">
                                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                                <p className="text-2xl font-bold text-blue-600 mt-1">{plan.price}</p>
                            </div>
                            <ul className="space-y-2 mb-4">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center text-gray-700 text-sm">
                                        <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full py-3 rounded-lg font-medium text-sm transition-colors ${
                                plan.name === currentPlan
                                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}>
                                {plan.name === currentPlan ? 'Paket Aktif' : 'Pilih Paket'}
                            </button>
                        </div>
                    ))}
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Pertanyaan Umum</h2>
                    <div className="space-y-3">
                        <div className="border-l-4 border-blue-500 pl-4">
                            <h3 className="font-medium text-gray-900 text-sm mb-1">Apakah bisa cancel langganan kapan saja?</h3>
                            <p className="text-gray-600 text-sm">Ya, kamu bisa cancel langganan kapan saja tanpa biaya tambahan.</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                            <h3 className="font-medium text-gray-900 text-sm mb-1">Ada diskon untuk pelajar?</h3>
                            <p className="text-gray-600 text-sm">Ya, pelajar dapat diskon 50% dengan verifikasi kartu pelajar.</p>
                        </div>
                    </div>
                </div>
            </div>
        </SafeArea>
    )
}