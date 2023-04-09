import React, {Component} from "react";
import {
    Animated,
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import * as ScreenOrientation from "expo-screen-orientation";

import colors from "../config/colors";
import ForceMode from "../components/ForceMode";


class HelpScreen extends Component {

    // Workaround for a 'bug' where it takes the height as width when navigating in from a screen that was in landscape mode
    // The width should always be the smallest number since we're now in portrait mode
    width = Dimensions.get('screen').width < Dimensions.get('screen').height ? Dimensions.get('screen').width : Dimensions.get('screen').height;

    state = {
        translationHowTo: new Animated.Value(this.width),
        translationHelp: new Animated.Value(0),
    }

    swipeLeft = () => {
        Animated.parallel([
            Animated.timing(this.state.translationHowTo, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.translationHelp, {
                toValue: -this.width,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    }

    swipeRight = () => {
        Animated.parallel([
            Animated.timing(this.state.translationHowTo, {
                toValue: this.width,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.translationHelp, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    }

    goBackHandler = () => {
        this.props.navigation.goBack();
    }

    render() {
        return(
            <View style={styles.background}>
                <ForceMode mode={ScreenOrientation.OrientationLock.PORTRAIT}/>
                <StatusBar backgroundColor={colors.Primary}/>
                <View style={styles.container}>
                    <View style={styles.pageContainer}>
                        <Animated.View style={[styles.helpPage, {transform: [{translateX: this.state.translationHelp}]}]}>
                            <View style={styles.helpContainer}>
                                <ScrollView contentContainerStyle={styles.scroller}>
                                    <Text style={styles.title}>
                                        Help
                                    </Text>
                                    <View style={styles.helpBox}>
                                        <Text style={[styles.normalText]}>
                                            What does it mean to 'fold a box'? It's simple: if you have to fold a box, it means you have to down a full drink.
                                        </Text>
                                    </View>
                                    <View style={styles.helpBox}>
                                        <Text style={[styles.normalText]}>
                                            What happens when a person is included in a prompt like here?
                                        </Text>
                                        <Image source={require('../assets/images/player-named-example.png')} style={styles.image}></Image>
                                        <Text style={styles.normalText}>
                                            In the event where a player is named, they themselves are also included. In this particular example, Jill also has to drink 2 sips.
                                        </Text>
                                    </View>
                                    <View style={styles.helpBox}>
                                        <Text style={[styles.normalText]}>
                                            Uh-oh, you accidentally skipped a prompt! what now? No worries, just tap the left side of the screen displayed here:
                                        </Text>
                                        <Image source={require('../assets/images/previous-prompt-example.png')}
                                               style={[styles.image, {height: 150}]}></Image>
                                        <Text style={styles.normalText}>
                                            This will take you back to the previous prompt. You can only go back one prompt, so try not to accidentally skip a prompt two times in a row!
                                            If you have seen the previous prompt, just tap the right side of the screen again to resume your game.
                                        </Text>
                                    </View>
                                </ScrollView>
                            </View>

                            <TouchableOpacity onPress={this.swipeLeft} style={styles.swipeButton}>
                                <AntDesign name="caretright" size={40} color="black" />
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View style={[styles.howToPlayPage, {transform: [{translateX: this.state.translationHowTo}]}]}>
                            <View style={styles.helpContainer}>
                                <ScrollView contentContainerStyle={styles.scroller}>
                                    <Text style={styles.title}>
                                        How To Play:
                                    </Text>
                                    <View style={styles.helpBox}>
                                        <Text style={styles.normalText}>
                                            1. Enter all the names of the people who want to play along up to a maximum of 10. The more the merrier!
                                        </Text>
                                    </View>
                                    <View style={styles.helpBox}>
                                        <Text style={styles.normalText}>
                                            2. Select all of your prefered categories. The game will only draw prompts from those category pools!
                                        </Text>
                                    </View>
                                    <View style={styles.helpBox}>
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


                                </ScrollView>
                            </View>

                            <TouchableOpacity onPress={this.swipeRight} style={styles.swipeButton}>
                                <AntDesign name="caretleft" size={40} color="black" />
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.longButton} onPress={this.goBackHandler}>
                            <Text style={styles.normalText}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
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
        alignItems: "center",
        justifyContent: "center",
        height: "10%"
    },
    container: {
        flex: 1,
    },
    helpBox: {
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 2,
        padding: 10
    },
    helpContainer: {
        flex: 7,
    },
    helpPage: {
        paddingLeft: 15,
        height: "100%",
        width: "100%",
        backgroundColor: colors.Secondary,
        flexDirection: "row",
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    howToPlayPage: {
        paddingLeft: 15,
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: colors.Tertiary,
        flexDirection: "row",
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
    },
    image: {
        alignSelf: "center",
        borderRadius: 10,
        width: 300,
        height: 120,
        resizeMode: "contain"
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
        height: "50%",
        width: "50%"
    },
    normalText: {
        color: colors.White,
        fontSize: 15
    },
    pageContainer: {
        flex: 9,
        flexDirection: "row",
        height: "85%",
    },
    scroller: {
        gap: 5
    },
    swipeButton: {
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    title: {
        color: colors.White,
        fontSize: 30,
        fontWeight: "bold",
        alignSelf: "center"
    },
})

export default HelpScreen;
