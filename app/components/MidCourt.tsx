import { View, Text, StyleSheet } from "react-native";

type BackProps = {
    position: string;
}

const BackCourt: React.FC<BackProps> = ({ position }) => {
    return (
        <View style={[styles.backCourt, position.includes("bottom") && styles.flipped, position.includes("right") && styles.xflipped]}>
            <Text>Score</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    backCourt: {
        borderTopWidth:1.5,
        borderRightWidth:1.5,
        borderBottomWidth:1.5,
        borderColor: 'white',
        width: "100%",
        height: `${(3.9*100)/(0.76+3.9+1.98)}%`,
    },
    flipped: {
    },
    xflipped: {
        borderRightWidth:0,
        borderLeftWidth:1.5,
    }
});

export default BackCourt;