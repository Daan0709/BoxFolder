import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import colors from "../config/colors";

function Category({ title, emoji, initialCheck, handleToUpdate, theme }) {

    const [checked, setChecked] = useState(initialCheck);

    function switchCheck(){
        const toUpdate = !checked
        setChecked(toUpdate);   // Switch the checked boolean (if checked == true, set it to checked == false and vice versa
        handleToUpdate(toUpdate, title)
    }

    // Render top component if it is checked, render bottom component if it is not
    return (
        title !== "" ?
            <View style={{flex: 1}}>
                {checked ?
                    <TouchableOpacity style={[styles.card, {backgroundColor: theme.Secondary}]} onPress={switchCheck}>
                        <View style={styles.category}>
                            <Text style={styles.boldText}>{title}</Text>
                            <Text style={styles.emoji}>{emoji}</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[styles.card_unchecked, {backgroundColor: theme.Secondary}]} onPress={switchCheck}>
                        <View style={styles.category}>
                            <Text style={styles.normalText}>{title}</Text>
                        </View>
                    </TouchableOpacity>

                }
            </View>
            :
            <View style={styles.card}>
            </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 5,
        marginBottom: 5
    },
    card_unchecked: {
        flex: 1,
        borderRadius: 5,
        marginBottom: 5,
        opacity: 0.25,
        justifyContent: "center"
    },
    category: {
        alignItems: "center",
    },
    emoji: {
        padding: 4,
        fontSize: 25,
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
