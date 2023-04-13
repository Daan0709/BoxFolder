import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import { Octicons } from '@expo/vector-icons';

import {getColorTheme} from "../services/ThemeService";
import {translateText} from "../services/LanguageService";
import {useFonts} from "expo-font";

function ThemeSwitch({ theme, swapThemeHandler, language }) {

    const [loaded] = useFonts({
        Sono_ExtraLight: require('../assets/fonts/Sono-ExtraLight.ttf'),
        Sono_Bold: require('../assets/fonts/Sono-Bold.ttf'),
        Sono_ExtraBold: require('../assets/fonts/Sono-ExtraBold.ttf'),
        Sono_Light: require('../assets/fonts/Sono-Light.ttf'),
        Sono_Medium: require('../assets/fonts/Sono-Medium.ttf'),
        Sono_Regular: require('../assets/fonts/Sono-Regular.ttf'),
        Sono_SemiBold: require('../assets/fonts/Sono-SemiBold.ttf'),
    })

    function swapTheme(){
        if (theme === getColorTheme('green')){
            swapThemeHandler('purple');
            return
        } else if (theme === getColorTheme('purple')){
            swapThemeHandler('black');
            return
        } else if (theme === getColorTheme('black')){
            swapThemeHandler('white');
            return
        }
        swapThemeHandler('green');
    }

    if(!loaded){
        return null;
    }

    return (
        <TouchableOpacity onPress={swapTheme} style={[styles.button]}>
            <Octicons name="paintbrush" size={24} color={theme.textColor} />
            <Text style={[styles.extraLightText, {color: theme.textColor}]}>{translateText(language, "HomeScreen", "theme-button")}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        justifyContent: "center",
        flexDirection: "row"
    },
    extraLightText: {
        padding: 4,
        fontSize: 15,
        fontFamily: 'Sono-ExtraLight'
    },
})

export default ThemeSwitch;
