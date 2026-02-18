import { useState } from "react";
import { View, StyleSheet, useWindowDimensions, TouchableOpacity, Text } from "react-native";
import { Canvas } from '@react-three/fiber/native';
import FallingAtSymbol from "./FallingAtSymbol";
import FallingWord from "./FallingWord";

const FullScreen = () => {
    const [show, setShow] = useState(false);
    const [reset, setReset] = useState(0);
    const { height, width } = useWindowDimensions()

    const handleReset = () => {
        setReset(reset + 1);
    };

    if (!show) {
        return null;
    }

    return (
        <View style={{ ...styles.canvas, ...{ display: show ? "flex" : "none" } }}> 
            <TouchableOpacity style={{ backgroundColor: "red", width: 100, height: 50 }} onPress={handleReset}>
                <Text>Reset</Text>
            </TouchableOpacity>
            <Canvas pointerEvents="none" camera={{ fov: 45, position: [0, 0, 10] }} frameloop='always' style={{ width, height }}>
                <ambientLight intensity={1.0} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <FallingWord reset={reset} />
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
