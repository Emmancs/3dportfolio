import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import Laptop from "./Laptop";
import ScrollAnimation from "./ScrollAnimation";

export default function Scene() {
    return (
        <Canvas
            camera={{
                position: [0, 0, 5],
                fov: 45,
            }}
        >
            <ambientLight intensity={1.5} />

            <Environment preset="studio" />

            <Laptop />

            <ScrollAnimation />
        </Canvas>
    );
}