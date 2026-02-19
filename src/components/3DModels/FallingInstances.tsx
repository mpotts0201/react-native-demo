import React, { useRef, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useFrame, useThree } from '@react-three/fiber/native';
import { useGLTF } from '@react-three/drei/native';
import * as THREE from 'three';
import { selectShow, setShow } from "../../../store/slices/fullScreen3DSlice";
import { GLTF } from 'three-stdlib';


const AtModelSource = require("../../assets/3DModels/pizza_slice.glb");

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
const COUNT = 6; // Number of falling symbols
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
                // 1. Initial random rotation (Euler)
            rot: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
            // 2. Random spin velocity for each axis
            spin: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2,
                z: (Math.random() - 0.5) * 2,
            }
        }));
    }, []);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        if (finishedCount.current && show) {
            if (finishedCount.current.size == COUNT) {
                dispatch(setShow(false));
            }
        }

        const offScreenLimit = -viewport.height - 2;
        const dt = Math.min(delta, 0.1);

        particles.forEach((p, i) => {
            // 1. Math: Update individual physics
            p.velocity += GRAVITY * dt; // Gravity
            p.position[1] += p.velocity * dt; // Apply to Y

            // Update the rotation values over time
            p.rot.x += p.spin.x * dt;
            p.rot.y += p.spin.y * dt;
            p.rot.z += p.spin.z * dt;

            if (p.position[1] < p.floor && !p.firstBounce) {
                p.position[1] = p.floor;
                p.velocity *= -((Math.random() * 0.5) + 0.2); // Bounce
                p.firstBounce = true;
            }

            if (p.position[1] <= offScreenLimit) {
                finishedCount.current.add(i)
            }

            // 2. Visual: Update the instance matrix
            tempObject.position.set(p.position[0], p.position[1], p.position[2]);
            tempObject.rotation.set(p.rot.x, p.rot.y, p.rot.z);
            tempObject.updateMatrix();

            meshRef.current.setMatrixAt(i, tempObject.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh 
            ref={meshRef}
            args={[nodes.pizza.geometry, nodes.pizza.material, COUNT]}
            scale={0.4}
        />
    );
};

export default FallingInstances;
