import React from 'react';
import {StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import colors from "../config/colors";
import {translateText} from "../services/LanguageService";
import {useFonts} from "expo-font";

function NextRound({ roundNumber, nextRoundHandler, language }) {
    const [loaded] = useFonts({
        Sono_ExtraLight: require('../assets/fonts/Sono-ExtraLight.ttf'),
        Sono_Bold: require('../assets/fonts/Sono-Bold.ttf'),
        Sono_ExtraBold: require('../assets/fonts/Sono-ExtraBold.ttf'),
        Sono_Light: require('../assets/fonts/Sono-Light.ttf'),
        Sono_Medium: require('../assets/fonts/Sono-Medium.ttf'),
        Sono_Regular: require('../assets/fonts/Sono-Regular.ttf'),
        Sono_SemiBold: require('../assets/fonts/Sono-SemiBold.ttf'),
    })

    if (!loaded){
        return null;
    }
    // Increment the roundNumber by 1 because it needs to show the next rounds number
    return (
        <TouchableWithoutFeedback onPress={nextRoundHandler}>
            <View style={styles.nextRoundScreen}>
                <StatusBar hidden={true}/>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{translateText(language, "GameScreen", "round")}{roundNumber + 1}</Text>
                    {roundNumber === 0 ?
                        <Text style={styles.subTitle}>{translateText(language, "GameScreen", "round-one")}</Text>
                            :
                            roundNumber === 1 ?
                            <Text style={styles.subTitle}>{translateText(language, "GameScreen", "round-two")}</Text>
                                :
                                <Text style={styles.subTitle}>{translateText(language, "GameScreen", "round-three")}</Text>
                    }
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
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        gap: 50
    },
    title: {
        color: colors.White,
        fontSize: 40,
        fontFamily: 'Sono-Bold'
    },
    subTitle: {
        color: colors.White,
        fontSize: 30,
        fontFamily: 'Sono-Bold'
    },
})

export default NextRound;
