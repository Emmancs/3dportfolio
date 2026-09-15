import { useRef } from "react";

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

export default function Projects() {
    return (
        <div className="w-full h-full bg-[#050505] text-white overflow-hidden relative flex flex-col justify-center">
            {/* Dark glass background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="absolute top-12 left-16 z-10">
                <h2 className="text-4xl font-normal tracking-tight text-white/90">Featured Work</h2>
                <div className="w-12 h-1 bg-white/20 mt-4 rounded-full" />
            </div>

            {/* Horizontal Scroll Container */}
            <div className="w-full flex items-center px-16 h-auto">
                <div className="flex gap-12 w-max projects-track pr-32">
                    {PROJECTS.map((project) => (
                        <div
                            key={project.id}
                            className="shrink-0 w-[450px] rounded-3xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-3xl flex flex-col overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.04]"
                        >
                            <div className="h-64 w-full overflow-hidden relative">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-3xl font-medium mb-3 tracking-wide text-white/95">{project.title}</h3>
                                <p className="text-base text-gray-400 mb-8 font-light leading-relaxed flex-grow">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-3 mb-8">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="text-xs font-medium px-4 py-1.5 bg-white/5 text-gray-300 rounded-full border border-white/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    <button className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors">
                                        GitHub
                                    </button>
                                    <button className="flex-1 py-3 rounded-xl bg-white text-black hover:bg-gray-200 font-bold text-sm transition-colors">
                                        Live Demo
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
