import React, {Component} from 'react';
import {Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import {AntDesign, MaterialIcons} from '@expo/vector-icons';

import colors from "../config/colors";
import styleSheet from "../config/StyleSheet";
import Category from "../components/Category";
import ForceMode from "../components/ForceMode";
import {translateText} from "../services/LanguageService";
import {LinearGradient} from "expo-linear-gradient";
import * as Font from "expo-font";

class CategoryScreen extends Component {

    state = {
        language: this.props.route.params.language,
        theme: this.props.route.params.theme,
        categories: [],
        amountOfPrompts: 15,
        fontsLoaded: false,
    };

    componentDidMount() {
        this.loadFonts();
        // Sets all the categories. NOTE: Blank cards to fill up space should always have 'checked: false', 'title: ""' and either 'key="blank1"' or 'key="blank2"'
        this.setState({'categories': [{title: translateText(this.state.language, "CategoryScreen", "General"), key: "General", checked: true, emoji: "🧠", rank: 0}, {title: translateText(this.state.language, "CategoryScreen", "Sports"), key: "Sports", checked: true, emoji: "⚽️", rank: 1},
                {title: translateText(this.state.language, "CategoryScreen", "Games"), key: "Games", checked: true, emoji: "🎮", rank: 2}, {title: translateText(this.state.language, "CategoryScreen", "Work"), key: "Work", checked: true, emoji: "🏢 ", rank: 3},
                {title: translateText(this.state.language, "CategoryScreen", "Hobby"), key: "Hobby", checked: true, emoji: "🎳", rank: 4}, {title: translateText(this.state.language, "CategoryScreen", "Love"), key: "Love", checked: true, emoji: "❤️", rank: 5},
                {title: translateText(this.state.language, "CategoryScreen", "School"), key: "School", checked: true, emoji: "📚 ", rank: 6}, {title: "", key: "blank1", checked: false, rank: 7}, {title: "", key: "blank2", checked: false, rank: 8},]})
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

    handleCheck = (checked, title) => {         // Function that keeps the state categories up to date whenever one of the categories is checked or unchecked
        let categories = this.state.categories;

        categories.map((category) => {
            if (category.title === title){
                category.checked = checked;
            }
        })

        this.setState({"categories": categories})
    }

    handleBackButton = () => {
        this.props.navigation.goBack();
    }

    handlePlayButton = () => {

        let amountCleared = 0;
        this.state.categories.forEach((category) => {
            if (category.checked === true){
                amountCleared++;
            }
        })

        if (amountCleared < 2){
            Alert.alert("Error", "Please select at least two categories to play");
            return
        }

        this.props.navigation.navigate('GameScreen', {
            categories: this.state.categories,
            playerList: this.props.route.params.playerList,
            amountOfPrompts: this.state.amountOfPrompts,
            language: this.state.language,
            theme: this.state.theme
        });
    }

    reduceAmountOfPrompts = () => {
        if (this.state.amountOfPrompts === 5){
            return;
        }
        this.setState({'amountOfPrompts': this.state.amountOfPrompts - 5})
    }

    increaseAmountOfPrompts = () => {
        if (this.state.amountOfPrompts === 30){
            return;
        }
        this.setState({'amountOfPrompts': this.state.amountOfPrompts + 5})
    }

    helpButtonHandler = () => {
        this.props.navigation.navigate('HelpScreen', {
            language: this.state.language,
            theme: this.state.theme
        });
    }

    render() {
        if (this.state.fontsLoaded){
            return (
                <View style={styles.container}>
                    <ForceMode mode={ScreenOrientation.OrientationLock.PORTRAIT}/>
                    <StatusBar backgroundColor={colors.Secondary}/>
                    <LinearGradient colors={[this.state.theme.Secondary, this.state.theme.Primary, this.state.theme.Secondary]}
                                    start={{x: 1, y: 0}}
                                    end={{x: 0, y: 1}}
                                    style={styles.background}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{translateText(this.state.language, "CategoryScreen", "title")}</Text>
                        </View>

                        <View style={styles.categoriesContainer}>
                            <View style={styles.categoryRowContainer}>
                                {this.state.categories.filter(category => category.rank < 3).map((category) => {
                                    return (<Category theme={this.state.theme} title={category.title} emoji={category.emoji} initialCheck={category.checked} key={category.key} handleToUpdate={this.handleCheck}/>)
                                })}
                            </View>
                            <View style={styles.categoryRowContainer}>
                                {this.state.categories.filter(category => category.rank >= 3 && category.rank < 6).map((category) => {
                                    return (<Category theme={this.state.theme} title={category.title} emoji={category.emoji} initialCheck={category.checked} key={category.key} handleToUpdate={this.handleCheck}/>)
                                })}
                            </View>
                            <View style={styles.categoryRowContainer}>
                                {this.state.categories.filter(category => category.rank >= 6 && category.rank < 9).map((category) => {
                                    return (<Category theme={this.state.theme} title={category.title} emoji={category.emoji} initialCheck={category.checked} key={category.key} handleToUpdate={this.handleCheck}/>)
                                })}
                            </View>
                        </View>

                        <View style={styles.buttonContainerColumn}>
                            <Text style={styles.normalText}>{translateText(this.state.language, "CategoryScreen", "prompts-per-round")}</Text>
                            <View style={styles.amountOfRoundsContainer}>
                                <TouchableOpacity onPress={this.reduceAmountOfPrompts}>
                                    <AntDesign name="minuscircle" size={30} color="white" />
                                </TouchableOpacity>
                                <Text style={styles.normalText}>{this.state.amountOfPrompts}</Text>
                                <TouchableOpacity onPress={this.increaseAmountOfPrompts}>
                                    <AntDesign name="pluscircle" size={30} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styleSheet.SecondaryButton} onPress={this.handleBackButton}>
                                <Text style={styles.normalText}>{translateText(this.state.language, "CategoryScreen", "back-button")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.helpButton} onPress={this.helpButtonHandler}>
                                <MaterialIcons name="help-outline" size={30} color="white" />
                                <Text style={styles.smallText}>{translateText(this.state.language, "CategoryScreen", "help-button")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styleSheet.PrimaryButton} onPress={this.handlePlayButton}>
                                <Text style={styles.normalText}>{translateText(this.state.language, "CategoryScreen", "play-button")}</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>

            );
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    amountOfRoundsContainer: {
        flexDirection: "row",
        width: "25%",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: 10,
        padding: 10,
    },
    background: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    buttonContainerColumn: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    categoriesContainer: {
        flex: 2,
        gap: 10,
    },
    categoryRowContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "center",
        width: "80%",
        gap: 10,
    },
    container: {
        flex: 1,
    },
    helpButton: {
        justifyContent: "center",
        alignItems: "center"
    },
    normalText: {
        color: colors.White,
        fontSize: 18,
        fontFamily: 'Sono-Regular'
    },
    smallText: {
        color: colors.White,
        fontSize: 12,
        fontFamily: 'Sono-Light'
    },
    title: {
        color: colors.White,
        fontSize: 40,
        fontFamily: 'Sono-Bold'
    },
    titleContainer: {
        height: "15%",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
    }
})

export default CategoryScreen;
