import { useGLTF, Html } from "@react-three/drei";
import ProjectShowcase from "./ProjectShowcase";

export default function Laptop(props) {
    const { nodes } = useGLTF("/models/laptop.glb");

    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes.Laptop_Body.geometry} material={nodes.Laptop_Body.material} position={nodes.Laptop_Body.position} rotation={nodes.Laptop_Body.rotation} scale={nodes.Laptop_Body.scale} />
            <mesh geometry={nodes.Laptop_Keyboard.geometry} material={nodes.Laptop_Keyboard.material} position={nodes.Laptop_Keyboard.position} rotation={nodes.Laptop_Keyboard.rotation} scale={nodes.Laptop_Keyboard.scale} />
            <mesh geometry={nodes.Laptop_Trackpad.geometry} material={nodes.Laptop_Trackpad.material} position={nodes.Laptop_Trackpad.position} rotation={nodes.Laptop_Trackpad.rotation} scale={nodes.Laptop_Trackpad.scale} />
            <mesh geometry={nodes.Laptop_Hinge_Left.geometry} material={nodes.Laptop_Hinge_Left.material} position={nodes.Laptop_Hinge_Left.position} rotation={nodes.Laptop_Hinge_Left.rotation} scale={nodes.Laptop_Hinge_Left.scale} />
            <mesh geometry={nodes.Laptop_Hinge_Right.geometry} material={nodes.Laptop_Hinge_Right.material} position={nodes.Laptop_Hinge_Right.position} rotation={nodes.Laptop_Hinge_Right.rotation} scale={nodes.Laptop_Hinge_Right.scale} />
            
            <group position={nodes.Lid.position} rotation={nodes.Lid.rotation} scale={nodes.Lid.scale}>
                <mesh geometry={nodes.Laptop_Display_Bezel.geometry} material={nodes.Laptop_Display_Bezel.material} position={nodes.Laptop_Display_Bezel.position} rotation={nodes.Laptop_Display_Bezel.rotation} scale={nodes.Laptop_Display_Bezel.scale} />
                <mesh geometry={nodes.Laptop_Screen.geometry} material={nodes.Laptop_Screen.material} position={nodes.Laptop_Screen.position} rotation={nodes.Laptop_Screen.rotation} scale={nodes.Laptop_Screen.scale}>
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