import { View, Text } from "react-native"
import { Suspense } from "react"
import ScreenContainer from "../../components/screenComponents/ScreenContainer"
import ModelTest from "../../components/3DModels/3DModelTest"
import StarModel from "../../components/3DModels/StarModel"
import { Canvas } from '@react-three/fiber/native';

const Landing = () => {
    return (
        <ScreenContainer>
            <View>
                <Text>Landing Screen</Text>
                <Canvas frameloop="always" style={{ width: 100, height: 100 }}>
                    <Suspense fallback={null}>
                        <ambientLight intensity={1.0} />
                        <directionalLight position={[10, 10, 5]} intensity={1} />
                        <StarModel scale={0.5} />
                    </Suspense>
                </Canvas>
            </View>
        </ScreenContainer>
    )
};

export default Landing;
