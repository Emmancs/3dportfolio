import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Scene from "./Scene";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Projects from "./Projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CinematicScene() {
    const containerRef = useRef();
    const heroRef = useRef();
    const projectsRef = useRef();
    const sceneWrapperRef = useRef();

    useGSAP(() => {
        // We will dispatch a custom event or store progress in a global object 
        // that the R3F Canvas can read, to avoid re-rendering the whole component tree.
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=4000", // 4000px of scrolling for the cinematic sequence
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    // Dispatch event for Canvas to pick up
                    window.dispatchEvent(new CustomEvent('cinematic-scroll', { detail: self.progress }));
                }
            }
        });

        // 0.25 -> 0.40 HERO FADES
        tl.to(heroRef.current, {
            opacity: 0,
            y: -50,
            pointerEvents: "none",
            ease: "power2.inOut",
            duration: 0.15
        }, 0.25);

        // 0.92 -> 1.00 PROJECTS REVEAL & HORIZONTAL SCROLL
        // The camera passes through at 0.92
        tl.to(projectsRef.current, {
            opacity: 1,
            pointerEvents: "auto",
            ease: "power2.inOut",
            duration: 0.03
        }, 0.92);

        // Horizontal scrolling of projects track
        tl.to(".projects-track", {
            x: () => {
                const track = document.querySelector(".projects-track");
                if (!track) return 0;
                return -(track.scrollWidth - window.innerWidth);
            },
            ease: "none",
            duration: 0.05
        }, 0.95);

        // Enforce timeline total duration to 1.0 exactly
        tl.to({}, { duration: 0 }, 1.0);
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#050505]">
            <div ref={sceneWrapperRef} className="absolute inset-0 z-0 pointer-events-none">
                <Scene />
            </div>

            <div className="absolute inset-0 z-10">
                <Navbar />
            </div>
            
            <div ref={heroRef} className="absolute inset-0 z-10">
                <Hero />
            </div>

            <div ref={projectsRef} className="absolute inset-0 z-20 opacity-0 pointer-events-none">
                <Projects />
            </div>
        </div>
    );
}
