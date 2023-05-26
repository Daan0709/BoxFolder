import {Component} from "react";
import {BackHandler, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getColorTheme} from "../services/ThemeService";
import Colors from "../config/colors";
import styleSheet from "../config/StyleSheet";
import * as Font from "expo-font";

class ResponsibilityScreen extends Component {

    state = {
        theme: getColorTheme('green'),
        fontsLoaded: false,
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

    componentDidMount() {
        this.loadFonts();
    }

    continueHandler = () => {
        this.props.navigation.navigate('HomeScreen');
    }

    exitHandler = () => {
        BackHandler.exitApp();
    }

    render() {
        if (this.state.fontsLoaded){
            return (
                <View style={[styles.background, {backgroundColor: this.state.theme.Primary}]}>
                    <View style={[styles.textBox, {backgroundColor: this.state.theme.Secondary}]}>
                        <Text style={styles.lightText}>Please drink responsibly. This app is designed for people of legal
                            drinking age and you are responsible for any consequences that may result from using BoxFolder.
                            Only continue if you agree to these terms.
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={this.exitHandler} style={styles.backButton}>
                            <Text style={styles.lightText}>Exit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.continueHandler} style={styleSheet.PrimaryButton}>
                            <Text>Continue</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    backButton: {
        justifyContent: "center"
    },
    buttonContainer: {
        width: "100%",
        height: "10%",
        flex: 1,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-around"
    },
    lightText: {
        padding: 4,
        fontSize: 20,
        fontFamily: 'Sono-Light'
    },
    textBox: {
        flex: 5,
        width: "90%",

        borderRadius: 15,
        borderWidth: 4,
        borderColor: "black",
        justifyContent: "center",
        alignContent: "center",
        padding: 5,
        marginTop: StatusBar.currentHeight
    }
})

export default ResponsibilityScreen;
