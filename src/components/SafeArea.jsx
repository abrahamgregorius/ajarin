import MobileNav from "./MobileNav";
import { useLocation } from 'react-router-dom';

export default function SafeArea({ children, className }) {
    const location = useLocation();
    const isAuthPage = location.pathname === '/masuk' || location.pathname === '/daftar';

    return (
        <>
            <div className="w-full min-h-screen bg-blue-950">
                <div className="relative bg-white max-w-lg mx-auto overflow-y-auto pb-24">
                    <div className={`min-h-screen ${className ?? ""}`}>
                        {children}
                    </div>
                    {!isAuthPage && <MobileNav />}
                </div>
            </div>
        </>
    )
}