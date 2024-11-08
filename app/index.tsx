import { useState } from "react";
import { Dimensions, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class Score {
  far: number;
  near: number;
  winner: string;
  constructor(near = 0, far = 0, winner = "") {
    this.near = near;
    this.far = far;
    this.winner = winner;
  }

  update(winner: string) {
    if (winner === "near") {
      this.near += 1;
    } else if (winner === "far") {
      this.far += 1;
    }
    this.winner = winner;
  }

  render(nearOrFar: string, leftOrRight: string) {
    let serveScore: number;
    if (this.winner === "near") {
      serveScore = this.near;
    } else {
      serveScore = this.far;
    }
    if (nearOrFar === "far") {
      if (leftOrRight === "left") {
        if (serveScore % 2 === 0) {
          return (
            <Text style={styles.number}>
              {this.far}
            </Text>
          );
        }
      } else if (leftOrRight === "right") {
        if (serveScore % 2 === 1) {
          return (
            <Text style={styles.number}>
              {this.far}
            </Text>
          );
        }
      }
    } else if (nearOrFar === "near") {
      if (leftOrRight === "right") {
        if (serveScore % 2 === 0) {
          return (
            <Text style={styles.number}>
              {this.near}
            </Text>
          );
        }
      } else if (leftOrRight === "left") {
        if (serveScore % 2 === 1) {
          return (
            <Text style={styles.number}>
              {this.near}
            </Text>
          );
        }
      }
    }

    // Default return if no conditions met
    return null;
  }
}

export default function Index() {
  const insets = useSafeAreaInsets();
  const [score, setScore] = useState(new Score());
  const handleCourtTap = (winner: string) => {
    score.update(winner);
    setScore(new Score(score.near, score.far, winner));
  };

  return (
    <SafeAreaView style={styles.container}>
    <TouchableOpacity style={[styles.farMidCourt, {top: insets.top + screenHeight * 0.9 * 0.5 * 0.3}]} onPress={() => handleCourtTap("far")}>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.nearMidCourt, {bottom: insets.bottom + screenHeight * 0.9 * 0.5 * 0.3}]} onPress={() => handleCourtTap("near")}>
    </TouchableOpacity>
      {/* Whole court */}
      <View style={styles.leftCourt}>
        {/* Far court */}
        <View style={styles.halfCourt}>
          
          <View style={styles.back}>
          </View>
          <TouchableOpacity onPress={() => handleCourtTap("far")}>
            <View style={styles.mid}>
              {score.render("far", "left")}
            </View>
          </TouchableOpacity>
          <View style={styles.front}>
          </View>
          
        </View>
        {/* Near court */}
        <View style={styles.halfCourt}>
          <View style={styles.front}>
          </View>
            <View style={styles.mid}>
              {score.render("near", "left")}
            </View>
          <View style={styles.back}>
          </View>

        </View>
      </View>
      <View style={styles.rightCourt}>
        {/* Far court */}
        <View style={styles.halfCourt}>
          <View style={styles.back}>
          </View>
          <View style={styles.mid}>
          {score.render("far", "right")}
          </View>
          <View style={styles.front}>
          </View>
        </View>
        {/* Near court */}
        <View style={styles.halfCourt}>
          <View style={styles.front}>
          </View>
          <View style={styles.mid}>
          {score.render("near", "right")}
          </View>
          <View style={styles.back}>
          </View>

        </View>
      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16262e',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  leftCourt: {
    width: screenWidth * 0.45,
    height: screenHeight * 0.9,
    backgroundColor: '#3c7a89',
    borderWidth: 3,
    borderRightWidth: 0,
    borderColor: '#dbc2cf',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rightCourt: {
    width: screenWidth * 0.45,
    height: screenHeight * 0.9,
    backgroundColor: '#3c7a89',
    borderWidth: 3,
    borderLeftWidth: 0,
    borderColor: '#dbc2cf',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  halfCourt: {
    flex: 1,
  },
  front: {
    width: '100%',
    height: screenHeight * 0.9 * 0.5 * 0.3,
    borderWidth: 3,
    borderColor: '#dbc2cf',
    backgroundColor: '#2E4756',
  },
  mid: {
    width: '100%',
    height: screenHeight * 0.9 * 0.5 * 0.5,
    borderWidth: 3,
    borderColor: '#dbc2cf',
    backgroundColor: '#356170',
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    width: '100%',
    height: screenHeight * 0.9 * 0.5 * 0.2,
    borderWidth: 3,
    borderColor: '#dbc2cf',

  },
  number: {
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  farMidCourt: {
    position: "absolute",
    width: screenWidth*0.9,
    height: screenHeight * 0.9 * 0.5 * 0.5,
    zIndex: 3,
  },
  nearMidCourt: {
    position: "absolute",
    width: screenWidth*0.9,
    height: screenHeight * 0.9 * 0.5 * 0.5,
    zIndex: 3,
  }
});
