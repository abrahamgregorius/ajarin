import SafeArea from "../components/SafeArea";
import StreakCoinDisplay from "../components/StreakCoinDisplay";
import { Trophy, Medal, Award, Clock, TrendingUp, Crown, Star, Zap, Coins } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUserProgress } from '../hooks/useUserProgress';
import { useAuth } from '../contexts/AuthContext';
import * as db from '../lib/database';

export default function Ranking() {
    const { user } = useAuth();
    const { streak, coins, hasCompletedToday, studyHours, userRank } = useUserProgress();
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRankings = async () => {
            const { data, error } = await db.getRanking(50);
            if (data && !error) {
                setRankings(data);
            }
            setLoading(false);
        };
        loadRankings();
    }, []);

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1:
                return <Crown className="w-6 h-6 text-yellow-500" />;
            case 2:
                return <Medal className="w-6 h-6 text-gray-400" />;
            case 3:
                return <Award className="w-6 h-6 text-amber-600" />;
            default:
                return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>;
        }
    };

    const getRankBadge = (rank) => {
        if (rank <= 3) {
            const colors = {
                1: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
                2: 'bg-gradient-to-r from-gray-300 to-gray-500',
                3: 'bg-gradient-to-r from-amber-400 to-amber-600'
            };
            return colors[rank];
        }
        return 'bg-gray-100';
    };

    const formatStudyHours = (hours) => {
        return hours ? `${hours.toFixed(1)} jam` : '0 jam';
    };

    const getUserNickname = (ranker) => {
        if (!ranker.user_purchases) return null;
        const nicknamePurchase = ranker.user_purchases.find(p => p.shop_items?.type === 'nickname');
        return nicknamePurchase ? nicknamePurchase.shop_items.data.nickname : null;
    };

    return (
        <SafeArea className="bg-gray-50 min-h-screen">
            {/* Top App Bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Trophy size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">Ranking</h1>
                    </div>
                    <StreakCoinDisplay
                        streak={streak}
                        coins={coins}
                        hasCompletedToday={hasCompletedToday}
                    />
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* User Current Rank */}
                {userRank && (
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-full ${getRankBadge(userRank.rank)} flex items-center justify-center`}>
                                    {getRankIcon(userRank.rank)}
                                </div>
                                <div>
                                    <p className="text-sm opacity-90">Ranking Kamu</p>
                                    <p className="font-bold text-lg">#{userRank.rank}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center space-x-1">
                                    <Clock size={16} className="opacity-75" />
                                    <span className="font-medium">{formatStudyHours(userRank.study_hours)}</span>
                                </div>
                                <p className="text-xs opacity-75">Total jam belajar</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Top 3 Podium */}
                {rankings.length >= 3 && (
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">Podium Teratas</h2>
                        <div className="flex items-end justify-center space-x-4 mb-6">
                            {/* 2nd Place */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center mb-2">
                                    <Medal className="w-8 h-8 text-white" />
                                </div>
                                <div className="w-20 h-16 bg-gray-200 rounded-t-lg flex items-end justify-center pb-2">
                                    <span className="text-xs font-bold text-gray-700">2</span>
                                </div>
                                <div className="text-center mt-1">
                                    <p className="text-xs font-medium text-gray-900 max-w-16 truncate">
                                        {rankings[1]?.full_name || 'User'}
                                    </p>
                                    {getUserNickname(rankings[1]) && (
                                        <p className="text-xs text-blue-600 font-medium">
                                            {getUserNickname(rankings[1])}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-600">{formatStudyHours(rankings[1]?.study_hours)}</p>
                                </div>
                            </div>

                            {/* 1st Place */}
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-2">
                                    <Crown className="w-10 h-10 text-white" />
                                </div>
                                <div className="w-24 h-20 bg-yellow-400 rounded-t-lg flex items-end justify-center pb-2">
                                    <span className="text-xs font-bold text-white">1</span>
                                </div>
                                <div className="text-center mt-1">
                                    <p className="text-xs font-medium text-gray-900 max-w-20 truncate">
                                        {rankings[0]?.full_name || 'User'}
                                    </p>
                                    {getUserNickname(rankings[0]) && (
                                        <p className="text-xs text-blue-600 font-medium">
                                            {getUserNickname(rankings[0])}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-600">{formatStudyHours(rankings[0]?.study_hours)}</p>
                                </div>
                            </div>

                            {/* 3rd Place */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center mb-2">
                                    <Award className="w-8 h-8 text-white" />
                                </div>
                                <div className="w-20 h-12 bg-amber-400 rounded-t-lg flex items-end justify-center pb-2">
                                    <span className="text-xs font-bold text-white">3</span>
                                </div>
                                <div className="text-center mt-1">
                                    <p className="text-xs font-medium text-gray-900 max-w-16 truncate">
                                        {rankings[2]?.full_name || 'User'}
                                    </p>
                                    {getUserNickname(rankings[2]) && (
                                        <p className="text-xs text-blue-600 font-medium">
                                            {getUserNickname(rankings[2])}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-600">{formatStudyHours(rankings[2]?.study_hours)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Full Rankings List */}
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900">Daftar Ranking</h2>
                        <p className="text-sm text-gray-600">Berdasarkan total jam belajar</p>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-gray-600">Memuat ranking...</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {rankings.map((ranker, index) => {
                                const rank = index + 1;
                                const isCurrentUser = user?.id === ranker.id;

                                return (
                                    <div key={ranker.id} className={`p-4 flex items-center space-x-4 ${isCurrentUser ? 'bg-blue-50' : ''}`}>
                                        {/* Rank */}
                                        <div className={`w-10 h-10 rounded-full ${getRankBadge(rank)} flex items-center justify-center flex-shrink-0`}>
                                            {getRankIcon(rank)}
                                        </div>

                                        {/* User Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2">
                                                <p className={`font-medium truncate ${isCurrentUser ? 'text-blue-700' : 'text-gray-900'}`}>
                                                    {ranker.full_name || 'Anonymous User'}
                                                    {isCurrentUser && <span className="text-blue-600 text-sm ml-1">(Kamu)</span>}
                                                </p>
                                                {getUserNickname(ranker) && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                                        {getUserNickname(ranker)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-3 text-sm text-gray-600">
                                                <span>{ranker.grade} - {ranker.school}</span>
                                                <div className="flex items-center space-x-1">
                                                    <Star size={12} />
                                                    <span>{ranker.streak} streak</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Study Hours */}
                                        <div className="text-right flex-shrink-0">
                                            <div className="flex items-center space-x-1">
                                                <Clock size={14} className="text-gray-400" />
                                                <span className="font-medium text-gray-900">{formatStudyHours(ranker.study_hours)}</span>
                                            </div>
                                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                                                <Coins size={12} className="text-yellow-500" />
                                                <span>{ranker.coins}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Study Tips */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center space-x-2">
                        <TrendingUp size={20} className="text-green-500" />
                        <span>Tips Naik Ranking</span>
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <span>Belajar secara konsisten setiap hari untuk menambah jam belajar</span>
                        </div>
                        <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <span>Selesaikan video dan artikel untuk mendapatkan lebih banyak jam</span>
                        </div>
                        <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                            <span>Jaga streak belajar untuk bonus motivasi</span>
                        </div>
                    </div>
                </div>
            </div>
        </SafeArea>
    )
}