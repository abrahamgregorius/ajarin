import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as db from '../lib/database';

export function useUserProgress() {
    const { user: authUser } = useAuth();
    const [streak, setStreak] = useState(0);
    const [coins, setCoins] = useState(0);
    const [hasCompletedToday, setHasCompletedToday] = useState(false);
    const [loading, setLoading] = useState(true);

    // Load user progress data
    useEffect(() => {
        const loadUserProgress = async () => {
            if (!authUser?.id) {
                setLoading(false);
                return;
            }

            try {
                const { data: profile, error } = await db.getUserProfile(authUser.id);

                if (profile) {
                    setStreak(profile.streak || 0);
                    setCoins(profile.coins || 0);

                    // Check if user completed something today
                    const lastCompleted = profile.last_completed_at;
                    if (lastCompleted) {
                        const today = new Date().toDateString();
                        const lastCompletedDate = new Date(lastCompleted).toDateString();
                        setHasCompletedToday(today === lastCompletedDate);
                    }
                }
            } catch (error) {
                console.error('Error loading user progress:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUserProgress();
    }, [authUser?.id]);

    // Function to update streak in database
    const updateStreak = async (newStreak) => {
        if (!authUser?.id) return;

        try {
            await db.updateUserProfile(authUser.id, {
                streak: newStreak,
                last_completed_at: new Date().toISOString()
            });
            setStreak(newStreak);
            setHasCompletedToday(true);
        } catch (error) {
            console.error('Error updating streak:', error);
        }
    };

    // Function to update coins in database
    const updateCoins = async (newCoins) => {
        if (!authUser?.id) return;

        try {
            await db.updateUserProfile(authUser.id, { coins: newCoins });
            setCoins(newCoins);
        } catch (error) {
            console.error('Error updating coins:', error);
        }
    };

    // Function to complete a daily task
    const completeDailyTask = async (coinReward = 10) => {
        if (hasCompletedToday) return false; // Already completed today

        const newStreak = streak + 1;
        const newCoins = coins + coinReward;

        await updateStreak(newStreak);
        await updateCoins(newCoins);

        return true; // Task completed successfully
    };

    // Function to spend coins
    const spendCoins = async (amount) => {
        if (coins < amount) return false; // Not enough coins

        const newCoins = coins - amount;
        await updateCoins(newCoins);
        return true; // Coins spent successfully
    };

    return {
        streak,
        coins,
        hasCompletedToday,
        loading,
        updateStreak,
        updateCoins,
        completeDailyTask,
        spendCoins
    };
}