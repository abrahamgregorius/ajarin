import SafeArea from '../components/SafeArea';
import { GraduationCap, Search, BookOpen, Calculator, Globe, Palette } from 'lucide-react';

export default function Jelajahi() {
    const categories = [
        { name: 'Matematika', icon: Calculator, color: 'bg-blue-100 text-blue-600' },
        { name: 'Bahasa Indonesia', icon: BookOpen, color: 'bg-green-100 text-green-600' },
        { name: 'Bahasa Inggris', icon: Globe, color: 'bg-purple-100 text-purple-600' },
        { name: 'Seni', icon: Palette, color: 'bg-pink-100 text-pink-600' },
    ];

    return (
        <SafeArea className="bg-gray-50 min-h-screen">
            {/* Top App Bar */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <GraduationCap size={28} className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">AJARIN</h1>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Search Bar */}
                <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari materi pembelajaran..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Categories */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Kategori Belajar</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {categories.map((category, index) => {
                            const IconComponent = category.icon;
                            return (
                                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                                    <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-3`}>
                                        <IconComponent size={24} />
                                    </div>
                                    <h3 className="font-medium text-gray-900">{category.name}</h3>
                                    <p className="text-sm text-gray-600 mt-1">Pelajari {category.name.toLowerCase()}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Featured Content */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Konten Unggulan</h2>
                    <div className="bg-white rounded-lg p-4 shadow-sm border">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <BookOpen size={20} className="text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Materi Terbaru</h3>
                                <p className="text-sm text-gray-600">Jelajahi materi pembelajaran terkini</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm">Temukan berbagai materi pembelajaran menarik yang telah disiapkan khusus untuk Anda.</p>
                    </div>
                </div>
            </div>
        </SafeArea>
    )
}