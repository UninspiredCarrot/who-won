import { View, Text, StyleSheet } from "react-native";

type SpotProps = {
    position: string;
}

const Spot: React.FC<SpotProps> = ({ position }) => {
    return (
        <View style={[styles.spot, position.includes("bottom") && styles.flipped, position.includes("right") && styles.xflipped]}>
            <Text>{position}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    spot: {
        borderRightWidth:1.5,
        borderBottomWidth:1.5,
        borderColor: 'white',
        backgroundColor: 'red',
        width: `${100/3}%`,
        height: `${100/6}%`,
    },
    flipped: {
        borderTopWidth:1.5,
        borderBottomWidth:0,
    },
    xflipped: {
        borderRightWidth:0,
        borderLeftWidth:1.5,
    }
});

export default Spot;