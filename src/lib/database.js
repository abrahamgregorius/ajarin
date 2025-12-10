import { supabase } from "./supabase";

// Get all classes
export async function getClasses() {
    const { data, error } = await supabase
        .from("classes")
        .select("*")
        .order("id");
    return { data, error };
}

// Get subjects for a specific class
export async function getSubjectsByClass(classId) {
    const { data, error } = await supabase
        .from("subjects")
        .select("*")
        .eq("class_id", classId);
    return { data, error };
}

// Get materials for a specific subject
export async function getMaterialsBySubject(subjectId) {
    const { data, error } = await supabase
        .from("materials")
        .select("*")
        .eq("subject_id", subjectId);
    return { data, error };
}

// Get topics for a specific material
export async function getTopicsByMaterial(materialId) {
    const { data, error } = await supabase
        .from("topics")
        .select("*")
        .eq("material_id", materialId);
    return { data, error };
}

// Get videos for a specific topic
export async function getVideosByTopic(topicId) {
    const { data, error } = await supabase
        .from("videos")
        .select("*")
        .eq("topic_id", topicId);
    return { data, error };
}

// Get video by ID
export async function getVideoById(videoId) {
    const { data, error } = await supabase
        .from("videos")
        .select("*")
        .eq("id", videoId)
        .single();
    return { data, error };
}

// Search videos
export async function searchVideos(query) {
    const { data, error } = await supabase
        .from("videos")
        .select("*")
        .ilike("title", `%${query}%`);
    return { data, error };
}

// Get user profile
export async function getUserProfile(userId) {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
    return { data, error };
}

// Update user profile (upsert - create if doesn't exist, update if exists)
export async function updateUserProfile(userId, updates) {
    const { data, error } = await supabase
        .from("profiles")
        .upsert({
            id: userId,
            ...updates,
            updated_at: new Date().toISOString()
        }, {
            onConflict: 'id'
        });
    return { data, error };
}

// Shop functions
export async function getShopItems() {
    const { data, error } = await supabase
        .from("shop_items")
        .select("*")
        .eq("is_active", true)
        .order("price");
    return { data, error };
}

export async function getUserPurchases(userId) {
    const { data, error } = await supabase
        .from("user_purchases")
        .select(`
            *,
            shop_items (*)
        `)
        .eq("user_id", userId);
    return { data, error };
}

export async function purchaseItem(userId, itemId) {
    // First check if user already owns this item
    const { data: existingPurchase } = await supabase
        .from("user_purchases")
        .select("id")
        .eq("user_id", userId)
        .eq("item_id", itemId)
        .single();

    if (existingPurchase) {
        throw new Error("Item sudah dimiliki");
    }

    // Get item price
    const { data: item, error: itemError } = await supabase
        .from("shop_items")
        .select("price")
        .eq("id", itemId)
        .single();

    if (itemError || !item) {
        throw new Error("Item tidak ditemukan");
    }

    // Get user coins
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("coins")
        .eq("id", userId)
        .single();

    if (profileError || !profile) {
        throw new Error("Profile tidak ditemukan");
    }

    if (profile.coins < item.price) {
        throw new Error("Koin tidak cukup");
    }

    // Deduct coins and create purchase in a transaction
    const { data, error } = await supabase.rpc('purchase_item', {
        p_user_id: userId,
        p_item_id: itemId,
        p_price: item.price
    });

    return { data, error };
}

// Ranking functions
export async function getRanking(limit = 50) {
    const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, study_hours, grade, school, streak, coins")
        .order("study_hours", { ascending: false })
        .limit(limit);
    return { data, error };
}

export async function getUserRanking(userId) {
    // Get user's study hours
    const { data: userProfile, error: userError } = await supabase
        .from("profiles")
        .select("study_hours")
        .eq("id", userId)
        .single();

    if (userError || !userProfile) {
        return { data: null, error: userError };
    }

    // Count how many users have more study hours
    const { count, error } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .gt("study_hours", userProfile.study_hours);

    return { data: { rank: (count || 0) + 1, study_hours: userProfile.study_hours }, error };
}

export async function updateStudyHours(userId, additionalHours) {
    const { data, error } = await supabase.rpc('increment_study_hours', {
        p_user_id: userId,
        p_hours: additionalHours
    });
    return { data, error };
}
