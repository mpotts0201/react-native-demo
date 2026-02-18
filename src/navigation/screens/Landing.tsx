import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setShow } from "../../../store/slices/fullScreen3DSlice";
import ScreenContainer from "../../components/screenComponents/ScreenContainer";

const Landing = () => {
    const dispatch = useDispatch();
    const handleOrder = () => {
        dispatch(setShow(true));
    };

    return (
        <ScreenContainer>
            <View>
                <TouchableOpacity onPress={handleOrder}>
                    <Text>Landing Screen</Text>
                </TouchableOpacity>
            </View>
        </ScreenContainer>
    );
};

export default Landing;
