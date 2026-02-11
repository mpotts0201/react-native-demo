import { View, Text } from "react-native"
import { Suspense } from "react"
import ScreenContainer from "../../components/screenComponents/ScreenContainer"
import ModelTest from "../../components/3DModels/3DModelTest"
import { Canvas } from '@react-three/fiber/native';

const Landing = () => {
    return (
        <ScreenContainer>
            <View style={{ flexGrow: 1 }}>
                <Text>Landing Screen</Text>
                <Canvas style={{ flexGrow: 1 }}>
                    <Suspense fallback={null}>
                        <ModelTest scale={1.0} />
                    </Suspense>
                </Canvas>
            </View>
        </ScreenContainer>
    )
};

export default Landing;
