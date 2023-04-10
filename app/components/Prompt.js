import {Dimensions, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View, Animated} from "react-native";
import colors from "../config/colors";
import React, {useEffect, useRef} from "react";
import {translateText} from "../services/LanguageService";

function Prompt({ prompt, amountOfSips, giveOrDrink, nextPromptHandler, previousPromptHandler, color, language }) {

    const scale = useRef(new Animated.Value(1)).current;
    const sipsString = amountOfSips === 1 ? translateText(language, "GameScreen", "sip-singular") : translateText(language, "GameScreen", "sip-plural");
    const giveoutString = `${translateText(language, "GameScreen", "give-out").replace('...', amountOfSips+sipsString)}`;
    const giveoutBool = giveOrDrink === "Give out ";
    const windowWidth = Dimensions.get('window').width;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 1.2,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start();
    })

    // Function that determines whether or not the user touched the right side or left side of the screen, and then acts accordingly
    function handleTouch(event){
        const x = event.nativeEvent.locationX;
        // Left quarter of screen: show previous prompt
        if (x < (windowWidth / 4)){
            previousPromptHandler();
            return;
        }
        // Right side: go to next prompt
        nextPromptHandler();
    }

    return (
        <TouchableWithoutFeedback onPress={(e) => {handleTouch(e)}}>
            <View style={[styles.background, {backgroundColor: color}]}>
                <StatusBar hidden={true}/>
                <View>
                    {amountOfSips === translateText(language, "GameScreen", "start-round") ?
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{translateText(language, "GameScreen", "start-round")}</Text>
                        </View>
                        :
                        giveoutBool ?
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{giveoutString}</Text>
                            </View>
                            :
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{giveOrDrink}{amountOfSips}{sipsString}</Text>
                            </View>

                    }
                    <View style={styles.promptContainer}>
                        <Animated.Text style={[styles.normalText, {transform: [{scale: scale}]}]}>{prompt}</Animated.Text>
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
