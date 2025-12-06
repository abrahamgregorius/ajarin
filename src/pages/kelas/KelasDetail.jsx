import SafeArea from "../../components/SafeArea";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, supabase } from "../../lib";

export default function KelasDetail() {
    const { kelasId } = useParams();
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                {/* Header dengan ilustrasi anak-anak belajar */}
                <div className="header mb-6 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 p-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-2 left-4 text-6xl animate-bounce">🎓</div>
                        <div className="absolute top-8 right-8 text-4xl animate-pulse">📚</div>
                        <div className="absolute bottom-4 left-1/2 text-5xl animate-bounce delay-1000">✨</div>
                        <div className="absolute bottom-2 right-4 text-4xl animate-pulse delay-500">🌟</div>
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center mb-2">
                            <span className="text-4xl mr-3">🚀</span>
                            <h1 className="font-bold text-3xl">Kelas {kelasId}</h1>
                            <span className="text-4xl ml-3">🎯</span>
                        </div>
                        <p className="text-yellow-100 text-lg font-medium">Yuk pilih mata pelajaran favoritmu! 📖✨</p>
                        <div className="mt-3 flex items-center space-x-2">
                            <span className="text-2xl">👨‍🏫</span>
                            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Bersama Guru AJARIN</span>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-2">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin text-4xl mb-4">🔄</div>
                            <p className="text-gray-600 font-medium">Memuat mata pelajaran seru... 🎭</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">😵</div>
                            <p className="text-red-500 font-medium">Ups! Ada kesalahan: {error}</p>
                            <p className="text-gray-500 text-sm mt-2">Coba refresh halaman ya! 🔄</p>
                        </div>
                    ) : subjects.length > 0 ? (
                        <div className="space-y-4">
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-2">Pilih Mata Pelajaranmu! 🎨</h2>
                                <p className="text-gray-600">Setiap pelajaran penuh petualangan dan pengetahuan baru 🌈</p>
                            </div>
                            {subjects.map((subject, index) => {
                                const subjectEmojis = {
                                    'Matematika': '🔢',
                                    'Bahasa Indonesia': '📝',
                                    'IPA': '🔬',
                                    'IPS': '🌍'
                                };
                                const emoji = subjectEmojis[subject.name] || '📚';

                                return (
                                    <Link
                                        key={subject.id}
                                        to={`/kelas/${kelasId}/${subject.id}`}
                                        className="block bg-gradient-to-r from-white to-blue-50 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-yellow-300"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="text-4xl animate-bounce">{emoji}</div>
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-800 mb-1">{subject.name}</h3>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                                                            📚 {subject.materiCount} materi menarik
                                                        </span>
                                                        <span className="text-yellow-500 text-sm">⭐</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-110 shadow-lg flex items-center space-x-2">
                                                    <span>Belajar Yuk!</span>
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
                            <p className="text-gray-600 font-medium text-lg">Belum ada mata pelajaran untuk kelas ini</p>
                            <p className="text-gray-500 text-sm mt-2">Tunggu sebentar ya, guru sedang menyiapkan materi seru! 🎪</p>
                        </div>
                    )}
                </div>

                {/* Footer motivasi */}
                <div className="mt-8 px-4 pb-4">
                    <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-xl text-center">
                        <div className="text-3xl mb-2">💪🎓</div>
                        <p className="text-gray-700 font-medium">Belajar itu menyenangkan! Tetap semangat ya! 🌟</p>
                    </div>
                </div>
            </SafeArea>
        </>
    );
}