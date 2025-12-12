import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as db from '../lib/database';

export function useUserProgress() {
  const { user: authUser } = useAuth();
  const [streak, setStreak] = useState(0);
  const [coins, setCoins] = useState(0);
  const [studyHours, setStudyHours] = useState(0);
  const [currentNickname, setCurrentNickname] = useState(null);
  const [userRank, setUserRank] = useState(null);
  const [purchasedItems, setPurchasedItems] = useState([]);
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
        // Wrap everything in a broad try-catch to prevent page crashes

        // 1. Load Profile
        const { data: profile, error } = await db.getUserProfile(authUser.id);

        if (error) {
          console.warn('Error fetching profile in useUserProgress:', error);
          // Don't return here, try to load other things if possible, or just use defaults
        }

        if (profile) {
          setStreak(profile.streak || 0);
          setCoins(profile.coins || 0);
          setStudyHours(profile.study_hours || 0);

          const lastCompleted = profile.last_completed_at;
          if (lastCompleted) {
            try {
              const today = new Date().toDateString();
              const lastCompletedDate = new Date(lastCompleted).toDateString();
              setHasCompletedToday(today === lastCompletedDate);
            } catch (e) {
              console.warn('Date parsing error:', e);
            }
          }
        }

        // 2. Load Ranking (Safe)
        try {
          const { data: rankingData } = await db.getUserRanking(authUser.id);
          if (rankingData) {
            setUserRank(rankingData);
          }
        } catch (e) {
          console.warn('Ranking fetch failed (non-fatal):', e);
        }

        // 3. Load Purchases
        try {
          const { data: purchases } = await db.getUserPurchases(authUser.id);
          if (purchases) {
            setPurchasedItems(purchases);
            // Set current nickname if found in purchases
            const nicknamePurchase = purchases.find(p => p.shop_items?.type === 'nickname');
            if (nicknamePurchase) {
              setCurrentNickname(nicknamePurchase.shop_items.data.nickname);
            }
          }
        } catch (e) {
          console.warn("Purchases fetch failed", e);
        }

      } catch (error) {
        console.error('CRITICAL Error loading user progress:', error);
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

  // Function to update study minutes (Replaces addStudyHours)
  const addStudyMinutes = async (minutes) => {
    if (!authUser?.id) return;

    try {
      await db.updateStudyMinutes(authUser.id, minutes);
      setStudyHours(prev => prev + (minutes / 60.0));
      // Refresh ranking after updating minutes
      const { data: rankingData } = await db.getUserRanking(authUser.id);
      if (rankingData) {
        setUserRank(rankingData);
      }
    } catch (error) {
      console.error('Error updating study minutes:', error);
    }
  };

  // Function to purchase item
  const purchaseItem = async (itemId) => {
    if (!authUser?.id) return { success: false, message: 'User not authenticated' };

    try {
      const { data, error } = await db.purchaseItem(authUser.id, itemId);

      if (error) {
        return { success: false, message: error.message };
      }

      // Refresh coins and purchased items
      const { data: profile } = await db.getUserProfile(authUser.id);
      if (profile) {
        setCoins(profile.coins);
      }

      const { data: purchases } = await db.getUserPurchases(authUser.id);
      if (purchases) {
        setPurchasedItems(purchases);
        // Update nickname if purchased
        const nicknamePurchase = purchases.find(p => p.shop_items?.type === 'nickname');
        if (nicknamePurchase) {
          setCurrentNickname(nicknamePurchase.shop_items.data.nickname);
        }
      }

      return { success: true, message: 'Purchase successful' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const ownsItem = (itemId) => {
    return purchasedItems.some(p => p.item_id === itemId);
  };

  return {
    streak,
    coins,
    studyHours,
    currentNickname,
    userRank,
    purchasedItems,
    hasCompletedToday,
    loading,
    updateStreak,
    updateCoins,
    completeDailyTask,
    spendCoins,
    addStudyMinutes,
    purchaseItem,
    ownsItem
  };
}
