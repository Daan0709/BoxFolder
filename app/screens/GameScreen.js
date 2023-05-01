import React, {Component} from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import {Alert, BackHandler, StatusBar, StyleSheet, TouchableOpacity, View} from "react-native";
import Prompts from "../assets/prompts/prompts"
;
import Prompt from "../components/Prompt";
import NextRound from "../components/NextRound";
import FinalRound from "../components/FinalRound";
import ForceMode from "../components/ForceMode";
import {MaterialIcons} from "@expo/vector-icons";
import {translateText} from "../services/LanguageService";

class GameScreen extends Component {
    state = {
        categories: this.props.route.params.categories,
        currentPrompt: {},
        previousPrompt: {}, // Stored so the player can go back to it when they accidentally skip it
        currentRound: 0,
        playerList: [],
        prompts: [],
        promptLoaded: false,
        promptsLoaded: false,
        showNextRoundScreen: true,
        showPreviousPrompt: false,
        turnsUntilNextRound: this.props.route.params.amountOfPrompts,
        amountOfPrompts: this.props.route.params.amountOfPrompts,
        currentPlayer: null,
        currentPlayerIndex: 0,
        finalRound: false,
        language: this.props.route.params.language,
        theme: this.props.route.params.theme,
        maxForSips: 5, // Maximum amount of sips for a 'For every' prompt
    };

