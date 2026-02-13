import { useState, SetStateAction, Dispatch, FC } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import SpinningIcon from '../3DModels/SpinningIcon';
import TabIcon from '../3DModels/TabIcon';
import { routes } from '../../navigation'

const modelPathStar = require("../../assets/3DModels/star.glb");
const modelPathAtSymbol = require("../../assets/3DModels/email_at_symbol.glb");

const navbarItems = [
    {
        route: routes.LANDING,
        modelPath: modelPathStar
    },
    {
        route: routes.UI_LIB,
        modelPath: modelPathAtSymbol
    }
]

const NavBarItem = ({ selected, route, setSelected, modelPath }: { selected: boolean; route: SetStateAction<routes>, setSelected: Dispatch<SetStateAction<routes>>, modelPath: any }) => {
    const [isSpinning, setIsSpinning] = useState(false);

    const handlePress = () => {
        console.log("Pressed")
        setSelected(route)
        setIsSpinning(true)
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.pressable}>
            <TabIcon>
                <SpinningIcon scale={2.0} isSpinning={isSpinning} setIsSpinning={setIsSpinning} modelPath={modelPath} />
            </TabIcon>
        </TouchableOpacity>
    );
};

const BottomNavBar = () => {
    const [selected, setSelected] = useState<routes>(routes.LANDING);

    const renderNavItems = () => {
        return navbarItems.map((item) => {
            return <NavBarItem key={item.route} selected={item.route == selected} route={item.route} setSelected={setSelected} modelPath={item.modelPath} />;
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                {renderNavItems()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        position: "absolute",
        width: "100%",
        bottom: 0,
        left: 0,
        marginBottom: 15,
    },
    navbarContainer: {
        flexDirection: 'row',
        flexGrow: 1,
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    pressable: {
        // backgroundColor: "green",
        width: 150,
        height: 150,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default BottomNavBar;
