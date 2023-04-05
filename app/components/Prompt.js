import {StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import colors from "../config/colors";
import React from "react";

function Prompt({ prompt, amountOfSips, giveOrDrink, nextPromptHandler }) {

    const sipsString = amountOfSips === 1 ? ' sip' : ' sips';
    const color = giveOrDrink === "Drink " ? colors.Primary : colors.PrimaryContrast;

    return (
        <TouchableWithoutFeedback onPress={nextPromptHandler}>
            <View style={[styles.background, {backgroundColor: color}]}>
                <StatusBar hidden={true}/>
                <View>
                    {amountOfSips === "Round 1" ?
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Round 1</Text>
                        </View>
                        :
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{giveOrDrink}{amountOfSips}{sipsString}</Text>
                        </View>
                    }
                    <View style={styles.promptContainer}>
                        <Text style={styles.normalText}>{prompt}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    normalText: {
        color: colors.White,
        fontSize: 30,
        textAlign: "center"
    },
    promptContainer: {
        height: "70%",
        paddingHorizontal: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: colors.White,
        fontSize: 40,
        fontWeight: "bold",
    },
    titleContainer: {
        alignItems: "center",
        height: "20%"
    }
})

export default Prompt;
