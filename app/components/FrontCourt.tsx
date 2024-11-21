import { View, Text, StyleSheet } from "react-native";

type BackProps = {
    position: string;
}

const BackCourt: React.FC<BackProps> = ({ position }) => {
    // const { score } = useMatch();
    // const { nearPlayer, farPlayer, switchMapping } = useSideContext();

    // let currentPoint = position.includes("bottom") ? nearPlayer.name : farPlayer.name;
    // if (currentPoint === undefined) {
    //     currentPoint = "";
    // }

    // const server = score.getServer();
    // let serverPoint;
    // if (server === undefined) {
    //     serverPoint = 0;
    // } else {
    //     serverPoint = score.getPlayerScores(server).at(-1);
    // }
    // let display: boolean;
    // if ((serverPoint %2 === 0) && (position === "top-left" || position === "bottom-right")) {
    //     display = true;
    // } else if ((serverPoint %2 === 1) && (position === "top-right" || position === "bottom-left")) {
    //     display = true;
    // }
    return (
        <View style={[styles.backCourt, position.includes("bottom") && styles.flipped, position.includes("right") && styles.xflipped]}>
        </View>
    );
};

const styles = StyleSheet.create({
    backCourt: {
        borderTopWidth:1.5,
        borderColor: 'white',
        width: "100%",
        height: `${(1.98*100)/(0.76+3.9+1.98)}%`,
    },
    flipped: {
        borderTopWidth:0,
        borderBottomWidth:1.5,
    },
    xflipped: {}
});

export default BackCourt;