import { View, Text, StyleSheet } from "react-native";
import { useMatch } from "../context/MatchContext";
import { useSideContext } from "../context/SideContext";

type BackProps = {
    position: string;
}

const BackCourt: React.FC<BackProps> = ({ position }) => {
    const { score } = useMatch();
    const { nearPlayer, farPlayer, switchMapping } = useSideContext();

    let currentPoint = position.includes("bottom") ? score.getPlayerScores(nearPlayer).slice(0, -1).join(", ") : score.getPlayerScores(farPlayer).slice(0, -1).join(", ");;


    const server = score.getServer();
    let serverPoint;
    if (server === undefined) {
        serverPoint = 0;
    } else {
        serverPoint = score.getPlayerScores(server).at(-1);
    }
    let display: boolean;
    if ((serverPoint %2 === 0) && (position === "top-left" || position === "bottom-right")) {
        display = true;
    } else if ((serverPoint %2 === 1) && (position === "top-right" || position === "bottom-left")) {
        display = true;
    }
    
    return (
        <View style={[styles.backCourt, position.includes("bottom") && styles.flipped, position.includes("right") && styles.xflipped]}>
            <Text>{display && currentPoint}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    backCourt: {
        borderRightWidth:1.5,
        borderBottomWidth:1.5,
        borderColor: 'white',
        width: "100%",
        height: `${(0.76*100)/(0.76+3.9+1.98)}%`, //6.64
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

export default BackCourt;