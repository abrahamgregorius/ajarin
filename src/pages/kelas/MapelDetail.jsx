import SafeArea from "../../components/SafeArea";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, supabase } from "../../lib";
import { GraduationCap, ArrowLeft, BookOpen, Calculator, Globe, ChevronRight, FlaskConical } from 'lucide-react';

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

    const subjectIcons = {
        'Matematika': Calculator,
        'Bahasa Indonesia': BookOpen,
        'IPA': FlaskConical,
        'IPS': Globe
    };

    const subjectName = mapelNames[parseInt(mapelId)] || `Mata Pelajaran ${mapelId}`;
    const IconComponent = subjectIcons[subjectName] || BookOpen;

    return (
        <SafeArea className="bg-gray-50 min-h-screen">
            {/* Top App Bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Link to={`/kelas/${kelasId}`} className="p-1 hover:bg-gray-100 rounded-lg">
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
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent size={24} className="text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{subjectName}</h1>
                        <p className="text-gray-600">Kelas {kelasId}</p>
                    </div>
                </div>
                <p className="text-gray-600 mt-2">Pilih materi yang ingin dipelajari</p>
            </div>

            <div className="p-4">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-600">Memuat materi...</p>
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
                ) : materials.length > 0 ? (
                    <div className="space-y-3">
                        {materials.map((material, index) => (
                            <Link
                                key={material.id}
                                to={`/kelas/${kelasId}/${mapelId}/${material.id}`}
                                className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                            <BookOpen size={24} className="text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{material.name}</h3>
                                            <p className="text-gray-600 text-sm">{material.topikCount} topik tersedia</p>
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
                            <BookOpen size={32} className="text-gray-400" />
                        </div>
                        <p className="text-gray-600 font-medium">Belum ada materi</p>
                        <p className="text-gray-500 text-sm mt-2">Materi sedang disiapkan</p>
                    </div>
                )}
            </div>
        </SafeArea>
    )
}