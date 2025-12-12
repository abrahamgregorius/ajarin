import SafeArea from "../../components/SafeArea";
import StreakCoinDisplay from "../../components/StreakCoinDisplay";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { db } from "../../lib";
import { supabase } from "../../lib/supabase";
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';
import { extractYouTubeVideoId, getYouTubeEmbedUrl, isYouTubeUrl } from '../../lib/videoUtils';
import { GraduationCap, ArrowLeft, Play, Clock, CheckCircle, AlertCircle, Bookmark, Flag, Award, Star, MessageCircle, Send, MoreVertical, Edit, Trash2 } from 'lucide-react';

export default function VideoDetail() {
    const { videoId } = useParams();
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [watchTime, setWatchTime] = useState(0);
    const [hasCompleted, setHasCompleted] = useState(false);
    const videoRef = useRef(null);

    // Track minutes watched for coin rewards
    const [minutesWatched, setMinutesWatched] = useState(0);

    // Video stats and rating state
    const [videoStats, setVideoStats] = useState({ total_ratings: 0, average_rating: 0, total_comments: 0 });
    const [userRating, setUserRating] = useState(0);

    // Comments state
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [submittingComment, setSubmittingComment] = useState(false);
    const [ratingLoading, setRatingLoading] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState(null);

    // Use the user progress hook
    const { streak, coins, hasCompletedToday, completeDailyTask, addStudyMinutes, updateCoins, addCoins } = useUserProgress();

    const fetchRatingsAndComments = async () => {
        if (!user) return;

        try {
            // Add timeout to prevent hanging
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

            // Fetch video stats
            const { data: statsData } = await db.getVideoStats(videoId);
            if (statsData) {
                setVideoStats(statsData);
            }

            // Fetch user's rating
            const { data: ratingData } = await db.getUserVideoRating(videoId, user.id);
            if (ratingData) {
                setUserRating(ratingData.rating);
            }

            // Fetch comments
            const { data: commentsData } = await db.getVideoComments(videoId);
            if (commentsData) {
                setComments(commentsData);
            }

            clearTimeout(timeoutId);
        } catch (error) {
            if (error.name === 'AbortError') {
                console.warn('Ratings and comments fetch timed out');
            } else {
                console.error('Error fetching ratings and comments:', error);
            }
        }
    };

    // Handle click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.comment-dropdown')) {
                setOpenDropdownId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                // Add timeout to video fetching
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

                const { data, error } = await db.getVideoById(videoId);

                clearTimeout(timeoutId);

                if (error) throw error;

                if (data) {
                    setVideo(data);
                } else {
                    // Fallback dummy data jika video tidak ditemukan
                    setVideo({
                        id: videoId,
                        title: 'Video Belum Tersedia',
                        video_url: '',
                        status: 'pending',
                        created_at: new Date().toISOString(),
                        topic_id: null
                    });
                }
                setLoading(false);
            } catch (err) {
                if (err.name === 'AbortError') {
                    setError('Timeout: Video loading took too long');
                } else {
                    setError(err.message);
                }
                setLoading(false);
            }
        };

        fetchVideo();
    }, [videoId]);

    // Fetch ratings and comments data
    useEffect(() => {
        fetchRatingsAndComments();

        // Set up real-time subscription for comments
        const commentsSubscription = supabase
            .channel(`video_comments_${videoId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'video_comments',
                    filter: `video_id=eq.${videoId}`
                },
                async (payload) => {
                    console.log('🔔 Real-time comment INSERT:', payload);
                    // Refresh comments when new comment is added
                    const { data: commentsData } = await db.getVideoComments(videoId);
                    if (commentsData) {
                        setComments(commentsData);
                    }

                    // Refresh stats
                    const { data: statsData } = await db.getVideoStats(videoId);
                    if (statsData) {
                        setVideoStats(statsData);
                    }
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'DELETE',
                    schema: 'public',
                    table: 'video_comments',
                    filter: `video_id=eq.${videoId}`
                },
                async (payload) => {
                    console.log('🔔 Real-time comment DELETE:', payload);
                    // Refresh comments when comment is deleted
                    const { data: commentsData } = await db.getVideoComments(videoId);
                    if (commentsData) {
                        setComments(commentsData);
                    }

                    // Refresh stats
                    const { data: statsData } = await db.getVideoStats(videoId);
                    if (statsData) {
                        setVideoStats(statsData);
                    }
                }
            )
            .subscribe((status) => {
                console.log('📡 Comments subscription status:', status);
                if (status === 'SUBSCRIBED') {
                    console.log('✅ Comments real-time subscription active');
                } else if (status === 'CLOSED') {
                    console.log('❌ Comments real-time subscription closed');
                } else if (status === 'CHANNEL_ERROR') {
                    console.log('❌ Comments real-time subscription error');
                }
            });

        // Set up real-time subscription for ratings
        const ratingsSubscription = supabase
            .channel(`video_ratings_${videoId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'video_ratings',
                    filter: `video_id=eq.${videoId}`
                },
                async (payload) => {
                    console.log('🔔 Real-time rating INSERT:', payload);
                    // Refresh user's rating if it's their own
                    if (user && payload.new?.user_id === user.id) {
                        setUserRating(payload.new?.rating || 0);
                    }

                    // Refresh stats
                    const { data: statsData } = await db.getVideoStats(videoId);
                    if (statsData) {
                        setVideoStats(statsData);
                    }
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'video_ratings',
                    filter: `video_id=eq.${videoId}`
                },
                async (payload) => {
                    console.log('🔔 Real-time rating UPDATE:', payload);
                    // Refresh user's rating if it's their own
                    if (user && payload.new?.user_id === user.id) {
                        setUserRating(payload.new?.rating || 0);
                    }

                    // Refresh stats
                    const { data: statsData } = await db.getVideoStats(videoId);
                    if (statsData) {
                        setVideoStats(statsData);
                    }
                }
            )
            .subscribe((status) => {
                console.log('📡 Ratings subscription status:', status);
                if (status === 'SUBSCRIBED') {
                    console.log('✅ Ratings real-time subscription active');
                } else if (status === 'CLOSED') {
                    console.log('❌ Ratings real-time subscription closed');
                } else if (status === 'CHANNEL_ERROR') {
                    console.log('❌ Ratings real-time subscription error');
                }
            });

        return () => {
            console.log('🔌 Unsubscribing from real-time channels');
            commentsSubscription.unsubscribe();
            ratingsSubscription.unsubscribe();
        };
    }, [videoId, user]);

    // Track video watching time (for both YouTube and local videos)
    useEffect(() => {
        if (!video) return;

        let watchInterval;
        let startTime = Date.now();
        let isTracking = false;

        // For YouTube videos, use page visibility and time-based tracking
        if (isYouTubeUrl(video.video_url)) {
            const startTracking = () => {
                if (isTracking) return;
                isTracking = true;
                startTime = Date.now();

                watchInterval = setInterval(() => {
                    // Only count if page is visible (user is actively watching)
                    if (!document.hidden) {
                        const currentTime = (Date.now() - startTime) / 1000 / 60; // Convert to minutes
                        setWatchTime(prev => prev + currentTime);

                        // Track minutes for coin rewards
                        setMinutesWatched(prev => {
                            const newMinutes = prev + currentTime;
                            const fullMinutes = Math.floor(newMinutes);

                            // Award 10 coins for every full minute watched
                            if (fullMinutes > 0) {
                                addCoins(fullMinutes * 10);
                                console.log(`🪙 Awarded ${fullMinutes * 10} coins for ${fullMinutes} minute(s) of watching`);
                            }

                            return newMinutes - fullMinutes; // Keep remainder
                        });

                        startTime = Date.now();
                    }
                }, 10000); // Update every 10 seconds
            };

            const stopTracking = () => {
                if (watchInterval) {
                    clearInterval(watchInterval);
                    watchInterval = null;
                }
                isTracking = false;
            };

            // Start tracking when component mounts (user opens video page)
            startTracking();

            // Handle page visibility changes
            const handleVisibilityChange = () => {
                if (document.hidden) {
                    stopTracking();
                } else {
                    startTracking();
                }
            };

            // Handle before unload (user leaves page)
            const handleBeforeUnload = async () => {
                stopTracking();
                // Save accumulated time when user leaves (minimum 1 minute for YouTube)
                if (watchTime > 1.0) {
                    try {
                        await addStudyMinutes(watchTime);
                    } catch (error) {
                        console.error('Error saving study time on unload:', error);
                    }
                }

                // Award coins for any remaining minutes watched
                if (minutesWatched >= 1.0) {
                    try {
                        const fullMinutes = Math.floor(minutesWatched);
                        await addCoins(fullMinutes * 10);
                        console.log(`🪙 Awarded ${fullMinutes * 10} coins for remaining ${fullMinutes} minute(s) on page leave`);
                    } catch (error) {
                        console.error('Error awarding coins on unload:', error);
                    }
                }
            };

            // Auto-complete for YouTube videos when user scrolls to comments section
            const commentsSectionRef = document.querySelector('[data-comments-section]');
            if (commentsSectionRef) {
                const observer = new IntersectionObserver(
                    async (entries) => {
                        if (entries[0].isIntersecting && watchTime > 2.0 && !hasCompleted) {
                            // User has scrolled to comments and watched for at least 2 minutes
                            await addStudyMinutes(watchTime);
                            await completeDailyTask(10);
                            setHasCompleted(true);
                        }
                    },
                    { threshold: 0.1 }
                );
                observer.observe(commentsSectionRef);

                return () => {
                    observer.disconnect();
                    stopTracking();
                    document.removeEventListener('visibilitychange', handleVisibilityChange);
                    window.removeEventListener('beforeunload', handleBeforeUnload);
                };
            }

            document.addEventListener('visibilitychange', handleVisibilityChange);
            window.addEventListener('beforeunload', handleBeforeUnload);

            return () => {
                stopTracking();
                document.removeEventListener('visibilitychange', handleVisibilityChange);
                window.removeEventListener('beforeunload', handleBeforeUnload);
            };
        } else {
            // For local videos, use video events (existing logic)
            const videoElement = videoRef.current;
            if (!videoElement) return;

            const handlePlay = () => {
                startTime = Date.now();
                watchInterval = setInterval(() => {
                    const currentTime = (Date.now() - startTime) / 1000 / 60; // Convert to minutes
                    setWatchTime(prev => prev + currentTime);

                    // Track minutes for coin rewards
                    setMinutesWatched(prev => {
                        const newMinutes = prev + currentTime;
                        const fullMinutes = Math.floor(newMinutes);

                        // Award 10 coins for every full minute watched
                        if (fullMinutes > 0) {
                            addCoins(fullMinutes * 10);
                            console.log(`🪙 Awarded ${fullMinutes * 10} coins for ${fullMinutes} minute(s) of watching`);
                        }

                        return newMinutes - fullMinutes; // Keep remainder
                    });

                    startTime = Date.now();
                }, 10000); // Update every 10 seconds
            };

            const handlePause = () => {
                if (watchInterval) {
                    clearInterval(watchInterval);
                }
            };

            const handleEnded = async () => {
                if (watchInterval) {
                    clearInterval(watchInterval);
                }

                // Add study minutes (watchTime is already in minutes)
                if (watchTime > 0.1) { // Minimum 6 seconds to count
                    await addStudyMinutes(watchTime);
                }

                // Award coins for any remaining minutes watched
                if (minutesWatched >= 1.0) {
                    const fullMinutes = Math.floor(minutesWatched);
                    await addCoins(fullMinutes * 10);
                    console.log(`🪙 Awarded ${fullMinutes * 10} coins for remaining ${fullMinutes} minute(s) on video end`);
                }

                // Complete daily task and award coins
                if (!hasCompletedToday) {
                    await completeDailyTask(10);
                }

                setHasCompleted(true);
            };

            videoElement.addEventListener('play', handlePlay);
            videoElement.addEventListener('pause', handlePause);
            videoElement.addEventListener('ended', handleEnded);

            return () => {
                if (watchInterval) {
                    clearInterval(watchInterval);
                }
                videoElement.removeEventListener('play', handlePlay);
                videoElement.removeEventListener('pause', handlePause);
                videoElement.removeEventListener('ended', handleEnded);
            };
        }
    }, [videoId, watchTime, hasCompletedToday, addStudyMinutes, completeDailyTask, video, addCoins]);

    // Handle rating submission
    const handleRating = async (rating) => {
        if (!user) return;

        setRatingLoading(true);
        try {
            console.log('⭐ Submitting rating:', rating);
            await db.rateVideo(videoId, user.id, rating);
            setUserRating(rating);

            // Primary: Manual refresh for reliability
            console.log('🔄 Primary: Manual refresh stats');
            const { data: statsData } = await db.getVideoStats(videoId);
            if (statsData) {
                setVideoStats(statsData);
            }

        } catch (error) {
            console.error('❌ Error submitting rating:', error);
        } finally {
            setRatingLoading(false);
        }
    };

    // Handle comment submission
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!user || !newComment.trim()) return;

        setSubmittingComment(true);
        try {
            console.log('📝 Submitting comment:', newComment.trim());
            await db.addVideoComment(videoId, user.id, newComment.trim());
            setNewComment('');

            // Primary: Manual refresh for reliability
            console.log('🔄 Primary: Manual refresh comments and stats');
            const { data: commentsData } = await db.getVideoComments(videoId);
            const { data: statsData } = await db.getVideoStats(videoId);
            if (commentsData) {
                setComments(commentsData);
            }
            if (statsData) {
                setVideoStats(statsData);
            }

        } catch (error) {
            console.error('❌ Error submitting comment:', error);
        } finally {
            setSubmittingComment(false);
        }
    };

    // Handle comment deletion
    const handleDeleteComment = async (commentId) => {
        if (!user) return;

        try {
            console.log('🗑️ Deleting comment:', commentId);
            await db.deleteVideoComment(commentId, user.id);

            // Primary: Manual refresh for reliability
            console.log('🔄 Primary: Manual refresh comments and stats');
            const { data: commentsData } = await db.getVideoComments(videoId);
            const { data: statsData } = await db.getVideoStats(videoId);
            if (commentsData) {
                setComments(commentsData);
            }
            if (statsData) {
                setVideoStats(statsData);
            }

        } catch (error) {
            console.error('❌ Error deleting comment:', error);
        }
    };

    if (authLoading || loading) {
        return (
            <SafeArea className="bg-gray-50 min-h-screen">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                </div>
            </SafeArea>
        );
    }

    if (!user) {
        return (
            <SafeArea className="bg-gray-50 min-h-screen">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🔒</span>
                        </div>
                        <p className="text-gray-600 font-medium">Silakan login untuk melihat video</p>
                        <p className="text-gray-500 text-sm mt-2">Anda perlu masuk ke akun untuk mengakses konten pembelajaran</p>
                        <button
                            onClick={() => navigate('/masuk')}
                            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
                        >
                            Masuk
                        </button>
                    </div>
                </div>
            </SafeArea>
        );
    }

    if (error) {
        return (
            <SafeArea className="bg-gray-50 min-h-screen">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">⚠️</span>
                        </div>
                        <p className="text-red-500 font-medium">Terjadi kesalahan: {error}</p>
                        <p className="text-gray-500 text-sm mt-2">Silakan coba lagi</p>
                    </div>
                </div>
            </SafeArea>
        );
    }

    if (!video) {
        return (
            <SafeArea className="bg-gray-50 min-h-screen">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Play size={32} className="text-gray-400" />
                        </div>
                        <p className="text-gray-600 font-medium">Video tidak ditemukan</p>
                        <p className="text-gray-500 text-sm mt-2">Video sedang diproses</p>
                    </div>
                </div>
            </SafeArea>
        );
    }

    return (
        <SafeArea className="bg-gray-50 min-h-screen">
            {/* Top App Bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-lg">
                            <ArrowLeft size={24} className="text-gray-600" />
                        </button>
                        <GraduationCap size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">AJARIN</h1>
                    </div>
                    <StreakCoinDisplay streak={streak} coins={coins} hasCompletedToday={hasCompletedToday} />
                </div>
            </div>

            {/* Video Title */}
            <div className="bg-white mx-4 mt-4 rounded-lg p-4 shadow-md">
                <h1 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Guru AJARIN</span>
                    <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>15:30</span>
                    </div>
                    {video.status === 'verified' && (
                        <div className="flex items-center space-x-1 text-green-600">
                            <CheckCircle size={14} />
                            <span>Terverifikasi</span>
                        </div>
                    )}
                    {video.status === 'pending' && (
                        <div className="flex items-center space-x-1 text-yellow-600">
                            <AlertCircle size={14} />
                            <span>Menunggu Verifikasi</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Video Player */}
            <div className="mx-4 mt-4">
                <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-sm">
                    {video.video_url ? (
                        isYouTubeUrl(video.video_url) ? (
                            // YouTube embed
                            (() => {
                                const videoId = extractYouTubeVideoId(video.video_url);
                                return videoId ? (
                                    <iframe
                                        src={getYouTubeEmbedUrl(videoId)}
                                        title={video.title || "YouTube Video"}
                                        className="w-full h-full"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <div className="text-center">
                                            <Play size={48} className="text-gray-400 mx-auto mb-2" />
                                            <p className="text-gray-600">Format URL YouTube tidak valid</p>
                                        </div>
                                    </div>
                                );
                            })()
                        ) : (
                            // Regular video file
                            <video
                                ref={videoRef}
                                src={video.video_url}
                                controls
                                className="w-full h-full object-cover"
                                poster="https://via.placeholder.com/640x360?text=Video+Player"
                            />
                        )
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <div className="text-center">
                                <Play size={48} className="text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-600">Video belum tersedia</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Completion Status */}
                {hasCompleted && (
                    <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                            <Award size={20} className="text-green-600" />
                            <span className="text-green-700 font-medium">Video selesai! +10 koin bonus harian</span>
                        </div>
                    </div>
                )}

                {!hasCompleted && isYouTubeUrl(video.video_url) && (
                    <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Play size={20} className="text-blue-600" />
                                <span className="text-blue-700 font-medium">Video AJARIN - Pelajari dengan baik!</span>
                            </div>
                            <button
                                onClick={async () => {
                                    if (watchTime > 0.1) {
                                        await addStudyMinutes(watchTime);

                                        // Award coins for any remaining minutes watched
                                        if (minutesWatched >= 1.0) {
                                            const fullMinutes = Math.floor(minutesWatched);
                                            await addCoins(fullMinutes * 10);
                                            console.log(`🪙 Awarded ${fullMinutes * 10} coins for ${fullMinutes} minute(s) on manual completion`);
                                        }

                                        await completeDailyTask(10);
                                        setHasCompleted(true);
                                    }
                                }}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                            >
                                Selesai Menonton
                            </button>
                        </div>
                        <p className="text-blue-600 text-sm mt-1">
                            Dapatkan 10 koin setiap menit menonton! Waktu menonton tercatat otomatis.
                        </p>
                        {watchTime > 0 && (
                            <p className="text-blue-600 text-xs mt-1">
                                Waktu menonton: {Math.round(watchTime * 10) / 10} menit • Koin didapat: {Math.floor(minutesWatched) * 10}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="mx-4 mt-4 mb-20">
                {/* Description Section */}
                {video.description && (
                    <div className="bg-white rounded-lg p-4 shadow-md mb-4">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">Deskripsi</h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{video.description}</p>
                    </div>
                )}

                {/* Rating Section */}
                <div className="bg-white rounded-lg p-4 shadow-md">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Rating Video</h2>
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => handleRating(star)}
                                    disabled={ratingLoading || !user}
                                    className={`p-1 ${ratingLoading ? 'opacity-50' : 'hover:scale-110'} transition-transform`}
                                >
                                    <Star
                                        size={24}
                                        className={`${star <= (userRating || 0)
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-300'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        <div className="text-sm text-gray-600">
                            {videoStats.total_ratings > 0 ? (
                                <span>
                                    {videoStats.average_rating.toFixed(1)}/5 ({videoStats.total_ratings} rating{videoStats.total_ratings !== 1 ? 's' : ''})
                                </span>
                            ) : (
                                <span>Belum ada rating</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white rounded-lg p-4 shadow-md" data-comments-section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Komentar</h2>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <MessageCircle size={16} />
                            <span>{videoStats.total_comments}</span>
                        </div>
                    </div>

                    {/* Add Comment Form */}
                    {user && (
                        <form onSubmit={handleCommentSubmit} className="mb-4">
                            <div className="flex space-x-3">
                                <div className="flex-1">
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Tulis komentar Anda..."
                                        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        rows={3}
                                        maxLength={500}
                                    />
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-xs text-gray-500">{newComment.length}/500</span>
                                        <button
                                            type="submit"
                                            disabled={submittingComment || !newComment.trim()}
                                            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <Send size={16} />
                                            <span>{submittingComment ? 'Mengirim...' : 'Kirim'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}

                    {/* Comments List */}
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                                        {comment.profiles?.avatar_url ? (
                                            <img
                                                src={comment.profiles.avatar_url}
                                                alt={comment.profiles?.full_name || 'User'}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.parentElement.innerHTML = `<div class="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center"><span class="text-sm font-medium text-white">${(comment.profiles?.full_name || 'User').charAt(0).toUpperCase()}</span></div>`;
                                                }}
                                            />
                                        ) : (
                                            <span className="text-sm font-medium text-white">
                                                {(comment.profiles?.full_name || 'User').charAt(0).toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <span className="font-medium text-gray-900">
                                                    {comment.profiles?.full_name || 'User'}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {new Date(comment.created_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>
                                            {user && comment.user_id === user.id && (
                                                <div className="relative comment-dropdown">
                                                    <button
                                                        onClick={() => setOpenDropdownId(openDropdownId === comment.id ? null : comment.id)}
                                                        className="p-1 hover:bg-gray-100 rounded"
                                                    >
                                                        <MoreVertical size={16} className="text-gray-400" />
                                                    </button>
                                                    {openDropdownId === comment.id && (
                                                        <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                                            <button
                                                                onClick={() => {
                                                                    handleDeleteComment(comment.id);
                                                                    setOpenDropdownId(null);
                                                                }}
                                                                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                                                            >
                                                                <Trash2 size={14} />
                                                                <span>Hapus</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-gray-700 mt-1">{comment.comment_text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {comments.length === 0 && (
                            <div className="text-center py-8">
                                <MessageCircle size={48} className="text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">Belum ada komentar</p>
                                <p className="text-sm text-gray-400">Jadilah yang pertama berkomentar!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mx-4 mb-6">
                <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex space-x-3">
                        <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                            <Bookmark size={20} />
                            <span>Simpan</span>
                        </button>
                        <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2">
                            <Flag size={20} />
                            <span>Laporkan</span>
                        </button>
                    </div>
                </div>
            </div>
        </SafeArea>
    )
}