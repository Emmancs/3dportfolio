export default function Navbar({ progress }) {
    // Fade out when scrolling (0.25 to 0.40)
    const opacity = Math.max(0, 1 - Math.max(0, (progress - 0.25) / 0.15));
    const pointerEvents = progress < 0.4 ? "auto" : "none";

    return (
        <nav 
            className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-16 h-[64px] border-b border-white/[0.05] bg-[#050505]/80 backdrop-blur-md"
            style={{ opacity, pointerEvents, transition: "opacity 0.2s ease-out" }}
        >
            <div className="text-white font-medium tracking-wide text-sm">
                EMMANUEL WINFRED
            </div>
            <ul className="flex gap-8 text-gray-400 text-xs tracking-wide font-light">
                <li className="hover:text-white cursor-pointer transition-colors">Home</li>
                <li className="hover:text-white cursor-pointer transition-colors">Projects</li>
                <li className="hover:text-white cursor-pointer transition-colors">About</li>
                <li className="hover:text-white cursor-pointer transition-colors">Skills</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
        </nav>
    );
}
