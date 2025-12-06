import SafeArea from "../../components/SafeArea";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../lib";

export default function TopikDetail() {
    const { kelasId, mapelId, materiId, topikId } = useParams();
    const [videoList, setVideoList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const { data, error } = await db.getVideosByTopic(parseInt(topikId));
                if (error) throw error;

                setVideoList(data || []);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchVideos();
    }, [topikId]);

    const topikNames = {
        1: 'Pengertian Bilangan', 2: 'Operasi Bilangan', 3: 'Pecahan',
        4: 'Variabel', 5: 'Bentuk Aljabar', 6: 'Persamaan Sederhana',
        7: 'Bangun Datar', 8: 'Bangun Ruang', 9: 'Pengukuran',
        10: 'Ide Pokok', 11: 'Membaca Pemahaman',
        12: 'Teks Narasi', 13: 'Teks Eksposisi',
        14: 'Kata Benda', 15: 'Kata Kerja',
        16: 'Ciri Makhluk Hidup', 17: 'Bentuk Energi', 18: 'Pencemaran Lingkungan',
        19: 'Peta dan Lokasi', 20: 'Kegiatan Ekonomi', 21: 'Perjuangan Kemerdekaan'
    };

    const mapelNames = {
        1: 'Matematika', 2: 'Bahasa Indonesia', 3: 'IPA', 4: 'IPS',
        5: 'Matematika', 6: 'Bahasa Indonesia', 7: 'IPA', 8: 'IPS',
        9: 'Matematika', 10: 'Bahasa Indonesia', 11: 'IPA', 12: 'IPS',
        13: 'Matematika', 14: 'Bahasa Indonesia', 15: 'IPA', 16: 'IPS',
        17: 'Matematika', 18: 'Bahasa Indonesia', 19: 'IPA', 20: 'IPS',
        21: 'Matematika', 22: 'Bahasa Indonesia', 23: 'IPA', 24: 'IPS',
        25: 'Matematika', 26: 'Bahasa Indonesia', 27: 'IPA', 28: 'IPS',
        29: 'Matematika', 30: 'Bahasa Indonesia', 31: 'IPA', 32: 'IPS',
        33: 'Matematika', 34: 'Bahasa Indonesia', 35: 'IPA', 36: 'IPS',
        37: 'Matematika', 38: 'Bahasa Indonesia', 39: 'IPA', 40: 'IPS',
        41: 'Matematika', 42: 'Bahasa Indonesia', 43: 'IPA', 44: 'IPS',
        45: 'Matematika', 46: 'Bahasa Indonesia', 47: 'IPA', 48: 'IPS',
    };

    return (
        <>
            <SafeArea className="">
                {/* Header dengan tema video */}
                <div className="header mb-6 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 p-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 left-6 text-5xl animate-bounce">🎬</div>
                        <div className="absolute top-12 right-10 text-4xl animate-pulse">📺</div>
                        <div className="absolute bottom-6 left-1/3 text-5xl animate-bounce delay-1000">🎭</div>
                        <div className="absolute bottom-4 right-6 text-4xl animate-pulse delay-500">🎪</div>
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center mb-2">
                            <span className="text-4xl mr-3">🎥</span>
                            <h1 className="font-bold text-3xl">{topikNames[parseInt(topikId)] || `Topic ${topikId}`}</h1>
                            <span className="text-4xl ml-3">🎪</span>
                        </div>
                        <p className="text-orange-100 text-lg font-medium">Video-video seru menanti untuk belajar bersama! 🌟</p>
                        <div className="mt-3 flex items-center space-x-2">
                            <span className="text-2xl">👨‍🎤</span>
                            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Kelas {kelasId} • {mapelNames[parseInt(mapelId)] || `Subject ${mapelId}`}</span>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-2">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin text-4xl mb-4">🔄</div>
                            <p className="text-gray-600 font-medium">Memuat video-video seru... 🎭</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">😵</div>
                            <p className="text-red-500 font-medium">Ups! Ada kesalahan: {error}</p>
                            <p className="text-gray-500 text-sm mt-2">Coba refresh halaman ya! 🔄</p>
                        </div>
                    ) : videoList.length > 0 ? (
                        <div className="space-y-4">
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-2">Video Pembelajaran Asyik! 🎬</h2>
                                <p className="text-gray-600">Pilih video favoritmu dan mulai petualangan belajar 🎪</p>
                            </div>
                            {videoList.map((video, index) => (
                                <Link
                                    key={video.id}
                                    to={`/video/${video.id}`}
                                    className="block bg-gradient-to-r from-white to-orange-50 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-orange-300"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex space-x-4">
                                        <div className="relative">
                                            <div className="w-24 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center">
                                                <span className="text-2xl">🎬</span>
                                            </div>
                                            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                                                ▶️
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-gray-800 mb-2">{video.title}</h3>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className="text-2xl">👨‍🏫</span>
                                                <span className="text-gray-600 font-medium">Guru AJARIN</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                                                        ⏱️ 15:30
                                                    </span>
                                                    {video.status === 'verified' && (
                                                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                                                            ✅ Terverifikasi
                                                        </span>
                                                    )}
                                                    {video.status === 'pending' && (
                                                        <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium">
                                                            ⏳ Menunggu Verifikasi
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-yellow-500 text-lg">⭐</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end space-y-2">
                                            <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-3 rounded-xl font-bold text-sm hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-110 shadow-lg">
                                                <span className="text-lg">▶️</span>
                                            </button>
                                            <div className="text-xs text-gray-500 text-center">
                                                <span>Klik untuk nonton</span>
                                                <br />
                                                <span className="animate-pulse">👆</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🎬</div>
                            <p className="text-gray-600 font-medium text-lg">Belum ada video untuk topik ini</p>
                            <p className="text-gray-500 text-sm mt-2">Jadilah yang pertama mengunggah video seru! 🌟</p>
                            <div className="mt-4">
                                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all">
                                    <span className="flex items-center space-x-2">
                                        <span>📤</span>
                                        <span>Unggah Video</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer motivasi */}
                <div className="mt-8 px-4 pb-4">
                    <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-xl text-center">
                        <div className="text-3xl mb-2">🎬🌟</div>
                        <p className="text-gray-700 font-medium">Belajar melalui video itu menyenangkan dan mudah dipahami! 💫</p>
                    </div>
                </div>
            </SafeArea>
        </>
    );
}