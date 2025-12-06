import SafeArea from "../../components/SafeArea";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, supabase } from "../../lib";

export default function MapelDetail() {
    const { kelasId, mapelId } = useParams();
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const { data, error } = await db.getMaterialsBySubject(parseInt(mapelId));
                if (error) throw error;

                // Get topics count for each material
                const materialsWithCount = await Promise.all(
                    data.map(async (material) => {
                        const { data: topics, error: topicsError } = await supabase
                            .from('topics')
                            .select('id', { count: 'exact' })
                            .eq('material_id', material.id);

                        return {
                            ...material,
                            topikCount: topics?.length || 0
                        };
                    })
                );

                setMaterials(materialsWithCount);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMaterials();
    }, [mapelId]);

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
                {/* Header dengan tema pelajaran */}
                <div className="header mb-6 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 left-6 text-5xl animate-bounce">📖</div>
                        <div className="absolute top-12 right-10 text-4xl animate-pulse">🧠</div>
                        <div className="absolute bottom-6 left-1/3 text-5xl animate-bounce delay-1000">🎨</div>
                        <div className="absolute bottom-4 right-6 text-4xl animate-pulse delay-500">🔍</div>
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center mb-2">
                            <span className="text-4xl mr-3">🎓</span>
                            <h1 className="font-bold text-3xl">{mapelNames[parseInt(mapelId)] || `Subject ${mapelId}`}</h1>
                            <span className="text-4xl ml-3">📚</span>
                        </div>
                        <p className="text-green-100 text-lg font-medium">Mari jelajahi materi pembelajaran yang menarik! 🌟</p>
                        <div className="mt-3 flex items-center space-x-2">
                            <span className="text-2xl">👩‍🏫</span>
                            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Petualangan Pengetahuan</span>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-2">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin text-4xl mb-4">🔄</div>
                            <p className="text-gray-600 font-medium">Memuat materi seru... 🎭</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">😵</div>
                            <p className="text-red-500 font-medium">Ups! Ada kesalahan: {error}</p>
                            <p className="text-gray-500 text-sm mt-2">Coba refresh halaman ya! 🔄</p>
                        </div>
                    ) : materials.length > 0 ? (
                        <div className="space-y-4">
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-2">Materi Pembelajaran Seru! 🎪</h2>
                                <p className="text-gray-600">Setiap materi penuh dengan pengetahuan dan kegembiraan belajar 🎈</p>
                            </div>
                            {materials.map((material, index) => {
                                const materialEmojis = {
                                    'Bilangan': '🔢',
                                    'Aljabar': '🧮',
                                    'Geometri': '📐',
                                    'Membaca': '📖',
                                    'Menulis': '✍️',
                                    'Tata Bahasa': '📝',
                                    'Makhluk Hidup': '🐾',
                                    'Energi': '⚡',
                                    'Lingkungan': '🌱',
                                    'Geografi': '🌍',
                                    'Ekonomi': '💰',
                                    'Sejarah': '🏛️'
                                };
                                const emoji = materialEmojis[material.name] || '🎯';

                                return (
                                    <Link
                                        key={material.id}
                                        to={`/kelas/${kelasId}/${mapelId}/${material.id}`}
                                        className="block bg-gradient-to-r from-white to-green-50 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-green-300"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="text-4xl animate-bounce">{emoji}</div>
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-800 mb-1">{material.name}</h3>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                                                            📋 {material.topikCount} topik menarik
                                                        </span>
                                                        <span className="text-yellow-500 text-sm">⭐</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:from-green-600 hover:to-teal-700 transition-all transform hover:scale-110 shadow-lg flex items-center space-x-2">
                                                    <span>Jelajahi!</span>
                                                    <span className="text-lg">🚀</span>
                                                </button>
                                                <div className="mt-2 flex justify-end space-x-1">
                                                    <span className="text-xs text-gray-500">Klik untuk masuk</span>
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
                            <p className="text-gray-600 font-medium text-lg">Belum ada materi untuk mata pelajaran ini</p>
                            <p className="text-gray-500 text-sm mt-2">Tunggu sebentar ya, guru sedang menyiapkan petualangan belajar! 🎪</p>
                        </div>
                    )}
                </div>

                {/* Footer motivasi */}
                <div className="mt-8 px-4 pb-4">
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-xl text-center">
                        <div className="text-3xl mb-2">🎯💡</div>
                        <p className="text-gray-700 font-medium">Setiap materi adalah langkah menuju pengetahuan baru! 🌟</p>
                    </div>
                </div>
            </SafeArea>
        </>
    );
}