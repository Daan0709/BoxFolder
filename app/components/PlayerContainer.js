import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import colors from "../config/colors";

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
            <Text style={styles.normalText}>Player {rank+1}</Text>
            <TextInput value={props.name} style={styles.input} placeholder="Name" onChangeText={(newName) => handleChangeText(newName)}/>
            {rank === 0 || rank === 1 ? <TouchableOpacity style={styles.invisibleButton}>
                    <Text style={styles.invisibleText}>x</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={styles.roundButton} onPress={() => removeSelf(rank)}>
                    <Text style={styles.normalText}>x</Text>
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
        width: "60%",
        backgroundColor: colors.Secondary,
        padding: 2,
        fontSize: 20
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
    },
    playerContainer: {
        flex: 1,
        flexDirection: "row",
        width: '100%',
        alignItems: "center",
        justifyContent: "space-around"
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
