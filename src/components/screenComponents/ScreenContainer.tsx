import { View, StyleSheet, ScrollView, Text, ScrollViewProps } from "react-native"

interface Props extends ScrollViewProps{

}

const ScreenContainer = (props: Props) => {
    return (
        <ScrollView contentContainerStyle={styles.scrollviewContainer} {...props}>
            {props.children}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollviewContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default ScreenContainer;