import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function MobileNav() {
    const location = useLocation();
    const [active, setActive] = useState('Beranda');

    useEffect(() => {
        if (location.pathname.startsWith('/profil')) {
            setActive('Profil');
        } else if (location.pathname.startsWith('/jelajahi')) {
            setActive('Jelajahi');
        } else if (location.pathname.startsWith('/langganan')) {
            setActive('Langganan');
        } else {
            setActive('Beranda');
        }
    }, [location.pathname]);

    const menuItems = [
        { name: 'Beranda', path: "/", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
        { name: 'Jelajahi', path: "/jelajahi", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> },
        { name: 'Langganan', path: "/langganan", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> },
        { name: 'Profil', path: "/profil", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> }
    ];

    return (
        <>
            <div className="fixed bottom-0 border-t border-blue-400 bg-blue-400 rounded-tl-[2rem] rounded-tr-[2rem] h-[100px] w-full max-w-lg">
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