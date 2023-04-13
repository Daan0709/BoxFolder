import React from 'react';
import {Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import colors from "../config/colors";
import styleSheet from "../config/StyleSheet";
import {translateText} from "../services/LanguageService";
import {LinearGradient} from "expo-linear-gradient";
import {useFonts} from "expo-font";

function FinalRound({ playerName, prompt, playerListLength, removePlayerHandler, continuePlayingHandler, goBackHandler, language }) {
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

    return (
        <LinearGradient
            colors={['rgb(0,0,0)', 'rgb(68,68,68)', 'rgb(0,0,0)']}
            start={{x: 1, y: 0}}
            end={{x: 0, y:1}}
            style={styles.background}>
            {playerListLength > 1 ?   // If there are more than 1 players left
                <View style={styles.container}>
                    <StatusBar hidden={true}/>
                    <View style={styles.nameContainer}>
                        <Text style={styles.title}>{playerName}</Text>
                    </View>
                    <View style={styles.promptContainer}>
                        <Text style={styles.normalText}>{prompt}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styleSheet.SecondaryButton} onPress={removePlayerHandler}>
                            <Text style={styles.lightText}>{translateText(language, "GameScreen", "eliminate-button")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styleSheet.PrimaryButton} onPress={continuePlayingHandler}>
                            <Text style={styles.lightText}>{translateText(language, "GameScreen", "continue-button")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :                       // If not, show the winner
                playerName !== "No one" ?
                <View>
                    <StatusBar hidden={true}/>
                    <View style={styles.winnerContainer}>
                        <Image source={require('../assets/images/confetti-box.png')} style={styles.image}/>
                        <Text style={styles.outlinedText}>{playerName}{translateText(language, "GameScreen", "win")}</Text>
                        <TouchableOpacity style={styleSheet.PrimaryButtonLarge} onPress={goBackHandler}>
                            <Text style={styles.lightText}>{translateText(language, "GameScreen", "menu-button")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                    :                   // Show this if no one wins
                    <View style={styles.winnerContainer}>
                        <StatusBar hidden={true}/>
                        <Text style={styles.title}>{translateText(language, "GameScreen", "no-one")}{translateText(language, "GameScreen", "win")}</Text>
                        <TouchableOpacity style={styleSheet.PrimaryButtonLarge} onPress={goBackHandler}>
                            <Text style={styles.normalText}>{translateText(language, "GameScreen", "menu-button")}</Text>
                        </TouchableOpacity>
                    </View>
            }
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "black"
    },
    outlinedText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 40,
        textShadowColor:'#000000',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 1
    },
    buttonContainer: {
        height: "15%",
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: Dimensions.get('window').width / 2,
        height: 200,
    },
    longButton: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.Secondary,
        borderColor: 'gray',
        borderWidth: 2,
        paddingHorizontal: 40,
    },
    nameContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: "20%"
    },
    normalText: {
        padding: 4,
        color: colors.White,
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'Sono-Light'
    },
    lightText: {
        padding: 4,
        color: colors.White,
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'Sono-Light'
    },
    promptContainer: {
        width: "80%",
        height: "60%",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: colors.White,
        fontSize: 40,
        fontWeight: "bold"
    },
    winnerContainer: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    }
})

export default FinalRound;
