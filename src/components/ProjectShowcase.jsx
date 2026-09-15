import { useEffect, useRef } from "react";

const PROJECTS = [
    {
        id: 1,
        title: "AI Workspace",
        description: "An intelligent workspace integrating language models into your daily workflow.",
        tags: ["React", "Node.js", "OpenAI"],
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "SmartFlow AI",
        description: "Automated pipeline management powered by predictive machine learning.",
        tags: ["Python", "TensorFlow", "Next.js"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "VoltIQ",
        description: "Smart grid monitoring dashboard for sustainable energy grids.",
        tags: ["Vue", "D3.js", "Firebase"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Lecture Lip AI",
        description: "Real-time accessibility tool for lip-reading and transcription in lectures.",
        tags: ["React Native", "PyTorch", "WebRTC"],
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    },
];

export default function ProjectShowcase() {
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            // Prevent default vertical scrolling if we can scroll horizontally
            const atLeftEdge = container.scrollLeft === 0;
            const atRightEdge = Math.ceil(container.scrollLeft) >= container.scrollWidth - container.clientWidth;

            if (e.deltaY > 0 && !atRightEdge) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            } else if (e.deltaY < 0 && !atLeftEdge) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        };

        // Needs to be non-passive to call preventDefault
        container.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
        };
    }, []);

    return (
        <div 
            className="w-full h-full bg-[#0a0a0a] text-white overflow-hidden relative"
            // We use a specific aspect ratio or size in Laptop.jsx, so width/height 100% fills the screen mesh perfectly
        >
            {/* Dark glass background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="absolute top-8 left-12 z-10">
                <h2 className="text-3xl font-bold tracking-tight text-white/90">Featured Work</h2>
                <div className="w-12 h-1 bg-white/20 mt-2 rounded-full" />
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={scrollContainerRef}
                className="w-full h-full flex items-center overflow-x-auto overflow-y-hidden snap-x snap-mandatory px-12 hide-scrollbar pb-8 pt-16"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                <div className="flex gap-8 w-max pr-12">
                    {PROJECTS.map((project) => (
                        <div
                            key={project.id}
                            className="snap-center shrink-0 w-[400px] h-[450px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] hover:bg-white/10"
                        >
                            <div className="h-48 w-full overflow-hidden relative">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold mb-2 tracking-wide text-white/95">{project.title}</h3>
                                <p className="text-sm text-gray-400 mb-6 font-light leading-relaxed flex-grow">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="text-xs font-medium px-3 py-1 bg-white/10 text-gray-300 rounded-full border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    <button className="flex-1 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-sm font-medium transition-colors">
                                        GitHub
                                    </button>
                                    <button className="flex-1 py-2 rounded-lg bg-white text-black hover:bg-gray-200 font-bold text-sm transition-colors">
                                        Live Demo
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
