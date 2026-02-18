import React, { useRef, useEffect, useState, RefObject } from 'react';
import { useFrame } from '@react-three/fiber/native';
import { useGLTF } from '@react-three/drei/native';
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';

const GRAVITY = -0.01; // Speed of the pull
// const BOUNCE_DAMPING = (Math.random() * 0.5) + 0.2; // Energy kept after a bounce (0.7 = 70%)
const FLOOR_Y = -2; // Where the "ground" is

const FallingLetter = ({ finishedCount, xPos = 0, reset, modelSource }: { finishedCount: RefObject<Set<number>>; xPos: number; reset: number, modelSource: any }) => {
    const BOUNCE_DAMPING = (Math.random() * 0.5) + 0.2; // Energy kept after a bounce (0.7 = 70%)
    const [firstBounce, setFirstBounce] = useState(false)
    const { scene } = useGLTF(modelSource) as GLTF & { scene: THREE.Group };
    const meshRef = useRef<THREE.Mesh>(null);
    const dir = Math.random() > 0.5 ? 1 : -1
    // We use refs for physics variables to avoid React re-renders 
    // (This keeps it running at a smooth 60fps)
    const velocity = useRef(0);
    const positionY = useRef(5);

    useEffect(() => {
        if (reset && meshRef.current) {
        setFirstBounce(false)
        velocity.current = 0
        positionY.current = 5
        meshRef.current.rotation.x = 0.0;
        meshRef.current.rotation.y = 0.0;
        meshRef.current.rotation.z = 0.0;
        }
    }, [reset]);

    useFrame((state) => {
        if (!meshRef.current) return;

        const { viewport } = state; // Automatically updates on rotation/resize
    
        const offScreenLimit = -viewport.height / 2 - 2; 

        // const positionX = (viewport.width / length) * index
        meshRef.current.position.x = xPos
        // // Calculate boundaries (accounting for model scale, approx 0.5 units)
        // const margin = 0.5;
        // const floor = -viewport.height / 2 + margin;
        // const rightWall = viewport.width / 2 - margin;
        // const leftWall = -viewport.width / 2 + margin;

        // 1. Apply gravity to velocity
        velocity.current += GRAVITY;

        // 2. Apply velocity to position
        positionY.current += velocity.current;

        // 3. Collision Detection (The Floor)
        if (positionY.current <= FLOOR_Y && !firstBounce) {
            setFirstBounce(true);
            positionY.current = FLOOR_Y; // Reset to floor level
            velocity.current *= -BOUNCE_DAMPING; // Reverse and dampen velocity
            
        }
        // signal to parent set when off screen
        if (positionY.current <= offScreenLimit) {
            finishedCount.current.add(xPos);
        };

        // 4. Update the actual 3D Mesh
        meshRef.current.position.y = positionY.current;
        
        // Bonus: Add a little rotation for style
        if (firstBounce) {
            meshRef.current.rotation.x += dir * 0.02;
            meshRef.current.rotation.y += dir * 0.02;
            meshRef.current.rotation.z += dir * 0.01;
        }
    });

    return <primitive ref={meshRef} object={scene.clone()} scale={0.55} />;
};

export default FallingLetter;
