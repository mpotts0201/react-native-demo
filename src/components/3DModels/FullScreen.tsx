import { useState } from "react";
import { View, StyleSheet, useWindowDimensions, TouchableOpacity, Text } from "react-native";
import { Canvas } from '@react-three/fiber/native';
import Model from './Model';
import FallingAtSymbol from "./FallingAtSymbol";

const modelPath = require("../../assets/3DModels/email_at_symbol.glb")

const ExplosiveModel = () => {

};

const FullScreen = () => {
    const [show, setShow] = useState(true);
    const [reset, setReset] = useState(0);
    const { height, width } = useWindowDimensions()

    const handleReset = () => {
        setReset(reset + 1);
    };

    return (
        <View style={{ ...styles.canvas, ...{ display: show ? "flex" : "none" } }}> 
            <TouchableOpacity style={{ backgroundColor: "red", width: 100, height: 50 }} onPress={handleReset}>
                <Text>Reset</Text>
            </TouchableOpacity>
            <Canvas pointerEvents="none" camera={{ fov: 45, position: [0, 0, 10] }} frameloop='always' style={{ width, height }}>
                <ambientLight intensity={1.0} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <FallingAtSymbol reset={reset} />
                {/* <Model modelPath={modelPath} /> */}
            </Canvas>
        </View>
    );
};

const styles = StyleSheet.create({
    canvas: {
        position: "absolute",
        top: 0,
        left: 0,
    }
})

export default FullScreen;
