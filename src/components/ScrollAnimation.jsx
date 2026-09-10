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
          Distance between camera and screen.
    
          1.5 means the camera stops
          1.5 units in front of the screen.
        */

        cameraTarget.current
            .copy(screenPosition.current)
            .add(
                approachDirection.current
                    .clone()
                    .multiplyScalar(1.5)
            );

        /*
          Animation starts at 30%
          and reaches the screen at 75%.
        */

        const start = 0.3;
        const end = 0.75;

        let screenProgress =
            (progress - start) /
            (end - start);

        screenProgress = THREE.MathUtils.clamp(
            screenProgress,
            0,
            1
        );

        /*
          Smoothstep easing
        */

        screenProgress =
            screenProgress *
            screenProgress *
            (3 - 2 * screenProgress);

        /*
          Move camera from initial position
          toward the screen.
        */

        camera.position.lerpVectors(
            initialCameraPosition.current,
            cameraTarget.current,
            screenProgress
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