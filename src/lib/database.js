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

// Update user profile
export async function updateUserProfile(userId, updates) {
    const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", userId);
    return { data, error };
}
