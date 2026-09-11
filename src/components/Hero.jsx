

export default function Hero({ progress }) {

    // Fade in between 0.85 and 1.0
    const opacity = Math.max(0, Math.min(1, (progress - 0.85) / 0.15));
    const pointerEvents = progress > 0.85 ? "auto" : "none";

    return (
        <section
            className="min-h-screen flex flex-col justify-center items-center text-center px-4"
            style={{
                opacity,
                pointerEvents,
                transition: "opacity 0.1s ease-out",
            }}
        >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4">
                EMMANUEL WINFRED
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-400 mb-8 tracking-widest font-light">
                FULL STACK DEVELOPER
            </h2>
            <p className="max-w-2xl text-gray-300 text-lg md:text-xl mb-12 font-light leading-relaxed">
                Building interactive digital experiences,
                full-stack applications, and creative web experiences.
            </p>
            <div className="flex gap-6">
                <button className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 tracking-wider text-sm">
                    VIEW PROJECTS
                </button>
                <button className="px-8 py-3 border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white transition-colors duration-300 tracking-wider text-sm">
                    GITHUB
                </button>
            </div>
        </section>
    );
}
