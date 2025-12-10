import SafeArea from "../../components/SafeArea";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, supabase } from "../../lib";
import { GraduationCap, ArrowLeft, BookOpen, Play, ChevronRight } from 'lucide-react';

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

    const materiName = materiNames[parseInt(materiId)] || `Materi ${materiId}`;

    return (
        <SafeArea className="bg-gray-50 min-h-screen">
            {/* Top App Bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Link to={`/kelas/${kelasId}/${mapelId}`} className="p-1 hover:bg-gray-100 rounded-lg">
                            <ArrowLeft size={24} className="text-gray-600" />
                        </Link>
                        <GraduationCap size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">AJARIN</h1>
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="bg-white mx-4 mt-4 rounded-lg p-6 shadow-md">
                <div className="flex items-center space-x-4 mb-2">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <BookOpen size={24} className="text-purple-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{materiName}</h1>
                        <p className="text-gray-600">Pilih topik yang ingin dipelajari</p>
                    </div>
                </div>
            </div>

            <div className="p-4">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-600">Memuat topik...</p>
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
                ) : topics.length > 0 ? (
                    <div className="space-y-3">
                        {topics.map((topic, index) => (
                            <Link
                                key={topic.id}
                                to={`/kelas/${kelasId}/${mapelId}/${materiId}/${topic.id}`}
                                className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <Play size={24} className="text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{topic.name}</h3>
                                            <p className="text-gray-600 text-sm">{topic.videoCount} video tersedia</p>
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
                        <p className="text-gray-600 font-medium">Belum ada topik</p>
                        <p className="text-gray-500 text-sm mt-2">Konten sedang disiapkan</p>
                    </div>
                )}
            </div>
        </SafeArea>
    )
}