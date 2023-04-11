import React from 'react';
import {StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import colors from "../config/colors";
import {translateText} from "../services/LanguageService";

function NextRound({ roundNumber, nextRoundHandler, language }) {
    // Increment the roundNumber by 1 because it needs to show the next rounds number
    return (
        <TouchableWithoutFeedback onPress={nextRoundHandler}>
            <View style={styles.nextRoundScreen}>
                <StatusBar hidden={true}/>
                <View>
                    <Text style={styles.title}>{translateText(language, "GameScreen", "round")} {roundNumber + 1}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    nextRoundScreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    },
    title: {
        color: colors.White,
        fontSize: 40,
        fontWeight: "bold"
    },
})

export default NextRound;
