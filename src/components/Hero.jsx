

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col md:flex-row justify-between items-center px-8 md:px-16 mx-auto max-w-[1600px]">
            {/* Left Column */}
            <div className="w-full md:w-[42%] flex flex-col justify-center items-start text-left z-10 pt-20">
                <h1 className="text-5xl md:text-6xl font-normal text-white mb-2 tracking-tight leading-tight">
                    <span className="font-light text-gray-300 text-4xl md:text-5xl">Hello,</span><br />
                    <strong className="font-medium">I'm Emmanuel</strong>
                </h1>
                
                <p className="max-w-sm text-gray-400 text-sm md:text-base mt-6 mb-10 font-light leading-relaxed">
                    Full Stack Developer crafting thoughtful digital experiences, interactive applications, and creative web platforms.
                </p>
                
                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-white text-black text-xs font-medium rounded-full hover:bg-gray-200 transition-colors duration-300">
                        Explore Projects &rarr;
                    </button>
                    <button className="px-6 py-3 border border-white/20 text-white text-xs font-medium rounded-full hover:bg-white/5 transition-colors duration-300">
                        Let's Talk
                    </button>
                </div>
            </div>

            {/* Right Column - Spacer for 3D Laptop */}
            <div className="w-full md:w-[50%] h-[55vh] md:h-[65vh] relative mt-10 md:mt-0 flex flex-col items-center justify-center pointer-events-none">
            </div>
        </section>
    );
}
