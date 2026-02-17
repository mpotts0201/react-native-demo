import React, { SetStateAction, Dispatch, useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber/native';
import { useGLTF } from '@react-three/drei/native';
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';

const AtModelSource = require('../../assets/3DModels/email_at_symbol.glb');

const GRAVITY = -0.015; // Speed of the pull
const BOUNCE_DAMPING = 0.7; // Energy kept after a bounce (0.7 = 70%)
const FLOOR_Y = -2; // Where the "ground" is

const FallingAtSymbol = ({ reset }: { reset: number }) => {
  const [firstBounce, setFirstBounce] = useState(false)
  const { scene } = useGLTF(AtModelSource) as GLTF & { scene: THREE.Group };
  const meshRef = useRef(null);
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

  useFrame(() => {
    if (!meshRef.current) return;

    // 1. Apply gravity to velocity
    velocity.current += GRAVITY;

    // 2. Apply velocity to position
    positionY.current += velocity.current;

    // 3. Collision Detection (The Floor)
    if (positionY.current <= FLOOR_Y && !firstBounce) {
      setFirstBounce(true);
      positionY.current = FLOOR_Y; // Reset to floor level
      velocity.current *= -BOUNCE_DAMPING; // Reverse and dampen velocity
      
      // Stop small jitters when motion becomes tiny
      if (Math.abs(velocity.current) < 0.05) velocity.current = 0;
    }

    // 4. Update the actual 3D Mesh
    meshRef.current.position.y = positionY.current;
    
    // Bonus: Add a little rotation for style
    if (firstBounce) {
        meshRef.current.rotation.x += dir * 0.02;
        meshRef.current.rotation.y += dir * 0.02;
        meshRef.current.rotation.z += dir * 0.01;
    }
  });

  return <primitive ref={meshRef} object={scene} scale={0.5} />;
}

export default FallingAtSymbol;
