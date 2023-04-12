import React, {Component} from 'react';
import {Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import {AntDesign, MaterialIcons} from '@expo/vector-icons';

import colors from "../config/colors";
import Category from "../components/Category";
import ForceMode from "../components/ForceMode";
import {translateText} from "../services/LanguageService";

class CategoryScreen extends Component {

    state = {
        language: this.props.route.params.language,
        categories: [],
        amountOfPrompts: 15,
    };

    componentDidMount() {
        this.setState({'categories': [{title: translateText(this.state.language, "CategoryScreen", "General"), key: "General", checked: true, emoji: "🧠"}, {title: translateText(this.state.language, "CategoryScreen", "Sports"), key: "Sports", checked: true, emoji: "⚽️"},
                {title: translateText(this.state.language, "CategoryScreen", "Games"), key: "Games", checked: true, emoji: "🎮"}, {title: translateText(this.state.language, "CategoryScreen", "Work"), key: "Work", checked: true, emoji: "🏢 "},
                {title: translateText(this.state.language, "CategoryScreen", "Hobby"), key: "Hobby", checked: true, emoji: "🎳"}, {title: translateText(this.state.language, "CategoryScreen", "Love"), key: "Love", checked: true, emoji: "❤️"},
                {title: translateText(this.state.language, "CategoryScreen", "School"), key: "School", checked: true, emoji: "📚 "}]})
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
            language: this.state.language
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
            language: this.state.language
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ForceMode mode={ScreenOrientation.OrientationLock.PORTRAIT}/>
                <StatusBar backgroundColor={colors.Primary}/>
                <View style={styles.background}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{translateText(this.state.language, "CategoryScreen", "title")}</Text>
                    </View>

                    <View style={styles.categoryContainer}>
                        {this.state.categories.map((category) => {
                            return (<Category title={category.title} emoji={category.emoji} initialCheck={category.checked} key={category.key} handleToUpdate={this.handleCheck}/>)
                        })}
                    </View>

                    <View style={styles.buttonContainerColumn}>
                        <Text style={styles.smallText}>{translateText(this.state.language, "CategoryScreen", "prompts-per-round")}</Text>
                        <View style={styles.amountOfRoundsContainer}>
                            <TouchableOpacity onPress={this.reduceAmountOfPrompts}>
                                <AntDesign name="minuscircle" size={30} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.normalText}>{this.state.amountOfPrompts}</Text>
                            <TouchableOpacity onPress={this.increaseAmountOfPrompts}>
                                <AntDesign name="pluscircle" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.longButton} onPress={this.handleBackButton}>
                            <Text style={styles.normalText}>{translateText(this.state.language, "CategoryScreen", "back-button")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.helpButtonHandler}>
                            <MaterialIcons name="help-outline" size={30} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.longButton} onPress={this.handlePlayButton}>
                            <Text style={styles.normalText}>{translateText(this.state.language, "CategoryScreen", "play-button")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    amountOfRoundsContainer: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    background: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.Primary,
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
        justifyContent: "space-around"
    },
    categoryContainer: {
        height: 490, // Categoryheight * rows + 50
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "center",
        width: 310, // thrice the width of a category + 10
    },
    container: {
        flex: 1,
    },
    longButton: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.Secondary,
        borderColor: "black",
        borderWidth: 2,
        width: "40%"
    },
    normalText: {
        padding: 4,
        color: colors.White,
        fontSize: 20,
    },
    smallText: {
        color: colors.White,
        fontSize: 15,
    },
    title: {
        color: colors.White,
        fontSize: 40,
        fontWeight: "bold"
    },
    titleContainer: {
        height: "15%",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
    }
})

export default CategoryScreen;
