import {Dimensions, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import colors from "../config/colors";
import React from "react";

function Prompt({ prompt, amountOfSips, giveOrDrink, nextPromptHandler, previousPromptHandler, color }) {

    const sipsString = amountOfSips === 1 ? ' sip' : ' sips';
    const windowWidth = Dimensions.get('window').width;

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
