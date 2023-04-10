import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {translateText} from "../services/LanguageService";

function PlayerContainer(props) {
    const [name, setName] = useState(props.name);
    const [rank, setRank] = useState(props.rank);

    function handleChangeText(newName){
        setName(newName);
        props.handleToUpdate(newName, rank);
    }

    function removeSelf(rank){
        props.removePlayer(rank);
    }

    return (
        <View style={styles.playerContainer}>
            <Text style={styles.normalText}>{translateText(props.language, "PlayerContainer", "player-label")} {rank+1}</Text>
            <TextInput value={props.name} style={styles.input} placeholder={translateText(props.language, "PlayerContainer", "input-placeholder")}
                       onChangeText={(newName) => handleChangeText(newName)} onFocus={props.setFocus} onEndEditing={props.endFocus}/>
            {rank === 0 || rank === 1 ?
                <TouchableOpacity style={styles.invisibleButton}>
                    <Text style={styles.invisibleText}>x</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => removeSelf(rank)}>
                    <MaterialCommunityIcons name="close-box" size={30} color="black" />
                </TouchableOpacity>
                }

        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        color: colors.White,
        borderColor: "black",
        borderWidth: 2,
        backgroundColor: colors.Secondary,
        padding: 2,
        fontSize: 20,
        flex: 3,
        alignContent: "flex-end"
    },
    invisibleButton: {
        borderRadius: 100,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.Primary,
    },
    invisibleText: {
        color: colors.Primary
    },
    normalText: {
        color: colors.White,
        fontSize: 20,
        flex: 1,
        alignContent: "flex-start",
        width: "20%"
    },
    playerContainer: {
        flex: 1,
        flexDirection: "row",
        width: '100%',
        alignItems: "center",
    },
    roundButton: {
        borderRadius: 100,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black",
    },
})

export default PlayerContainer;
