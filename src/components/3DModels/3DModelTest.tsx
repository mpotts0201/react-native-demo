import { useEffect } from "react"
import { useGLTF, useAnimations } from '@react-three/drei/native';
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';
// import modelPath from "../../assets/3DModels/cone.glb";

const modelPath = require("../../assets/3DModels/tentacle_monster_instance2.glb");

const ModelTest = (props: any) => {
    const { scene, animations } = useGLTF(modelPath) as GLTF & { scene: THREE.Group };

    const { actions } = useAnimations(animations, scene);

    useEffect(() => {
        // Play a specific animation track by name
        actions['injury']?.play();
    }, [actions]);

    // Clone the scene to avoid issues with multiple instances if needed
    return <primitive object={scene.clone()} {...props} />;
}

// Preload the model for faster loading
useGLTF.preload(modelPath);

export default ModelTest;
