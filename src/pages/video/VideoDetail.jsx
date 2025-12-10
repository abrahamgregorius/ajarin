import SafeArea from "../../components/SafeArea";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../lib";
import { GraduationCap, ArrowLeft, Play, Clock, CheckCircle, AlertCircle, Bookmark, Flag } from 'lucide-react';

export default function VideoDetail() {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const { data, error } = await db.getVideoById(videoId);
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
                setError(err.message);
                setLoading(false);
            }
        };

        fetchVideo();
    }, [videoId]);

    if (loading) {
        return (
            <SafeArea className="bg-gray-50 min-h-screen">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
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
                        <Link to="/kelas" className="p-1 hover:bg-gray-100 rounded-lg">
                            <ArrowLeft size={24} className="text-gray-600" />
                        </Link>
                        <GraduationCap size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">AJARIN</h1>
                    </div>
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
                        <video
                            src={video.video_url}
                            controls
                            className="w-full h-full object-cover"
                            poster="https://via.placeholder.com/640x360?text=Video+Player"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <div className="text-center">
                                <Play size={48} className="text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-600">Video belum tersedia</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="mx-4 mt-4 mb-20">
                <div className="bg-white rounded-lg p-4 shadow-md">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Konten Pelajaran</h2>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-gray-700">Materi pembelajaran interaktif</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle size={16} className="text-blue-500" />
                            <span className="text-gray-700">Penjelasan mudah dipahami</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle size={16} className="text-purple-500" />
                            <span className="text-gray-700">Contoh soal praktis</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="fixed bottom-4 left-4 right-4 flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <Bookmark size={20} />
                    <span>Simpan</span>
                </button>
                <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2">
                    <Flag size={20} />
                    <span>Laporkan</span>
                </button>
            </div>
        </SafeArea>
    )
}