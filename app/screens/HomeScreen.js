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

import colors from "../config/colors"
import PlayerContainer from "../components/PlayerContainer";
import ForceMode from "../components/ForceMode";

class HomeScreen extends Component {

    state = {
        playerList: [{name: '', rank: 0}, {name: '', rank: 1}],
        amountOfPlayers: 1,
    };

    updatePlayerName = (name, rank) => {
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
            Alert.alert("Too Many Players", "Maximum of 10 players!");
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
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;
        let cleared = true;
        this.state.playerList.forEach((player) => {
            if (!regex.test(player.name)){
                cleared = false;
            }
        })

        if (!cleared){
            Alert.alert("Error", "Please fill in all of the player's names (no spaces)!");
            return
        }
        this.props.navigation.navigate('CategoryScreen', {
            playerList: this.state.playerList
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <ForceMode mode={ScreenOrientation.OrientationLock.PORTRAIT}/>
                <StatusBar hidden={true}/>
                <View style={styles.background}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.title}>Box Folder!</Text>
                        <Image source={require('../assets/BoxFolderLogo.png')} style={styles.image}/>
                    </View>
                    <View style={styles.playersContainer}>
                        {this.state.playerList.map((pair) => {
                            return (
                                <PlayerContainer handleToUpdate={this.updatePlayerName} removePlayer={this.removePlayerHandler} name={pair.name} rank={pair.rank} key={pair.rank}/>
                            )
                        })}
                    </View>
                    <View style={styles.addPlayerContainer}>
                        <Text style={styles.normalText}>Add New Player</Text>
                        <TouchableOpacity style={styles.roundButton} onPress={this.addPlayerHandler}>
                            <Text style={styles.normalText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.playButtonContainer}>
                        <TouchableOpacity style={styles.longButton} onPress={this.playButtonHandler}>
                            <Text style={styles.normalText}>Let's Drink!</Text>
                        </TouchableOpacity>
                    </View>
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
    container: {
        flex: 1,
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
    logoContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        paddingTop: StatusBar.currentHeight
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
    playButtonContainer: {
        width: "100%",
        alignItems: "center",
        padding: 20
    },
    playersContainer: {
        height: 375,
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
