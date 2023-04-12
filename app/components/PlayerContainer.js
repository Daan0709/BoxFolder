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
            <View style={styles.horizontalContainer}>
                <TextInput value={props.name} style={styles.input}
                           placeholder={translateText(props.language, "PlayerContainer", "input-placeholder")}
                           placeholderTextColor={'#bdbbbb'}
                           onChangeText={(newName) => handleChangeText(newName)}/>
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
        </View>
    );
}

const styles = StyleSheet.create({
    horizontalContainer: {
        flex: 1,
        flexDirection: "row",
        width: '100%',
        alignItems: "center",
    },
    input: {
        color: colors.White,
        borderRadius: 5,
        backgroundColor: colors.Secondary,
        padding: 2,
        paddingLeft: 10,
        fontSize: 15,
        flex: 1,
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
        fontSize: 15,
        alignContent: "flex-start",
    },
    playerContainer: {
        flex: 1,
        width: '80%',
        alignItems: "flex-start",
        marginBottom: 20
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
