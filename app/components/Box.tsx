import { View, Text, StyleSheet } from "react-native";
import BackCourt from './BackCourt'
import MidCourt from './MidCourt'
import FrontCourt from './FrontCourt'

type BoxProps = {
    position: string;
}

const Box: React.FC<BoxProps> = ({ position }) => {
    return (
        <View style={[styles.box, position.includes("bottom") && styles.yflipped, position.includes("right") && styles.xflipped]}>
            <BackCourt 
                position={position}
            />
            <MidCourt 
                position={position}
            />
            <FrontCourt 
                position={position}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        borderWidth: 0,
        borderBottomWidth: 1.5,
        borderColor: 'white',
        width: "50%",
        height: "50%",
        flexDirection: 'column',
    },
    yflipped: {
        borderBottomWidth: 0,
        borderTopWidth: 1.5,
        flexDirection: 'column-reverse',
    },
    xflipped: {
    }
});

export default Box;