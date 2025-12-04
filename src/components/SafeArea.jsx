import MobileNav from "./MobileNav";

export default function SafeArea({ children }) {
    return (
        <>
            <div className="h-screen bg-blue-950">
                <div className="relative bg-white h-screen max-w-lg mx-auto my-0">
                    <div className="mb-100px">

                    </div>

                    <MobileNav></MobileNav>
                </div>
            </div>
        </>
    )
}