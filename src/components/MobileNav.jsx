import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function MobileNav() {
    const { user } = useAuth();
    const location = useLocation();
    const [active, setActive] = useState('');

    useEffect(() => {
        if (location.pathname.startsWith('/profil')) {
            setActive('Profil');
        } else if (location.pathname === '/profil') {
            setActive('Profile');
        } else if (location.pathname.startsWith('/kelas')) {
            setActive('Kelas');
        } else if (location.pathname.startsWith('/shop')) {
            setActive('Shop');
        } else if (location.pathname.startsWith('/ranking')) {
            setActive('Ranking');
        } else if (location.pathname.startsWith('/creator/upload')) {
            setActive('Upload');
        } else if (location.pathname.startsWith('/creator/videos')) {
            setActive('Videos');
        } else if (location.pathname.startsWith('/admin')) {
            setActive('Admin');
        } else if (location.pathname.startsWith('/bantuan')) {
            setActive('Profil');
        } else if (location.pathname.startsWith('/edit-profil')) {
            setActive('Profil');
        } else {
            setActive('Beranda');
        }
    }, [location.pathname]);

    const isCreatorOrAdmin = user?.role === 'creator' || user?.role === 'admin';
    const isAdmin = user?.role === 'admin';

    const baseMenuItems = [
        { name: 'Beranda', path: "/", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
        { name: 'Kelas', path: "/kelas", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> },
        { name: 'Shop', path: "/shop", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> },
    ];

    // Define menu items based on role
    let menuItems = [];

    if (isCreatorOrAdmin && user?.role === 'creator') {
        // Creator menu: Upload, Videos, Profile
        menuItems = [
            { name: 'Upload', path: "/creator/upload", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg> },
            { name: 'Videos', path: "/creator/videos", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> },
            { name: 'Profile', path: "/profil", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> }
        ];
    } else if (isAdmin) {
        // Admin menu: Admin, Profile
        menuItems = [
            { name: 'Admin', path: "/admin/moderation", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
            { name: 'Profile', path: "/profil", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> }
        ];
    } else {
        // Student menu: Base items + Ranking + Profile
        menuItems = [
            ...baseMenuItems,
            { name: 'Ranking', path: "/ranking", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
            { name: 'Profil', path: "/profil", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> }
        ];
    }

    return (
        <>
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 border-t border-blue-400 bg-blue-400 rounded-tl-[2rem] rounded-tr-[2rem] h-[100px] w-full max-w-lg z-50">
                <div className="flex justify-around items-center h-full px-4">
                    {menuItems.map((item) => (
                        <Link to={`${item.path}`}
                            key={item.name}
                        >
                            <div
                                onClick={() => setActive(item.name)}
                                className={`w-19 h-16 flex flex-col select-none items-center justify-center rounded-lg transition-colors duration-200 ${active === item.name ? 'bg-white/20' : 'hover:bg-white/10'
                                    }`}
                            >
                                <div className={`mb-1 ${active === item.name ? 'text-white' : 'text-blue-100'}`}>
                                    {item.icon}
                                </div>
                                <span className={`text-xs font-medium ${active === item.name ? 'text-white' : 'text-blue-100'}`}>
                                    {item.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
