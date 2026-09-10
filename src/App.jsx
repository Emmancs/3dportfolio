import Scene from "./components/Scene";

export default function App() {
  return (
    <main className="bg-black">

      {/* Fixed 3D Scene */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Scrollable page */}
      <div className="relative z-10">

        <section className="h-screen pointer-events-none">
        </section>

        <section className="h-screen">
        </section>

        <section className="h-screen">
        </section>

      </div>

    </main>
  );
}