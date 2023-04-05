import React, {Component} from "react";
import {Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import colors from "../config/colors";
import ForceMode from "../components/ForceMode";
import * as ScreenOrientation from "expo-screen-orientation";

class HelpScreen extends Component {

    goBackHandler = () => {
        this.props.navigation.goBack();
    }

    render() {
        return( // Scrollview.persistentScrollbar is an Android only feature
            <View style={styles.background}>
                <ForceMode mode={ScreenOrientation.OrientationLock.PORTRAIT}/>
                <StatusBar backgroundColor={colors.Primary}/>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scroller} persistentScrollbar={true}>
                        <View style={styles.howToPlay}>
                            <Text style={styles.title}>
                                How To Play:
                            </Text>
                            <Text style={styles.normalText}>
                                1. Enter all the names of the people who want to play along up to a maximum of 10. The more the merrier!
                            </Text>
                            <Text style={styles.normalText}>
                                2. Select all of your prefered categories. The game will only draw prompts from those category pools!
                            </Text>
                            <Text style={styles.normalText}>
                                3. Play the game!
                            </Text>
                            <Text style={[styles.normalText, styles.indentedText]}>
                                Round 1: The person holding the phone reads the prompt out loud. During the first round, people will have to drink
                                the specified amount of sips if they have (or have not) done the thing specified in the prompt.
                            </Text>
                            <Image source={require('../assets/images/round-1-example.png')} style={styles.image}></Image>
                            <Text style={[styles.normalText, styles.indentedText]}>
                                Round 2: During the second round the game has changed. This time you can hand out the sips to anyone that is playing the game with you!
                            </Text>
                            <Image source={require('../assets/images/round-2-example.png')} style={styles.image}></Image>
                            <Text style={[styles.normalText, styles.indentedText]}>
                                Round 3: This is the knockout round. The game will direct a prompt to a specific person (in order of the names entered at the beginning
                                of the game). If they meet the criteria: Great! they can continue playing. If not: They have to down their drink and are eliminated
                                from the game. Keep playing until there is only one (or no) winner left!
                            </Text>
                            <Image source={require('../assets/images/round-3-example.png')} style={styles.image}></Image>
                        </View>
                        <Text style={styles.title}>
                            Help
                        </Text>
                        <Text style={[styles.normalText, styles.topBorder]}>
                            What does it mean to 'fold a box'? It's simple: if you have to fold a box, it means you have to down your drink.
                        </Text>
                        <Text style={[styles.normalText, styles.topBorder]}>
                            What happens when a person is included in a question like here?
                        </Text>
                        <Image source={require('../assets/images/player-named-example.png')} style={styles.image}></Image>
                        <Text style={styles.normalText}>
                            In the event where a player is named, they themselves are also included. In this particular example, Jill also has to drink 2 sips.
                        </Text>
                    </ScrollView>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.longButton} onPress={this.goBackHandler}>
                        <Text style={styles.normalText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.Primary,
        flex: 1
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
        padding: 20,
        rowGap: 10,
        height: "15%"
    },
    container: {
        flex: 1,
        margin: 20,
        padding: 5,
        backgroundColor: colors.Secondary,
        borderColor: "black",
        borderWidth: 5,
    },
    howToPlay: {
        backgroundColor: colors.Tertiary,
        borderRadius: 15,
        padding: 10,
    },
    image: {
        width: "100%",
        height: 100,
        resizeMode: "center"
    },
    indentedText: {
        paddingLeft: 20
    },
    longButton: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.Secondary,
        borderColor: "black",
        borderWidth: 2,
        width: "50%",
        height: "50%"
    },
    normalText: {
        color: colors.White,
        fontSize: 15
    },
    scroller: {
        gap: 20
    },
    title: {
        color: colors.White,
        fontSize: 30,
        fontWeight: "bold"
    },
    topBorder: {
        borderTopWidth: 2,
        borderColor: 'black'
    }
})

export default HelpScreen;
