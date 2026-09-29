import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useFonts} from "expo-font";

function Category({ title, emoji, initialCheck, handleToUpdate, theme }) {

    const [checked, setChecked] = useState(initialCheck);
    const [loaded] = useFonts({
        Sono_ExtraLight: require('../assets/fonts/Sono-ExtraLight.ttf'),
        Sono_Bold: require('../assets/fonts/Sono-Bold.ttf'),
        Sono_ExtraBold: require('../assets/fonts/Sono-ExtraBold.ttf'),
        Sono_Light: require('../assets/fonts/Sono-Light.ttf'),
        Sono_Medium: require('../assets/fonts/Sono-Medium.ttf'),
        Sono_Regular: require('../assets/fonts/Sono-Regular.ttf'),
        Sono_SemiBold: require('../assets/fonts/Sono-SemiBold.ttf'),
    })

    function switchCheck(){
        const toUpdate = !checked
        setChecked(toUpdate);   // Switch the checked boolean (if checked == true, set it to checked == false and vice versa
        handleToUpdate(toUpdate, title)
    }

    if (!loaded){
        return null;
    }

    // Render top component if it is checked, render bottom component if it is not
    return (
        title !== "" ?
            <View style={{flex: 1}}>
                {checked ?
                    <TouchableOpacity style={[styles.card, {backgroundColor: theme.Secondary}]} onPress={switchCheck}>
                        <View style={styles.category}>
                            <Text style={[styles.boldText, {color: theme.textColor}]}>{title}</Text>
                            <Text style={styles.emoji}>{emoji}</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[styles.card_unchecked, {backgroundColor: theme.Secondary}]} onPress={switchCheck}>
                        <View style={styles.category}>
                            <Text style={[styles.normalText, {color: theme.textColor}]}>{title}</Text>
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
        fontSize: 17,
        fontFamily: 'Sono-Light'
    },
    boldText: {
        padding: 4,
        fontSize: 17,
        fontFamily: 'Sono-SemiBold'
    }
})

export default Category;
