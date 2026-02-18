import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Canvas } from '@react-three/fiber/native';
import { selectShow } from "../../../store/slices/fullScreen3DSlice";
import FallingWord from "./FallingWord";

const FullScreen = () => {
    const show = useSelector(selectShow)
    const [reset, setReset] = useState(0);
    const { height, width } = useWindowDimensions()

    if (!show) {
        return null;
    }

    return (
        <View pointerEvents="none" style={styles.canvas}>
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
