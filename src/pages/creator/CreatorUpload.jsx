import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GraduationCap } from 'lucide-react';
import SafeArea from '../../components/SafeArea';
import StreakCoinDisplay from '../../components/StreakCoinDisplay';
import { useAuth } from '../../contexts/AuthContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { getClasses, getMaterialsBySubject, getSubjectsByClass, getTopicsByMaterial, submitVideo } from '../../lib/database';

const CreatorUpload = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { streak, coins, hasCompletedToday } = useUserProgress();

    // Form state
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [difficulty, setDifficulty] = useState('Beginner');

    // Curriculum state
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [topics, setTopics] = useState([]);

    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');

    // UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Load classes on mount
    useEffect(() => {
        loadClasses();
    }, []);

    // Load subjects when class changes
    useEffect(() => {
        if (selectedClass) {
            loadSubjects(selectedClass);
        } else {
            setSubjects([]);
            setSelectedSubject('');
        }
    }, [selectedClass]);

    // Load materials when subject changes
    useEffect(() => {
        if (selectedSubject) {
            loadMaterials(selectedSubject);
        } else {
            setMaterials([]);
            setSelectedMaterial('');
        }
    }, [selectedSubject]);

    // Load topics when material changes
    useEffect(() => {
        if (selectedMaterial) {
            loadTopics(selectedMaterial);
        } else {
            setTopics([]);
            setSelectedTopic('');
        }
    }, [selectedMaterial]);

    const loadClasses = async () => {
        const { data, error } = await getClasses();
        console.log("kelas ",data)
        if (error) {
            setError('Gagal memuat kelas');
        } else {
            setClasses(data || []);
        }
    };

    const loadSubjects = async (classId) => {
        const { data, error } = await getSubjectsByClass(classId);
        console.log("mata pelajaran ",data)
        if (error) {
            setError('Gagal memuat mata pelajaran');
        } else {
            setSubjects(data || []);
        }
    };

    const loadMaterials = async (subjectId) => {
        const { data, error } = await getMaterialsBySubject(subjectId);
        console.log("materi ",data)
        if (error) {
            setError('Gagal memuat materi');
        } else {
            setMaterials(data || []);
        }
    };

    const loadTopics = async (materialId) => {
        const { data, error } = await getTopicsByMaterial(materialId);
        if (error) {
            setError('Gagal memuat topik');
        } else {
            setTopics(data || []);
        }
    };

    const extractYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        // Validation
        if (!youtubeUrl || !title || !description || !duration || !selectedTopic) {
            setError('Semua field harus diisi');
            setLoading(false);
            return;
        }

        // Validate YouTube URL
        const videoId = extractYouTubeId(youtubeUrl);
        if (!videoId) {
            setError('URL YouTube tidak valid');
            setLoading(false);
            return;
        }

        try {
            const videoData = {
                youtube_url: youtubeUrl,
                title,
                description,
                duration: parseInt(duration),
                difficulty,
                topic_id: parseInt(selectedTopic)
            };

            const { data, error } = await submitVideo(videoData);

            if (error) {
                setError('Gagal mengirim video: ' + error.message);
            } else {
                setSuccess('Video berhasil dikirim! Menunggu persetujuan admin.');
                setTimeout(() => {
                    navigate('/creator/videos');
                }, 2000);
            }
        } catch (err) {
            setError('Terjadi kesalahan: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeArea className="bg-gray-50 min-h-screen">
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <GraduationCap size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">Upload Video</h1>
                    </div>
                    <StreakCoinDisplay
                        streak={streak}
                        coins={coins}
                        hasCompletedToday={hasCompletedToday}
                    />
                </div>
            </div>

            <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">

                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                             <span className="text-sm font-medium">{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
                             <span className="text-sm font-medium">{success}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Video Details Section */}
                         <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                            <h3 className="text-md font-bold text-gray-800 mb-4">Detail Video</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        YouTube URL <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="url"
                                        value={youtubeUrl}
                                        onChange={(e) => setYoutubeUrl(e.target.value)}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Pastikan video tidak bersifat privat.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Judul Video <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Contoh: Pengenalan Aljabar Linear"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Deskripsi <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Jelaskan isi video secara singkat..."
                                        rows="4"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Durasi (menit) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                            placeholder="15"
                                            min="1"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tingkat Kesulitan <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={difficulty}
                                            onChange={(e) => setDifficulty(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                        >
                                            <option value="Beginner">Pemula</option>
                                            <option value="Intermediate">Menengah</option>
                                            <option value="Advanced">Lanjutan</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Curriculum Section */}
                        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                            <h3 className="text-md font-bold text-blue-800 mb-4">Lokasi Kurikulum</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kelas <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                        required
                                    >
                                        <option value="">Pilih Kelas</option>
                                        {classes.map((cls) => (
                                            <option key={cls.id} value={cls.id}>{cls.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mata Pelajaran <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={selectedSubject}
                                        onChange={(e) => setSelectedSubject(e.target.value)}
                                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                        disabled={!selectedClass}
                                        required
                                    >
                                        <option value="">Pilih Mata Pelajaran</option>
                                        {subjects.map((subject) => (
                                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Materi <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={selectedMaterial}
                                        onChange={(e) => setSelectedMaterial(e.target.value)}
                                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                        disabled={!selectedSubject}
                                        required
                                    >
                                        <option value="">Pilih Materi</option>
                                        {materials.map((material) => (
                                            <option key={material.id} value={material.id}>{material.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Topik <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={selectedTopic}
                                        onChange={(e) => setSelectedTopic(e.target.value)}
                                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                        disabled={!selectedMaterial}
                                        required
                                    >
                                        <option value="">Pilih Topik</option>
                                        {topics.map((topic) => (
                                            <option key={topic.id} value={topic.id}>{topic.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                             <button
                                type="button"
                                onClick={() => navigate('/creator/videos')}
                                className="flex-1 py-3 px-6 border border-gray-200 rounded-xl text-gray-600 font-bold hover:bg-gray-50 hover:text-gray-900 transition-all"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-xl font-bold section-shadow hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Mengirim...
                                    </span>
                                ) : (
                                    'Submit Video'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </SafeArea>
    );
};

export default CreatorUpload;
