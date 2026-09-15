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

            <Laptop position={[2.0, -0.5, 0]} rotation={[0.1, -0.3, 0]} scale={4.0} />

            <ScrollAnimation />
        </Canvas>
    );
}