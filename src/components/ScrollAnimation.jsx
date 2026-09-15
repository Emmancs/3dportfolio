import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ScrollAnimation() {
    const { camera, scene } = useThree();

    const scroll = useRef(0);
    const targetScroll = useRef(0);

    const initialCameraPosition = useRef(
        new THREE.Vector3(0, 0, 5)
    );

    const cameraTarget = useRef(
        new THREE.Vector3()
    );

    const screenPosition = useRef(
        new THREE.Vector3()
    );

    const approachDirection = useRef(
        new THREE.Vector3()
    );

    useEffect(() => {
        const handleCinematicScroll = (e) => {
            targetScroll.current = e.detail;
        };

        window.addEventListener("cinematic-scroll", handleCinematicScroll);

        return () => {
            window.removeEventListener("cinematic-scroll", handleCinematicScroll);
        };
    }, []);

    useFrame(() => {
        // Smooth scroll
        scroll.current += (targetScroll.current - scroll.current) * 0.08;
        const progress = scroll.current;
        console.log("progress:", progress, "targetScroll:", targetScroll.current);

        const screen = scene.getObjectByName("Laptop_Screen");
        if (!screen) return;

        screen.getWorldPosition(screenPosition.current);

        approachDirection.current
            .subVectors(initialCameraPosition.current, screenPosition.current)
            .normalize();

        // Target slightly behind the screen to ensure the camera crosses it
        const passThroughDistance = -1.5; 
        
        const finalTarget = new THREE.Vector3()
            .copy(screenPosition.current)
            .add(approachDirection.current.clone().multiplyScalar(passThroughDistance));

        // Phases:
        // 0.00 - 0.25: Static
        // 0.25 - 0.92: Camera moves from initial to finalTarget (crossing the screen)
        // 0.92 - 1.00: Static behind the laptop
        
        let phaseProgress = (progress - 0.25) / (0.92 - 0.25);
        phaseProgress = THREE.MathUtils.clamp(phaseProgress, 0, 1);
        
        phaseProgress = phaseProgress * phaseProgress * (3 - 2 * phaseProgress); 

        camera.position.lerpVectors(
            initialCameraPosition.current,
            finalTarget,
            phaseProgress
        );

        // Look at a point infinitely far behind the screen to prevent flipping when passing through
        const lookTarget = new THREE.Vector3()
            .copy(screenPosition.current)
            .add(approachDirection.current.clone().multiplyScalar(-1000));

        camera.lookAt(lookTarget);
    });

    return null;
}