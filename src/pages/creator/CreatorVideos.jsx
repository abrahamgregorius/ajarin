import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { GraduationCap } from 'lucide-react';
import SafeArea from '../../components/SafeArea';
import StreakCoinDisplay from '../../components/StreakCoinDisplay';
import { useAuth } from '../../contexts/AuthContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { deleteVideo, getCreatorVideos } from '../../lib/database';

const CreatorVideos = () => {
    const { user } = useAuth();
    const [videos, setVideos] = useState([]);
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
    const [searchQuery, setSearchQuery] = useState('');
    const { streak, coins, hasCompletedToday } = useUserProgress();

    useEffect(() => {
        loadVideos();
    }, [user]);

    useEffect(() => {
        filterVideos();
    }, [videos, filter, searchQuery]);

    const loadVideos = async () => {
        if (!user) return;

        setLoading(true);
        const { data, error } = await getCreatorVideos(user.id);

        if (error) {
            setError('Gagal memuat video');
        } else {
            setVideos(data || []);
        }
        setLoading(false);
    };

    const filterVideos = () => {
        let filtered = videos;

        // Filter by status
        if (filter === 'pending') {
            filtered = filtered.filter(v => !v.approved);
        } else if (filter === 'approved') {
            filtered = filtered.filter(v => v.approved);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(v =>
                v.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredVideos(filtered);
    };

    const handleDelete = async (videoId) => {
        if (!confirm('Apakah Anda yakin ingin menghapus video ini?')) return;

        const { error } = await deleteVideo(videoId);
        if (error) {
            alert('Gagal menghapus video: ' + error.message);
        } else {
            loadVideos(); // Reload videos
        }
    };

    const getYouTubeThumbnail = (url) => {
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

        return `${cls?.name || '-'} / ${subject?.name || '-'} / ${material?.name || '-'} / ${topic.name || '-'}`;
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
                            <h1 className="text-xl font-bold text-gray-900">Your Videos</h1>
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
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Video Saya</h1>
                            <p className="text-gray-600 mt-1">Kelola video yang Anda submit</p>
                        </div>
                        <Link
                            to="/creator/upload"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            + Submit Video Baru
                        </Link>
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
                                    placeholder="Cari video..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="flex gap-2">
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
                            <p className="text-gray-600 mb-6">
                                {searchQuery ? 'Tidak ada video yang cocok dengan pencarian Anda' : 'Anda belum submit video apapun'}
                            </p>
                            {!searchQuery && (
                                <Link
                                    to="/creator/upload"
                                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                                >
                                    Submit Video Pertama
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredVideos.map((video) => (
                                <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                                    {/* Thumbnail */}
                                    <div className="relative">
                                        <img
                                            src={getYouTubeThumbnail(video.youtube_url)}
                                            alt={video.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-2 right-2">
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
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>

                                        <div className="text-xs text-gray-500 mb-3">
                                            <p className="line-clamp-1">{getCurriculumPath(video)}</p>
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <span>{video.duration} menit</span>
                                            <span>{new Date(video.created_at).toLocaleDateString('id-ID')}</span>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <a
                                                href={video.youtube_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 text-center py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                                            >
                                                Lihat
                                            </a>
                                            {!video.approved && (
                                                <button
                                                    onClick={() => handleDelete(video.id)}
                                                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-medium"
                                                >
                                                    Hapus
                                                </button>
                                            )}
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

export default CreatorVideos;
