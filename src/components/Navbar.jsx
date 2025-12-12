import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isCreatorOrAdmin = user?.role === 'creator' || user?.role === 'admin';
    const isAdmin = user?.role === 'admin';

    return (
        <>
        <div className="relative-nav relative">
            <nav className={`${isScrolled ? 'bg-white/80 backdrop-blur-md' : 'bg-linear-to-r from-[#2765e8] to-[#3878ff]'} fixed top-13 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 px-6 md:px-8 rounded-full shadow-lg max-w-[95%] md:max-w-4xl w-full hidden md:flex items-center justify-between transition-all duration-300 hover:shadow-xl`}>
                <a href="#" className={`${isScrolled ? 'text-black' : 'bg-linear-to-r from-[#0cc0df] to-[#ffde59] bg-clip-text text-transparent'} text-2xl font-bold no-underline transition-all duration-300 hover:scale-105`}>AJARIN</a>
                <ul className={`hidden md:flex list-none m-0 p-0`}>
                    {/* Creator Navigation */}
                    {isCreatorOrAdmin && user?.role === 'creator' && (
                        <>
                            <li className="md:ml-8"><Link to="/creator/upload" className={`${isScrolled ? 'text-black' : 'text-[#f0f7ff]'} text-lg no-underline transition-colors duration-300 hover:text-gray-700`}>Upload</Link></li>
                            <li className="md:ml-8"><Link to="/creator/videos" className={`${isScrolled ? 'text-black' : 'text-[#f0f7ff]'} text-lg no-underline transition-colors duration-300 hover:text-gray-700`}>Videos</Link></li>
                            <li className="md:ml-8"><Link to="/profil" className={`${isScrolled ? 'text-black' : 'text-[#f0f7ff]'} text-lg no-underline transition-colors duration-300 hover:text-gray-700`}>Profile</Link></li>
                        </>
                    )}

                    {/* Admin Navigation */}
                    {isAdmin && (
                        <>
                            <li className="md:ml-8"><Link to="/admin/moderation" className={`${isScrolled ? 'text-black' : 'text-[#f0f7ff]'} text-lg no-underline transition-colors duration-300 hover:text-gray-700`}>Admin</Link></li>
                            <li className="md:ml-8"><Link to="/profil" className={`${isScrolled ? 'text-black' : 'text-[#f0f7ff]'} text-lg no-underline transition-colors duration-300 hover:text-gray-700`}>Profile</Link></li>
                        </>
                    )}

                    {/* Student Navigation - Keep existing public links */}
                    {!isCreatorOrAdmin && (
                        <>
                            <li className="md:ml-8"><Link to="/beranda" className={`${isScrolled ? 'text-black' : 'text-[#f0f7ff]'} text-lg no-underline transition-colors duration-300 hover:text-gray-700`}>Beranda</Link></li>
                            <li className="md:ml-8"><Link to="/tentang" className={`${isScrolled ? 'text-black' : 'text-[#f0f7ff]'} text-lg no-underline transition-colors duration-300 hover:text-gray-700`}>Tentang</Link></li>
                            <li className="md:ml-8"><Link to="/kontak" className={`${isScrolled ? 'text-black' : 'text-[#f0f7ff]'} text-lg no-underline transition-colors duration-300 hover:text-gray-700`}>Kontak</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
        </>
    )
}
