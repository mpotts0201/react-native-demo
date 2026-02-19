import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setShow, setAnimationName, AnimationNames } from "../../../store/slices/fullScreen3DSlice";
import ScreenContainer from "../../components/screenComponents/ScreenContainer";

const Landing = () => {
    const dispatch = useDispatch();
    const handleOrder = () => {
        dispatch(setAnimationName(AnimationNames.ORDERED));
        dispatch(setShow(true));
    };

    const handlePizza = () => {
        dispatch(setAnimationName(AnimationNames.PIZZA));
        dispatch(setShow(true));
    };

    return (
        <ScreenContainer>
            <View>
                <TouchableOpacity onPress={handleOrder}>
                    <Text>Click to order</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePizza}>
                    <Text>Click for pizza</Text>
                </TouchableOpacity>
            </View>
        </ScreenContainer>
    );
};

export default Landing;
