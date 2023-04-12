import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import colors from "../config/colors";

function Category({ title, emoji, initialCheck, handleToUpdate }) {

    const [checked, setChecked] = useState(initialCheck);

    function switchCheck(){
        const toUpdate = !checked
        setChecked(toUpdate);   // Switch the checked boolean (if checked == true, set it to checked == false and vice versa
        handleToUpdate(toUpdate, title)
    }

    // Render top component if it is checked, render bottom component if it is not
    return (
        title !== "" ?
            <TouchableOpacity style={styles.card} onPress={switchCheck}>
                {checked ?
                    <View style={styles.category}>
                        <Text style={styles.boldText}>{title}</Text>
                        <Text style={styles.emoji}>{emoji}</Text>
                    </View>
                    :
                    <View style={[styles.category, styles.unchecked]}>
                        <Text style={styles.normalText}>{title}</Text>
                        <Text style={styles.emoji}></Text>
                    </View>
                }
            </TouchableOpacity>
            :
            <View style={[styles.card, {backgroundColor: colors.Primary}]}>
            </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.Secondary,
        height: "100%",
        flex: 1,
        borderRadius: 5,
        marginBottom: 5
    },
    category: {
        alignItems: "center",
    },
    emoji: {
        padding: 4,
        fontSize: 25,
    },
    unchecked: {
        opacity: 0.5,
        justifyContent: "center",
    },
    normalText: {
        padding: 4,
        color: colors.White,
        fontSize: 17,
    },
    boldText: {
        padding: 4,
        color: colors.White,
        fontSize: 17,
        fontWeight: "bold"
    }
})

export default Category;
