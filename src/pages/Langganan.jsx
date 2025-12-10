import SafeArea from "../components/SafeArea";
import StreakCoinDisplay from "../components/StreakCoinDisplay";
import { GraduationCap, ShoppingCart, Coins, Check, X, Crown, Star, Award, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUserProgress } from '../hooks/useUserProgress';
import * as db from '../lib/database';

export default function Shop() {
    const { streak, coins, hasCompletedToday, purchaseItem, ownsItem, currentNickname } = useUserProgress();
    const [shopItems, setShopItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(null);

    useEffect(() => {
        const loadShopItems = async () => {
            const { data, error } = await db.getShopItems();
            if (data && !error) {
                setShopItems(data);
            }
            setLoading(false);
        };
        loadShopItems();
    }, []);

    const handlePurchase = async (item) => {
        if (coins < item.price) {
            alert('Koin tidak cukup!');
            return;
        }

        setPurchasing(item.id);
        const result = await purchaseItem(item.id);
        setPurchasing(null);

        if (result.success) {
            alert(`Berhasil membeli ${item.name}!`);
        } else {
            alert(`Gagal membeli: ${result.message}`);
        }
    };

    const getItemIcon = (itemName) => {
        const icons = {
            'Pro Scholar': <GraduationCap className="w-6 h-6" />,
            'Math Wizard': <Zap className="w-6 h-6" />,
            'Science Master': <Award className="w-6 h-6" />,
            'Language Guru': <Star className="w-6 h-6" />,
            'History Expert': <Crown className="w-6 h-6" />,
            'Elite Learner': <Star className="w-6 h-6" />,
            'Genius Kid': <Zap className="w-6 h-6" />,
            'Study Champion': <Award className="w-6 h-6" />
        };
        return icons[itemName] || <Star className="w-6 h-6" />;
    };

    const getItemColor = (itemName) => {
        const colors = {
            'Pro Scholar': 'from-blue-500 to-blue-600',
            'Math Wizard': 'from-purple-500 to-purple-600',
            'Science Master': 'from-green-500 to-green-600',
            'Language Guru': 'from-yellow-500 to-yellow-600',
            'History Expert': 'from-red-500 to-red-600',
            'Elite Learner': 'from-indigo-500 to-indigo-600',
            'Genius Kid': 'from-pink-500 to-pink-600',
            'Study Champion': 'from-orange-500 to-orange-600'
        };
        return colors[itemName] || 'from-gray-500 to-gray-600';
    };

    return (
        <>
            <SafeArea className="bg-gray-50 min-h-screen">
                {/* Top App Bar */}
                <div className="bg-white shadow-sm border-b">
                    <div className="px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <ShoppingCart size={28} className="text-blue-600" />
                            <h1 className="text-xl font-bold text-gray-900">Shop</h1>
                        </div>
                        <StreakCoinDisplay
                            streak={streak}
                            coins={coins}
                            hasCompletedToday={hasCompletedToday}
                        />
                    </div>
                </div>

                <div className="p-4 space-y-6">
                    {/* Current Nickname Display */}
                    {currentNickname && (
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-center space-x-3">
                                <Crown size={24} className="text-yellow-200" />
                                <div>
                                    <p className="text-sm opacity-90">Nickname Aktif</p>
                                    <p className="font-bold text-lg">{currentNickname}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Shop Header */}
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="text-center">
                            <ShoppingCart size={48} className="text-blue-600 mx-auto mb-3" />
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Toko Item</h2>
                            <p className="text-gray-600 text-sm">Beli nickname keren dengan koinmu!</p>
                            <div className="flex items-center justify-center mt-3 space-x-2">
                                <Coins size={20} className="text-yellow-500" />
                                <span className="font-bold text-lg text-gray-900">{coins}</span>
                                <span className="text-gray-600">koin tersedia</span>
                            </div>
                        </div>
                    </div>

                    {/* Shop Items */}
                    {loading ? (
                        <div className="bg-white rounded-xl p-8 shadow-sm text-center">
                            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-gray-600">Memuat item...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {shopItems.map((item) => {
                                const isOwned = ownsItem(item.id);
                                const canAfford = coins >= item.price;
                                const isPurchasing = purchasing === item.id;

                                return (
                                    <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border">
                                        <div className="flex items-start space-x-4">
                                            {/* Item Icon */}
                                            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getItemColor(item.name)} flex items-center justify-center text-white flex-shrink-0`}>
                                                {getItemIcon(item.name)}
                                            </div>

                                            {/* Item Details */}
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                                                <p className="text-gray-600 text-sm mb-3">{item.description}</p>

                                                {/* Price */}
                                                <div className="flex items-center space-x-2 mb-3">
                                                    <Coins size={16} className="text-yellow-500" />
                                                    <span className="font-bold text-lg text-gray-900">{item.price}</span>
                                                    <span className="text-gray-600">koin</span>
                                                </div>

                                                {/* Purchase Button */}
                                                <button
                                                    onClick={() => handlePurchase(item)}
                                                    disabled={isOwned || !canAfford || isPurchasing}
                                                    className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors flex items-center justify-center space-x-2 ${isOwned
                                                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                                        : !canAfford
                                                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                                            : isPurchasing
                                                                ? 'bg-blue-400 text-white cursor-wait'
                                                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                                        }`}
                                                >
                                                    {isPurchasing ? (
                                                        <>
                                                            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                                                            <span>Membeli...</span>
                                                        </>
                                                    ) : isOwned ? (
                                                        <>
                                                            <Check size={16} />
                                                            <span>Dimiliki</span>
                                                        </>
                                                    ) : !canAfford ? (
                                                        <>
                                                            <X size={16} />
                                                            <span>Koin Kurang</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ShoppingCart size={16} />
                                                            <span>Beli Sekarang</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* How to Earn Coins */}
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-3 flex items-center space-x-2">
                            <Coins size={20} className="text-yellow-500" />
                            <span>Cara Mendapatkan Koin</span>
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>Selesaikan video: +10 koin</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Streak harian: +5 koin per hari</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>Selesaikan video: +10 koin</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span>Quiz/tes: +20 koin</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <span>Artikel selesai: +5 koin</span>
                            </div>
                        </div>
                    </div>
                </div>
            </SafeArea>
        </>
    )
}