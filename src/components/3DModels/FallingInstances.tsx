import React, { useRef, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useFrame, useThree } from '@react-three/fiber/native';
import { useGLTF } from '@react-three/drei/native';
import * as THREE from 'three';
import { selectShow, setShow } from "../../../store/slices/fullScreen3DSlice";
import { GLTF } from 'three-stdlib';


const AtModelSource = require("../../assets/3DModels/email_at_symbol.glb");

// interface AtGLTF extends GLTF {
//   nodes: {
//     // Replace 'AtSymbol' with the actual name of the object in Blender
//     AtSymbol: THREE.Mesh; 
//   };
//   materials: {
//     // If you have a specific material name
//     AtMaterial: THREE.MeshStandardMaterial;
//   };
// }

const GRAVITY = -9.18;
const COUNT = 300; // Number of falling symbols
const tempObject = new THREE.Object3D();

const FallingInstances = () => {
    const dispatch = useDispatch();
    const show = useSelector(selectShow);
    const { nodes } = useGLTF(AtModelSource) as any; // Extract geometry/material
    const meshRef = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();
    const finishedCount = useRef<Set<number>>(new Set());
    // Create an array of physics states for each instance
    const particles = useMemo(() => {
        return Array.from({ length: COUNT }, () => ({
            position: [Math.random() * viewport.width * (Math.random() > 0.5 ? 1 : -1), Math.random() * 15 + 9, Math.random() * 2],
            velocity: 0,
            floor: Math.random() * -10.0,
            firstBounce: false,
            dir: Math.random() > 0.5 ? 1 : -1,
        }));
    }, []);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        if (finishedCount.current && show) {
            if (finishedCount.current.size == COUNT) {
                dispatch(setShow(false));
            }
        }

        const offScreenLimit = -viewport.height / 2 - 2;
        const dt = Math.min(delta, 0.1);

        particles.forEach((p, i) => {
            // 1. Math: Update individual physics
            p.velocity += GRAVITY * dt; // Gravity
            p.position[1] += p.velocity * dt; // Apply to Y

            if (p.position[1] < p.floor && !p.firstBounce) {
                p.position[1] = p.floor;
                p.velocity *= -((Math.random() * 0.5) + 0.2); // Bounce
                p.firstBounce = true;
            }

            if (p.position[1] <= offScreenLimit) {
                finishedCount.current.add(i)
            }

            // 2. Visual: Update the instance matrix
            tempObject.position.set(...p.position);
            tempObject.rotation.x += 0.0005;
            tempObject.rotation.y += 0.0005;
            tempObject.rotation.z += 0.0005;
            tempObject.updateMatrix();

            meshRef.current.setMatrixAt(i, tempObject.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh 
            ref={meshRef}
            args={[nodes.Text.geometry, nodes.Text.material, COUNT]}
            scale={0.5}
        />
    );
};

export default FallingInstances;
