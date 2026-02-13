import { SetStateAction, useRef, useState, Dispatch } from "react";
import { Mesh } from "three"
import { useGLTF } from '@react-three/drei/native';
import { useFrame } from '@react-three/fiber/native';
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';

// const modelPath = require("../../assets/3DModels/star.glb");

interface Props {
    isSpinning: boolean;
    setIsSpinning: Dispatch<SetStateAction<boolean>>;
    modelPath: any;
}

// TODO: Find correct extendable prop type
const SpinningIcon = (props: any) => {
    const { isSpinning, setIsSpinning, modelPath } = props
    const { scene } = useGLTF(modelPath) as GLTF & { scene: THREE.Group };
    const meshRef = useRef<Mesh>(null);

    // const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);

    useFrame((state, delta) => {
        if (isSpinning && meshRef.current) {
        // Rotate 3 times (3 * 2 * PI = 18.85 radians)
        const targetRotation = 2 * Math.PI;
        const rotationSpeed = 20; // Adjust speed as needed
        
        if (rotation < targetRotation) {
            const nextRotation = Math.min(rotation + delta * rotationSpeed, targetRotation);
            meshRef.current.rotation.y += (nextRotation - rotation);
            setRotation(nextRotation);
        } else {
            // Reset state after 3 spins
            setIsSpinning(false);
            setRotation(0);
        }
        }
    });

    // Clone the scene to avoid issues with multiple instances if needed
    return (<mesh object={scene.clone()} {...props} ref={meshRef} />);
}

// Preload the model for faster loading
// useGLTF.preload(modelPath);

export default SpinningIcon;