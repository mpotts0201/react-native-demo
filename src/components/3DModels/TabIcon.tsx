import { View, ViewProps } from "react-native"
import { Canvas } from '@react-three/fiber/native';

interface Props extends ViewProps {}

const TabIcon = (props: Props) => {
    return (
        <View style={{ flex: 1 }}>
            <Canvas pointerEvents="none" camera={{ fov: 45, position: [0, 0, 10] }} frameloop='always' style={{ width: 150, height: 150 }}>
                <ambientLight intensity={1.0} />
                {/* <directionalLight position={[10, 10, 5]} intensity={1} /> */}
                {props.children}
            </Canvas>
        </View>
    );
};

export default TabIcon;
