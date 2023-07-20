import {useTailwind} from "tailwind-rn";
import {StyleSheet, Text, View} from "react-native";

export function KickStart(props){
    const tailwind = useTailwind()
    return (
        <View>
            <Text style={[style.fontBold, tailwind("text-lg text-red-300 uppercase text-center")]}>
                Hello hello Tailwind!
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    fontBold: {
        fontWeight: "bold",
        fontSize: 10,
    }
})
