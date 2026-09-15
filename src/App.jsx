import { useEffect, useState } from "react";
import Scene from "./components/Scene";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

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

  return (
    <main className="bg-[#050505] text-white selection:bg-white selection:text-black">
      {/* Fixed 3D Scene */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene />
      </div>

      {/* Navbar overlay */}
      <Navbar progress={progress} />

      {/* Scrollable page */}
      <div className="relative z-10">
        <Hero progress={progress} />
        
        {/* Spacer for 3D animation (2 screens worth of scrolling) */}
        <section className="h-[200vh] pointer-events-none" />
      </div>
    </main>
  );
}