import SafeArea from "../../components/SafeArea";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, supabase } from "../../lib";

export default function MateriDetail() {
    const { kelasId, mapelId, materiId } = useParams();
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const { data, error } = await db.getTopicsByMaterial(parseInt(materiId));
                if (error) throw error;

                // Get videos count for each topic
                const topicsWithCount = await Promise.all(
                    data.map(async (topic) => {
                        const { data: videos, error: videosError } = await supabase
                            .from('videos')
                            .select('id', { count: 'exact' })
                            .eq('topic_id', topic.id);

                        return {
                            ...topic,
                            videoCount: videos?.length || 0
                        };
                    })
                );

                setTopics(topicsWithCount);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTopics();
    }, [materiId]);

    const materiNames = {
        1: 'Bilangan', 2: 'Aljabar', 3: 'Geometri',
        4: 'Membaca', 5: 'Menulis', 6: 'Tata Bahasa',
        7: 'Makhluk Hidup', 8: 'Energi', 9: 'Lingkungan',
        10: 'Geografi', 11: 'Ekonomi', 12: 'Sejarah'
    };

    return (
        <>
            <SafeArea className="">
                {/* Header dengan tema materi */}
                <div className="header mb-6 bg-gradient-to-br from-purple-400 via-pink-500 to-rose-600 p-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 left-6 text-5xl animate-bounce">🎭</div>
                        <div className="absolute top-12 right-10 text-4xl animate-pulse">🎨</div>
                        <div className="absolute bottom-6 left-1/3 text-5xl animate-bounce delay-1000">🎪</div>
                        <div className="absolute bottom-4 right-6 text-4xl animate-pulse delay-500">🎯</div>
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center mb-2">
                            <span className="text-4xl mr-3">🌟</span>
                            <h1 className="font-bold text-3xl">{materiNames[parseInt(materiId)] || `Material ${materiId}`}</h1>
                            <span className="text-4xl ml-3">✨</span>
                        </div>
                        <p className="text-purple-100 text-lg font-medium">Topik-topik menarik menanti petualanganmu! 🎢</p>
                        <div className="mt-3 flex items-center space-x-2">
                            <span className="text-2xl">🎭</span>
                            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Petualangan Pengetahuan</span>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-2">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin text-4xl mb-4">🔄</div>
                            <p className="text-gray-600 font-medium">Memuat topik seru... 🎭</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">😵</div>
                            <p className="text-red-500 font-medium">Ups! Ada kesalahan: {error}</p>
                            <p className="text-gray-500 text-sm mt-2">Coba refresh halaman ya! 🔄</p>
                        </div>
                    ) : topics.length > 0 ? (
                        <div className="space-y-4">
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-2">Topik Pembelajaran Asyik! 🎪</h2>
                                <p className="text-gray-600">Setiap topik penuh dengan video-video menarik dan pengetahuan baru 🎬</p>
                            </div>
                            {topics.map((topic, index) => {
                                const topicEmojis = {
                                    'Pengertian Bilangan': '🔢',
                                    'Operasi Bilangan': '➕',
                                    'Pecahan': '🥧',
                                    'Variabel': '🔤',
                                    'Bentuk Aljabar': '🧮',
                                    'Persamaan Sederhana': '🟰',
                                    'Bangun Datar': '📐',
                                    'Bangun Ruang': '📦',
                                    'Pengukuran': '📏',
                                    'Ide Pokok': '💡',
                                    'Membaca Pemahaman': '📖',
                                    'Teks Narasi': '📚',
                                    'Teks Eksposisi': '📝',
                                    'Kata Benda': '🏷️',
                                    'Kata Kerja': '🏃',
                                    'Ciri Makhluk Hidup': '🐾',
                                    'Bentuk Energi': '⚡',
                                    'Pencemaran Lingkungan': '🌱',
                                    'Peta dan Lokasi': '🗺️',
                                    'Kegiatan Ekonomi': '💰',
                                    'Perjuangan Kemerdekaan': '🏛️'
                                };
                                const emoji = topicEmojis[topic.name] || '🎯';

                                return (
                                    <Link
                                        key={topic.id}
                                        to={`/kelas/${kelasId}/${mapelId}/${materiId}/${topic.id}`}
                                        className="block bg-gradient-to-r from-white to-purple-50 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-pink-300"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="text-4xl animate-bounce">{emoji}</div>
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-800 mb-1">{topic.name}</h3>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-medium">
                                                            🎬 {topic.videoCount} video menarik
                                                        </span>
                                                        <span className="text-yellow-500 text-sm">⭐</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-110 shadow-lg flex items-center space-x-2">
                                                    <span>Tonton Video!</span>
                                                    <span className="text-lg">🎥</span>
                                                </button>
                                                <div className="mt-2 flex justify-end space-x-1">
                                                    <span className="text-xs text-gray-500">Klik untuk nonton</span>
                                                    <span className="text-sm animate-pulse">👆</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📭</div>
                            <p className="text-gray-600 font-medium text-lg">Belum ada topik untuk materi ini</p>
                            <p className="text-gray-500 text-sm mt-2">Tunggu sebentar ya, guru sedang menyiapkan video-video seru! 🎬</p>
                        </div>
                    )}
                </div>

                {/* Footer motivasi */}
                <div className="mt-8 px-4 pb-4">
                    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl text-center">
                        <div className="text-3xl mb-2">🎬📚</div>
                        <p className="text-gray-700 font-medium">Video-video menarik menanti untuk memperkaya pengetahuanmu! 🌟</p>
                    </div>
                </div>
            </SafeArea>
        </>
    );
}