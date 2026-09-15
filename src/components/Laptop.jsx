import { useGLTF, Html } from "@react-three/drei";
import ProjectShowcase from "./ProjectShowcase";

export default function Laptop(props) {
    const { nodes } = useGLTF("/models/laptop.glb");

    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes.Laptop_Body.geometry} material={nodes.Laptop_Body.material} />
            <mesh geometry={nodes.Laptop_Keyboard.geometry} material={nodes.Laptop_Keyboard.material} />
            <mesh geometry={nodes.Laptop_Trackpad.geometry} material={nodes.Laptop_Trackpad.material} />
            <mesh geometry={nodes.Laptop_Hinge_Left.geometry} material={nodes.Laptop_Hinge_Left.material} />
            <mesh geometry={nodes.Laptop_Hinge_Right.geometry} material={nodes.Laptop_Hinge_Right.material} />
            
            <group position={nodes.Lid.position} rotation={nodes.Lid.rotation} scale={nodes.Lid.scale}>
                <mesh geometry={nodes.Laptop_Display_Bezel.geometry} material={nodes.Laptop_Display_Bezel.material} />
                <mesh geometry={nodes.Laptop_Screen.geometry} material={nodes.Laptop_Screen.material}>
                    <Html
                        transform
                        occlude="blending" // use blending occlusion so it looks natural behind the bezel if it were to overflow, though it won't
                        position={[0, -0.001, 0]} // Offset slightly in -Y (the direction it faces)
                        rotation={[Math.PI / 2, 0, 0]} // Rotate to face -Y and upright
                        scale={0.308 / 1024}
                    >
                        <div className="w-[1024px] h-[691px] overflow-hidden bg-[#050505]">
                            <ProjectShowcase />
                        </div>
                    </Html>
                </mesh>
            </group>
        </group>
    );
}

useGLTF.preload("/models/laptop.glb");