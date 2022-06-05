import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  Dimensions,
  useWindowDimensions,
} from "react-native";

import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

// components
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

// generate random number between
function generateRandomBetween(min, max, exclude) {
  const randNum = Math.floor(Math.random() * (max - min)) + min;

  if (randNum == exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ chosenNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, chosenNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessContainer, setGuessContainer] = useState([currentGuess]);

  const { height, width } = useWindowDimensions();
  const marginTop = height < 420 ? 30 : 100;
  const listPadding = height < 420 ? 30 : 16;

  const nextGuessHandler = (direction) => {
    // direction => 'lower' or 'greater'

    // when user lies to the computer
    if (
      (direction === "lower" && currentGuess < chosenNumber) ||
      (direction === "greater" && currentGuess > chosenNumber)
    ) {
      Alert.alert("Dont lie!", "You know that this is wrong", [
        {
          text: "Sorry",
          style: "destructive",
        },
      ]);
      return;
    }
    if (direction == "lower") {
      maxBoundary = currentGuess;
      generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRand = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );

    setCurrentGuess(newRand);
    setGuessContainer((currentGuessContainer) => [
      newRand,
      ...currentGuessContainer,
    ]);
  };

  // winners circle
  useEffect(() => {
    if (chosenNumber == currentGuess) {
      onGameOver(guessContainer.length);
    }
  }, [currentGuess, chosenNumber]);

  // setting the min and maxBoundary back
  useEffect(() => {
    // ensures that it only works when it is rendered for the first time
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const guessRoundsListLenght = guessContainer.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower ?
        </InstructionText>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>

          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }
  console.log(marginTop);
  return (
    <View style={[styles.screen, { marginTop: marginTop }]}>
      <View>
        <Title>Opponent's guess</Title>
      </View>
      {content}
      {/* <View>Log rounds</View> */}
      <View style={[styles.listContainer, { padding: listPadding }]}>
        <FlatList
          data={guessContainer}
          renderItem={(guess) => (
            <GuessLogItem
              roundNumber={guessRoundsListLenght - guess.index}
              guess={guess.item}
            />
          )}
          keyExtractor={(item, index) => item}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  buttonContainer: {
    margin: 4,
    flex: 1,
  },
  instructionText: {
    marginBottom: 24,
  },
  listContainer: {
    flex: 1,
  },
  buttonsContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
});
