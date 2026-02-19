import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setShow, setAnimationName, AnimationNames, selectShow } from "../../../store/slices/fullScreen3DSlice";
import ScreenContainer from "../../components/screenComponents/ScreenContainer";

const Landing = () => {
    const dispatch = useDispatch();
    const show = useSelector(selectShow);

    const handleOrder = () => {
        if (!show) {
            dispatch(setAnimationName(AnimationNames.ORDERED));
            dispatch(setShow(true));
        }
    };

    const handlePizza = () => {
        if (!show) {
            dispatch(setAnimationName(AnimationNames.PIZZA));
            dispatch(setShow(true));
        }
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
