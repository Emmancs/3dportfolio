import { useEffect, useState } from "react";
import Scene from "./components/Scene";
import Hero from "./components/Hero";

export default function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setProgress(maxScroll > 0 ? currentScroll / maxScroll : 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fade out the 3D scene from 0.85 to 1.0 so it seamlessly transitions out
  // The camera is already through the screen, so this just cleans up the view.
  const sceneOpacity = Math.max(0, 1 - Math.max(0, (progress - 0.85) / 0.15));

  return (
    <main className="bg-black text-white selection:bg-white selection:text-black">
      {/* Fixed 3D Scene */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: sceneOpacity, transition: "opacity 0.1s ease-out" }}
      >
        <Scene />
      </div>

      {/* Scrollable page */}
      <div className="relative z-10">
        {/* Spacer for 3D animation (2 screens worth of scrolling) */}
        <section className="h-[200vh] pointer-events-none" />

        {/* Portfolio Landing State */}
        <Hero progress={progress} />
      </div>
    </main>
  );
}