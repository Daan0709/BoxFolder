import React from 'react';
import {Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import colors from "../config/colors";

function FinalRound({ playerName, prompt, playerListLength, removePlayerHandler, continuePlayingHandler, goBackHandler }) {

    return (
        <View style={styles.background}>
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
                        <TouchableOpacity style={styles.longButton} onPress={removePlayerHandler}>
                            <Text style={styles.normalText}>Fold your box!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.longButton} onPress={continuePlayingHandler}>
                            <Text style={styles.normalText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :                       // If not, show the winner
                playerName !== "No one" ?
                <View>
                    <StatusBar hidden={true}/>
                    <View style={styles.winnerContainer}>
                        <Image source={require('../assets/images/confetti-box.png')} style={styles.image}/>
                        <Text style={styles.outlinedText}>{playerName} wins!</Text>
                        <TouchableOpacity style={styles.longButton} onPress={goBackHandler}>
                            <Text style={styles.normalText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                    :                   // Show this if no one wins
                    <View style={styles.winnerContainer}>
                        <StatusBar hidden={true}/>
                        <Text style={styles.title}>{playerName} wins!</Text>
                        <TouchableOpacity style={styles.longButton} onPress={goBackHandler}>
                            <Text style={styles.normalText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
            }
        </View>
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
        justifyContent: "space-around",
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
        textAlign: "center"
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
