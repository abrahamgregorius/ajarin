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
        <SafeArea className="bg-gray-50 min-h-screen">
            {/* Top App Bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <GraduationCap size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">Moderasi Video</h1>
                    </div>
                    <StreakCoinDisplay
                        streak={streak}
                        coins={coins}
                        hasCompletedToday={hasCompletedToday}
                    />
                </div>
            </div>

            <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center justify-between">
                         <div>
                            <p className="text-yellow-700 text-xs font-bold uppercase tracking-wider">Pending</p>
                            <p className="text-2xl font-bold text-yellow-900 mt-1">{stats.pending}</p>
                        </div>
                         <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                            <span className="text-yellow-700 font-bold">P</span>
                        </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
                         <div>
                            <p className="text-green-700 text-xs font-bold uppercase tracking-wider">Disetujui</p>
                            <p className="text-2xl font-bold text-green-900 mt-1">{stats.approved}</p>
                        </div>
                         <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                            <span className="text-green-700 font-bold">✓</span>
                        </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
                         <div>
                            <p className="text-blue-700 text-xs font-bold uppercase tracking-wider">Total</p>
                            <p className="text-2xl font-bold text-blue-900 mt-1">{stats.pending + stats.approved}</p>
                        </div>
                         <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                            <span className="text-blue-700 font-bold">Total</span>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center text-red-700">
                         <span className="text-sm font-medium">{error}</span>
                    </div>
                )}

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Cari video atau creator..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                            <button
                                onClick={() => setFilter('pending')}
                                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                                    filter === 'pending'
                                        ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                                }`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => setFilter('approved')}
                                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                                    filter === 'approved'
                                        ? 'bg-green-100 text-green-700 border border-green-200'
                                        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                                }`}
                            >
                                Disetujui
                            </button>
                             <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                                    filter === 'all'
                                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                                }`}
                            >
                                Semua
                            </button>
                        </div>
                    </div>
                </div>

                {/* Video List */}
                {filteredVideos.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                             <GraduationCap size={40} className="text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada video</h3>
                         <p className="text-gray-500 max-w-md mx-auto">
                            {searchQuery ? 'Tidak ada video yang cocok dengan pencarian Anda' : 'Tidak ada video dalam kategori ini'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVideos.map((video) => (
                            <div key={video.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">
                                {/* Thumbnail */}
                                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                                     <img
                                        src={getYouTubeThumbnail(video.youtube_url)}
                                        alt={video.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                                    <div className="absolute top-3 right-3">
                                        {video.approved ? (
                                            <span className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-green-400">
                                                Disetujui
                                            </span>
                                        ) : (
                                            <span className="bg-yellow-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-yellow-400">
                                                Pending
                                            </span>
                                        )}
                                    </div>
                                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                                        {video.duration} mnt
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="mb-2">
                                         <h3 className="font-bold text-gray-900 line-clamp-2 text-lg group-hover:text-blue-600 transition-colors" title={video.title}>{video.title}</h3>
                                         <p className="text-xs text-gray-500 mt-1">Oleh: {video.profiles?.full_name || video.profiles?.email || 'Unknown'}</p>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{video.description}</p>

                                    <div className="mt-auto pt-4 border-t border-gray-50 space-y-3">
                                        <div className="text-xs text-gray-400 font-medium">
                                            <p className="line-clamp-1 truncate" title={getCurriculumPath(video)}>
                                                {getCurriculumPath(video)}
                                            </p>
                                        </div>

                                         <div className="flex items-center justify-between text-xs text-gray-400">
                                            <span>{new Date(video.created_at).toLocaleDateString('id-ID')}</span>
                                        </div>

                                        {/* Actions */}
                                        <div className="grid grid-cols-2 gap-3 pt-2">
                                            <a
                                                href={video.youtube_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="col-span-2 flex items-center justify-center py-2.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition text-sm font-semibold border border-gray-200"
                                            >
                                                Tonton
                                            </a>
                                            {!video.approved && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(video.id)}
                                                        className="flex items-center justify-center py-2.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition text-sm font-semibold border border-green-100"
                                                    >
                                                        Setujui
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(video.id)}
                                                        className="flex items-center justify-center py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-semibold border border-red-100"
                                                    >
                                                        Tolak
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
        </SafeArea>
    );
};

export default AdminModeration;
