import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Canvas } from '@react-three/fiber/native';
import { Physics, RigidBody } from '@react-three/rapier';
import Model from './Model';

const modelPath = require("../../assets/3DModels/star.glb")

const ExplosiveModel = () => {

};

const FullScreen = () => {
    const { height, width } = useWindowDimensions()
    return (
        <View>
            <Canvas pointerEvents="none" camera={{ fov: 45, position: [0, 0, 10] }} frameloop='always' style={{ ...styles.canvas, ...{ width, height }}}>
                <ambientLight intensity={1.0} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Physics debug>
                    <RigidBody colliders="ball" restitution={1.2}>
                        <Model modelPath={modelPath} />
                    </RigidBody>
                </Physics>
            </Canvas>
        </View>
    );
};

const styles = StyleSheet.create({
    canvas: {
        backgroundColor: "red",
        position: "absolute",
        top: 0,
        left: 0,
    }
})

export default FullScreen;
