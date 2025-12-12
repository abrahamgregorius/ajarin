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
        <SafeArea>
            <div className="min-h-screen bg-gray-50">
                {/* Top App Bar */}
                <div className="bg-white shadow-sm border-b">
                    <div className="px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <GraduationCap size={28} className="text-blue-600" />
                            <h1 className="text-xl font-bold text-gray-900">Upload Video</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            {/* Streak and Coin Display */}
                            <StreakCoinDisplay
                                streak={streak}
                                coins={coins}
                                hasCompletedToday={hasCompletedToday}
                            />
                        </div>
                    </div>
                </div>


                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">Submit Video</h1>

                        {error && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* YouTube URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    YouTube URL *
                                </label>
                                <input
                                    type="url"
                                    value={youtubeUrl}
                                    onChange={(e) => setYoutubeUrl(e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Judul Video *
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Contoh: Pengenalan Aljabar Linear"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Deskripsi *
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Jelaskan isi video..."
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Duration and Difficulty */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Durasi (menit) *
                                    </label>
                                    <input
                                        type="number"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        placeholder="15"
                                        min="1"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tingkat Kesulitan *
                                    </label>
                                    <select
                                        value={difficulty}
                                        onChange={(e) => setDifficulty(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="Beginner">Pemula</option>
                                        <option value="Intermediate">Menengah</option>
                                        <option value="Advanced">Lanjutan</option>
                                    </select>
                                </div>
                            </div>

                            {/* Curriculum Location */}
                            <div className="border-t pt-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    Lokasi Kurikulum *
                                </h2>

                                <div className="space-y-4">
                                    {/* Class */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Kelas
                                        </label>
                                        <select
                                            value={selectedClass}
                                            onChange={(e) => setSelectedClass(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Pilih Kelas</option>
                                            {classes.map((cls) => (
                                                <option key={cls.id} value={cls.id}>{cls.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mata Pelajaran
                                        </label>
                                        <select
                                            value={selectedSubject}
                                            onChange={(e) => setSelectedSubject(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            disabled={!selectedClass}
                                            required
                                        >
                                            <option value="">Pilih Mata Pelajaran</option>
                                            {subjects.map((subject) => (
                                                <option key={subject.id} value={subject.id}>{subject.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Material */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Materi
                                        </label>
                                        <select
                                            value={selectedMaterial}
                                            onChange={(e) => setSelectedMaterial(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            disabled={!selectedSubject}
                                            required
                                        >
                                            <option value="">Pilih Materi</option>
                                            {materials.map((material) => (
                                                <option key={material.id} value={material.id}>{material.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Topic */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Topik
                                        </label>
                                        <select
                                            value={selectedTopic}
                                            onChange={(e) => setSelectedTopic(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                            {/* Submit Button */}
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/creator/videos')}
                                    className="flex-1 py-3 px-6 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Mengirim...' : 'Submit Video'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </SafeArea>
    );
};

export default CreatorUpload;
