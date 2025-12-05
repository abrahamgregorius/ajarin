import MobileNav from "./MobileNav";

export default function SafeArea({ children, className }) {
    return (
        <>
            <div className="w-full min-h-screen bg-blue-950">
                <div className="relative bg-white max-w-lg mx-auto overflow-y-auto pb-24">
                    <div className={`min-h-screen ${className ?? ""}`}>
                        {children}
                    </div>
                    <MobileNav></MobileNav>
                </div>
            </div>
        </>
    )
}