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
        const passThroughDistance = -0.5; // Units behind screen

        const viewportFillTarget = new THREE.Vector3()
            .copy(screenPosition.current)
            .add(approachDirection.current.clone().multiplyScalar(viewportFillDistance));

        const passThroughTarget = new THREE.Vector3()
            .copy(screenPosition.current)
            .add(approachDirection.current.clone().multiplyScalar(passThroughDistance));

        /*
          Animation phases:
          Phase 1 (0.30 - 0.70): Camera moves from start to viewportFillTarget
          Phase 2 (0.70 - 0.90): Camera moves from viewportFillTarget to passThroughTarget
        */

        let phase1Progress = (progress - 0.3) / (0.7 - 0.3);
        phase1Progress = THREE.MathUtils.clamp(phase1Progress, 0, 1);
        phase1Progress = phase1Progress * phase1Progress * (3 - 2 * phase1Progress); // Smoothstep

        let phase2Progress = (progress - 0.7) / (0.9 - 0.7);
        phase2Progress = THREE.MathUtils.clamp(phase2Progress, 0, 1);
        // phase2Progress = phase2Progress * phase2Progress * (3 - 2 * phase2Progress); // Smoothstep
        phase2Progress = Math.pow(phase2Progress, 2); // Ease in for the final plunge

        if (progress <= 0.7) {
            camera.position.lerpVectors(
                initialCameraPosition.current,
                viewportFillTarget,
                phase1Progress
            );
        } else {
            camera.position.lerpVectors(
                viewportFillTarget,
                passThroughTarget,
                phase2Progress
            );
        }

        /*
          Always look at the center of the screen.
        */

        camera.lookAt(
            screenPosition.current
        );
    });

    return null;
}