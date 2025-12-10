import SafeArea from "../../components/SafeArea";
import StreakCoinDisplay from "../../components/StreakCoinDisplay";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, supabase } from "../../lib";
import { GraduationCap, ArrowLeft, BookOpen, Calculator, Globe, ChevronRight, FlaskConical } from 'lucide-react';
import { useUserProgress } from "../../hooks/useUserProgress";

export default function KelasDetail() {
    const { kelasId } = useParams();
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // User progress state
    const { streak, coins, hasCompletedToday, studyHours, userRank } = useUserProgress();

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const { data, error } = await db.getSubjectsByClass(parseInt(kelasId));
                if (error) throw error;

                // Get materials count for each subject
                const subjectsWithCount = await Promise.all(
                    data.map(async (subject) => {
                        const { data: materials, error: materialsError } = await supabase
                            .from('materials')
                            .select('id', { count: 'exact' })
                            .eq('subject_id', subject.id);

                        return {
                            ...subject,
                            materiCount: materials?.length || 0
                        };
                    })
                );

                setSubjects(subjectsWithCount);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchSubjects();
    }, [kelasId]);

    const subjectIcons = {
        'Matematika': Calculator,
        'Bahasa Indonesia': BookOpen,
        'IPA': FlaskConical,
        'IPS': Globe
    };

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
                    <StreakCoinDisplay streak={streak} coins={coins} />
                </div>
            </div>

            {/* Header */}
            <div className="bg-white mx-4 mt-4 rounded-lg p-6 shadow-md">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Kelas {kelasId}</h1>
                <p className="text-gray-600">Pilih mata pelajaran yang ingin dipelajari</p>
            </div>

            <div className="p-4">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-600">Memuat mata pelajaran...</p>
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
                ) : subjects.length > 0 ? (
                    <div className="space-y-3">
                        {subjects.map((subject, index) => {
                            const IconComponent = subjectIcons[subject.name] || BookOpen;

                            return (
                                <Link
                                    key={subject.id}
                                    to={`/kelas/${kelasId}/${subject.id}`}
                                    className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <IconComponent size={24} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                                                <p className="text-gray-600 text-sm">{subject.materiCount} materi tersedia</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={20} className="text-gray-400" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen size={32} className="text-gray-400" />
                        </div>
                        <p className="text-gray-600 font-medium">Belum ada mata pelajaran</p>
                        <p className="text-gray-500 text-sm mt-2">Materi sedang disiapkan</p>
                    </div>
                )}
            </div>
        </SafeArea>
    )
}