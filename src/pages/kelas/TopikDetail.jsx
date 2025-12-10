import SafeArea from "../../components/SafeArea";
import StreakCoinDisplay from "../../components/StreakCoinDisplay";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../lib";
import { GraduationCap, ArrowLeft, Play, Clock, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';

export default function TopikDetail() {
    const { kelasId, mapelId, materiId, topikId } = useParams();
    const [videoList, setVideoList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // User progress state
    const [streak, setStreak] = useState(7);
    const [coins, setCoins] = useState(1250);
    const [hasCompletedToday, setHasCompletedToday] = useState(true);

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

    const topikName = topikNames[parseInt(topikId)] || `Topik ${topikId}`;

    return (
        <SafeArea className="bg-gray-50 min-h-screen">
            {/* Top App Bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Link to={`/kelas/${kelasId}/${mapelId}/${materiId}`} className="p-1 hover:bg-gray-100 rounded-lg">
                            <ArrowLeft size={24} className="text-gray-600" />
                        </Link>
                        <GraduationCap size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">AJARIN</h1>
                    </div>
                    <StreakCoinDisplay streak={streak} coins={coins} />
                </div>
            </div>

            {/* Header */}
            <div className="bg-white mx-4 mt-4 rounded-lg p-6 shadow-md">
                <div className="flex items-center space-x-4 mb-2">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Play size={24} className="text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{topikName}</h1>
                        <p className="text-gray-600">Kelas {kelasId} • {mapelNames[parseInt(mapelId)] || `Mata Pelajaran ${mapelId}`}</p>
                    </div>
                </div>
                <p className="text-gray-600 mt-2">Pilih video yang ingin ditonton</p>
            </div>

            <div className="p-4">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-600">Memuat video...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <div className="text-red-500 mb-4">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">⚠️</span>
                            </div>
                        </div>
                        <p className="text-red-500 font-medium">Terjadi kesalahan: {error}</p>
                        <p className="text-gray-500 text-sm mt-2">Silakan coba lagi</p>
                    </div>
                ) : videoList.length > 0 ? (
                    <div className="space-y-3">
                        {videoList.map((video, index) => (
                            <Link
                                key={video.id}
                                to={`/video/${video.id}`}
                                className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Play size={20} className="text-gray-600 ml-1" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 mb-1">{video.title}</h3>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className="text-sm text-gray-600">Guru AJARIN</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center space-x-1">
                                                <Clock size={14} className="text-gray-400" />
                                                <span className="text-sm text-gray-600">15:30</span>
                                            </div>
                                            {video.status === 'verified' && (
                                                <div className="flex items-center space-x-1">
                                                    <CheckCircle size={14} className="text-green-500" />
                                                    <span className="text-sm text-green-600">Terverifikasi</span>
                                                </div>
                                            )}
                                            {video.status === 'pending' && (
                                                <div className="flex items-center space-x-1">
                                                    <AlertCircle size={14} className="text-yellow-500" />
                                                    <span className="text-sm text-yellow-600">Menunggu Verifikasi</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-gray-400" />
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Play size={32} className="text-gray-400" />
                        </div>
                        <p className="text-gray-600 font-medium">Belum ada video</p>
                        <p className="text-gray-500 text-sm mt-2">Video sedang disiapkan</p>
                    </div>
                )}
            </div>
        </SafeArea>
    )
}