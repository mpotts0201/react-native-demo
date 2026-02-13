import { useGLTF } from '@react-three/drei/native';
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';
// import modelPath from "../../assets/3DModels/cone.glb";

// const modelPath = require("../../assets/3DModels/tentacle_monster_instance2.glb");

const Model = (props: any) => {
    const { modelPath } = props
    const { scene } = useGLTF(modelPath) as GLTF & { scene: THREE.Group };

    // Clone the scene to avoid issues with multiple instances if needed
    return <primitive object={scene.clone()} {...props} />;
}

// Preload the model for faster loading
// useGLTF.preload(modelPath);

export default Model;