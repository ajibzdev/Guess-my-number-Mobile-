import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  Pressable,
  Modal,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import { useState } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = ({ onPickNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState("");
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const { width, height } = useWindowDimensions();
  const marginTop = height < 380 ? 30 : 100;

  const numberInputHandler = (enteredText) => {
    setEnteredNumber(enteredText);
  };

  const resetInputHandler = () => {
    setEnteredNumber("");
    setModalIsVisible(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      // showing alert
      Alert.alert(
        "Invalid Number",
        "Number has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
    }

    // user input is valid so i call the function to change the screen
    onPickNumber(chosenNumber);
  };

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTop }]}>
          <Pressable onPress={() => setModalIsVisible(true)}>
            <Title>Guess My Number</Title>
          </Pressable>
          <View style={styles.modalContainer}>
            <Modal
              style={styles.modal}
              visible={modalIsVisible}
              animationType={"fade"}
            >
              <LinearGradient
                colors={[Colors.primary600, Colors.primary800]}
                style={styles.modal}
              >
                <Card style={styles.card}>
                  <InstructionText>Enter a Number</InstructionText>
                  <TextInput
                    style={styles.numberInput}
                    maxLength={2}
                    keyboardType={"number-pad"}
                    autoCorrect={false}
                    autoCapitalize={"none"}
                    onChangeText={numberInputHandler}
                    value={enteredNumber}
                  />
                  <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                      <PrimaryButton onPress={resetInputHandler}>
                        Reset
                      </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                      <PrimaryButton onPress={confirmInputHandler}>
                        Confirm
                      </PrimaryButton>
                    </View>
                  </View>
                </Card>
              </LinearGradient>
            </Modal>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    marginTop: 100,

    alignItems: "center",
  },

  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonsContainer: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 4,
  },
  buttonContainer: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginBottom: 300,
  },
});
