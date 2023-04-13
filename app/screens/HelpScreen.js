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
import styleSheet from "../config/StyleSheet";
import ForceMode from "../components/ForceMode";
import {translateText} from "../services/LanguageService";
import {LinearGradient} from "expo-linear-gradient";
import * as Font from "expo-font";


class HelpScreen extends Component {

    // Workaround for a 'bug' where it takes the height as width when navigating in from a screen that was in landscape mode
    // The width should always be the smallest number since we're now in portrait mode
    width = Dimensions.get('screen').width < Dimensions.get('screen').height ? Dimensions.get('screen').width : Dimensions.get('screen').height;

    state = {
        translationHowTo: new Animated.Value(this.width),
        translationHelp: new Animated.Value(0),
        language: this.props.route.params.language,
        theme: this.props.route.params.theme,
        fontsLoaded: false,
    }

    componentDidMount() {
        this.loadFonts();
    }

    async loadFonts(){
        await Font.loadAsync({
            'Sono-ExtraLight': require('../assets/fonts/Sono-ExtraLight.ttf'),
            'Sono-Bold': require('../assets/fonts/Sono-Bold.ttf'),
            'Sono-ExtraBold': require('../assets/fonts/Sono-ExtraBold.ttf'),
            'Sono-Light': require('../assets/fonts/Sono-Light.ttf'),
            'Sono-Medium': require('../assets/fonts/Sono-Medium.ttf'),
            'Sono-Regular': require('../assets/fonts/Sono-Regular.ttf'),
            'Sono-SemiBold': require('../assets/fonts/Sono-SemiBold.ttf'),
        });
        this.setState({'fontsLoaded': true});
    }

    swipeLeft = () => {
        Animated.parallel([
            Animated.timing(this.state.translationHowTo, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.translationHelp, {
                toValue: -this.width,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }

    swipeRight = () => {
        Animated.parallel([
            Animated.timing(this.state.translationHowTo, {
                toValue: this.width,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.translationHelp, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }

    goBackHandler = () => {
        this.props.navigation.goBack();
    }

    render() {
        if (this.state.fontsLoaded){
            return(
                <LinearGradient colors={[this.state.theme.Secondary, this.state.theme.Primary, this.state.theme.Secondary]}
                                start={{x: 1, y: 0}}
                                end={{x: 0, y: 1}}
                                style={styles.background}>
                    <ForceMode mode={ScreenOrientation.OrientationLock.PORTRAIT}/>
                    <StatusBar backgroundColor={this.state.theme.Secondary}/>
                    <View style={styles.container}>
                        <View style={styles.pageContainer}>
                            <Animated.View style={[styles.helpPage, {transform: [{translateX: this.state.translationHelp}]}]}>
                                <View style={styles.helpContainer}>
                                    <ScrollView contentContainerStyle={styles.scroller}>
                                        <Text style={[styles.title, {color: this.state.theme.textColor}]}>
                                            Help
                                        </Text>
                                        <View style={[styles.helpBox, {backgroundColor: this.state.theme.Tertiary}]}>
                                            <Text style={[styles.normalText, {color: this.state.theme.textColor}]}>
                                                {translateText(this.state.language, "HelpPage", "fold-box")}
                                            </Text>
                                        </View>
                                        <View style={[styles.helpBox, {backgroundColor: this.state.theme.Tertiary}]}>
                                            <Text style={[styles.normalText, {color: this.state.theme.textColor}]}>
                                                {translateText(this.state.language, "HelpPage", "person-included-top")}
                                            </Text>
                                            <Image source={require('../assets/images/player-named-example.png')} style={styles.image}></Image>
                                            <Text style={[styles.normalText, {color: this.state.theme.textColor}]}>
                                                {translateText(this.state.language, "HelpPage", "person-included-bot")}
                                            </Text>
                                        </View>
                                        <View style={[styles.helpBox, {backgroundColor: this.state.theme.Tertiary}]}>
                                            <Text style={[styles.normalText, {color: this.state.theme.textColor}]}>
                                                {translateText(this.state.language, "HelpPage", "skipped-prompt-top")}
                                            </Text>
                                            <Image source={require('../assets/images/previous-prompt-example.png')}
                                                   style={[styles.image, {height: 150}]}></Image>
                                            <Text style={[styles.normalText, {color: this.state.theme.textColor}]}>
                                                {translateText(this.state.language, "HelpPage", "skipped-prompt-bot")}
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
                                        <Text style={[styles.title, {color: this.state.theme.textColor}]}>
                                            {translateText(this.state.language, "HelpPage", "how-to-play-title")}
                                        </Text>
                                        <View style={[styles.helpBox, {backgroundColor: this.state.theme.Tertiary}]}>
                                            <Text style={[styles.normalText, {color: this.state.theme.textColor}]}>
                                                {translateText(this.state.language, "HelpPage", "step-one")}
                                            </Text>
                                        </View>
                                        <View style={[styles.helpBox, {backgroundColor: this.state.theme.Tertiary}]}>
                                            <Text style={[styles.normalText, {color: this.state.theme.textColor}]}>
                                                {translateText(this.state.language, "HelpPage", "step-two")}
                                            </Text>
                                        </View>
                                        <View style={[styles.helpBox, {backgroundColor: this.state.theme.Tertiary}]}>
                                            <Text style={[styles.normalText, {color: this.state.theme.textColor}]}>
                                                {translateText(this.state.language, "HelpPage", "step-three-title")}
                                            </Text>
                                            <Text style={[styles.normalText, styles.indentedText, {color: this.state.theme.textColor}]}>
                                                {translateText(this.state.language, "HelpPage", "step-three-top")}
                                            </Text>
                                            <Image source={require('../assets/images/round-1-example.png')} style={styles.image}></Image>
                                            <Text style={[styles.normalText, styles.indentedText, {color: this.state.theme.textColor}]}>
                                                {translateText(this.state.language, "HelpPage", "step-three-mid")}
                                            </Text>
                                            <Image source={require('../assets/images/round-2-example.png')} style={styles.image}></Image>
                                            <Text style={[styles.normalText, styles.indentedText, {color: this.state.theme.textColor}]}>
                                                {translateText(this.state.language, "HelpPage", "step-three-bot")}
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
                            <TouchableOpacity style={styleSheet.PrimaryButton} onPress={this.goBackHandler}>
                                <Text style={[styles.normalText, {color: 'white'}]}>{translateText(this.state.language, "HelpPage", "back-button")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            )
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    background: {
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
        padding: 10
    },
    helpContainer: {
        flex: 7,
    },
    helpPage: {
        paddingLeft: 15,
        height: "100%",
        width: "100%",
        flexDirection: "row",
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    howToPlayPage: {
        paddingLeft: 15,
        position: "absolute",
        height: "100%",
        width: "100%",
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
        fontSize: 15,
        fontFamily: 'Sono-Regular'
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
        fontSize: 30,
        alignSelf: "center",
        fontFamily: "Sono-Bold"
    },
})

export default HelpScreen;
