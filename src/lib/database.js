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

// Get videos for a specific topic (only approved videos)
export async function getVideosByTopic(topicId) {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("topic_id", topicId)
    .eq("approved", true);
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
    .select(`
            id,
            full_name,
            study_hours,
            grade,
            school,
            streak,
            coins,
            user_purchases (
                shop_items (
                    type,
                    data
                )
            )
        `)
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

export async function updateStudyMinutes(userId, additionalMinutes) {
  const { data, error } = await supabase.rpc('increment_study_minutes', {
    p_user_id: userId,
    p_minutes: additionalMinutes
  });
  return { data, error };
}

// Get today's highlights statistics
export async function getTodaysHighlights() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    // Get students who studied today (based on profiles updated today)
    const { count: activeStudents, error: studentsError } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("updated_at", today.toISOString())
      .lt("updated_at", tomorrow.toISOString());

    // Get total study hours today (sum of study_hours for profiles updated today)
    const { data: studyHoursData, error: hoursError } = await supabase
      .from("profiles")
      .select("study_hours")
      .gte("updated_at", today.toISOString())
      .lt("updated_at", tomorrow.toISOString());

    const totalStudyHours = studyHoursData?.reduce((sum, profile) => sum + (profile.study_hours || 0), 0) || 0;

    // Get purchases made today
    const { count: todaysPurchases, error: purchasesError } = await supabase
      .from("user_purchases")
      .select("*", { count: "exact", head: true })
      .gte("purchased_at", today.toISOString())
      .lt("purchased_at", tomorrow.toISOString());

    // Get total active users (all profiles)
    const { count: totalUsers, error: totalError } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    if (studentsError || hoursError || purchasesError || totalError) {
      console.error("Error fetching today's highlights:", { studentsError, hoursError, purchasesError, totalError });
      return {
        data: {
          activeStudents: 0,
          totalStudyHours: 0,
          todaysPurchases: 0,
          totalUsers: 0
        },
        error: studentsError || hoursError || purchasesError || totalError
      };
    }

    return {
      data: {
        activeStudents: activeStudents || 0,
        totalStudyHours: Math.round(totalStudyHours * 10) / 10, // Round to 1 decimal
        todaysPurchases: todaysPurchases || 0,
        totalUsers: totalUsers || 0
      },
      error: null
    };
  } catch (error) {
    console.error("Error in getTodaysHighlights:", error);
    return {
      data: {
        activeStudents: 0,
        totalStudyHours: 0,
        todaysPurchases: 0,
        totalUsers: 0
      },
      error
    };
  }
}

// Video Ratings and Comments functions
export async function getVideoStats(videoId) {
  const { data, error } = await supabase
    .from("video_stats")
    .select("*")
    .eq("video_id", videoId)
    .single();
  return { data, error };
}

export async function getUserVideoRating(videoId, userId) {
  const { data, error } = await supabase
    .from("video_ratings")
    .select("*")
    .eq("video_id", videoId)
    .eq("user_id", userId)
    .single();
  return { data, error };
}

export async function rateVideo(videoId, userId, rating) {
  const { data, error } = await supabase
    .from("video_ratings")
    .upsert({
      video_id: videoId,
      user_id: userId,
      rating: rating,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'video_id,user_id'
    });
  return { data, error };
}

export async function getVideoComments(videoId, limit = 50) {
  const { data, error } = await supabase
    .from("video_comments")
    .select(`
            *        `)
    .eq("video_id", videoId)
    .order("created_at", { ascending: false })
    .limit(limit);
    console.log(data)
  return { data, error };
}

export async function addVideoComment(videoId, userId, commentText) {
  const { data, error } = await supabase
    .from("video_comments")
    .insert({
      video_id: videoId,
      user_id: userId,
      comment_text: commentText
    });
  return { data, error };
}

export async function updateVideoComment(commentId, userId, commentText) {
  const { data, error } = await supabase
    .from("video_comments")
    .update({
      comment_text: commentText,
      updated_at: new Date().toISOString()
    })
    .eq("id", commentId)
    .eq("user_id", userId);
  return { data, error };
}

export async function deleteVideoComment(commentId, userId) {
  const { data, error } = await supabase
    .from("video_comments")
    .delete()
    .eq("id", commentId)
    .eq("user_id", userId);
  return { data, error };
}

