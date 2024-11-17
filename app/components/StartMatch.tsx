import { SetStateAction, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const StartMatch = () => {
    const insets = useSafeAreaInsets();
    const [text, setText] = useState('Singles');
    const [points, setPoints] = useState('21');
    const [sets, setSets] = useState('3');
    const [setting, setSetting] = useState('30');
    const [team1, setTeam1] = useState(['Me', 'Partner']);
    const [team2, setTeam2] = useState(['Opponent', 'Opponent']);

    

    const toggleText = () => {
      setText((prevText) => (prevText === 'Singles' ? 'Doubles' : 'Singles'));
    };

    const handlePointsChange = (value:string) => {
        // Allow full clearing of input, but only set numeric values
        if (/^\d*$/.test(value)) {
            setPoints(value);
        }
    };

    const handlePointsBlur = () => {
        // Default to "21" if the field is left empty
        if (!points) {
            setPoints("21");
        }
    };

    const handleSetsChange = (value:string) => {
        // Allow full clearing of input, but only set numeric values
        if (/^\d*$/.test(value)) {
            setSets(value);
        }
    };

    const handleSetsBlur = () => {
        // Default to "21" if the field is left empty
        if (!sets) {
            setSets("3");
        }
    };

    const handleSettingChange = (value:string) => {
        // Allow full clearing of input, but only set numeric values
        if (/^\d*$/.test(value)) {
            setSetting(value);
        }
    };

    const handleSettingBlur = () => {
        // Default to "21" if the field is left empty
        if (!sets) {
            setSetting("3");
        }
    };

    const handleTeam1Change = (value: string, index: number) => {
        const updatedTeam1 = [...team1];
        updatedTeam1[index] = value;
        setTeam1(updatedTeam1);
    };

    const handleTeam2Change = (value: string, index: number) => {
        const updatedTeam2 = [...team2];
        updatedTeam2[index] = value;
        setTeam2(updatedTeam2);
    };

    return (
    <View style={[styles.container, {height: screenHeight - 68 - insets.top, top: insets.top}]}>
        <View style={styles.settings}>
            <TouchableOpacity onPress={toggleText}>
                <Text style={styles.header1}>{text}</Text>
            </TouchableOpacity>
            <View style={styles.line}/>
            <View style={styles.points}>
                <TextInput
                    keyboardType="numeric"
                    value={points}
                    style={styles.header3}
                    onChangeText={handlePointsChange}
                    onBlur={handlePointsBlur} // Set default on blur
                    returnKeyType='done' // Optional: Close keyboard on "done"
                    selectTextOnFocus // Optional: Highlight text on focus
                />
                <Svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <Circle cx="5" cy="5" r="5" fill="#2F5469"/>
                </Svg>
                <TextInput
                    keyboardType="numeric"
                    value={sets}
                    style={styles.header3}
                    onChangeText={handleSetsChange}
                    onBlur={handleSetsBlur} // Set default on blur
                    returnKeyType='done' // Optional: Close keyboard on "done"
                    selectTextOnFocus // Optional: Highlight text on focus
                />
                <Svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <Circle cx="5" cy="5" r="5" fill="#2F5469"/>
                </Svg>
                <TextInput
                    keyboardType="numeric"
                    value={setting}
                    style={styles.header3}
                    onChangeText={handleSettingChange}
                    onBlur={handleSettingBlur} // Set default on blur
                    returnKeyType='done' // Optional: Close keyboard on "done"
                    selectTextOnFocus // Optional: Highlight text on focus
                />
            </View>
        </View>
        <View style={styles.names}>
            <View style={[styles.team1, {width: (screenWidth-10)/2}]}>
                <TextInput
                    value={team1[0]}
                    style={styles.header4}
                    onChangeText={(value) => handleTeam1Change(value, 0)}
                    returnKeyType='done' // Optional: Close keyboard on "done"
                    selectTextOnFocus // Optional: Highlight text on focus
                />
                {text === 'Doubles' && (
                    <TextInput
                        value={team1[1]}
                        style={styles.header4}
                        onChangeText={(value) => handleTeam1Change(value, 1)}
                        returnKeyType='done' // Optional: Close keyboard on "done"
                        selectTextOnFocus // Optional: Highlight text on focus
                    />
                )}
            </View>
            <Svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <Circle cx="5" cy="5" r="5" fill="#2F5469"/>
            </Svg>
            <View style={[styles.team2, {width: (screenWidth-10)/2}]}>
                <TextInput
                    value={team2[0]}
                    style={styles.header4}
                    onChangeText={(value) => handleTeam2Change(value, 0)}
                    returnKeyType='done' // Optional: Close keyboard on "done"
                    selectTextOnFocus // Optional: Highlight text on focus
                />
                {text === 'Doubles' && (
                    <TextInput
                        value={team2[1]}
                        style={styles.header4}
                        onChangeText={(value) => handleTeam2Change(value, 1)}
                        returnKeyType='done' // Optional: Close keyboard on "done"
                        selectTextOnFocus // Optional: Highlight text on focus
                    />
                )}
            </View>
        </View>
        <TouchableOpacity style={styles.play}>
            <Svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
                <Path d="M13.2603 85.195C13.2839 86.5707 13.6843 87.9136 14.4177 89.0778C15.1512 90.2414 16.1896 91.1828 17.4202 91.7978C18.6492 92.4921 20.0367 92.8571 21.4482 92.8571C22.8597 92.8571 24.2472 92.4921 25.4761 91.7978L82.5935 56.4711C83.8364 55.8723 84.8849 54.9351 85.6185 53.767C86.3521 52.5988 86.7414 51.2474 86.7414 49.8679C86.7414 48.4884 86.3521 47.137 85.6185 45.9689C84.8849 44.8008 83.8364 43.8635 82.5935 43.2648L25.4761 8.20213C24.2472 7.5077 22.8597 7.14284 21.4482 7.14284C20.0367 7.14284 18.6492 7.5077 17.4202 8.20213C16.1896 8.81742 15.1512 9.75834 14.4177 10.9225C13.6843 12.0866 13.2839 13.4296 13.2603 14.8053V85.195Z" fill="#79EE8D"/>
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M15.3227 4.26057C17.1973 3.22322 19.3052 2.67856 21.4488 2.67856C23.6299 2.67856 25.7739 3.24239 27.6729 4.31535C27.7199 4.34189 27.7663 4.36927 27.8123 4.39749L84.7592 39.3555C86.6592 40.3218 88.2635 41.7861 89.3992 43.5941C90.5799 45.4736 91.2064 47.6482 91.2064 49.8679C91.2064 52.0876 90.5799 54.2623 89.3992 56.1418C88.2649 57.9473 86.6635 59.4101 84.7664 60.3766L27.825 95.595C27.775 95.6257 27.7242 95.6557 27.6729 95.6843C25.7739 96.7578 23.6299 97.3214 21.4488 97.3214C19.3052 97.3214 17.1973 96.7764 15.3228 95.7393C13.4067 94.7586 11.7893 93.2793 10.6412 91.4571C9.47281 89.6028 8.83509 87.4635 8.79731 85.2714L8.79602 85.195L8.79666 14.7283C8.83445 12.5367 9.47281 10.3974 10.6412 8.54284C11.7893 6.72041 13.4067 5.24147 15.3227 4.26057ZM21.4488 11.6071C20.8069 11.6071 20.176 11.7731 19.617 12.0888C19.5515 12.1259 19.4849 12.1613 19.4174 12.1951C18.9166 12.4455 18.494 12.8283 18.1956 13.3021C17.9024 13.7674 17.7401 14.3028 17.7252 14.8522V85.1478C17.7401 85.6971 17.9024 86.2328 18.1956 86.6978C18.494 87.1714 18.9166 87.5543 19.4174 87.805C19.4849 87.8385 19.5515 87.8743 19.617 87.9114C20.176 88.2271 20.8069 88.3928 21.4488 88.3928C22.0669 88.3928 22.675 88.2393 23.2182 87.9457L80.2457 52.6743C80.3785 52.5921 80.5157 52.517 80.6564 52.4492C81.1421 52.2151 81.5521 51.8487 81.8392 51.3921C82.1257 50.9355 82.2778 50.4072 82.2778 49.8679C82.2778 49.3286 82.1257 48.8003 81.8392 48.3437C81.5521 47.8871 81.1421 47.5207 80.6564 47.2866C80.5199 47.2211 80.3871 47.1485 80.2585 47.0694L23.2236 12.0573C22.679 11.762 22.069 11.6071 21.4488 11.6071Z" fill="#2F5469"/>
            </Svg>
        </TouchableOpacity>
    </View> 
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: screenWidth,
        position: 'absolute',
    },
    settings: {
        width: screenWidth,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header3: {
        color: '#000',
        textAlign: 'center',         // Horizontal alignment
        textAlignVertical: 'center', // Vertical alignment
        fontFamily: 'Poppins',       // Ensure the font matches your app
        fontSize: 48,                // Text size
        fontWeight: '400',           // Weight
        height: 60,                  // Larger height to prevent clipping
        paddingVertical: 0,          // Remove excess padding
    },
    header4: {
        color: '#000',
        textAlign: 'center',         // Horizontal alignment
        textAlignVertical: 'center', // Vertical alignment
        fontFamily: 'Poppins',       // Ensure the font matches your app
        fontSize: 34,                // Text size
        fontWeight: '400',           // Weight
        height: 60,                  // Larger height to prevent clipping
        paddingVertical: 0,          // Remove excess padding
        letterSpacing: 0.085,
    },
    
    header1: {
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Poppins', 
        fontSize: 96,
        fontStyle: 'normal',
        fontWeight: '300',
        lineHeight: 96,
        letterSpacing: -1.5,
        marginBottom: 20,
    },
    names: {
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent: 'center',
        width: screenWidth,

    },
    play: {

    },
    points: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 300,
        marginTop: 20,
        textAlign: 'center',
    },
    line: {
        width: 300,
        height: 5,
        backgroundColor: '#2F5469',
    },
    team1: {
    },
    team2: {
        
    }
});

export default StartMatch;