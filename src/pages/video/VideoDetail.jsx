import SafeArea from "../../components/SafeArea";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../lib";

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
            <SafeArea className="">
                <div className="text-center py-12">
                    <div className="inline-block animate-spin text-4xl mb-4">🔄</div>
                    <p className="text-gray-600 font-medium">Memuat video seru... 🎬</p>
                </div>
            </SafeArea>
        );
    }

    if (error) {
        return (
            <SafeArea className="">
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">😵</div>
                    <p className="text-red-500 font-medium">Ups! Ada kesalahan: {error}</p>
                    <p className="text-gray-500 text-sm mt-2">Coba refresh halaman ya! 🔄</p>
                </div>
            </SafeArea>
        );
    }

    if (!video) {
        return (
            <SafeArea className="">
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-gray-600 font-medium text-lg">Video tidak ditemukan</p>
                    <p className="text-gray-500 text-sm mt-2">Mungkin video sedang dalam perjalanan! 🚀</p>
                </div>
            </SafeArea>
        );
    }

    return (
        <>
            <SafeArea className="">
                {/* Header dengan tema video */}
                <div className="header mb-6 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-600 p-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 left-6 text-5xl animate-bounce">🎬</div>
                        <div className="absolute top-12 right-10 text-4xl animate-pulse">📺</div>
                        <div className="absolute bottom-6 left-1/3 text-5xl animate-bounce delay-1000">🎭</div>
                        <div className="absolute bottom-4 right-6 text-4xl animate-pulse delay-500">🎪</div>
                    </div>
                    <div className="relative z-10 text-center">
                        <div className="text-4xl mb-2">🎥✨</div>
                        <h1 className="font-bold text-2xl mb-2">{video.title}</h1>
                        <div className="flex items-center justify-center space-x-2 mb-2">
                            <span className="text-2xl">👨‍🏫</span>
                            <span className="text-indigo-100 font-medium">Guru AJARIN</span>
                        </div>
                        <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                            <span className="text-sm">
                                Status: {video.status === 'verified' ? '✅ Terverifikasi' : video.status === 'pending' ? '⏳ Menunggu Verifikasi' : video.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Video Player Section */}
                <div className="video-player mb-6 px-4">
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-black rounded-2xl overflow-hidden shadow-2xl">
                        {video.video_url ? (
                            <video
                                src={video.video_url}
                                controls
                                className="w-full h-full object-cover"
                                poster="https://via.placeholder.com/640x360?text=Video+Player"
                            />
                        ) : (
                            <>
                                <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600 flex items-center justify-center relative">
                                    <div className="text-center">
                                        <div className="text-8xl mb-4 animate-bounce">🎬</div>
                                        <p className="text-white text-xl font-bold mb-2">Video Belum Tersedia</p>
                                        <p className="text-white/80 text-sm">Tunggu sebentar ya! 🚀</p>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button className="bg-white/90 rounded-full p-6 hover:bg-white transition-all transform hover:scale-110 shadow-lg">
                                            <span className="text-4xl">▶️</span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Konten Pelajaran */}
                <div className="px-4 py-4 mb-6">
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                        <div className="flex items-center mb-4">
                            <span className="text-3xl mr-3">📚</span>
                            <h2 className="font-bold text-xl text-gray-800">Konten Pelajaran</h2>
                        </div>
                        <p className="text-gray-700 mb-4 text-lg">Pelajari materi yang menarik dan mudah dipahami! 🌟</p>
                        <div className="bg-white p-4 rounded-xl shadow-md">
                            <div className="flex items-center mb-3">
                                <span className="text-2xl mr-2">💡</span>
                                <h3 className="font-semibold text-lg">Poin Utama Belajar:</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center space-x-2">
                                    <span className="text-green-500 text-lg">✅</span>
                                    <span className="text-gray-700">Materi pembelajaran interaktif dan menyenangkan</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-blue-500 text-lg">✅</span>
                                    <span className="text-gray-700">Penjelasan yang mudah dipahami anak-anak</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-purple-500 text-lg">✅</span>
                                    <span className="text-gray-700">Contoh soal praktis dan aplikasinya</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Related Videos */}
                <div className="px-4 py-4 mb-20">
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-2xl border-2 border-pink-200">
                        <div className="flex items-center mb-4">
                            <span className="text-3xl mr-3">🎬</span>
                            <h2 className="font-bold text-xl text-gray-800">Video Terkait Lainnya</h2>
                        </div>
                        <div className="text-center py-8">
                            <div className="text-6xl mb-4 animate-bounce">🎪</div>
                            <p className="text-gray-600 font-medium text-lg">Video terkait sedang disiapkan!</p>
                            <p className="text-gray-500 text-sm mt-2">Lebih banyak video seru akan segera hadir 🌈</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="fixed bottom-20 left-4 right-4 flex space-x-3">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3">
                        <span className="text-2xl">💾</span>
                        <span>Simpan Video</span>
                        <span className="text-xl">⭐</span>
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-red-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3">
                        <span className="text-2xl">🚨</span>
                        <span>Laporkan</span>
                        <span className="text-xl">⚠️</span>
                    </button>
                </div>

                {/* Footer motivasi */}
                <div className="mt-8 px-4 pb-4">
                    <div className="bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 p-6 rounded-2xl text-center shadow-lg">
                        <div className="text-4xl mb-3">🎓💪🌟</div>
                        <p className="text-gray-700 font-bold text-lg">Belajar itu menyenangkan! Teruslah belajar ya! 🚀</p>
                        <p className="text-gray-600 text-sm mt-2">Setiap video membawamu lebih dekat dengan pengetahuan baru ✨</p>
                    </div>
                </div>
            </SafeArea>
        </>
    );
}