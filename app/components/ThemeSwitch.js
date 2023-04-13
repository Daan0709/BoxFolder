import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import { Octicons } from '@expo/vector-icons';

import colors from "../config/colors";
import {getColorTheme} from "../services/ThemeService";
import {translateText} from "../services/LanguageService";

function ThemeSwitch({ theme, swapThemeHandler, language }) {

    function swapTheme(){
        if (theme === getColorTheme('green')){
            swapThemeHandler('purple');
            return
        }
        swapThemeHandler('green');
    }

    return (
        <TouchableOpacity onPress={swapTheme} style={[styles.button]}>
            <Octicons name="paintbrush" size={24} color="white" />
            <Text style={styles.normalText}>{translateText(language, "HomeScreen", "theme-button")}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        justifyContent: "center",
        flexDirection: "row"
    },
    normalText: {
        padding: 4,
        color: colors.White,
        fontSize: 15,
    },
})

export default ThemeSwitch;
