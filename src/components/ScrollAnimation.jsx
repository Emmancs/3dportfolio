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
        const handleScroll = () => {
            const maxScroll =
                document.documentElement.scrollHeight -
                window.innerHeight;

            targetScroll.current =
                maxScroll > 0
                    ? window.scrollY / maxScroll
                    : 0;
        };

        window.addEventListener("scroll", handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

    useFrame(() => {
        // Smooth scroll
        scroll.current +=
            (targetScroll.current - scroll.current) * 0.08;

        const progress = scroll.current;

        const screen =
            scene.getObjectByName("Laptop_Screen");

        if (!screen) return;

        // Get the actual world position of the screen
        screen.getWorldPosition(
            screenPosition.current
        );

        /*
          Find the direction from the screen
          toward the ORIGINAL camera.
    
          This guarantees that we approach the
          visible side of the laptop.
        */

        approachDirection.current
            .subVectors(
                initialCameraPosition.current,
                screenPosition.current
            )
            .normalize();

        /*
          Positions for the cinematic sequence:
          1. Viewport fill target (stops briefly to dominate the view)
          2. Pass-through target (camera goes completely inside/through the screen)
        */

        const viewportFillDistance = 0.6; // Units in front of screen

        const viewportFillTarget = new THREE.Vector3()
            .copy(screenPosition.current)
            .add(approachDirection.current.clone().multiplyScalar(viewportFillDistance));

        /*
          Animation phases:
          Phase 1 (0.00 - 0.35): Camera stays at start (handled by clamp).
          Phase 2 (0.35 - 0.90): Camera moves from start to viewportFillTarget
          Phase 3 (0.90 - 1.00): Camera stays at viewportFillTarget (handled by clamp).
        */

        let phaseProgress = (progress - 0.35) / (0.9 - 0.35);
        phaseProgress = THREE.MathUtils.clamp(phaseProgress, 0, 1);
        // Smoothstep for cinematic easing
        phaseProgress = phaseProgress * phaseProgress * (3 - 2 * phaseProgress); 

        camera.position.lerpVectors(
            initialCameraPosition.current,
            viewportFillTarget,
            phaseProgress
        );

        /*
          Always look at the center of the screen.
        */

        camera.lookAt(
            screenPosition.current
        );
    });

    return null;
}