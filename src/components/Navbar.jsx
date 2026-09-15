export default function Navbar({ progress }) {
    // Fade out navbar as well if needed, or keep it sticky. 
    // The instructions say: "The hero begins transitioning away. Laptop becomes visible."
    // Let's fade out the navbar slightly or keep it. I'll keep it at top, maybe fade out if scroll > 0.25
    
    const opacity = Math.max(0, 1 - Math.max(0, (progress - 0.25) / 0.10));
    const pointerEvents = progress < 0.35 ? "auto" : "none";

    return (
        <nav 
            className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 backdrop-blur-md bg-black/30 border-b border-white/5"
            style={{ opacity, pointerEvents, transition: "opacity 0.1s ease-out" }}
        >
            <div className="text-white font-bold tracking-widest text-sm">
                EMMANUEL WINFRED
            </div>
            <ul className="flex gap-8 text-gray-300 text-sm tracking-wider font-light">
                <li className="hover:text-white cursor-pointer transition-colors">Home</li>
                <li className="hover:text-white cursor-pointer transition-colors">Projects</li>
                <li className="hover:text-white cursor-pointer transition-colors">About</li>
                <li className="hover:text-white cursor-pointer transition-colors">Skills</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
        </nav>
    );
}
