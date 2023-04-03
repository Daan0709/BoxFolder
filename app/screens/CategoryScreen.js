import React, {Component} from 'react';
import {Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

import colors from "../config/colors";
import Category from "../components/Category";
import ForceMode from "../components/ForceMode";

class CategoryScreen extends Component {

    state = {
        categories: [{title: "General", checked: true}, {title: "Sports", checked: true}, {title: "Games", checked: true},
                    {title: "Work", checked: true}, {title: "Hobby", checked: true},
                    {title: "Love", checked: true}, {title: "School", checked: true}]
    };

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

        let cleared = false;
        this.state.categories.forEach((category) => {
            if (category.checked === true){
                cleared = true;
            }
        })

        if (!cleared){
            Alert.alert("Error", "Please select at least one category to play");
            return
        }

        this.props.navigation.navigate('GameScreen', {
            categories: this.state.categories,
            playerList: this.props.route.params.playerList
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ForceMode mode={ScreenOrientation.OrientationLock.PORTRAIT}/>
                <StatusBar backgroundColor={colors.Primary}/>
                <View style={styles.background}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Choose your categories!</Text>
                    </View>

                    <View style={styles.categoryContainer}>
                        {this.state.categories.map((category) => {
                            return (<Category title={category.title} initialCheck={category.checked} key={category.title} handleToUpdate={this.handleCheck}/>)
                        })}
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.longButton} onPress={this.handleBackButton}>
                            <Text style={styles.normalText}>Go Back!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.longButton} onPress={this.handlePlayButton}>
                            <Text style={styles.normalText}>Let's Drink!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
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
    categoryContainer: {
        height: 550, // Categoryheight * rows + 50
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        width: 210, // twice the width of a category + 10
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