    componentDidMount() {
        const copy = [...this.props.route.params.playerList];       // Necessary so the playerlist in HomeScreen doesn't get changed
        this.setState({'playerList': copy})
        this.setState({'previousPrompt': {prompt: translateText(this.state.language, "GameScreen", "start-title"), amountOfSips: translateText(this.state.language, "GameScreen", "start-round")}})
        this.loadPrompts();
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.backAction,
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    backAction = () => {
        Alert.alert(translateText(this.state.language, "GameScreen", "back-alert-title"), translateText(this.state.language, "GameScreen", "back-alert-body"), [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            {text: translateText(this.state.language, "GameScreen", "back-alert-button"), onPress: () => this.props.navigation.goBack()},
        ]);
        return true;
    };

    loadPrompts = () => {
        let promptsToLoad = [];
        this.state.categories.forEach((category) => {
            if (category.checked) {
                promptsToLoad = promptsToLoad.concat(Prompts[this.state.language][category.key]);
            }
        })
        this.setState({'prompts': promptsToLoad});
        this.setState({'promptsLoaded': true});
    }

    showCurrentPrompt = () => {
        this.setState({'showPreviousPrompt': false})
    }

    nextPromptHandler = () => {
        if (this.state.showPreviousPrompt){
            this.showCurrentPrompt();
            return;
        }
        this.setState({'previousPrompt': this.state.currentPrompt});
        if (this.state.turnsUntilNextRound === 0){
            this.setState({'showNextRoundScreen': true});
        }

        this.loadInNextPrompt();
        this.setState({'turnsUntilNextRound': this.state.turnsUntilNextRound-1});
    }

    loadInNextPrompt = () => {
        let prompt = this.state.prompts[Math.floor(Math.random()*this.state.prompts.length)];

        // If a name needs to be chosen, replace the "..." with a random name
        const randomName = this.state.playerList[Math.floor(Math.random()*this.state.playerList.length)].name
        let promptClone = {...prompt};  // Don't overwrite the existing prompt in prompts.js
        promptClone.prompt = String(promptClone.prompt).replace("...", randomName);

        // Remove the random prompt from the prompt pool so it doesn't come up again
        const index = this.state.prompts.indexOf(prompt);
        if (index > -1) { // only splice array when item is found
            this.state.prompts.splice(index, 1); // 2nd parameter means remove one item only
        }

        let amountOfSips;
        // Limits the amount of sips given away or being drunk to just be 1 per thing
        // Also append a string to limit the maximum amount of sips, update this if another language is added
        if (promptClone.prompt.startsWith('For') || promptClone.prompt.startsWith('Voor')){
            amountOfSips = 1;
            promptClone.prompt += this.state.language === 'nl' ? `, tot een maximum van ${this.state.maxForSips}` : `, up to a maximum of ${this.state.maxForSips}`;
        } else {
        //                                             V The max amount of sips per prompt, minimum of 1
            amountOfSips = Math.floor(Math.random()*3)+1;
        }

        this.setState({'currentPrompt': {prompt: promptClone.prompt, amountOfSips: amountOfSips}});
    }

    previousPromptHandler = () => {
        this.setState({'showPreviousPrompt': true})
    }

    nextRoundHandler = () => {
        this.loadInNextPrompt();
        this.setState({'showNextRoundScreen': false});
        this.setState({'turnsUntilNextRound': this.state.amountOfPrompts - 1});
        this.setState({'previousPrompt': {prompt: translateText(this.state.language, "GameScreen", "previous-prompt"), amountOfSips: ''}})
        const nextRound = this.state.currentRound + 1;
        if (nextRound === 3){
            this.loadInFirstPlayer();
        }
        this.setState({'currentRound': nextRound});
    }

    loadInRandomFinisherPrompt = () => {
        let finisherPrompt = Prompts[this.state.language].Finishers[Math.floor(Math.random()*Prompts[this.state.language].Finishers.length)];
        this.setState({'currentPrompt': {prompt: finisherPrompt, amountOfSips: 0}});
    }

    loadInFirstPlayer = () => {
        this.loadInRandomFinisherPrompt();
        this.setState({'currentPlayer': this.state.playerList[0]});
    }

    loadNextPlayer = (elimination) => {
        // if there was an elimination
        if (elimination){

            // No one wins if the last remaining player is eliminated
            if (this.state.finalRound){
                this.setState({'currentPlayer': {name: "No one"}});
                this.setState({'playerList': []})
                return
            }
            // If the second to last remaining player is eliminated before the last one: finalRound is true
            if (this.state.playerList.length === 2 && this.state.currentPlayerIndex === 0){
                this.setState({'finalRound': true});
                this.continuePlaying();
                return;
            }

            if (this.state.currentPlayerIndex > -1) { // only splice array when item is found
                this.state.playerList.splice(this.state.currentPlayerIndex, 1); // 2nd parameter means remove one item only
            }
            if (this.state.playerList.length === this.state.currentPlayerIndex){
                this.setState({'currentPlayerIndex': 0});
                this.setState({'currentPlayer': this.state.playerList[0]});
                this.loadInRandomFinisherPrompt();
                return
            }
            this.setState({'currentPlayer': this.state.playerList[this.state.currentPlayerIndex]});
            this.loadInRandomFinisherPrompt();
            return
        }

        // If there was no elimination
        this.continuePlaying()
    }

    continuePlaying = () => {
        // If it was the final round and you continued playing, you have won!
        if (this.state.finalRound){
            if (this.state.currentPlayerIndex > -1) { // only splice array when item is found
                this.state.playerList.splice(0, 1); // 2nd parameter means remove one item only
            }
            this.setState({'currentPlayerIndex': 0});
            this.setState({'currentPlayer': this.state.playerList[0]});
            return
        }

        if (this.state.playerList.length === this.state.currentPlayerIndex+1){
            this.setState({'currentPlayerIndex': 0});
            this.setState({'currentPlayer': this.state.playerList[0]});
            this.loadInRandomFinisherPrompt();
            return
        }
        this.loadInRandomFinisherPrompt();
        this.setState({'currentPlayerIndex': this.state.currentPlayerIndex+1})
        this.setState({'currentPlayer': this.state.playerList[this.state.currentPlayerIndex+1]});
    }

    removePlayerHandler = () => {
        this.loadNextPlayer(true)
    }

    continuePlayingHandler = () => {
        this.loadNextPlayer(false)
    }

    goBackHandler = () => {
        this.props.navigation.navigate('HomeScreen');
    }

    helpButtonHandler = () => {
        this.props.navigation.navigate('HelpScreen', {
            language: this.state.language,
            theme: this.state.theme
        });
    }

    render() {
        return (
            <View style={styles.background}>
                <StatusBar hidden={true}/>
                <ForceMode mode={ScreenOrientation.OrientationLock.LANDSCAPE}/>
                {this.state.showNextRoundScreen ?                                   // If the next round screen should be shown:
                    <NextRound nextRoundHandler={this.nextRoundHandler} roundNumber={this.state.currentRound} language={this.state.language}/>
                    :
                    this.state.showPreviousPrompt && this.state.currentRound === 1 ?    // If the player wants to see the previous prompt and its round 1
                        <Prompt prompt={this.state.previousPrompt.prompt}
                                amountOfSips={this.state.previousPrompt.amountOfSips}
                                giveOrDrink={"Drink "}
                                nextPromptHandler={this.nextPromptHandler}
                                previousPromptHandler={this.previousPromptHandler}
                                color={this.state.theme.Secondary} secondaryColor={this.state.theme.Tertiary}
                                textColor={this.state.theme.textColor}
                                language={this.state.language}/>
                        :
                        this.state.showPreviousPrompt && this.state.currentRound === 2 ? // If the player wants to see the previous prompt and its round 2
                            <Prompt prompt={this.state.previousPrompt.prompt}
                                    amountOfSips={this.state.previousPrompt.amountOfSips}
                                    giveOrDrink={"Give out "}
                                    nextPromptHandler={this.nextPromptHandler}
                                    previousPromptHandler={this.previousPromptHandler}
                                    color={this.state.theme.SecondaryContrast} secondaryColor={this.state.theme.TertiaryContrast}
                                    textColor={this.state.theme.textColor}
                                    language={this.state.language}/>
                            :
                            this.state.currentRound === 1 ?                                 // If it is round one, drink, round two: give out
                                <Prompt prompt={this.state.currentPrompt.prompt}
                                        amountOfSips={this.state.currentPrompt.amountOfSips}
                                        giveOrDrink={"Drink "}
                                        nextPromptHandler={this.nextPromptHandler}
                                        previousPromptHandler={this.previousPromptHandler}
                                        color={this.state.theme.Secondary} secondaryColor={this.state.theme.Primary}
                                        textColor={this.state.theme.textColor}
                                        language={this.state.language}/>
                                :
                                this.state.currentRound === 2 ?                             // Round two, so give out
                                <Prompt prompt={this.state.currentPrompt.prompt}
                                        amountOfSips={this.state.currentPrompt.amountOfSips}
                                        giveOrDrink={"Give out "}
                                        nextPromptHandler={this.nextPromptHandler}
                                        previousPromptHandler={this.previousPromptHandler}
                                        color={this.state.theme.SecondaryContrast} secondaryColor={this.state.theme.PrimaryContrast}
                                        textColor={this.state.theme.textColor}
                                        language={this.state.language}/>
                                    :                                                       // Final round (round three)
                                    <FinalRound prompt={this.state.currentPrompt.prompt}
                                                playerName={this.state.currentPlayer.name}
                                                removePlayerHandler={this.removePlayerHandler}
                                                continuePlayingHandler={this.continuePlayingHandler}
                                                playerListLength={this.state.playerList.length}
                                                goBackHandler={this.goBackHandler}
                                                playerIndex={this.state.currentPlayerIndex}
                                                language={this.state.language}/>
                }
                <TouchableOpacity onPress={this.helpButtonHandler} style={styles.helpButton}>
                    <MaterialIcons name="help-outline" size={30} color={this.state.theme.textColor} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    helpButton: {
        position: "absolute",
        top: 20,
        left: 20,
    },
})

export default GameScreen;
