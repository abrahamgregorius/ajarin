import SafeArea from "../components/SafeArea";

export default function Discover() {
    const courses = [
        { id: 1, title: 'Aljabar Linear', subject: 'Matematika', level: 'SMA', instructor: 'Pak Ahmad', rating: 4.8, price: 'Gratis', thumbnail: 'https://via.placeholder.com/200/FF6B6B/FFFFFF?text=Aljabar' },
        { id: 2, title: 'Bahasa Inggris Conversation', subject: 'Bahasa Inggris', level: 'SMA', instructor: 'Ms. Sarah', rating: 4.9, price: 'Premium', thumbnail: 'https://via.placeholder.com/200/4ECDC4/FFFFFF?text=English' },
        { id: 3, title: 'Kimia Organik', subject: 'IPA', level: 'SMA', instructor: 'Bu Rina', rating: 4.7, price: 'Gratis', thumbnail: 'https://via.placeholder.com/200/45B7D1/FFFFFF?text=Kimia' },
        { id: 4, title: 'Sejarah Nusantara', subject: 'IPS', level: 'SMP', instructor: 'Pak Budi', rating: 4.6, price: 'Premium', thumbnail: 'https://via.placeholder.com/200/F9CA24/FFFFFF?text=Sejarah' },
        { id: 5, title: 'Seni Musik', subject: 'Seni Budaya', level: 'SD', instructor: 'Bu Maya', rating: 4.5, price: 'Gratis', thumbnail: 'https://via.placeholder.com/200/F0932B/FFFFFF?text=Musik' },
        { id: 6, title: 'Fisika Modern', subject: 'IPA', level: 'SMA', instructor: 'Pak Dodi', rating: 4.8, price: 'Premium', thumbnail: 'https://via.placeholder.com/200/E84393/FFFFFF?text=Fisika' },
    ];

    const filters = ['Semua', 'Matematika', 'Bahasa Indonesia', 'IPA', 'IPS', 'Bahasa Inggris', 'Seni Budaya'];

    return (
        <>
            <SafeArea className="p-3">
                <div className="header mb-4">
                    <h1 className='text-xl font-bold text-gray-800 mb-1'>Temukan Kursus Baru</h1>
                    <p className='text-gray-600 text-sm'>Jelajahi ribuan kursus dari guru terbaik Indonesia</p>
                </div>

                <div className="search-filter mb-4">
                    <input
                        type="text"
                        placeholder="🔍 Cari kursus..."
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 text-sm"
                    />
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                        {filters.map(filter => (
                            <button key={filter} className="px-3 py-1.5 bg-blue-100 text-blue-600 rounded-full whitespace-nowrap hover:bg-blue-200 transition-colors text-sm">
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="courses-grid">
                    <h2 className="text-lg font-semibold mb-3 text-gray-800">Kursus Terbaru</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {courses.map(course => (
                            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <img src={course.thumbnail} alt={course.title} className="w-full h-32 object-cover" />
                                <div className="p-3">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            course.price === 'Gratis' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                                        }`}>
                                            {course.price}
                                        </span>
                                        <span className="text-yellow-500 text-xs">⭐ {course.rating}</span>
                                    </div>
                                    <h3 className="font-bold text-sm text-gray-800 mb-1 line-clamp-2">{course.title}</h3>
                                    <p className="text-blue-600 font-medium text-xs mb-1">{course.instructor}</p>
                                    <p className="text-gray-500 text-xs">{course.subject} • {course.level}</p>
                                    <button className="mt-2 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-1.5 rounded-md font-medium text-xs hover:from-blue-600 hover:to-purple-700 transition-all">
                                        Lihat Detail
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="load-more mt-6 text-center">
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                        Muat Lebih Banyak
                    </button>
                </div>
            </SafeArea>
        </>
    )
}