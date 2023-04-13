import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {translateText} from "../services/LanguageService";
import {useFonts} from "expo-font";

function PlayerContainer(props) {
    const [name, setName] = useState(props.name);
    const [rank, setRank] = useState(props.rank);
    const [loaded] = useFonts({
        Sono_ExtraLight: require('../assets/fonts/Sono-ExtraLight.ttf'),
        Sono_Bold: require('../assets/fonts/Sono-Bold.ttf'),
        Sono_ExtraBold: require('../assets/fonts/Sono-ExtraBold.ttf'),
        Sono_Light: require('../assets/fonts/Sono-Light.ttf'),
        Sono_Medium: require('../assets/fonts/Sono-Medium.ttf'),
        Sono_Regular: require('../assets/fonts/Sono-Regular.ttf'),
        Sono_SemiBold: require('../assets/fonts/Sono-SemiBold.ttf'),
    })

    function handleChangeText(newName){
        setName(newName);
        props.handleToUpdate(newName, rank);
    }

    function removeSelf(rank){
        props.removePlayer(rank);
    }

    if (!loaded){
        return null;
    }

    return (
        <View style={styles.playerContainer}>
            <Text style={styles.regularText}>{translateText(props.language, "PlayerContainer", "player-label")} {rank+1}</Text>
            <View style={styles.horizontalContainer}>
                <TextInput value={props.name} style={[styles.input, {backgroundColor: props.theme.Secondary,}]}
                           placeholder={translateText(props.language, "PlayerContainer", "input-placeholder")}
                           placeholderTextColor={'#bdbbbb'}
                           onChangeText={(newName) => handleChangeText(newName)}/>
                {rank === 0 || rank === 1 ?
                    <TouchableOpacity style={styles.invisibleButton}>
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
        padding: 2,
        paddingLeft: 10,
        fontSize: 15,
        flex: 1,
        fontFamily: 'Sono-ExtraBold'
    },
    invisibleButton: {
        width: 30,
        height: 30,
    },
    regularText: {
        color: colors.White,
        fontSize: 15,
        alignContent: "flex-start",
        fontFamily: 'Sono-Regular'
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
