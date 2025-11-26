import { useEffect, useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
        <div className="relative-nav relative">
            <nav className={`${isScrolled ? 'bg-white/80 backdrop-blur-md' : 'bg-linear-to-r from-[#2765e8] to-[#3878ff]'} fixed top-13 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 px-6 md:px-8 rounded-full shadow-lg max-w-[95%] md:max-w-4xl w-full flex items-center justify-between transition-all duration-300 hover:shadow-xl`}>
                <a href="#" className={`${isScrolled ? 'text-black' : 'bg-linear-to-r from-[#0cc0df] to-[#ffde59] bg-clip-text text-transparent'} text-2xl font-bold no-underline transition-all duration-300 hover:scale-105`}>AJARIN</a>
                <ul className={`hidden md:flex list-none m-0 p-0 ${isOpen ? 'flex flex-col absolute top-full left-0 w-full bg-linear-to-r from-[#2765e8] to-[#3878ff] rounded-lg mt-2 p-4 z-50' : ''}`}>
                    <li className="md:ml-8"><a href="#" className={`${isScrolled ? 'text-black' : 'text-[#f0f7ff]'} text-lg no-underline transition-colors duration-300 hover:text-gray-700`}>Home</a></li>
                    <li className="md:ml-8"><a href="#" className={`${isScrolled ? 'text-black' : 'text-[#f0f7ff]'} text-lg no-underline transition-colors duration-300 hover:text-gray-700`}>About</a></li>
                    <li className="md:ml-8"><a href="#" className={`${isScrolled ? 'text-black' : 'text-[#f0f7ff]'} text-lg no-underline transition-colors duration-300 hover:text-gray-700`}>Contact</a></li>
                </ul>
                <button onClick={() => setIsOpen(!isOpen)} className={'text-2xl flex md:hidden text-white font-bold'} >&equiv;</button>
            </nav>
            <div className={`${isOpen ? 'flex' : 'hidden'} rounded-xl flex-col left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-[9rem] max-w-[90%] w-full fixed bg-linear-to-r from-[#2765e8] to-[#3878ff]`}>
                    <ul className="list-none px-4 py-2 ">
                        <li className="md:ml-8"><a href="#" className={`${isScrolled ? 'text-black' : 'text-[#f0f7ff]'} text-lg no-underline transition-colors duration-300 hover:text-gray-700`}>Home</a></li>
                        <li className="md:ml-8"><a href="#" className={`${isScrolled ? 'text-black' : 'text-[#f0f7ff]'} text-lg no-underline transition-colors duration-300 hover:text-gray-700`}>About</a></li>
                        <li className="md:ml-8"><a href="#" className={`${isScrolled ? 'text-black' : 'text-[#f0f7ff]'} text-lg no-underline transition-colors duration-300 hover:text-gray-700`}>Contact</a></li>
                    </ul>
            </div>
        </div>
        </>
    )
}