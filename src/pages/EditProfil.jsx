import SafeArea from "../components/SafeArea";
import { GraduationCap, ArrowLeft, User, Camera, Save, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useUserProgress } from '../hooks/useUserProgress';
import * as db from '../lib/database';

export default function EditProfil() {
    const { user: authUser } = useAuth();
    const navigate = useNavigate();
    const { currentNickname } = useUserProgress();

    // Form state
    const [formData, setFormData] = useState({
        full_name: '',
        school: '',
        grade: '',
        avatar_url: ''
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    // Available grades
    const grades = [
        'Kelas 1 SD', 'Kelas 2 SD', 'Kelas 3 SD', 'Kelas 4 SD', 'Kelas 5 SD', 'Kelas 6 SD',
        'Kelas 7 SMP', 'Kelas 8 SMP', 'Kelas 9 SMP',
        'Kelas 10 SMA', 'Kelas 11 SMA', 'Kelas 12 SMA'
    ];

    // Load current profile data
    useEffect(() => {
        const loadProfileData = async () => {
            if (!authUser?.id) return;

            try {
                setLoading(true);
                const { data: profile, error } = await db.getUserProfile(authUser.id);

                if (error) {
                    console.error('Error loading profile:', error);
                    return;
                }

                if (profile) {
                    setFormData({
                        full_name: profile.full_name || authUser.name || '',
                        school: profile.school || '',
                        grade: profile.grade || '',
                        avatar_url: profile.avatar_url || ''
                    });
                }
            } catch (error) {
                console.error('Error loading profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProfileData();
    }, [authUser]);

    // Handle form input changes
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error for this field
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.full_name.trim()) {
            newErrors.full_name = 'Nama lengkap harus diisi';
        }

        if (!formData.school.trim()) {
            newErrors.school = 'Sekolah harus diisi';
        }

        if (!formData.grade) {
            newErrors.grade = 'Kelas harus dipilih';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (!authUser?.id) {
            console.error('No user ID available');
            return;
        }

        try {
            setSaving(true);

            // Prepare update data
            const updateData = {
                full_name: formData.full_name.trim(),
                school: formData.school.trim(),
                grade: formData.grade
            };

            // Only include avatar_url if it has a value
            if (formData.avatar_url.trim()) {
                updateData.avatar_url = formData.avatar_url.trim();
            }

            console.log('Updating profile with data:', updateData);

            // Update profile in database
            const { error } = await db.updateUserProfile(authUser.id, updateData);

            if (error) {
                console.error('Error updating profile:', error);
                alert('Gagal menyimpan perubahan. Silakan coba lagi.');
                return;
            }

            console.log('Profile updated successfully');

            // Show success message
            alert('Profil berhasil diperbarui!');

            // Navigate back to profile
            navigate('/profil');

        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Terjadi kesalahan saat menyimpan. Silakan coba lagi.');
        } finally {
            setSaving(false);
        }
    };

    // Handle avatar URL input (for now, just text input)
    const handleAvatarChange = (url) => {
        setFormData(prev => ({
            ...prev,
            avatar_url: url
        }));
    };

    if (loading) {
        return (
            <SafeArea className="bg-gray-50 min-h-screen">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                </div>
            </SafeArea>
        );
    }

    return (
        <SafeArea className="bg-gray-50 min-h-screen">
            {/* Top App Bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-lg">
                            <ArrowLeft size={24} className="text-gray-600" />
                        </button>
                        <GraduationCap size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">Edit Profil</h1>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save size={16} />
                        <span>{saving ? 'Menyimpan...' : 'Simpan'}</span>
                    </button>
                </div>
            </div>

            <div className="p-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Avatar Section */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Foto Profil</h3>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                    {formData.avatar_url ? (
                                        <img
                                            src={formData.avatar_url}
                                            alt="Avatar"
                                            className="w-full h-full rounded-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentElement.innerHTML = '<div class="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center"><span class="text-2xl font-medium text-white">U</span></div>';
                                            }}
                                        />
                                    ) : (
                                        <User size={32} className="text-white" />
                                    )}
                                </div>
                                <button
                                    type="button"
                                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Camera size={16} className="text-white" />
                                </button>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    URL Gambar Avatar
                                </label>
                                <input
                                    type="url"
                                    value={formData.avatar_url}
                                    onChange={(e) => handleAvatarChange(e.target.value)}
                                    placeholder="https://example.com/avatar.jpg"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Masukkan URL gambar untuk avatar Anda
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Pribadi</h3>

                        {/* Full Name */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Lengkap *
                            </label>
                            <input
                                type="text"
                                value={formData.full_name}
                                onChange={(e) => handleInputChange('full_name', e.target.value)}
                                placeholder="Masukkan nama lengkap Anda"
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.full_name ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.full_name && (
                                <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
                            )}
                        </div>

                        {/* Email (Read-only) */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={authUser?.email || ''}
                                readOnly
                                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Email tidak dapat diubah
                            </p>
                        </div>

                        {/* School */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sekolah *
                            </label>
                            <input
                                type="text"
                                value={formData.school}
                                onChange={(e) => handleInputChange('school', e.target.value)}
                                placeholder="Masukkan nama sekolah Anda"
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.school ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.school && (
                                <p className="text-red-500 text-sm mt-1">{errors.school}</p>
                            )}
                        </div>

                        {/* Grade */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kelas *
                            </label>
                            <select
                                value={formData.grade}
                                onChange={(e) => handleInputChange('grade', e.target.value)}
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.grade ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Pilih kelas Anda</option>
                                {grades.map((grade) => (
                                    <option key={grade} value={grade}>
                                        {grade}
                                    </option>
                                ))}
                            </select>
                            {errors.grade && (
                                <p className="text-red-500 text-sm mt-1">{errors.grade}</p>
                            )}
                        </div>
                    </div>

                    {/* Current Nickname Display */}
                    {currentNickname && (
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nickname Saat Ini</h3>
                            <div className="flex items-center space-x-2">
                                <span className="inline-flex items-center leading-3.5 pl-4 pr-3 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                    {currentNickname}
                                </span>
                                <span className="text-sm text-gray-600">
                                    Nickname dapat diubah melalui toko item
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                        <button
                            type="button"
                            onClick={() => navigate('/profil')}
                            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
                        >
                            <X size={16} />
                            <span>Batal</span>
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                        >
                            <Save size={16} />
                            <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </SafeArea>
    );
}