// Get user statistics for profile
export async function getUserStatistics(userId) {
  try {
    // Get total study hours from profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("study_hours")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Error fetching profile:", profileError);
      return { data: { totalHours: 0, completedVideos: 0 }, error: profileError };
    }

    // Count completed videos (videos user has rated or commented on)
    const { count: ratedVideos, error: ratingError } = await supabase
      .from("video_ratings")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    const { count: commentedVideos, error: commentError } = await supabase
      .from("video_comments")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    // Use the higher count between rated and commented videos as "completed"
    const completedVideos = Math.max(ratedVideos || 0, commentedVideos || 0);

    if (ratingError || commentError) {
      console.error("Error fetching user statistics:", { ratingError, commentError });
    }

    return {
      data: {
        totalHours: Math.round((profile?.study_hours || 0) * 60 * 10) / 10, // Convert hours to minutes and round to 1 decimal
        completedVideos: completedVideos
      },
      error: null
    };
  } catch (error) {
    return {
      data: {
        totalHours: 0,
        completedVideos: 0
      },
      error
    };
  }
}
// Admin Video Moderation Functions
export async function getPendingVideos() {
  const { data, error } = await supabase
    .from("videos")
    .select(`
      *,
      profiles!videos_creator_id_fkey (full_name, email),
      topics (
        name,
        materials (
          name,
          subjects (
            name,
            classes (
              name
            )
          )
        )
      )
    `)
    .eq("approved", false)
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function getAllVideos(approvedOnly = false) {
  let query = supabase
    .from("videos")
    .select(`
      *,
      profiles!videos_creator_id_fkey (full_name, email),
      topics (
        name,
        materials (
          name,
          subjects (
            name,
            classes (
              name
            )
          )
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (approvedOnly) {
    query = query.eq("approved", true);
  }

  const { data, error } = await query;
  return { data, error };
}

export async function approveVideo(videoId) {
  const { data, error } = await supabase
    .from("videos")
    .update({ approved: true, updated_at: new Date().toISOString() })
    .eq("id", videoId);
  return { data, error };
}

export async function rejectVideo(videoId) {
  // Rejecting implies deleting the submission or setting status.
  // Based on "Tolak dan hapus video ini?", we delete it.
  const { data, error } = await supabase
    .from("videos")
    .delete()
    .eq("id", videoId);
  return { data, error };
}

// Creator Video Functions
export async function submitVideo(videoData) {
  // We need to ensure creator_id is attached.
  // If not passed in videoData, we try to get it from current session.
  let userId = videoData.user_id || videoData.creator_id;
  if (!userId) {
    const { data: { session } } = await supabase.auth.getSession();
    userId = session?.user?.id;
  }

  // Remove user_id from videoData if it exists to avoid confusion/errors if we are using creator_id
  const { user_id, ...rest } = videoData;

  const { data, error } = await supabase
    .from("videos")
    .insert([
      {
        ...rest,
        creator_id: userId,
        approved: false
      }
    ]);
  return { data, error };
}

export async function getCreatorVideos(userId) {
  const { data, error } = await supabase
    .from("videos")
    .select(`
      *,
      topics (
        name,
        materials (
          name,
          subjects (
            name,
            classes (
              name
            )
          )
        )
      )
    `)
    .eq("creator_id", userId)
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function deleteVideo(videoId) {
  const { data, error } = await supabase
    .from("videos")
    .delete()
    .eq("id", videoId);
  return { data, error };
}

// Get popular topics based on video count
export async function getPopularTopics(limit = 10) {
  try {
    // Get topics with their video counts and related class/subject info
    const { data, error } = await supabase
      .from("topics")
      .select(`
        id,
        name,
        materials (
          name,
          subjects (
            name,
            classes (
              name
            )
          )
        ),
        videos!inner (
          id,
          approved
        )
      `)
      .eq("videos.approved", true)
      .order("name");

    if (error) {
      console.error("Error fetching topics:", error);
      return { data: [], error };
    }

    // Group by topic and count videos
    const topicMap = new Map();

    data.forEach(item => {
      const topicId = item.id;
      if (!topicMap.has(topicId)) {
        topicMap.set(topicId, {
          id: item.id,
          name: item.name,
          material: item.materials?.name || 'Unknown',
          subject: item.materials?.subjects?.name || 'Unknown',
          class: item.materials?.subjects?.classes?.name || 'Unknown',
          videos: 0
        });
      }
      topicMap.get(topicId).videos += 1;
    });

    // Convert to array and sort by video count (descending)
    const popularTopics = Array.from(topicMap.values())
      .sort((a, b) => b.videos - a.videos)
      .slice(0, limit);

    return { data: popularTopics, error: null };
  } catch (error) {
    console.error("Error in getPopularTopics:", error);
    return { data: [], error };
  }
}
