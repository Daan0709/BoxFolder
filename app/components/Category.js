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
        <TouchableOpacity onPress={switchCheck}>
            {checked ?
                <View style={styles.category}>
                    <Text style={styles.boldText}>{title}</Text>
                    <Text style={styles.boldText}>{emoji}</Text>
                </View>
                :
                <View style={[styles.category, styles.unchecked]}>
                    <Text style={styles.normalText}>{title}</Text>
                </View>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    category: {
        height: 110,
        width: 100,
        backgroundColor: colors.Secondary,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 5
    },
    unchecked: {
        opacity: 0.5,
        justifyContent: "center",
    },
    normalText: {
        padding: 4,
        color: colors.White,
        fontSize: 20,
    },
    boldText: {
        padding: 4,
        color: colors.White,
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default Category;
