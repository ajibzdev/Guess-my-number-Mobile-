import { useState, useEffect, useCallback } from "react";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

// screens
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import Colors from "./constants/colors";

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);

  const pickedUserNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  };

  const gameOverHandler = (enteredNumber) => {
    setGameIsOver(true);
    setGuessRounds(enteredNumber);
  };

  const startNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  let screen = <HomeScreen onPickNumber={pickedUserNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen chosenNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        startNewGame={startNewGameHandler}
      />
    );
  }

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/img/dice.jpg")}
          resizeMode={"cover"}
          style={styles.rootScreen}
          imageStyle={styles.imageBackground}
        >
          <SafeAreaView style={styles.safeArea}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    padding: 24,
  },
  imageBackground: {
    opacity: 0.15,
  },
});
