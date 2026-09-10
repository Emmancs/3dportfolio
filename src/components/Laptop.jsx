import { useGLTF } from "@react-three/drei";

export default function Laptop(props) {
    const { scene } = useGLTF("/models/laptop.glb");

    return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/laptop.glb");