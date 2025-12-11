import { Flame, Coins } from 'lucide-react';

export default function StreakCoinDisplay({ streak = 0, coins = 0, hasCompletedToday = false }) {
    return (
        <div className="flex items-center space-x-3">
            {/* Streak Indicator */}
            <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                hasCompletedToday
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-gray-100 text-gray-500'
            }`}>
                <Flame size={16} className={hasCompletedToday ? 'text-orange-500' : 'text-gray-400'} />
                <span>{streak}</span>
            </div>

            {/* Coin Display */}
            <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                <Coins size={16} className="text-yellow-500" />
                <span>{coins}</span>
            </div>
        </div>
    );
}