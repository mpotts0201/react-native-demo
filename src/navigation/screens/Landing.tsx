import { View, Text } from "react-native"
import { Suspense } from "react"
import ScreenContainer from "../../components/screenComponents/ScreenContainer"
import ModelTest from "../../components/3DModels/3DModelTest"
import StarModel from "../../components/3DModels/SpinningIcon"
import { Canvas } from '@react-three/fiber/native';

const Landing = () => {
    return (
        <ScreenContainer>
            <View>
                <Text>Landing Screen</Text>
            </View>
        </ScreenContainer>
    )
};

export default Landing;
