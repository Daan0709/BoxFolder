import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Octicons, AntDesign } from '@expo/vector-icons';

import {translateText} from "../services/LanguageService";
import {useFonts} from "expo-font";
import {LinearGradient} from "expo-linear-gradient";
import colors from "../config/colors";

function ThemeSwitch({ theme, swapThemeHandler, language }) {

    const [clicked, setClicked] = useState(false);
    const [loaded] = useFonts({
        Sono_ExtraLight: require('../assets/fonts/Sono-ExtraLight.ttf'),
        Sono_Bold: require('../assets/fonts/Sono-Bold.ttf'),
        Sono_ExtraBold: require('../assets/fonts/Sono-ExtraBold.ttf'),
        Sono_Light: require('../assets/fonts/Sono-Light.ttf'),
        Sono_Medium: require('../assets/fonts/Sono-Medium.ttf'),
        Sono_Regular: require('../assets/fonts/Sono-Regular.ttf'),
        Sono_SemiBold: require('../assets/fonts/Sono-SemiBold.ttf'),
    })

    function swapTheme(theme){
        swapThemeHandler(theme);
        setClicked(false);
    }

    function themeClickHandler(){
        setClicked(!clicked);
    }

    if(!loaded){
        return null;
    }

    return (
        <View style={styles.themeSwitch}>
            {clicked ?
                <View style={styles.themeSwitch}>
                    <TouchableOpacity onPress={themeClickHandler} style={[styles.button]}>
                        <Octicons name="paintbrush" size={24} color={theme.textColor} />
                        <Text style={[styles.extraLightText, {color: theme.textColor}]}>{translateText(language, "HomeScreen", "theme-button")}</Text>
                    </TouchableOpacity>
                    <AntDesign style={styles.caret} name="caretdown" size={24} color={theme.Primary} />
                    <View style={[styles.themesContainer, {backgroundColor: theme.Primary}]}>
                        <View style={styles.themesRow}>
                            <TouchableOpacity style={{borderColor: theme.textColor, borderWidth: 2}} onPress={() => swapTheme('green')}>
                                <LinearGradient colors={[colors['green'].Primary, colors['green'].Secondary, colors['green'].Tertiary]}
                                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                                style={styles.themeButton}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderColor: theme.textColor, borderWidth: 2}} onPress={() => swapTheme('lightgreen')}>
                                <LinearGradient colors={[colors['lightgreen'].Primary, colors['lightgreen'].Secondary, colors['lightgreen'].Tertiary]}
                                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                                style={styles.themeButton}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderColor: theme.textColor, borderWidth: 2}} onPress={() => swapTheme('purple')}>
                                <LinearGradient colors={[colors['purple'].Primary, colors['purple'].Secondary, colors['purple'].Tertiary]}
                                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                                style={styles.themeButton}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderColor: theme.textColor, borderWidth: 2}} onPress={() => swapTheme('black')}>
                                <LinearGradient colors={[colors['black'].Primary, colors['black'].Secondary, colors['black'].Tertiary]}
                                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                                style={styles.themeButton}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.themesRow}>
                            <TouchableOpacity style={{borderColor: theme.textColor, borderWidth: 2}} onPress={() => swapTheme('white')}>
                                <LinearGradient colors={[colors['white'].Primary, colors['white'].Secondary, colors['white'].Tertiary]}
                                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                                style={styles.themeButton}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderColor: theme.textColor, borderWidth: 2}} onPress={() => swapTheme('coral')}>
                                <LinearGradient colors={[colors['coral'].Primary, colors['coral'].Secondary, colors['coral'].Tertiary]}
                                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                                style={styles.themeButton}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderColor: theme.textColor, borderWidth: 2}} onPress={() => swapTheme('mediteranean')}>
                                <LinearGradient colors={[colors['mediteranean'].Primary, colors['mediteranean'].Secondary, colors['mediteranean'].Tertiary]}
                                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                                style={styles.themeButton}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                :
                <TouchableOpacity onPress={themeClickHandler} style={[styles.button]}>
                    <Octicons name="paintbrush" size={24} color={theme.textColor} />
                    <Text style={[styles.extraLightText, {color: theme.textColor}]}>{translateText(language, "HomeScreen", "theme-button")}</Text>
                </TouchableOpacity>
            }
        </View>

    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        justifyContent: "center",
        flexDirection: "row"
    },
    caret: {
        position: "absolute",
        bottom: 25,
        opacity: 0.85
    },
    extraLightText: {
        padding: 4,
        fontSize: 15,
        fontFamily: 'Sono-ExtraLight'
    },
    themeButton: {
        height: 40,
        width: 40,
    },
    themesContainer: {
        position: 'absolute',
        opacity: 0.95,
        borderRadius: 15,
        height: 200,
        width: Dimensions.get('screen').width - 20,
        bottom: 40,
        justifyContent: "center",
        alignItems: "center",
        rowGap: 10,
    },
    themesRow: {
        opacity: 1,
        flexDirection: "row",
        columnGap: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    themeSwitch: {
        justifyContent: "center",
        alignItems: "center"
    },
})

export default ThemeSwitch;
