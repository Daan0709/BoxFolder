import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    Image,
    Text,
    TouchableOpacity,
    Alert
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { MaterialIcons } from '@expo/vector-icons';

import colors from "../config/colors"
import PlayerContainer from "../components/PlayerContainer";
import ForceMode from "../components/ForceMode";
import LanguageSwitch from "../components/LanguageSwitch";
import {translateText} from "../services/LanguageService";


class HomeScreen extends Component {

    state = {
        playerList: [{name: '', rank: 0}, {name: '', rank: 1}],
        amountOfPlayers: 1,
        language: 'uk',
        languageOpacity: 1,
    };

    updatePlayerName = (name, rank) => {
        // Max length of a name is 20 characters
        if (name.length > 20){
            return;
        }
        let playerList = this.state.playerList;
        playerList.map((pair) => {
            if (pair.rank === rank){
                pair.name = name;
            }
        })
        this.setState({'playerList': playerList})
    }

    addPlayerHandler = () => {

        if (this.state.amountOfPlayers === 9){
            Alert.alert(translateText(this.state.language, "Alert", "player-amount-title"), translateText(this.state.language, "Alert", "player-amount-body"));
            return
        }

        this.setState({'amountOfPlayers': this.state.amountOfPlayers+1}) // Increase Players By 1

        let playerList = this.state.playerList;
        playerList.push({name: "", rank: this.state.amountOfPlayers+1}); // Append a blank player to the player list
        this.setState({'playerList': playerList});
    }

    removePlayerHandler = (rank) => {

        let playerList = this.state.playerList.filter(function(player){ // Filter out the to-be-removed player
            return player.rank !== rank;
        });

        // Lower the ranks of all the players that came after the removed player and reduce the amountOfPlayers state
        let correctLowArray = playerList.slice(0, rank)
        let highRankArray = playerList.slice(rank);
        highRankArray.map((player) => {
            player.rank = player.rank -1
        })

        let result = correctLowArray.concat(highRankArray);
        this.setState({'amountOfPlayers': this.state.amountOfPlayers-1})
        this.setState({'playerList': result})
    }

    playButtonHandler = () => {
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ-— 0-9()]+$/;
        let cleared = true;
        this.state.playerList.forEach((player) => {
            if (!regex.test(player.name)){
                cleared = false;
            }
        })

        if (!cleared){
            Alert.alert("Error", translateText(this.state.language, "Alert", "player-names-body"));
            return
        }
        this.props.navigation.navigate('CategoryScreen', {
            playerList: this.state.playerList,
            language: this.state.language
        });
    }

    helpButtonHandler = () => {
        this.props.navigation.navigate('HelpScreen', {
            language: this.state.language
        });
    };

    setLanguageHandler = (lang) => {
        this.setState({'language': lang});
    }

    // TODO: These only work if the user hits the enter button, not when they
    // TODO: back out of the text focus with system buttons
    setFocus = () => {
        this.setState({'languageOpacity': 0});
    }

    endFocus = () => {
        this.setState({'languageOpacity': 1});
    }

    render(){
        return (
            <View style={styles.container}>
                <ForceMode mode={ScreenOrientation.OrientationLock.PORTRAIT}/>
                <StatusBar backgroundColor={colors.Primary}/>
                <View style={styles.background}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.title}>Box Folder!</Text>
                        <Image source={require('../assets/images/BoxFolderLogo.png')} style={styles.image}/>
                    </View>
                    <View style={styles.fixedHeightContainer}>
                        <View style={[styles.playersContainer, {height: this.state.playerList.length * 40}]}>
                            {this.state.playerList.map((pair) => {
                                return (
                                    <PlayerContainer
                                        language={this.state.language}
                                        handleToUpdate={this.updatePlayerName}
                                        removePlayer={this.removePlayerHandler}
                                        setFocus={this.setFocus}
                                        endFocus={this.endFocus}
                                        name={pair.name}
                                        rank={pair.rank}
                                        key={pair.rank}/>
                                )
                            })}
                        </View>
                    </View>

                    <View style={styles.addPlayerContainer}>
                        <Text style={styles.normalText}>{translateText(this.state.language, "HomeScreen", "add-player-button")}</Text>
                        <TouchableOpacity style={styles.roundButton} onPress={this.addPlayerHandler}>
                            <Text style={styles.normalText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.longButton} onPress={this.playButtonHandler}>
                            <Text style={styles.normalText}>{translateText(this.state.language, "HomeScreen", "play-button")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.helpButtonHandler}>
                            <MaterialIcons name="help-outline" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    <LanguageSwitch style={styles.language} language={'🇬🇧 '} setLanguageHandler={this.setLanguageHandler} opacity={this.state.languageOpacity}/>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    addPlayerContainer: {
        width: "100%",
        alignItems: "center",
        padding: 10
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.Primary,
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
        padding: 20,
        rowGap: 10
    },
    container: {
        flex: 1,
    },
    fixedHeightContainer: {
        height: 400,    // Should be equal to 40 * the max amount of players
    },
    image: {
      width: 80,
      height: 80
    },
    input: {
        color: colors.White,
        borderColor: "black",
        borderWidth: 2,
        width: "60%",
        backgroundColor: colors.Secondary,
        padding: 2,
        fontSize: 20
    },
    language: {
        backgroundColor: "teal",
        position: "absolute",
        top: StatusBar.currentHeight,
        right: 15,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
    },
    longButton: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.Secondary,
        borderColor: "black",
        borderWidth: 2,
        width: "50%"
    },
    normalText: {
        padding: 4,
        color: colors.White,
        fontSize: 20,
    },
    playersContainer: {
        width: '100%',
    },
    roundButton: {
        borderRadius: 100,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black",
    },
    title: {
        color: colors.White,
        fontSize: 40,
    }
})

export default HomeScreen;
