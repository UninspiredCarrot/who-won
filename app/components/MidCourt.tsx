import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type MidProps = {
    position: string;
}

const MidCourt: React.FC<MidProps> = ({ position }) => {
    const match = useSelector((state: RootState) => state.match.currentMatch);
    const server = match?.server;
    let isServer = false;
    if (server === "team1") {
        if (position.includes("bottom")) {
            isServer = (match!.sets.at(-1)[0] % 2 === 0 ? position.includes("right") : position.includes("left")) 
        }
    } else if (server === "team2") {
        if (position.includes("top")) {
            isServer = (match!.sets.at(-1)[1] % 2 === 0 ? position.includes("left") : position.includes("right")) 
        }
    }

    return (
        <View style={[
            styles.midCourt, 
            position.includes("bottom") && styles.flipped, 
            position.includes("right") && styles.xflipped
        ]}>
            {isServer && <Image source={require('../../assets/images/shuttle.png')} style={{width: 50, height: 50}} />}
        </View>
    );
};

const styles = StyleSheet.create({
    midCourt: {
        borderTopWidth: 1.5,
        borderRightWidth: 1.5,
        borderBottomWidth: 1.5,
        borderColor: 'white',
        width: "100%",
        height: `${(3.9 * 100) / (0.76 + 3.9 + 1.98)}%`,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flipped: {
        // Additional styling for "flipped" position if needed
    },
    xflipped: {
        borderRightWidth: 0,
        borderLeftWidth: 1.5,
    }
});

export default MidCourt;
