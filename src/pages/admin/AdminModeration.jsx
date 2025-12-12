import { useEffect, useState } from 'react';

import { GraduationCap } from 'lucide-react';
import SafeArea from '../../components/SafeArea';
import StreakCoinDisplay from '../../components/StreakCoinDisplay';
import { useAuth } from '../../contexts/AuthContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { approveVideo, getAllVideos, getPendingVideos, rejectVideo } from '../../lib/database';

const AdminModeration = () => {
    const { user } = useAuth();
    const [videos, setVideos] = useState([]);
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('pending'); // pending, approved, all
    const [searchQuery, setSearchQuery] = useState('');
    const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 });
    const { streak, coins, hasCompletedToday } = useUserProgress();

    useEffect(() => {
        loadVideos();
    }, [filter]);

    useEffect(() => {
        filterVideos();
    }, [videos, searchQuery]);

    const loadVideos = async () => {
        setLoading(true);
        let data, error;

        if (filter === 'pending') {
            ({ data, error } = await getPendingVideos());
        } else if (filter === 'approved') {
            ({ data, error } = await getAllVideos(true));
        } else {
            ({ data, error } = await getAllVideos());
        }

        if (error) {
            console.error('Load videos error:', error);
            setError('Gagal memuat video: ' + (error.message || JSON.stringify(error)));
        } else {
            setVideos(data || []);
            calculateStats(data || []);
        }
        setLoading(false);
    };

    const calculateStats = (allVideos) => {
        const pending = allVideos.filter(v => !v.approved).length;
        const approved = allVideos.filter(v => v.approved).length;
        setStats({ pending, approved, rejected: 0 });
    };

    const filterVideos = () => {
        let filtered = videos;

        if (searchQuery) {
            filtered = filtered.filter(v =>
                v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                v.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredVideos(filtered);
    };

    const handleApprove = async (videoId) => {
        if (!confirm('Setujui video ini?')) return;

        const { error } = await approveVideo(videoId);
        if (error) {
            alert('Gagal menyetujui video: ' + error.message);
        } else {
            alert('Video berhasil disetujui!');
            loadVideos();
        }
    };

    const handleReject = async (videoId) => {
        if (!confirm('Tolak dan hapus video ini? Tindakan ini tidak dapat dibatalkan.')) return;

        const { error } = await rejectVideo(videoId);
        if (error) {
            alert('Gagal menolak video: ' + error.message);
        } else {
            alert('Video berhasil ditolak dan dihapus!');
            loadVideos();
        }
    };

    const getYouTubeThumbnail = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        const videoId = (match && match[2].length === 11) ? match[2] : null;
        return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;
    };

    const getCurriculumPath = (video) => {
        if (!video.topics) return 'N/A';
        const topic = video.topics;
        const material = topic.materials;
        const subject = material?.subjects;
        const cls = subject?.classes;

        return `${cls?.name || '-'} › ${subject?.name || '-'} › ${material?.name || '-'} › ${topic.name || '-'}`;
    };

    if (loading) {
        return (
            <SafeArea>
                <div className="min-h-screen bg-gray-50">

                    <div className="flex items-center justify-center h-screen">
                        <div className="text-center">
                            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-gray-600">Memuat video...</p>
                        </div>
                    </div>
                </div>
            </SafeArea>
        );
    }

    return (
        <SafeArea>
            <div className="min-h-screen bg-gray-50 pb-20">
                {/* Top App Bar */}
                <div className="bg-white shadow-sm border-b">
                    <div className="px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <GraduationCap size={28} className="text-blue-600" />
                            <h1 className="text-xl font-bold text-gray-900">Moderation</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            {/* Streak and Coin Display */}
                            <StreakCoinDisplay
                                streak={streak}
                                coins={coins}
                                hasCompletedToday={hasCompletedToday}
                            />
                        </div>
                    </div>
                </div>


                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Moderasi Video</h1>
                        <p className="text-gray-600 mt-1">Kelola dan moderasi video yang disubmit oleh creator</p>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-yellow-700 text-sm font-medium">Pending</p>
                                    <p className="text-3xl font-bold text-yellow-900 mt-1">{stats.pending}</p>
                                </div>
                                <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-700 text-sm font-medium">Disetujui</p>
                                    <p className="text-3xl font-bold text-green-900 mt-1">{stats.approved}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-700 text-sm font-medium">Total Video</p>
                                    <p className="text-3xl font-bold text-blue-900 mt-1">{stats.pending + stats.approved}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                            {error}
                        </div>
                    )}

                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Cari video atau creator..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setFilter('pending')}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${
                                        filter === 'pending'
                                            ? 'bg-yellow-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    Pending
                                </button>
                                <button
                                    onClick={() => setFilter('approved')}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${
                                        filter === 'approved'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    Disetujui
                                </button>
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${
                                        filter === 'all'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    Semua
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Video List */}
                    {filteredVideos.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada video</h3>
                            <p className="text-gray-600">
                                {searchQuery ? 'Tidak ada video yang cocok dengan pencarian Anda' : 'Tidak ada video untuk dimoderasikan'}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredVideos.map((video) => (
                                <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                                    <div className="md:flex">
                                        {/* Thumbnail */}
                                        <div className="md:w-80 relative">
                                            <img
                                                src={getYouTubeThumbnail(video.youtube_url)}
                                                alt={video.title}
                                                className="w-full h-48 md:h-full object-cover"
                                            />
                                            <div className="absolute top-2 left-2">
                                                {video.approved ? (
                                                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                        Disetujui
                                                    </span>
                                                ) : (
                                                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                        Pending
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 p-6">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h3>
                                                    <p className="text-gray-600 mb-3">{video.description}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <span>Creator: <strong>{video.profiles?.full_name || video.profiles?.email || 'Unknown'}</strong></span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                    </svg>
                                                    <span className="truncate">{getCurriculumPath(video)}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>Durasi: {video.duration} menit | Disubmit: {new Date(video.created_at).toLocaleDateString('id-ID')}</span>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex flex-wrap gap-2">
                                                <a
                                                    href={video.youtube_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                                                >
                                                    Lihat Video
                                                </a>
                                                {!video.approved && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(video.id)}
                                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                                                        >
                                                            ✓ Setujui
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(video.id)}
                                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                                                        >
                                                            ✕ Tolak
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>


            </div>
        </SafeArea>
    );
};

export default AdminModeration;
